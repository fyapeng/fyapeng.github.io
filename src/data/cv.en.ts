export const cvEn = {
  lang: "en",
  title: "CV",
  pdfLabel: "Download English PDF",
  pdfUrl: "/files/cv_en.pdf",
  sections: [
    {
      kind: "entries",
      title: "Education",
      entries: [
        {
          title: "University of Chinese Academy of Social Sciences",
          subtitle: "Ph.D. in Economics",
          meta: "Sep. 2024 - Jun. 2029 (Expected)",
          location: "Beijing, China"
        },
        {
          title: "University of Chinese Academy of Social Sciences",
          subtitle: "B.A. in Economics",
          meta: "Sep. 2020 - Jun. 2024",
          location: "Beijing, China"
        }
      ]
    },
    {
      kind: "tags",
      title: "Research Interests",
      items: ["Health economics", "Industrial organization", "Microeconomic theory", "Policy evaluation"]
    },
    {
      kind: "list",
      title: "Publications",
      items: [
        {
          title: "Yapeng Fu, Chenxu Ni, Zhenglong Cong, Zhen Wang (2026): Medical Payment Reform, Moral Hazard and Cost Control, Journal of Management World.",
          url: "https://link.cnki.net/doi/10.19744/j.cnki.11-1235/f.2026.0040"
        }
      ]
    },
    {
      kind: "list",
      title: "Working Papers",
      items: [
        "Shifen Cai, Mingwei Fu*, Yapeng Fu (June 2026): Social Networks and Healthcare Service Provision.",
        "Yapeng Fu, Mingwei Fu*, Shasha Yuan: Pricing by Treatment Attributes: Evidence from Diagnosis-Intervention Packet Payment, in progress.",
        "Qinghong He, Yapeng Fu*, Mingwei Fu: Organizational Capability and Incentive Transmission: Evidence from the Cancellation of Drug Markups in Public Hospitals, in progress."
      ]
    },
    {
      kind: "list",
      title: "Software",
      items: []
    },
    {
      kind: "list",
      title: "Teaching",
      items: ["Teaching Assistant, Health Economics (Graduate Level), UCASS, Autumn 2025."]
    },
    {
      kind: "list",
      title: "Honors",
      items: [
        "Jul. 2024: Outstanding Bachelor Thesis of Beijing Universities",
        "May 2024: Outstanding Graduate of Beijing Universities (Bachelor)",
        "Dec. 2023: National Endeavor Scholarship (Awarded Twice)",
        "Sep. 2023: 3rd Prize, 18th Challenge Cup National Academic Competition",
        "Jul. 2023: Selected awards at multiple economic forums/conferences"
      ]
    },
    {
      kind: "list",
      title: "Academic Activities",
      items: [
        "Oct. 2025: 8th China Health Economics Forum (Xiamen)",
        "May 2025: 11th China Conference on Organizational Economics (Shenyang)",
        "Jul. 2024: 8th China Labor Economists Forum Annual Conference (Shanghai)",
        "Jun. 2024: 2nd Xiangzhang Social Security Forum (Shanghai)",
        "May 2023: 12th New Era China Youth Economic Forum (Beijing)",
        "Apr. 2023: 5th National Development Youth Forum (Beijing)"
      ]
    },
    {
      kind: "list",
      title: "Contact",
      items: [
        { type: "email", title: "Email" },
        { title: "GitHub: fyapeng", url: "https://github.com/fyapeng" },
        "WeChat official account: Shen Chun (ID: sencium)"
      ]
    }
  ]
} as const;
