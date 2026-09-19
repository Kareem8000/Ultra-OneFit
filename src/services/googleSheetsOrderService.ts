import { CartItem } from '../types';

export const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwBvzQrUiNZ1xDcHmTSu1RMFwD5XjFX6RI-glXVh-P1n4mWbrw6-pqH835bpZqFZPdb/exec';

export interface OrderProductSnapshot {
  productId: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  [key: string]: any;
}

export interface OrderSnapshot {
  orderId: string;
  name: string;
  phone: string;
  governorate: string;
  address: string;
  paymentMethod: 'Cash on Delivery' | 'Vodafone Cash / Deposit';
  depositAmount: number;
  deliveryTime: '3-4 Business Days' | '1-2 Business Days';
  products: OrderProductSnapshot[];
  subtotal: number;
  shipping: number;
  total: number;
  notes: string;
  [key: string]: any;
}

export interface OrderSubmissionResult {
  success: boolean;
  orderId: string;
  message?: string;
  duplicate?: boolean;
}

/**
 * Generate a unique and consistent Order ID
 * Format example: ORD-20260919-482
 */
export function generateOrderId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;
  const randomNum = Math.floor(100 + Math.random() * 900);
  return `ORD-${dateStr}-${randomNum}`;
}

/**
 * Normalizes existing cart item data into the exact required product snapshot structure.
 * Preserves all customer variant choices: color, size, quantity, unit price, and line total.
 */
export function normalizeCartItemToProductSnapshot(item: CartItem): OrderProductSnapshot {
  const quantity = Number(item.quantity) || 1;
  const unitPrice = Number(item.price) || 0;
  const lineTotal = quantity * unitPrice;

  return {
    productId: String(item.productId || item.id),
    productName: item.productName,
    color: item.selectedColor || 'Default',
    size: item.selectedSize || 'Standard',
    quantity,
    unitPrice,
    lineTotal,
    ...(item.productType ? { productType: item.productType } : {}),
    ...(item.selectedColorHex ? { colorHex: item.selectedColorHex } : {}),
    ...(item.warranty ? { warranty: item.warranty } : {}),
    ...(item.outfitName ? { outfitName: item.outfitName } : {}),
  };
}

/**
 * Submits an order snapshot to the Google Apps Script Web App.
 *
 * Implements a robust dual-path strategy:
 * 1. Standard HTML Form POST targeting a hidden iframe (reliable browser navigation pipeline).
 * 2. Background beacon/fetch with application/x-www-form-urlencoded to ensure immediate execution.
 * 3. Dual completion signals: postMessage event or iframe load detection.
 * 4. User-facing messages are strictly customer-friendly (no mention of backend or Google Sheets).
 */
export function submitOrderToGoogleSheets(
  orderData: OrderSnapshot,
  timeoutMs = 12000
): Promise<OrderSubmissionResult> {
  return new Promise((resolve, reject) => {
    // Generate unique names to prevent conflict with any parallel or previous requests
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    const iframeName = `gscript_order_frame_${timestamp}_${randomSuffix}`;

    let isSettled = false;

    // 1. Create hidden iframe
    const iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.id = iframeName;
    iframe.setAttribute(
      'style',
      'display:none !important;position:fixed !important;top:-9999px !important;left:-9999px !important;width:1px !important;height:1px !important;opacity:0 !important;pointer-events:none !important;'
    );

    // 2. Create hidden form
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = GOOGLE_APPS_SCRIPT_URL;
    form.target = iframeName;
    form.setAttribute('style', 'display:none !important;');

    // 3. Create hidden input 'payload'
    const payloadInput = document.createElement('input');
    payloadInput.type = 'hidden';
    payloadInput.name = 'payload';
    payloadInput.value = JSON.stringify(orderData);
    form.appendChild(payloadInput);

    // Cleanup helper
    const cleanup = () => {
      clearTimeout(timeoutTimer);
      window.removeEventListener('message', handleMessage);
      setTimeout(() => {
        try {
          if (form.parentNode) {
            form.parentNode.removeChild(form);
          }
          if (iframe.parentNode) {
            iframe.parentNode.removeChild(iframe);
          }
        } catch {
          // Ignore DOM cleanup errors
        }
      }, 500);
    };

    const settleSuccess = (message?: string) => {
      if (isSettled) return;
      isSettled = true;
      cleanup();
      resolve({
        success: true,
        orderId: orderData.orderId,
        message: message || 'تم تأكيد طلبك بنجاح',
      });
    };

    const settleFailure = (userFacingError: string) => {
      if (isSettled) return;
      isSettled = true;
      cleanup();
      reject(new Error(userFacingError));
    };

    // 4. Listen for postMessage from Apps Script response
    const handleMessage = (event: MessageEvent) => {
      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }

      if (data && data.type === 'GOOGLE_SHEETS_ORDER_RESULT') {
        const result = data.result;
        if (result && (!result.orderId || result.orderId === orderData.orderId)) {
          if (result.success === true) {
            settleSuccess(result.message);
          } else {
            settleFailure('حدث خطأ أثناء معالجة الطلب. يرجى إعادة المحاولة.');
          }
        }
      }
    };

    // 5. Iframe onload listener (fast completion signal when Google Apps Script returns 200)
    let loadTriggerCount = 0;
    iframe.onload = () => {
      loadTriggerCount += 1;
      // When the form posts into the iframe and Google responds, onload fires
      if (loadTriggerCount >= 1 && !isSettled) {
        // Allow brief moment for postMessage, otherwise settle as successful delivery
        setTimeout(() => {
          if (!isSettled) {
            settleSuccess('تم تأكيد الطلب بنجاح');
          }
        }, 1200);
      }
    };

    // 6. Timeout protection: customer-friendly error message
    const timeoutTimer = setTimeout(() => {
      if (isSettled) return;
      settleFailure(
        'يبدو أن هناك بطء في الاتصال بالإنترنت. يرجى الضغط مرة أخرى على تأكيد الطلب للمتابعة.'
      );
    }, timeoutMs);

    // 7. Attach listener, append DOM elements, and submit
    window.addEventListener('message', handleMessage);

    try {
      document.body.appendChild(iframe);
      document.body.appendChild(form);
      form.submit();

      // Parallel direct background dispatch via fetch (no-cors) as backup delivery
      try {
        const params = new URLSearchParams();
        params.append('payload', JSON.stringify(orderData));
        fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: params.toString(),
        }).catch(() => {
          // fetch no-cors silent catch
        });
      } catch {
        // Ignore fetch invocation errors
      }
    } catch (err) {
      settleFailure(
        'تعذر إرسال الطلب حالياً بسبب اتصال الإنترنت. يرجى المحاولة مرة أخرى.'
      );
    }
  });
}
