import {
    FiStar,
    FiBookOpen,
    FiAward,
    FiMap,
    FiCompass,
    FiZap,
    FiTarget,
    FiTrendingUp,
} from "react-icons/fi";

interface Props {
    icon: string;
    size?: number;
}

export default function BadgeIcon({ icon, size = 20 }: Props) {
    switch (icon) {
        case "star": return <FiStar size={size} />;
        case "book": return <FiBookOpen size={size} />;
        case "award": return <FiAward size={size} />;
        case "map": return <FiMap size={size} />;
        case "compass": return <FiCompass size={size} />;
        case "zap": return <FiZap size={size} />;
        case "target": return <FiTarget size={size} />;
        case "trending": return <FiTrendingUp size={size} />;
        default: return <FiAward size={size} />;
    }
}