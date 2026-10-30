window.FORMULAS = [
  { title: "تحليل الأخطاء", rows: [
    ["الخطأ المطلق الحقيقي", "E_t = |true − approx|"],
    ["الخطأ النسبي الحقيقي", "ε_t = (E_t / |true|) × 100%"],
    ["الخطأ النسبي التقريبي", "ε_a = |(x_new − x_old) / x_new| × 100%"],
    ["معيار التوقف", "|ε_a| < ε_s"],
    ["الدقة المطلوبة لـ n رقم معتبر", "ε_s = (0.5 × 10^(2−n))%"]
  ]},
  { title: "تايلور", rows: [
    ["متسلسلة تايلور حول a", "f(x) = Σ f^(k)(a) (x−a)^k / k!"],
    ["حد الباقي", "R_n = f^(n+1)(ξ)(x−a)^(n+1)/(n+1)!"],
    ["صيغة h", "f(x+h) = Σ f^(k)(x) h^k/k! + R_n"],
    ["ماكلورين", "a = 0"],
    ["e^x", "1 + x + x²/2! + x³/3! + …"],
    ["sin x", "x − x³/3! + x⁵/5! − …"],
    ["cos x", "1 − x²/2! + x⁴/4! − …"],
    ["ln(1+x)", "x − x²/2 + x³/3 − …"]
  ]},
  { title: "إيجاد الجذور — طرق التجميع", rows: [
    ["التنصيف", "c = (a+b)/2, |error| ≤ (b−a)/2^n"],
    ["عدد تكرارات التنصيف", "n ≥ log₂((b−a)/ε_s)"],
    ["الوضع الزائف", "x_m = x_u − f(x_u)(x_L−x_U)/(f(x_L)−f(x_U))"],
    ["تعديل Illinois", "نصّف f عند الطرف الثابت"],
    ["ترتيب تقارب التنصيف", "خطي (1)"]
  ]},
  { title: "إيجاد الجذور — الطرق المفتوحة", rows: [
    ["نقطة التثبيت", "x_k = g(x_(k−1))"],
    ["شرط تقارب نقطة التثبيت", "|g′(x)| < 1"],
    ["نيوتن-رافسون", "x_(i+1) = x_i − f(x_i)/f′(x_i)"],
    ["القاطع", "x_(i+1) = x_i − f(x_i)(x_i−x_(i−1))/(f(x_i)−f(x_(i−1)))"],
    ["القاطع المعدّل", "x_(i+1) = x_i − δx_i f(x_i)/(f(x_i+δx_i)−f(x_i))"],
    ["رتب التقارب", "نيوتن 2 · القاطع 1.618 · نقطة التثبيت/التنصيف 1"]
  ]},
  { title: "الأنظمة الخطية", rows: [
    ["الحذف الأمامي", "m_ik = a_ik / a_kk ;  R_i ← R_i − m_ik R_k"],
    ["التعويض الخلفي", "x_i = (b_i − Σ a_ij x_j)/a_ii"],
    ["المحورية المقاسة", "اختر أكبر |a_ik|/s_i، s_i = max|row i|"],
    ["تحليل LU", "A = LU ;  LZ = B ;  UX = Z"],
    ["Gauss-Seidel", "x_i = (b_i − Σ_(j≠i) a_ij x_j)/a_ii"],
    ["السيادة القطرية", "|a_ii| > Σ_(j≠i) |a_ij|"],
    ["الباقي", "R = AX − B"]
  ]},
  { title: "تركيب المنحنيات", rows: [
    ["المعادلات الطبيعية", "n a₀ + a₁Σx = Σy ;  a₀Σx + a₁Σx² = Σxy"],
    ["الميل", "a₁ = (nΣxy − ΣxΣy)/(nΣx² − (Σx)²)"],
    ["التقاطع", "a₀ = ȳ − a₁x̄"],
    ["Sr", "Σ(y_i − ŷ_i)²"],
    ["St", "Σ(y_i − ȳ)²"],
    ["الخطأ المعياري", "s_(y/x) = √(Sr/(n−2))"],
    ["معامل التحديد", "r² = (St − Sr)/St"],
    ["الأسّي", "y = a e^(bx) ⇒ ln y = ln a + bx"],
    ["القوة", "y = a x^b ⇒ log y = log a + b log x"],
    ["التشبّع", "y = ax/(b+x) ⇒ 1/y = (b/a)(1/x) + 1/a"]
  ]}
];

