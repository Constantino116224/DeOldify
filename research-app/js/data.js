/*
 * SaliksikPH content: academic levels, research stages, and
 * level-specific guidance written for the Philippine setting.
 *
 * Policies cited here (DepEd, CHED, DOST, IPOPHL, NPC, PHREB, NCIP)
 * are updated from time to time. Students should always confirm the
 * current issuance and their own school's research manual.
 */

const LEVELS = {
  shs: {
    id: "shs",
    name: "Senior High School",
    short: "SHS",
    badge: "Grades 11–12",
    output: "Research paper / capstone project",
    duration: "1–2 semesters",
    summary:
      "You learn the research process by doing a small, well-scoped study. Your subjects are usually Practical Research 1 (qualitative), Practical Research 2 (quantitative), and Inquiries, Investigations and Immersion (III) or a strand capstone. Aim for a clear, doable study in your school or community, not a world-first discovery.",
    expectations: [
      "A focused problem connected to your strand (STEM, ABM, HUMSS, GAS, TVL, Arts & Design, Sports)",
      "Chapters 1–3 as your proposal; Chapters 4–5 after data gathering",
      "Simple, correct methods: survey, interview, or a basic experiment",
      "Descriptive statistics and one or two simple inferential tests (for quantitative work)",
      "An oral defense before a panel of teachers",
    ],
    note:
      "DepEd is rolling out a strengthened SHS curriculum, so subject names and sequencing may differ in your school. Follow your current research teacher's syllabus.",
  },
  ug: {
    id: "ug",
    name: "Undergraduate",
    short: "College",
    badge: "Bachelor's degree",
    output: "Undergraduate thesis or capstone project",
    duration: "2 semesters (Thesis 1 & 2)",
    summary:
      "You conduct an independent study under an adviser, usually as a group or individually depending on your program. Your work should apply your discipline's theories and methods and address a real local problem. Capstone projects (IT, engineering, business) also build a working product or plan.",
    expectations: [
      "A topic aligned with your program, your college's research agenda, and a clear research gap",
      "A synthesized review of local and foreign literature (not a list of summaries)",
      "A theoretical and conceptual framework",
      "Validated instruments and an ethics review when you involve people",
      "Title defense, proposal defense, and final defense",
    ],
    note:
      "Thesis requirements vary by program. CHED's Policies, Standards and Guidelines (PSG) for your program, plus your university's research manual, set the rules.",
  },
  ms: {
    id: "ms",
    name: "Master's",
    short: "Masteral",
    badge: "MA / MS / MAEd / MBA",
    output: "Master's thesis (or capstone/project for non-thesis tracks)",
    duration: "1–2 years after coursework",
    summary:
      "You are expected to apply and test theory rigorously and produce findings useful to your profession. Most graduate schools require an advisory committee, a proposal colloquium, an ethics clearance, and a publishable output.",
    expectations: [
      "A well-argued research gap drawn from recent, peer-reviewed literature",
      "A defensible design with validated, reliable instruments",
      "Assumption checks, effect sizes, and a careful interpretation of results",
      "Proposal colloquium, pre-oral/final defense, and revisions approved by the panel",
      "A manuscript ready for a refereed journal (commonly a graduation requirement)",
    ],
    note:
      "CHED's graduate education policies (e.g., CMO No. 15, s. 2019) and your graduate school set publication and defense requirements. Check the latest version.",
  },
  phd: {
    id: "phd",
    name: "Doctorate",
    short: "PhD / EdD / DBA",
    badge: "Doctoral degree",
    output: "Doctoral dissertation",
    duration: "2–4 years after coursework",
    summary:
      "You must make an original contribution to knowledge: a new theory, model, method, or evidence that changes how your field understands a problem. You are also expected to publish in indexed journals and lead the translation of your work into policy, practice, or innovation.",
    expectations: [
      "Passing the comprehensive/qualifying examination (where required)",
      "A systematic or integrative literature review that clearly positions your contribution",
      "Theory building or testing, advanced methods (SEM, multilevel, mixed methods, grounded theory)",
      "Publication in a refereed, preferably Scopus/Web of Science-indexed, journal",
      "A utilization plan: policy, program, technology, or enterprise",
    ],
    note:
      "Doctoral programs usually require publication before or soon after the final defense. Confirm with your graduate school which indexing (Scopus, WoS, CHED-recognized) counts.",
  },
};

/*
 * Each stage has:
 *  - common: checklist items for every level
 *  - levels[levelId]: focus, extra checklist items, tips, and outputs
 *  - pitfalls: frequent mistakes
 */
