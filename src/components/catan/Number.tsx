import React from "react";
import Image from "next/image";
import styles from "./catan.module.css";

interface NumberProps {
  value: number;
}

const Number: React.FC<NumberProps> = ({ value }) => {
  const getImageForNumber = (num: number): string => {
    const imageMap: { [key: number]: string } = {
      2: "https://assets.emersoncoronel.com/images/catan/numbers/2.webp",
      3: "https://assets.emersoncoronel.com/images/catan/numbers/3.webp",
      4: "https://assets.emersoncoronel.com/images/catan/numbers/4.webp",
      5: "https://assets.emersoncoronel.com/images/catan/numbers/5.webp",
      6: "https://assets.emersoncoronel.com/images/catan/numbers/6.webp",
      8: "https://assets.emersoncoronel.com/images/catan/numbers/8.webp",
      9: "https://assets.emersoncoronel.com/images/catan/numbers/9.webp",
      10: "https://assets.emersoncoronel.com/images/catan/numbers/10.webp",
      11: "https://assets.emersoncoronel.com/images/catan/numbers/11.webp",
      12: "https://assets.emersoncoronel.com/images/catan/numbers/12.webp",
    };
    return imageMap[num] || "https://assets.emersoncoronel.com/images/catan/numbers/2.webp";
  };

  if (value === 0) {
    return null;
  }

  return (
    <div className={styles.numberContainer}>
      <Image
        src={getImageForNumber(value)}
        alt={`Number ${value}`}
        className={styles.numberImage}
        layout="responsive"
        width={1}
        height={1}
        priority={true}
      />
    </div>
  );
};

export default Number;
