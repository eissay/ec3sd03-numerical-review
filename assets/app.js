/* ============ State ============ */
const STORE_KEY = "numerical-exam-2026.v1";

let state = {
  lessons: {}, practice: {}, cards: {}, plan: {},
  examBest: null, theme: null
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) state = Object.assign(state, JSON.parse(raw));
  } catch (e) { /* ignore corrupt storage */ }
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

function totalPlanTasks() {
  return PLAN.reduce((n, d) => n + d.tasks.length, 0);
}
function donePlanTasks() {
  return PLAN.reduce((n, d) => n + d.tasks.filter((t, i) => state.plan[d.day + "-" + i]).length, 0);
}
function pct(a, b) { return b ? Math.round(a / b * 100) : 0; }

function overallProgress() {
  const lessons = pct(Object.keys(state.lessons).filter(k => state.lessons[k]).length, LESSONS.length);
  const practice = pct(Object.keys(state.practice).filter(k => state.practice[k]).length, PRACTICE.length);
  const cards = pct(Object.keys(state.cards).filter(k => state.cards[k]).length, CARDS.length);
  const plan = pct(donePlanTasks(), totalPlanTasks());
  const exam = state.examBest ? Math.round(state.examBest.score / state.examBest.total * 100) : 0;
  return Math.round(lessons * 0.4 + practice * 0.25 + plan * 0.15 + cards * 0.1 + exam * 0.1);
}

/* ============ Helpers ============ */
const $view = document.getElementById("view");

function esc(s) {
  return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
}

function fmtMath(s) {
  return String(s)
    .replace(/\^\(([^)]+)\)/g, "<sup>$1</sup>")
    .replace(/\^([A-Za-z0-9]+)/g, "<sup>$1</sup>")
    .replace(/_([A-Za-z0-9]+)/g, "<sub>$1</sub>");
}

function countdownText() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
  let add = (2 - d.getDay() + 7) % 7; // next Tuesday
  if (add === 0 && now > d) add = 7;
  d.setDate(d.getDate() + add);
  const ms = d - now;
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  if (days === 0) return hours <= 0 ? "اليوم" : "اليوم · " + hours + " ساعة";
  return days + (days === 1 ? " يوم" : " أيام");
}

function examDateLabel() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0, 0);
  let add = (2 - d.getDay() + 7) % 7;
  if (add === 0 && now > d) add = 7;
  d.setDate(d.getDate() + add);
  return d.toLocaleDateString("ar", { weekday: "long", day: "numeric", month: "long" });
}

function applyTheme() {
  const t = state.theme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", t);
}
document.getElementById("themeBtn").addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme") || "dark";
  state.theme = cur === "dark" ? "light" : "dark";
  saveState();
  applyTheme();
});

/* ============ Navigation ============ */
const NAV = [
  { title: "البداية", items: [
    { href: "#/home", label: "الرئيسية", icon: "◆" },
    { href: "#/plan", label: "خطة الأيام", icon: "▤" }
  ]},
  { title: "الدروس", items: LESSONS.map(l => ({ href: "#/lesson/" + l.id, label: l.title, icon: String(l.n) })) },
  { title: "التدريب", items: [
    { href: "#/practice", label: "بنك الأسئلة", icon: "✎" },
    { href: "#/exam", label: "الامتحان التجريبي", icon: "◷" }
  ]},
  { title: "المراجع", items: [
    { href: "#/formulas", label: "ورقة الصيغ", icon: "ƒ" },
    { href: "#/cards", label: "البطاقات", icon: "▭" },
    { href: "#/python", label: "أكواد بايثون", icon: "⌘" },
    { href: "#/sources", label: "المحاضرات الأصلية", icon: "⎙" },
    { href: "#/progress", label: "تقدّمي", icon: "◉" }
  ]}
];

