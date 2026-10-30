window.LESSONS = window.LESSONS || [];
LESSONS.push(
{
  id: "curve-fitting", n: 7,
  title: "تركيب المنحنيات", en: "Least Squares Regression",
  lecture: "Lecture 9", weight: "سؤال 4 (25 درجة)", time: "100 دقيقة",
  summary: "من بيانات تجريبية إلى نموذج رياضي. الامتحان غالباً يعطي نموذجاً غير خطي (مثل y = a x e^(−bx)) ويطلب خطيته، إيجاد الثوابت، ثم الحكم على جودة المطابقة بـ Sr و St و r.",
  sections: [
    { h: "الفكرة: تصغير مجموع مربعات البواقي", html: `
      <p>لدينا نقاط تجريبية (x<sub>i</sub>, y<sub>i</sub>). نريد دالة f(x) تمثلها. الباقي (residual) هو:</p>
      <div class="formula"><div class="fx">e<sub>i</sub> = y<sub>i</sub> − f(x<sub>i</sub>)</div></div>
      <p>نختار المعاملات التي تصغّر مجموع مربعات البواقي:</p>
      <div class="formula"><div class="fx">S<sub>r</sub> = Σ e<sub>i</sub><sup>2</sup> = Σ (y<sub>i</sub> − a<sub>0</sub> − a<sub>1</sub>x<sub>i</sub>)<sup>2</sup></div></div>
      <p>باشتقاق S<sub>r</sub> بالنسبة لـ a<sub>0</sub> و a<sub>1</sub> ومساواة الصفر نحصل على <b>المعادلات الطبيعية</b>:</p>
      <div class="formula">
        <div class="fx">n a<sub>0</sub> + a<sub>1</sub> Σx = Σy</div>
        <div class="fx">a<sub>0</sub> Σx + a<sub>1</sub> Σx<sup>2</sup> = Σxy</div>
      </div>
      <div class="formula">
        <div class="fx">a<sub>1</sub> = <span class="frac"><span class="num">n Σxy − Σx Σy</span><span class="den">n Σx<sup>2</sup> − (Σx)<sup>2</sup></span></span>, &nbsp;&nbsp; a<sub>0</sub> = ȳ − a<sub>1</sub>x̄</div>
        <div class="cap">تذكر: a0 هو التقاطع (intercept)، a1 هو الميل (slope)</div>
      </div>
    `},
    { h: "قياس جودة المطابقة", html: `
      <div class="formula">
        <div class="fx">S<sub>t</sub> = Σ(y<sub>i</sub> − ȳ)<sup>2</sup> &nbsp;&nbsp; <span class="ar-inline">(التباعد حول المتوسط)</span></div>
        <div class="fx">S<sub>r</sub> = Σ(y<sub>i</sub> − ŷ<sub>i</sub>)<sup>2</sup> &nbsp;&nbsp; <span class="ar-inline">(التباعد حول خط الانحدار)</span></div>
        <div class="fx">s<sub>y/x</sub> = <span class="sqrt">S<sub>r</sub> / (n − 2)</span> &nbsp;&nbsp; (standard error of the estimate)</div>
        <div class="fx">r<sup>2</sup> = <span class="frac"><span class="num">S<sub>t</sub> − S<sub>r</sub></span><span class="den">S<sub>t</sub></span></span>, &nbsp;&nbsp; r = <span class="sqrt">(S<sub>t</sub> − S<sub>r</sub>) / S<sub>t</sub></span></div>
        <div class="cap">r² = نسبة التباين المفسَّر بالنموذج. r² = 1 مطابقة تامة، r² = 0 لا تفسير</div>
      </div>
      <ul>
        <li>عندما S<sub>r</sub> = 0 يكون r² = 1 والخط يمر بكل النقاط.</li>
        <li>عندما S<sub>r</sub> = S<sub>t</sub> يكون r² = 0 والانحدار لا يضيف شيئاً.</li>
        <li>نقسم على n − 2 لأننا استخدمنا تقديرين من البيانات: a<sub>0</sub> و a<sub>1</sub>.</li>
      </ul>
    `},
    { h: "مثال كامل: انحدار خطي (11 نقطة)", html: `
      <div class="example">
        <div class="example-head"><b>Lecture example 1</b><span class="badge">Linear regression</span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">Fit a straight line to: x = 6,7,11,15,17,21,23,29,29,37,39 and y = 29,21,29,14,21,15,7,7,13,0,3.</p>
          <p>المجاميع: n = 11، Σx = 234، Σy = 159، Σxy = 2380، Σx² = 6262.</p>
          <p><b>الميل:</b> a₁ = [11(2380) − (234)(159)] / [11(6262) − (234)²] = (26180 − 37206)/(68882 − 54756) = −11026/14126 = <b>−0.7806</b>.</p>
          <p><b>التقاطع:</b> a₀ = (159 + 0.7806×234)/11 = <b>31.0589</b>.</p>
          <div class="formula"><div class="fx">ŷ = 31.0589 − 0.7806 x</div></div>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>x</th><th>6</th><th>7</th><th>11</th><th>15</th><th>17</th><th>21</th><th>23</th><th>29</th><th>29</th><th>37</th><th>39</th></tr></thead>
            <tbody>
              <tr><td>y</td><td>29</td><td>21</td><td>29</td><td>14</td><td>21</td><td>15</td><td>7</td><td>7</td><td>13</td><td>0</td><td>3</td></tr>
              <tr><td>ŷ</td><td>26.376</td><td>25.595</td><td>22.473</td><td>19.351</td><td>17.790</td><td>14.667</td><td>13.106</td><td>8.423</td><td>8.423</td><td>2.179</td><td>0.618</td></tr>
            </tbody>
          </table></div>
          <p>S<sub>r</sub> = 180.34، S<sub>t</sub> = 962.73، s<sub>y/x</sub> = 4.476، r = 0.9015، r² = 0.8127.</p>
          <p><b>التفسير:</b> النموذج يفسّر 81.3% من التباين، وهذا مطابق مقبول لكن ليس ممتازاً؛ البيانات مشتتة أصلاً.</p>
        </div>
      </div>
    `},
    { h: "سؤال الامتحان: Linearized model", html: `
      <div class="example">
        <div class="example-head"><b>Q4 · Spring 2024 · 25 marks</b><span class="badge m">y = a x e<sup>−bx</sup></span></div>
        <div class="example-body">
          <p class="q-text" dir="auto">Use the linearized data model to find the constants of y = a x e^(−bx) for x = 1,2,3,4 and y = 2,3,4,4.5. Then determine whether the curve is a good fit.</p>
          <p><b>الخطية:</b> نقسم على x ثم نأخذ اللوغاريتم:</p>
          <div class="formula"><div class="fx">y/x = a e<sup>−bx</sup> &nbsp; ⇒ &nbsp; ln(y/x) = ln a − b x</div><div class="cap">إذن y<sub>f</sub> = a<sub>0</sub> + a<sub>1</sub>x مع a<sub>0</sub> = ln a و a<sub>1</sub> = −b</div></div>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>x</th><th>y</th><th>y/x</th><th>y<sub>f</sub> = ln(y/x)</th><th>x·y<sub>f</sub></th><th>x²</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>2</td><td>2</td><td>0.6931</td><td>0.6931</td><td>1</td></tr>
              <tr><td>2</td><td>3</td><td>1.5</td><td>0.4055</td><td>0.8109</td><td>4</td></tr>
              <tr><td>3</td><td>4</td><td>1.3333</td><td>0.2877</td><td>0.8630</td><td>9</td></tr>
              <tr><td>4</td><td>4.5</td><td>1.125</td><td>0.1178</td><td>0.4711</td><td>16</td></tr>
              <tr><td class="hl">Σ</td><td>14.5</td><td>—</td><td>1.5041</td><td>2.8383</td><td>30</td></tr>
            </tbody>
          </table></div>
          <p><b>الميل:</b> a₁ = [4(2.8383) − (10)(1.5041)] / [4(30) − 100] = (11.353 − 15.041)/20 = <b>−0.18439</b>.</p>
          <p><b>التقاطع:</b> a₀ = (1.5041 + 0.18439×10)/4 = <b>0.83699</b>.</p>
          <p>إذن <b>b = 0.18439</b> و <b>a = e<sup>0.83699</sup> = 2.3094</b>:</p>
          <div class="formula"><div class="fx">y = 2.3094 x e<sup>−0.18439x</sup></div></div>
          <div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>x</th><th>y (original)</th><th>ŷ (model)</th><th>y − ŷ</th><th>(y − ŷ)²</th></tr></thead>
            <tbody>
              <tr><td>1</td><td>2</td><td>1.9205</td><td>0.0795</td><td>0.00632</td></tr>
              <tr><td>2</td><td>3</td><td>3.1943</td><td>−0.1943</td><td>0.03775</td></tr>
              <tr><td>3</td><td>4</td><td>3.9846</td><td>0.0154</td><td>0.00024</td></tr>
              <tr><td>4</td><td>4.5</td><td>4.4182</td><td>0.0818</td><td>0.00669</td></tr>
            </tbody>
          </table></div>
          <p><b>الحكم:</b> S<sub>r</sub> = 0.05099، و S<sub>t</sub> = 3.6875 (متوسط y = 3.375).</p>
          <div class="formula"><div class="fx">r² = 1 − 0.05099/3.6875 = 0.9862 &nbsp; ⇒ &nbsp; r = 0.9931</div></div>
          <p>r قريب جداً من 1 و S<sub>r</sub> صغير ← <b>المطابقة جيدة</b>. الإجابة النهائية: a ≈ 2.3094، b ≈ 0.1844.</p>
        </div>
      </div>
    `},
    { h: "النماذج غير الخطية الشائعة", html: `
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>Model</th><th>Linearized form</th><th>Plot</th></tr></thead>
        <tbody>
          <tr><td class="ar">أسّي: y = a e<sup>bx</sup></td><td>ln y = ln a + b x</td><td class="ar">ln y مقابل x</td></tr>
          <tr><td class="ar">قوة: y = a x<sup>b</sup></td><td>log y = log a + b log x</td><td class="ar">log y مقابل log x</td></tr>
          <tr><td class="ar">تشبّع: y = a x/(b+x)</td><td>1/y = (b/a)(1/x) + 1/a</td><td class="ar">1/y مقابل 1/x</td></tr>
        </tbody>
      </table></div>
      <p>عندما تُحوّل النموذج، <b>احسب S<sub>r</sub> على y الأصلية</b> وليس على القيم المحوّلة، ثم قارن النماذج بـ r.</p>
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>البيانات x=1..4, y=0.5,1.7,3.4,5.7</th><th>النموذج</th><th>S<sub>r</sub></th><th>r</th></tr></thead>
        <tbody>
          <tr><td class="ar">أسّي</td><td>y = 0.2731 e<sup>0.7994x</sup></td><td>1.2556</td><td>0.958</td></tr>
          <tr><td class="ar">قوة</td><td>y = 0.5010 x<sup>1.7516</sup></td><td class="hl">0.0016</td><td class="hl">0.9999</td></tr>
        </tbody>
      </table></div>
      <p>نموذج القوة أفضل بكثير هنا لأن r أقرب إلى 1 و S<sub>r</sub> شبه معدوم.</p>
      <div class="callout warn"><span class="ct">فخ شائع</span>الخطية تجعل النموذج «خطياً في المعاملات» وليس في البيانات. بعد إيجاد a₀ و a₁ يجب الرجوع: a = e<sup>a0</sup> (أو 10<sup>a0</sup> إذا استخدمت log₁₀).</div>
    `}
  ],
  traps: [
    "a = e^{a0} وليس a0 نفسه.",
    "احسب Sr باستخدام y الأصلية، لا ln y.",
    "r² وليس r هو نسبة التباين المفسَّر.",
    "استخدم ln مع e، وlog₁₀ مع 10 — لا تخلط.",
    "القسمة على n−2 في الخطأ المعياري وليس n."
  ],
  checks: [
    { q: "كيف تُخطّي y = a x e^{−bx}؟", a: "بقسمة الطرفين على x ثم ln: ln(y/x) = ln a − bx، فالميل = −b والتقاطع = ln a." },
    { q: "ماذا يعني r² = 0.9862؟", a: "النموذج يفسّر 98.62% من تباين البيانات، والباقي 1.38% غير مفسّر." },
    { q: "لماذا نقسم على n−2 في sy/x؟", a: "لأننا قدّرنا معاملين (a0 و a1) من البيانات، فخسرنا درجتي حرية." }
  ]
},
{
  id: "python-exam", n: 8,
  title: "بايثون واستراتيجية الامتحان", en: "Python + Exam Strategy",
  lecture: "Lecture 6 + الامتحان", weight: "أساسي للتنفيذ والمراجعة", time: "45 دقيقة",
  summary: "أكواد جاهزة للطرق الأساسية، وخطة تنفيذ الامتحان دقيقة بدقيقة: ترتيب الأسئلة، توزيع الوقت، وقائمة تحقق قبل التسليم.",
  sections: [
    { h: "قوالب بايثون الأساسية", html: `
      <p>هذه نفس بنية المحاضرة: دالة + جدول نتائج + شرط توقف. استخدمها للمذاكرة والتحقق من حساباتك اليدوية.</p>
      <div class="code-block">
        <div class="code-head"><span>bisection.py</span><button class="copy-btn" data-copy="bisection-code">نسخ</button></div>
        <pre><code id="bisection-code"><span class="kw">def</span> <span class="fn">bisection</span>(f, a, b, tol=1e-6, max_iter=100):
    <span class="kw">if</span> f(a) * f(b) &gt; 0:
        <span class="kw">raise</span> ValueError(<span class="st">"f(a) and f(b) must have opposite signs"</span>)
    xm_old = <span class="kw">None</span>
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(1, max_iter + 1):
        xm = (a + b) / 2
        fxm = f(xm)
        ea = <span class="kw">None</span> <span class="kw">if</span> xm_old <span class="kw">is</span> <span class="kw">None</span> <span class="kw">else</span> <span class="fn">abs</span>((xm - xm_old) / xm) * 100
        <span class="fn">print</span>(i, a, b, xm, fxm, ea)
        <span class="kw">if</span> <span class="fn">abs</span>(fxm) &lt; tol <span class="kw">or</span> (ea <span class="kw">is</span> <span class="kw">not</span> <span class="kw">None</span> <span class="kw">and</span> ea &lt; 0.001):
            <span class="kw">break</span>
        <span class="kw">if</span> f(a) * fxm &lt; 0: b = xm
        <span class="kw">else</span>: a = xm
        xm_old = xm
    <span class="kw">return</span> xm</code></pre>
      </div>
      <div class="code-block">
        <div class="code-head"><span>newton.py</span><button class="copy-btn" data-copy="newton-code">نسخ</button></div>
        <pre><code id="newton-code"><span class="kw">def</span> <span class="fn">newton</span>(f, df, x0, tol=1e-6, max_iter=100):
    <span class="kw">for</span> i <span class="kw">in</span> <span class="fn">range</span>(1, max_iter + 1):
        fx, dfx = f(x0), df(x0)
        <span class="kw">if</span> <span class="fn">abs</span>(dfx) &lt; 1e-12:
            <span class="kw">raise</span> ValueError(<span class="st">"zero derivative"</span>)
        x1 = x0 - fx / dfx
        ea = <span class="fn">abs</span>((x1 - x0) / x1) * 100
        <span class="fn">print</span>(i, x0, fx, dfx, x1, ea)
        <span class="kw">if</span> <span class="fn">abs</span>(f(x1)) &lt; tol <span class="kw">or</span> ea &lt; 0.001:
            <span class="kw">return</span> x1
        x0 = x1
    <span class="kw">return</span> x0</code></pre>
      </div>
      <p>المزيد من الأكواد (LU، Gauss-Seidel، الانحدار) في صفحة <a href="#/python">بايثون</a>.</p>
    `},
    { h: "كيف توزّع 90 دقيقة على 100 درجة", html: `
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>Question</th><th>Marks</th><th>الوقت</th><th>ما يجب أن يظهر</th></tr></thead>
        <tbody>
          <tr><td>Q1 Taylor</td><td>14</td><td class="ar">12 د</td><td class="ar">جدول ترتيب/تقدير/خطأ + الإجابة</td></tr>
          <tr><td>Q2a False position</td><td>18</td><td class="ar">16 د</td><td class="ar">جدول 5 أعمدة، RAE</td></tr>
          <tr><td>Q2b Newton</td><td>18</td><td class="ar">16 د</td><td class="ar">f, f′, x<sub>i+1</sub>, RAE</td></tr>
          <tr><td>Q3 LU</td><td>25</td><td class="ar">23 د</td><td class="ar">L, U, Z, X</td></tr>
          <tr><td>Q4 Regression</td><td>25</td><td class="ar">23 د</td><td class="ar">جدول محوّل، a, b, Sr, St, r</td></tr>
        </tbody>
      </table></div>
      <p>القاعدة: دقيقة تقريباً لكل درجة، مع 5 دقائق مراجعة. ابدأ بالسؤال الذي تتقنه لضمان الدرجات، ثم انتقل للأثقل.</p>
    `},
    { h: "قائمة تحقق قبل التسليم", html: `
      <ol>
        <li>هل استخدمت 4 أرقام معتبرة في كل النتائج؟</li>
        <li>هل كل خطأ نسبي مقسوم على القيمة الجديدة؟</li>
        <li>هل أظهرت صيغة كل خطوة قبل الأرقام؟</li>
        <li>هل تحققت من الحل بالتعويض (خصوصاً LU و Gauss-Seidel)؟</li>
        <li>هل كتبت الوحدات/الراديان حيث يلزم؟</li>
        <li>هل أجبت عن كل جزء من السؤال (a و b و «good fit or not»)؟</li>
        <li>هل الإشارات السالبة صحيحة في الجداول؟</li>
      </ol>
      <div class="callout exam"><span class="ct">توزيع الدرجات من نموذج 2024</span>Taylor 14 + False position 18 + Newton 18 + LU 25 + Regression 15 + Fit judgment 10 = 100. لاحظ أن الحكم على جودة المطابقة وحده 10 درجات — لا تنسَ كتابة الاستنتاج.</div>
    `},
    { h: "أخطاء تُفقدك الدرجة الكاملة", html: `
      <div class="grid g2">
        <div class="card flat"><h3>حسابية</h3><ul class="small">
          <li>خطأ إشارة في المقام.</li>
          <li>تقريب مبكر يغيّر ε.</li>
          <li>خلط الدرجات بالراديان.</li>
          <li>نسيان المضروب في تايلور.</li>
        </ul></div>
        <div class="card flat"><h3>منهجية</h3><ul class="small">
          <li>عدم كتابة الجدول المطلوب.</li>
          <li>عدم ذكر شرط التوقف.</li>
          <li>عدم التحقق من الشرط الابتدائي (إشارتان).</li>
          <li>عدم تفسير r أو r² في السؤال الأخير.</li>
        </ul></div>
      </div>
    `}
  ],
  traps: [
    "لا تعتمد على الحاسبة وحدها — الامتحان يقيّم الخطوات والجدول.",
    "اكتب εa في كل تكرار حتى لو لم يُطلب صريحاً؛ غالباً عليه درجات.",
    "في سؤال «good fit» اذكر Sr و St و r ثم اكتب الحكم صراحة.",
    "إذا لم يكتمل الوقت، اكتب خطوات الطريقة والجدول الناقص — درجات الخطوات تُمنح."
  ],
  checks: [
    { q: "بأي سؤال تبدأ في الامتحان؟", a: "بالسؤال الذي تتقنه (غالباً تايلور أو نيوتن) لضمان درجاته أولاً، ثم LU والانحدار." },
    { q: "ماذا تفعل إذا انتهى الوقت وبقي سؤال؟", a: "اكتب صيغ الطريقة وجدولها وأول تكرار — درجات الخطوات تُمنح حتى بدون النتيجة النهائية." },
    { q: "ما أهم فحص بعد حل نظام خطي؟", a: "التعويض في المعادلات الأصلية أو حساب الباقي R = AX − B." }
  ]
}
);
