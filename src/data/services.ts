export interface SubService {
  slug: string;
  name: string;
  description: string;
  duration: string;
  costRange: string;
}

export interface Doctor {
  slug: string;
  name: string;
  specialty: string;
  experience: string;
  hospital: string;
  qualifications: string;
  patientsFromAbroad: string;
  photo: string;
  bio: string;
  expertise: string[];
  languages: string[];
}

export interface Hospital {
  slug: string;
  name: string;
  city: string;
  established: string;
  beds: number;
  accreditation: string[];
  specialties: string[];
  photo: string;
  description: string;
  facilities: string[];
}

export interface Service {
  slug: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  heroStat: string;
  heroStatLabel: string;
  subServices: SubService[];
  conditions: string[];
  whyIndia: string[];
}

export const services: Service[] = [
  {
    slug: "cardiology",
    name: "Cardiology",
    shortDesc: "Advanced heart care with world-class cardiac surgeons at a fraction of Western costs.",
    fullDesc: "India's cardiac care facilities are among the best in the world, performing over 100,000 open-heart surgeries annually. Our partner hospitals house state-of-the-art catheterization labs, robotic surgery systems, and dedicated cardiac ICUs. International patients receive the same standard of care as the most advanced hospitals in the USA and UK, at 70–80% lower cost.",
    heroStat: "70%",
    heroStatLabel: "Lower cost than USA",
    subServices: [
      {
        slug: "cabg",
        name: "Coronary Artery Bypass Grafting (CABG)",
        description: "Open-heart surgery to restore normal blood flow to an obstructed coronary artery. Our surgeons perform over 500 CABG procedures annually with success rates exceeding 98%.",
        duration: "7–10 days hospital stay, 3–4 weeks recovery",
        costRange: "$5,500 – $8,000"
      },
      {
        slug: "angioplasty-stenting",
        name: "Angioplasty & Stenting",
        description: "Minimally invasive procedure to open blocked coronary arteries using a balloon catheter and stent. Same-day or next-day discharge in most cases.",
        duration: "1–2 days hospital stay",
        costRange: "$2,500 – $4,500"
      },
      {
        slug: "heart-valve-replacement",
        name: "Heart Valve Replacement",
        description: "Surgical replacement of damaged heart valves (aortic, mitral, tricuspid) with mechanical or biological prosthetics. Both open and minimally invasive options available.",
        duration: "10–14 days hospital stay, 4–6 weeks recovery",
        costRange: "$7,000 – $12,000"
      },
      {
        slug: "pacemaker-implantation",
        name: "Pacemaker Implantation",
        description: "Implantation of a permanent pacemaker to regulate abnormal heart rhythms. Performed under local anaesthesia with minimal recovery time.",
        duration: "2–3 days hospital stay",
        costRange: "$3,500 – $6,000"
      },
      {
        slug: "paediatric-cardiac-surgery",
        name: "Paediatric Cardiac Surgery",
        description: "Specialized surgery for congenital heart defects in children and infants, performed by dedicated paediatric cardiac surgeons with extensive experience.",
        duration: "Varies by condition",
        costRange: "$4,000 – $10,000"
      },
      {
        slug: "cardiac-electrophysiology",
        name: "Cardiac Electrophysiology (EP) Studies",
        description: "Diagnosis and treatment of heart rhythm disorders (arrhythmias) using catheter-based techniques, including ablation procedures.",
        duration: "2–3 days hospital stay",
        costRange: "$2,000 – $5,000"
      }
    ],
    conditions: [
      "Coronary Artery Disease", "Heart Failure", "Arrhythmia",
      "Atrial Fibrillation", "Congenital Heart Defects", "Valve Disease",
      "Hypertrophic Cardiomyopathy", "Peripheral Artery Disease"
    ],
    whyIndia: [
      "India performs over 100,000 open-heart surgeries per year",
      "JCI and NABH accredited cardiac centers",
      "Robotic and minimally invasive cardiac surgery available",
      "24/7 dedicated cardiac ICU care",
      "Success rates comparable to top US/UK hospitals"
    ]
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    shortDesc: "Get back on your feet with precision joint replacement, spine surgery, and sports injury treatment.",
    fullDesc: "India is the fastest-growing destination for orthopedic surgeries globally. Our partner hospitals use the latest implants from globally renowned brands (Zimmer Biomet, Stryker, DePuy) and perform robotic-assisted joint replacement surgeries for unmatched precision. Whether it's a knee replacement, hip replacement, or complex spinal surgery, our orthopedic specialists deliver outcomes that rival any institution in the world.",
    heroStat: "65%",
    heroStatLabel: "Lower cost than UK",
    subServices: [
      {
        slug: "total-knee-replacement",
        name: "Total Knee Replacement",
        description: "Complete resurfacing of the knee joint using advanced implants. Robotic-assisted surgery available for millimeter-perfect alignment. Includes intensive physiotherapy program.",
        duration: "5–7 days hospital stay, 4–6 weeks recovery",
        costRange: "$4,500 – $7,000"
      },
      {
        slug: "total-hip-replacement",
        name: "Total Hip Replacement",
        description: "Replacement of the damaged hip joint with a prosthetic implant. Minimally invasive anterior approach available for faster recovery and less pain.",
        duration: "5–7 days hospital stay, 4–6 weeks recovery",
        costRange: "$4,500 – $7,000"
      },
      {
        slug: "spinal-surgery-fusion",
        name: "Spinal Surgery & Fusion",
        description: "Treatment for herniated discs, spinal stenosis, scoliosis and other spinal conditions. Includes minimally invasive microdiscectomy, laminectomy, and multi-level fusion surgery.",
        duration: "3–10 days hospital stay (varies by complexity)",
        costRange: "$4,000 – $10,000"
      },
      {
        slug: "shoulder-replacement",
        name: "Shoulder Replacement",
        description: "Total or reverse shoulder replacement for severe arthritis or rotator cuff arthropathy. Anatomic and reverse total shoulder replacement options.",
        duration: "3–5 days hospital stay, 3–4 months full recovery",
        costRange: "$5,000 – $8,000"
      },
      {
        slug: "arthroscopic-surgery",
        name: "Arthroscopic Surgery",
        description: "Minimally invasive keyhole surgery for knee, shoulder, hip, and ankle joints. Includes ACL reconstruction, meniscus repair, rotator cuff repair.",
        duration: "1–2 days hospital stay, 2–6 weeks recovery",
        costRange: "$2,000 – $5,000"
      },
      {
        slug: "bone-tumor-surgery",
        name: "Bone Tumor Surgery",
        description: "Limb-salvage surgery and reconstruction for bone tumors, performed by specialized orthopedic oncologists in collaboration with oncology teams.",
        duration: "Varies by case",
        costRange: "$6,000 – $15,000"
      }
    ],
    conditions: [
      "Osteoarthritis", "Rheumatoid Arthritis", "Disc Herniation",
      "Spinal Stenosis", "Sports Injuries", "Fractures", "Bone Tumors",
      "Scoliosis", "Rotator Cuff Tears", "Ligament Injuries"
    ],
    whyIndia: [
      "Robotic-assisted joint replacement with sub-millimeter accuracy",
      "Latest generation implants from Zimmer Biomet, Stryker, DePuy",
      "Dedicated physiotherapy and rehabilitation programs",
      "High-volume centers with over 2,000 joint replacements annually",
      "Comprehensive post-operative care and pain management"
    ]
  },
  {
    slug: "oncology",
    name: "Oncology",
    shortDesc: "Comprehensive cancer treatment with advanced radiation, surgery, and immunotherapy.",
    fullDesc: "Our partner cancer centers are equipped with the latest cancer-fighting technologies — from Proton Beam Therapy and CyberKnife Radiosurgery to advanced immunotherapy protocols. India's oncologists are internationally trained and have experience treating thousands of international patients. Multidisciplinary tumor boards ensure every patient receives a personalized, evidence-based treatment plan.",
    heroStat: "80%",
    heroStatLabel: "Lower cost than USA",
    subServices: [
      {
        slug: "surgical-oncology",
        name: "Surgical Oncology",
        description: "Minimally invasive and open surgical removal of tumors across all body systems. Includes laparoscopic, robotic, and open cancer surgeries with oncoplastic reconstruction.",
        duration: "5–14 days hospital stay",
        costRange: "$4,000 – $15,000"
      },
      {
        slug: "radiation-therapy",
        name: "Radiation Therapy (IGRT/IMRT)",
        description: "Image-guided and intensity-modulated radiation therapy for precise tumor targeting with minimal damage to surrounding healthy tissue. Latest linear accelerators.",
        duration: "4–6 weeks treatment course",
        costRange: "$4,000 – $8,000"
      },
      {
        slug: "chemotherapy",
        name: "Chemotherapy",
        description: "Systemic and targeted chemotherapy protocols, including the latest biologic agents and monoclonal antibodies. Administered in comfortable, dedicated oncology day-care centers.",
        duration: "Varies by protocol (months)",
        costRange: "$1,500 – $5,000 per cycle"
      },
      {
        slug: "proton-beam-therapy",
        name: "Proton Beam Therapy",
        description: "Advanced radiation therapy using proton beams for maximum precision — particularly effective for pediatric cancers, brain tumors, and prostate cancer.",
        duration: "3–6 weeks treatment course",
        costRange: "$20,000 – $35,000"
      },
      {
        slug: "bone-marrow-transplant",
        name: "Bone Marrow Transplant (BMT)",
        description: "Autologous and allogeneic bone marrow transplants for blood cancers. India's BMT centers have among the best outcomes globally.",
        duration: "4–8 weeks hospital stay",
        costRange: "$15,000 – $30,000"
      },
      {
        slug: "immunotherapy-targeted-therapy",
        name: "Immunotherapy & Targeted Therapy",
        description: "Cutting-edge treatments using checkpoint inhibitors, CAR-T cell therapy, and targeted molecular therapy personalized to the patient's tumor genetics.",
        duration: "Ongoing (every 2–4 weeks)",
        costRange: "$2,000 – $8,000 per cycle"
      }
    ],
    conditions: [
      "Breast Cancer", "Lung Cancer", "Prostate Cancer", "Colorectal Cancer",
      "Liver Cancer", "Brain Tumors", "Leukemia & Lymphoma", "Cervical Cancer",
      "Ovarian Cancer", "Head & Neck Cancers", "Kidney Cancer", "Pancreatic Cancer"
    ],
    whyIndia: [
      "Proton Beam Therapy and CyberKnife available",
      "Multidisciplinary tumor boards for personalized treatment plans",
      "Internationally accredited cancer centers (JCI, NABH)",
      "Access to latest immunotherapy and targeted therapy drugs",
      "Dedicated oncology psychologists and support groups"
    ]
  },
  {
    slug: "neurology",
    name: "Neurology",
    shortDesc: "Expert neurological care for brain, spine, and nerve conditions with advanced imaging and surgery.",
    fullDesc: "India's top neurological centers are equipped with 3-Tesla MRI, advanced neurophysiology labs, and intraoperative neuromonitoring systems. Our neurosurgeons and neurologists specialize in complex cases including brain tumor surgery, epilepsy surgery, deep brain stimulation for Parkinson's disease, and minimally invasive spine surgery. We accept the most complex international cases that have been referred from multiple facilities.",
    heroStat: "60%",
    heroStatLabel: "Lower cost than UK",
    subServices: [
      {
        slug: "brain-tumor-surgery",
        name: "Brain Tumor Surgery",
        description: "Microsurgical and endoscopic removal of brain tumors, including awake craniotomy for tumors in eloquent brain areas. Intraoperative MRI and neuronavigation used.",
        duration: "7–14 days hospital stay",
        costRange: "$6,000 – $15,000"
      },
      {
        slug: "deep-brain-stimulation",
        name: "Deep Brain Stimulation (DBS)",
        description: "Surgical implantation of a neurostimulator to treat Parkinson's disease, essential tremor, and dystonia. Performed by expert functional neurosurgeons.",
        duration: "5–7 days hospital stay, programming sessions over 3–6 months",
        costRange: "$12,000 – $22,000"
      },
      {
        slug: "epilepsy-surgery",
        name: "Epilepsy Surgery",
        description: "Comprehensive pre-surgical evaluation including video-EEG monitoring, functional MRI, and neuropsychological testing, followed by surgical treatment for drug-resistant epilepsy.",
        duration: "2–4 weeks evaluation + surgery",
        costRange: "$8,000 – $18,000"
      },
      {
        slug: "stroke-treatment-rehabilitation",
        name: "Stroke Treatment & Rehabilitation",
        description: "Acute stroke management including thrombolysis and mechanical thrombectomy, followed by intensive rehabilitation with physiotherapy, speech therapy, and occupational therapy.",
        duration: "10–21 days hospital stay, ongoing outpatient rehab",
        costRange: "$5,000 – $12,000"
      },
      {
        slug: "spinal-cord-surgery",
        name: "Spinal Cord Surgery",
        description: "Treatment of spinal cord tumors, syringomyelia, Chiari malformation, and spinal arteriovenous malformations by specialized spine neurosurgeons.",
        duration: "7–14 days hospital stay",
        costRange: "$7,000 – $15,000"
      },
      {
        slug: "peripheral-nerve-surgery",
        name: "Peripheral Nerve Surgery",
        description: "Microsurgical repair and reconstruction of peripheral nerves, carpal tunnel release, brachial plexus surgery, and nerve tumor excision.",
        duration: "1–5 days hospital stay",
        costRange: "$2,500 – $7,000"
      }
    ],
    conditions: [
      "Brain Tumors", "Parkinson's Disease", "Epilepsy", "Stroke",
      "Multiple Sclerosis", "Alzheimer's Disease", "Spinal Cord Disorders",
      "Nerve Compression", "Hydrocephalus", "Movement Disorders"
    ],
    whyIndia: [
      "3-Tesla MRI and advanced neuroimaging available",
      "Intraoperative neuromonitoring for safer surgery",
      "Dedicated stroke units with 24/7 intervention capability",
      "Internationally trained neurosurgeons with global experience",
      "Comprehensive neurorehabilitation programs"
    ]
  },
  {
    slug: "ivf-fertility",
    name: "IVF & Fertility",
    shortDesc: "Advanced fertility treatments with high success rates and compassionate care.",
    fullDesc: "India has emerged as a leading destination for fertility treatments, combining cutting-edge reproductive technology with significantly lower costs. Our partner fertility clinics have success rates of 55–70% per cycle for women under 35, matching or exceeding the best clinics in Europe and the USA. We offer comprehensive fertility evaluations and a full spectrum of assisted reproductive treatments.",
    heroStat: "55-70%",
    heroStatLabel: "Success rate per cycle",
    subServices: [
      {
        slug: "ivf",
        name: "IVF (In Vitro Fertilization)",
        description: "Complete IVF treatment including ovarian stimulation, egg retrieval, fertilization in lab, and embryo transfer. Latest culture media and embryo selection techniques used.",
        duration: "3–4 weeks per cycle",
        costRange: "$2,500 – $4,000 per cycle"
      },
      {
        slug: "icsi",
        name: "ICSI (Intracytoplasmic Sperm Injection)",
        description: "Advanced IVF technique where a single sperm is injected directly into each egg. Recommended for male factor infertility. Combined with IVF cycle.",
        duration: "3–4 weeks",
        costRange: "$2,800 – $4,500 per cycle"
      },
      {
        slug: "egg-donation-ivf",
        name: "Egg Donation IVF",
        description: "IVF using eggs from a carefully screened donor. Recommended for women with diminished ovarian reserve or genetic conditions. Comprehensive donor screening and matching.",
        duration: "4–6 weeks",
        costRange: "$4,000 – $6,500"
      },
      {
        slug: "frozen-embryo-transfer",
        name: "Frozen Embryo Transfer (FET)",
        description: "Transfer of previously frozen embryos. Can be done in a natural or medicated cycle. Often used for subsequent attempts or after genetic testing.",
        duration: "2–3 weeks",
        costRange: "$1,200 – $2,000"
      },
      {
        slug: "pgta-genetic-testing",
        name: "PGT-A (Genetic Testing of Embryos)",
        description: "Preimplantation genetic testing to screen embryos for chromosomal abnormalities before transfer, significantly improving IVF success rates and reducing miscarriage risk.",
        duration: "Added to IVF cycle (5–7 extra days)",
        costRange: "$800 – $1,500 (added to IVF cost)"
      },
      {
        slug: "male-infertility-treatment",
        name: "Male Infertility Treatment",
        description: "Comprehensive evaluation and treatment including surgical sperm retrieval (TESA/PESA/micro-TESE), varicocele repair, and hormonal therapy for male factor infertility.",
        duration: "Varies by treatment",
        costRange: "$1,000 – $4,000"
      }
    ],
    conditions: [
      "Unexplained Infertility", "PCOS", "Endometriosis", "Blocked Fallopian Tubes",
      "Male Factor Infertility", "Recurrent Pregnancy Loss", "Premature Ovarian Failure",
      "Azoospermia", "Uterine Fibroids", "Advanced Maternal Age"
    ],
    whyIndia: [
      "55–70% success rate per cycle for women under 35",
      "Latest embryology lab technology and culture systems",
      "Comprehensive PGT-A genetic screening available",
      "Significantly lower cost than USA, UK, or Australia",
      "Compassionate, personalized care from leading reproductive endocrinologists"
    ]
  },
  {
    slug: "kidney-transplant",
    name: "Kidney Transplant",
    shortDesc: "Life-saving kidney transplants with expert surgical teams and comprehensive pre- and post-operative care.",
    fullDesc: "India's kidney transplant programs are recognized globally for their expertise and outcomes. Our partner hospitals are authorized transplant centers with dedicated transplant nephrology teams, immunology labs, and 24/7 dialysis support. India accepts deceased donor and living-related donor transplants for international patients, following all ethical and legal protocols.",
    heroStat: "95%",
    heroStatLabel: "1-year graft survival rate",
    subServices: [
      {
        slug: "living-donor-transplant",
        name: "Living Donor Kidney Transplant",
        description: "Transplant using a kidney from a living related donor (spouse, sibling, parent, child). Minimally invasive laparoscopic donor nephrectomy is standard for donor safety.",
        duration: "2–3 weeks total hospital stay (donor + recipient), 4–6 weeks recovery",
        costRange: "$13,000 – $18,000"
      },
      {
        slug: "deceased-donor-transplant",
        name: "Deceased Donor Kidney Transplant",
        description: "Transplant from a deceased brain-dead donor. International patients on the waiting list can receive deceased donor transplants following THOA guidelines.",
        duration: "Emergency procedure, 2–3 weeks hospital stay",
        costRange: "$13,000 – $18,000"
      },
      {
        slug: "pre-transplant-evaluation",
        name: "Pre-Transplant Evaluation",
        description: "Comprehensive workup including tissue typing, crossmatch, immunological assessment, cardiac and pulmonary evaluation, and dialysis optimization before transplant.",
        duration: "7–14 days",
        costRange: "$1,500 – $3,000"
      },
      {
        slug: "dialysis-services",
        name: "Dialysis Services",
        description: "Haemodialysis and peritoneal dialysis services for patients awaiting transplant or as long-term renal replacement therapy. Daily or alternate-day sessions available.",
        duration: "Ongoing",
        costRange: "$80 – $150 per session"
      },
      {
        slug: "post-transplant-management",
        name: "Post-Transplant Immunosuppression Management",
        description: "Careful adjustment of lifelong immunosuppressive medications to prevent rejection while minimizing side effects. Telemedicine follow-up available after return home.",
        duration: "Lifelong with regular monitoring",
        costRange: "$200 – $600 per month (medications)"
      },
      {
        slug: "pediatric-kidney-transplant",
        name: "Pediatric Kidney Transplant",
        description: "Specialized kidney transplant program for children with chronic kidney disease, including child-specific surgical techniques and immunosuppression protocols.",
        duration: "3–4 weeks hospital stay",
        costRange: "$14,000 – $20,000"
      }
    ],
    conditions: [
      "Chronic Kidney Disease (Stage 5)", "Diabetic Nephropathy", "IgA Nephropathy",
      "Polycystic Kidney Disease", "Hypertensive Nephrosclerosis", "Lupus Nephritis",
      "Focal Segmental Glomerulosclerosis", "Alport Syndrome"
    ],
    whyIndia: [
      "95%+ one-year graft survival rate at top centers",
      "Experienced transplant teams with 1,000+ procedures annually",
      "Minimally invasive laparoscopic donor surgery",
      "Comprehensive telemedicine follow-up after return home",
      "All ethical transplant protocols strictly followed"
    ]
  },
  {
    slug: "cosmetic-surgery",
    name: "Cosmetic Surgery",
    shortDesc: "Natural-looking cosmetic and reconstructive procedures by board-certified plastic surgeons.",
    fullDesc: "India's cosmetic surgery centers offer the complete range of aesthetic and reconstructive procedures performed by board-certified plastic surgeons trained at leading institutions worldwide. Our surgeons combine artistry with surgical precision, delivering natural, confidence-boosting results. International patients benefit from world-class facilities, personalized care, and costs that are 60–75% lower than USA and UK rates.",
    heroStat: "60-75%",
    heroStatLabel: "Lower cost than USA/UK",
    subServices: [
      {
        slug: "rhinoplasty",
        name: "Rhinoplasty (Nose Surgery)",
        description: "Surgical reshaping of the nose for aesthetic or functional improvement. Both open and closed techniques available. Revision rhinoplasty also performed.",
        duration: "1–2 days hospital stay, 2 weeks visible recovery",
        costRange: "$2,500 – $5,000"
      },
      {
        slug: "facelift-neck-lift",
        name: "Facelift & Neck Lift",
        description: "Comprehensive facial rejuvenation surgery to address sagging skin, deep wrinkles, and loss of definition. Combined with neck lift for complete lower facial contouring.",
        duration: "1–2 days hospital stay, 2–3 weeks visible recovery",
        costRange: "$4,000 – $8,000"
      },
      {
        slug: "liposuction-body-contouring",
        name: "Liposuction & Body Contouring",
        description: "VASER ultrasound-assisted and power-assisted liposuction for precise fat removal from abdomen, thighs, arms, and flanks. High-definition liposuction also available.",
        duration: "1–2 days hospital stay, 3–6 weeks compression garment",
        costRange: "$2,500 – $6,000"
      },
      {
        slug: "breast-augmentation",
        name: "Breast Augmentation & Lift",
        description: "Breast implant placement (saline or silicone) and mastopexy to enhance size and restore youthful position. Latest anatomical and round implants from global brands.",
        duration: "1 day hospital stay, 3–4 weeks activity restriction",
        costRange: "$3,000 – $6,000"
      },
      {
        slug: "tummy-tuck",
        name: "Tummy Tuck (Abdominoplasty)",
        description: "Surgical removal of excess abdominal skin and fat with muscle tightening. Full, mini, and extended abdominoplasty options. Often combined with liposuction.",
        duration: "1–2 days hospital stay, 3–4 weeks recovery",
        costRange: "$3,000 – $5,500"
      },
      {
        slug: "hair-transplant",
        name: "Hair Transplant (FUE/FUT)",
        description: "Advanced follicular unit extraction (FUE) hair transplant for permanent, natural-looking hair restoration. Up to 4,000 grafts per session by experienced trichologists.",
        duration: "1-day procedure, no hospital stay required",
        costRange: "$1,500 – $4,000"
      }
    ],
    conditions: [
      "Unwanted Fat Deposits", "Facial Aging", "Nose Irregularities",
      "Hair Loss", "Breast Concerns", "Post-weight loss skin laxity",
      "Scarring", "Congenital Deformities", "Post-mastectomy reconstruction"
    ],
    whyIndia: [
      "Board-certified plastic surgeons with international fellowship training",
      "JCI-accredited surgical facilities and recovery suites",
      "Latest implant brands (Allergan, Mentor, Sientra) available",
      "Natural-looking results prioritized over dramatic transformations",
      "Comprehensive pre- and post-operative care included"
    ]
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find(s => s.slug === slug);
}

export function getSubServiceBySlug(serviceSlug: string, subSlug: string): { service: Service; sub: SubService } | undefined {
  const service = getServiceBySlug(serviceSlug);
  if (!service) return undefined;
  const sub = service.subServices.find(s => s.slug === subSlug);
  if (!sub) return undefined;
  return { service, sub };
}

export const doctors: Doctor[] = [
  {
    slug: "rajesh-kumar-sharma",
    name: "Dr. Rajesh Kumar Sharma",
    specialty: "Cardiothoracic Surgery",
    experience: "28 years",
    hospital: "Fortis Heart Institute, New Delhi",
    qualifications: "MBBS, MS, MCh (CVTS) | Fellowship: Cleveland Clinic, USA",
    patientsFromAbroad: "500+",
    photo: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80&fit=crop",
    bio: "Dr. Rajesh Kumar Sharma is one of India's leading cardiothoracic surgeons with 28 years of experience and over 12,000 successful cardiac procedures. He pioneered minimally invasive bypass techniques in North India and has trained surgeons across Asia and the Middle East.",
    expertise: ["Coronary Artery Bypass Grafting", "Heart Valve Surgery", "Minimally Invasive Cardiac Surgery", "Beating Heart Surgery", "Pediatric Cardiac Surgery"],
    languages: ["English", "Hindi", "Punjabi"]
  },
  {
    slug: "priya-menon",
    name: "Dr. Priya Menon",
    specialty: "Orthopedic Surgery & Joint Replacement",
    experience: "22 years",
    hospital: "Apollo Hospitals, Chennai",
    qualifications: "MBBS, MS (Ortho), DNB | Fellowship: Robotic Surgery, Germany",
    patientsFromAbroad: "350+",
    photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80&fit=crop",
    bio: "Dr. Priya Menon is a renowned orthopedic surgeon specializing in robotic-assisted joint replacements. She has performed over 5,000 knee and hip replacement surgeries with a 99% satisfaction rate among international patients.",
    expertise: ["Robotic Knee Replacement", "Hip Replacement", "Sports Injuries", "Arthroscopic Surgery", "Revision Joint Surgery"],
    languages: ["English", "Tamil", "Malayalam", "Hindi"]
  },
  {
    slug: "suresh-advani",
    name: "Dr. Suresh Advani",
    specialty: "Medical Oncology",
    experience: "35 years",
    hospital: "Narayana Health City, Bangalore",
    qualifications: "MBBS, MD, DM (Oncology) | Training: Memorial Sloan Kettering, USA",
    patientsFromAbroad: "800+",
    photo: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80&fit=crop",
    bio: "Dr. Suresh Advani is a Padma Bhushan awardee and one of India's most respected medical oncologists. With 35 years of experience, he has treated over 60,000 cancer patients and pioneered bone marrow transplant programs in India.",
    expertise: ["Bone Marrow Transplant", "Hematologic Malignancies", "Solid Tumor Oncology", "Targeted Therapy", "Immunotherapy"],
    languages: ["English", "Hindi", "Marathi", "Sindhi"]
  },
  {
    slug: "aneeta-pinto",
    name: "Dr. Aneeta Pinto",
    specialty: "IVF & Reproductive Medicine",
    experience: "18 years",
    hospital: "Nova IVF Fertility, Mumbai",
    qualifications: "MBBS, MD (OBG), Fellowship in Reproductive Medicine (UK)",
    patientsFromAbroad: "400+",
    photo: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80&fit=crop",
    bio: "Dr. Aneeta Pinto is a leading fertility specialist with 18 years of expertise in assisted reproduction. She has helped over 3,500 couples worldwide achieve parenthood through advanced IVF, ICSI, and donor programs.",
    expertise: ["IVF & ICSI", "Egg Freezing", "Donor Programs", "PCOS Management", "Recurrent Pregnancy Loss"],
    languages: ["English", "Hindi", "Marathi", "Konkani"]
  },
  {
    slug: "vivek-tandon",
    name: "Dr. Vivek Tandon",
    specialty: "Neurosurgery",
    experience: "24 years",
    hospital: "Max Super Speciality, New Delhi",
    qualifications: "MBBS, MS, MCh (Neurosurgery) | Fellowship: Johns Hopkins, USA",
    patientsFromAbroad: "600+",
    photo: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80&fit=crop",
    bio: "Dr. Vivek Tandon is a celebrated neurosurgeon with deep expertise in complex brain and spine surgery. He has performed over 8,000 neurosurgical procedures with industry-leading outcomes.",
    expertise: ["Brain Tumor Surgery", "Spinal Cord Surgery", "Skull Base Surgery", "Deep Brain Stimulation", "Endoscopic Neurosurgery"],
    languages: ["English", "Hindi", "Punjabi"]
  },
  {
    slug: "shobha-krishnan",
    name: "Dr. Shobha Krishnan",
    specialty: "Transplant Nephrology",
    experience: "20 years",
    hospital: "Medanta – The Medicity, Gurugram",
    qualifications: "MBBS, MD (Medicine), DM (Nephrology) | Training: Toronto General, Canada",
    patientsFromAbroad: "300+",
    photo: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&q=80&fit=crop",
    bio: "Dr. Shobha Krishnan leads the kidney transplant program at Medanta with a 95% one-year graft survival rate. She specializes in ABO-incompatible transplants and complex pediatric kidney cases.",
    expertise: ["Kidney Transplantation", "ABO Incompatible Transplant", "Pediatric Nephrology", "Dialysis Management", "Glomerular Diseases"],
    languages: ["English", "Hindi", "Tamil", "Kannada"]
  }
];

export const hospitals: Hospital[] = [
  {
    slug: "fortis-escorts-delhi",
    name: "Fortis Escorts Heart Institute",
    city: "New Delhi",
    established: "1988",
    beds: 310,
    accreditation: ["JCI", "NABH"],
    specialties: ["Cardiology", "Cardiac Surgery", "Liver Transplant", "Kidney Transplant"],
    photo: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=900&q=80&fit=crop",
    description: "Fortis Escorts in New Delhi is a high-volume tertiary care center with strong outcomes in cardiac sciences and transplant medicine for domestic and international patients.",
    facilities: ["Cardiac ICU", "Transplant ICU", "Advanced Cath Lab", "24/7 Emergency", "International Patient Services", "Dedicated Coordinators"]
  },
  {
    slug: "max-super-speciality-saket",
    name: "Max Super Speciality Hospital",
    city: "New Delhi",
    established: "2006",
    beds: 539,
    accreditation: ["JCI", "NABH"],
    specialties: ["Oncology", "Neurology", "Bone Marrow Transplant", "Liver Transplant"],
    photo: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=900&q=80&fit=crop",
    description: "Max Super Speciality in Saket, New Delhi, is known for advanced oncology, neurosciences, and transplant programs supported by multidisciplinary teams.",
    facilities: ["BMT Unit", "Oncology Day Care", "Advanced Radiology", "Critical Care", "International Lounge", "Interpreter Support"]
  },
  {
    slug: "medanta-gurugram",
    name: "Medanta - The Medicity",
    city: "Gurugram (Delhi NCR)",
    established: "2009",
    beds: 1250,
    accreditation: ["JCI", "NABH"],
    specialties: ["Liver Transplant", "Kidney Transplant", "Cardiology", "Oncology"],
    photo: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=900&q=80&fit=crop",
    description: "Medanta in Gurugram is one of the region's largest multispecialty hospitals, with dedicated institutes for liver and kidney transplant and complex critical care.",
    facilities: ["Institute of Liver Transplantation", "Multi-Organ Transplant", "Heart Institute", "Cancer Institute", "Advanced ICU", "International Patient Desk"]
  },
  {
    slug: "manipal-dwarka",
    name: "Manipal Hospital Dwarka",
    city: "New Delhi",
    established: "2018",
    beds: 380,
    accreditation: ["NABH"],
    specialties: ["Cardiology", "Orthopedics", "Oncology", "Neurology"],
    photo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80&fit=crop",
    description: "Manipal Hospital Dwarka provides comprehensive tertiary care in West Delhi with strong medical and surgical specialties and modern critical care infrastructure.",
    facilities: ["Critical Care Unit", "Operation Theatres", "Advanced Diagnostics", "Cardiac Sciences", "International Patient Cell", "24/7 Emergency"]
  },
  {
    slug: "paras-health-gurugram",
    name: "Paras Health",
    city: "Gurugram (Delhi NCR)",
    established: "2006",
    beds: 300,
    accreditation: ["NABH"],
    specialties: ["Neurosciences", "Oncology", "Orthopedics", "Liver Care"],
    photo: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=900&q=80&fit=crop",
    description: "Paras Health in Gurugram is a well-established center for tertiary care with focus areas in neurosciences, oncology, and advanced surgical programs.",
    facilities: ["Neuro ICU", "Oncology Wing", "Advanced OT Complex", "Critical Care", "Patient Coordination Team", "Emergency Trauma Services"]
  },
  {
    slug: "artemis-gurugram",
    name: "Artemis Hospital",
    city: "Gurugram (Delhi NCR)",
    established: "2007",
    beds: 550,
    accreditation: ["JCI", "NABH"],
    specialties: ["Oncology", "Liver Transplant", "Bone Marrow Transplant", "Cardiology"],
    photo: "https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=900&q=80&fit=crop",
    description: "Artemis Hospital in Gurugram is a modern quaternary care facility with established transplant programs and international patient services.",
    facilities: ["BMT Unit", "Liver Transplant Program", "Cardiac Sciences", "Robotic Surgery", "International Patient Care", "Advanced ICU"]
  }
];

export function getDoctorBySlug(slug: string): Doctor | undefined {
  return doctors.find(d => d.slug === slug);
}

export function getHospitalBySlug(slug: string): Hospital | undefined {
  return hospitals.find(h => h.slug === slug);
}

export const indiaCities = [
  {
    name: "New Delhi",
    region: "North India",
    hospitals: ["Apollo Indraprastha", "Fortis Escorts", "Max Super Speciality", "Medanta Medicity"],
    topSpecialties: ["Cardiology", "Neurology", "Oncology"],
    position: { left: "31%", top: "20%" }
  },
  {
    name: "Chandigarh",
    region: "North India",
    hospitals: ["PGI Hospital", "Fortis Hospital", "Max Super Speciality"],
    topSpecialties: ["Orthopedics", "Neurology"],
    position: { left: "27%", top: "13%" }
  },
  {
    name: "Ahmedabad",
    region: "West India",
    hospitals: ["Sterling Hospital", "HCG Cancer Centre", "Apollo Hospital"],
    topSpecialties: ["Oncology", "Cardiology"],
    position: { left: "14%", top: "42%" }
  },
  {
    name: "Mumbai",
    region: "West India",
    hospitals: ["Kokilaben Ambani Hospital", "Hinduja Hospital", "Wockhardt Hospital"],
    topSpecialties: ["Oncology", "Cosmetic Surgery", "IVF"],
    position: { left: "17%", top: "56%" }
  },
  {
    name: "Pune",
    region: "West India",
    hospitals: ["Ruby Hall Clinic", "Jehangir Hospital", "Sahyadri Hospital"],
    topSpecialties: ["Cardiology", "IVF", "Orthopedics"],
    position: { left: "20%", top: "62%" }
  },
  {
    name: "Kolkata",
    region: "East India",
    hospitals: ["Medica Superspecialty", "Narayana Superspecialty", "Fortis Hospital"],
    topSpecialties: ["Cardiology", "Oncology", "Neurology"],
    position: { left: "66%", top: "44%" }
  },
  {
    name: "Hyderabad",
    region: "South India",
    hospitals: ["KIMS Hospital", "Apollo Hospital", "Yashoda Hospital"],
    topSpecialties: ["Oncology", "Orthopedics", "Neurology"],
    position: { left: "39%", top: "60%" }
  },
  {
    name: "Bangalore",
    region: "South India",
    hospitals: ["Narayana Health City", "Manipal Hospital", "Fortis Hospital"],
    topSpecialties: ["Cardiology", "Oncology", "IVF"],
    position: { left: "33%", top: "74%" }
  },
  {
    name: "Chennai",
    region: "South India",
    hospitals: ["Apollo Hospital", "Fortis Malar", "MIOT International"],
    topSpecialties: ["Orthopedics", "Cardiology", "Kidney Transplant"],
    position: { left: "44%", top: "77%" }
  },
  {
    name: "Kochi",
    region: "South India",
    hospitals: ["Aster Medcity", "Amrita Hospital", "Lakeshore Hospital"],
    topSpecialties: ["Cardiology", "IVF", "Orthopedics"],
    position: { left: "30%", top: "85%" }
  }
];