window.CARDS = [
  { q: "الخطأ المطلق الحقيقي؟", a: "E_t = |true value − approximation|", t: "errors" },
  { q: "الخطأ النسبي الحقيقي؟", a: "ε_t = (E_t / |true value|) × 100%", t: "errors" },
  { q: "الخطأ النسبي التقريبي؟", a: "ε_a = |(x_new − x_old)/x_new| × 100%", t: "errors" },
  { q: "معيار التوقف لأربعة أرقام معتبرة؟", a: "ε_s = 0.5 × 10^(−2) = 0.005%", t: "errors" },
  { q: "ما مصدر خطأ التقريب (round-off)؟", a: "تمثيل الأعداد بعدد محدود من البتات؛ 1/3 و1.1 لا يمثّلان بدقة.", t: "errors" },
  { q: "ما مصدر خطأ القطع (truncation)؟", a: "قطع عملية لا نهائية، مثل متسلسلة تايلور بعد n حداً.", t: "errors" },
  { q: "الفرق بين accuracy و precision؟", a: "الدقة (accuracy): القرب من الحقيقة. الضبط (precision): تقارب القياسات من بعضها.", t: "errors" },
  { q: "صيغة تايلور حول a؟", a: "f(x) = Σ f^(k)(a)(x−a)^k/k! + R_n", t: "taylor" },
  { q: "حد الباقي R_n؟", a: "R_n = f^(n+1)(ξ)(x−a)^(n+1)/(n+1)!<span class=\"ar-line\">حيث ξ بين a و x</span>", t: "taylor" },
  { q: "متسلسلة e^x؟", a: "1 + x + x²/2! + x³/3! + …", t: "taylor" },
  { q: "متسلسلة sin x؟", a: "x − x³/3! + x⁵/5! − …", t: "taylor" },
  { q: "متسلسلة cos x؟", a: "1 − x²/2! + x⁴/4! − …", t: "taylor" },
  { q: "ما شرط صلاحية طريقة التنصيف؟", a: "f مستمرة و f(a)·f(b) < 0 على [a,b].", t: "bisection" },
  { q: "حد الخطأ بعد n تكرار تنصيف؟", a: "|error| ≤ (b−a)/2^n.", t: "bisection" },
  { q: "عدد تكرارات التنصيف اللازمة؟", a: "مقرّباً للأعلى: n ≥ log₂((b−a)/ε_s)", t: "bisection" },
  { q: "رتبة تقارب التنصيف؟", a: "خطية (order 1): الخطأ ينصف كل تكرار.", t: "bisection" },
  { q: "صيغة الوضع الزائف؟", a: "x_m = x_u − f(x_u)(x_L−x_U)/(f(x_L)−f(x_U))", t: "false-position" },
  { q: "ما فكرة تعديل Illinois؟", a: "إذا بقي طرف ثابتاً تكرارين، نصّف f عنده لكسر التجمّد.", t: "false-position" },
  { q: "شرط تقارب نقطة التثبيت؟", a: "|g′(root)| < 1.", t: "open" },
  { q: "صيغة نيوتن-رافسون؟", a: "x_(i+1) = x_i − f(x_i)/f′(x_i)", t: "open" },
  { q: "رتبة تقارب نيوتن؟", a: "تربيعية (order 2) عند جذر بسيط.", t: "open" },
  { q: "متى يفشل نيوتن؟", a: "عندما f′(x)=0، أو يكون التقدير بعيداً، أو الجذر مكرراً (يصبح التقارب خطياً).", t: "open" },
  { q: "صيغة القاطع؟", a: "x_(i+1) = x_i − f(x_i)(x_i−x_(i−1))/(f(x_i)−f(x_(i−1)))", t: "open" },
  { q: "رتبة تقارب القاطع؟", a: "≈ 1.618 (superlinear).", t: "open" },
  { q: "صيغة القاطع المعدّل؟", a: "x_(i+1) = x_i − δx_i f(x_i)/(f(x_i+δx_i)−f(x_i))", t: "open" },
  { q: "خطوات LU؟", a: "A = LU ;  LZ = B ;  UX = Z", t: "linear" },
  { q: "ما عناصر L في LU؟", a: "مضاعفات الحذف m_ik، والقطر آحاد.", t: "linear" },
  { q: "معيار اختيار المحور في scaled partial pivoting؟", a: "أكبر نسبة |a_ik|/s_i حيث s_i أكبر عنصر مطلق في الصف.", t: "linear" },
  { q: "صيغة Gauss-Seidel؟", a: "x_i = (b_i − Σ_(j≠i) a_ij x_j)/a_ii<span class=\"ar-line\">باستخدام أحدث القيم المحسوبة</span>", t: "linear" },
  { q: "شرط السيادة القطرية؟", a: "|a_ii| > Σ_(j≠i) |a_ij|<span class=\"ar-line\">العنصر القطري أكبر من مجموع بقية عناصر صفه</span>", t: "linear" },
  { q: "كيف تتحقق من صحة حل نظام؟", a: "R = AX − B<span class=\"ar-line\">الحل مقبول إذا كان max|r_i| أصغر من التحمّل</span>", t: "linear" },
  { q: "ما النظام ill-conditioned؟", a: "تغيير صغير في المعاملات يسبب تغيراً كبيراً في الحل.", t: "linear" },
  { q: "المعادلات الطبيعية للانحدار الخطي؟", a: "n a₀ + a₁Σx = Σy ;  a₀Σx + a₁Σx² = Σxy", t: "curve" },
  { q: "صيغة الميل a₁؟", a: "a₁ = (nΣxy − ΣxΣy)/(nΣx² − (Σx)²)", t: "curve" },
  { q: "ما St و Sr؟", a: "St = Σ(y−ȳ)² ;  Sr = Σ(y−ŷ)²", t: "curve" },
  { q: "صيغة r²؟", a: "r² = (St − Sr)/St<span class=\"ar-line\">ونسبة التباين المفسَّر</span>", t: "curve" },
  { q: "الخطأ المعياري s_y/x؟", a: "√(Sr/(n−2)) لأننا قدّرنا معاملين.", t: "curve" },
  { q: "خطية y = a e^(bx)؟", a: "ln y = ln a + b x<span class=\"ar-line\">ارسم ln y مقابل x</span>", t: "curve" },
  { q: "خطية y = a x^b؟", a: "log y = log a + b log x.", t: "curve" },
  { q: "خطية y = ax/(b+x)؟", a: "1/y = (b/a)(1/x) + 1/a.", t: "curve" }
];

