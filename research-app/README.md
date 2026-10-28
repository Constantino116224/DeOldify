# SaliksikPH: Research Guide for Filipino Students

A web app that guides students step by step through the research process
and on to real-world use of their findings. It has separate guidance for
**Senior High School**, **Undergraduate**, **Master's**, and **Doctorate**
students in the Philippine setting.

## The six steps

| Step | What the student does |
|------|-----------------------|
| 1. Write | Pick a topic, review literature, write the proposal (Chapters 1–3) |
| 2. Implement | Validate instruments, get ethics clearance and permissions, gather data |
| 3. Analyze | Run statistics or qualitative analysis, write Chapters 4–5 |
| 4. Present | Final defense, research congresses, conferences |
| 5. Publish | Turn the paper into a journal article, avoid predatory journals |
| 6. Utilize | Convert findings into a policy brief, startup, technology/IP, extension program, learning resource, or media piece |

Each step has a checklist for all levels plus a level-specific checklist,
tips, expected outputs, common pitfalls, and a notes box. Philippine
context is built in: DepEd Practical Research/III, CHED PSGs and graduate
policies, PHREB ethics, the Data Privacy Act, NCIP FPIC, IPOPHL, RA 10055,
RA 11337, DOST programs, and more.

## Tools

- **Title & SOP Builder**: drafts titles, the general objective, the statement of the problem, and null hypotheses
- **Analysis Helper**: picks a statistical test or qualitative method and explains how to report it
- **Sample Size Calculator**: Slovin's and Cochran's formulas with stratified proportional allocation
- **Likert Scale Interpreter**: interpretation ranges for 4- to 7-point scales
- **Research Timeline**: plans step deadlines from a start date to the final defense
- **Output Converter**: templates for a policy brief, Lean Canvas, IP/technology plan (with TRL), extension program, learning module, and media piece; exports to Markdown
- **My Project**: progress tracking, a Markdown summary for the adviser, and JSON backup/import

## Running it

No installation or build step. Open `index.html` in a browser, or serve the folder:

```bash
cd research-app
python3 -m http.server 8000
# then open http://localhost:8000
```

It also works on GitHub Pages or any static host. Progress is stored in the
browser's `localStorage`; use **My Project → Export backup** to move it.

## Project layout

```
research-app/
├── index.html        # page shell and navigation
├── css/styles.css    # styles (light/dark, mobile, print)
├── js/data.js        # all guidance content: levels, stages, resources, output templates
├── js/tools.js       # pure functions for the tools (testable in Node)
├── js/app.js         # routing, views, and saved state
└── tests/tools.test.js
```

To edit the guidance, change `js/data.js`; the app picks it up automatically.

## Tests

```bash
node research-app/tests/tools.test.js
```

## Disclaimer

SaliksikPH is a study aid. Policies cited (DepEd, CHED, DOST, IPOPHL, NPC,
PHREB, NCIP) change from time to time; students should follow their adviser,
their school's research manual, and the latest official issuances.