const STAGES = [
  {
    id: "write",
    num: 1,
    title: "Write",
    subtitle: "Choose a topic and write the proposal",
    icon: "✍️",
    summary:
      "Turn a real problem into a researchable question, review what is already known, and write a proposal (usually Chapters 1–3) that your panel can approve.",
    common: [
      "Identify a real problem in your school, community, industry, or field",
      "Check the topic against a research agenda (DepEd BERA, your school's agenda, the HNRDA, or an agency agenda)",
      "Read at least 10–20 related studies, both local and foreign, and take structured notes",
      "Write the research gap: what is still unknown, untested, or unsolved locally",
      "State the general objective and specific research questions/objectives",
      "Draft the framework (theoretical and/or conceptual paradigm)",
      "Describe the design, participants, sampling, instruments, data gathering, and analysis",
      "Cite properly using the style your school requires (usually APA 7th edition)",
      "Run an originality/similarity check before submitting",
    ],
    levels: {
      shs: {
        focus:
          "Pick something you can finish in one semester with your available time, budget, and safety. Your teacher cares more about a correct process than a big topic.",
        checklist: [
          "Submit 3 possible titles to your research teacher for a title defense",
          "Make sure the topic fits your strand and your subject (PR1 qualitative, PR2 quantitative)",
          "Write Chapter 1: background, statement of the problem, hypothesis (if any), significance, scope and delimitation, definition of terms",
          "Write Chapter 2: review of related literature and studies (RRL/RRS) with a short synthesis",
          "Write Chapter 3: research design, respondents, instrument, data gathering procedure, statistical treatment",
          "Draw an Input-Process-Output (IPO) or variable paradigm for your conceptual framework",
        ],
        tips: [
          "Good SHS topics are local and measurable: study habits of Grade 11 students, a low-cost water filter from local materials, sari-sari store bookkeeping practices.",
          "Avoid topics needing hospital patients, minors outside your school, dangerous chemicals, or animals unless your school has approved protocols.",
          "Use Google Scholar, Philippine E-Journals (ejournals.ph), and DepEd research journals for sources. Do not cite Wikipedia or blogs as evidence.",
        ],
        outputs: ["Approved title", "Chapters 1–3 (research proposal)"],
      },
      ug: {
        focus:
          "Your topic should apply your program's theories and solve or explain a real local problem. Show a clear gap, not just 'no one has studied this in our school.'",
        checklist: [
          "Align your topic with your college's research agenda and your program's PSG",
          "Secure an adviser and, for group theses, agree on roles in writing",
          "Write a synthesized RRL organized by theme, ending with the research gap",
          "Present a theoretical framework (named theories) and a conceptual framework",
          "Prepare for the title defense and then the proposal defense",
          "For capstone projects: include a requirements analysis, system/product design, and evaluation criteria (e.g., ISO/IEC 25010 for software)",
        ],
        tips: [
          "A strong undergraduate gap: 'Studies in Metro Manila show X, but there is no evidence for rural Eastern Visayas, where conditions differ because...'",
          "Use reference managers like Zotero or Mendeley from day one to avoid citation errors.",
          "Ask the panel's comments in writing during your proposal defense and keep a matrix of revisions.",
        ],
        outputs: ["Approved proposal (Chapters 1–3)", "Revision matrix", "Ethics application (if needed)"],
      },
      ms: {
        focus:
          "Build your proposal on current, peer-reviewed literature and a defensible theory. Your design must withstand questions about validity, reliability, and sampling.",
        checklist: [
          "Form your advisory committee and agree on a research timeline",
          "Search systematically (Scopus, Web of Science, ERIC, PubMed, HERDIN, Google Scholar) and keep a search log",
          "Write a critical review: compare findings, methods, and contexts, then state the gap",
          "Specify hypotheses (quantitative) or guiding questions and a philosophical stance (qualitative)",
          "Justify sample size with a power analysis or established guidelines",
          "Prepare and pass the proposal colloquium/defense",
          "Draft your ethics review application",
        ],
        tips: [
          "Prioritize literature from the last 5–10 years, but cite seminal works for theory.",
          "Use G*Power (free) to justify your sample size instead of relying only on Slovin's formula.",
          "Look for funding: DOST-SEI (ASTHRDP/ERDT for S&T), CHED scholarships, and your employer's or DepEd's research funds.",
        ],
        outputs: ["Approved thesis proposal", "Ethics application", "Search log / literature matrix"],
      },
      phd: {
        focus:
          "Your proposal must clearly state the original contribution. Panels will ask: what new knowledge does this dissertation create, and why does it matter beyond your institution?",
        checklist: [
          "Pass the comprehensive/qualifying examination (if your program requires it)",
          "Conduct a systematic or integrative review (e.g., PRISMA) to map the field",
          "State the contribution explicitly: theoretical, methodological, empirical, or practical",
          "Choose an advanced design (SEM, multilevel, mixed methods, grounded theory, design-based research, etc.) and justify it",
          "Plan for at least one publishable paper per main chapter or objective",
          "Pass the dissertation proposal defense and obtain ethics clearance",
        ],
        tips: [
          "Consider publishing your systematic review as your first paper while you collect data.",
          "Write a one-paragraph contribution statement and refine it with your adviser every month.",
          "Check funding: DOST-SEI, CHED, NRCP, DOST councils (PCHRD, PCAARRD, PCIEERD), and international fellowships.",
        ],
        outputs: ["Approved dissertation proposal", "Systematic review manuscript", "Publication plan"],
      },
    },
    pitfalls: [
      "Topic too broad ('Effects of social media on students') with no specific variables or population",
      "RRL written as a list of summaries with no synthesis or gap",
      "Research questions that cannot be answered by the chosen method",
      "Copy-pasted text or AI-generated paragraphs presented as your own work",
    ],
  },
  {
    id: "implement",
    num: 2,
    title: "Implement",
    subtitle: "Prepare instruments, get permissions, gather data",
    icon: "🧪",
    summary:
      "Validate your instruments, secure ethics clearance and permissions, protect your participants' data, and collect data exactly as your approved proposal describes.",
    common: [
      "Have your instrument validated by experts (content validity) and revise it",
      "Pilot test the instrument and check reliability (e.g., Cronbach's alpha ≥ 0.70)",
      "Secure written permission from the school, office, LGU, or company where you will gather data",
      "Prepare informed consent forms in English and a language participants understand (Filipino or the local language)",
      "Follow the Data Privacy Act of 2012 (RA 10173): collect only needed data, store it securely, anonymize it",
      "Keep a data-gathering log: dates, number of respondents, problems encountered",
      "Back up raw data in at least two places",
    ],
    levels: {
      shs: {
        focus:
          "Keep it safe and simple. Ask your research teacher before contacting anyone outside the school, and always bring signed permission letters.",
        checklist: [
          "Get your questionnaire or interview guide checked by your teacher and at least two validators",
          "Prepare a letter of request signed by your adviser and principal",
          "For respondents below 18: get parent/guardian consent AND the student's assent",
          "For experiments: list materials, safety measures, and get approval before using laboratory chemicals or tools",
          "Use Google Forms or printed questionnaires and record responses in a spreadsheet",
        ],
        tips: [
          "Do a quick try-out with 10–15 non-respondents to see if your questions are clear.",
          "Do not collect names or contact details unless you truly need them.",
          "For experiments, run trials (at least 3 replicates) and photograph your setup for documentation.",
        ],
        outputs: ["Validated instrument", "Signed permission and consent forms", "Raw data file"],
      },
      ug: {
        focus:
          "Get ethics clearance from your institution's Research Ethics Committee (REC) before collecting data from people, and follow your approved protocol.",
        checklist: [
          "Submit to your institution's REC and wait for clearance before data collection",
          "Write permission letters to the Schools Division Superintendent, principal, LGU, or company as needed",
          "Compute reliability from the pilot test and report it in Chapter 3",
          "For capstone projects: develop the system/prototype, then test with intended users",
          "For research with Indigenous Peoples: coordinate with NCIP and follow FPIC requirements (IPRA, RA 8371)",
        ],
        tips: [
          "Use PHREB's National Ethical Guidelines for Research Involving Human Participants as your reference.",
          "When surveying students in DepEd schools, follow the division's research approval process (DepEd's Research Management Guidelines).",
          "Field studies on wildlife or marine resources may need permits from DENR or BFAR.",
        ],
        outputs: ["Ethics clearance", "Reliability results", "Complete dataset / prototype"],
      },
      ms: {
        focus:
          "Execute your design with strict fidelity. Document deviations, manage data properly, and keep your committee informed.",
        checklist: [
          "Obtain ethics clearance (a PHREB-accredited REC is required for many health studies)",
          "Write a data management plan: storage, coding, anonymization, retention",
          "Run confirmatory factor analysis or other construct validity checks for adapted scales",
          "Record interviews only with consent, transcribe verbatim, and member-check if appropriate",
          "Submit progress reports to your adviser at agreed intervals",
        ],
        tips: [
          "If you adapt a foreign scale, translate and back-translate it, then validate it locally.",
          "Track response rates and missing data; you'll need to report them.",
          "Use free tools: KoboToolbox or ODK for field surveys, Zotero for references.",
        ],
        outputs: ["Ethics clearance", "Data management plan", "Clean, coded dataset or transcripts"],
      },
      phd: {
        focus:
          "Manage a large, possibly multi-site or multi-phase study. Your data and procedures should be documented well enough for someone else to reproduce.",
        checklist: [
          "Secure ethics clearance for every phase and site (amend protocols when designs change)",
          "Pre-register hypotheses or analysis plans where appropriate (e.g., OSF)",
          "Establish inter-coder reliability for qualitative coding or content analysis",
          "Coordinate MOAs with partner institutions, LGUs, or agencies",
          "Archive data and codebooks according to your data management plan",
        ],
        tips: [
          "Mixed methods: document how one phase informs the next (explanatory, exploratory, or convergent).",
          "Budget time for delays from permits, typhoons, and school calendars.",
          "Keep an audit trail; it protects you during the final defense.",
        ],
        outputs: ["Ethics clearances", "Pre-registration (optional)", "Archived dataset & codebook"],
      },
    },
    pitfalls: [
      "Collecting data before ethics clearance or permissions",
      "Changing the instrument after validation without re-validating",
      "Saving respondents' personal data in shared folders or group chats",
      "Not keeping a copy of signed consent forms",
    ],
  },
  {
    id: "analyze",
    num: 3,
    title: "Analyze",
    subtitle: "Process data, interpret results, draw conclusions",
    icon: "📊",
    summary:
      "Clean your data, use the statistical or qualitative method planned in Chapter 3, and interpret results in light of your literature. This becomes Chapters 4 and 5.",
    common: [
      "Clean data: check for missing values, encoding errors, and outliers",
      "Run the analysis exactly as planned; explain any changes",
      "Present results in tables and figures numbered and titled properly",
      "Interpret each result: what it means, and how it compares with previous studies",
      "Answer every research question in order",
      "Write the summary of findings, conclusions, and recommendations (Chapter 5)",
      "Make sure each recommendation is based on a finding",
    ],
    levels: {
      shs: {
        focus:
          "Use frequency, percentage, mean, and weighted mean with a Likert interpretation table. Add a simple test (t-test, Pearson r, chi-square) only if your questions need it.",
        checklist: [
          "Encode data in Excel or Google Sheets",
          "Compute descriptive statistics and interpret them using your Likert scale ranges",
          "If testing a hypothesis, use the test your teacher approved and report the p-value",
          "Write Chapter 4 with tables followed by an analysis and interpretation paragraph",
          "Write Chapter 5: summary, conclusions, and recommendations",
        ],
        tips: [
          "Use the Analysis Helper and Likert Scale tool in this app to pick the right test and interpretation ranges.",
          "For qualitative PR1 studies, group similar answers into themes and support each theme with direct quotes.",
          "Ask your school's math teacher or a statistician to check your computations.",
        ],
        outputs: ["Chapter 4 (results and discussion)", "Chapter 5 (conclusions and recommendations)"],
      },
      ug: {
        focus:
          "Use appropriate inferential statistics or a systematic qualitative method and connect findings to your framework and literature.",
        checklist: [
          "Check assumptions (normality, homogeneity of variance) before parametric tests",
          "Report test statistic, degrees of freedom, p-value, and effect size where possible",
          "For qualitative work: follow a named method (e.g., Braun & Clarke thematic analysis, Colaizzi's method)",
          "For capstone projects: report user acceptance/usability results (e.g., ISO/IEC 25010, SUS)",
          "Have your results reviewed by a statistician (often required before the final defense)",
        ],
        tips: [
          "Free tools: JASP and jamovi (point-and-click), R, and Taguette for qualitative coding.",
          "Don't just say 'significant'; explain what the difference or relationship means in practice.",
        ],
        outputs: ["Chapters 4–5", "Statistician's certification (if required)"],
      },
      ms: {
        focus:
          "Analysis must be rigorous and transparent. Report assumptions, effect sizes, confidence intervals, and limitations.",
        checklist: [
          "Test assumptions and use robust or non-parametric alternatives when violated",
          "Report effect sizes and confidence intervals, not only p-values",
          "For regression/SEM: check multicollinearity, model fit, and residuals",
          "For qualitative work: describe trustworthiness (credibility, transferability, dependability, confirmability)",
          "Discuss findings against theory and explain unexpected results",
        ],
        tips: [
          "Keep your analysis syntax or steps (R scripts, SPSS syntax, JASP files) for reproducibility.",
          "Write the discussion as an argument: finding → comparison with literature → explanation → implication.",
        ],
        outputs: ["Full results and discussion chapter", "Analysis files and syntax"],
      },
      phd: {
        focus:
          "Your analysis should support a contribution to theory or method. Integrate results across studies or phases into a coherent model or argument.",
        checklist: [
          "Use advanced models suited to your data (SEM, multilevel, longitudinal, Bayesian, meta-analysis, etc.)",
          "Run sensitivity or robustness checks",
          "Integrate quantitative and qualitative strands with a joint display (mixed methods)",
          "Present your proposed model, framework, or theory clearly",
          "State theoretical, methodological, and practical implications",
        ],
        tips: [
          "Draft each results section as a journal article to speed up publication.",
          "Ask an external methodologist to review your analysis before the final defense.",
        ],
        outputs: ["Results and discussion chapters", "Proposed model/theory", "Draft journal manuscripts"],
      },
    },
    pitfalls: [
      "Using Slovin's formula or a statistical test without understanding its assumptions",
      "Reporting 'significant' without stating the direction and size of the effect",
      "Conclusions that go beyond the data (overgeneralizing from a small sample)",
      "Recommendations that are not connected to any finding",
    ],
  },
  {
    id: "present",
    num: 4,
    title: "Present",
    subtitle: "Defend your study and share it at fora",
    icon: "🎤",
    summary:
      "Defend your work before a panel, revise based on their comments, and present it to wider audiences at research congresses, fairs, and conferences.",
    common: [
      "Prepare a clear slide deck: problem, methods, key findings, conclusions, recommendations",
      "Practice a timed presentation (usually 15–20 minutes) at least three times",
      "Anticipate panel questions and prepare short, honest answers",
      "Record panel comments and prepare a revision matrix (comment / action taken / page)",
      "Submit the revised manuscript with the panel's approval sheet",
    ],
    levels: {
      shs: {
        focus:
          "Your final defense shows that you understand your study. Speak in your own words and know your numbers.",
        checklist: [
          "Prepare 10–15 slides with large text and simple charts",
          "Assign speaking parts to every group member",
          "Prepare a research poster for your school's research congress or exhibit",
          "Consider joining the division/regional research congress or Science & Technology Fair (for STEM investigatory projects)",
        ],
        tips: [
          "Use the rule: one idea per slide, at most 6 lines of text.",
          "If you don't know an answer, say so and explain how you would find out.",
        ],
        outputs: ["Final defense deck", "Research poster", "Revised manuscript"],
      },
      ug: {
        focus:
          "Defend your methods and findings confidently. For capstones, include a live demo of the system or prototype.",
        checklist: [
          "Prepare the final defense deck and a backup copy (PDF on a USB drive)",
          "For capstone projects: rehearse the live demo and prepare a video backup",
          "Submit an abstract to a student research conference or your college's research forum",
          "Prepare a poster and a 3-minute summary pitch",
        ],
        tips: [
          "Explain your 'so what?': who benefits from your findings, and how.",
          "Thesis competitions and student research congresses are also good for your portfolio.",
        ],
        outputs: ["Final defense deck", "Conference abstract", "Poster"],
      },
      ms: {
        focus:
          "Present to both academic and practitioner audiences. Your final defense and at least one conference presentation strengthen your publication.",
        checklist: [
          "Pass the final oral defense and complete revisions",
          "Present at a national or international conference (paper or poster)",
          "Prepare an extended abstract or full paper for the conference proceedings",
          "Brief your workplace or partner agency on the results",
        ],
        tips: [
          "Choose conferences organized by reputable professional associations or universities.",
          "Conference feedback helps you strengthen your journal manuscript.",
        ],
        outputs: ["Approved thesis", "Conference presentation", "Proceedings paper"],
      },
      phd: {
        focus:
          "Defend your contribution before an expert panel (often with an external examiner) and establish yourself as a scholar in your field.",
        checklist: [
          "Pass the pre-oral and final dissertation defense",
          "Present at an international conference in your field",
          "Give a seminar or lecture series based on your dissertation",
          "Brief policymakers or industry partners on implications",
        ],
        tips: [
          "Prepare a 3-minute version, a 15-minute version, and a 45-minute version of your talk.",
          "Network with potential collaborators for post-doctoral work.",
        ],
        outputs: ["Approved dissertation", "International presentation", "Policy/industry briefing"],
      },
    },
    pitfalls: [
      "Reading slides word-for-word",
      "Overcrowded slides and tables that the audience cannot read",
      "Arguing with the panel instead of noting comments",
      "Forgetting to submit revisions on time",
    ],
  },
  {
    id: "publish",
    num: 5,
    title: "Publish",
    subtitle: "Turn your manuscript into a publication",
    icon: "📰",
    summary:
      "Reformat your thesis into a journal article, choose a legitimate journal, respond to peer review, and make your work discoverable.",
    common: [
      "Convert the paper to IMRaD format (Introduction, Methods, Results, and Discussion)",
      "Cut the manuscript to the journal's word limit and follow its author guidelines",
      "Agree on authorship and author order with your co-authors and adviser",
      "Verify that the journal is legitimate (not predatory) before submitting",
      "Respond to every reviewer comment politely in a response letter",
      "Deposit your work in your institution's repository if allowed",
    ],
    levels: {
      shs: {
        focus:
          "Publication is optional for SHS but a great achievement. Start with school or division research journals and youth research fora.",
        checklist: [
          "Ask your teacher whether your school or division has a research journal or compendium",
          "Write a 150–250-word abstract and a 4–6 page short paper",
          "Ask your adviser to review the paper and be listed as co-author if they contributed",
          "Share a simplified version (infographic or article) in your school publication",
        ],
        tips: [
          "Never pay to publish in a journal that promises acceptance in a few days.",
          "Your school paper, campus radio, or official page can also share your findings with your community.",
        ],
        outputs: ["Abstract / short paper", "School journal or publication feature"],
      },
      ug: {
        focus:
          "Many universities have undergraduate research journals. Good theses can also be published in refereed national journals with your adviser.",
        checklist: [
          "Identify 3 target journals (institutional, national, or student journals)",
          "Rewrite your thesis as a 4,000–7,000-word journal article",
          "Create an ORCID iD and Google Scholar profile",
          "Submit and track the review process",
        ],
        tips: [
          "Search Philippine E-Journals (ejournals.ph) for journals in your discipline.",
          "Check if your university gives publication incentives or pays publication fees.",
        ],
        outputs: ["Journal manuscript", "ORCID iD"],
      },
      ms: {
        focus:
          "Many graduate schools require a manuscript submitted to or accepted by a refereed journal before graduation.",
        checklist: [
          "Choose a refereed journal that matches your graduate school's requirement",
          "Check the journal's indexing (Scopus, Web of Science, ACI, DOAJ) yourself, not from the journal's website alone",
          "Prepare the cover letter, title page, blinded manuscript, and data availability statement",
          "Plan a second paper (e.g., review article or methods paper)",
        ],
        tips: [
          "Use Think. Check. Submit. (thinkchecksubmit.org) to evaluate journals.",
          "Look for CHED or university research incentives for published articles.",
        ],
        outputs: ["Submitted/accepted article", "Publication certificate"],
      },
      phd: {
        focus:
          "Aim for indexed journals and a coherent publication record from your dissertation, often 2–3 articles.",
        checklist: [
          "Target Scopus/WoS-indexed journals in Q1–Q3 appropriate to your field",
          "Publish your systematic review, empirical papers, and model/theory paper",
          "Share data and code in a repository when ethics allow",
          "Write a policy note or popular article to reach non-academic audiences",
        ],
        tips: [
          "Check the journal's scope by reading recent issues before submitting.",
          "Consider a book or monograph with a university press for humanities and social sciences.",
        ],
        outputs: ["Indexed journal articles", "Data/code repository", "Popular article"],
      },
    },
    pitfalls: [
      "Publishing in predatory journals that charge fees with no real peer review",
      "Submitting the same manuscript to two journals at the same time",
      "Excluding or adding authors without agreement",
      "Ignoring reviewer comments instead of responding to each one",
    ],
  },
  {
    id: "utilize",
    num: 6,
    title: "Utilize",
    subtitle: "Convert your research into real-world impact",
    icon: "🚀",
    summary:
      "Research matters when it is used. Turn your findings into a policy brief, a startup, a technology, a community program, a learning resource, or another useful output.",
    common: [
      "Identify who can use your findings: learners, teachers, LGUs, agencies, industry, communities",
      "Choose a utilization pathway (use the Output Converter in this app)",
      "Translate findings into plain language with clear actions",
      "Protect intellectual property before public disclosure, if your output is an invention",
      "Engage partners (school, LGU, agency, company, NGO) and present to them",
      "Track and document impact: adoption, beneficiaries, citations, changes in policy or practice",
    ],
    levels: {
      shs: {
        focus:
          "Start small and local: share your recommendations with your school, barangay, or a local business, or pitch your prototype.",
        checklist: [
          "Write a one-page action plan or recommendation letter to your principal, barangay, or LGU",
          "Create an infographic or short video explaining your findings",
          "ABM/TVL: turn your study into a simple business plan or product pitch",
          "STEM: improve your prototype and join a science fair or innovation challenge",
        ],
        tips: [
          "A barangay council or school planning team can adopt simple, practical recommendations.",
          "Ask your teacher about youth innovation and entrepreneurship competitions.",
        ],
        outputs: ["Action plan / recommendation letter", "Infographic", "Pitch deck or business plan"],
      },
      ug: {
        focus:
          "Your thesis or capstone can become a startup, an extension program, or a policy recommendation to an LGU or agency.",
        checklist: [
          "Consult your university's Innovation and Technology Support Office (ITSO) or tech-transfer office about IP",
          "Join your university's Technology Business Incubator (TBI) or a startup competition",
          "Propose an extension program with your college's extension office",
          "Present a policy brief to the relevant LGU office, Sangguniang Bayan/Panlungsod, or agency",
        ],
        tips: [
          "Under the Philippine Technology Transfer Act (RA 10055), IP from government-funded research is managed with the funding agency and institution. Ask your ITSO early.",
          "The Innovative Startup Act (RA 11337) provides support programs for startups through DOST, DTI, and DICT.",
        ],
        outputs: ["IP disclosure", "Startup pitch", "Extension proposal", "Policy brief"],
      },
      ms: {
        focus:
          "Translate findings into programs and policies in your workplace or sector: training designs, intervention programs, school improvement plans, or agency guidelines.",
        checklist: [
          "Write a policy brief for your agency, division, or LGU",
          "Design an intervention, training program, or module based on your findings",
          "Pilot the intervention and evaluate it (this may become a follow-up action research)",
          "Seek funding for scale-up (DepEd BERF, LGU, DOST, CHED, private sector)",
        ],
        tips: [
          "Education researchers: link outputs to your School Improvement Plan or division priorities.",
          "Business/engineering: explore DOST's SETUP program for MSMEs and the DOST-TAPI services for inventors.",
        ],
        outputs: ["Policy brief", "Intervention/training design", "Funding proposal"],
      },
      phd: {
        focus:
          "Lead the translation of your contribution: national policy input, patented technology, spin-off company, or a research program with a team.",
        checklist: [
          "Prepare policy notes for national agencies, DEPDev (formerly NEDA), or congressional committees",
          "File for IP protection (patent, utility model, industrial design, copyright) through IPOPHL with your institution",
          "Explore licensing or a spin-off company under RA 10055",
          "Build a research program and mentor junior researchers",
          "Seek research grants (DOST councils, CHED, NRCP, international funders)",
        ],
        tips: [
          "Present at policy fora and agency technical working groups.",
          "Use Technology Readiness Levels (TRL) to communicate how close your technology is to market.",
        ],
        outputs: ["Policy notes", "IP filing", "Spin-off or license", "Research program proposal"],
      },
    },
    pitfalls: [
      "Publicly presenting an invention before filing for IP protection",
      "Recommendations too vague to act on ('The government should improve education')",
      "Not involving end-users or partners early",
      "No plan to measure whether the output was used",
    ],
  },
];

