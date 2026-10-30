/* Practice · Exam · Flashcards — rendered by app.js router */

const TOPIC_LABELS = {
  errors: "الأخطاء",
  taylor: "تايلور",
  bisection: "التنصيف",
  "false-position": "الوضع الزائف",
  open: "الطرق المفتوحة",
  linear: "الأنظمة الخطية",
  curve: "تركيب المنحنيات",
  python: "بايثون"
};

let practiceFilter = "all";
let practiceSearch = "";

function renderPractice(view) {
  const topics = ["all", "errors", "taylor", "bisection", "false-position", "open", "linear", "curve", "python"];
  const chips = topics.map(t => {
    const label = t === "all" ? "الكل" : TOPIC_LABELS[t];
    return `<button class="chip ${practiceFilter === t ? "on" : ""}" data-pfilter="${t}">${label}</button>`;
  }).join("");

  view.innerHTML = `
    <div class="eyebrow">تدريب</div>
    <h1>بنك الأسئلة</h1>
    <p class="lead">${PRACTICE.length} سؤالاً بنمط الامتحان، محلولة خطوة بخطوة. ابدأ بالأسئلة التي تحمل شارة «Exam style».</p>
    <div class="toolbar">
      <div class="search">
        <svg viewBox="0 0 24 24" width="16" height="16"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" fill="none"/><path d="M16.5 16.5 21 21" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <input id="pq" type="search" placeholder="ابحث بالكلمة أو الرمز…" value="${practiceSearch}">
      </div>
      <span class="count-note" id="pcount"></span>
    </div>
    <div class="pill-row" style="margin-bottom:1.2rem">${chips}</div>
    <div id="plist"></div>
  `;

  const paint = () => {
    const term = practiceSearch.trim().toLowerCase();
    const list = PRACTICE.filter(q => {
      const okT = practiceFilter === "all" || q.topic === practiceFilter;
      const okS = !term || (q.q + " " + q.tag + " " + (q.sol || "")).toLowerCase().includes(term);
      return okT && okS;
    });
    const box = view.querySelector("#plist");
    view.querySelector("#pcount").textContent = `${list.length} من ${PRACTICE.length} سؤالاً`;
    if (!list.length) {
      box.innerHTML = `<div class="empty">لا توجد أسئلة مطابقة. جرّب كلمة أخرى أو أزل الفلتر.</div>`;
      return;
    }
    box.innerHTML = list.map((q, i) => {
      const idx = PRACTICE.indexOf(q) + 1;
      const done = !!state.practice[q.id];
      return `
      <article class="q-card" data-qid="${q.id}">
        <div class="q-head">
          <span class="q-num">#${idx}</span>
          <span class="badge a">${TOPIC_LABELS[q.topic] || q.topic}</span>
          <span class="badge">${q.tag}</span>
          <span class="badge m">${q.marks} marks</span>
          <span style="flex:1"></span>
          <button class="btn ghost sm" data-act="done" data-id="${q.id}">${done ? "✓ منجز" : "علّم كمنجز"}</button>
        </div>
        <div class="q-body">
          <div class="q-text" dir="auto">${q.q}</div>
          <div class="q-actions">
            <button class="btn ghost sm" data-act="hint" data-id="${q.id}">تلميح</button>
            <button class="btn soft sm" data-act="sol" data-id="${q.id}">أظهر الحل</button>
          </div>
          <div class="q-hint" id="hint-${q.id}"><b>تلميح:</b> ${q.hint}</div>
          <div class="q-sol" id="sol-${q.id}">
            <span class="sol-label">الحل الكامل</span>
            ${q.sol}
          </div>
        </div>
      </article>`;
    }).join("");
  };

  paint();

  view.querySelectorAll("[data-pfilter]").forEach(b => {
    b.addEventListener("click", () => {
      practiceFilter = b.dataset.pfilter;
      view.querySelectorAll("[data-pfilter]").forEach(x => x.classList.toggle("on", x === b));
      paint();
    });
  });

  view.querySelector("#pq").addEventListener("input", e => {
    practiceSearch = e.target.value;
    paint();
  });

  view.querySelector("#plist").addEventListener("click", e => {
    const btn = e.target.closest("button[data-act]");
    if (!btn) return;
    const id = btn.dataset.id;
    const act = btn.dataset.act;
    if (act === "hint") {
      const el = view.querySelector("#hint-" + id);
      el.classList.toggle("show");
      btn.textContent = el.classList.contains("show") ? "إخفاء التلميح" : "تلميح";
    }
    if (act === "sol") {
      const el = view.querySelector("#sol-" + id);
      el.classList.toggle("show");
      btn.textContent = el.classList.contains("show") ? "إخفاء الحل" : "أظهر الحل";
    }
    if (act === "done") {
      state.practice[id] = !state.practice[id];
      saveState();
      paintPracticeCount();
      renderSidebar();
      btn.textContent = state.practice[id] ? "✓ منجز" : "علّم كمنجز";
    }
  });
}

