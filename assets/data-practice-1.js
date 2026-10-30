window.PRACTICE = window.PRACTICE || [];
PRACTICE.push(
/* ---------- Errors ---------- */
{
  id: "e1", topic: "errors", tag: "Error analysis", marks: 4,
  q: "A measured length is 498 cm while the true length is 500 cm. Compute the absolute true error and the true percent relative error.",
  hint: "Et = |true − approx|، ثم اقسم على القيمة الحقيقية واضرب في 100.",
  sol: `
    <p>E<sub>t</sub> = |500 − 498| = <b>2 cm</b>.</p>
    <p>ε<sub>t</sub> = (2/500) × 100 = <b>0.4%</b>.</p>
    <p class="small muted">الخطأ المطلق وحده لا يكفي للحكم: 2 cm في جسر ليس كـ 2 cm في مسمار.</p>
  `
},
{
  id: "e2", topic: "errors", tag: "Approximate error", marks: 4,
  q: "An iterative method gives x_old = 1.25 and x_new = 1.30. Find the relative approximate error.",
  hint: "المقام هو القيمة الجديدة 1.30.",
  sol: `
    <p>ε<sub>a</sub> = |1.30 − 1.25| / 1.30 × 100 = (0.05/1.30) × 100 = <b>3.846%</b>.</p>
    <div class="callout bad"><span class="ct">خطأ شائع</span>القسمة على 1.25 تعطي 4% وهي إجابة خاطئة لأن تعريف εa يستخدم القيمة الجديدة.</div>
  `
},
{
  id: "e3", topic: "errors", tag: "Significant figures", marks: 2,
  q: "How many significant figures are in the number 0.004560?",
  hint: "الأصفار البادئة ليست معتبرة؛ الصفر الأخير بعد الفاصلة معتبر.",
  sol: `<p>الأرقام المعتبرة: 4، 5، 6، والصفر الأخير ← <b>4 أرقام معتبرة</b>. الأصفار الثلاثة البادئة (0.00) ليست معتبرة.</p>`
},
{
  id: "e4", topic: "errors", tag: "Stopping criterion", marks: 3,
  q: "Find the stopping criterion ε_s for 5 significant figures.",
  hint: "εs = (0.5 × 10^(2−n))%.",
  sol: `<p>ε<sub>s</sub> = 0.5 × 10<sup>2−5</sup> = 0.5 × 10<sup>−3</sup> = <b>0.0005%</b>.</p>`
},
{
  id: "e5", topic: "errors", tag: "Sources of error", marks: 4,
  q: "Classify each error: (a) storing 1/3 as 0.3333, (b) using sin(x) ≈ x − x³/6, (c) subtracting 1.0002 − 0.9998 = 0.0004.",
  hint: "تذكّر: تخزين محدود = round-off، قطع متسلسلة = truncation، طرح متقارب = loss of significance.",
  sol: `
    <ul>
      <li>(a) <b>Round-off error</b> — تمثيل الفاصلة العائمة بعدد محدود من البتات.</li>
      <li>(b) <b>Truncation error</b> — قطع متسلسلة تايلور بعد حدين.</li>
      <li>(c) <b>Loss of significance</b> — طرح عددين متقاربين يمحو الأرقام المعتبرة.</li>
    </ul>
  `
},

/* ---------- Taylor ---------- */
{
  id: "t1", topic: "taylor", tag: "Maclaurin", marks: 6,
  q: "Use the Maclaurin series of e^x with 4 terms to estimate e^0.5. Compute the true percent relative error.",
  hint: "الحدود: 1 + x + x²/2! + x³/3! عند x = 0.5.",
  sol: `
    <p>1 + 0.5 + 0.5²/2 + 0.5³/6 = 1 + 0.5 + 0.125 + 0.020833 = <b>1.645833</b>.</p>
    <p>القيمة الحقيقية: e<sup>0.5</sup> = 1.648721.</p>
    <p>ε<sub>t</sub> = |1.648721 − 1.645833| / 1.648721 × 100 = <b>0.175%</b>.</p>
  `
},
{
  id: "t2", topic: "taylor", tag: "Taylor at a ≠ 0", marks: 6,
  q: "Use the third-order Taylor polynomial of cos(x) about a = 0 to estimate cos(π/4). Find the true relative error.",
  hint: "cos(x) ≈ 1 − x²/2! + x⁴/4!. عوّض x = π/4.",
  sol: `
    <p>x = π/4 = 0.785398.</p>
    <p>1 − (0.785398)²/2 + (0.785398)⁴/24 = 1 − 0.308425 + 0.015854 = <b>0.707429</b>.</p>
    <p>القيمة الحقيقية cos(π/4) = 0.707107، و ε<sub>t</sub> = |0.707107 − 0.707429|/0.707107 × 100 = <b>0.0456%</b>.</p>
  `
},
{
  id: "t3", topic: "taylor", tag: "Exam style", marks: 14,
  q: "Use Taylor polynomial of f(x) = √x from a = 2.0 to find f(2.5) for a relative true error less than 0.05%.",
  hint: "اشتق حتى الترتيب الثالث، h = 0.5، والقيمة الحقيقية 1.5811.",
  sol: `
    <p>المشتقات عند a = 2: f = 1.4142، f′ = 0.35355، f″ = −0.088389، f‴ = 0.066291.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Order</th><th>Approximation</th><th>ε<sub>t</sub> %</th></tr></thead>
      <tbody>
        <tr><td>0</td><td>1.4142</td><td>10.56</td></tr>
        <tr><td>1</td><td>1.5910</td><td>0.6231</td></tr>
        <tr><td>2</td><td>1.5799</td><td>0.0757</td></tr>
        <tr><td>3</td><td class="hl">1.5813</td><td class="hl">0.0117 ✓</td></tr>
      </tbody>
    </table></div>
    <p>إذن الترتيب الثالث (4 حدود) كافٍ: <b>f(2.5) ≈ 1.5813</b>.</p>
  `
},
{
  id: "t4", topic: "taylor", tag: "Second-order Taylor", marks: 7,
  q: "Find the second-order Taylor polynomial of f(x) = ln(x) about a = 1, then estimate ln(1.2) and compute the true relative error.",
  hint: "f(1)=0، f′(1)=1، f″(1)=−1. الحدان: (x−1) و −(x−1)²/2.",
  sol: `
    <p>ln(x) ≈ (x−1) − (x−1)²/2. عند x = 1.2:</p>
    <p>0.2 − 0.02 = <b>0.18</b>.</p>
    <p>القيمة الحقيقية ln(1.2) = 0.182322، و ε<sub>t</sub> = 0.002322/0.182322 × 100 = <b>1.27%</b>.</p>
  `
},
{
  id: "t5", topic: "taylor", tag: "Concept", marks: 4,
  q: "Why does a fourth-order Taylor expansion reproduce a fourth-degree polynomial exactly?",
  hint: "فكّر في حد الباقي R₄.",
  sol: `
    <p>لأن المشتقة الخامسة لكثيرة حدود من الدرجة الرابعة تساوي صفراً، وبالتالي حد الباقي:</p>
    <div class="formula"><div class="fx">R<sub>4</sub> = f<sup>(5)</sup>(ξ)(x−a)<sup>5</sup>/5! = 0</div></div>
    <p>فلا يبقى خطأ قطع، والتوسع يعيد الدالة بالكامل. هذا ما رأيناه في مثال كثيرة الحدود في المحاضرة (f(1.35) = −0.7500 بالضبط).</p>
  `
},

/* ---------- Bisection ---------- */
{
  id: "b1", topic: "bisection", tag: "Iteration count", marks: 4,
  q: "How many bisection iterations are needed to reduce the error below 0.0005 on the interval [2, 3]?",
  hint: "n ≥ log₂((b−a)/ε)، وقرّب للأعلى.",
  sol: `
    <p>n ≥ log<sub>2</sub>(1/0.0005) = log<sub>2</sub>(2000) = 10.97.</p>
    <p>إذن نحتاج <b>11 تكراراً</b>.</p>
  `
},
{
  id: "b2", topic: "bisection", tag: "Table", marks: 8,
  q: "Apply the bisection method to f(x) = x³ − x − 2 on [1, 2] for 3 iterations. Give the final interval and the best estimate.",
  hint: "f(1) = −2 و f(2) = 4.",
  sol: `
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Iter</th><th>a</th><th>b</th><th>c</th><th>f(c)</th><th>New interval</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>1</td><td>2</td><td>1.5</td><td>−0.125</td><td>[1.5, 2]</td></tr>
        <tr><td>2</td><td>1.5</td><td>2</td><td>1.75</td><td>+1.6094</td><td>[1.5, 1.75]</td></tr>
        <tr><td>3</td><td>1.5</td><td>1.75</td><td class="hl">1.625</td><td>+0.6660</td><td>[1.5, 1.625]</td></tr>
      </tbody>
    </table></div>
    <p>بعد 3 تكرارات: الفترة [1.5, 1.625]، أفضل تقدير <b>1.625</b>، والخطأ ≤ (1)/2<sup>3</sup> = <b>0.125</b>.</p>
  `
},
{
  id: "b3", topic: "bisection", tag: "Validity", marks: 4,
  q: "Can bisection be applied to f(x) = x³ − 3x + 1 on [0, 2]? On [0, 1]? Justify.",
  hint: "احسب f عند الطرفين في كل حالة.",
  sol: `
    <p>f(0) = 1، f(2) = 3 ← حاصل الضرب 3 &gt; 0، إذن <b>لا</b> (يوجد جذران في الفترة، وهو عدد زوجي).</p>
    <p>f(0) = 1، f(1) = −1 ← حاصل الضرب −1 &lt; 0، إذن <b>نعم</b>، والطريقة صالحة على [0,1].</p>
  `
},
{
  id: "b4", topic: "bisection", tag: "Error bound", marks: 3,
  q: "Starting from [0, 4], what is the maximum absolute error after 6 bisection iterations?",
  hint: "الخطأ = عرض الفترة / 2^n.",
  sol: `<p>الخطأ ≤ (4 − 0)/2<sup>6</sup> = 4/64 = <b>0.0625</b>.</p>`
},
{
  id: "b5", topic: "bisection", tag: "Convergence", marks: 3,
  q: "What is the order of convergence of the bisection method, and what does that mean practically?",
  hint: "الخطأ ينصف كل تكرار.",
  sol: `
    <p>الترتيب <b>خطي (order 1)</b>: E<sub>n+1</sub> ≈ 0.5 E<sub>n</sub>.</p>
    <p>عملياً: كل 3.3 تكرارات تكسب رقماً عشرياً إضافياً، لذلك هي بطيئة لكنها مضمونة.</p>
  `
},

/* ---------- False position ---------- */
{
  id: "f1", topic: "false-position", tag: "Table", marks: 10,
  q: "Apply false position to f(x) = x³ − x − 2 on [1, 2] for 3 iterations. Compute the relative approximate error each time.",
  hint: "x_m = x_U − f(x_U)(x_L − x_U)/(f(x_L) − f(x_U)).",
  sol: `
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>#</th><th>x<sub>L</sub></th><th>x<sub>U</sub></th><th>x<sub>m</sub></th><th>f(x<sub>m</sub>)</th><th>ε<sub>a</sub> %</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>1</td><td>2</td><td>1.33333</td><td>−0.96296</td><td>—</td></tr>
        <tr><td>2</td><td>1.33333</td><td>2</td><td>1.46269</td><td>−0.33334</td><td>8.844</td></tr>
        <tr><td>3</td><td>1.46269</td><td>2</td><td class="hl">1.50402</td><td>−0.10182</td><td class="hl">2.748</td></tr>
      </tbody>
    </table></div>
    <p>الجذر الحقيقي 1.52138، والخطأ الحقيقي بعد 3 تكرارات 1.14% — أفضل من التنصيف بكثير.</p>
  `
},
{
  id: "f2", topic: "false-position", tag: "Exam style", marks: 18,
  q: "For f(x) = e^(−x)(3.2 sin x − 0.5 cos x) on [3, 4], perform 3 false-position iterations and give x_m and ε_a at the third iteration.",
  hint: "f(3) = 0.04713، f(4) = −0.03837.",
  sol: `
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>#</th><th>x<sub>L</sub></th><th>x<sub>U</sub></th><th>x<sub>m</sub></th><th>f(x<sub>m</sub>)</th><th>ε<sub>a</sub> %</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>3</td><td>4</td><td>3.5512</td><td>−0.02341</td><td>—</td></tr>
        <tr><td>2</td><td>3</td><td>3.5512</td><td>3.3683</td><td>−0.00799</td><td>5.430</td></tr>
        <tr><td>3</td><td>3</td><td>3.3683</td><td class="hl">3.3149</td><td>−0.00215</td><td class="hl">1.611</td></tr>
      </tbody>
    </table></div>
    <p>الجذر الحقيقي 3.29659 (من tan x = 0.5/3.2)، والخطأ الحقيقي 0.555%. لاحظ ثبات x<sub>L</sub> = 3.</p>
  `
},
{
  id: "f3", topic: "false-position", tag: "Concept", marks: 5,
  q: "Explain why the standard false-position method can converge very slowly. What is the Illinois modification?",
  hint: "طرف واحد يبقى ثابتاً؛ الحل تنصيف قيمة الدالة عنده.",
  sol: `
    <p>في الدوال المحدّبة بشدة، تبقى إشارة f عند أحد الطرفين كبيرة، فيبقى ذلك الطرف ثابتاً وكل التعديل يحدث في الطرف الآخر. الفترة تنكمش من جهة واحدة فقط، وقد يصبح التقارب أبطأ من التنصيف.</p>
    <p><b>Illinois:</b> إذا بقي الطرف نفسه في مكانه تكرارين متتاليين، نقسم f عنده على 2 قبل التكرار التالي. هذا يدفع الخط نحو الداخل ويسمح للفترة بالانكماش من الجهتين.</p>
  `
},
{
  id: "f4", topic: "false-position", tag: "Comparison", marks: 5,
  q: "For the exam function on [3,4], compare the accuracy after 3 iterations of bisection and false position.",
  hint: "التنصيف: 3.5 ثم 3.25 ثم 3.375. الوضع الزائف: 3.3149.",
  sol: `
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Method</th><th>x after 3 iter</th><th>True error %</th></tr></thead>
      <tbody>
        <tr><td>Bisection</td><td>3.3750</td><td>2.38%</td></tr>
        <tr><td>False position</td><td class="hl">3.3149</td><td class="hl">0.555%</td></tr>
      </tbody>
    </table></div>
    <p>الوضع الزائف أدق بأربع مرات تقريباً هنا لأن الدالة شبه خطية على الفترة — وهذا هو افتراضه الأساسي.</p>
  `
}
);
