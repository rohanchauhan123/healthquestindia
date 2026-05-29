export interface CostItem {
  id: string;
  title: string;
  category: string;
  description: string;
  /** Lower bound of typical package price, stored in USD */
  priceMinUsd: number;
  /** Upper bound of typical package price, stored in USD */
  priceMaxUsd: number;
  notes?: string;
}

export const seedCostItems: CostItem[] = [
  {
    id: "seed-cabg",
    title: "Coronary artery bypass (CABG)",
    category: "Cardiology",
    description: "Typical all-inclusive hospital package: surgery, ICU, ward stay, and standard implants.",
    priceMinUsd: 5500,
    priceMaxUsd: 8000,
    notes: "Final quote depends on investigations and comorbidities.",
  },
  {
    id: "seed-hip-replace",
    title: "Total hip replacement",
    category: "Orthopedics",
    description: "Unilateral primary hip replacement with standard implant and physiotherapy.",
    priceMinUsd: 6500,
    priceMaxUsd: 9500,
  },
  {
    id: "seed-knee-replace",
    title: "Total knee replacement",
    category: "Orthopedics",
    description: "Unilateral knee replacement, hospital stay, and rehab sessions.",
    priceMinUsd: 5500,
    priceMaxUsd: 8500,
  },
  {
    id: "seed-ivf",
    title: "IVF cycle (standard protocol)",
    category: "Fertility",
    description: "One stimulation cycle with embryo transfer; medications billed separately in many centres.",
    priceMinUsd: 3500,
    priceMaxUsd: 5500,
  },
  {
    id: "seed-mri",
    title: "MRI (single region)",
    category: "Diagnostics",
    description: "High-field MRI with radiologist report.",
    priceMinUsd: 120,
    priceMaxUsd: 250,
  },
];