function renderSidebar() {
  const nav = document.getElementById("nav");
  nav.className = "nav";
  nav.innerHTML = NAV.map(g => `
    <div class="nav-group">
      <div class="nav-title">${g.title}</div>
      ${g.items.map(it => {
        const isLesson = it.href.startsWith("#/lesson/");
        const id = isLesson ? it.href.split("/")[2] : null;
        const done = isLesson && state.lessons[id];
        return `<a href="${it.href}" data-nav="${it.href}"><span class="n">${it.icon}</span><span>${it.label}</span>${done ? `<span class="ok">✓</span>` : ""}</a>`;
      }).join("")}
    </div>`).join("");

  const p = overallProgress();
  document.getElementById("mpPct").textContent = p + "%";
  document.getElementById("mpBar").style.width = p + "%";
  const lessonsDone = Object.keys(state.lessons).filter(k => state.lessons[k]).length;
  document.getElementById("mpSub").textContent = lessonsDone
    ? `${lessonsDone} من ${LESSONS.length} دروس مكتملة`
    : "لم تبدأ بعد";
  document.getElementById("countdown").querySelector("#cdNum").textContent = countdownText();
  markActive();
}

function markActive() {
  const hash = location.hash || "#/home";
  document.querySelectorAll("[data-nav]").forEach(a => {
    let on = a.dataset.nav === hash;
    if (hash.startsWith("#/lesson/") && a.dataset.nav === hash) on = true;
    if (hash === "" && a.dataset.nav === "#/home") on = true;
    a.classList.toggle("active", on);
  });
}

function paintPracticeCount() { /* sidebar progress only */ }

