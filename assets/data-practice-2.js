window.PRACTICE = window.PRACTICE || [];
PRACTICE.push(
/* ---------- Open methods ---------- */
{
  id: "o1", topic: "open", tag: "Fixed point", marks: 6,
  q: "For x = √(x + 2), start at x₀ = 1 and perform 3 iterations. Check the convergence condition at the root x = 2.",
  hint: "g′(x) = 1/(2√(x+2)). عوّض 2.",
  sol: `
    <p>x₁ = √3 = 1.73205، x₂ = √3.73205 = 1.93185، x₃ = √3.93185 = <b>1.98289</b>.</p>
    <p>شرط التقارب: g′(2) = 1/(2√4) = <b>0.25 &lt; 1</b> ← التقارب مضمون، والقيم تقترب من 2.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>Iter</th><th>x<sub>i</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>1.73205</td><td>42.26</td></tr>
        <tr><td>2</td><td>1.93185</td><td>10.34</td></tr>
        <tr><td>3</td><td>1.98289</td><td>2.57</td></tr>
      </tbody>
    </table></div>
  `
},
{
  id: "o2", topic: "open", tag: "Newton-Raphson", marks: 18,
  q: "For f(x) = x³ − 9x + 2 with x₀ = 0, apply Newton-Raphson for 3 iterations and give x₃ with RAE at each step.",
  hint: "f′(x) = 3x² − 9.",
  sol: `
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>i</th><th>x<sub>i</sub></th><th>f(x<sub>i</sub>)</th><th>f′(x<sub>i</sub>)</th><th>x<sub>i+1</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>0</td><td>2</td><td>−9</td><td>0.2222</td><td>100</td></tr>
        <tr><td>2</td><td>0.2222</td><td>0.01097</td><td>−8.8519</td><td>0.22346</td><td>0.5548</td></tr>
        <tr><td>3</td><td>0.22346</td><td>1.03×10⁻⁶</td><td>−8.8502</td><td class="hl">0.223462</td><td class="hl">0.00005</td></tr>
      </tbody>
    </table></div>
    <p>الجذر ≈ 0.22346. تقارب تربيعي: الخطأ ينزل من 0.55% إلى 0.00005% في تكرار واحد.</p>
  `
},
{
  id: "o3", topic: "open", tag: "Newton with e^x", marks: 8,
  q: "Use Newton-Raphson with x₀ = 0 to solve e^(−x) − x = 0 for 3 iterations.",
  hint: "f′(x) = −e^(−x) − 1.",
  sol: `
    <p>f(0) = 1، f′(0) = −2 ⇒ x₁ = 0 − 1/(−2) = <b>0.5</b>.</p>
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>i</th><th>x<sub>i</sub></th><th>f(x<sub>i</sub>)</th><th>f′(x<sub>i</sub>)</th><th>x<sub>i+1</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>0</td><td>1.00000</td><td>−2.00000</td><td>0.5</td><td>100</td></tr>
        <tr><td>2</td><td>0.5</td><td>0.10653</td><td>−1.60653</td><td>0.566311</td><td>11.709</td></tr>
        <tr><td>3</td><td>0.566311</td><td>0.00130</td><td>−1.56762</td><td class="hl">0.567143</td><td class="hl">0.147</td></tr>
      </tbody>
    </table></div>
    <p>الجذر 0.567143 (بعد 4 تكرارات فقط بدقة عالية).</p>
  `
},
{
  id: "o4", topic: "open", tag: "Secant", marks: 8,
  q: "Apply the secant method to f(x) = x³ − x − 2 with x₀ = 1, x₁ = 2 for 3 iterations.",
  hint: "x₂ = x₁ − f(x₁)(x₁−x₀)/(f(x₁)−f(x₀)).",
  sol: `
    <div class="tbl-wrap"><table class="tbl">
      <thead><tr><th>i</th><th>x<sub>i</sub></th><th>f(x<sub>i</sub>)</th><th>x<sub>i+1</sub></th><th>ε<sub>a</sub> %</th></tr></thead>
      <tbody>
        <tr><td>1</td><td>2</td><td>4</td><td>1.33333</td><td>50.0</td></tr>
        <tr><td>2</td><td>1.33333</td><td>−0.96296</td><td>1.46269</td><td>8.844</td></tr>
        <tr><td>3</td><td>1.46269</td><td>−0.33334</td><td class="hl">1.53117</td><td class="hl">4.473</td></tr>
      </tbody>
    </table></div>
    <p>الجذر الحقيقي 1.52138 — بعد تكرارين إضافيين سنصل إليه بدقة عالية. رتبة التقارب ≈ 1.618.</p>
  `
},
{
  id: "o5", topic: "open", tag: "Modified secant", marks: 6,
  q: "Use the modified secant method with x₀ = 0.5 and δ = 0.01 to solve e^(−x) − x = 0 for 2 iterations.",
  hint: "xᵢ₊₁ = xᵢ − δxᵢ f(xᵢ) / [f(xᵢ + δxᵢ) − f(xᵢ)].",
  sol: `
    <p>x₀ = 0.5، δx₀ = 0.005، f(0.5) = 0.10653، f(0.505) = 0.09851.</p>
    <p>x₁ = 0.5 − (0.005 × 0.10653)/(0.09851 − 0.10653) = 0.5 + 0.0005327/0.00803 = <b>0.566374</b> (ε<sub>a</sub> = 11.72%).</p>
    <p>x₂ = <b>0.567144</b> (ε<sub>a</sub> = 0.1358%).</p>
    <p>لاحظ أنها تعطي نتيجة قريبة من نيوتن دون حساب المشتقة تحليلياً.</p>
  `
},
{
  id: "o6", topic: "open", tag: "Concept", marks: 5,
  q: "Which two methods would you use if f′(x) is not available analytically, and why?",
  hint: "فكّر في بديل المشتقة.",
  sol: `
    <p><b>Secant method:</b> تقدّر المشتقة بفرق منتهٍ بين نقطتين ابتدائيتين.</p>
    <p><b>Modified secant:</b> تقدّرها بإزعاج نقطة واحدة بδ صغيرة.</p>
    <p>كلتاهما تحافظ على سرعة جيدة (رتبة ≈ 1.618) دون الحاجة لمشتقة تحليلية. أما التنصيف والوضع الزائف فلا يحتاجان مشتقة أصلاً لكنهما أبطأ.</p>
  `
},
{
  id: "o7", topic: "open", tag: "Concept", marks: 4,
  q: "Order these methods by convergence speed: bisection, Newton, secant. Explain why Newton is faster.",
  hint: "الترتيب: 1، 1.618، 2.",
  sol: `
    <p>التنصيف (1) &lt; القاطع (1.618) &lt; نيوتن (2).</p>
    <p>نيوتن يستخدم معلومة المشتقة (ميل المماس) فيقفز نحو الجذر بدقة، فعدد الأرقام الصحيحة يتضاعف تقريباً كل تكرار — وهذا التقارب التربيعي. التنصيف يستخدم الإشارة فقط.</p>
  `
},
{
  id: "o8", topic: "open", tag: "Failure", marks: 4,
  q: "State two situations where Newton-Raphson fails or loses its quadratic convergence.",
  hint: "مشتقة صفرية، جذر مكرر، تقدير بعيد.",
  sol: `
    <ul>
      <li>إذا كان f′(x<sub>i</sub>) = 0 (مماس أفقي) فالقسمة على صفر.</li>
      <li>إذا كان التقدير الأولي بعيداً جداً عن الجذر فقد تتباعد الطريقة أو تتذبذب.</li>
      <li>عند جذر مكرر (f = f′ = 0) يتحول التقارب إلى خطي.</li>
    </ul>
  `
}
);