/* ---------------- Exam ---------------- */
let EXAM_RUN = null;
let EXAM_TIMER = null;

function examRemaining() {
  if (!EXAM_RUN) return 0;
  return Math.max(0, Math.round((EXAM_RUN.end - Date.now()) / 1000));
}

function fmtClock(s) {
  const m = Math.floor(s / 60), sec = s % 60;
  return String(m).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}

function renderExam(view) {
  if (EXAM_RUN && EXAM_RUN.submitted) {
    view.innerHTML = examResultHTML();
    bindExamResult(view);
    return;
  }
  if (!EXAM_RUN || !EXAM_RUN.started) {
    view.innerHTML = examIntroHTML();
    view.querySelector("#startExam").addEventListener("click", () => {
      EXAM_RUN = { started: true, end: Date.now() + EXAM.duration * 60000, answers: {}, submitted: false };
      renderExam(view);
    });
    return;
  }

  view.innerHTML = examBodyHTML();
  startExamClock(view);
  bindExamInputs(view);
  view.querySelector("#submitExam").addEventListener("click", () => submitExam(view));
}

function examIntroHTML() {
  const best = state.examBest;
  return `
    <div class="eyebrow">محاكاة</div>
    <h1>${EXAM.title}</h1>
    <p class="lead">${EXAM.subtitle}</p>
    <div class="grid g3" style="margin:1.3rem 0">
      <div class="card flat"><div class="k muted small">المدة</div><div class="v mono" style="font-size:1.5rem">${EXAM.duration} دقيقة</div></div>
      <div class="card flat"><div class="k muted small">الدرجة</div><div class="v mono" style="font-size:1.5rem">${EXAM.total}</div></div>
      <div class="card flat"><div class="k muted small">أفضل نتيجة</div><div class="v mono" style="font-size:1.5rem">${best ? best.score + " / " + best.total : "—"}</div></div>
    </div>
    <div class="card">
      <h3>قبل أن تبدأ</h3>
      <ul class="small">${EXAM.instructions.map(x => `<li>${x}</li>`).join("")}</ul>
      <p class="small muted">المؤقّت يبدأ فور الضغط، ويُصحّح تلقائياً عند انتهاء الوقت.</p>
      <button class="btn" id="startExam">ابدأ الامتحان</button>
    </div>
    <div class="card flat" style="margin-top:1rem">
      <h3>توزيع الدرجات</h3>
      <div class="tbl-wrap"><table class="tbl">
        <thead><tr><th>Question</th><th>Topic</th><th>Marks</th></tr></thead>
        <tbody>${EXAM.parts.map(p => `<tr><td>${p.code}</td><td class="ar">${p.title}</td><td>${p.marks}</td></tr>`).join("")}
        <tr><td>Total</td><td class="ar">—</td><td class="hl">${EXAM.total}</td></tr></tbody>
      </table></div>
    </div>
  `;
}

function examBodyHTML() {
  return `
    <div class="eyebrow">الامتحان التجريبي</div>
    <h1>${EXAM.title}</h1>
    <div class="exam-bar">
      <div class="timer" id="examClock"><span class="cd-label">الوقت المتبقي</span><span id="clockVal">${fmtClock(examRemaining())}</span></div>
      <div class="count-note" id="answeredNote"></div>
      <button class="btn" id="submitExam">صحّح الامتحان</button>
    </div>
    ${EXAM.parts.map((p, qi) => `
      <section class="exam-q" data-part="${p.id}">
        <div class="exam-q-head">
          <span class="badge a">${p.code}</span>
          <b>${p.title}</b>
          <span style="flex:1"></span>
          <span class="badge m">${p.marks} marks</span>
        </div>
        <div class="exam-q-body">
          <div class="q-text" dir="auto">${p.text}</div>
          <div class="answers">
            ${p.fields.map(f => f.type === "choice" ? `
              <div class="ans-field">
                <label for="${f.id}" dir="auto">${f.label}</label>
                <select id="${f.id}" data-field="${f.id}" style="background:var(--panel-2);border:1px solid var(--line);border-radius:8px;padding:.45rem .6rem;color:var(--text);font-family:inherit">
                  ${f.options.map((o, i) => `<option value="${i}">${o}</option>`).join("")}
                </select>
                <div class="fb" id="fb-${f.id}"></div>
              </div>` : `
              <div class="ans-field">
                <label for="${f.id}" dir="auto">${f.label}</label>
                <input id="${f.id}" data-field="${f.id}" inputmode="decimal" placeholder="…" autocomplete="off">
                <div class="fb" id="fb-${f.id}"></div>
              </div>`).join("")}
          </div>
        </div>
      </section>`).join("")}
    <div id="examResultSlot"></div>
  `;
}

