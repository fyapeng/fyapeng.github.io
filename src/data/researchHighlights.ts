export interface ResearchHighlight {
  slug: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const researchHighlights: ResearchHighlight[] = [
  {
    slug: "drg-dip-heterogeneity",
    title: "DRG/DIP 支付改革的异质性效应",
    description:
      "这项研究把医保起付线附近的道德风险与 DRG/DIP 支付改革放在同一框架中，观察支付规则如何改变医疗费用、患者负担和医疗机构行为。",
    image: "/images/research/drg-dip-heterogeneity.png",
    imageAlt: "DRG/DIP 支付改革异质性效应图"
  }
];