/* Philippine-focused resources. Always verify the latest version. */
const RESOURCES = [
  {
    group: "Research agendas & guidelines",
    items: [
      { name: "DepEd Basic Education Research Agenda (DO 39, s. 2016)", desc: "Priority research themes for basic education.", url: "https://www.deped.gov.ph/" },
      { name: "DepEd Research Management Guidelines (DO 16, s. 2017)", desc: "Process for research in DepEd schools and offices, including the Basic Education Research Fund (BERF).", url: "https://www.deped.gov.ph/" },
      { name: "CHED (Commission on Higher Education)", desc: "Program PSGs, graduate education policies, research grants and journal policies.", url: "https://ched.gov.ph/" },
      { name: "DOST Harmonized National R&D Agenda (HNRDA)", desc: "National priorities for science, technology, and innovation.", url: "https://www.dost.gov.ph/" },
    ],
  },
  {
    group: "Ethics & data privacy",
    items: [
      { name: "Philippine Health Research Ethics Board (PHREB)", desc: "National Ethical Guidelines for Research Involving Human Participants; REC accreditation.", url: "https://ethics.healthresearch.ph/" },
      { name: "National Privacy Commission (RA 10173)", desc: "Data Privacy Act guidance for handling personal data.", url: "https://privacy.gov.ph/" },
      { name: "National Commission on Indigenous Peoples (NCIP)", desc: "Free, Prior and Informed Consent (FPIC) for research with Indigenous Cultural Communities.", url: "https://ncip.gov.ph/" },
    ],
  },
  {
    group: "Literature & data sources",
    items: [
      { name: "Philippine E-Journals", desc: "Online platform for Philippine academic journals.", url: "https://ejournals.ph/" },
      { name: "HERDIN Plus", desc: "Health research and development information network of the Philippines.", url: "https://www.herdin.ph/" },
      { name: "Philippine Statistics Authority (PSA OpenSTAT)", desc: "Official statistics for background and secondary data.", url: "https://openstat.psa.gov.ph/" },
      { name: "PIDS Research", desc: "Philippine Institute for Development Studies policy research.", url: "https://pids.gov.ph/" },
      { name: "Google Scholar", desc: "Search scholarly literature.", url: "https://scholar.google.com/" },
      { name: "DOAJ", desc: "Directory of Open Access Journals (helps verify open-access journals).", url: "https://doaj.org/" },
    ],
  },
  {
    group: "Funding & scholarships",
    items: [
      { name: "DOST Science Education Institute (SEI)", desc: "Undergraduate and graduate S&T scholarships.", url: "https://www.sei.dost.gov.ph/" },
      { name: "DOST Councils: PCHRD, PCAARRD, PCIEERD", desc: "Research grants in health; agriculture, aquatic and natural resources; and industry, energy and emerging technology.", url: "https://www.dost.gov.ph/" },
      { name: "National Research Council of the Philippines (NRCP)", desc: "Research grants and recognition for researchers.", url: "https://nrcp.dost.gov.ph/" },
    ],
  },
  {
    group: "Innovation, IP & startups",
    items: [
      { name: "IPOPHL", desc: "Intellectual Property Office of the Philippines: patents, utility models, industrial designs, trademarks, copyright.", url: "https://www.ipophil.gov.ph/" },
      { name: "DOST-TAPI", desc: "Technology Application and Promotion Institute: support for inventors and technology commercialization.", url: "https://www.tapi.dost.gov.ph/" },
      { name: "DOST SETUP", desc: "Small Enterprise Technology Upgrading Program for MSMEs.", url: "https://setup.dost.gov.ph/" },
      { name: "Startup support (RA 11337, Innovative Startup Act)", desc: "Startup programs via DOST, DTI, and DICT.", url: "https://www.dti.gov.ph/" },
      { name: "WIPO Patentscope / Google Patents", desc: "Free prior-art search before filing a patent.", url: "https://patentscope.wipo.int/" },
    ],
  },
  {
    group: "Free tools",
    items: [
      { name: "Zotero", desc: "Free reference manager.", url: "https://www.zotero.org/" },
      { name: "JASP", desc: "Free statistics software with a point-and-click interface.", url: "https://jasp-stats.org/" },
      { name: "jamovi", desc: "Free statistics software built on R.", url: "https://www.jamovi.org/" },
      { name: "G*Power", desc: "Free power analysis for sample size.", url: "https://www.psychologie.hhu.de/arbeitsgruppen/allgemeine-psychologie-und-arbeitspsychologie/gpower" },
      { name: "Taguette", desc: "Free qualitative data coding tool.", url: "https://www.taguette.org/" },
      { name: "KoboToolbox", desc: "Free mobile data collection for field surveys.", url: "https://www.kobotoolbox.org/" },
      { name: "Think. Check. Submit.", desc: "Checklist to identify trusted journals.", url: "https://thinkchecksubmit.org/" },
    ],
  },
];