window.PYCODE = [
  { id: "py-bisection", file: "bisection.py", code:
`def bisection(f, a, b, tol=1e-6, max_iter=100):
    if f(a) * f(b) > 0:
        raise ValueError("f(a) and f(b) must have opposite signs")
    xm_old = None
    for i in range(1, max_iter + 1):
        xm = (a + b) / 2
        fxm = f(xm)
        ea = None if xm_old is None else abs((xm - xm_old) / xm) * 100
        print(i, a, b, xm, fxm, ea)
        if abs(fxm) < tol or (ea is not None and ea < 0.001):
            break
        if f(a) * fxm < 0:
            b = xm
        else:
            a = xm
        xm_old = xm
    return xm

# Example
# f = lambda x: x**3 - x - 2
# print(bisection(f, 1, 2))` },
  { id: "py-false", file: "false_position.py", code:
`def false_position(f, a, b, tol=1e-6, max_iter=100):
    if f(a) * f(b) > 0:
        raise ValueError("bracket required")
    xm_old = None
    for i in range(1, max_iter + 1):
        xm = b - f(b) * (a - b) / (f(a) - f(b))
        fm = f(xm)
        ea = None if xm_old is None else abs((xm - xm_old) / xm) * 100
        print(i, a, b, xm, fm, ea)
        if abs(fm) < tol:
            break
        if f(a) * fm < 0:
            b = xm
        else:
            a = xm
        xm_old = xm
    return xm` },
  { id: "py-newton", file: "newton.py", code:
`def newton(f, df, x0, tol=1e-6, max_iter=100):
    for i in range(1, max_iter + 1):
        fx, dfx = f(x0), df(x0)
        if abs(dfx) < 1e-12:
            raise ValueError("zero derivative")
        x1 = x0 - fx / dfx
        ea = abs((x1 - x0) / x1) * 100
        print(i, x0, fx, dfx, x1, ea)
        if abs(f(x1)) < tol or ea < 0.001:
            return x1
        x0 = x1
    return x0

# f  = lambda x: x**3 - 9*x + 2
# df = lambda x: 3*x**2 - 9
# print(newton(f, df, 0))` },
  { id: "py-secant", file: "secant.py", code:
`def secant(f, x0, x1, tol=1e-6, max_iter=100):
    for i in range(1, max_iter + 1):
        f0, f1 = f(x0), f(x1)
        if f1 - f0 == 0:
            raise ValueError("division by zero")
        x2 = x1 - f1 * (x1 - x0) / (f1 - f0)
        ea = abs((x2 - x1) / x2) * 100
        print(i, x1, f1, x2, ea)
        if abs(f(x2)) < tol or ea < 0.001:
            return x2
        x0, x1 = x1, x2
    return x2

# f = lambda x: x**5 + x**3 + 3
# print(secant(f, -1.0, -1.1))` },
  { id: "py-msecant", file: "modified_secant.py", code:
`def modified_secant(f, x0, delta=0.01, tol=1e-6, max_iter=100):
    for i in range(1, max_iter + 1):
        f0 = f(x0)
        x1 = x0 - delta * x0 * f0 / (f(x0 + delta * x0) - f0)
        ea = abs((x1 - x0) / x1) * 100
        print(i, x0, x1, ea)
        if abs(f(x1)) < tol or ea < 0.001:
            return x1
        x0 = x1
    return x0

# f = lambda x: math.exp(-x) - x
# print(modified_secant(f, 0.5, 0.01))` },
  { id: "py-lu", file: "lu_decomposition.py", code:
`def lu_solve(A, b):
    n = len(A)
    L = [[0.0] * n for _ in range(n)]
    U = [[0.0] * n for _ in range(n)]

    for i in range(n):
        L[i][i] = 1.0
        for k in range(i, n):
            s = sum(L[i][j] * U[j][k] for j in range(i))
            U[i][k] = A[i][k] - s
        for k in range(i + 1, n):
            s = sum(L[k][j] * U[j][i] for j in range(i))
            L[k][i] = (A[k][i] - s) / U[i][i]

    z = [0.0] * n                      # forward: LZ = b
    for i in range(n):
        z[i] = b[i] - sum(L[i][j] * z[j] for j in range(i))

    x = [0.0] * n                      # backward: UX = z
    for i in range(n - 1, -1, -1):
        x[i] = (z[i] - sum(U[i][j] * x[j] for j in range(i + 1, n))) / U[i][i]
    return L, U, z, x

# A = [[1, 1, 1], [4, 3, -1], [3, 5, 3]]
# b = [1, 6, 4]
# print(lu_solve(A, b))` },
  { id: "py-gs", file: "gauss_seidel.py", code:
`def gauss_seidel(A, b, x0=None, tol=5.0, max_iter=100):
    n = len(A)
    x = [0.0] * n if x0 is None else x0[:]
    for it in range(1, max_iter + 1):
        x_old = x[:]
        for i in range(n):
            s = sum(A[i][j] * x[j] for j in range(n) if j != i)
            x[i] = (b[i] - s) / A[i][i]
        errs = [abs((x[i] - x_old[i]) / x[i]) * 100 for i in range(n)]
        print(it, x, max(errs))
        if max(errs) < tol:
            break
    return x

# A = [[10, 2, -1], [-3, -6, 2], [1, 1, 5]]
# b = [27, -61.5, -21.5]
# print(gauss_seidel(A, b))` },
  { id: "py-reg", file: "linear_regression.py", code:
`def linear_regression(x, y):
    n = len(x)
    sx, sy = sum(x), sum(y)
    sxy = sum(xi * yi for xi, yi in zip(x, y))
    sxx = sum(xi * xi for xi in x)

    a1 = (n * sxy - sx * sy) / (n * sxx - sx * sx)
    a0 = (sy - a1 * sx) / n

    yhat = [a0 + a1 * xi for xi in x]
    Sr = sum((yi - yh) ** 2 for yi, yh in zip(y, yhat))
    ybar = sy / n
    St = sum((yi - ybar) ** 2 for yi in y)
    r = (1 - Sr / St) ** 0.5
    return a0, a1, Sr, St, r

# Nonlinear by linearization:
# exponential: y = a*exp(bx)  -> regress x vs ln(y)
# power:       y = a*x**b     -> regress ln(x) vs ln(y)
# saturation:  y = a*x/(b+x)  -> regress 1/x vs 1/y` }
];

