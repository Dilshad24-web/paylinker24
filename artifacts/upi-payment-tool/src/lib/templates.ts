export interface Template {
  id: string;
  name: string;
  category: string;
  styles: {
    background: string;
    card: string;
    textMain: string;
    textSecondary: string;
    buttonBg: string;
    buttonText: string;
    accent: string;
    border: string;
  };
}

// Generate 50 unique, beautiful templates algorithmically but with specific naming
const categories = [
  "Classic", "Dark", "Gradient", "Minimal", "Bold",
  "Nature", "Premium", "Festive", "Business", "Vibrant"
];

const generateTemplates = (): Template[] => {
  const templates: Template[] = [];
  
  // 1-5 Classic
  const classicColors = [
    { name: "Navy Blue", p: "#1e3a8a", s: "#bfdbfe" },
    { name: "Emerald Green", p: "#047857", s: "#a7f3d0" },
    { name: "Royal Purple", p: "#6d28d9", s: "#ddd6fe" },
    { name: "Burnt Orange", p: "#c2410c", s: "#fed7aa" },
    { name: "Deep Teal", p: "#0f766e", s: "#99f6e4" },
  ];
  classicColors.forEach((c, i) => {
    templates.push({
      id: `template-${templates.length + 1}`,
      name: `Classic ${c.name}`,
      category: "Classic",
      styles: {
        background: "#f8fafc",
        card: "#ffffff",
        textMain: "#0f172a",
        textSecondary: "#64748b",
        buttonBg: c.p,
        buttonText: "#ffffff",
        accent: c.s,
        border: "#e2e8f0"
      }
    });
  });

  // 6-10 Dark
  const darkColors = [
    { name: "Midnight", bg: "#0f172a", card: "#1e293b", p: "#3b82f6" },
    { name: "Obsidian", bg: "#09090b", card: "#18181b", p: "#10b981" },
    { name: "Deep Space", bg: "#171717", card: "#27272a", p: "#f43f5e" },
    { name: "Violet Night", bg: "#2e1065", card: "#4c1d95", p: "#c084fc" },
    { name: "Dark Forest", bg: "#022c22", card: "#064e3b", p: "#34d399" },
  ];
  darkColors.forEach((c, i) => {
    templates.push({
      id: `template-${templates.length + 1}`,
      name: `Dark ${c.name}`,
      category: "Dark",
      styles: {
        background: c.bg,
        card: c.card,
        textMain: "#f8fafc",
        textSecondary: "#94a3b8",
        buttonBg: c.p,
        buttonText: "#ffffff",
        accent: c.p,
        border: "#334155"
      }
    });
  });

  // 11-15 Gradient
  const gradientColors = [
    { name: "Sunset", bg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)", p: "#ea580c" },
    { name: "Ocean", bg: "linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)", p: "#0284c7" },
    { name: "Purple Dream", bg: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)", p: "#7c3aed" },
    { name: "Cherry", bg: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)", p: "#e11d48" },
    { name: "Emerald", bg: "linear-gradient(135deg, #0ba360 0%, #3cb0fd 100%)", p: "#059669" },
  ];
  gradientColors.forEach((c, i) => {
    templates.push({
      id: `template-${templates.length + 1}`,
      name: c.name,
      category: "Gradient",
      styles: {
        background: c.bg,
        card: "rgba(255, 255, 255, 0.9)",
        textMain: "#1e293b",
        textSecondary: "#475569",
        buttonBg: c.p,
        buttonText: "#ffffff",
        accent: c.p,
        border: "rgba(255, 255, 255, 0.4)"
      }
    });
  });

  // 16-20 Minimal
  const minimalColors = [
    { name: "Pure White", bg: "#ffffff", btn: "#000000" },
    { name: "Soft Gray", bg: "#f3f4f6", btn: "#374151" },
    { name: "Blush", bg: "#fff1f2", btn: "#be123c" },
    { name: "Mint", bg: "#ecfdf5", btn: "#047857" },
    { name: "Ice Blue", bg: "#f0f9ff", btn: "#0369a1" },
  ];
  minimalColors.forEach((c, i) => {
    templates.push({
      id: `template-${templates.length + 1}`,
      name: `Minimal ${c.name}`,
      category: "Minimal",
      styles: {
        background: c.bg,
        card: "transparent",
        textMain: "#111827",
        textSecondary: "#6b7280",
        buttonBg: c.btn,
        buttonText: "#ffffff",
        accent: c.btn,
        border: "transparent"
      }
    });
  });

  // 21-25 Bold
  const boldColors = [
    { name: "Cyber Yellow", bg: "#eab308", btn: "#000000", text: "#000000", card: "#fef08a" },
    { name: "Hot Pink", bg: "#ec4899", btn: "#ffffff", text: "#ffffff", card: "#f472b6" },
    { name: "Electric Blue", bg: "#3b82f6", btn: "#ffffff", text: "#ffffff", card: "#60a5fa" },
    { name: "Neon Green", bg: "#22c55e", btn: "#000000", text: "#000000", card: "#4ade80" },
    { name: "Bright Orange", bg: "#f97316", btn: "#ffffff", text: "#ffffff", card: "#fb923c" },
  ];
  boldColors.forEach((c, i) => {
    templates.push({
      id: `template-${templates.length + 1}`,
      name: `Bold ${c.name}`,
      category: "Bold",
      styles: {
        background: c.bg,
        card: c.card,
        textMain: c.text,
        textSecondary: c.btn === "#ffffff" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)",
        buttonBg: c.btn,
        buttonText: c.bg,
        accent: c.btn,
        border: c.btn
      }
    });
  });

  // Generate the rest programmatically to reach 50 based on categories
  let counter = 26;
  for (let cat of categories.slice(5)) {
    for (let i = 1; i <= 5; i++) {
      const hue = (counter * 37) % 360; // Spread colors nicely
      const isDark = cat === "Business" || cat === "Premium" && i % 2 === 0;
      
      let bg = isDark ? `hsl(${hue}, 20%, 15%)` : `hsl(${hue}, 30%, 95%)`;
      let card = isDark ? `hsl(${hue}, 25%, 20%)` : `hsl(${hue}, 0%, 100%)`;
      let textMain = isDark ? `hsl(${hue}, 10%, 95%)` : `hsl(${hue}, 40%, 15%)`;
      let textSec = isDark ? `hsl(${hue}, 10%, 70%)` : `hsl(${hue}, 20%, 45%)`;
      let btn = `hsl(${hue}, 80%, 45%)`;

      if (cat === "Premium") {
        btn = "linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7)";
        card = "linear-gradient(to bottom bottom, #ffffff, #fafafa)";
      } else if (cat === "Vibrant") {
        bg = `hsl(${hue}, 90%, 55%)`;
        card = `rgba(255,255,255,0.2)`;
        textMain = "#ffffff";
        textSec = "rgba(255,255,255,0.8)";
        btn = "#ffffff";
      }

      templates.push({
        id: `template-${counter}`,
        name: `${cat} ${i}`,
        category: cat,
        styles: {
          background: bg,
          card: card,
          textMain: textMain,
          textSecondary: textSec,
          buttonBg: btn,
          buttonText: cat === "Vibrant" ? `hsl(${hue}, 90%, 40%)` : "#ffffff",
          accent: btn,
          border: isDark ? `hsl(${hue}, 20%, 30%)` : `hsl(${hue}, 20%, 90%)`
        }
      });
      counter++;
    }
  }

  return templates;
};

export const ALL_TEMPLATES = generateTemplates();

export const getTemplateById = (id: string): Template => {
  return ALL_TEMPLATES.find(t => t.id === id) || ALL_TEMPLATES[0];
};