/* ============ Home ============ */
function renderHome() {
  const p = overallProgress();
  const best = state.examBest;
  const lessonsDone = Object.keys(state.lessons).filter(k => state.lessons[k]).length;
  const practiceDone = Object.keys(state.practice).filter(k => state.practice[k]).length;

  $view.innerHTML = `
    <section class="hero">
      <div class="eyebrow">EC3SD03 · التحليل العددي</div>
      <h1>كل المادة في مكان واحد،<br>حتى الدرجة الكاملة.</h1>
      <p class="lead">موقع مبني من محاضراتك ونموذج امتحان 2024: شرح عربي مركّز، كل صيغة تحتاجها، ${PRACTICE.length} سؤالاً محلولاً، وامتحان تجريبي بمؤقّت يغطي 100 درجة.</p>
      <div class="hero-actions">
        <a class="btn" href="#/plan">ابدأ خطة الأيام</a>
        <a class="btn ghost" href="#/exam">الامتحان التجريبي</a>
        <a class="btn ghost" href="#/lesson/errors">أول درس</a>
      </div>
      <div class="hero-meta">
        <div><b>${examDateLabel()}</b><span>موعد الامتحان</span></div>
        <div><b>${countdownText()}</b><span>متبقٍ</span></div>
        <div><b>${p}%</b><span>إنجازك</span></div>
        <div><b>${best ? best.score + "/" + best.total : "—"}</b><span>أفضل امتحان تجريبي</span></div>
      </div>
    </section>

    <div class="grid g4" style="margin-bottom:1.4rem">
      <div class="card stat"><div class="k">الدروس المكتملة</div><div class="v">${lessonsDone}<small> / ${LESSONS.length}</small></div></div>
      <div class="card stat"><div class="k">أسئلة منجزة</div><div class="v">${practiceDone}<small> / ${PRACTICE.length}</small></div></div>
      <div class="card stat"><div class="k">مهام الخطة</div><div class="v">${donePlanTasks()}<small> / ${totalPlanTasks()}</small></div></div>
      <div class="card stat"><div class="k">درجة الامتحان</div><div class="v">${best ? best.score : "—"}<small> / 100</small></div></div>
    </div>

    <div class="grid g2" style="margin-bottom:1.4rem">
      <div class="card">
        <h3>خريطة الامتحان</h3>
        <p class="small muted">من نموذج Spring 2024 — 90 دقيقة و100 درجة.</p>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th>Question</th><th>Topic</th><th>Marks</th></tr></thead>
          <tbody>
            ${EXAM.parts.map(x => `<tr><td>${x.code}</td><td class="ar">${x.title}</td><td>${x.marks}</td></tr>`).join("")}
            <tr><td>Total</td><td class="ar">—</td><td class="hl">100</td></tr>
          </tbody>
        </table></div>
        <a class="btn soft sm" href="#/exam" style="margin-top:.7rem">جرّب الامتحان الآن</a>
      </div>
      <div class="card">
        <h3>أسرع طريق للدرجة الكاملة</h3>
        <ol class="small">
          <li><b>افهم</b> الفكرة من الدرس (20–30 دقيقة).</li>
          <li><b>أعد</b> المثال المحلول بيدك دون النظر.</li>
          <li><b>حل</b> 3 أسئلة من بنك الأسئلة لنفس الموضوع.</li>
          <li><b>اختبر</b> نفسك في الامتحان التجريبي بمؤقّت.</li>
          <li><b>راجع</b> الأخطاء فقط قبل النوم وفي الصباح.</li>
        </ol>
        <div class="callout tip" style="margin-bottom:0"><span class="ct">قاعدة الامتحان</span>دقيقة لكل درجة، و4 أرقام معتبرة، ولا تنسَ كتابة الجداول — عليها درجات.</div>
      </div>
    </div>

    <h2 style="margin:1.8rem 0 .8rem">المحاور</h2>
    <div class="topic-grid">
      ${LESSONS.map(l => `
        <a class="topic-card" href="#/lesson/${l.id}">
          <div class="tc-top"><h3>${l.title}</h3><span class="num-badge">${l.n}</span></div>
          <p>${l.en}</p>
          <div class="tc-foot"><span>${l.lecture}</span><span class="${state.lessons[l.id] ? "done" : ""}">${state.lessons[l.id] ? "✓ مكتمل" : l.time}</span></div>
        </a>`).join("")}
    </div>

    <h2 style="margin:2rem 0 .8rem">أخطاء تفقدك الدرجة</h2>
    <div class="grid g2">
      ${[
        ["القسمة على القديم", "الخطأ النسبي التقريبي εa يُقسم على x_new دائماً."],
        ["نسيان المضروب", "في تايلور: f″/2! و f‴/3! وليس f″ و f‴."],
        ["خلط عرض الفترة بالخطأ", "بعد n تكرار: الخطأ ≤ (b−a)/2^n وليس (b−a)."],
        ["استبدال الطرف الخطأ", "في الوضع الزائف استبدل الطرف الذي إشارته مثل f(x_m)."],
        ["تجاهل a = e^{a0}", "بعد الانحدار على ln y يجب الرجوع للأس."],
        ["الاعتماد على r فقط", "اذكر Sr و St و r² ثم اكتب الحكم صراحة."]
      ].map(x => `<div class="card flat"><h3 style="font-size:.95rem">${x[0]}</h3><p class="small muted" style="margin:0">${x[1]}</p></div>`).join("")}
    </div>

    <div class="foot">
      <span>مصدر المحتوى: محاضرات المادة 1–9، Tutorial 1–2، وامتحان Spring 2024 مع الحل.</span>
      <span>يعمل بدون إنترنت بعد التحميل.</span>
    </div>
  `;
}

/* ============ Lessons index ============ */
function renderLessonsIndex() {
  $view.innerHTML = `
    <div class="eyebrow">المحتوى</div>
    <h1>الدروس</h1>
    <p class="lead">ثمانية دروس بترتيب المحاضرات. كل درس: شرح، صيغ، أمثلة محلولة، أخطاء شائعة، وسؤال تحقّق.</p>
    <div class="topic-grid" style="margin-top:1.4rem">
      ${LESSONS.map(l => `
        <a class="topic-card" href="#/lesson/${l.id}">
          <div class="tc-top"><h3>${l.n}. ${l.title}</h3><span class="num-badge">${state.lessons[l.id] ? "✓" : l.n}</span></div>
          <p>${l.summary}</p>
          <div class="tc-foot"><span>${l.en}</span><span class="${state.lessons[l.id] ? "done" : ""}">${state.lessons[l.id] ? "✓ مكتمل" : l.time}</span></div>
        </a>`).join("")}
    </div>
  `;
}

