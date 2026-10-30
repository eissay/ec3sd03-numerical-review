window.LESSONS = window.LESSONS || [];
LESSONS.push(
{
  id: "errors", n: 1,
  title: "تحليل الأخطاء", en: "Error Analysis",
  lecture: "Lecture 1", weight: "يبني عليه كل سؤال", time: "35 دقيقة",
  summary: "الامتحان يطلب 4 أرقام معتبرة في كل حساب، وكل سؤال تقريباً يحتاج خطأ نسبياً. هنا التعريفات الدقيقة وطريقة الحساب السريعة.",
  sections: [
    { h: "لماذا التحليل العددي؟", html: `
      <p>معظم المعادلات الهندسية الحقيقية لا تملك حلاً تحليلياً مغلقاً: <span class="mono">x = e<sup>−x</sup></span>، أو <span class="mono">x<sup>9</sup> − 2x<sup>2</sup> + 5 = 0</span>، أو نظام من 1000 معادلة. الحل العددي يعطينا <b>تقريباً</b> بدقة كافية، مقابل ثلاثة أثمان: الخطأ، الوقت، والاستقرار.</p>
      <p>الخطأ ليس عيباً بحد ذاته. الخطأ مقبول إذا كان <b>محكوماً</b> (controlled) و<b>محدوداً</b> (bounded) و<b>لا ينمو</b> أثناء الحساب.</p>
      <div class="callout tip"><span class="ct">جملة تُحفظ</span>التحليل العددي = رياضيات + خوارزميات + حاسوب، وهدفه: متى تثق بالنتيجة المحسوبة.</div>
    `},
    { h: "الخطأ الحقيقي والنسبي", html: `
      <p>العلاقة الأساسية: القيمة الحقيقية = التقريب + الخطأ.</p>
      <div class="formula">
        <div class="fx">E<sub>t</sub> = | true value − approximation |</div>
        <div class="cap">الخطأ المطلق الحقيقي (Absolute true error)</div>
      </div>
      <div class="formula">
        <div class="fx">ε<sub>t</sub> = <span class="frac"><span class="num">E<sub>t</sub></span><span class="den">|true value|</span></span> × 100%</div>
        <div class="cap">الخطأ النسبي الحقيقي (True percent relative error)</div>
      </div>
      <p>النسبة هي المهمة، لا القيمة المطلقة. خطأ 1 سم في جسر طوله 10,000 سم لا شيء، ونفس الخطأ في مسمار طوله 10 سم كارثة.</p>
    `},
    { h: "الخطأ التقريبي وشرط التوقف", html: `
      <p>في الواقع لا نعرف القيمة الحقيقية، لذلك نستخدم الخطأ النسبي التقريبي بين تكرارين متتاليين:</p>
      <div class="formula">
        <div class="fx">ε<sub>a</sub> = |<span class="frac"><span class="num">x<sub>new</sub> − x<sub>old</sub></span><span class="den">x<sub>new</sub></span></span>| × 100%</div>
        <div class="cap">المقام دائماً القيمة الجديدة — خطأ شائع جداً أن تُقسم على القديمة</div>
      </div>
      <p>نتوقف عندما <span class="mono">|ε<sub>a</sub>| &lt; ε<sub>s</sub></span>، حيث ε<sub>s</sub> هي الدقة المطلوبة. إذا طُلب عدد أرقام معتبرة n:</p>
      <div class="formula">
        <div class="fx">ε<sub>s</sub> = (0.5 × 10<sup>2−n</sup>) %</div>
        <div class="cap">مثال: n = 4 ⇒ ε<sub>s</sub> = 0.005% &nbsp;|&nbsp; n = 3 ⇒ 0.05%</div>
      </div>
      <div class="callout warn"><span class="ct">انتبه</span>شرط التوقف قد يكون على الخطأ التقريبي ε<sub>a</sub>، أو على قيمة الدالة |f(x)| &lt; tol، أو على عرض الفترة الحالي. اقرأ السؤال وحدّد أيّها مطلوب قبل الحساب.</div>
    `},
    { h: "الأرقام المعتبرة (Significant Figures)", html: `
      <ul>
        <li>كل الأرقام غير الصفرية معتبرة: 91 ← رقمان، 123.45 ← خمسة.</li>
        <li>الأصفار بين رقمين غير صفريين معتبرة: 101.1002 ← سبعة.</li>
        <li>الأصفار البادئة ليست معتبرة: 0.00052 ← رقمان.</li>
        <li>الأصفار اللاحقة بعد الفاصلة العشرية معتبرة: 12.2300 ← ستة، و120.00 ← خمسة.</li>
        <li>اللاحقة بدون فاصلة غامضة: 1300 قد تكون 2 أو 4.</li>
      </ul>
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>العدد</th><th>3.14159</th><th>0.00082</th><th>0.000820</th><th>3009</th><th>250</th><th>250.0</th><th>1000</th></tr></thead>
        <tbody><tr><td class="ar">عدد الأرقام</td><td>6</td><td>2</td><td>3</td><td>4</td><td>2–3</td><td>4</td><td>1–4</td></tr></tbody>
      </table></div>
      <p class="small muted">في هذا المقرر: استخدم 4 أرقام معتبرة في كل خطوة، ولا تُدوّر الأرقام الوسطية قبل النهاية.</p>
    `},
    { h: "مصادر الخطأ الثلاثة", html: `
      <h3>1) خطأ التقريب العددي (Round-off)</h3>
      <p>الحاسوب يمثّل الأعداد العشرية بعدد محدود من البتات. الكسر <span class="mono">1/3 = 0.333…</span> لا ينتهي، والعدد <span class="mono">1.1</span> لا يمكن تمثيله بدقة في النظام الثنائي. الخطأ يتراكم مع كل عملية.</p>
      <h3>2) خطأ القطع (Truncation)</h3>
      <p>نستبدل عملية لا نهائية بعملية منتهية: متسلسلة تايلور المقطوعة بعد n حداً. هذا هو الخطأ الذي نتحكم به عندما نختار عدد الحدود.</p>
      <h3>3) فقدان الدقة (Loss of Significance)</h3>
      <p>طرح عددين متقاربين جداً يمحو الأرقام المعتبرة:</p>
      <div class="formula"><div class="fx">0.123456 − 0.123445 = 0.000011</div><div class="cap">خسرنا معظم الأرقام المعتبرة (catastrophic cancellation)</div></div>
    `},
    { h: "مثال المحاضرة: الجسر والمسمار", html: `
      <div class="example">
        <div class="example-head"><b>Measurements</b><span class="badge">Lecture 1</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">A bridge measures 9,999 cm and a rivet 9 cm. True values are 10,000 cm and 10 cm. Compute the absolute and relative true errors.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Item</th><th>True</th><th>Approx.</th><th>E<sub>t</sub></th><th>ε<sub>t</sub></th></tr></thead>
            <tbody>
              <tr><td class="ar">الجسر</td><td>10,000</td><td>9,999</td><td>1</td><td class="hl">0.01 %</td></tr>
              <tr><td class="ar">المسمار</td><td>10</td><td>9</td><td>1</td><td class="hl">10 %</td></tr>
            </tbody>
          </table></div>
          <p>نفس الخطأ المطلق (1 سم) لكن الخطأ النسبي مختلف تماماً — ولهذا تُقاس الدقة بالنسبة.</p>
        </div>
      </div>
    `},
    { h: "الدقة، الضبط، الاستقرار", html: `
      <div class="grid g2">
        <div class="card flat"><h3>Accuracy (الدقة)</h3><p class="small">قرب القيمة المحسوبة من القيمة الحقيقية.</p></div>
        <div class="card flat"><h3>Precision (الضبط)</h3><p class="small">قرب القياسات المتكررة من بعضها، بغض النظر عن الحقيقة.</p></div>
      </div>
      <p><b>Convergence:</b> الطريقة متقاربة إذا اقتربت التقديرات من القيمة الحقيقية.</p>
      <p><b>Stability:</b> النظام مستقر إذا كان خطأ صغير في المدخلات ينتج خطأ صغيراً في المخرجات. الطريقة قد تكون متقاربة لكن غير مستقرة، أو مستقرة لكن بطيئة.</p>
      <div class="callout exam"><span class="ct">سؤال متوقع</span>«Do computers store real numbers exactly?» الجواب: لا، بتمثيل الفاصلة العائمة، وهذا مصدر خطأ التقريب. و«Is error always bad?» الجواب: لا، إذا كان محكوماً ومحدوداً ولا ينمو.</div>
    `}
  ],
  traps: [
    "القسمة على القيمة الجديدة في εa وليس القديمة.",
    "εt تُحسب على القيمة المطلقة للحقيقة، والنتيجة نسبة مئوية.",
    "الدرجات بالراديان دائماً ما لم يُذكر غير ذلك.",
    "الأصفار البادئة ليست أرقاماً معتبرة، واللاحقة بعد الفاصلة معتبرة.",
    "لا تخلط بين خطأ القطع (تايلور) وخطأ التقريب (الفاصلة العائمة)."
  ],
  checks: [
    { q: "true = 10000 و approx = 9999: ما εt؟", a: "E<sub>t</sub> = 1، و ε<sub>t</sub> = (1/10000)×100 = 0.01%." },
    { q: "x القديمة 2.5 والجديدة 2.6: ما εa؟", a: "ε<sub>a</sub> = |2.6−2.5| / 2.6 × 100 = 3.846%." },
    { q: "لدقة 4 أرقام معتبرة، ما εs؟", a: "ε<sub>s</sub> = 0.5×10<sup>2−4</sup> = 0.005%." }
  ]
},
{
  id: "taylor", n: 2,
  title: "متسلسلة تايلور", en: "Taylor Theorem",
  lecture: "Lecture 2", weight: "سؤال 1 في الامتحان (14 درجة)", time: "75 دقيقة",
  summary: "نستبدل الدوال المعقدة بكثيرات حدود. الامتحان يطلب منك إضافة حدود حتى ينزل الخطأ الحقيقي تحت قيمة معيّنة، مع جدول واضح.",
  sections: [
    { h: "الفكرة: الحاسوب لا يعرف sin(x)", html: `
      <p>الحاسوب يعرف الجمع والطرح والضرب والقسمة فقط. كيف يحسب <span class="mono">sin(x)</span> أو <span class="mono">e<sup>x</sup></span>؟ باستبدالها بكثيرة حدود سهلة الحساب. هذا بالضبط ما تسمح به مبرهنة تايلور.</p>
      <div class="formula">
        <div class="fx">f(x) = f(a) + f′(a)(x−a) + <span class="frac"><span class="num">f″(a)</span><span class="den">2!</span></span>(x−a)<sup>2</sup> + <span class="frac"><span class="num">f‴(a)</span><span class="den">3!</span></span>(x−a)<sup>3</sup> + …</div>
        <div class="cap">متسلسلة تايلور حول النقطة a</div>
      </div>
      <div class="formula">
        <div class="fx">f(x) = Σ<sub>k=0</sub><sup>n</sup> <span class="frac"><span class="num">f<sup>(k)</sup>(a)</span><span class="den">k!</span></span>(x−a)<sup>k</sup> + R<sub>n</sub></div>
        <div class="fx">R<sub>n</sub> = <span class="frac"><span class="num">f<sup>(n+1)</sup>(ξ)</span><span class="den">(n+1)!</span></span>(x−a)<sup>n+1</sup><span class="ar-inline">، حيث ξ بين a و x</span></div>
        <div class="cap">حد الباقي (Truncation error) — هو سبب خطأ القطع</div>
      </div>
    `},
    { h: "الصيغة البديلة وخطوة h", html: `
      <p>إذا كتبنا <span class="mono">x → x + h</span> نحصل على الصيغة التي تُشتق منها معظم طرق الحل:</p>
      <div class="formula">
        <div class="fx">f(x+h) = f(x) + f′(x)h + <span class="frac"><span class="num">f″(x)</span><span class="den">2!</span></span>h<sup>2</sup> + … + <span class="frac"><span class="num">f<sup>(n)</sup>(x)</span><span class="den">n!</span></span>h<sup>n</sup> + R<sub>n</sub></div>
        <div class="cap">h = step size. منها تأتي Newton-Raphson: نضع f(x+h)=0 ونحل من أجل h.</div>
      </div>
      <p><b>Maclaurin</b> هي حالة خاصة عندما a = 0.</p>
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>Function</th><th>Series</th><th>تظهر في</th></tr></thead>
        <tbody>
          <tr><td>e<sup>x</sup></td><td>1 + x + x²/2! + x³/3! + …</td><td class="ar">أمثلة سريعة</td></tr>
          <tr><td>sin x</td><td>x − x³/3! + x⁵/5! − …</td><td class="ar">مثال الامتحان</td></tr>
          <tr><td>cos x</td><td>1 − x²/2! + x⁴/4! − …</td><td class="ar">قيمة مطلوبة</td></tr>
          <tr><td>ln(1+x)</td><td>x − x²/2 + x³/3 − …</td><td class="ar">احتياط</td></tr>
        </tbody>
      </table></div>
    `},
    { h: "سؤال الامتحان: جذر 2.5", html: `
      <div class="example">
        <div class="example-head"><b>Q1 · Spring 2024 · 14 marks</b><span class="badge m">Use 4 significant digits</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">Use Taylor polynomial of f(x) = √x from a = 2.0 to find f(2.5) for a relative true error of less than 0.05%.</p>
          <p><b>الحل:</b> أولاً المشتقات عند a = 2، و h = 2.5 − 2 = 0.5. القيمة الحقيقية <span class="mono">√2.5 = 1.5811</span>.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>k</th><th>f<sup>(k)</sup>(x)</th><th>f<sup>(k)</sup>(2)</th><th>Term = f<sup>(k)</sup>(2)·h<sup>k</sup>/k!</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>√x</td><td>1.4142</td><td>1.4142</td></tr>
              <tr><td>1</td><td>1/(2√x)</td><td>0.35355</td><td>0.17678</td></tr>
              <tr><td>2</td><td>−1/(4x<sup>3/2</sup>)</td><td>−0.088389</td><td>−0.011049</td></tr>
              <tr><td>3</td><td>3/(8x<sup>5/2</sup>)</td><td>0.066291</td><td>0.001381</td></tr>
            </tbody>
          </table></div>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Order n</th><th>Approximation</th><th>ε<sub>t</sub> %</th><th>≤ 0.05%؟</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>1.4142</td><td>10.56</td><td class="neg">لا</td></tr>
              <tr><td>1</td><td>1.5910</td><td>0.6231</td><td class="neg">لا</td></tr>
              <tr><td>2</td><td>1.5799</td><td>0.0757</td><td class="neg">لا</td></tr>
              <tr><td>3</td><td class="hl">1.5813</td><td class="hl">0.0117</td><td class="hl">نعم ✓</td></tr>
            </tbody>
          </table></div>
          <p><b>الإجابة:</b> الترتيب الثالث (أربعة حدود) يكفي: <span class="mono">f(2.5) ≈ 1.5813</span>. لاحظ أن الخطأ ينزل بسرعة لأن h = 0.5 صغيرة نسبياً.</p>
          <div class="callout tip"><span class="ct">لماذا a=2؟</span>لأن 2.5 قريبة من 2 و<span class="mono">√2</span> معلومة. كلما اقتربت a من x صغُر عدد الحدود المطلوبة.</div>
        </div>
      </div>
    `},
    { h: "مثال ثانٍ: sin من 0.2 إلى 0.6", html: `
      <div class="example">
        <div class="example-head"><b>Lecture example</b><span class="badge">ε<sub>t</sub> &lt; 0.06%</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">Approximate f(x) = sin(x) from x₀ = 0.2 to find f(0.6) for a relative true error less than 0.06%.</p>
          <p>h = 0.4، والقيم عند 0.2: f = 0.19867، f′ = 0.98007، f″ = −0.19867، f‴ = −0.98007.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Order</th><th>Approximation</th><th>ε<sub>t</sub> %</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>0.1987</td><td>64.82</td></tr>
              <tr><td>1</td><td>0.5907</td><td>4.614</td></tr>
              <tr><td>2</td><td>0.5748</td><td>1.799</td></tr>
              <tr><td>3</td><td class="hl">0.5643</td><td class="hl">0.052</td></tr>
            </tbody>
          </table></div>
          <p>القيمة الحقيقية sin(0.6) = 0.564642. الترتيب الثالث يحقق الشرط.</p>
        </div>
      </div>
    `},
    { h: "مثال ثالث: كثيرة حدود من الدرجة الرابعة", html: `
      <div class="example">
        <div class="example-head"><b>Lecture example · 5 terms</b><span class="badge">a = 0.75 · x = 1.35</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">Use zero- through fourth-order Taylor series to estimate f(1.35) with a = 0.75, for f(x) = −0.1x⁴ − 0.15x³ − 0.5x² − 0.25x + 1.2.</p>
          <p>المشتقات: f′ = −0.4x³ − 0.45x² − x − 0.25، f″ = −1.2x² − 0.9x − 1، f‴ = −2.4x − 0.9، f⁗ = −2.4. و h = 0.6.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Terms</th><th>Approx f(1.35)</th><th>ε<sub>a</sub> %</th><th>ε<sub>t</sub> %</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>0.6363</td><td>—</td><td>184.85</td></tr>
              <tr><td>2</td><td>−0.2168</td><td>393.5</td><td>71.09</td></tr>
              <tr><td>3</td><td>−0.6398</td><td>66.11</td><td>14.69</td></tr>
              <tr><td>4</td><td>−0.7370</td><td>13.10</td><td>1.73</td></tr>
              <tr><td>5</td><td class="hl">−0.7500</td><td class="hl">1.73</td><td class="hl">0.00</td></tr>
            </tbody>
          </table></div>
          <p>بما أن الدالة كثيرة حدود من الدرجة الرابعة، فإن تايلور من الدرجة الرابعة (5 حدود) يعيدها <b>بالضبط</b>. هذا درس مهم: عدد الحدود المطلوب يعتمد على الدالة، وليس ثابتاً.</p>
        </div>
      </div>
    `},
    { h: "طريقة الحل في 6 خطوات", html: `
      <ol>
        <li>اكتب a و x واحسب h = x − a.</li>
        <li>اشتق حتى الدرجة التي تحتاجها (غالباً 3 أو 4).</li>
        <li>قيّم الدالة والمشتقات عند a، بأربعة أرقام معتبرة.</li>
        <li>أضف الحدود واحداً واحداً، واحسب التقدير بعد كل حد.</li>
        <li>احسب ε<sub>t</sub> (إن كانت الحقيقة معروفة) أو ε<sub>a</sub> (بين تقديرين) بعد كل إضافة.</li>
        <li>توقف عند أول ترتيب يحقق الشرط، واكتب الإجابة النهائية مع عدد الحدود المستخدمة.</li>
      </ol>
      <div class="callout bad"><span class="ct">أخطاء تفقدك الدرجة</span>
        نسيات المضروب k! (خاصة 3! = 6) • استخدام x<sup>k</sup> بدل (x−a)<sup>k</sup> • إغفال إشارة سالبة في المشتقة • الاعتماد على ε<sub>a</sub> بينما السؤال يطلب ε<sub>t</sub> • تدوير الأرقام في منتصف الحساب.
      </div>
    `}
  ],
  traps: [
    "h = x − a وليس x نفسه عندما a ≠ 0.",
    "حد الباقي R يستخدم المشتقة (n+1) والنقطة ξ غير المعروفة — وجوده يثبت أن الخطأ محدود.",
    "«5 terms» تعني الحدود من k=0 إلى k=4 وليس خمس مشتقات.",
    "الدالة كثيرة الحدود من الدرجة n تُ reproduced تماماً عند الترتيب n.",
    "احسب εt بعد كل حد ولا تتوقف عند أول تحسّن بسيط."
  ],
  checks: [
    { q: "ما أول ترتيب يحقق εt < 0.05% في سؤال √2.5؟", a: "الترتيب الثالث (4 حدود) لأن εt = 0.0117%." },
    { q: "ما الفرق بين تايلور وماكلورين؟", a: "ماكلورين هي تايلور حول a = 0." },
    { q: "لماذا يقل الخطأ عند تقريب x قريبة من a؟", a: "لأن الحدود تحمل (x−a)^k، فتصغر بسرعة عندما |x−a| < 1." }
  ]
}
);
