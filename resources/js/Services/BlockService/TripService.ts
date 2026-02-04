import {Service} from "typedi";
import PackageEnum from "@/Enums/PackageEnum";
import TripProps from "@/Interfaces/Site/TripProps";

export type TierStyle = {
    gradient: string;
    badge: "outline" | "gold" | "teal" | "premium";
    badgeText: string;
}

const tierStyles = {
    standard: {
        gradient: "from-slate-200 to-slate-100",
        badge: "outline" as const,
        badgeText: "Standard",
    },
    deluxe: {
        gradient: "from-amber-200 to-amber-100",
        badge: "gold" as const,
        badgeText: "Deluxe",
    },
    adventure: {
        gradient: "from-emerald-200 to-emerald-100",
        badge: "teal" as const,
        badgeText: "Adventure",
    },
    vip: {
        gradient: "from-purple-200 via-purple-100 to-purple-50",
        badge: "premium" as const,
        badgeText: "VIP Premium",
    },
};
@Service()
class TripService {
    getTier (pkg: TripProps | undefined) {
        if (pkg === undefined) return null;
        const style = tierStyles[pkg.tripPackage];
        let tier: TierStyle;
        if (pkg.tripPackage === null) return null;
        switch(pkg.tripPackage) {
            case PackageEnum.STANDARD_PACKAGE:
                tier = tierStyles.deluxe;
                break;
            case PackageEnum.ADVENTURE_PACKAGE:
                tier = tierStyles.adventure;
                break;
            case PackageEnum.VIP_DREAM_PACKAGE:
                tier = tierStyles.vip;
                break
            default:
                tier = tierStyles.standard;
                break;
        }
        return tier;
    }

    getTierType (pkg: TripProps | undefined) {

        if (pkg === undefined) return "trip";
        const style = tierStyles[pkg.tripPackage];
        let tier: string;
        if (pkg.tripPackage === null) return "trip";
        switch(pkg.tripPackage) {
            case PackageEnum.DELUXE_PACKAGE:
                tier = "deluxe";
                break;
            case PackageEnum.ADVENTURE_PACKAGE:
                tier = "adventure";
                break;
            case PackageEnum.VIP_DREAM_PACKAGE:
                tier = "vip";
                break
            default:
                tier = "standard";
                break;
        }
        return tier;
    }

    getTierBadge (pkg: TripProps | undefined) {
        console.log(pkg?.tripPackage)
        if (pkg === undefined) return null;
        let badge: "gold" | "teal" | "premium" | "outline";
        // if (pkg.tripPackage === null) return "trip";
        switch(pkg.tripPackage) {
            case PackageEnum.DELUXE_PACKAGE:
                badge = "gold";
                break;
            case PackageEnum.ADVENTURE_PACKAGE:
                badge = "teal";
                break;
            case PackageEnum.VIP_DREAM_PACKAGE:
                badge = "premium";
                break
            default:
                console.log('sss');
                badge = "outline";
                break;
        }
        return badge;
    }
}

export default TripService;
