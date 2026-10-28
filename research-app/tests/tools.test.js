// Run with: node research-app/tests/tools.test.js
const assert = require("assert");
const Tools = require("../js/tools.js");

// Sample size
assert.strictEqual(Tools.slovin(1000, 0.05), 286);
assert.strictEqual(Tools.cochran(1000, 0.05), 278);
assert.strictEqual(Tools.cochran(0, 0.05), 385); // infinite population
const alloc = Tools.allocate([{ name: "A", size: 300 }, { name: "B", size: 100 }], 100);
assert.deepStrictEqual(alloc.map((x) => x.n), [75, 25]);

// Likert ranges
const five = Tools.likertRanges(5);
assert.deepStrictEqual(five.map((r) => `${r.from}-${r.to}`), ["1.00-1.80", "1.81-2.60", "2.61-3.40", "3.41-4.20", "4.21-5.00"]);
const four = Tools.likertRanges(4);
assert.deepStrictEqual(four.map((r) => `${r.from}-${r.to}`), ["1.00-1.75", "1.76-2.50", "2.51-3.25", "3.26-4.00"]);
assert.strictEqual(Tools.interpretMean(3.87, 5).label, "Agree");
assert.strictEqual(Tools.interpretMean(4.205, 5).label, "Strongly Agree");
assert.strictEqual(Tools.interpretMean(1, 4).label, "Strongly Disagree");
assert.strictEqual(Tools.interpretMean(6, 5), null);

// Statistical test chooser
const t = (a) => Tools.recommendStat(a).test;
assert.match(t({ goal: "compare", outcome: "numeric", groups: "2", design: "independent", normal: "yes" }), /Independent-samples t-test/);
assert.match(t({ goal: "compare", outcome: "numeric", groups: "2", design: "paired", normal: "no" }), /Wilcoxon/);
assert.match(t({ goal: "compare", outcome: "ordinal", groups: "3+", design: "independent" }), /Kruskal/);
assert.match(t({ goal: "compare", outcome: "numeric", groups: "3+", design: "paired", normal: "yes" }), /Repeated-measures ANOVA/);
assert.match(t({ goal: "compare", outcome: "categorical", groups: "2", design: "independent" }), /Chi-square/);
assert.match(t({ goal: "relate", outcome: "numeric", normal: "yes" }), /Pearson/);
assert.match(t({ goal: "relate", outcome: "ordinal" }), /Spearman/);
assert.match(t({ goal: "predict", outcome: "categorical" }), /logistic/);
assert.match(t({ goal: "describe", outcome: "ordinal" }), /Weighted mean/);
assert.match(t({ goal: "qualitative", qual: "phenomenology" }), /Colaizzi/);

// Timeline
const tl = Tools.buildTimeline("ug", "2026-06-01", "2027-03-01");
assert.strictEqual(tl.length, 6);
assert.strictEqual(tl[3].end.toISOString().slice(0, 10), new Date("2027-03-01T00:00:00").toISOString().slice(0, 10));
assert.strictEqual(Tools.buildTimeline("ug", "2027-01-01", "2026-01-01"), null);

// Title builder
const r = Tools.buildTitle({ design: "correlational", iv: "Study Habits", dv: "Academic Performance", population: "Grade 11 Students", locale: "Sogod" });
assert.ok(r.titles[0].includes("Study Habits and Academic Performance"));
assert.ok(r.sop[0].includes("a. age"));
assert.strictEqual(r.hyp.length, 1);

// Output converter
const md = Tools.outputToMarkdown(
  { name: "Policy Brief", fields: [{ id: "title", label: "T" }, { id: "findings", label: "Key findings (one per line)" }], steps: ["Do it"] },
  { title: "My Brief", findings: "A\nB" }, { author: "Juan" });
assert.ok(md.startsWith("# My Brief"));
assert.ok(md.includes("1. A\n2. B"));
assert.ok(md.includes("- [ ] Do it"));

console.log("All tool tests passed.");
