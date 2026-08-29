export interface ExamWord {
    word: string;
    level: "ielts" | "toefl" | "awl";
}

export interface ExamPack {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    level: "ielts" | "toefl" | "awl";
    color: string;
    bg: string;
    words: string[];
}

export const EXAM_PACKS: ExamPack[] = [
    {
        id: "awl-1",
        title: "Academic Word List",
        subtitle: "Essential for IELTS & TOEFL",
        description:
            "The most frequently used academic words found in university-level texts. Mastering these gives you a strong foundation for both IELTS and TOEFL.",
        level: "awl",
        color: "#8b5cf6",
        bg: "#f5f3ff",
        words: [
            "analyze", "approach", "area", "assess", "assume",
            "authority", "available", "benefit", "concept", "consist",
            "constitute", "context", "contract", "create", "data",
            "define", "derive", "distribute", "economy", "environment",
            "establish", "estimate", "evident", "export", "factor",
            "finance", "formula", "function", "identify", "income",
            "indicate", "individual", "interpret", "involve", "issue",
            "labor", "legal", "legislate", "major", "method",
            "occur", "percent", "period", "policy", "principle",
            "proceed", "process", "require", "research", "respond",
            "role", "section", "sector", "significant", "similar",
            "source", "specific", "structure", "theory", "vary",
        ],
    },
    {
        id: "ielts-1",
        title: "IELTS Core Vocabulary",
        subtitle: "Target Band 7.0+",
        description:
            "High-frequency words appearing in IELTS reading and listening tests. Essential for achieving Band 7 and above.",
        level: "ielts",
        color: "#0ea5e9",
        bg: "#f0f9ff",
        words: [
            "abstract", "accurate", "adequate", "adjacent", "advocate",
            "aggregate", "allocate", "ambiguous", "anticipate", "apparent",
            "arbitrary", "articulate", "attribute", "augment", "bias",
            "brevity", "capacity", "chronic", "coherent", "coincide",
            "collaborate", "commence", "compensate", "compile", "complement",
            "comply", "comprehensive", "conceive", "conclude", "concurrent",
            "consolidate", "contend", "contradict", "controversy", "convey",
            "correlate", "criterion", "cumulative", "debatable", "decline",
            "deduce", "demonstrate", "depict", "diminish", "discrepancy",
            "distinct", "diversity", "dominant", "dynamic", "elaborate",
            "eliminate", "emerge", "emphasize", "empirical", "enhance",
            "ensure", "evaluate", "evolve", "explicit", "facilitate",
        ],
    },
    {
        id: "toefl-1",
        title: "TOEFL Essential Words",
        subtitle: "Target Score 100+",
        description:
            "Vocabulary commonly tested in TOEFL reading passages and spoken responses. Critical for integrated and independent tasks.",
        level: "toefl",
        color: "#f97316",
        bg: "#fff7ed",
        words: [
            "abolish", "abundant", "accelerate", "accommodate", "accomplish",
            "accumulate", "acknowledge", "acquire", "adapt", "adequate",
            "adhere", "adjacent", "affirm", "aggravate", "alleviate",
            "ambivalent", "amplify", "analogous", "anomaly", "antagonist",
            "arduous", "articulate", "aspire", "assimilate", "attain",
            "audacious", "autonomy", "benchmark", "bolster", "brevity",
            "candid", "catalyst", "circumvent", "coerce", "cognitive",
            "coherent", "concede", "condone", "constrain", "contemplate",
            "contradict", "controversial", "converge", "culminate", "cynical",
            "daunting", "debilitate", "deduce", "deter", "deviate",
            "dilemma", "disparity", "disrupt", "diverge", "elaborate",
            "empirical", "enigmatic", "enumerate", "exacerbate", "exploit",
        ],
    },
    {
        id: "advanced-1",
        title: "Advanced Vocabulary",
        subtitle: "C1 – C2 Level",
        description:
            "Sophisticated vocabulary for high-level academic writing and speaking. These words will elevate your language to native-speaker level.",
        level: "awl",
        color: "#22c55e",
        bg: "#f0fdf4",
        words: [
            "abstruse", "acrimonious", "adumbrate", "aesthetic", "affable",
            "aggrandize", "alacrity", "ameliorate", "anachronism", "anodyne",
            "antipathy", "apocryphal", "approbation", "arcane", "ardor",
            "ascertain", "assuage", "attenuate", "auspicious", "avarice",
            "banal", "belligerent", "beneficent", "benevolent", "berate",
            "bombastic", "cacophony", "callous", "candor", "capricious",
            "categorical", "caustic", "censure", "circumspect", "clandestine",
            "cogent", "complacent", "conciliatory", "condescend", "confound",
            "consternation", "contentious", "convoluted", "copious", "credulous",
            "culminate", "cursory", "cynicism", "dauntless", "debacle",
            "decorum", "deference", "denigrate", "depravity", "desolate",
            "diligence", "discern", "disdain", "disparate", "dissemble",
        ],
    },
];