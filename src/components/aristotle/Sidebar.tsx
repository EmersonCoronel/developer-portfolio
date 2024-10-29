import React from "react";
import { Figure } from "./figures";
import styles from "./aristotle.module.css";

interface SidebarProps {
  selectedFigure: Figure;
  setSelectedFigure: React.Dispatch<React.SetStateAction<Figure>>;
  figures: Figure[];
  categoriesWithActions: any[];
  startScenarioAdvice: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedFigure,
  setSelectedFigure,
  figures,
  categoriesWithActions,
  startScenarioAdvice,
}) => {
  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarHeading}>Select Figure</h3>
      <select
        value={selectedFigure.name}
        onChange={(e) => setSelectedFigure(figures.find((f) => f.name === e.target.value) || figures[0])}
        className={styles.selectInput}
      >
        {figures.map((figure) => (
          <option key={figure.name} value={figure.name}>
            {figure.name}
          </option>
        ))}
      </select>

      {categoriesWithActions.map((category: any, catIndex: number) => (
        <div key={catIndex}>
          <h3 className={styles.sidebarHeading}>{category.name}</h3>
          <ul className={styles.sidebarList}>
            {category.options.map((option: any, optIndex: number) => (
              <li key={optIndex} className={styles.sidebarListItem}>
                <button onClick={option.action} className={styles.sidebarButton}>
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h3 className={styles.sidebarHeading}>Scenario-Based Advice</h3>
      <button onClick={startScenarioAdvice} className={styles.sidebarButton}>
        Start Scenario Advice
      </button>
    </div>
  );
};

export default Sidebar;
