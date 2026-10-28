/*
 * Pure helper functions for the SaliksikPH tools. No DOM access here,
 * so they can be tested in Node (see tests/tools.test.js).
 */

const Tools = (() => {
  /* ---------- Statistical test chooser ---------- */

  // a = { goal, outcome, groups, design, normal, qual }
  function recommendStat(a) {
    const nonNormal = a.normal === "no" || a.outcome === "ordinal";
    if (a.goal === "describe") {
      if (a.outcome === "categorical") {
        return rec("Frequency and percentage", "Mode; cross-tabulation for two variables",
          "Categorical data (sex, strand, yes/no) are summarized by counts and percentages.",
          "Example: 62 (41.33%) of the respondents are from the STEM strand.");
      }
      if (a.outcome === "ordinal") {
        return rec("Weighted mean with Likert interpretation, plus frequency and percentage", "Median and interquartile range",
          "Likert-scale responses are commonly summarized with a weighted mean and a verbal interpretation. Many reviewers also expect the median for ordinal data.",
          "Example: The respondents 'Agree' that peer tutoring helped them (WM = 3.98, SD = 0.71). Use the Likert Scale tool for the ranges.");
      }
      return rec("Mean and standard deviation", "Median and interquartile range (if skewed); minimum and maximum",
        "Numeric data (scores, income, age) are summarized by central tendency and spread.",
        "Example: The mean score in the posttest was 32.4 (SD = 4.1).");
    }
    if (a.goal === "compare") {
      if (a.outcome === "categorical") {
        return a.design === "paired"
          ? rec("McNemar's test", "Cochran's Q (3+ related measurements)",
            "Compares proportions of a yes/no outcome measured twice on the same people.",
            "Report χ², p-value, and the proportions before and after.")
          : rec("Chi-square test of independence", "Fisher's exact test (when expected counts are below 5)",
            "Compares proportions of a categorical outcome across groups.",
            "Report χ²(df, N) = value, p-value, and Cramér's V.");
      }
      const three = a.groups === "3+";
      if (a.design === "paired") {
        return three
          ? rec(nonNormal ? "Friedman test" : "Repeated-measures ANOVA",
            nonNormal ? "Repeated-measures ANOVA (if normal)" : "Friedman test (if not normal or ordinal)",
            "Compares three or more measurements on the same participants (e.g., pretest, posttest, delayed test).",
            nonNormal ? "Report χ²F, df, p-value, and Kendall's W; follow up with Wilcoxon tests (Bonferroni-adjusted)." : "Report F(df1, df2), p-value, partial η²; check sphericity (Mauchly's test) and use post hoc tests.")
          : rec(nonNormal ? "Wilcoxon signed-rank test" : "Paired-samples t-test",
            nonNormal ? "Paired t-test (if differences are normal)" : "Wilcoxon signed-rank test (if not normal or ordinal)",
            "Compares two measurements on the same participants (e.g., pretest vs. posttest).",
            nonNormal ? "Report Z or W, p-value, and effect size r." : "Report t(df), p-value, mean difference, and Cohen's d.");
      }
      return three
        ? rec(nonNormal ? "Kruskal–Wallis H test" : "One-way ANOVA",
          nonNormal ? "One-way ANOVA (if normal)" : "Welch's ANOVA (unequal variances) or Kruskal–Wallis (not normal)",
          "Compares three or more independent groups (e.g., Grade 11 strands, year levels).",
          nonNormal ? "Report H(df), p-value, and ε²; follow up with Dunn's post hoc test." : "Report F(df1, df2), p-value, η²; follow up with Tukey HSD post hoc test.")
        : rec(nonNormal ? "Mann–Whitney U test" : "Independent-samples t-test (Welch's)",
          nonNormal ? "Independent t-test (if normal)" : "Mann–Whitney U test (if not normal or ordinal)",
          "Compares two independent groups (e.g., male vs. female, control vs. experimental).",
          nonNormal ? "Report U, Z, p-value, and effect size r." : "Report t(df), p-value, group means and SDs, and Cohen's d.");
    }
    if (a.goal === "relate") {
      if (a.outcome === "categorical") {
        return rec("Chi-square test of independence with Cramér's V", "Phi coefficient (2×2 tables)",
          "Tests whether two categorical variables are associated.",
          "Report χ²(df, N), p-value, and Cramér's V as the strength of association.");
      }
      return nonNormal
        ? rec("Spearman's rank-order correlation (ρ)", "Kendall's tau-b (small samples, many ties)",
          "Measures the monotonic relationship between ordinal or non-normal variables.",
          "Report ρ, p-value, and interpret strength (e.g., 0.10 weak, 0.30 moderate, 0.50 strong).")
        : rec("Pearson product-moment correlation (r)", "Spearman's ρ (if not normal or with outliers)",
          "Measures the linear relationship between two numeric variables.",
          "Report r(df), p-value, and direction and strength. Correlation does not prove causation.");
    }
    if (a.goal === "predict") {
      if (a.outcome === "categorical") {
        return rec("Binary logistic regression", "Multinomial logistic regression (3+ unordered categories)",
          "Predicts a yes/no outcome (e.g., passed/failed, adopted/did not adopt) from several predictors.",
          "Report odds ratios with 95% CI, p-values, and model fit (e.g., Nagelkerke R², Hosmer–Lemeshow).");
      }
      if (a.outcome === "ordinal") {
        return rec("Ordinal logistic regression", "Multiple linear regression on composite scale scores",
          "Predicts an ordered outcome (e.g., low/average/high) from several predictors.",
          "Report odds ratios, p-values, and test the proportional odds assumption.");
      }
      return rec("Multiple linear regression", "Hierarchical regression; SEM/path analysis (graduate level)",
        "Predicts a numeric outcome from two or more predictors and shows each predictor's unique effect.",
        "Report R², adjusted R², F-test, and β, t, p for each predictor; check multicollinearity (VIF) and residuals.");
    }
    if (a.goal === "qualitative") {
      const map = {
        phenomenology: rec("Colaizzi's method or Interpretative Phenomenological Analysis (IPA)", "Van Manen's hermeneutic approach",
          "Describes the meaning of a lived experience from participants' point of view.",
          "Present significant statements, formulated meanings, theme clusters, and the exhaustive description, supported by quotes."),
        grounded: rec("Grounded theory coding (open, axial/focused, selective/theoretical)", "Constructivist grounded theory (Charmaz)",
          "Builds a theory or model from the data.",
          "Present categories, their relationships, and a theoretical model with memos as an audit trail."),
        case: rec("Case study analysis (within-case and cross-case)", "Pattern matching; explanation building (Yin)",
          "Explains a bounded case (a school, program, community, or business) in depth.",
          "Use multiple data sources (interviews, documents, observation) and triangulate."),
        general: rec("Reflexive thematic analysis (Braun & Clarke)", "Content analysis (when counting categories)",
          "Identifies patterns of meaning (themes) across interviews or open-ended answers.",
          "Present each theme with a definition and direct quotes from participants (use codes like P1, P2)."),
      };
      return map[a.qual] || map.general;
    }
    return null;
  }

  function rec(test, alt, why, report) {
    return { test, alt, why, report };
  }

  /* ---------- Sample size ---------- */

  function slovin(N, e) {
    if (!(N > 0) || !(e > 0)) return NaN;
    return Math.ceil(N / (1 + N * e * e));
  }

  // Cochran's formula with finite population correction.
  function cochran(N, e, z = 1.96, p = 0.5) {
    if (!(e > 0)) return NaN;
    const n0 = (z * z * p * (1 - p)) / (e * e);
    if (!(N > 0)) return Math.ceil(n0);
    return Math.ceil(n0 / (1 + (n0 - 1) / N));
  }

  // Proportional allocation for stratified sampling.
  function allocate(strata, n) {
    const total = strata.reduce((s, x) => s + x.size, 0);
    if (!total) return [];
    return strata.map((x) => ({ ...x, n: Math.round((x.size / total) * n) }));
  }

  /* ---------- Likert interpretation ---------- */

  const LIKERT_LABELS = {
    4: ["Strongly Disagree", "Disagree", "Agree", "Strongly Agree"],
    5: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    6: ["Strongly Disagree", "Disagree", "Slightly Disagree", "Slightly Agree", "Agree", "Strongly Agree"],
    7: ["Strongly Disagree", "Disagree", "Somewhat Disagree", "Neutral", "Somewhat Agree", "Agree", "Strongly Agree"],
  };

  function likertRanges(points, labels) {
    const w = (points - 1) / points;
    const names = labels && labels.length === points ? labels : LIKERT_LABELS[points];
    const rows = [];
    for (let i = 0; i < points; i++) {
      const lo = i === 0 ? 1 : round2(1 + i * w) + 0.01;
      const hi = i === points - 1 ? points : round2(1 + (i + 1) * w);
      rows.push({ scale: i + 1, from: lo.toFixed(2), to: hi.toFixed(2), label: names[i] });
    }
    return rows;
  }

  function interpretMean(mean, points, labels) {
    const rows = likertRanges(points, labels);
    const m = round2(mean);
    return rows.find((r) => m >= +r.from && m <= +r.to) || null;
  }

  function round2(x) {
    return Math.round(x * 100) / 100;
  }

  /* ---------- Timeline ---------- */

  // Share of time between start and final defense, and months after.
  const TIMELINE = {
    shs: { pre: { write: 0.35, implement: 0.25, analyze: 0.25, present: 0.15 }, post: { publish: 1, utilize: 1 } },
    ug: { pre: { write: 0.35, implement: 0.3, analyze: 0.22, present: 0.13 }, post: { publish: 3, utilize: 3 } },
    ms: { pre: { write: 0.3, implement: 0.3, analyze: 0.25, present: 0.15 }, post: { publish: 6, utilize: 6 } },
    phd: { pre: { write: 0.3, implement: 0.3, analyze: 0.28, present: 0.12 }, post: { publish: 12, utilize: 12 } },
  };

  function buildTimeline(level, start, defense) {
    const plan = TIMELINE[level];
    const s = new Date(start + "T00:00:00");
    const d = new Date(defense + "T00:00:00");
    if (!plan || isNaN(s) || isNaN(d) || d <= s) return null;
    const span = d - s;
    const rows = [];
    let cursor = s.getTime();
    for (const [stage, share] of Object.entries(plan.pre)) {
      const end = cursor + span * share;
      rows.push({ stage, start: new Date(cursor), end: new Date(end) });
      cursor = end;
    }
    let after = new Date(d);
    for (const [stage, months] of Object.entries(plan.post)) {
      const st = new Date(after);
      const en = new Date(after);
      en.setMonth(en.getMonth() + months);
      rows.push({ stage, start: st, end: en });
      after = en;
    }
    return rows;
  }

  /* ---------- Title & statement of the problem ---------- */

  // f = { design, iv, dv, population, locale, year, profile }
  function buildTitle(f) {
    const pop = f.population || "[participants]";
    const loc = f.locale ? ` in ${f.locale}` : "";
    const yr = f.year ? `, ${f.year}` : "";
    const iv = f.iv || "[independent variable]";
    const dv = f.dv || "[dependent variable]";
    const profile = (f.profile || "age, sex, grade level")
      .split(",").map((x) => x.trim()).filter(Boolean);
    const profileQ = `What is the profile of the respondents in terms of:\n${profile.map((p, i) => `   ${String.fromCharCode(97 + i)}. ${p};`).join("\n")}`;
    let titles = [];
    let sop = [];
    let hyp = [];
    switch (f.design) {
      case "correlational":
        titles = [
          `${iv} and ${dv} of ${pop}${loc}${yr}`,
          `The Relationship Between ${iv} and ${dv} Among ${pop}${loc}`,
          `${iv} as a Predictor of ${dv}: A Correlational Study Among ${pop}${loc}`,
        ];
        sop = [profileQ, `What is the level of ${iv.toLowerCase()} of the respondents?`, `What is the level of ${dv.toLowerCase()} of the respondents?`, `Is there a significant relationship between ${iv.toLowerCase()} and ${dv.toLowerCase()}?`];
        hyp = [`There is no significant relationship between ${iv.toLowerCase()} and ${dv.toLowerCase()} of ${pop.toLowerCase()}.`];
        break;
      case "comparative":
        titles = [
          `${dv} of ${pop}${loc}: A Comparative Study`,
          `Differences in ${dv} Among ${pop} When Grouped According to ${iv}${loc}`,
        ];
        sop = [profileQ, `What is the level of ${dv.toLowerCase()} of the respondents?`, `Is there a significant difference in ${dv.toLowerCase()} when the respondents are grouped according to ${iv.toLowerCase()}?`];
        hyp = [`There is no significant difference in ${dv.toLowerCase()} of ${pop.toLowerCase()} when grouped according to ${iv.toLowerCase()}.`];
        break;
      case "experimental":
        titles = [
          `Effects of ${iv} on ${dv} of ${pop}${loc}`,
          `${iv}: Its Effect on the ${dv} of ${pop}${loc}${yr}`,
          `Effectiveness of ${iv} in Improving ${dv} Among ${pop}${loc}: A Quasi-Experimental Study`,
        ];
        sop = [`What are the pretest scores in ${dv.toLowerCase()} of the control and experimental groups?`, `What are the posttest scores in ${dv.toLowerCase()} of the control and experimental groups?`, `Is there a significant difference between the pretest and posttest scores of each group?`, `Is there a significant difference between the posttest scores of the control and experimental groups?`];
        hyp = [`There is no significant difference between the pretest and posttest scores in ${dv.toLowerCase()} of each group.`, `There is no significant difference between the posttest scores of the control and experimental groups.`];
        break;
      case "qualitative":
        titles = [
          `Lived Experiences of ${pop} on ${dv}${loc}: A Phenomenological Study`,
          `Understanding ${dv} Among ${pop}${loc}: A Qualitative Inquiry`,
          `"[Meaningful quote]": Experiences of ${pop} in ${dv}${loc}`,
        ];
        sop = [`What are the experiences of ${pop.toLowerCase()} regarding ${dv.toLowerCase()}?`, `What challenges do they encounter?`, `How do they cope with these challenges?`, `What insights can they share with others?`];
        hyp = [];
        break;
      case "developmental":
        titles = [
          `Development and Evaluation of ${iv} for ${pop}${loc}`,
          `${iv}: A Proposed Solution for ${dv} of ${pop}${loc}`,
          `Design, Development, and Acceptability of ${iv}${loc}`,
        ];
        sop = [`What problems in ${dv.toLowerCase()} are encountered by ${pop.toLowerCase()}?`, `What features should ${iv} have to address these problems?`, `What is the level of acceptability of ${iv} in terms of functionality, usability, reliability, and efficiency (ISO/IEC 25010 or similar criteria)?`, `Is there a significant difference in the evaluations of the experts and the end-users?`];
        hyp = [`There is no significant difference in the evaluations of the experts and the end-users of ${iv}.`];
        break;
      default:
        titles = [`${dv} of ${pop}${loc}${yr}`];
        sop = [profileQ, `What is the level of ${dv.toLowerCase()} of the respondents?`];
    }
    const general = f.design === "qualitative"
      ? `This study aims to explore the experiences of ${pop.toLowerCase()} regarding ${dv.toLowerCase()}${loc}.`
      : f.design === "developmental"
        ? `This study aims to develop and evaluate ${iv} for ${pop.toLowerCase()}${loc}.`
        : `This study aims to determine the ${f.design === "experimental" ? "effect of" : "relationship between / difference in"} ${iv.toLowerCase()} ${f.design === "experimental" ? "on" : "and"} ${dv.toLowerCase()} of ${pop.toLowerCase()}${loc}${yr}.`;
    return { titles, general, sop, hyp };
  }

  /* ---------- Output converter ---------- */

  function outputToMarkdown(output, values, meta = {}) {
    const lines = [];
    const head = values.title || values.name || values.headline || output.name;
    lines.push(`# ${head}`);
    lines.push("");
    lines.push(`_${output.name}${meta.author ? ` · ${meta.author}` : ""}${meta.study ? ` · Based on: ${meta.study}` : ""}_`);
    if (meta.audience) lines.push(`_Prepared for: ${meta.audience}_`);
    lines.push("");
    for (const f of output.fields) {
      if (["title", "name", "headline"].includes(f.id)) continue;
      const v = (values[f.id] || "").trim();
      lines.push(`## ${f.label.replace(/\s*\(.*?\)\s*$/, "")}`);
      if (!v) {
        lines.push("_[To be completed]_");
      } else if (/one per line/.test(f.label)) {
        v.split(/\n+/).filter(Boolean).forEach((x, i) => lines.push(`${i + 1}. ${x.trim()}`));
      } else {
        lines.push(v);
      }
      lines.push("");
    }
    lines.push("## Next steps");
    output.steps.forEach((s) => lines.push(`- [ ] ${s}`));
    lines.push("");
    return lines.join("\n");
  }

  return {
    recommendStat, slovin, cochran, allocate, likertRanges, interpretMean,
    LIKERT_LABELS, buildTimeline, buildTitle, outputToMarkdown,
  };
})();

if (typeof module !== "undefined") module.exports = Tools;
