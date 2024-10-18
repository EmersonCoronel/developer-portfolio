// figures.ts

export interface Option {
  label: string;
}

export interface Category {
  name: string;
  options: Option[];
}

export interface Figure {
  name: string;
  color: string;
  colorRGB: { r: number; g: number; b: number };
  image: string;
  categories: Category[];
}

export const figures: Figure[] = [
  {
    name: "Aristotle",
    color: "#ffffff", // White
    colorRGB: { r: 255, g: 255, b: 255 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/aristotle.jpg",
    categories: [
      {
        name: "Socratic Dialogues",
        options: [
          { label: "Happiness" },
          { label: "Friendship" },
          { label: "Courage" },
          { label: "Justice" },
        ],
      },
      {
        name: "Philosophical Teachings",
        options: [
          { label: "Ethics" },
          { label: "Logic" },
          { label: "Metaphysics" },
          { label: "Politics" },
        ],
      },
    ],
  },
  {
    name: "Albert Einstein",
    color: "#ADD8E6", // Light Blue
    colorRGB: { r: 173, g: 216, b: 230 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/einstein.jpg",
    categories: [
      {
        name: "Thought Experiments",
        options: [
          { label: "Relativity" },
          { label: "Time Dilation" },
          { label: "Twin Paradox" },
        ],
      },
      {
        name: "Physics Lessons",
        options: [
          { label: "General Relativity" },
          { label: "Quantum Mechanics" },
          { label: "Photoelectric Effect" },
        ],
      },
    ],
  },
  {
    name: "Leonardo da Vinci",
    color: "#C8A2C8", // Lavender
    colorRGB: { r: 200, g: 162, b: 200 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/davinci.jpeg",
    categories: [
      {
        name: "Creative Brainstorming",
        options: [
          { label: "Inventions" },
          { label: "Art Projects" },
          { label: "Flight Machines" },
        ],
      },
      {
        name: "Art Lessons",
        options: [
          { label: "Painting Techniques" },
          { label: "Anatomy" },
          { label: "Perspective Drawing" },
        ],
      },
    ],
  },
  {
    name: "Napoleon Bonaparte",
    color: "#FFC0CB", // Pink
    colorRGB: { r: 255, g: 192, b: 203 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/napoleon.jpg",
    categories: [
      {
        name: "Military Simulations",
        options: [
          { label: "Battle Strategies" },
          { label: "Leadership Challenges" },
        ],
      },
      {
        name: "Leadership Lessons",
        options: [
          { label: "Commanding Armies" },
          { label: "Political Strategy" },
        ],
      },
    ],
  },
  {
    name: "Cleopatra",
    color: "#C2B280", // Sandy color
    colorRGB: { r: 194, g: 178, b: 128 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/cleopatra.jpg",
    categories: [
      {
        name: "Role-Playing Diplomacy",
        options: [
          { label: "Negotiating Alliances" },
          { label: "Court Intrigues" },
        ],
      },
      {
        name: "History Lessons",
        options: [
          { label: "Ancient Egyptian Culture" },
          { label: "Governance" },
        ],
      },
    ],
  },
  {
    name: "Confucius",
    color: "#F0E68C", // Khaki
    colorRGB: { r: 240, g: 230, b: 140 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/confucius.jpg",
    categories: [
      {
        name: "Philosophical Discussions",
        options: [{ label: "Moral Dilemmas" }, { label: "Social Harmony" }],
      },
      {
        name: "Teachings",
        options: [{ label: "Ethics" }, { label: "The Five Relationships" }],
      },
    ],
  },
  {
    name: "Charles Darwin",
    color: "#98FF98", // Mint Green
    colorRGB: { r: 152, g: 255, b: 152 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/darwin.jpeg",
    categories: [
      {
        name: "Evolution & Biology",
        options: [
          { label: "Natural Selection" },
          { label: "The Origin of Species" },
        ],
      },
      {
        name: "Passion & Commitment",
        options: [
          { label: "Dedication to Discovery" },
          { label: "Overcoming Doubts & Challenges" },
        ],
      },
    ],
  },
  {
    name: "The Rebbe",
    color: "#E0E0E0",
    colorRGB: { r: 224, g: 224, b: 224 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/rebbe.jpeg",
    categories: [
      {
        name: "Spiritual Guidance",
        options: [
          { label: "Jewish Mysticism & Chassidism" },
          { label: "Faith & Overcoming Challenges" },
          { label: "Mitzvot & Daily Life" },
        ],
      },
      {
        name: "Leadership & Education",
        options: [
          { label: "The Power of Positive Influence" },
          { label: "Education & Community Building" },
          { label: "Finding Meaning in Every Moment" },
        ],
      },
    ],
  },
];

// Function to change primary color based on selected figure
export const changePrimaryColor = (figure: Figure) => {
  const { color, colorRGB } = figure;
  document.documentElement.style.setProperty("--primary-color", color);
  document.documentElement.style.setProperty(
    "--primary-color-r",
    colorRGB.r.toString(),
  );
  document.documentElement.style.setProperty(
    "--primary-color-g",
    colorRGB.g.toString(),
  );
  document.documentElement.style.setProperty(
    "--primary-color-b",
    colorRGB.b.toString(),
  );
};

export const resetPrimaryColor = () => {
  document.documentElement.style.setProperty("--primary-color", "#87ceeb");
  document.documentElement.style.setProperty("--primary-color-r", "135");
  document.documentElement.style.setProperty("--primary-color-g", "206");
  document.documentElement.style.setProperty("--primary-color-b", "235");
};

export const getModeForOption = (
  figureName: string,
  categoryName: string,
): string => {
  const modeMapping: { [key: string]: { [key: string]: string } } = {
    Aristotle: {
      "Socratic Dialogues": "socratic",
      "Philosophical Teachings": "teaching",
    },
    "Albert Einstein": {
      "Thought Experiments": "thought_experiment",
      "Physics Lessons": "lesson",
    },
    "Leonardo da Vinci": {
      "Creative Brainstorming": "brainstorm",
      "Art Lessons": "lesson",
    },
    "Napoleon Bonaparte": {
      "Military Simulations": "simulation",
      "Leadership Lessons": "lesson",
    },
    Cleopatra: {
      "Role-Playing Diplomacy": "role_play",
      "History Lessons": "lesson",
    },
    Confucius: {
      "Philosophical Discussions": "discussion",
      Teachings: "lesson",
    },
    "Charles Darwin": {
      "Evolution & Biology": "teaching",
      "Passion & Commitment": "discussion",
    },
    "The Rebbe": {
      "Spiritual Guidance": "guidance",
      "Leadership & Education": "teaching",
    },
    "David Bowie": {
      "Music & Legacy": "creative_discussion",
      "Cultural Impact": "creative_discussion",
      "Philosophy & Reflection": "philosophy",
    },
  };

  return modeMapping[figureName]?.[categoryName] || "normal";
};