/* Utilization pathways for the Output Converter. */
const OUTPUTS = [
  {
    id: "policy",
    name: "Policy Brief",
    icon: "🏛️",
    desc: "A 2–4 page document that tells decision-makers what the problem is, what your research found, and what they should do.",
    levels: ["shs", "ug", "ms", "phd"],
    audience: ["School head / principal", "Barangay council", "LGU (Sangguniang Bayan/Panlungsod)", "DepEd division/regional office", "CHED / HEI administration", "National agency", "Congress / Senate committee"],
    fields: [
      { id: "title", label: "Brief title (action-oriented)", ph: "Reducing Learning Loss in Rural Schools Through Peer Tutoring" },
      { id: "summary", label: "Executive summary (3–4 sentences)", ph: "What is the problem, what did you find, what do you recommend?", area: true },
      { id: "context", label: "The issue / context", ph: "Why this matters now, with local statistics (PSA, DepEd, LGU data)", area: true },
      { id: "findings", label: "Key findings (one per line)", ph: "Finding 1\nFinding 2\nFinding 3", area: true },
      { id: "options", label: "Policy options considered (one per line)", ph: "Option A: ...\nOption B: ...", area: true },
      { id: "recs", label: "Recommendations: who, what, when (one per line)", ph: "The Schools Division Office should ... by SY 2027–2028", area: true },
      { id: "refs", label: "Key references", ph: "APA references", area: true },
    ],
    steps: [
      "Write for a busy reader: put the recommendation on page 1.",
      "Use plain language; replace jargon and statistics with what they mean.",
      "Include one strong chart or table.",
      "Make each recommendation specific: actor, action, timeline, cost if known.",
      "Request a meeting or a slot in the council/office session to present it.",
    ],
  },
  {
    id: "startup",
    name: "Startup / Business",
    icon: "💡",
    desc: "Turn your solution into a business using the Lean Canvas, then validate it with real customers.",
    levels: ["shs", "ug", "ms", "phd"],
    fields: [
      { id: "name", label: "Startup / product name", ph: "AgriSense" },
      { id: "problem", label: "Problem (top 1–3 problems from your research)", area: true },
      { id: "segments", label: "Customer segments / early adopters", area: true },
      { id: "uvp", label: "Unique value proposition (one sentence)", ph: "Low-cost soil moisture alerts by SMS for smallholder farmers" },
      { id: "solution", label: "Solution (top 3 features)", area: true },
      { id: "channels", label: "Channels (how you reach customers)", area: true },
      { id: "revenue", label: "Revenue streams", area: true },
      { id: "costs", label: "Cost structure", area: true },
      { id: "metrics", label: "Key metrics", area: true },
      { id: "advantage", label: "Unfair advantage", area: true },
    ],
    steps: [
      "Interview at least 20 potential customers to validate the problem.",
      "Build a minimum viable product (MVP) and test it with early adopters.",
      "Protect IP first if your product includes an invention (consult your ITSO/IPOPHL).",
      "Join a Technology Business Incubator (TBI) or startup program (DOST, DTI, DICT under RA 11337).",
      "Register your business (DTI for sole proprietorship, SEC for corporations) when ready to sell.",
    ],
  },
  {
    id: "technology",
    name: "New Technology / IP",
    icon: "⚙️",
    desc: "Protect and transfer an invention, prototype, software, or process developed from your research.",
    levels: ["shs", "ug", "ms", "phd"],
    fields: [
      { id: "title", label: "Technology title", ph: "Banana-fiber biodegradable seedling pot" },
      { id: "problem", label: "Technical problem solved", area: true },
      { id: "solution", label: "How it works (technical solution)", area: true },
      { id: "novelty", label: "What is new compared with existing solutions (prior art)?", area: true },
      { id: "trl", label: "Technology Readiness Level", select: ["TRL 1 – Basic principles observed", "TRL 2 – Concept formulated", "TRL 3 – Proof of concept", "TRL 4 – Validated in the lab", "TRL 5 – Validated in relevant environment", "TRL 6 – Prototype demonstrated in relevant environment", "TRL 7 – Prototype demonstrated in operational environment", "TRL 8 – System complete and qualified", "TRL 9 – Proven in actual operation"] },
      { id: "ip", label: "Likely IP type", select: ["Invention patent (new, inventive step, industrially applicable)", "Utility model (new, industrially applicable; simpler, shorter protection)", "Industrial design (new or original appearance)", "Copyright (software, modules, creative works)", "Trade secret", "Not sure yet"] },
      { id: "users", label: "Potential adopters / licensees", area: true },
    ],
    steps: [
      "Keep the invention confidential until you file; public disclosure can affect patentability.",
      "Do a prior-art search (IPOPHL, WIPO Patentscope, Google Patents).",
      "Submit an invention disclosure to your school's ITSO or tech-transfer office.",
      "File with IPOPHL (patent, utility model, industrial design) with your institution, following its IP policy.",
      "Increase the TRL through testing, then pursue licensing, a spin-off, or DOST-TAPI support.",
    ],
  },
  {
    id: "extension",
    name: "Community Extension Program",
    icon: "🤝",
    desc: "Design a community program (training, service, or intervention) based on your findings, with partners and measurable outcomes.",
    levels: ["ug", "ms", "phd"],
    fields: [
      { id: "title", label: "Program title", ph: "Project LINIS: Waste Segregation Training for Barangay San Isidro" },
      { id: "beneficiaries", label: "Target beneficiaries and location", area: true },
      { id: "need", label: "Needs assessment (from your research)", area: true },
      { id: "objectives", label: "Objectives (SMART)", area: true },
      { id: "activities", label: "Activities and schedule", area: true },
      { id: "partners", label: "Partners (LGU, NGO, school, agency) and their roles", area: true },
      { id: "indicators", label: "Monitoring & evaluation indicators", area: true },
      { id: "sustain", label: "Sustainability plan", area: true },
    ],
    steps: [
      "Conduct a community needs assessment and consult the barangay or partner.",
      "Sign a MOA with partners and get approval from your extension office.",
      "Run a pilot and collect baseline and endline data.",
      "Document and report outcomes; this may become a new research paper.",
    ],
  },
  {
    id: "learning",
    name: "Learning Resource / Training Module",
    icon: "📘",
    desc: "Turn findings into a module, learning activity sheet, manual, or training design for learners, teachers, or workers.",
    levels: ["shs", "ug", "ms", "phd"],
    fields: [
      { id: "title", label: "Material title" },
      { id: "learners", label: "Target users (grade level, profession)" },
      { id: "competencies", label: "Learning competencies / objectives", area: true },
      { id: "content", label: "Content outline (lessons/sessions)", area: true },
      { id: "activities", label: "Activities and assessments", area: true },
      { id: "evidence", label: "How your research supports this material", area: true },
    ],
    steps: [
      "Align with the curriculum (DepEd MELCs/curriculum guide, CHED PSG, or TESDA competencies).",
      "Have the material validated by content experts and target users.",
      "Pilot it and revise based on results.",
      "Submit through your school's or division's learning resource quality assurance process.",
    ],
  },
  {
    id: "media",
    name: "Popular Media / Advocacy",
    icon: "📣",
    desc: "Share findings with the public through an infographic, explainer video, radio segment, or feature article.",
    levels: ["shs", "ug", "ms", "phd"],
    fields: [
      { id: "headline", label: "Headline (simple, catchy, accurate)" },
      { id: "audience", label: "Audience and platform (Facebook, TikTok, radio, school paper)" },
      { id: "message", label: "One key message", area: true },
      { id: "facts", label: "3 supporting facts from your study", area: true },
      { id: "cta", label: "Call to action", area: true },
    ],
    steps: [
      "Use Filipino or the local language when it reaches your audience better.",
      "Do not exaggerate results; keep claims faithful to your findings.",
      "Credit your institution and cite your study.",
      "Never post participants' identities or photos without consent.",
    ],
  },
];
