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
    color: "#ffffff",
    colorRGB: { r: 255, g: 255, b: 255 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/aristotle.webp",
    categories: [
      {
        name: "Socratic Dialogues",
        options: [{ label: "Happiness" }, { label: "Friendship" }, { label: "Courage" }, { label: "Justice" }],
      },
      {
        name: "Philosophical Teachings",
        options: [{ label: "Ethics" }, { label: "Logic" }, { label: "Metaphysics" }, { label: "Politics" }],
      },
    ],
  },
  {
    name: "Albert Einstein",
    color: "#ADD8E6",
    colorRGB: { r: 173, g: 216, b: 230 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/einstein.webp",
    categories: [
      {
        name: "Thought Experiments",
        options: [{ label: "Relativity" }, { label: "Time Dilation" }, { label: "Twin Paradox" }],
      },
      {
        name: "Physics Lessons",
        options: [{ label: "General Relativity" }, { label: "Quantum Mechanics" }, { label: "Photoelectric Effect" }],
      },
    ],
  },
  {
    name: "Leonardo da Vinci",
    color: "#C8A2C8",
    colorRGB: { r: 200, g: 162, b: 200 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/davinci.webp",
    categories: [
      {
        name: "Creative Brainstorming",
        options: [{ label: "Inventions" }, { label: "Art Projects" }, { label: "Flight Machines" }],
      },
      {
        name: "Art Lessons",
        options: [{ label: "Painting Techniques" }, { label: "Anatomy" }, { label: "Perspective Drawing" }],
      },
    ],
  },
  {
    name: "Napoleon Bonaparte",
    color: "#FFC0CB",
    colorRGB: { r: 255, g: 192, b: 203 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/napoleon.webp",
    categories: [
      {
        name: "Military Simulations",
        options: [{ label: "Battle Strategies" }, { label: "Leadership Challenges" }],
      },
      {
        name: "Leadership Lessons",
        options: [{ label: "Commanding Armies" }, { label: "Political Strategy" }],
      },
    ],
  },
  {
    name: "Cleopatra",
    color: "#C2B280",
    colorRGB: { r: 194, g: 178, b: 128 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/cleopatra.webp",
    categories: [
      {
        name: "Role-Playing Diplomacy",
        options: [{ label: "Negotiating Alliances" }, { label: "Court Intrigues" }],
      },
      {
        name: "History Lessons",
        options: [{ label: "Ancient Egyptian Culture" }, { label: "Governance" }],
      },
    ],
  },
  {
    name: "Confucius",
    color: "#F0E68C", 
    colorRGB: { r: 240, g: 230, b: 140 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/confucius.webp",
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
    color: "#98FF98",
    colorRGB: { r: 152, g: 255, b: 152 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/darwin.webp",
    categories: [
      {
        name: "Evolution & Biology",
        options: [{ label: "Natural Selection" }, { label: "The Origin of Species" }],
      },
      {
        name: "Passion & Commitment",
        options: [{ label: "Dedication to Discovery" }, { label: "Overcoming Doubts & Challenges" }],
      },
    ],
  },
  {
    name: "The Rebbe",
    color: "#E0E0E0",
    colorRGB: { r: 224, g: 224, b: 224 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/rebbe.webp",
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
  {
    name: "J.R.R. Tolkien",
    color: "#70c1b3", 
    colorRGB: { r: 112, g: 193, b: 179 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/tolkien.webp",
    categories: [
      {
        name: "Creative Writing",
        options: [{ label: "World Building" }, { label: "Character Development" }, { label: "Mythology" }],
      },
      {
        name: "Literature Lessons",
        options: [{ label: "The Lord of the Rings" }, { label: "The Hobbit" }, { label: "Themes in Middle-earth" }],
      },
    ],
  },
  {
    name: "Mozart",
    color: "#FFD700", 
    colorRGB: { r: 255, g: 215, b: 0 },
    image: "https://assets.emersoncoronel.com/images/backgrounds/mozart.webp",
    categories: [
      {
        name: "Music Composition",
        options: [{ label: "Symphonies" }, { label: "Operas" }, { label: "Chamber Music" }],
      },
      {
        name: "Piano",
        options: [{ label: "Technique" }, { label: "Expressiveness" }, { label: "Improvisation" }],
      },
    ],
  },
];

// Function to change primary color based on selected figure
export const changePrimaryColor = (figure: Figure) => {
  const { color, colorRGB } = figure;
  document.documentElement.style.setProperty("--primary-color", color);
  document.documentElement.style.setProperty("--primary-color-r", colorRGB.r.toString());
  document.documentElement.style.setProperty("--primary-color-g", colorRGB.g.toString());
  document.documentElement.style.setProperty("--primary-color-b", colorRGB.b.toString());
};

export const resetPrimaryColor = () => {
  document.documentElement.style.setProperty("--primary-color", "#87ceeb");
  document.documentElement.style.setProperty("--primary-color-r", "135");
  document.documentElement.style.setProperty("--primary-color-g", "206");
  document.documentElement.style.setProperty("--primary-color-b", "235");
};

export const getModeForOption = (figureName: string, categoryName: string): string => {
  const modeMapping: { [key: string]: { [key: string]: string } } = {
    "Aristotle": {
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
    "Cleopatra": {
      "Role-Playing Diplomacy": "role_play",
      "History Lessons": "lesson",
    },
    "Confucius": {
      "Philosophical Discussions": "discussion",
      "Teachings": "lesson",
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
    "J.R.R. Tolkien": {
      "Creative Writing": "creative_discussion",
      "Literature Lessons": "lesson",
    },
    "Wolfgang Amadeus Mozart": {
      "Music Composition": "composition",
      "Piano Lessons": "lesson",
    },
  };

  return modeMapping[figureName]?.[categoryName] || "normal";
};
