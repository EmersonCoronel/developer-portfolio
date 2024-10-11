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

// Define the figures array with all necessary data
export const figures: Figure[] = [
  {
    name: "Aristotle",
    color: "#ffffff", // White
    colorRGB: { r: 255, g: 255, b: 255 },
    image: "/images/backgrounds/aristotle.jpg",
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
    image: "/images/backgrounds/einstein.jpg",
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
    image: "/images/backgrounds/davinci.jpeg",
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
    image: "/images/backgrounds/napoleon.jpg",
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
    image: "/images/backgrounds/cleopatra.jpg",
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
    image: "/images/backgrounds/confucius.jpg",
    categories: [
      {
        name: "Philosophical Discussions",
        options: [
          { label: "Moral Dilemmas" },
          { label: "Social Harmony" },
        ],
      },
      {
        name: "Teachings",
        options: [
          { label: "Ethics" },
          { label: "The Five Relationships" },
        ],
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