function startExamClock(view) {
  clearInterval(EXAM_TIMER);
  EXAM_TIMER = setInterval(() => {
    const left = examRemaining();
    const el = document.getElementById("clockVal");
    const wrap = document.getElementById("examClock");
    if (el) el.textContent = fmtClock(left);
    if (wrap) wrap.classList.toggle("low", left <= 10 * 60);
    if (left <= 0) {
      clearInterval(EXAM_TIMER);
      submitExam(document.getElementById("view"), true);
    }
  }, 1000);
}

function bindExamInputs(view) {
  view.querySelectorAll("[data-field]").forEach(inp => {
    inp.addEventListener("input", () => {
      EXAM_RUN.answers[inp.dataset.field] = inp.value;
      updateAnsweredCount();
    });
    inp.addEventListener("change", () => {
      EXAM_RUN.answers[inp.dataset.field] = inp.value;
      updateAnsweredCount();
    });
    const v = EXAM_RUN.answers[inp.dataset.field];
    if (v !== undefined && v !== "") inp.value = v;
  });
  updateAnsweredCount();
}

function updateAnsweredCount() {
  const total = EXAM.parts.reduce((s, p) => s + p.fields.length, 0);
  const filled = Object.values(EXAM_RUN.answers).filter(v => v !== "" && v !== undefined && v !== null).length;
  const el = document.getElementById("answeredNote");
  if (el) el.textContent = `أجبت عن ${filled} من ${total} حقول`;
}

function submitExam(view, auto) {
  if (!EXAM_RUN || EXAM_RUN.submitted) return;
  EXAM_RUN.submitted = true;
  EXAM_RUN.usedSeconds = EXAM.duration * 60 - examRemaining();
  clearInterval(EXAM_TIMER);

  let score = 0;
  EXAM.parts.forEach(p => {
    p.fields.forEach(f => {
      const raw = EXAM_RUN.answers[f.id];
      let ok = false;
      if (f.type === "choice") {
        ok = raw !== undefined && raw !== "" && Number(raw) === Number(f.ans);
      } else {
        const val = parseFloat(String(raw).replace(",", "."));
        ok = isFinite(val) && Math.abs(val - f.ans) <= f.tol;
      }
      f._ok = ok;
      if (ok) score += f.marks;
    });
  });
  EXAM_RUN.score = score;

  if (!state.examBest || score > state.examBest.score) {
    state.examBest = { score: score, total: EXAM.total, date: new Date().toISOString() };
    saveState();
  }

  renderExam(view);
}

function examResultHTML() {
  const s = EXAM_RUN.score;
  const pct = Math.round(s / EXAM.total * 100);
  const verdict = pct >= 90 ? "ممتاز — أنت جاهز." : pct >= 75 ? "جيد جداً — راجع الأخطاء وستصل للكامل." : pct >= 50 ? "مقبول — هناك فجوات واضحة تحتاج مراجعة." : "يحتاج مراجعة من الصفر للدروس الأربعة.";
  return `
    <div class="eyebrow">النتيجة</div>
    <h1>${EXAM.title}</h1>
    <div class="exam-result">
      <div class="score">${s} <small>/ ${EXAM.total} · ${pct}%</small></div>
      <p style="margin:.4rem 0 .2rem">${verdict}</p>
      <p class="exam-note">الوقت المستخدم: ${fmtClock(EXAM_RUN.usedSeconds || 0)} من ${EXAM.duration}:00. أفضل نتيجة محفوظة: ${state.examBest ? state.examBest.score : s}.</p>
      <div class="pill-row" style="margin-top:.8rem">
        <button class="btn" id="retryExam">أعد الامتحان</button>
        <a class="btn ghost" href="#/practice">راجع بنك الأسئلة</a>
      </div>
    </div>
    ${EXAM.parts.map(p => `
      <section class="exam-q">
        <div class="exam-q-head">
          <span class="badge a">${p.code}</span><b>${p.title}</b>
          <span style="flex:1"></span>
          <span class="badge ${p.fields.every(f => f._ok) ? "g" : "r"}">${p.fields.filter(f => f._ok).reduce((a, f) => a + f.marks, 0)} / ${p.marks}</span>
        </div>
        <div class="exam-q-body">
          <div class="q-text" dir="auto">${p.text}</div>
          <div class="tbl-wrap" style="margin-top:.8rem"><table class="tbl">
            <thead><tr><th>Answer</th><th>Your value</th><th>Correct</th><th>Marks</th></tr></thead>
            <tbody>${p.fields.map(f => {
              const raw = EXAM_RUN.answers[f.id];
              const shown = f.type === "choice" ? (raw !== undefined && raw !== "" ? f.options[Number(raw)] : "—") : (raw || "—");
              const trueVal = f.type === "choice" ? f.options[f.ans] : f.ans;
              return `<tr><td>${f.label}</td><td>${shown}</td><td class="hl">${trueVal}</td><td>${f._ok ? f.marks : 0}/${f.marks}</td></tr>`;
            }).join("")}</tbody>
          </table></div>
          <details class="acc" style="margin-top:.9rem"><summary>الحل الكامل</summary><div class="acc-body">${p.sol}</div></details>
          ${p.fields.some(f => f._ok) ? "" : `<div class="callout bad" style="margin-bottom:0"><span class="ct">لا شيء صحيح في هذا الجزء</span>أعد قراءة الدرس المرتبط قبل إعادة المحاولة.</div>`}
        </div>
      </section>`).join("")}
  `;
}

