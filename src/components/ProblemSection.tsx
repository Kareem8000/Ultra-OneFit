import React from 'react';

export const ProblemSection: React.FC = () => {
  const summaryPoints = [
    'قطع كتير… ومش دايمًا عارف إيه يركب مع إيه.',
    'بتدور على Inspiration قبل ما تشتري.',
    'وبتفضل تسأل: الـLook هيطلع زي ما أنا متخيل؟',
  ];

  const thoughtCards = [
    {
      num: '01',
      title: 'القطعة عاجباك… بس هتلبسها على إيه؟',
      desc: 'اختيار قطعة واحدة سهل. الصعب إنك تعرف هتعمل بيها Look كامل إزاي.',
      highlight: false,
    },
    {
      num: '02',
      title: 'كل قطعة ممكن تبقى حلوة لوحدها.',
      desc: 'لكن المهم الألوان والقطع لما يجتمعوا في Look واحد.',
      highlight: false,
    },
    {
      num: '03',
      title: 'وبتبدأ تسأل: اللون ده راكب مع ده؟',
      desc: 'والبنطلون؟ والجزمة؟ وهل التلاتة هيطلعوا بالشكل اللي في دماغك؟',
      highlight: false,
    },
    {
      num: '04',
      title: 'قبل ما تدفع… عايز تشوف النتيجة.',
      desc: 'مش بس تشوف المنتجات، تشوف الـLook نفسه وهو متجمع.',
      highlight: false,
    },
    {
      num: '05',
      title: 'وعشان كده بتبدأ تدور على Inspiration.',
      desc: 'TikTok، Instagram، أصحابك… لحد ما تلاقي حاجة تحاول تبني عليها.',
      highlight: false,
    },
    {
      num: '06',
      title: 'بس لسه فيه سؤال واحد.',
      desc: 'هل الـLook ده مناسب ليك، ولجسمك، ولليوم اللي هتلبسه فيه؟',
      highlight: false,
    },
    {
      num: '07',
      title: 'الموضوع كله يبدأ من الـLook.',
      desc: 'بدل ما تبدأ من قطعة وتحاول تركب الباقي، شوف الـLook كامل الأول.',
      highlight: true,
    },
  ];

  return (
    <section
      id="problem-section"
      className="bg-[#FFFFFF] text-[#1C1C1C] py-16 sm:py-20 lg:py-24 border-b border-[#C8C8C6]/30"
      dir="rtl"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Right Column (Desktop 5 cols): Section Identity & Supporting Intro */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 text-right flex flex-col items-start">
            
            {/* 04 — MAIN SECTION BADGE */}
            <div
              id="problem-badge"
              className="inline-flex items-center px-3 py-1 rounded-[8px] bg-[#1C1C1C] text-[#FFFFFF] text-xs font-semibold tracking-wide mb-4 shadow-sm"
            >
              <span>المشكلة مش في القطعة</span>
            </div>

            {/* 05 — MAIN HEADLINE (Look is masculine: Look حلو) */}
            <h2
              id="problem-headline"
              className="text-2xl sm:text-3xl md:text-4xl lg:text-[34px] xl:text-[38px] font-bold text-[#1C1C1C] leading-[1.3] sm:leading-[1.25] tracking-tight mb-5"
            >
              <span className="block text-[#1C1C1C]">
                مشكلتك مش إنك مش لاقي هدوم حلوة…
              </span>
              <span className="block text-[#1C1C1C]/90 mt-1">
                مشكلتك إنك مش عارف تعمل منها{' '}
                <span className="underline decoration-[#1C1C1C]/40 decoration-2 underline-offset-4">
                  Look حلو
                </span>
                .
              </span>
            </h2>

            {/* 06 — SUPPORTING INTRO */}
            <p
              id="problem-intro"
              className="text-sm sm:text-base text-[#1C1C1C]/80 leading-relaxed mb-6 font-normal"
            >
              ممكن تلاقي تيشيرت عاجبك جدًا.
              <br className="hidden sm:inline" />
              بس أول سؤال بييجي بعده: هلبسه على إيه؟
            </p>

            {/* 07 — QUICK SUMMARY (3 POINTS) */}
            <div
              id="problem-quick-summary"
              className="space-y-3 mb-6 w-full pt-2 border-t border-[#C8C8C6]/40"
            >
              {summaryPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#1C1C1C]/85 font-medium">
                  <span className="w-2 h-2 rounded-full bg-[#1C1C1C] mt-1.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Visual reassurance anchor on desktop */}
            <div className="hidden lg:block pt-3 border-t border-[#C8C8C6]/20 w-full text-xs text-[#AFAFAD]">
              Ultra One Fit • تفكيرك في اللبس بيبدأ من النتيجة النهائية
            </div>
          </div>

          {/* Left Column (Desktop 7 cols): 7 Editorial Information Cards */}
          <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4 text-right">
            {thoughtCards.map((card) => {
              if (card.highlight) {
                // Card 07: Reframe & Bridge card (Distinctive emphasis without being a CTA)
                return (
                  <div
                    key={card.num}
                    id={`problem-card-${card.num}`}
                    className="p-5 sm:p-6 rounded-[18px] sm:rounded-[20px] bg-[#1C1C1C]/[0.03] border-2 border-[#1C1C1C] shadow-[0_4px_20px_rgba(28,28,28,0.06)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-mono text-xs sm:text-sm font-black text-[#1C1C1C] tracking-wider">
                        {card.num}
                      </span>
                      <span className="text-[10px] font-bold tracking-widest text-[#1C1C1C] uppercase px-2 py-0.5 rounded-[6px] bg-[#1C1C1C]/10">
                        المدخل للحل
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#1C1C1C] mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#1C1C1C]/85 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                );
              }

              // Standard Cards 01 to 06
              return (
                <div
                  key={card.num}
                  id={`problem-card-${card.num}`}
                  className="p-4 sm:p-5 rounded-[18px] sm:rounded-[20px] bg-[#FFFFFF] border border-[#C8C8C6]/70 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:-translate-y-0.5 hover:border-[#1C1C1C]/50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono text-xs font-bold text-[#AFAFAD] tracking-wider">
                      {card.num}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-[#1C1C1C] mb-1.5 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              );
            })}

            {/* 26 — STRATEGIC TRANSITION LINE (Natural bridge to the solution section) */}
            <button
              onClick={() => {
                const el = document.getElementById('solution-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              id="problem-transition-bridge"
              className="mt-4 pt-4 border-t border-[#C8C8C6]/40 flex items-center justify-between text-right px-2 w-full group hover:text-[#1C1C1C] transition-colors focus:outline-none"
            >
              <p className="text-sm sm:text-base font-bold text-[#1C1C1C] group-hover:underline">
                وعشان كده… إحنا بنبدأ من الـLook.
              </p>
              <span className="text-xs font-medium text-[#AFAFAD] group-hover:text-[#1C1C1C] transition-colors flex items-center gap-1">
                <span>شوف الحل</span>
                <span className="group-hover:-translate-x-1 transition-transform">←</span>
              </span>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
