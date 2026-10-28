/* SaliksikPH: single-page app with hash routing and localStorage progress. */

(() => {
  const KEY = "saliksikph.v1";
  const main = document.getElementById("main");

  /* ---------- State ---------- */

  const defaults = () => ({
    level: null,
    project: { title: "", author: "", school: "", adviser: "", field: "" },
    checks: {},
    notes: {},
    outputs: {},
  });

  let state = load();

  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return { ...defaults(), ...JSON.parse(raw) };
    } catch (e) { /* storage unavailable */ }
    return defaults();
  }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
  }

  /* ---------- Helpers ---------- */

  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const level = () => LEVELS[state.level] || null;
  const stageById = (id) => STAGES.find((s) => s.id === id);
  const fmtDate = (d) => d.toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" });

  function stageItems(stage, lv) {
    const items = stage.common.map((text, i) => ({ id: `${stage.id}-c${i}`, text }));
    if (lv && stage.levels[lv]) {
      stage.levels[lv].checklist.forEach((text, i) => items.push({ id: `${stage.id}-${lv}${i}`, text, lv: true }));
    }
    return items;
  }

  function stageProgress(stage) {
    const items = stageItems(stage, state.level);
    const done = items.filter((x) => state.checks[x.id]).length;
    return { done, total: items.length, pct: items.length ? Math.round((done / items.length) * 100) : 0 };
  }

  function toast(msg) {
    const t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 1800);
  }

  function download(name, text, type = "text/markdown") {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      toast("Copied to clipboard");
    } catch (e) {
      toast("Copy failed. Select the text and copy manually.");
    }
  }

  function levelPicker(compact) {
    return `<div class="grid grid-4">${Object.values(LEVELS).map((l) => `
      <button class="card ${state.level === l.id ? "selected" : ""}" data-action="set-level" data-level="${l.id}" aria-pressed="${state.level === l.id}">
        <span class="tag">${esc(l.badge)}</span>
        <h3>${esc(l.name)}</h3>
        ${compact ? "" : `<p class="small muted">${esc(l.output)}</p>`}
      </button>`).join("")}</div>`;
  }

  function renderLevelPill() {
    const el = document.getElementById("levelPill");
    const l = level();
    el.innerHTML = l
      ? `<button data-action="change-level" title="Change level">🎓 ${esc(l.short)} ▾</button>`
      : `<button class="btn-primary" data-action="change-level">Choose your level</button>`;
  }

  function pipeline(currentId) {
    return `<div class="pipeline">${STAGES.map((s) => {
      const p = stageProgress(s);
      return `<a class="pipe ${s.id === currentId ? "current" : ""}" href="#/stage/${s.id}">
        <span class="num">Step ${s.num}</span>
        <span class="t">${s.icon} ${esc(s.title)}</span>
        <span class="bar" aria-label="${p.pct}% complete"><i style="width:${p.pct}%"></i></span>
      </a>`;
    }).join("")}</div>`;
  }

  /* ---------- Views ---------- */

  function viewHome() {
    const l = level();
    return `
      <section class="hero">
        <div class="flag-bar"></div>
        <h1>Your research, from idea to impact.</h1>
        <p>SaliksikPH guides Filipino students step by step to <b>write</b>, <b>implement</b>, <b>analyze</b>, <b>present</b>, <b>publish</b>, and <b>convert</b> research into policy briefs, startups, new technologies, and community programs.</p>
      </section>

      <h2>1. Choose your level</h2>
      ${levelPicker(false)}
      ${l ? `<div class="card" style="margin-top:16px">
        <h3>${esc(l.name)} research</h3>
        <p>${esc(l.summary)}</p>
        <p class="small"><b>Typical output:</b> ${esc(l.output)} · <b>Usual duration:</b> ${esc(l.duration)}</p>
        <h3>What your panel expects</h3>
        <ul>${l.expectations.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
        <p class="note">${esc(l.note)}</p>
      </div>` : ""}

      <h2>2. Follow the six steps</h2>
      <p class="muted">Each step has a checklist tailored to your level. Your progress is saved automatically in this browser.</p>
      ${pipeline()}
      <div class="grid grid-3">${STAGES.map((s) => `
        <a class="card" href="#/stage/${s.id}">
          <div class="icon">${s.icon}</div>
          <h3>${s.num}. ${esc(s.title)}</h3>
          <p class="small muted">${esc(s.subtitle)}</p>
        </a>`).join("")}</div>

      <h2>3. Use the tools</h2>
      <div class="grid grid-3">
        ${TOOL_LIST.map((t) => `<a class="card" href="#/tools/${t.id}"><div class="icon">${t.icon}</div><h3>${esc(t.name)}</h3><p class="small muted">${esc(t.desc)}</p></a>`).join("")}
        <a class="card" href="#/convert"><div class="icon">🔁</div><h3>Output Converter</h3><p class="small muted">Turn findings into a policy brief, startup canvas, IP plan, extension program, module, or media piece.</p></a>
      </div>
      <h2>Compare the levels</h2>
      ${levelsTable()}
    `;
  }

  function levelsTable() {
    const ls = Object.values(LEVELS);
    const row = (label, fn) => `<tr><th scope="row">${label}</th>${ls.map((l) => `<td>${fn(l)}</td>`).join("")}</tr>`;
    return `<div class="table-wrap"><table>
      <thead><tr><th></th>${ls.map((l) => `<th scope="col">${esc(l.name)}</th>`).join("")}</tr></thead>
      <tbody>
        ${row("Output", (l) => esc(l.output))}
        ${row("Duration", (l) => esc(l.duration))}
        ${STAGES.map((s) => row(`${s.icon} ${esc(s.title)}`, (l) => esc(s.levels[l.id].focus))).join("")}
      </tbody></table></div>`;
  }

  function viewStage(id) {
    const s = stageById(id) || STAGES[0];
    const lv = state.level;
    const g = lv ? s.levels[lv] : null;
    const items = stageItems(s, lv);
    const p = stageProgress(s);
    const idx = STAGES.indexOf(s);
    const prev = STAGES[idx - 1];
    const next = STAGES[idx + 1];
    const checklist = (list) => `<ul class="checklist">${list.map((it) => `
      <li class="${state.checks[it.id] ? "done" : ""}">
        <input type="checkbox" id="ck-${it.id}" data-action="check" data-id="${it.id}" ${state.checks[it.id] ? "checked" : ""}>
        <label for="ck-${it.id}">${esc(it.text)}</label>
      </li>`).join("")}</ul>`;

    return `
      ${pipeline(s.id)}
      <div class="stage-head">
        <div class="icon" aria-hidden="true">${s.icon}</div>
        <div>
          <p class="muted small" style="margin:0">Step ${s.num} of ${STAGES.length}</p>
          <h1>${esc(s.title)}: ${esc(s.subtitle)}</h1>
        </div>
      </div>
      <p>${esc(s.summary)}</p>

      ${g ? `<div class="focus"><b>For ${esc(LEVELS[lv].name)} students:</b> ${esc(g.focus)}</div>`
        : `<div class="card"><h3>Choose your level to see tailored guidance</h3>${levelPicker(true)}</div>`}

      <div class="grid grid-2" style="margin-top:16px">
        <div class="card">
          <h2 style="margin-top:0">Checklist</h2>
          <div class="progress" aria-label="${p.pct}% complete"><i style="width:${p.pct}%"></i></div>
          <p class="small muted">${p.done} of ${p.total} done</p>
          <h3>For all levels</h3>
          ${checklist(items.filter((x) => !x.lv))}
          ${g ? `<h3 style="margin-top:16px">For ${esc(LEVELS[lv].name)}</h3>${checklist(items.filter((x) => x.lv))}` : ""}
        </div>
        <div>
          ${g ? `<div class="card">
            <h2 style="margin-top:0">Tips</h2>
            <ul>${g.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
            <h3>Expected outputs</h3>
            <p>${g.outputs.map((o) => `<span class="tag">${esc(o)}</span>`).join(" ")}</p>
          </div>` : ""}
          <div class="card">
            <h2 style="margin-top:0">Common pitfalls</h2>
            <ul class="pitfalls">${s.pitfalls.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          </div>
          <div class="card">
            <h2 style="margin-top:0">Related tools</h2>
            <div class="btn-row">${relatedTools(s.id)}</div>
          </div>
        </div>
      </div>

      <div class="card" style="margin-top:16px">
        <label for="notes">My notes for this step</label>
        <textarea id="notes" data-action="notes" data-id="${s.id}" placeholder="Adviser comments, deadlines, ideas...">${esc(state.notes[s.id] || "")}</textarea>
        <p class="small muted">Saved automatically.</p>
      </div>

      <div class="stage-nav">
        ${prev ? `<a class="btn" href="#/stage/${prev.id}">← ${esc(prev.title)}</a>` : "<span></span>"}
        ${next ? `<a class="btn btn-primary" href="#/stage/${next.id}">Next: ${esc(next.title)} →</a>` : `<a class="btn btn-primary" href="#/convert">Open the Output Converter →</a>`}
      </div>`;
  }

  function relatedTools(stageId) {
    const map = {
      write: ["title", "timeline"],
      implement: ["sample", "likert"],
      analyze: ["analysis", "likert"],
      present: ["timeline"],
      publish: [],
      utilize: [],
    };
    const links = (map[stageId] || []).map((id) => {
      const t = TOOL_LIST.find((x) => x.id === id);
      return `<a class="btn" href="#/tools/${t.id}">${t.icon} ${esc(t.name)}</a>`;
    });
    if (stageId === "publish") links.push(`<a class="btn" href="#/resources">📚 Journals & resources</a>`);
    if (stageId === "utilize" || stageId === "publish") links.push(`<a class="btn" href="#/convert">🔁 Output Converter</a>`);
    return links.join("");
  }

  /* ---------- Tools ---------- */

  const TOOL_LIST = [
    { id: "title", name: "Title & SOP Builder", icon: "🏷️", desc: "Generate research titles, a general objective, statement of the problem, and null hypotheses." },
    { id: "analysis", name: "Analysis Helper", icon: "🧮", desc: "Answer a few questions and get the right statistical test or qualitative method." },
    { id: "sample", name: "Sample Size Calculator", icon: "👥", desc: "Slovin's and Cochran's formulas with stratified proportional allocation." },
    { id: "likert", name: "Likert Scale Interpreter", icon: "📏", desc: "Build interpretation ranges for 4- to 7-point scales and interpret weighted means." },
    { id: "timeline", name: "Research Timeline", icon: "🗓️", desc: "Plan your deadlines from today to your final defense and beyond." },
  ];

  function viewTools() {
    return `<h1>Research tools</h1>
      <p class="muted">Quick helpers for the most common tasks in Philippine research classes and graduate schools.</p>
      <div class="grid grid-3">${TOOL_LIST.map((t) => `<a class="card" href="#/tools/${t.id}"><div class="icon">${t.icon}</div><h3>${esc(t.name)}</h3><p class="small muted">${esc(t.desc)}</p></a>`).join("")}</div>`;
  }

  function toolShell(id, body) {
    const t = TOOL_LIST.find((x) => x.id === id);
    return `<p><a href="#/tools">← All tools</a></p><h1>${t.icon} ${esc(t.name)}</h1><p class="muted">${esc(t.desc)}</p>${body}`;
  }

  function viewTitle() {
    return toolShell("title", `
      <div class="card">
        <label for="t-design">Research design</label>
        <select id="t-design">
          <option value="correlational">Descriptive-correlational (quantitative)</option>
          <option value="comparative">Descriptive-comparative (quantitative)</option>
          <option value="experimental">Experimental / quasi-experimental</option>
          <option value="qualitative">Qualitative (phenomenology, case study)</option>
          <option value="developmental">Developmental / capstone (product, system, material)</option>
        </select>
        <div class="grid grid-2">
          <div><label for="t-iv">Independent variable / intervention / product</label><input type="text" id="t-iv" placeholder="Study Habits"></div>
          <div><label for="t-dv">Dependent variable / phenomenon / problem</label><input type="text" id="t-dv" placeholder="Academic Performance in Mathematics"></div>
          <div><label for="t-pop">Participants</label><input type="text" id="t-pop" placeholder="Grade 11 STEM Students"></div>
          <div><label for="t-loc">Locale</label><input type="text" id="t-loc" placeholder="a Public Secondary School in Sogod, Southern Leyte"></div>
          <div><label for="t-year">School year (optional)</label><input type="text" id="t-year" placeholder="S.Y. 2026–2027"></div>
          <div><label for="t-profile">Profile variables (comma-separated)</label><input type="text" id="t-profile" placeholder="age, sex, strand, monthly family income"></div>
        </div>
        <div class="btn-row"><button class="btn-primary" data-action="build-title">Generate</button></div>
      </div>
      <div id="title-out"></div>`);
  }

  function renderTitleOut() {
    const v = (id) => document.getElementById(id).value.trim();
    const r = Tools.buildTitle({ design: v("t-design"), iv: v("t-iv"), dv: v("t-dv"), population: v("t-pop"), locale: v("t-loc"), year: v("t-year"), profile: v("t-profile") });
    const text = [
      "POSSIBLE TITLES", ...r.titles.map((t, i) => `${i + 1}. ${t}`), "",
      "STATEMENT OF THE PROBLEM", r.general, "Specifically, it seeks to answer the following questions:",
      ...r.sop.map((q, i) => `${i + 1}. ${q}`), "",
      ...(r.hyp.length ? ["HYPOTHESIS (tested at 0.05 level of significance)", ...r.hyp.map((h, i) => `Ho${i + 1}: ${h}`)] : []),
    ].join("\n");
    document.getElementById("title-out").innerHTML = `
      <div class="result">
        <h3>Draft</h3>
        <pre class="doc">${esc(text)}</pre>
        <div class="btn-row"><button data-action="copy-pre">Copy</button>
        <button data-action="use-title" data-title="${esc(r.titles[0])}">Use title 1 in My Project</button></div>
        <p class="small muted">These are starting drafts. Refine the wording with your adviser and make sure every question can be answered by your method.</p>
      </div>`;
  }

  const wiz = { goal: null, outcome: null, groups: null, design: null, normal: null, qual: null };

  function viewAnalysis() {
    const q = (key, label, opts) => `<div class="wizard-q"><b>${label}</b><div class="choices">${opts.map(([v, t]) =>
      `<button class="${wiz[key] === v ? "on" : ""}" data-action="wiz" data-k="${key}" data-v="${v}" aria-pressed="${wiz[key] === v}">${esc(t)}</button>`).join("")}</div></div>`;
    let body = q("goal", "What do you want to do?", [["describe", "Describe data"], ["compare", "Compare groups"], ["relate", "Find a relationship"], ["predict", "Predict an outcome"], ["qualitative", "Analyze interviews / text"]]);
    if (wiz.goal === "qualitative") {
      body += q("qual", "Which qualitative approach?", [["general", "General / not sure"], ["phenomenology", "Lived experiences (phenomenology)"], ["case", "Case study"], ["grounded", "Build a theory (grounded theory)"]]);
    } else if (wiz.goal) {
      body += q("outcome", wiz.goal === "relate" ? "What type are your variables?" : "What type is your outcome variable?",
        [["numeric", "Numeric (scores, grades, income)"], ["ordinal", "Ordinal / Likert"], ["categorical", "Categorical (yes/no, groups)"]]);
      if (wiz.goal === "compare") {
        body += q("groups", "How many groups or measurements?", [["2", "Two"], ["3+", "Three or more"]]);
        body += q("design", "Are the groups independent or the same people measured again?", [["independent", "Different people (independent)"], ["paired", "Same people (pretest/posttest)"]]);
      }
      if (wiz.goal !== "describe" && wiz.outcome === "numeric" && wiz.goal !== "predict") {
        body += q("normal", "Is the data normally distributed? (check with Shapiro–Wilk)", [["yes", "Yes"], ["no", "No"], ["unsure", "Not sure yet"]]);
      }
    }
    const ready = wiz.goal && (wiz.goal === "qualitative" || (wiz.outcome && (wiz.goal !== "compare" || (wiz.groups && wiz.design))));
    let out = "";
    if (ready) {
      const r = Tools.recommendStat(wiz);
      const lv = state.level;
      const levelNote = {
        shs: "For SHS, your teacher may accept descriptive statistics plus one simple test. Use Excel, Google Sheets, or JASP, and have your computations checked.",
        ug: "Report assumption checks in Chapter 3 or 4 and have a statistician review your results.",
        ms: "Report assumption checks, effect sizes, and confidence intervals. Keep your syntax or analysis file.",
        phd: "Justify the method against alternatives, run robustness checks, and consider advanced models (SEM, multilevel) if your design calls for them.",
      }[lv];
      out = `<div class="result" aria-live="polite">
        <h3>Recommended: ${esc(r.test)}</h3>
        <p>${esc(r.why)}</p>
        <p><b>Alternative:</b> ${esc(r.alt)}</p>
        <p><b>How to report:</b> ${esc(r.report)}</p>
        ${wiz.normal === "unsure" ? `<p class="note">Run a Shapiro–Wilk test (or check a Q–Q plot) first. If p &lt; .05, the data are not normal: use the non-parametric alternative.</p>` : ""}
        ${levelNote ? `<p class="note">${esc(levelNote)}</p>` : ""}
      </div>`;
    }
    return toolShell("analysis", `<div class="card">${body}<div class="btn-row"><button data-action="wiz-reset">Start over</button></div></div>${out}`);
  }

  function viewSample() {
    return toolShell("sample", `
      <div class="card">
        <div class="grid grid-2">
          <div><label for="s-N">Population size (N)</label><input type="number" id="s-N" min="1" placeholder="1200"></div>
          <div><label for="s-e">Margin of error</label>
            <select id="s-e"><option value="0.05">5% (0.05)</option><option value="0.03">3% (0.03)</option><option value="0.1">10% (0.10)</option></select></div>
          <div><label for="s-z">Confidence level (for Cochran)</label>
            <select id="s-z"><option value="1.96">95%</option><option value="2.576">99%</option><option value="1.645">90%</option></select></div>
          <div><label for="s-strata">Strata for proportional allocation (optional, one per line: name, size)</label>
            <textarea id="s-strata" placeholder="Grade 11 STEM, 300&#10;Grade 11 ABM, 200&#10;Grade 11 HUMSS, 250"></textarea></div>
        </div>
        <div class="btn-row"><button class="btn-primary" data-action="calc-sample">Compute</button></div>
      </div>
      <div id="sample-out"></div>
      <div class="card">
        <h3>About Slovin's formula</h3>
        <p class="small">Slovin's formula, n = N / (1 + Ne²), is widely taught in the Philippines, but it ignores the expected variability and confidence level. Many graduate panels prefer Cochran's formula or a power analysis (G*Power), which accounts for effect size, α, and power. Use what your panel requires and justify it in Chapter 3.</p>
      </div>`);
  }

  function renderSampleOut() {
    const N = parseFloat(document.getElementById("s-N").value);
    const e = parseFloat(document.getElementById("s-e").value);
    const z = parseFloat(document.getElementById("s-z").value);
    const out = document.getElementById("sample-out");
    if (!(N > 0)) { out.innerHTML = `<div class="result">Enter the population size.</div>`; return; }
    const sl = Tools.slovin(N, e);
    const co = Tools.cochran(N, e, z);
    const strata = document.getElementById("s-strata").value.split(/\n+/).map((l) => {
      const m = l.split(",");
      return m.length >= 2 ? { name: m.slice(0, -1).join(",").trim(), size: parseFloat(m[m.length - 1]) || 0 } : null;
    }).filter(Boolean);
    const table = (n) => strata.length ? `<div class="table-wrap"><table><thead><tr><th>Stratum</th><th>Population</th><th>Sample</th></tr></thead><tbody>
      ${Tools.allocate(strata, n).map((s) => `<tr><td>${esc(s.name)}</td><td>${s.size}</td><td>${s.n}</td></tr>`).join("")}</tbody></table></div>` : "";
    out.innerHTML = `<div class="result" aria-live="polite">
      <div class="grid grid-2">
        <div><h3>Slovin's formula</h3><p style="font-size:2rem;margin:0"><b>${sl}</b></p><p class="small">n = ${N} / (1 + ${N} × ${e}²)</p>${table(sl)}</div>
        <div><h3>Cochran's formula (with finite population correction)</h3><p style="font-size:2rem;margin:0"><b>${co}</b></p><p class="small">z = ${z}, p = 0.5, e = ${e}</p>${table(co)}</div>
      </div>
      <p class="small muted">Add 10–20% to allow for non-response. Rounding in allocation may make the strata total differ by 1–2.</p>
    </div>`;
  }

  function viewLikert() {
    return toolShell("likert", `
      <div class="card">
        <div class="grid grid-2">
          <div><label for="l-k">Number of scale points</label>
            <select id="l-k"><option>4</option><option selected>5</option><option>6</option><option>7</option></select></div>
          <div><label for="l-labels">Verbal labels, lowest to highest (optional, comma-separated)</label>
            <input type="text" id="l-labels" placeholder="Never, Rarely, Sometimes, Often, Always"></div>
          <div><label for="l-mean">Weighted mean to interpret (optional)</label><input type="number" step="0.01" id="l-mean" placeholder="3.87"></div>
        </div>
        <div class="btn-row"><button class="btn-primary" data-action="calc-likert">Build table</button></div>
      </div>
      <div id="likert-out"></div>`);
  }

  function renderLikertOut() {
    const k = parseInt(document.getElementById("l-k").value, 10);
    const labels = document.getElementById("l-labels").value.split(",").map((x) => x.trim()).filter(Boolean);
    const mean = parseFloat(document.getElementById("l-mean").value);
    const rows = Tools.likertRanges(k, labels);
    const hit = isNaN(mean) ? null : Tools.interpretMean(mean, k, labels);
    const out = document.getElementById("likert-out");
    if (labels.length && labels.length !== k) {
      out.innerHTML = `<div class="result">You entered ${labels.length} labels for a ${k}-point scale; default labels are used instead.</div>`;
    } else out.innerHTML = "";
    out.innerHTML += `<div class="result" aria-live="polite">
      <div class="table-wrap"><table><thead><tr><th>Scale</th><th>Mean range</th><th>Verbal interpretation</th></tr></thead><tbody>
      ${rows.map((r) => `<tr ${hit && hit.scale === r.scale ? 'style="font-weight:700"' : ""}><td>${r.scale}</td><td>${r.from} – ${r.to}</td><td>${esc(r.label)}</td></tr>`).join("")}
      </tbody></table></div>
      ${hit ? `<p style="margin-top:12px">A weighted mean of <b>${mean.toFixed(2)}</b> is interpreted as <b>${esc(hit.label)}</b>.</p>` : ""}
      ${!isNaN(mean) && !hit ? `<p style="margin-top:12px">The mean must be between 1 and ${k}.</p>` : ""}
      <p class="small muted">Interval width = (highest − lowest) / number of points = ${((k - 1) / k).toFixed(2)}.</p>
    </div>`;
  }

  function viewTimeline() {
    const today = new Date().toISOString().slice(0, 10);
    return toolShell("timeline", `
      <div class="card">
        ${state.level ? `<p>Level: <b>${esc(level().name)}</b></p>` : `<p class="note">Choose your level first for a better plan.</p>${levelPicker(true)}`}
        <div class="grid grid-2">
          <div><label for="tl-start">Start date</label><input type="date" id="tl-start" value="${state.project.start || today}"></div>
          <div><label for="tl-def">Target final defense</label><input type="date" id="tl-def" value="${state.project.defense || ""}"></div>
        </div>
        <div class="btn-row"><button class="btn-primary" data-action="calc-timeline">Build timeline</button></div>
      </div>
      <div id="timeline-out"></div>`);
  }

  function renderTimelineOut() {
    const s = document.getElementById("tl-start").value;
    const d = document.getElementById("tl-def").value;
    state.project.start = s;
    state.project.defense = d;
    save();
    const rows = Tools.buildTimeline(state.level || "ug", s, d);
    const out = document.getElementById("timeline-out");
    if (!rows) { out.innerHTML = `<div class="result">Enter a start date and a later final defense date.</div>`; return; }
    out.innerHTML = `<div class="result" aria-live="polite"><div class="table-wrap"><table>
      <thead><tr><th>Step</th><th>From</th><th>To</th><th>Key deliverables</th></tr></thead><tbody>
      ${rows.map((r) => {
        const st = stageById(r.stage);
        const g = st.levels[state.level || "ug"];
        return `<tr><td>${st.icon} ${esc(st.title)}</td><td>${fmtDate(r.start)}</td><td>${fmtDate(r.end)}</td><td>${g.outputs.map(esc).join("; ")}</td></tr>`;
      }).join("")}</tbody></table></div>
      <p class="small muted">Publish and Utilize continue after your defense. Adjust for school breaks, typhoon season, and your adviser's availability.</p>
      <div class="btn-row"><button data-action="print">Print</button></div></div>`;
  }

  /* ---------- Output converter ---------- */

  function viewConvert() {
    const lv = state.level;
    return `<h1>🔁 Output Converter</h1>
      <p class="muted">Research is most valuable when it is used. Pick a pathway, fill in the template from your findings, and download a ready-to-edit draft.</p>
      <div class="grid grid-3">${OUTPUTS.map((o) => {
        const fit = !lv || o.levels.includes(lv);
        return `<a class="card" href="#/convert/${o.id}" ${fit ? "" : 'style="opacity:.7"'}>
          <div class="icon">${o.icon}</div><h3>${esc(o.name)}</h3><p class="small muted">${esc(o.desc)}</p>
          ${fit ? "" : `<span class="tag">Usually for higher levels</span>`}</a>`;
      }).join("")}</div>
      <div class="card" style="margin-top:16px"><h3>Which pathway fits your study?</h3><div class="table-wrap"><table>
        <thead><tr><th>If your study...</th><th>Consider</th></tr></thead><tbody>
          <tr><td>found a problem that an office, school, or LGU can act on</td><td>Policy Brief</td></tr>
          <tr><td>produced a product, service, app, or business idea people would pay for</td><td>Startup / Business</td></tr>
          <tr><td>created a new device, process, formulation, or software</td><td>New Technology / IP (protect before presenting publicly)</td></tr>
          <tr><td>identified a community need you can help address</td><td>Community Extension Program</td></tr>
          <tr><td>found effective teaching or training strategies</td><td>Learning Resource / Training Module</td></tr>
          <tr><td>has findings the public should know</td><td>Popular Media / Advocacy</td></tr>
        </tbody></table></div></div>`;
  }

  function viewConvertForm(id) {
    const o = OUTPUTS.find((x) => x.id === id);
    if (!o) return viewConvert();
    const vals = state.outputs[id] || {};
    const field = (f) => {
      const v = vals[f.id] || "";
      if (f.select) return `<label for="o-${f.id}">${esc(f.label)}</label><select id="o-${f.id}" data-action="ofield" data-o="${id}" data-f="${f.id}"><option value="">Select...</option>${f.select.map((x) => `<option ${v === x ? "selected" : ""}>${esc(x)}</option>`).join("")}</select>`;
      if (f.area) return `<label for="o-${f.id}">${esc(f.label)}</label><textarea id="o-${f.id}" data-action="ofield" data-o="${id}" data-f="${f.id}" placeholder="${esc(f.ph || "")}">${esc(v)}</textarea>`;
      return `<label for="o-${f.id}">${esc(f.label)}</label><input type="text" id="o-${f.id}" data-action="ofield" data-o="${id}" data-f="${f.id}" placeholder="${esc(f.ph || "")}" value="${esc(v)}">`;
    };
    return `<p><a href="#/convert">← All pathways</a></p>
      <h1>${o.icon} ${esc(o.name)}</h1>
      <p>${esc(o.desc)}</p>
      <div class="grid grid-2">
        <div class="card">
          ${o.audience ? `<label for="o-aud">Target audience</label><select id="o-aud" data-action="ofield" data-o="${id}" data-f="_audience"><option value="">Select...</option>${o.audience.map((a) => `<option ${vals._audience === a ? "selected" : ""}>${esc(a)}</option>`).join("")}</select>` : ""}
          ${o.fields.map(field).join("")}
          <p class="small muted">Saved automatically.</p>
        </div>
        <div>
          <div class="card">
            <h2 style="margin-top:0">Steps to make it happen</h2>
            <ol>${o.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
          </div>
          <div class="card">
            <h2 style="margin-top:0">Preview</h2>
            <pre class="doc" id="o-preview"></pre>
            <div class="btn-row">
              <button data-action="copy-pre">Copy</button>
              <button class="btn-primary" data-action="download-output" data-o="${id}">Download (.md)</button>
              <button data-action="print">Print</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  function outputMarkdown(id) {
    const o = OUTPUTS.find((x) => x.id === id);
    const vals = state.outputs[id] || {};
    return Tools.outputToMarkdown(o, vals, { author: state.project.author, study: state.project.title, audience: vals._audience });
  }

  function updatePreview(id) {
    const el = document.getElementById("o-preview");
    if (el) el.textContent = outputMarkdown(id);
  }

  /* ---------- My Project ---------- */

  function viewProject() {
    const p = state.project;
    const total = STAGES.reduce((acc, s) => { const x = stageProgress(s); acc.d += x.done; acc.t += x.total; return acc; }, { d: 0, t: 0 });
    const pct = total.t ? Math.round((total.d / total.t) * 100) : 0;
    const f = (id, label, ph) => `<div><label for="p-${id}">${label}</label><input type="text" id="p-${id}" data-action="pfield" data-f="${id}" value="${esc(p[id] || "")}" placeholder="${esc(ph)}"></div>`;
    return `<h1>📁 My Project</h1>
      <div class="card">
        <div class="grid grid-2">
          ${f("title", "Research title", "Your working title")}
          ${f("author", "Researcher(s)", "Juan Dela Cruz, Maria Santos")}
          ${f("school", "School / university", "Name of your school or university")}
          ${f("adviser", "Adviser", "Dr. ...")}
          ${f("field", "Program / strand / discipline", "BSEd Mathematics")}
        </div>
        <label>Level</label>
        ${levelPicker(true)}
      </div>
      <div class="card">
        <h2 style="margin-top:0">Progress: ${pct}%</h2>
        <div class="progress"><i style="width:${pct}%"></i></div>
        <div class="table-wrap" style="margin-top:12px"><table>
          <thead><tr><th>Step</th><th>Done</th><th>Progress</th></tr></thead><tbody>
          ${STAGES.map((s) => { const x = stageProgress(s); return `<tr><td><a href="#/stage/${s.id}">${s.icon} ${esc(s.title)}</a></td><td>${x.done}/${x.total}</td><td style="min-width:120px"><div class="progress"><i style="width:${x.pct}%"></i></div></td></tr>`; }).join("")}
          </tbody></table></div>
      </div>
      <div class="card no-print">
        <h2 style="margin-top:0">Backup & sharing</h2>
        <p class="small muted">Progress is stored only in this browser. Export a backup to move it to another device or share it with your adviser.</p>
        <div class="btn-row">
          <button data-action="export-md">Download summary (.md)</button>
          <button data-action="export-json">Export backup (.json)</button>
          <label class="btn" style="margin:0;font-weight:400">Import backup<input type="file" accept="application/json,.json" data-action="import-json" hidden></label>
          <button data-action="print">Print</button>
          <button data-action="reset" style="color:var(--accent)">Reset everything</button>
        </div>
      </div>`;
  }

  function projectSummary() {
    const p = state.project;
    const lines = [`# ${p.title || "Untitled research"}`, "",
      `- Researcher(s): ${p.author || "-"}`, `- School: ${p.school || "-"}`, `- Adviser: ${p.adviser || "-"}`,
      `- Program/strand: ${p.field || "-"}`, `- Level: ${level() ? level().name : "-"}`, ""];
    for (const s of STAGES) {
      const x = stageProgress(s);
      lines.push(`## ${s.num}. ${s.title} (${x.done}/${x.total})`);
      stageItems(s, state.level).forEach((it) => lines.push(`- [${state.checks[it.id] ? "x" : " "}] ${it.text}`));
      if (state.notes[s.id]) lines.push("", `**Notes:** ${state.notes[s.id]}`);
      lines.push("");
    }
    return lines.join("\n");
  }

  /* ---------- Resources ---------- */

  function viewResources() {
    return `<h1>📚 Philippine research resources</h1>
      <p class="muted">Agencies, laws, and free tools commonly used by Filipino researchers. Policies change, so always check the latest issuance on the official site.</p>
      ${RESOURCES.map((g) => `<h2>${esc(g.group)}</h2><div class="grid grid-2">${g.items.map((r) => `
        <div class="card"><h3><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.name)} ↗</a></h3><p class="small muted" style="margin:0">${esc(r.desc)}</p></div>`).join("")}</div>`).join("")}
      <h2>Key Philippine laws for researchers</h2>
      <div class="table-wrap"><table><thead><tr><th>Law</th><th>Why it matters</th></tr></thead><tbody>
        <tr><td>RA 10173, Data Privacy Act of 2012</td><td>How you collect, store, and share personal data of respondents</td></tr>
        <tr><td>RA 8371, Indigenous Peoples' Rights Act</td><td>FPIC for research involving Indigenous Cultural Communities</td></tr>
        <tr><td>RA 8293, Intellectual Property Code</td><td>Patents, utility models, industrial designs, copyright</td></tr>
        <tr><td>RA 10055, Philippine Technology Transfer Act of 2009</td><td>Ownership and commercialization of IP from government-funded R&D</td></tr>
        <tr><td>RA 11337, Innovative Startup Act</td><td>Government support programs for startups</td></tr>
        <tr><td>RA 11293, Philippine Innovation Act</td><td>National innovation agenda and support for innovators and MSMEs</td></tr>
      </tbody></table></div>`;
  }

  /* ---------- Router ---------- */

  function route() {
    const parts = (location.hash.replace(/^#\/?/, "") || "").split("/");
    const [a, b] = parts;
    let html;
    let nav = "home";
    switch (a) {
      case "stage": html = viewStage(b); nav = "stage"; break;
      case "tools":
        nav = "tools";
        html = { title: viewTitle, analysis: viewAnalysis, sample: viewSample, likert: viewLikert, timeline: viewTimeline }[b]?.() || viewTools();
        break;
      case "convert": html = b ? viewConvertForm(b) : viewConvert(); nav = "convert"; break;
      case "project": html = viewProject(); nav = "project"; break;
      case "resources": html = viewResources(); nav = "resources"; break;
      default: html = viewHome();
    }
    main.innerHTML = html;
    document.querySelectorAll("[data-nav]").forEach((x) => x.classList.toggle("active", x.dataset.nav === nav));
    document.getElementById("nav").classList.remove("open");
    document.getElementById("menuBtn").setAttribute("aria-expanded", "false");
    renderLevelPill();
    if (a === "convert" && b) updatePreview(b);
  }

  function rerender() {
    const y = window.scrollY;
    route();
    window.scrollTo(0, y);
  }

  window.addEventListener("hashchange", () => { route(); window.scrollTo(0, 0); main.focus({ preventScroll: true }); });

  /* ---------- Events ---------- */

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-action]");
    if (!t) return;
    const act = t.dataset.action;
    switch (act) {
      case "set-level": state.level = t.dataset.level; save(); rerender(); break;
      case "change-level": location.hash = "#/"; setTimeout(() => main.querySelector(".grid-4 button")?.focus(), 0); break;
      case "wiz": {
        const k = t.dataset.k;
        wiz[k] = t.dataset.v;
        if (k === "goal") Object.assign(wiz, { outcome: null, groups: null, design: null, normal: null, qual: null });
        rerender();
        break;
      }
      case "wiz-reset": Object.keys(wiz).forEach((k) => (wiz[k] = null)); rerender(); break;
      case "build-title": renderTitleOut(); break;
      case "use-title": state.project.title = t.dataset.title; save(); toast("Saved to My Project"); break;
      case "calc-sample": renderSampleOut(); break;
      case "calc-likert": renderLikertOut(); break;
      case "calc-timeline": renderTimelineOut(); break;
      case "copy-pre": copy(t.closest(".result, .card").querySelector("pre").textContent); break;
      case "download-output": download(`${t.dataset.o}-draft.md`, outputMarkdown(t.dataset.o)); break;
      case "print": window.print(); break;
      case "export-md": download("my-research-progress.md", projectSummary()); break;
      case "export-json": download("saliksikph-backup.json", JSON.stringify(state, null, 2), "application/json"); break;
      case "reset":
        if (confirm("Delete all your progress, notes, and drafts in this browser?")) { state = defaults(); save(); rerender(); }
        break;
    }
  });

  document.addEventListener("change", (e) => {
    const t = e.target;
    const act = t.dataset && t.dataset.action;
    if (act === "check") {
      state.checks[t.dataset.id] = t.checked;
      if (!t.checked) delete state.checks[t.dataset.id];
      save();
      rerender();
    } else if (act === "import-json") {
      const file = t.files[0];
      if (!file) return;
      file.text().then((txt) => {
        const data = JSON.parse(txt);
        if (typeof data !== "object" || !data.checks) throw new Error("bad file");
        state = { ...defaults(), ...data };
        save();
        rerender();
        toast("Backup imported");
      }).catch(() => toast("That file is not a SaliksikPH backup."));
    } else if (act === "ofield" && t.tagName === "SELECT") {
      setOutputField(t);
    }
  });

  document.addEventListener("input", (e) => {
    const t = e.target;
    const act = t.dataset && t.dataset.action;
    if (act === "notes") { state.notes[t.dataset.id] = t.value; save(); }
    else if (act === "pfield") { state.project[t.dataset.f] = t.value; save(); }
    else if (act === "ofield") setOutputField(t);
  });

  function setOutputField(t) {
    const o = t.dataset.o;
    state.outputs[o] = state.outputs[o] || {};
    state.outputs[o][t.dataset.f] = t.value;
    save();
    updatePreview(o);
  }

  document.getElementById("menuBtn").addEventListener("click", (e) => {
    const nav = document.getElementById("nav");
    const open = nav.classList.toggle("open");
    e.currentTarget.setAttribute("aria-expanded", String(open));
  });

  route();
})();