function bindExamResult(view) {
  const btn = view.querySelector("#retryExam");
  if (btn) btn.addEventListener("click", () => {
    EXAM_RUN = null;
    clearInterval(EXAM_TIMER);
    renderExam(view);
  });
}

/* ---------------- Flashcards ---------------- */
let cardIndex = 0;
let cardFlipped = false;

function renderCards(view) {
  cardIndex = Math.min(cardIndex, CARDS.length - 1);
  const known = CARDS.reduce((n, c, i) => n + (state.cards[i] ? 1 : 0), 0);
  const card = CARDS[cardIndex];
  view.innerHTML = `
    <div class="eyebrow">تذكّر سريع</div>
    <h1>البطاقات</h1>
    <p class="lead">اقرأ السؤال، حاول الإجابة ذهنياً، ثم اقلب البطاقة. علّم ما تعرفه لتقليل المراجعة لاحقاً.</p>
    <div class="flash-wrap">
      <div class="flashcard ${cardFlipped ? "flipped" : ""}" id="flashcard">
        <div class="flash-inner">
          <div class="flash-face">
            <span class="fl">السؤال ${cardIndex + 1} / ${CARDS.length}</span>
            <div class="fq">${card.q}</div>
            <span class="tiny dim">اضغط للقلب</span>
          </div>
          <div class="flash-face back">
            <span class="fl">الإجابة</span>
            <div class="fa">${fmtMath(card.a)}</div>
            <span class="tiny dim">${TOPIC_LABELS[card.t] || ""}</span>
          </div>
        </div>
      </div>
      <div class="flash-controls">
        <button class="btn ghost sm" id="cardPrev">السابق</button>
        <button class="btn soft sm" id="cardFlip">اقلب</button>
        <button class="btn ghost sm" id="cardNext">التالي</button>
      </div>
      <div class="flash-controls">
        <button class="btn ${state.cards[cardIndex] ? "" : "ghost"} sm" id="cardKnown">${state.cards[cardIndex] ? "✓ أعرفها" : "أعرفها"}</button>
        <button class="btn ghost sm" id="cardReview">أراجعها</button>
      </div>
      <div class="flash-meta">
        <span>تعرف ${known} من ${CARDS.length}</span>
        <span class="cards-done">${Math.round(known / CARDS.length * 100)}%</span>
      </div>
    </div>
  `;

  const flip = () => { cardFlipped = !cardFlipped; view.querySelector("#flashcard").classList.toggle("flipped", cardFlipped); };
  view.querySelector("#flashcard").addEventListener("click", flip);
  view.querySelector("#cardFlip").addEventListener("click", flip);
  const go = d => {
    cardIndex = (cardIndex + d + CARDS.length) % CARDS.length;
    cardFlipped = false;
    renderCards(view);
  };
  view.querySelector("#cardPrev").addEventListener("click", () => go(-1));
  view.querySelector("#cardNext").addEventListener("click", () => go(1));
  view.querySelector("#cardKnown").addEventListener("click", () => {
    state.cards[cardIndex] = true;
    saveState(); renderCards(view); renderSidebar();
  });
  view.querySelector("#cardReview").addEventListener("click", () => {
    state.cards[cardIndex] = false;
    saveState(); go(1); renderSidebar();
  });
}