/* ============ Lesson ============ */
const SOURCE_MAP = {
  errors: "01-intro.pdf",
  taylor: "02-taylor.pdf",
  bisection: "03-bisection.pdf",
  "false-position": "04-false-position.pdf",
  "open-methods": "05-open-methods.pdf",
  "linear-systems": "07-linear-systems.pdf",
  "curve-fitting": "09-curve-fitting.pdf",
  "python-exam": "06-python-nonlinear.pdf"
};

function renderLesson(id) {
  const i = LESSONS.findIndex(l => l.id === id);
  if (i < 0) { renderHome(); return; }
  const l = LESSONS[i];
  const prev = LESSONS[i - 1], next = LESSONS[i + 1];

  $view.innerHTML = `
    <article>
      <header class="lesson-head">
        <div class="eyebrow">الدرس ${l.n} · ${l.lecture}</div>
        <h1>${l.title}</h1>
        <p class="lead" style="margin-bottom:.4rem">${l.en}</p>
        <div class="lesson-meta">
          <span class="badge a">${l.weight}</span>
          <span class="badge">وقت مقترح: ${l.time}</span>
          ${state.lessons[l.id] ? `<span class="badge g">✓ مكتمل</span>` : ""}
          ${SOURCE_MAP[l.id] ? `<a class="badge" href="sources/${SOURCE_MAP[l.id]}" target="_blank" rel="noopener">السلايد الأصلي ↗</a>` : ""}
        </div>
      </header>

      <div class="lesson-body">
        <div class="callout tip"><span class="ct">الخلاصة في 30 ثانية</span>${l.summary}</div>
        ${l.sections.map(s => `<h2>${s.h}</h2>${s.html}`).join("")}

        <h2>أخطاء تفقدك الدرجة</h2>
        <div class="callout bad">
          <ul style="margin:0">${l.traps.map(t => `<li>${t}</li>`).join("")}</ul>
        </div>

        <h2>تحقّق سريع</h2>
        ${l.checks.map((c, k) => `
          <details class="acc">
            <summary>${k + 1}. ${c.q}</summary>
            <div class="acc-body">${c.a}</div>
          </details>`).join("")}

        <div class="lesson-foot">
          <button class="done-toggle ${state.lessons[l.id] ? "on" : ""}" id="doneLesson">
            <span class="box">${state.lessons[l.id] ? "✓" : ""}</span>
            ${state.lessons[l.id] ? "تم إنهاء الدرس" : "علّم الدرس كمكتمل"}
          </button>
          <div class="page-nav">
            ${prev ? `<a class="btn ghost sm" href="#/lesson/${prev.id}">→ ${prev.title}</a>` : ""}
            ${next ? `<a class="btn sm" href="#/lesson/${next.id}">${next.title} ←</a>` : `<a class="btn sm" href="#/practice">إلى بنك الأسئلة ←</a>`}
          </div>
        </div>
      </div>
    </article>
  `;
  $view.querySelector("#doneLesson").addEventListener("click", () => {
    state.lessons[l.id] = !state.lessons[l.id];
    saveState();
    renderSidebar();
    renderLesson(l.id);
  });
}

