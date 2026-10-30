window.LESSONS = window.LESSONS || [];
LESSONS.push(
{
  id: "bisection", n: 3,
  title: "طريقة التنصيف", en: "Bisection Method",
  lecture: "Lecture 3", weight: "أساس طرق التجميع", time: "50 دقيقة",
  summary: "أبسط طريقة مضمونة: نصف الفترة في كل خطوة. تحتاج فقط إشارتين متعاكستين، خطؤها يتناقص للنصف كل تكرار، وعدد التكرارات يُحسب مسبقاً.",
  sections: [
    { h: "الجذر والصفر", html: `
      <p>حل المعادلة <span class="mono">f(x) = 0</span> يعني إيجاد العدد r الذي يجعل الدالة صفراً. هذا العدد يُسمى جذراً للمعادلة وصفراً للدالة. هندسياً: نقطة تقاطع المنحنى مع محور x.</p>
      <ul>
        <li>كثيرة حدود من الدرجة n لها بالضبط n جذراً (حقيقية ومركبة، مع التكرار).</li>
        <li>كثيرة حدود من درجة فردية لها جذر حقيقي واحد على الأقل.</li>
        <li>جذر مكرر بمرتبة m: الدالة ومشتقاتها حتى (m−1) تساوي صفراً عند r، والمشتقة m لا.</li>
      </ul>
      <p>مثال: <span class="mono">x⁴ − 3x³ − 7x² + 15x + 18 = (x−2)(x−3)²(x+1)</span>، الجذور: 2، 3 (مكرر مرتين)، −1.</p>
    `},
    { h: "مبرهنة القيمة المتوسطة وشرط البداية", html: `
      <div class="callout tip"><span class="ct">Intermediate Value Theorem</span>إذا كانت f مستمرة على [a,b] و<span class="mono">f(a)·f(b) &lt; 0</span> (إشارتان متعاكستان)، فالمعادلة تملك جذراً واحداً على الأقل في [a,b].</div>
      <p>إذا كانت الإشارتان متشابهتين، قد يوجد عدد زوجي من الجذور أو لا يوجد جذر. في هذه الحالة لا تستطيع طريقة التنصيف البدء.</p>
      <div class="example">
        <div class="example-head"><b>Check the interval</b><span class="badge">Bisection requirement</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">Can you use bisection on f(x) = x³ − 3x + 1 over [0,2]?</p>
          <p>f(0) = 1 و f(2) = 3، حاصل الضرب 3 &gt; 0 ← <b>لا</b>. الجذران موجودان فعلاً في [0,2] لكن العدد زوجي. على [0,1]: f(0)=1 و f(1)=−1 ← <b>نعم</b>، الطريقة صالحة.</p>
        </div>
      </div>
    `},
    { h: "الخوارزمية", html: `
      <ol>
        <li>ابدأ بفترة [a,b] تحقق <span class="mono">f(a)·f(b) &lt; 0</span>.</li>
        <li>احسب نقطة المنتصف <span class="mono">c = (a+b)/2</span>.</li>
        <li>احسب f(c).</li>
        <li>إذا <span class="mono">f(a)·f(c) &lt; 0</span> فالجذر في [a,c] ← اجعل b = c. وإلا فالجذر في [c,b] ← اجعل a = c.</li>
        <li>كرر حتى يتحقق شرط التوقف.</li>
      </ol>
      <div class="formula">
        <div class="fx">c<sub>n</sub> = <span class="frac"><span class="num">a + b</span><span class="den">2</span></span>, &nbsp;&nbsp; |error| ≤ <span class="frac"><span class="num">b − a</span><span class="den">2<sup>n</sup></span></span></div>
        <div class="cap">بعد n تكرار ينصف عرض الفترة، ويُستخدم عرض الفترة الحالية كحد أعلى للخطأ (اصطلاح المحاضرة)</div>
      </div>
      <div class="formula">
        <div class="fx">n ≥ log<sub>2</sub>( <span class="frac"><span class="num">b − a</span><span class="den">ε<sub>s</sub></span></span> )</div>
        <div class="cap">عدد التكرارات المطلوب مسبقاً — استخدم السقف ceil</div>
      </div>
    `},
    { h: "مثال كامل: cos على [0.5, 0.9]", html: `
      <div class="example">
        <div class="example-head"><b>Bisection · 5 iterations</b><span class="badge">|error| &lt; 0.02</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">Find a root of x − cos(x) = 0 with absolute error &lt; 0.02, starting from [0.5, 0.9].</p>
          <p>f(0.5) = −0.3776 و f(0.9) = 0.2784 ← الشرط محقق. عدد التكرارات: <span class="mono">log₂(0.4/0.02) = 4.32</span> ← 5 تكرارات.</p>
          <div class="callout warn"><span class="ct">ملاحظة على السلايد</span>السلايد يكتب f(x) = cos(x) لكن الأرقام (f(0.5) = −0.3776) تعني f(x) = x − cos(x). الجذر الحقيقي 0.739085.</div>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Iter</th><th>a</th><th>f(a)</th><th>b</th><th>f(b)</th><th>c</th><th>f(c)</th><th>Error ≤</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>0.5</td><td>−0.3776</td><td>0.9</td><td>0.2784</td><td>0.7</td><td>−0.0648</td><td>0.2</td></tr>
              <tr><td>2</td><td>0.7</td><td>−0.0648</td><td>0.9</td><td>0.2784</td><td>0.8</td><td>0.1033</td><td>0.1</td></tr>
              <tr><td>3</td><td>0.7</td><td>−0.0648</td><td>0.8</td><td>0.1033</td><td>0.75</td><td>0.0183</td><td>0.05</td></tr>
              <tr><td>4</td><td>0.7</td><td>−0.0648</td><td>0.75</td><td>0.0183</td><td>0.725</td><td>−0.0235</td><td>0.025</td></tr>
              <tr><td>5</td><td>0.725</td><td>−0.0235</td><td>0.75</td><td>0.0183</td><td class="hl">0.7375</td><td>−0.00265</td><td class="hl">0.0125</td></tr>
            </tbody>
          </table></div>
          <p>بعد 5 تكرارات: الفترة [0.725, 0.75]، أفضل تقدير للجذر <b>0.7375</b>، والخطأ المطلق أقل من <b>0.0125</b>.</p>
        </div>
      </div>
    `},
    { h: "التقارب والمزايا والعيوب", html: `
      <p>التنصيف يتقارب <b>خطياً</b> (order 1): الخطأ ينصف في كل تكرار، أي نحتاج نحو 3.3 تكرار لكل رقم عشري إضافي. بطيء لكنه مضمون.</p>
      <div class="grid g2">
        <div class="card flat"><h3>مزايا</h3><ul class="small">
          <li>بسيطة وسهلة البرمجة.</li>
          <li>تقييم واحد للدالة في كل تكرار.</li>
          <li>عدد التكرارات معروف مسبقاً.</li>
          <li>لا تحتاج المشتقة، والدالة لا يجب أن تكون قابلة للاشتقاق.</li>
          <li>مضمونة التقارب إذا تحقق الشرط.</li>
        </ul></div>
        <div class="card flat"><h3>عيوب</h3><ul class="small">
          <li>بطيئة.</li>
          <li>قد تهمل تقديرات وسيطة جيدة.</li>
          <li>لا تستفيد من قيم f(a) و f(b) (بعكس الوضع الزائف).</li>
          <li>تفشل إذا كانت الإشارتان متشابهتين.</li>
        </ul></div>
      </div>
      <div class="callout exam"><span class="ct">سؤال متوقع</span>«How many iterations are needed for [1,2] with ε = 0.0001؟» ← <span class="mono">log₂(1/0.0001) = 13.29</span> ← 14 تكراراً. و«What is the error after the first iteration؟» ← نصف عرض الفترة الأصلية.</div>
    `}
  ],
  traps: [
    "بعد n تكرار الخطأ ≤ (b−a)/2^n، وليس (b−a).",
    "عدد التكرارات يُقرّب للأعلى (ceil) وليس للأقرب.",
    "اختبار الإشارة يستخدم f(a)·f(c) وليس f(c) وحدها.",
    "لا تبدأ إذا كانت f(a)·f(b) > 0.",
    "التقدير النهائي هو منتصف الفترة الأخيرة، وليس الحد الذي تم استبداله."
  ],
  checks: [
    { q: "كم تكراراً لـ [3,4] و ε = 0.001؟", a: "log₂(1/0.001) = 9.97 ← 10 تكرارات." },
    { q: "بعد 3 تكرارات من [1,2]، ما حد الخطأ؟", a: "(2−1)/2³ = 0.125 (عرض الفترة الحالية)." },
    { q: "ما رتبة تقارب التنصيف؟", a: "خطي (order 1)، لأن الخطأ ينصف كل تكرار." }
  ]
},
{
  id: "false-position", n: 4,
  title: "الوضع الزائف", en: "False Position (Regula Falsi)",
  lecture: "Lecture 4 + Tutorial 1", weight: "سؤال 2a (18 درجة)", time: "70 دقيقة",
  summary: "طريقة تجميع ذكية: تستبدل التنصيف بخط مستقيم بين طرفي الفترة، فتقترب من الجذر أسرع بكثير. لكنها قد تتجمّد عند طرف واحد، وهنا يأتي تعديل Illinois.",
  sections: [
    { h: "الفكرة", html: `
      <p>التنصيف يقسم الفترة نصفين دون النظر إلى قيم الدالة. لكن إذا كانت f(a) قريبة من الصفر أكثر من f(b)، فالأرجح أن الجذر أقرب إلى a. الوضع الزائف يصل الطرفين بخط مستقيم، ونقطة تقاطع هذا الخط مع محور x هي التقدير الجديد.</p>
      <div class="formula">
        <div class="fx">x<sub>m</sub> = x<sub>u</sub> − <span class="frac"><span class="num">f(x<sub>u</sub>)(x<sub>L</sub> − x<sub>U</sub>)</span><span class="den">f(x<sub>L</sub>) − f(x<sub>U</sub>)</span></span></div>
        <div class="cap">x<sub>L</sub> الطرف الأدنى، x<sub>U</sub> الطرف الأعلى</div>
      </div>
      <p>ثم نستبدل الطرف الذي يحمل نفس إشارة f(x<sub>m</sub>)، تماماً كما في التنصيف. الفرق الوحيد هو صيغة النقطة الجديدة.</p>
    `},
    { h: "سؤال الامتحان: 3 تكرارات", html: `
      <div class="example">
        <div class="example-head"><b>Q2a · Spring 2024 · 18 marks</b><span class="badge m">3 iterations</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">Consider f(x) = e<sup>−x</sup>(3.2 sin x − 0.5 cos x). Use false position on [3,4] for 3 iterations and compute the relative approximate error each time.</p>
          <p>f(3) = 0.04713، f(4) = −0.03837. الجذر الحقيقي 3.29659 (لأن tan x = 0.5/3.2).</p>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>#</th><th>x<sub>L</sub></th><th>f(x<sub>L</sub>)</th><th>x<sub>U</sub></th><th>f(x<sub>U</sub>)</th><th>x<sub>m</sub></th><th>f(x<sub>m</sub>)</th><th>ε<sub>a</sub> %</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>3</td><td>0.04713</td><td>4</td><td>−0.03837</td><td>3.5512</td><td>−0.02341</td><td>—</td></tr>
              <tr><td>2</td><td>3</td><td>0.04713</td><td>3.5512</td><td>−0.02341</td><td>3.3683</td><td>−0.00799</td><td>5.430</td></tr>
              <tr><td>3</td><td>3</td><td>0.04713</td><td>3.3683</td><td>−0.00799</td><td class="hl">3.3149</td><td>−0.00215</td><td class="hl">1.611</td></tr>
            </tbody>
          </table></div>
          <p><b>التحقق:</b> الخطأ الحقيقي بعد 3 تكرارات = |3.29659 − 3.3149| / 3.2966 = <b>0.555%</b>. لاحظ أن الطرف x<sub>L</sub> = 3 بقي ثابتاً في كل التكرارات — هذه بداية مشكلة التجمّد.</p>
          <div class="callout tip"><span class="ct">قارن</span>بنفس الفترة، التنصيف بعد 3 تكرارات يعطي 3.375 (خطأ 2.4%) بينما الوضع الزائف يعطي 3.3149 (خطأ 0.56%). الوضع الزائف أفضل هنا لأن الدالة شبه خطية قرب الجذر.</div>
        </div>
      </div>
    `},
    { h: "مشكلة التجمّد وتعديل Illinois", html: `
      <p>إذا كانت الدالة محدّبة بشدة، يبقى أحد الطرفين ثابتاً في كل التكرارات، ويتقارب الوضع الزائف ببطء شديد (أحياناً أبطأ من التنصيف). الحل: إذا بقي الطرف نفسه ثابتاً تكرارين متتاليين، <b>ننصّف قيمة الدالة عنده</b> قبل التكرار التالي.</p>
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>#</th><th>x<sub>L</sub></th><th>x<sub>U</sub></th><th>x<sub>m</sub></th><th>f(x<sub>m</sub>)</th><th>ε<sub>a</sub> %</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>3</td><td>4</td><td>3.5512</td><td>−0.02341</td><td>—</td></tr>
          <tr><td>2</td><td>3</td><td>3.5512</td><td>3.2765</td><td>+0.00245</td><td>8.38</td></tr>
          <tr><td>3</td><td>3.2765</td><td>3.5512</td><td>3.3241</td><td>−0.00321</td><td>1.43</td></tr>
          <tr><td>4</td><td>3.2765</td><td>3.3241</td><td>3.2897</td><td>+0.00083</td><td>1.05</td></tr>
          <tr><td>5</td><td>3.2897</td><td>3.3241</td><td class="hl">3.3015</td><td>−0.00058</td><td class="hl">0.356</td></tr>
        </tbody>
      </table></div>
      <p>لاحظ أن الفترة تنكمش من الجهتين بعد التعديل، بدلاً من أن يبقى x = 3 ثابتاً.</p>
    `},
    { h: "متى تختار أي طريقة؟", html: `
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>Method</th><th>يحتاج</th><th>التقارب</th><th>السرعة</th></tr></thead>
        <tbody>
          <tr><td>Bisection</td><td class="ar">فترة بإشارتين متعاكستين</td><td class="ar">مضمون</td><td class="ar">بطيء (نصف الفترة)</td></tr>
          <tr><td>False position</td><td class="ar">نفس الشرط</td><td class="ar">مضمون غالباً</td><td class="ar">أسرع إذا كانت الدالة شبه خطية</td></tr>
          <tr><td>Modified FP</td><td class="ar">نفس الشرط</td><td class="ar">مضمون</td><td class="ar">يعالج التجمّد</td></tr>
        </tbody>
      </table></div>
      <div class="callout bad"><span class="ct">أخطاء تفقدك الدرجة</span>
        خطأ في إشارة المقام • استبدال الطرف الخطأ (تذكّر: استبدل الطرف الذي إشارته مثل f(x<sub>m</sub>)) • استخدام ε<sub>a</sub> على x<sub>L</sub> بدل x<sub>m</sub> • نسيان أن ε<sub>a</sub> في التكرار الأول = «—» • عدم كتابة f(x) بعلاماتها.
      </div>
    `}
  ],
  traps: [
    "x_m تُحسب من الطرفين الحاليين، وليس من الفترة الأصلية.",
    "الطرف الذي يُستبدل هو الذي يحمل نفس إشارة f(x_m).",
    "εa في التكرار الأول غير معرّفة (اكتب —).",
    "إذا بقي طرف واحد ثابتاً لعدة تكرارات، فهذه علامة على الحاجة إلى Illinois.",
    "الوضع الزائف قد يكون أبطأ من التنصيف في الدوال المحدّبة — لا تفترض أنه دائماً أفضل."
  ],
  checks: [
    { q: "بعد التكرار الثالث في سؤال الامتحان، ما εa؟", a: "1.611% (المقام 3.3149)." },
    { q: "لماذا بقي xL = 3 ثابتاً؟", a: "لأن f(3) بقي موجباً كبيراً مقارنة بالطرف الآخر، فكل xm جديد يقع بين 3 و xU، والطرف الأدنى لا يتحرك." },
    { q: "ما فكرة تعديل Illinois؟", a: "نصيف قيمة الدالة عند الطرف الثابت لدفع الخط نحو الجهة الأخرى." }
  ]
}
);
