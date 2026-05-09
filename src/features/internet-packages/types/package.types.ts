export type InternetPackage = {
    id: string;
    name: string;
    quotaGb: number;
    validityDays: number;
    price: number;
    provider: string;
};

export type PackageImageTheme = {
    overlay: string;
    background: string;
};

export type PackageBuyCardProps = {
    pack: InternetPackage;
    accent: string;
    imageTheme: PackageImageTheme;
    isPending: boolean;
    isRecommended: boolean;
    onBuy: () => void;
};
