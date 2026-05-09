import type { InternetPackage } from "../../features/internet-packages/types/package.types";

export function getSpeedLabel(pack: InternetPackage) {
    const match = pack.name.match(/(\d+)\s*Mbps/i);
    return match ? `${match[1]} Mbps` : "Unlimited";
}
