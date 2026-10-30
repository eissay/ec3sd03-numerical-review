window.EXAM = {
  title: "الامتحان التجريبي · Spring 2024",
  subtitle: "EC372 Midterm — Computer Engineering Department — 90 minutes",
  duration: 90,
  total: 100,
  instructions: [
    "استخدم 4 أرقام معتبرة في كل الحسابات.",
    "الامتحان مغلق: لا تستخدم الملخصات أو الآلة إلا للحساب.",
    "ابدأ المؤقّت ثم اكتب إجاباتك في الحقول. بعد التصحيح ستظهر لك الدرجة والحل الكامل لكل جزء.",
    "توزيع الوقت المقترح: 12 دقيقة لسؤال تايلور، 16 لكل جزء من سؤال إيجاد الجذور، 23 لـ LU، 23 للانحدار."
  ],
  parts: [
    {
      id: "q1", code: "Q1", title: "Taylor polynomial", marks: 14,
      text: "Use Taylor polynomial of the function f(x) = √x from a = 2.0 to find f(2.5) for a relative true error of less than 0.05%.",
      fields: [
        { id: "q1a", label: "f(2.5) =", ans: 1.5813, tol: 0.002, marks: 7, unit: "" },
        { id: "q1b", label: "Lowest order n that satisfies 0.05% =", ans: 3, tol: 0.1, marks: 7, unit: "" }
      ],
      sol: `
        <p>المشتقات عند a = 2: f = 1.4142، f′ = 0.35355، f″ = −0.088389، f‴ = 0.066291، و h = 0.5.</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Order</th><th>Approximation</th><th>ε<sub>t</sub> %</th></tr></thead>
          <tbody>
            <tr><td>0</td><td>1.4142</td><td>10.56</td></tr>
            <tr><td>1</td><td>1.5910</td><td>0.6231</td></tr>
            <tr><td>2</td><td>1.5799</td><td>0.0757</td></tr>
            <tr><td>3</td><td class="hl">1.5813</td><td class="hl">0.0117 ✓</td></tr>
          </tbody>
        </table></div>
        <p>القيمة الحقيقية √2.5 = 1.5811. الترتيب الثالث (4 حدود) هو أول ترتيب يحقق الشرط، والإجابة <b>1.5813</b>.</p>
      `
    },
    {
      id: "q2a", code: "Q2 (a)", title: "False position", marks: 18,
      text: "Consider f(x) = e^(−x)(3.2 sin x − 0.5 cos x). Use the false position method on [3, 4] for 3 iterations. Calculate the relative approximate error at each iteration.",
      fields: [
        { id: "q2a1", label: "x_m at iteration 3 =", ans: 3.3149, tol: 0.006, marks: 9, unit: "" },
        { id: "q2a2", label: "ε_a at iteration 3 (%) =", ans: 1.611, tol: 0.06, marks: 9, unit: "%" }
      ],
      sol: `
        <p>f(3) = 0.04713، f(4) = −0.03837. الصيغة: x<sub>m</sub> = x<sub>u</sub> − f(x<sub>u</sub>)(x<sub>L</sub>−x<sub>U</sub>)/(f(x<sub>L</sub>)−f(x<sub>U</sub>)).</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>#</th><th>x<sub>L</sub></th><th>f(x<sub>L</sub>)</th><th>x<sub>U</sub></th><th>f(x<sub>U</sub>)</th><th>x<sub>m</sub></th><th>f(x<sub>m</sub>)</th><th>ε<sub>a</sub> %</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>3</td><td>0.04713</td><td>4</td><td>−0.03837</td><td>3.5512</td><td>−0.02341</td><td>—</td></tr>
            <tr><td>2</td><td>3</td><td>0.04713</td><td>3.5512</td><td>−0.02341</td><td>3.3683</td><td>−0.00799</td><td>5.430</td></tr>
            <tr><td>3</td><td>3</td><td>0.04713</td><td>3.3683</td><td>−0.00799</td><td class="hl">3.3149</td><td>−0.00215</td><td class="hl">1.611</td></tr>
          </tbody>
        </table></div>
        <p>الجذر الحقيقي 3.29659 (tan x = 0.5/3.2)، فالخطأ الحقيقي 0.555%. لاحظ أن الطرف x = 3 لم يتحرك.</p>
      `
    },
    {
      id: "q2b", code: "Q2 (b)", title: "Newton-Raphson", marks: 18,
      text: "For f(x) = x³ − 9x + 2, use the Newton-Raphson method (3 iterations, x₀ = 0). Calculate the relative approximate error at each iteration.",
      fields: [
        { id: "q2b1", label: "f′(x₀) at x₀ = 0 =", ans: -9, tol: 0.01, marks: 6, unit: "" },
        { id: "q2b2", label: "x₃ =", ans: 0.223462, tol: 0.0005, marks: 12, unit: "" }
      ],
      sol: `
        <p>f′(x) = 3x² − 9، و x<sub>i+1</sub> = x<sub>i</sub> − f/f′.</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>i</th><th>x<sub>i</sub></th><th>f(x<sub>i</sub>)</th><th>f′(x<sub>i</sub>)</th><th>x<sub>i+1</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>0</td><td>2</td><td>−9</td><td>0.2222</td><td>100</td></tr>
            <tr><td>2</td><td>0.2222</td><td>0.01097</td><td>−8.8519</td><td>0.22346</td><td>0.5548</td></tr>
            <tr><td>3</td><td>0.22346</td><td>1.03×10⁻⁶</td><td>−8.8502</td><td class="hl">0.223462</td><td class="hl">0.00005</td></tr>
          </tbody>
        </table></div>
        <p>الجذر ≈ <b>0.22346</b>. إذا قرّبت إلى 4 منازل قبل كل خطوة ستحصل على εa ≈ 0.045% في التكرار الثالث (كما في السلايد) — كلاهما مقبول.</p>
      `
    },
    {
      id: "q3", code: "Q3", title: "LU decomposition", marks: 25,
      text: "Solve the following linear system using LU decomposition: x₁ + x₂ + x₃ = 1, 4x₁ + 3x₂ − x₃ = 6, 3x₁ + 5x₂ + 3x₃ = 4.",
      fields: [
        { id: "q3a", label: "x₁ =", ans: 1, tol: 0.02, marks: 6, unit: "" },
        { id: "q3b", label: "x₂ =", ans: 0.5, tol: 0.02, marks: 6, unit: "" },
        { id: "q3c", label: "x₃ =", ans: -0.5, tol: 0.02, marks: 6, unit: "" },
        { id: "q3d", label: "z₃ (from LZ = B) =", ans: 5, tol: 0.05, marks: 7, unit: "" }
      ],
      sol: `
        <p>المضاعفات: m₂₁ = 4، m₃₁ = 3، ثم m₃₂ = −2.</p>
        <div class="formula"><div class="fx">L = [1 0 0 ; 4 1 0 ; 3 −2 1], &nbsp; U = [1 1 1 ; 0 −1 −5 ; 0 0 −10]</div></div>
        <p><b>LZ = B:</b> z₁ = 1، z₂ = 6 − 4 = 2، z₃ = 4 − 3 − (−2)(2) = 5.</p>
        <p><b>UX = Z:</b> −10x₃ = 5 ⇒ x₃ = −0.5؛ −x₂ + 2.5 = 2 ⇒ x₂ = 0.5؛ x₁ = 1 − 0.5 + 0.5 = 1.</p>
        <p><b>X = [1, 0.5, −0.5]<sup>T</sup></b>، والتحقق: 3(1) + 5(0.5) + 3(−0.5) = 4 ✓.</p>
      `
    },
    {
      id: "q4a", code: "Q4 (a)", title: "Linearized regression", marks: 15,
      text: "Use the linearized data model to find the constants of the regression model y = a x e^(−bx) that best fit: x = 1,2,3,4 and y = 2,3,4,4.5.",
      fields: [
        { id: "q4a1", label: "a =", ans: 2.3094, tol: 0.03, marks: 6, unit: "" },
        { id: "q4a2", label: "b =", ans: 0.18439, tol: 0.003, marks: 6, unit: "" },
        { id: "q4a3", label: "S_r =", ans: 0.051, tol: 0.005, marks: 3, unit: "" }
      ],
      sol: `
        <p>الخطية: ln(y/x) = ln a − b x. y<sub>f</sub> = 0.6931، 0.4055، 0.2877، 0.1178؛ Σy<sub>f</sub> = 1.5041، Σx·y<sub>f</sub> = 2.8383.</p>
        <p>a₁ = (11.353 − 15.041)/20 = −0.18439 ⇒ <b>b = 0.18439</b>.</p>
        <p>a₀ = (1.5041 + 1.8439)/4 = 0.83699 ⇒ <b>a = e<sup>0.83699</sup> = 2.3094</b>.</p>
        <div class="formula"><div class="fx">y = 2.3094 x e<sup>−0.18439x</sup></div></div>
        <p>القيم المتوقعة 1.9205، 3.1943، 3.9846، 4.4182 ⇒ S<sub>r</sub> = <b>0.051</b>.</p>
      `
    },
    {
      id: "q4b", code: "Q4 (b)", title: "Is the curve a good fit?", marks: 10,
      text: "Determine whether the curve found in Q4(a) is a good fit for the data.",
      fields: [
        { id: "q4b1", label: "r =", ans: 0.9931, tol: 0.004, marks: 5, unit: "" },
        { id: "q4b2", label: "الحكم", type: "choice", options: ["نعم، مطابقة جيدة", "لا، مطابقة سيئة"], ans: 0, marks: 5, unit: "" }
      ],
      sol: `
        <p>S<sub>t</sub> = Σ(y−ȳ)² = 3.6875 (المتوسط 3.375)، و S<sub>r</sub> = 0.0510.</p>
        <p>r² = 1 − 0.0510/3.6875 = 0.9862 ⇒ <b>r = 0.9931</b>.</p>
        <p>r قريبة جداً من 1 و S<sub>r</sub> صغير جداً مقارنة بـ S<sub>t</sub>، إذن <b>النموذج مطابقة جيدة</b> ويفسّر 98.6% من التباين.</p>
      `
    }
  ]
};