window.SOURCES = [
  { group: "المحاضرات", items: [
    { file: "01-intro.pdf", title: "مقدمة في التحليل العددي", desc: "Lecture 1 — الأخطاء، الأرقام المعتبرة، الدقة والاستقرار." },
    { file: "02-taylor.pdf", title: "مبرهنة تايلور", desc: "Lecture 2 — المتسلسلة، حد الباقي، أمثلة كثيرة الحدود." },
    { file: "03-bisection.pdf", title: "طريقة التنصيف", desc: "Lecture 3 — مبرهنة القيمة المتوسطة، الخوارزمية، عدد التكرارات." },
    { file: "04-false-position.pdf", title: "الوضع الزائف", desc: "Lecture 4 — الطريقة وتعديل Illinois." },
    { file: "05-open-methods.pdf", title: "الطرق المفتوحة", desc: "Lecture 5 — نقطة التثبيت، نيوتن، القاطع، القاطع المعدّل." },
    { file: "06-python-nonlinear.pdf", title: "تنفيذ الطرق في بايثون", desc: "Lecture 6 — أكواد التنصيف ونيوتن مع الجدول." },
    { file: "07-linear-systems.pdf", title: "حل الأنظمة الخطية", desc: "Lecture 7 — الحذف الغاوسي والمحورية المقاسة." },
    { file: "08-lu-gauss-seidel.pdf", title: "LU و Gauss-Seidel", desc: "Lecture 8 — التحليل والتكرار." },
    { file: "09-curve-fitting.pdf", title: "تركيب المنحنيات", desc: "Lecture 9 — المربعات الصغرى والنماذج غير الخطية." }
  ]},
  { group: "الدروس المساعدة", items: [
    { file: "tutorial-1.pdf", title: "Tutorial 1", desc: "تايلور وإيجاد الجذور مع مقارنة الطرق." },
    { file: "tutorial-2.pdf", title: "Tutorial 2", desc: "محورية مقاسة، LU، وGauss-Seidel محلولة." }
  ]},
  { group: "الامتحان والمراجع", items: [
    { file: "exam-spring2024.pdf", title: "امتحان Spring 2024", desc: "النموذج الأصلي — 90 دقيقة، 100 درجة." },
    { file: "exam-spring2024-solution.pdf", title: "حل امتحان Spring 2024", desc: "الحل الرسمي بجداول التكرارات." },
    { file: "formula-sheet.pdf", title: "ورقة صيغ الميدتيرم", desc: "الورقة المسموحة في الامتحان." },
    { file: "python-basics.pdf", title: "أساسيات بايثون للتحليل العددي", desc: "مرجع سريع للتنفيذ." },
    { file: "nonlinear-equation-methods.ipynb", title: "دفتر الطرق غير الخطية", desc: "Jupyter notebook — افتحه ببايثون." },
    { file: "python-basics.ipynb", title: "دفتر أساسيات بايثون", desc: "Jupyter notebook." }
  ]}
];

