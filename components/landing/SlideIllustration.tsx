"use client";

interface Props {
    slide: number;
}

export default function SlideIllustration({ slide }: Props) {
    if (slide === 0) {
        // Kids — adventure map with treasure chest
        return (
            <svg
                viewBox="0 0 420 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-md drop-shadow-2xl"
            >
                {/* Background circle */}
                <circle cx="210" cy="190" r="180" fill="#fef3c7" opacity="0.6" />

                {/* Map scroll */}
                <rect x="60" y="60" width="300" height="260" rx="20" fill="#fef9c3" stroke="#f59e0b" strokeWidth="3" />
                <rect x="60" y="60" width="300" height="40" rx="20" fill="#f59e0b" />
                <rect x="60" y="80" width="300" height="20" fill="#f59e0b" />

                {/* Map lines */}
                <path d="M100 140 Q160 120 200 160 Q240 200 300 180" stroke="#fbbf24" strokeWidth="3" strokeDasharray="8 4" fill="none" />
                <path d="M100 200 Q150 180 190 210 Q230 240 300 220" stroke="#fbbf24" strokeWidth="2" strokeDasharray="6 4" fill="none" />

                {/* Location pins */}
                <circle cx="130" cy="155" r="14" fill="#ef4444" />
                <path d="M130 169 L130 185" stroke="#ef4444" strokeWidth="3" strokeLinecap="round" />
                <circle cx="130" cy="155" r="6" fill="white" />

                <circle cx="210" cy="165" r="14" fill="#f59e0b" />
                <path d="M210 179 L210 195" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
                <circle cx="210" cy="165" r="6" fill="white" />

                <circle cx="290" cy="148" r="14" fill="#22c55e" />
                <path d="M290 162 L290 178" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                <circle cx="290" cy="148" r="6" fill="white" />

                {/* Treasure chest */}
                <rect x="155" y="240" width="110" height="70" rx="8" fill="#92400e" />
                <rect x="155" y="240" width="110" height="35" rx="8" fill="#b45309" />
                <rect x="155" y="268" width="110" height="8" fill="#78350f" />
                {/* Chest lock */}
                <rect x="198" y="264" width="24" height="20" rx="4" fill="#f59e0b" />
                <circle cx="210" cy="272" r="5" fill="#92400e" />
                {/* Stars around chest */}
                <text x="135" y="255" fontSize="18" fill="#f59e0b">★</text>
                <text x="278" y="250" fontSize="14" fill="#f59e0b">★</text>
                <text x="148" y="295" fontSize="12" fill="#fbbf24">✦</text>
                <text x="282" y="295" fontSize="16" fill="#fbbf24">✦</text>

                {/* Compass */}
                <circle cx="330" cy="270" r="28" fill="white" stroke="#f59e0b" strokeWidth="2" />
                <circle cx="330" cy="270" r="22" fill="#fef9c3" />
                <path d="M330 252 L335 268 L330 265 L325 268 Z" fill="#ef4444" />
                <path d="M330 288 L325 272 L330 275 L335 272 Z" fill="#64748b" />
                <circle cx="330" cy="270" r="4" fill="#f59e0b" />
                <text x="327" y="250" fontSize="9" fill="#64748b" fontWeight="bold">N</text>
                <text x="327" y="294" fontSize="9" fill="#64748b" fontWeight="bold">S</text>

                {/* Kid character - simple */}
                <circle cx="95" cy="240" r="22" fill="#fbbf24" />
                <circle cx="88" cy="235" r="3" fill="#1c1917" />
                <circle cx="102" cy="235" r="3" fill="#1c1917" />
                <path d="M88 248 Q95 254 102 248" stroke="#1c1917" strokeWidth="2" fill="none" strokeLinecap="round" />
                {/* Hat */}
                <rect x="76" y="220" width="38" height="10" rx="3" fill="#b45309" />
                <rect x="82" y="208" width="26" height="14" rx="4" fill="#92400e" />
                {/* Body */}
                <rect x="78" y="262" width="34" height="40" rx="8" fill="#0ea5e9" />
                {/* Arms */}
                <line x1="78" y1="275" x2="60" y2="290" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
                <line x1="112" y1="275" x2="130" y2="265" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" />
            </svg>
        );
    }

    if (slide === 1) {
        // Teen — leveling up, game-style
        return (
            <svg
                viewBox="0 0 420 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full max-w-md drop-shadow-2xl"
            >
                {/* Dark background circle */}
                <circle cx="210" cy="190" r="180" fill="#0f172a" opacity="0.5" />

                {/* Screen / device */}
                <rect x="80" y="60" width="260" height="200" rx="16" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
                <rect x="80" y="60" width="260" height="30" rx="16" fill="#0f172a" />
                <rect x="80" y="75" width="260" height="15" fill="#0f172a" />
                {/* Screen dots */}
                <circle cx="100" cy="75" r="4" fill="#ef4444" />
                <circle cx="116" cy="75" r="4" fill="#f59e0b" />
                <circle cx="132" cy="75" r="4" fill="#22c55e" />

                {/* XP bar */}
                <rect x="100" y="105" width="220" height="12" rx="6" fill="#334155" />
                <rect x="100" y="105" width="154" height="12" rx="6" fill="#06b6d4" />
                <text x="100" y="98" fontSize="10" fill="#64748b" fontFamily="monospace">XP</text>
                <text x="290" y="98" fontSize="10" fill="#06b6d4" fontFamily="monospace">70%</text>

                {/* Word card on screen */}
                <rect x="100" y="128" width="220" height="80" rx="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="1" />
                <text x="210" y="158" fontSize="22" fill="#e2e8f0" fontWeight="bold" textAnchor="middle" fontFamily="monospace">eloquent</text>
                <text x="210" y="178" fontSize="11" fill="#64748b" textAnchor="middle">/ˈɛləkwənt/</text>
                <text x="210" y="198" fontSize="10" fill="#06b6d4" textAnchor="middle">fluent and persuasive in speech</text>

                {/* Answer buttons */}
                <rect x="100" y="220" width="100" height="28" rx="8" fill="#22c55e" opacity="0.2" stroke="#22c55e" strokeWidth="1" />
                <text x="150" y="239" fontSize="10" fill="#22c55e" textAnchor="middle">Correct ✓</text>
                <rect x="210" y="220" width="110" height="28" rx="8" fill="#334155" />
                <text x="265" y="239" fontSize="10" fill="#64748b" textAnchor="middle">Skip →</text>

                {/* Floating badges */}
                <rect x="290" y="90" width="45" height="22" rx="11" fill="#f59e0b" />
                <text x="312" y="105" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">STREAK</text>

                {/* Level up notification */}
                <rect x="95" y="275" width="230" height="50" rx="12" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="130" y="296" fontSize="11" fill="#06b6d4" fontWeight="bold">⚡ LEVEL UP!</text>
                <text x="130" y="313" fontSize="9" fill="#64748b">You unlocked: Week Warrior badge</text>
                {/* Badge icon */}
                <circle cx="306" cy="300" r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="306" y="306" fontSize="14" textAnchor="middle">🏆</text>

                {/* Floating stars */}
                <text x="68" y="180" fontSize="20" fill="#06b6d4" opacity="0.6">✦</text>
                <text x="355" y="150" fontSize="16" fill="#06b6d4" opacity="0.4">✦</text>
                <text x="72" y="280" fontSize="12" fill="#f59e0b" opacity="0.5">★</text>
                <text x="358" y="310" fontSize="18" fill="#f59e0b" opacity="0.3">★</text>
            </svg>
        );
    }

    // Slide 2 — Scholar / IELTS/TOEFL
    return (
        <svg
            viewBox="0 0 420 380"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full max-w-md drop-shadow-2xl"
        >
            {/* Background */}
            <circle cx="210" cy="190" r="180" fill="#f0f9ff" opacity="0.7" />

            {/* Open book */}
            <path d="M70 140 Q70 120 90 120 L210 130 L210 280 L90 270 Q70 270 70 250 Z" fill="#fef9c3" stroke="#e2e8f0" strokeWidth="2" />
            <path d="M350 140 Q350 120 330 120 L210 130 L210 280 L330 270 Q350 270 350 250 Z" fill="white" stroke="#e2e8f0" strokeWidth="2" />
            {/* Book spine */}
            <rect x="205" y="125" width="10" height="158" rx="2" fill="#cbd5e1" />

            {/* Left page — handwritten notes */}
            <line x1="95" y1="155" x2="195" y2="158" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
            <line x1="95" y1="170" x2="195" y2="173" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
            <line x1="95" y1="185" x2="175" y2="188" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
            <line x1="95" y1="200" x2="195" y2="203" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
            <line x1="95" y1="215" x2="165" y2="218" stroke="#fbbf24" strokeWidth="1.5" opacity="0.6" />
            <text x="95" y="150" fontSize="9" fill="#64748b" fontFamily="serif">IELTS Academic Word List</text>
            <text x="95" y="165" fontSize="8" fill="#94a3b8">• eloquent — fluent in speech</text>
            <text x="95" y="180" fontSize="8" fill="#94a3b8">• ambiguous — open to interpretation</text>
            <text x="95" y="195" fontSize="8" fill="#94a3b8">• coherent — logically consistent</text>
            <text x="95" y="210" fontSize="8" fill="#94a3b8">• facilitate — make easier</text>
            <text x="95" y="225" fontSize="8" fill="#94a3b8">• implicit — suggested, not stated</text>
            {/* Highlight */}
            <rect x="93" y="187" width="102" height="11" rx="2" fill="#fef9c3" opacity="0.7" />

            {/* Right page — word detail */}
            <text x="225" y="148" fontSize="11" fill="#0f172a" fontWeight="bold" fontFamily="serif">ambiguous</text>
            <text x="225" y="162" fontSize="9" fill="#94a3b8">/æmˈbɪɡjuəs/</text>
            <rect x="225" y="168" width="42" height="13" rx="6" fill="#f0f9ff" />
            <text x="246" y="178" fontSize="8" fill="#0ea5e9" textAnchor="middle">adjective</text>

            <line x1="225" y1="186" x2="340" y2="186" stroke="#e2e8f0" strokeWidth="1" />

            <text x="225" y="198" fontSize="8" fill="#475569" fontFamily="serif">Open to more than one</text>
            <text x="225" y="210" fontSize="8" fill="#475569" fontFamily="serif">interpretation; not clear.</text>

            <text x="225" y="226" fontSize="8" fill="#94a3b8" fontStyle="italic" fontFamily="serif">&quot;The report was deliberately</text>
            <text x="225" y="237" fontSize="8" fill="#94a3b8" fontStyle="italic" fontFamily="serif">ambiguous.&quot;</text>

            <text x="225" y="253" fontSize="8" fill="#0ea5e9" fontWeight="bold">Synonyms:</text>
            <text x="225" y="265" fontSize="8" fill="#475569">vague · unclear · equivocal</text>

            {/* Graduation cap */}
            <rect x="155" y="295" width="110" height="14" rx="2" fill="#0f172a" />
            <polygon points="210,270 265,295 210,308 155,295" fill="#1e293b" />
            <circle cx="210" cy="270" r="18" fill="#0f172a" />
            <circle cx="210" cy="270" r="14" fill="#1e293b" />
            <line x1="262" y1="294" x2="275" y2="315" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            <circle cx="275" cy="318" r="5" fill="#f59e0b" />

            {/* Score badge */}
            <rect x="320" y="250" width="72" height="72" rx="16" fill="#0ea5e9" />
            <text x="356" y="278" fontSize="11" fill="white" textAnchor="middle" fontWeight="bold">IELTS</text>
            <text x="356" y="298" fontSize="22" fill="white" textAnchor="middle" fontWeight="bold">7.5</text>
            <text x="356" y="314" fontSize="9" fill="#bae6fd" textAnchor="middle">Band Score</text>

            {/* Floating elements */}
            <text x="55" y="130" fontSize="16" fill="#0ea5e9" opacity="0.3">✦</text>
            <text x="358" y="120" fontSize="12" fill="#f59e0b" opacity="0.4">★</text>
        </svg>
    );
}