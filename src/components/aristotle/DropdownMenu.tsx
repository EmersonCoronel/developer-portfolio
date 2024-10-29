import React from "react";
import { Figure } from "./figures";
import styles from "./aristotle.module.css";

interface DropdownMenuProps {
  isOpen: boolean;
  toggleOpen: () => void;
  selectedFigure: Figure;
  setSelectedFigure: React.Dispatch<React.SetStateAction<Figure>>;
  figures: Figure[];
  categoriesWithActions: any[];
  startScenarioAdvice: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  isOpen,
  toggleOpen,
  selectedFigure,
  setSelectedFigure,
  figures,
  categoriesWithActions,
  startScenarioAdvice,
}) => {
  return (
    <div className={styles.dropdownContainer}>
      <button className={styles.dropdownButton} onClick={toggleOpen}>
        {selectedFigure.name}
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {/* Figure Selection */}
          <h3 className={styles.dropdownHeading}>Select Figure</h3>
          <select
            value={selectedFigure.name}
            onChange={(e) =>
              setSelectedFigure(figures.find((f) => f.name === e.target.value) || figures[0])
            }
            className={styles.selectInput}
          >
            {figures.map((figure) => (
              <option key={figure.name} value={figure.name}>
                {figure.name}
              </option>
            ))}
          </select>

          {/* Figure-specific options */}
          {categoriesWithActions.map((category: any, catIndex: number) => (
            <div key={catIndex}>
              <h3 className={styles.dropdownHeading}>{category.name}</h3>
              <ul className={styles.dropdownList}>
                {category.options.map((option: any, optIndex: number) => (
                  <li key={optIndex} className={styles.dropdownListItem}>
                    <button
                      onClick={option.action}
                      className={styles.dropdownContentButton}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Scenario-Based Advice */}
          <h3 className={styles.dropdownHeading}>Scenario-Based Advice</h3>
          <button onClick={startScenarioAdvice} className={styles.dropdownContentButton}>
            Start Scenario Advice
          </button>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