/* ============ Plan ============ */
function renderPlan() {
  $view.innerHTML = `
    <div class="eyebrow">من الجمعة إلى الثلاثاء</div>
    <h1>خطة الأيام</h1>
    <p class="lead">خطة واقعية: ${totalPlanTasks()} مهمة موزعة على أربعة أيام. علّم كل مهمة عند إنجازها؛ التقدّم محفوظ في متصفحك.</p>
    <div class="card flat" style="display:flex;flex-wrap:wrap;gap:1rem;align-items:center;justify-content:space-between;margin:1.2rem 0">
      <div><b>${donePlanTasks()} من ${totalPlanTasks()}</b> <span class="muted small">مهام مكتملة</span></div>
      <div class="bar" style="flex:1;min-width:160px;margin:0"><i style="width:${pct(donePlanTasks(), totalPlanTasks())}%"></i></div>
      <span class="badge a">${pct(donePlanTasks(), totalPlanTasks())}%</span>
    </div>
    ${PLAN.map((d, di) => {
      const done = d.tasks.filter((t, i) => state.plan[d.day + "-" + i]).length;
      return `
      <section class="day">
        <div class="day-head">
          <h3>${d.day}</h3>
          <span class="date">${d.date}</span>
          <span class="badge a">${d.focus}</span>
          <span style="flex:1"></span>
          <span class="badge ${done === d.tasks.length ? "g" : ""}">${done}/${d.tasks.length}</span>
        </div>
        <div class="day-body">
          ${d.tasks.map((t, i) => {
            const key = d.day + "-" + i;
            const on = state.plan[key];
            return `<div class="task ${on ? "done" : ""}" data-task="${key}">
              <div class="tbox" role="checkbox" aria-checked="${!!on}" tabindex="0">${on ? "✓" : ""}</div>
              <div class="tbody">
                <b>${t.t}</b>
                <span>${t.d}</span>
                <a class="tiny" href="${t.link}">افتح ←</a>
              </div>
              <span class="tmin">${t.min}</span>
            </div>`;
          }).join("")}
        </div>
      </section>`;
    }).join("")}
    <div class="callout exam"><span class="ct">نصيحة</span>لا تحاول إنهاء كل شيء في يوم واحد. الحفظ يثبت بالنوم بين الجلسات، والامتحان التجريبي يجب أن يكون في اليوم قبل الأخير لا في الصباح نفسه.</div>
  `;

  $view.querySelectorAll(".task").forEach(row => {
    const toggle = () => {
      const key = row.dataset.task;
      state.plan[key] = !state.plan[key];
      saveState();
      renderSidebar();
      renderPlan();
    };
    row.querySelector(".tbox").addEventListener("click", toggle);
    row.querySelector(".tbox").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(); } });
  });
}

/* ============ Formulas ============ */
function renderFormulas() {
  $view.innerHTML = `
    <div class="eyebrow">مرجع سريع</div>
    <h1>ورقة الصيغ</h1>
    <p class="lead">كل ما تحتاجه في صفحة واحدة. اطبعها أو راجعها صباح الامتحان.</p>
    <div class="toolbar">
      <button class="btn soft sm" id="printSheet">اطبع الورقة</button>
      <span class="count-note">${FORMULAS.reduce((n, g) => n + g.rows.length, 0)} صيغة في ${FORMULAS.length} مجموعات</span>
    </div>
    ${FORMULAS.map(g => `
      <section class="formula-group">
        <h3>${g.title}</h3>
        <div class="fg-body">
          ${g.rows.map(r => `<div class="frow"><div class="fl">${r[0]}</div><div class="fv" dir="auto">${fmtMath(r[1])}</div></div>`).join("")}
        </div>
      </section>`).join("")}
    <div class="callout warn"><span class="ct">تذكير</span>في الامتحان: 4 أرقام معتبرة، والدرجات بالراديان، وεa يُقسم على القيمة الجديدة.</div>
  `;
  $view.querySelector("#printSheet").addEventListener("click", () => window.print());
}