window.PLAN = [
  { day: "اليوم · الجمعة", date: "30 أكتوبر", focus: "الأساسيات وتايلور", tasks: [
    { t: "اقرأ درس تحليل الأخطاء", d: "ركّز على تعريفات الخطأ الثلاثة والأرقام المعتبرة؛ فهي تدخل في كل سؤال.", min: "35 د", link: "#/lesson/errors" },
    { t: "اقرأ درس تايلور وحل مثال √2.5 بيدك", d: "أعد الجدول من الصفر دون النظر إلى الحل ثم قارن.", min: "60 د", link: "#/lesson/taylor" },
    { t: "حل 4 أسئلة تايلور من بنك الأسئلة", d: "t1 إلى t5، وسجّل أي خطأ إشارة أو مضروب.", min: "30 د", link: "#/practice" },
    { t: "اقرأ التنصيف وحل مثال cos", d: "تأكد أنك تفرّق بين عرض الفترة ونصف العرض.", min: "40 د", link: "#/lesson/bisection" }
  ]},
  { day: "السبت", date: "31 أكتوبر", focus: "إيجاد الجذور", tasks: [
    { t: "درس الوضع الزائف + جدول سؤال 2024", d: "أعد تنفيذ الجدول بالكامل، وراقب ثبات xL.", min: "60 د", link: "#/lesson/false-position" },
    { t: "درس الطرق المفتوحة", d: "نيوتن والقاطع هما الأسرع والأكثر ظهوراً؛ احفظ الصيغتين.", min: "70 د", link: "#/lesson/open-methods" },
    { t: "حل أسئلة f1، f2، o2، o3، o4", d: "اكتب الجداول كأنك في الامتحان، 4 أرقام معتبرة.", min: "60 د", link: "#/practice" },
    { t: "بطاقات طرق إيجاد الجذور", d: "استخدم وضع البطاقات وراجع ما أخطأت فيه فقط.", min: "15 د", link: "#/cards" }
  ]},
  { day: "الأحد", date: "1 نوفمبر", focus: "الأنظمة والانحدار", tasks: [
    { t: "درس الأنظمة الخطية كاملاً", d: "أعد LU للسؤال خطوة بخطوة؛ هذه 25 درجة.", min: "90 د", link: "#/lesson/linear-systems" },
    { t: "حل l2 (LU) و l3 (pivoting) و l4 (Gauss-Seidel)", d: "تحقق من كل حل بالتعويض أو بالباقي.", min: "60 د", link: "#/practice" },
    { t: "درس تركيب المنحنيات + سؤال Q4", d: "أعد جدول y/x و ln(y/x) واحسب a و b بنفسك.", min: "75 د", link: "#/lesson/curve-fitting" },
    { t: "حل c2 و c3 و c4", d: "لا تنسَ كتابة الحكم على المطابقة في النهاية.", min: "40 د", link: "#/practice" }
  ]},
  { day: "الاثنين", date: "2 نوفمبر", focus: "امتحان تجريبي ومراجعة", tasks: [
    { t: "الامتحان التجريبي كاملاً بمؤقّت 90 دقيقة", d: "بدون ملاحظات، وبورقة وقلم. صحّح ثم سجّل كل خطأ.", min: "90 د", link: "#/exam" },
    { t: "أعد حل الأسئلة التي أخطأت فيها", d: "لا تنتقل حتى تفهم سبب الخطأ (إشارة، تقريب، صيغة).", min: "45 د", link: "#/practice" },
    { t: "مراجعة ورقة الصيغ", d: "غطِّ العمود الأيسر وحاول استرجاع كل صيغة.", min: "20 د", link: "#/formulas" },
    { t: "بطاقات: جولة سريعة", d: "أي بطاقة لا تعرفها فوراً، اكتبها على ورقة منفصلة.", min: "20 د", link: "#/cards" }
  ]},
  { day: "الثلاثاء صباحاً", date: "3 نوفمبر", focus: "تثبيت فقط", tasks: [
    { t: "ورقة الصيغ + قائمة الأخطاء الشائعة", d: "لا تتعلم شيئاً جديداً؛ ثبّت ما تعرفه.", min: "20 د", link: "#/formulas" },
    { t: "بطاقات سريعة", d: "جولة واحدة على البطاقات التي علّمتها «أراجعها».", min: "15 د", link: "#/cards" },
    { t: "راجع توزيع الوقت", d: "دقيقة لكل درجة + 5 دقائق مراجعة، وابدأ بالسؤال الأسهل.", min: "5 د", link: "#/lesson/python-exam" }
  ]}
];
