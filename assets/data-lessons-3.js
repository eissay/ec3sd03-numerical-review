window.LESSONS = window.LESSONS || [];
LESSONS.push(
{
  id: "open-methods", n: 5,
  title: "الطرق المفتوحة", en: "Fixed-Point · Newton · Secant",
  lecture: "Lecture 5 + Tutorial 1", weight: "سؤال 2b (18 درجة)", time: "90 دقيقة",
  summary: "طرق سريعة لا تحتاج فترة محيطة: نقطة تثبيت، نيوتن (تربيعي)، القاطع، والقاطع المعدّل. الامتحان يطلب 3 تكرارات مع جدول وخطأ نسبي.",
  sections: [
    { h: "نقطة التثبيت (Fixed-Point Iteration)", html: `
      <p>نعيد ترتيب المعادلة <span class="mono">f(x) = 0</span> إلى الصورة <span class="mono">x = g(x)</span>، ثم نكرّر:</p>
      <div class="formula">
        <div class="fx">x<sub>k</sub> = g(x<sub>k−1</sub>), &nbsp; x<sub>0</sub><span class="ar-inline"> معطى</span></div>
        <div class="cap">شرط التقارب: |g′(x)| &lt; 1 قرب الجذر</div>
      </div>
      <p>الترتيب مهم: المعادلة نفسها يمكن ترتيبها بأكثر من صورة، بعضها يتقارب وبعضها يتباعد.</p>
      <div class="example">
        <div class="example-head"><b>مثال المحاضرة · x² − 2x − 8 = 0</b><span class="badge">الجذور: 4 و −2</span></div>
        <div class="example-body">
          <p><b>الصيغة الأولى (تتباعد):</b> <span class="mono">x = (x² − 8)/2</span>، و g′(x) = x. عند الجذر 4: |g′| = 4 &gt; 1 ← تباعد.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Iter</th><th>x<sub>i</sub></th><th>x<sub>i+1</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>1</td><td>−3.5</td><td>128.57</td></tr>
              <tr><td>2</td><td>−3.5</td><td>2.125</td><td>264.71</td></tr>
              <tr><td>3</td><td>2.125</td><td>−1.7422</td><td>221.97</td></tr>
              <tr><td>4</td><td>−1.7422</td><td>−2.4824</td><td>29.82</td></tr>
            </tbody>
          </table></div>
          <p><b>الصيغة الثانية (تتقارب):</b> <span class="mono">x = √(2x + 8)</span>، و g′(x) = 1/√(2x+8). عند 4: g′ = 0.25 &lt; 1 ← تقارب.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Iter</th><th>x<sub>i</sub></th><th>x<sub>i+1</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>1</td><td>3.1623</td><td>68.38</td></tr>
              <tr><td>2</td><td>3.1623</td><td>3.7848</td><td>16.45</td></tr>
              <tr><td>3</td><td>3.7848</td><td>3.9458</td><td>4.08</td></tr>
              <tr><td>4</td><td>3.9458</td><td>3.9864</td><td>1.02</td></tr>
              <tr><td>5</td><td>3.9864</td><td>3.9966</td><td>0.25</td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    `},
    { h: "نيوتن-رافسون: الاشتقاق", html: `
      <p>من تايلور: <span class="mono">f(x+h) ≈ f(x) + f′(x)h</span>. نريد f(x+h) = 0، إذن:</p>
      <div class="formula">
        <div class="fx">h = −<span class="frac"><span class="num">f(x)</span><span class="den">f′(x)</span></span> &nbsp; ⇒ &nbsp; x<sub>i+1</sub> = x<sub>i</sub> − <span class="frac"><span class="num">f(x<sub>i</sub>)</span><span class="den">f′(x<sub>i</sub>)</span></span></div>
        <div class="cap">هندسياً: مماس الدالة عند x<sub>i</sub> يقطع محور x عند x<sub>i+1</sub></div>
      </div>
      <p>إذا كان التقدير الأولي قريباً من جذر بسيط، فالتقارب <b>تربيعي</b>: عدد الأرقام الصحيحة يتضاعف تقريباً كل تكرار. عند الجذر المكرر (f = f′ = 0) يصبح التقارب خطياً.</p>
      <div class="callout warn"><span class="ct">متى يفشل نيوتن؟</span> إذا كانت f′(x<sub>i</sub>) = 0 (مماس أفقي)، أو كان التقدير بعيداً جداً، أو كانت الدالة تتذبذب. لا يوجد ضمان تقارب بعكس طرق التجميع.</div>
    `},
    { h: "سؤال الامتحان: 3 تكرارات لنيوتن", html: `
      <div class="example">
        <div class="example-head"><b>Q2b · Spring 2024 · 18 marks</b><span class="badge m">x<sub>0</sub> = 0</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">For f(x) = x³ − 9x + 2, use Newton-Raphson (3 iterations, x₀ = 0). Compute RAE each iteration.</p>
          <p>f′(x) = 3x² − 9.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>i</th><th>x<sub>i</sub></th><th>f(x<sub>i</sub>)</th><th>f′(x<sub>i</sub>)</th><th>x<sub>i+1</sub></th><th>|Δ|</th><th>ε<sub>a</sub> %</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>0</td><td>2</td><td>−9</td><td>0.2222</td><td>0.2222</td><td>100</td></tr>
              <tr><td>2</td><td>0.2222</td><td>0.01097</td><td>−8.8519</td><td>0.22346</td><td>0.00124</td><td>0.5548</td></tr>
              <tr><td>3</td><td>0.22346</td><td>1.03×10⁻⁶</td><td>−8.8502</td><td class="hl">0.223462</td><td>1.16×10⁻⁷</td><td class="hl">0.00005</td></tr>
            </tbody>
          </table></div>
          <p>الجذر ≈ <b>0.22346</b>. ملاحظة: إذا قرّبت x إلى 4 منازل قبل كل خطوة ستحصل على ε<sub>a</sub> ≈ 0.045% في التكرار الثالث (كما في السلايد) بسبب التقريب — وكلاهما مقبول إذا أظهرت خطواتك.</p>
        </div>
      </div>
      <div class="example">
        <div class="example-head"><b>Newton من نقطة بعيدة</b><span class="badge">x<sub>0</sub> = 4</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">ابدأ من <span class="mono" dir="ltr">x = 4</span> وطبّق نيوتن على <span class="mono" dir="ltr">f(x) = x³ − 2x² + x − 3</span>.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>i</th><th>x<sub>i</sub></th><th>f(x<sub>i</sub>)</th><th>f′(x<sub>i</sub>)</th><th>x<sub>i+1</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>4</td><td>33</td><td>33</td><td>3</td><td>33.33</td></tr>
              <tr><td>2</td><td>3</td><td>9</td><td>16</td><td>2.4375</td><td>23.08</td></tr>
              <tr><td>3</td><td>2.4375</td><td>2.0369</td><td>9.0742</td><td>2.2130</td><td>10.14</td></tr>
              <tr><td>4</td><td>2.2130</td><td>0.2564</td><td>6.8404</td><td class="hl">2.1756</td><td class="hl">1.723</td></tr>
            </tbody>
          </table></div>
          <p>الجذر ≈ 2.1746. لاحظ كيف يقفز من 4 إلى 3 ثم يقترب بسرعة بعد أن صار قريباً.</p>
        </div>
      </div>
    `},
    { h: "طريقة القاطع (Secant)", html: `
      <p>لا تحتاج مشتقة: نستبدلها بفرق منتهٍ بين نقطتين.</p>
      <div class="formula">
        <div class="fx">f′(x<sub>i</sub>) ≈ <span class="frac"><span class="num">f(x<sub>i</sub>) − f(x<sub>i−1</sub>)</span><span class="den">x<sub>i</sub> − x<sub>i−1</sub></span></span></div>
        <div class="fx">x<sub>i+1</sub> = x<sub>i</sub> − <span class="frac"><span class="num">f(x<sub>i</sub>)(x<sub>i</sub> − x<sub>i−1</sub>)</span><span class="den">f(x<sub>i</sub>) − f(x<sub>i−1</sub>)</span></span></div>
        <div class="cap">تحتاج نقطتين ابتدائيتين. رتبة التقارب ≈ 1.618 (أسرع من الخطي وأبطأ من التربيعي)</div>
      </div>
      <div class="example">
        <div class="example-head"><b>مثال المحاضرة</b><span class="badge">x<sub>0</sub> = −1, x<sub>1</sub> = −1.1</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">Find a root of f(x) = x⁵ + x³ + 3 with x₀ = −1 and x₁ = −1.1.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>i</th><th>x<sub>i</sub></th><th>f(x<sub>i</sub>)</th><th>x<sub>i+1</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>−1</td><td>1</td><td>−1.10621</td><td>—</td></tr>
              <tr><td>2</td><td>−1.10621</td><td>−0.010183</td><td>−1.10529</td><td>0.0833</td></tr>
              <tr><td>3</td><td>−1.10529</td><td>0.000082</td><td class="hl">−1.10530</td><td class="hl">0.0007</td></tr>
            </tbody>
          </table></div>
          <p>ثلاث تكرارات فقط تكفي للوصول إلى 5 منازل. لاحظ أن f(x) تغيّرت إشارتها بين −1 و −1.1، وهذا يضمن وجود جذر.</p>
        </div>
      </div>
    `},
    { h: "القاطع المعدّل (Modified Secant)", html: `
      <p>نحتاج نقطة واحدة فقط: نُزعج x بمقدار صغير δ ونقدّر المشتقة.</p>
      <div class="formula">
        <div class="fx">f′(x<sub>i</sub>) ≈ <span class="frac"><span class="num">f(x<sub>i</sub> + δx<sub>i</sub>) − f(x<sub>i</sub>)</span><span class="den">δx<sub>i</sub></span></span></div>
        <div class="fx">x<sub>i+1</sub> = x<sub>i</sub> − <span class="frac"><span class="num">δ x<sub>i</sub> f(x<sub>i</sub>)</span><span class="den">f(x<sub>i</sub> + δx<sub>i</sub>) − f(x<sub>i</sub>)</span></span></div>
        <div class="cap">δ صغيرة عادة (1% أو 0.01). اختيارها الخاطئ قد يُبعد الطريقة</div>
      </div>
      <div class="example">
        <div class="example-head"><b>Modified secant</b><span class="badge">f = e<sup>−x</sup> − x, x<sub>0</sub> = 0.5, δ = 0.01</span></div>
        <div class="example-body">
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>x<sub>i</sub></th><th>x<sub>i+1</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
            <tbody>
              <tr><td>0.5</td><td>0.566374</td><td>11.72</td></tr>
              <tr><td>0.566374</td><td>0.567144</td><td>0.1358</td></tr>
              <tr><td>0.567144</td><td class="hl">0.567143</td><td class="hl">0.0001</td></tr>
            </tbody>
          </table></div>
          <p>الجذر 0.567143. الطريقة تعمل تقريباً كنيوتن دون الحاجة للمشتقة التحليلية.</p>
        </div>
      </div>
    `},
    { h: "مقارنة الطرق", html: `
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>Method</th><th>يحتاج</th><th>الترتيب</th><th>ملاحظة الامتحان</th></tr></thead>
        <tbody>
          <tr><td>Bisection</td><td class="ar">فترة</td><td>1</td><td class="ar">مضمون، بطيء</td></tr>
          <tr><td>False position</td><td class="ar">فترة</td><td class="ar">~1</td><td class="ar">أسرع عادة، قد يتجمّد</td></tr>
          <tr><td>Fixed point</td><td class="ar">g(x) و x₀</td><td>1</td><td class="ar">يعتمد على |g′| &lt; 1</td></tr>
          <tr><td>Newton</td><td class="ar">f′ و x₀</td><td>2</td><td class="ar">الأسرع، قد يفشل</td></tr>
          <tr><td>Secant</td><td class="ar">نقطتان</td><td>1.618</td><td class="ar">لا مشتقة</td></tr>
          <tr><td>Modified secant</td><td class="ar">نقطة + δ</td><td>~1.618</td><td class="ar">بديل المشتقة</td></tr>
        </tbody>
      </table></div>
      <div class="callout exam"><span class="ct">سؤال متوقع</span>«Compare bisection and Newton in terms of convergence.» نيوتن تربيعي (أرقام صحيحة تتضاعف)، التنصيف خطي (خطأ ينصف). نيوتن أسرع لكنه ليس مضموناً ويحتاج المشتقة وتقديراً جيداً. «Why does Newton converge linearly at multiple roots؟» لأن f و f′ يقتربان من الصفر معاً فتضيع معلومة الميل.</div>
    `}
  ],
  traps: [
    "εa في التكرار الأول = 100% في نيوتن (لأن x0→x1) أو — حسب طريقة العرض.",
    "في القاطع استخدم النقطتين السابقتين وليس نفس النقطة مرتين.",
    "لا تنسَ إشارة f في البسط والمقام.",
    "شرط تقارب نقطة التثبيت |g′(root)| < 1 وليس |g′| < 1 في كل مكان.",
    "القاطع يحتاج نقطتين، والمعدّل يحتاج نقطة و δ."
  ],
  checks: [
    { q: "لماذا يتقارب √(2x+8) ويتباعد (x²−8)/2 عند الجذر 4؟", a: "لأن |g′(4)| = 0.25 < 1 في الأولى، و|g′(4)| = 4 > 1 في الثانية." },
    { q: "ما رتبة تقارب نيوتن عند جذر بسيط؟", a: "تربيعي (order 2)." },
    { q: "ما الفرق الجوهري بين القاطع والقاطع المعدّل؟", a: "القاطع يحتاج نقطتين ابتدائيتين، المعدّل يحتاج نقطة واحدة وδ صغيرة." }
  ]
},
{
  id: "linear-systems", n: 6,
  title: "الأنظمة الخطية", en: "Gauss · Pivoting · LU · Gauss-Seidel",
  lecture: "Lectures 7, 8 + Tutorial 2", weight: "سؤال 3 (25 درجة)", time: "110 دقائق",
  summary: "أثقل سؤال في الامتحان (25 درجة). تحتاج إتقان: الحذف الأمامي، التعويض الخلفي، LU، والمحورية الجزئية المقاسة، مع Gauss-Seidel كطريقة تكرارية.",
  sections: [
    { h: "الصيغة والمفاهيم", html: `
      <div class="formula">
        <div class="fx">A X = B &nbsp;&nbsp; ⇒ &nbsp;&nbsp;
        <span class="mat">[ a<sub>11</sub> a<sub>12</sub> a<sub>13</sub> ; a<sub>21</sub> a<sub>22</sub> a<sub>23</sub> ; a<sub>31</sub> a<sub>32</sub> a<sub>33</sub> ]</span>
        <span class="mat">[ x<sub>1</sub> ; x<sub>2</sub> ; x<sub>3</sub> ]</span> =
        <span class="mat">[ b<sub>1</sub> ; b<sub>2</sub> ; b<sub>3</sub> ]</span></div>
      </div>
      <ul>
        <li><b>حل وحيد</b> إذا det(A) ≠ 0 والمصفوفة المختزلة بلا صفوف صفرية.</li>
        <li><b>لا حل</b> إذا ظهر صف صفري مع عنصر b غير صفري (0 = عدد ≠ 0).</li>
        <li><b>عدد لا نهائي من الحلول</b> إذا ظهر صف صفري مع b = 0.</li>
      </ul>
      <p>قاعدة كرامر غير عملية: حل نظام 30×30 يحتاج نحو 2.38×10³⁵ عملية ضرب. لذلك نستخدم الحذف.</p>
    `},
    { h: "الحذف الغاوسي البسيط", html: `
      <p>مرحلتان: <b>Forward Elimination</b> لجعل المصفوفة مثلثية عليا، ثم <b>Backward Substitution</b> من الأخير إلى الأول.</p>
      <p>لحذف x<sub>k</sub> من الصف i: اضرب صف المحور في <span class="mono">m = a<sub>ik</sub>/a<sub>kk</sub></span> واطرحه.</p>
      <div class="example">
        <div class="example-head"><b>Naive Gauss Elimination</b><span class="badge">3×3</span></div>
        <div class="example-body">
          <div class="formula"><div class="fx">x<sub>1</sub> + 2x<sub>2</sub> + 3x<sub>3</sub> = 8<br>2x<sub>1</sub> + 3x<sub>2</sub> + 2x<sub>3</sub> = 10<br>3x<sub>1</sub> + x<sub>2</sub> + 2x<sub>3</sub> = 7</div></div>
          <p><b>حذف x₁:</b> m₂₁ = 2، m₃₁ = 3.</p>
          <div class="formula"><div class="fx">R<sub>2</sub> ← R<sub>2</sub> − 2R<sub>1</sub>: &nbsp; −x<sub>2</sub> − 4x<sub>3</sub> = −6<br>R<sub>3</sub> ← R<sub>3</sub> − 3R<sub>1</sub>: &nbsp; −5x<sub>2</sub> − 7x<sub>3</sub> = −17</div></div>
          <p><b>حذف x₂:</b> m₃₂ = (−5)/(−1) = 5.</p>
          <div class="formula"><div class="fx">R<sub>3</sub> ← R<sub>3</sub> − 5R<sub>2</sub>: &nbsp; 13x<sub>3</sub> = 13 &nbsp; ⇒ &nbsp; x<sub>3</sub> = 1</div></div>
          <p><b>التعويض الخلفي:</b> −x₂ − 4(1) = −6 ⇒ x₂ = 2. ثم x₁ + 2(2) + 3(1) = 8 ⇒ x₁ = 1.</p>
          <p><b>الحل:</b> X = [1, 2, 1]<sup>T</sup>.</p>
        </div>
      </div>
    `},
    { h: "المشاكل والمحورية الجزئية المقاسة", html: `
      <p>الحذف البسيط يفشل إذا كان عنصر المحور صفراً (قسمة على صفر)، أو صغيراً جداً (خطأ تقريب كارثي). مثال:</p>
      <div class="formula"><div class="fx">[ 10<sup>−10</sup> &nbsp; 1 ; 1 &nbsp; 1 ] [x<sub>1</sub> ; x<sub>2</sub>] = [1 ; 2]</div><div class="cap">المحور صغير جداً ⇒ الحل غير دقيق</div></div>
      <p><b>Scaled partial pivoting:</b> نختار الصف الذي يحقق أكبر نسبة <span class="mono">|a<sub>ik</sub>| / s<sub>i</sub></span>، حيث s<sub>i</sub> أكبر عنصر بالقيمة المطلقة في الصف i (من المصفوفة الأصلية، ولا يتغير). نستخدم متجه فهارس L لتبديل الصفوف دون تحريك البيانات.</p>
      <div class="example">
        <div class="example-head"><b>Scaled partial pivoting</b><span class="badge">Tutorial 2 · Problem 9.10</span></div>
        <div class="example-body">
          <div class="formula"><div class="fx">2x<sub>1</sub> − 6x<sub>2</sub> − x<sub>3</sub> = −38<br>−3x<sub>1</sub> − x<sub>2</sub> + 7x<sub>3</sub> = −34<br>−8x<sub>1</sub> + x<sub>2</sub> − 2x<sub>3</sub> = −20</div></div>
          <p>S = [6, 7, 8]، L = [1, 2, 3].</p>
          <p><b>الخطوة 1:</b> النسب |2|/6 = 0.3333، |−3|/7 = 0.4286، |−8|/8 = 1 ← الصف 3 هو المحور. L = [3, 2, 1]. بعد الحذف:</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Row (order L)</th><th>x₁</th><th>x₂</th><th>x₃</th><th>b</th></tr></thead>
            <tbody>
              <tr><td>3 (pivot)</td><td>−8</td><td>1</td><td>−2</td><td>−20</td></tr>
              <tr><td>1</td><td>0</td><td>−5.75</td><td>−1.5</td><td>−43</td></tr>
              <tr><td>2</td><td>0</td><td>−1.375</td><td>7.75</td><td>−26.5</td></tr>
            </tbody>
          </table></div>
          <p><b>الخطوة 2:</b> النسب |−5.75|/6 = 0.9583 و|−1.375|/7 = 0.1964 ← الصف 1 هو المحور الثاني. L = [3, 1, 2]. ينتج:</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Row</th><th>x₁</th><th>x₂</th><th>x₃</th><th>b</th></tr></thead>
            <tbody>
              <tr><td>3</td><td>−8</td><td>1</td><td>−2</td><td>−20</td></tr>
              <tr><td>1</td><td>0</td><td>−5.75</td><td>−1.5</td><td>−43</td></tr>
              <tr><td>2</td><td>0</td><td>0</td><td>8.10870</td><td>−16.21739</td></tr>
            </tbody>
          </table></div>
          <p><b>التعويض الخلفي:</b> x₃ = −16.21739/8.10870 = −2، ثم x₂ = (−43 − (−1.5)(−2))/(−5.75) = 8، ثم x₁ = (−20 − 1(8) − (−2)(−2))/(−8) = 4.</p>
          <p><b>الحل:</b> X = [4, 8, −2]<sup>T</sup>.</p>
        </div>
      </div>
    `},
    { h: "تحليل LU (سؤال الامتحان)", html: `
      <p>نكتب A = L·U، حيث L مثلثية سفلى بقطر آحاد، وU مثلثية عليا. عناصر L غير القطرية هي <b>مضاعفات الحذف</b> نفسها.</p>
      <div class="formula"><div class="fx">L Z = B &nbsp; ⇒ &nbsp; Z</div><div class="fx">U X = Z &nbsp; ⇒ &nbsp; X</div><div class="cap">أمامي ثم خلفي — والميزة أن A تُحلّل مرة واحدة لعدة أطراف يمين</div></div>
      <div class="example">
        <div class="example-head"><b>Q3 · Spring 2024 · 25 marks</b><span class="badge m">LU decomposition</span></div>
        <div class="example-body">
          <div class="formula"><div class="fx">x<sub>1</sub> + x<sub>2</sub> + x<sub>3</sub> = 1<br>4x<sub>1</sub> + 3x<sub>2</sub> − x<sub>3</sub> = 6<br>3x<sub>1</sub> + 5x<sub>2</sub> + 3x<sub>3</sub> = 4</div></div>
          <p><b>1) الحذف:</b> m₂₁ = 4، m₃₁ = 3.</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Step</th><th>x₁</th><th>x₂</th><th>x₃</th><th>b</th></tr></thead>
            <tbody>
              <tr><td>R₁</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>
              <tr><td>R₂ − 4R₁</td><td>0</td><td>−1</td><td>−5</td><td>2</td></tr>
              <tr><td>R₃ − 3R₁</td><td>0</td><td>2</td><td>0</td><td>1</td></tr>
              <tr><td>R₃ + 2R₂</td><td>0</td><td>0</td><td>−10</td><td>5</td></tr>
            </tbody>
          </table></div>
          <p>إذن m₃₂ = 2/(−1) = −2. الناتج:</p>
          <div class="formula"><div class="fx">L = [1 0 0 ; 4 1 0 ; 3 −2 1], &nbsp; U = [1 1 1 ; 0 −1 −5 ; 0 0 −10]</div></div>
          <p><b>2) تحقق:</b> L·U = A ✓ (اضرب الصف الثاني: [4, 4−1, 4−5] = [4,3,−1]).</p>
          <p><b>3) حل LZ = B:</b></p>
          <div class="formula"><div class="fx">z<sub>1</sub> = 1<br>4z<sub>1</sub> + z<sub>2</sub> = 6 ⇒ z<sub>2</sub> = 2<br>3z<sub>1</sub> − 2z<sub>2</sub> + z<sub>3</sub> = 4 ⇒ z<sub>3</sub> = 5</div></div>
          <p><b>4) حل UX = Z:</b></p>
          <div class="formula"><div class="fx">−10x<sub>3</sub> = 5 ⇒ x<sub>3</sub> = −0.5<br>−x<sub>2</sub> − 5(−0.5) = 2 ⇒ x<sub>2</sub> = 0.5<br>x<sub>1</sub> + 0.5 − 0.5 = 1 ⇒ x<sub>1</sub> = 1</div></div>
          <p><b>الإجابة:</b> X = [1, 0.5, −0.5]<sup>T</sup>.</p>
          <p class="small muted">تحقق سريع: 3(1) + 5(0.5) + 3(−0.5) = 4 ✓.</p>
        </div>
      </div>
    `},
    { h: "Gauss-Seidel التكرارية", html: `
      <p>نحل كل معادلة بالنسبة لمتغيرها القطري، ونستخدم القيم المحدّثة <b>فوراً</b> داخل نفس التكرار:</p>
      <div class="formula">
        <div class="fx">x<sub>1</sub> = (b<sub>1</sub> − a<sub>12</sub>x<sub>2</sub> − a<sub>13</sub>x<sub>3</sub>)/a<sub>11</sub></div>
        <div class="fx">x<sub>2</sub> = (b<sub>2</sub> − a<sub>21</sub>x<sub>1</sub><sup>new</sup> − a<sub>23</sub>x<sub>3</sub>)/a<sub>22</sub></div>
        <div class="fx">x<sub>3</sub> = (b<sub>3</sub> − a<sub>31</sub>x<sub>1</sub><sup>new</sup> − a<sub>32</sub>x<sub>2</sub><sup>new</sup>)/a<sub>33</sub></div>
      </div>
      <p>يتقارب إذا كانت المصفوفة <b>سائدة قطرياً</b>: |a<sub>ii</sub>| &gt; مجموع باقي عناصر الصف. هذا شرط كافٍ وليس ضرورياً.</p>
      <div class="example">
        <div class="example-head"><b>Gauss-Seidel · 5 iterations</b><span class="badge m">ε<sub>s</sub> = 5%</span></div>
        <div class="example-body">
          <div class="formula"><div class="fx">10x<sub>1</sub> + 2x<sub>2</sub> − x<sub>3</sub> = 27<br>−3x<sub>1</sub> − 6x<sub>2</sub> + 2x<sub>3</sub> = −61.5<br>x<sub>1</sub> + x<sub>2</sub> + 5x<sub>3</sub> = −21.5</div></div>
          <p>السيادة القطرية: 10 &gt; 2+1، 6 &gt; 3+2، 5 &gt; 1+1 ✓. ابدأ من (0,0,0).</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Iter</th><th>x₁</th><th>x₂</th><th>x₃</th><th>max ε<sub>a</sub> %</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>2.7</td><td>8.9</td><td>−6.62</td><td>100</td></tr>
              <tr><td>2</td><td>0.258</td><td>7.9143</td><td>−5.9345</td><td>946.5</td></tr>
              <tr><td>3</td><td>0.52369</td><td>8.0100</td><td>−6.00674</td><td>50.73</td></tr>
              <tr><td>4</td><td>0.49733</td><td>7.99909</td><td>−5.99928</td><td>5.30</td></tr>
              <tr><td>5</td><td class="hl">0.50025</td><td class="hl">8.00011</td><td class="hl">−6.00007</td><td class="hl">0.585</td></tr>
            </tbody>
          </table></div>
          <p>بعد 5 تكرارات كل الأخطاء أقل من 5%، والحل يقترب من (0.5, 8, −6). لاحظ أن أكبر خطأ في التكرار الثاني سببه أن x₁ قفز من 2.7 إلى 0.258.</p>
        </div>
      </div>
    `},
    { h: "التحقق: متجه البواقي والاستقرار", html: `
      <div class="formula"><div class="fx">R = A X − B</div><div class="cap">الحل مقبول إذا كان أكبر عنصر في R أقل من التحمّل. احسب دائماً بالمصفوفة الأصلية A و B</div></div>
      <p><b>Ill-conditioned:</b> تغيير صغير في المعاملات يسبب تغيراً كبيراً في الحل. مثال المحاضرة:</p>
      <div class="formula"><div class="fx">x<sub>1</sub> + 2x<sub>2</sub> = 10 &nbsp; ; &nbsp; 1.1x<sub>1</sub> + 2x<sub>2</sub> = 10.4 &nbsp; ⇒ &nbsp; (4, 3)</div></div>
      <p>غيّر 1.1 إلى 1.05 فقط: <span class="mono">0.05x₁ = 0.4 ⇒ x₁ = 8</span> و<span class="mono">x₂ = 1</span>. تغيّر 4.5% في المعامل أخرج حلاً مختلفاً تماماً. هذه هي سوء الاشتراط.</p>
    `}
  ],
  traps: [
    "مضاعف الحذف m = a_ik / a_kk وليس معكوسه.",
    "في LU: عناصر L هي المضاعفات بإشارتها (m₃₂ = −2 وليس 2).",
    "احسب Z أولاً (LZ = B) ثم X (UX = Z) — لا تخلط الترتيب.",
    "Gauss-Seidel يستخدم القيمة المحدّثة فوراً، وليس قيم التكرار السابق كلها (هذا Jacobi).",
    "الخطأ النسبي لكل متغير على حدة، ثم تؤخذ القيمة العظمى.",
    "الباقي R يُحسب بـ A الأصلية وليس بالمصفوفة المثلثية."
  ],
  checks: [
    { q: "في LU للسؤال، ما z₃؟", a: "5، من 3(1) − 2(2) + z₃ = 4." },
    { q: "لماذا نستخدم متجه الفهارس L بدل تبديل الصفوف؟", a: "لأن تبديل صف كامل مكلف في الأنظمة الكبيرة، وتبديل فهرس واحد أرخص." },
    { q: "هل السيادة القطرية شرط ضروري للتقارب؟", a: "لا، هي شرط كافٍ فقط؛ قد يتقارب Gauss-Seidel بدونها." }
  ]
}
);