/* ============ Python ============ */
function renderPython() {
  $view.innerHTML = `
    <div class="eyebrow">تنفيذ</div>
    <h1>أكواد بايثون</h1>
    <p class="lead">كل طريقة في المقرر بتنفيذ مطابق لبنية المحاضرة. استخدمها للتحقق من حساباتك اليدوية أو لحل واجبات البرمجة.</p>
    <div class="callout tip"><span class="ct">كيف تستخدمها</span>الصق الدالة في ملف .py أو دفتر Jupyter، ثم عرّف f (و f′ لنيوتن) واستدعِ الدالة. اطبع الجدول دائماً وقارنه بحلك اليدوي.</div>
    ${PYCODE.map(c => `
      <div class="code-block">
        <div class="code-head"><span>${c.file}</span><button class="copy-btn" data-code="${c.id}">نسخ</button></div>
        <pre><code id="${c.id}">${esc(c.code)}</code></pre>
      </div>`).join("")}
    <div class="callout exam"><span class="ct">في الامتحان</span>الأسئلة حسابية ورقية في الغالب، لكن فهم الكود يساعدك على تذكّر ترتيب الخطوات وشروط التوقف. لاحظ أن كل دالة تطبع εa وتحسبها على القيمة الجديدة.</div>
  `;
  $view.querySelectorAll(".copy-btn").forEach(b => {
    b.addEventListener("click", async () => {
      const code = document.getElementById(b.dataset.code).textContent;
      try {
        await navigator.clipboard.writeText(code);
        b.textContent = "تم النسخ ✓";
      } catch (e) {
        const ta = document.createElement("textarea");
        ta.value = code; document.body.appendChild(ta); ta.select();
        try { document.execCommand("copy"); b.textContent = "تم النسخ ✓"; } catch (e2) { b.textContent = "انسخ يدوياً"; }
        document.body.removeChild(ta);
      }
      setTimeout(() => { b.textContent = "نسخ"; }, 1800);
    });
  });
}

/* ============ Sources ============ */
function renderSources() {
  const total = SOURCES.reduce((n, g) => n + g.items.length, 0);
  $view.innerHTML = `
    <div class="eyebrow">النسخ الأصلية</div>
    <h1>المحاضرات والنماذج</h1>
    <p class="lead">${total} ملفاً من مجلد المادة، منسوخاً داخل الموقع ليكون مرجعاً واحداً يعمل بدون إنترنت.</p>
    <div class="callout tip"><span class="ct">طريقة الاستخدام</span>افتح الدرس أولاً لفهم الفكرة، ثم ارجع إلى السلايد الأصلي لتأكيد التفاصيل التي قد تكون صورة أو جدولاً غير مستخرج.</div>
    ${SOURCES.map(g => `
      <section class="formula-group">
        <h3>${g.group}</h3>
        <div class="fg-body">
          ${g.items.map(it => `
            <div class="frow" style="grid-template-columns:1.4fr .6fr">
              <div>
                <b style="font-size:.92rem">${it.title}</b>
                <div class="small muted" style="margin-top:.1rem">${it.desc}</div>
              </div>
              <div style="text-align:left"><a class="btn ghost sm" href="sources/${it.file}" target="_blank" rel="noopener">فتح</a></div>
            </div>`).join("")}
        </div>
      </section>`).join("")}
  `;
}

