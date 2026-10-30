window.PRACTICE = window.PRACTICE || [];
PRACTICE.push(
/* ---------- Linear systems ---------- */
{
  id: "l1", topic: "linear", tag: "Naive Gauss elimination", marks: 10,
  q: "Solve by naive Gauss elimination: x₁ + 2x₂ + 3x₃ = 8, 2x₁ + 3x₂ + 2x₃ = 10, 3x₁ + x₂ + 2x₃ = 7.",
  hint: "m₂₁ = 2، m₃₁ = 3، ثم m₃₂ = −5/−1 = 5.",
  sol: `
    <p><b>الحذف:</b> R₂ − 2R₁ يعطي (−x₂ − 4x₃ = −6)، و R₃ − 3R₁ يعطي (−5x₂ − 7x₃ = −17).</p>
    <p>ثم R₃ − 5R₂ يعطي 13x₃ = 13 ⇒ x₃ = 1.</p>
    <p><b>التعويض الخلفي:</b> −x₂ − 4(1) = −6 ⇒ x₂ = 2. و x₁ + 2(2) + 3(1) = 8 ⇒ x₁ = 1.</p>
    <p><b>X = [1, 2, 1]<sup>T</sup></b>. المصفوفة النهائية مثلثية عليا: [1,2,3 | 8]، [0,−1,−4 | −6]، [0,0,13 | 13].</p>
  `
},
{
  id: "l2", topic: "linear", tag: "LU decomposition · exam", marks: 25,
  q: "Solve by LU decomposition: x₁ + x₂ + x₃ = 1, 4x₁ + 3x₂ − x₃ = 6, 3x₁ + 5x₂ + 3x₃ = 4.",
  hint: "المضاعفات 4 و 3 ثم −2. اكتب L و U ثم حل LZ = B و UX = Z.",
  sol: `
    <p>بعد الحذف: 4 + 3 ثم m₃₂ = −2.</p>
    <div class="formula"><div class="fx">L = [1 0 0 ; 4 1 0 ; 3 −2 1], &nbsp; U = [1 1 1 ; 0 −1 −5 ; 0 0 −10]</div></div>
    <p><b>LZ = B:</b> z₁ = 1، z₂ = 6 − 4 = 2، z₃ = 4 − 3 − (−2)(2) = <b>5</b>.</p>
    <p><b>UX = Z:</b> −10x₃ = 5 ⇒ x₃ = −0.5، ثم −x₂ + 2.5 = 2 ⇒ x₂ = 0.5، ثم x₁ = 1 − 0.5 + 0.5 = 1.</p>
    <p><b>X = [1, 0.5, −0.5]<sup>T</sup></b>. التحقق: 3(1) + 5(0.5) + 3(−0.5) = 4 ✓.</p>
  `
},
{
  id: "l3", topic: "linear", tag: "Scaled partial pivoting", marks: 20,
  q: "Solve using Gaussian elimination with scaled partial pivoting: 2x₁ − 6x₂ − x₃ = −38, −3x₁ − x₂ + 7x₃ = −34, −8x₁ + x₂ − 2x₃ = −20.",
  hint: "S = [6,7,8]. اختر أكبر نسبة |a_ik|/s_i.",
  sol: `
    <p>النسب في الخطوة 1: 0.3333، 0.4286، 1.0 ← الصف الثالث هو المحور.</p>
    <p>بعد الحذف: [−8, 1, −2 | −20]، [0, −5.75, −1.5 | −43]، [0, −1.375, 7.75 | −26.5].</p>
    <p>النسب في الخطوة 2: |−5.75|/6 = 0.9583، |−1.375|/7 = 0.1964 ← الصف الأول هو المحور الثاني، وينتج [0, 0, 8.1087 | −16.2174].</p>
    <p><b>التعويض:</b> x₃ = −2، x₂ = 8، x₁ = 4 ⇒ <b>X = [4, 8, −2]<sup>T</sup></b>.</p>
    <p>متجه البواقي R = 0، إذن الحل مقبول.</p>
  `
},
{
  id: "l4", topic: "linear", tag: "Gauss-Seidel", marks: 15,
  q: "Perform 3 Gauss-Seidel iterations for 10x₁ + 2x₂ − x₃ = 27, −3x₁ − 6x₂ + 2x₃ = −61.5, x₁ + x₂ + 5x₃ = −21.5 starting from (0,0,0). Give the values and the largest ε_a.",
  hint: "استخدم كل قيمة محدّثة فوراً. ابدأ x₁ من المعادلة الأولى.",
  sol: `
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Iter</th><th>x₁</th><th>x₂</th><th>x₃</th><th>max ε<sub>a</sub> %</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>2.7</td><td>8.9</td><td>−6.62</td><td>100</td></tr>
        <tr><td>2</td><td>0.258</td><td>7.91433</td><td>−5.93447</td><td>946.5</td></tr>
        <tr><td>3</td><td class="hl">0.52369</td><td class="hl">8.01000</td><td class="hl">−6.00674</td><td class="hl">50.73</td></tr>
      </tbody>
    </table></div>
    <p>أكبر خطأ في التكرار الثالث هو لـ x₁ (50.73%) أما x₂ و x₃ فخطؤهما نحو 1.2%. المصفوفة سائدة قطرياً لذلك التقارب مضمون، والحل (0.5, 8, −6).</p>
  `
},
{
  id: "l5", topic: "linear", tag: "Residual", marks: 6,
  q: "For the system x₁ + 2x₂ + 3x₃ = 8, 2x₁ + 3x₂ + 2x₃ = 10, 3x₁ + x₂ + 2x₃ = 7, verify the solution X = [1,2,1]ᵀ by computing the residual vector.",
  hint: "R = AX − B بالمصفوفة الأصلية.",
  sol: `
    <p>الصف الأول: 1 + 4 + 3 = 8 → r₁ = 0.</p>
    <p>الصف الثاني: 2 + 6 + 2 = 10 → r₂ = 0.</p>
    <p>الصف الثالث: 3 + 2 + 2 = 7 → r₃ = 0.</p>
    <p><b>R = [0,0,0]</b>، والحل دقيق (أقصى باقي 0 &lt; التحمّل).</p>
  `
},
{
  id: "l6", topic: "linear", tag: "Ill-conditioning", marks: 8,
  q: "Solve x₁ + 2x₂ = 10, 1.1x₁ + 2x₂ = 10.4. Then solve again after changing 1.1 to 1.05 and comment.",
  hint: "اطرح المعادلتين.",
  sol: `
    <p><b>الحالة الأولى:</b> بطرح المعادلتين: 0.1x₁ = 0.4 ⇒ x₁ = 4، ثم 2x₂ = 10 − 4 = 6 ⇒ x₂ = 3. الحل (4, 3).</p>
    <p><b>الحالة الثانية:</b> 0.05x₁ = 0.4 ⇒ x₁ = 8، ثم 2x₂ = 2 ⇒ x₂ = 1. الحل (8, 1).</p>
    <p>تغيّر 4.5% في معامل واحد غيّر الحل كلياً ⇒ النظام <b>ill-conditioned</b>، وخطأ التقريب في المعاملات يسبب خطأ كبيراً في الحل.</p>
  `
},
{
  id: "l7", topic: "linear", tag: "Classification", marks: 6,
  q: "After forward elimination, a 3×3 system gives a row [0 0 0 | 2]. How many solutions does the system have? What if it gave [0 0 0 | 0]?",
  hint: "صف صفري مع b ≠ 0 يعني تناقضاً.",
  sol: `
    <p>[0 0 0 | 2] تعني 0 = 2 وهو تناقض ⇒ <b>لا يوجد حل</b> (النظام inconsistent).</p>
    <p>[0 0 0 | 0] تعني 0 = 0 أي معادلة زائدة ⇒ <b>عدد لا نهائي من الحلول</b>، ونعبّر عن الحل بمتغير حر (parameter).</p>
    <p>في الحالتين det(A) = 0.</p>
  `
},
{
  id: "l8", topic: "linear", tag: "Concept", marks: 5,
  q: "Why do we use an index vector L in scaled partial pivoting instead of swapping the rows themselves?",
  hint: "فكّر في كلفة تحريك بيانات كبيرة.",
  sol: `
    <p>تبديل صف كامل يعني نقل n+1 عنصراً في كل خطوة، وفي الأنظمة الكبيرة (ملايين العناصر) تكون هذه الكلفة كبيرة وغير عملية. تبديل فهارس في متجه صغير يكفي لتحديد ترتيب الصفوف، ويُستخدم ترتيب L النهائي في التعويض الخلفي.</p>
  `
},

/* ---------- Curve fitting ---------- */
{
  id: "c1", topic: "curve", tag: "Linear regression", marks: 12,
  q: "Fit a straight line to x = 1,2,3,4,5 and y = 2.1, 3.9, 6.2, 8.1, 9.8. Compute a₀, a₁, Sr, St and r.",
  hint: "Σx = 15، Σy = 30.1، Σxy = 109.9، Σx² = 55.",
  sol: `
    <p>a₁ = [5(109.9) − 15(30.1)] / [5(55) − 225] = (549.5 − 451.5)/50 = <b>1.96</b>.</p>
    <p>a₀ = (30.1 − 1.96×15)/5 = <b>0.14</b>.</p>
    <div class="formula"><div class="fx">ŷ = 0.14 + 1.96 x</div></div>
    <p>القيم المتوقعة: 2.10، 4.06، 6.02، 7.98، 9.94 ⇒ S<sub>r</sub> = <b>0.092</b>.</p>
    <p>المتوسط 6.02 ⇒ S<sub>t</sub> = 38.508، و r² = 1 − 0.092/38.508 = 0.99761 ⇒ r = <b>0.9988</b>.</p>
    <p>الخطأ المعياري s<sub>y/x</sub> = √(0.092/3) = 0.1751.</p>
  `
},
{
  id: "c2", topic: "curve", tag: "Exam Q4 · linearized model", marks: 15,
  q: "Find the constants of y = a x e^(−bx) that best fit x = 1,2,3,4 and y = 2,3,4,4.5 using the linearized model.",
  hint: "اقسم على x ثم خُذ ln: y_f = ln a − b x.",
  sol: `
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>x</th><th>y</th><th>y/x</th><th>y<sub>f</sub> = ln(y/x)</th><th>x·y<sub>f</sub></th></tr></thead>
      <tbody>
        <tr><td>1</td><td>2</td><td>2</td><td>0.6931</td><td>0.6931</td></tr>
        <tr><td>2</td><td>3</td><td>1.5</td><td>0.4055</td><td>0.8109</td></tr>
        <tr><td>3</td><td>4</td><td>1.3333</td><td>0.2877</td><td>0.8630</td></tr>
        <tr><td>4</td><td>4.5</td><td>1.125</td><td>0.1178</td><td>0.4711</td></tr>
        <tr><td>Σ</td><td>—</td><td>—</td><td>1.5041</td><td>2.8383</td></tr>
      </tbody>
    </table></div>
    <p>a₁ = [4(2.8383) − 10(1.5041)]/20 = −0.18439 = −b ⇒ <b>b = 0.18439</b>.</p>
    <p>a₀ = (1.5041 + 1.8439)/4 = 0.83699 = ln a ⇒ <b>a = 2.3094</b>.</p>
    <div class="formula"><div class="fx">y = 2.3094 x e<sup>−0.18439x</sup></div></div>
  `
},
{
  id: "c3", topic: "curve", tag: "Good fit judgment", marks: 10,
  q: "For the model y = 2.3094 x e^(−0.18439x), determine whether the curve is a good fit for x = 1,2,3,4, y = 2,3,4,4.5.",
  hint: "احسب ŷ ثم Sr و St ثم r.",
  sol: `
    <p>القيم المتوقعة: 1.9205، 3.1943، 3.9846، 4.4182.</p>
    <p>البواقي: 0.0795، −0.1943، 0.0154، 0.0818 ⇒ S<sub>r</sub> = <b>0.0510</b>.</p>
    <p>المتوسط ȳ = 3.375 ⇒ S<sub>t</sub> = 3.6875.</p>
    <p>r² = 1 − 0.0510/3.6875 = 0.9862 ⇒ r = <b>0.9931</b>.</p>
    <p>بما أن r قريبة جداً من 1 و S<sub>r</sub> صغير جداً مقارنة بـ S<sub>t</sub>، فإن <b>المطابقة جيدة</b> (النموذج يفسّر 98.6% من التباين).</p>
  `
},
{
  id: "c4", topic: "curve", tag: "Exponential model", marks: 10,
  q: "Fit y = a e^(bx) to x = 1,2,3,4 and y = 0.5, 1.7, 3.4, 5.7, and report r.",
  hint: "خُذ ln y ثم انحداراً خطياً على x.",
  sol: `
    <p>ln y: −0.6931، 0.5306، 1.2238، 1.7405 ⇒ Σy<sub>f</sub> = 2.8018، وΣx·y<sub>f</sub> = 11.0015.</p>
    <p>b = [4(11.0015) − 10(2.8018)]/20 = (44.006 − 28.018)/20 = <b>0.7994</b>.</p>
    <p>a₀ = (2.8018 − 0.7994×10)/4 = −1.2980 ⇒ a = e<sup>−1.298</sup> = <b>0.2731</b>.</p>
    <p>القيم المتوقعة: 0.6073، 1.3508، 3.0046، 6.6827 ⇒ S<sub>r</sub> = 1.2556، S<sub>t</sub> = 15.2675 ⇒ r = <b>0.958</b>.</p>
  `
},
{
  id: "c5", topic: "curve", tag: "Power model vs exponential", marks: 10,
  q: "For the same data (x = 1..4, y = 0.5, 1.7, 3.4, 5.7), fit y = a x^b and compare it with the exponential model.",
  hint: "خُذ log y و log x (أو ln)، والميل = b والتقاطع = log a.",
  sol: `
    <p>b = 1.7516، وlog a = −0.3001 ⇒ a = 10<sup>−0.3001</sup> = <b>0.5010</b>.</p>
    <div class="formula"><div class="fx">y = 0.5010 x<sup>1.7516</sup></div></div>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Model</th><th>S<sub>r</sub></th><th>r</th></tr></thead>
      <tbody>
        <tr><td>Exponential</td><td>1.2556</td><td>0.958</td></tr>
        <tr><td>Power</td><td class="hl">0.0016</td><td class="hl">0.9999</td></tr>
      </tbody>
    </table></div>
    <p>نموذج القوة أفضل بكثير: S<sub>r</sub> شبه معدوم و r أقرب إلى 1، أي أن النموذج يفسّر البيانات تماماً تقريباً.</p>
  `
},
{
  id: "c6", topic: "curve", tag: "Linearization", marks: 6,
  q: "Give the linearized form of the saturation-growth-rate model y = a x/(b + x) and state what you plot.",
  hint: "اقلب الطرفين ثم رتّب.",
  sol: `
    <p>1/y = (b + x)/(a x) = (b/a)(1/x) + 1/a.</p>
    <p>نرسم <b>1/y مقابل 1/x</b>: الميل = b/a والتقاطع = 1/a. إذن a = 1/التقاطع و b = الميل × a.</p>
  `
},
{
  id: "c7", topic: "curve", tag: "Concept", marks: 5,
  q: "A model gives r² = 0.85. Interpret this and state one limitation of using r as the only criterion.",
  hint: "نسبة التباين المفسَّر، وخطر التوفيق الزائد.",
  sol: `
    <p>r² = 0.85 تعني أن النموذج يفسّر 85% من تباين البيانات، و15% غير مفسَّر.</p>
    <p><b>التحذير:</b> r قد يكون مرتفعاً حتى مع نموذج خاطئ فيزيائياً، ومع إضافة حدود كثيرة للنموذج (polynomial of high degree) يقترب r من 1 دون أن يكون النموذج مفيداً للتنبؤ (overfitting). لذلك ننظر أيضاً إلى S<sub>r</sub> و s<sub>y/x</sub> وسلوك النموذج خارج البيانات.</p>
  `
},

/* ---------- Python ---------- */
{
  id: "p1", topic: "python", tag: "Implementation", marks: 5,
  q: "In the bisection Python function, why do we raise a ValueError when f(a)*f(b) > 0?",
  hint: "شرط مبرهنة القيمة المتوسطة.",
  sol: `
    <p>لأن الطريقة تعتمد على وجود تغيّر في الإشارة داخل الفترة. إذا كانت f(a) و f(b) بنفس الإشارة فلا يوجد ضمان لوجود جذر واحد (قد يوجد عدد زوجي من الجذور أو لا شيء)، وخطوات التنصيف قد تتقارب إلى لا شيء. الفحص يحمي من استخدام الطريقة في نطاق غير صالح.</p>
  `
},
{
  id: "p2", topic: "python", tag: "Stopping criteria", marks: 5,
  q: "What stopping criteria are used in the bisection code, and which is checked first?",
  hint: "f(xm) == 0 ثم |f(xm)| < tol ثم εa.",
  sol: `
    <ul>
      <li>إذا كان f(x<sub>m</sub>) = 0 بالضبط فهذا الجذر الدقيق.</li>
      <li>إذا كان |f(x<sub>m</sub>)| &lt; tol (قيمة الدالة قريبة من الصفر).</li>
      <li>إذا كان ε<sub>a</sub> &lt; 0.001% (الخطأ النسبي التقريبي).</li>
    </ul>
    <p>الفحص بالترتيب: الجذر الدقيق ثم قيمة الدالة ثم الخطأ النسبي، مع حد أقصى للتكرارات كأمان ضد الحلقات اللانهائية.</p>
  `
},
{
  id: "p3", topic: "python", tag: "Failure guard", marks: 5,
  q: "Why does the Newton-Raphson code check abs(dfx) < 1e-12 before computing the next point?",
  hint: "ماذا يحدث إذا كانت المشتقة صفراً؟",
  sol: `
    <p>لأن صيغة نيوتن تقسم على f′(x). إذا كانت المشتقة صفراً (أو قريبة جداً من الصفر) فالنتيجة غير معرّفة أو تقفز بعيداً جداً. الفحص يمنع خطأ القسمة على صفر ويعطي رسالة واضحة بدلاً من نتيجة غير منطقية.</p>
  `
},
{
  id: "p4", topic: "python", tag: "Comparison", marks: 6,
  q: "In the lecture notebook, bisection needed 16 iterations while Newton needed 4 for the same root (x³ − x − 2 = 0). Explain that difference.",
  hint: "رتبة التقارب ومعلومة المشتقة.",
  sol: `
    <p>التنصيف يستخدم الإشارة فقط ويتقارب خطياً، فيحتاج نحو 3.3 تكرار لكل رقم عشري: 16 تكراراً للحصول على خطأ &lt; 0.001%.</p>
    <p>نيوتن يستخدم المشتقة (ميل المماس) فيتقارب تربيعياً، فعدد الأرقام الصحيحة يتضاعف كل تكرار: 4 تكرارات فقط.</p>
    <p>المقابل: التنصيف مضمون من أي فترة صحيحة، بينما نيوتن يحتاج مشتقة وتقديراً جيداً وقد يفشل.</p>
  `
}
);