/* ============ Progress ============ */
function renderProgress() {
  const p = overallProgress();
  const R = 62, C = 2 * Math.PI * R;
  const lessonsDone = LESSONS.filter(l => state.lessons[l.id]).length;
  const practiceDone = PRACTICE.filter(q => state.practice[q.id]).length;
  const cardsKnown = CARDS.filter((c, i) => state.cards[i]).length;
  const best = state.examBest;

  $view.innerHTML = `
    <div class="eyebrow">لوحة المتابعة</div>
    <h1>تقدّمي</h1>
    <p class="lead">كل شيء محفوظ محلياً في متصفحك. أغلق الصفحة وارجع متى شئت.</p>

    <div class="grid g2" style="margin:1.3rem 0;align-items:center">
      <div class="card">
        <div class="big-ring">
          <svg width="150" height="150">
            <circle cx="75" cy="75" r="${R}" fill="none" stroke="var(--panel-2)" stroke-width="10"/>
            <circle cx="75" cy="75" r="${R}" fill="none" stroke="var(--accent)" stroke-width="10"
              stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - p / 100)}"/>
          </svg>
          <span class="val">${p}%</span>
        </div>
        <p class="center small muted" style="margin-top:.6rem">التقدّم الكلي (دروس 40% · أسئلة 25% · خطة 15% · بطاقات 10% · امتحان 10%)</p>
      </div>
      <div class="card">
        <h3>الأرقام</h3>
        <div class="checkline"><span>الدروس</span><b>${lessonsDone} / ${LESSONS.length}</b></div>
        <div class="checkline"><span>أسئلة منجزة</span><b>${practiceDone} / ${PRACTICE.length}</b></div>
        <div class="checkline"><span>مهام الخطة</span><b>${donePlanTasks()} / ${totalPlanTasks()}</b></div>
        <div class="checkline"><span>بطاقات تعرفها</span><b>${cardsKnown} / ${CARDS.length}</b></div>
        <div class="checkline"><span>أفضل امتحان</span><b>${best ? best.score + " / " + best.total : "—"}</b></div>
      </div>
    </div>

    <div class="card" style="margin-bottom:1rem">
      <h3>الدروس</h3>
      ${LESSONS.map(l => `
        <div class="checkline">
          <span>${l.n}. ${l.title}</span>
          <span class="${state.lessons[l.id] ? "ok" : "no"}">${state.lessons[l.id] ? "✓ مكتمل" : "غير مكتمل"}</span>
        </div>`).join("")}
    </div>

    <div class="card">
      <h3>إعادة الضبط</h3>
      <p class="small muted">لن يمسح هذا أي محتوى، فقط تقدّمك المحفوظ في هذا المتصفح.</p>
      <button class="btn danger sm" id="resetAll">امسح كل التقدّم</button>
    </div>
  `;

  $view.querySelector("#resetAll").addEventListener("click", () => {
    if (!confirm("هل تريد مسح كل التقدّم والبدء من جديد؟")) return;
    state = { lessons: {}, practice: {}, cards: {}, plan: {}, examBest: null, theme: state.theme };
    saveState();
    EXAM_RUN = null;
    cardIndex = 0;
    renderSidebar();
    renderProgress();
  });
}

/* ============ Router ============ */
function route() {
  const hash = location.hash || "#/home";
  const [path, arg] = [hash.split("?")[0], null];

  if (path === "#/home" || path === "#/") renderHome();
  else if (path === "#/plan") renderPlan();
  else if (path === "#/lessons") renderLessonsIndex();
  else if (path.startsWith("#/lesson/")) renderLesson(path.split("/")[2]);
  else if (path === "#/practice") renderPractice($view);
  else if (path === "#/exam") renderExam($view);
  else if (path === "#/formulas") renderFormulas();
  else if (path === "#/cards") renderCards($view);
  else if (path === "#/python") renderPython();
  else if (path === "#/sources") renderSources();
  else if (path === "#/progress") renderProgress();
  else renderHome();

  // stop the exam clock when leaving the exam page
  if (path !== "#/exam" && typeof EXAM_TIMER !== "undefined") clearInterval(EXAM_TIMER);

  document.body.classList.remove("nav-open");
  markActive();
  window.scrollTo(0, 0);
}

/* Docs-less scroll fallback */
window.addEventListener("hashchange", route);
document.getElementById("menuBtn").addEventListener("click", () => document.body.classList.toggle("nav-open"));
document.getElementById("scrim").addEventListener("click", () => document.body.classList.remove("nav-open"));

/* ============ Init ============ */
loadState();
applyTheme();
renderSidebar();
route();
setInterval(() => {
  const el = document.getElementById("cdNum");
  if (el) el.textContent = countdownText();
}, 60000);
