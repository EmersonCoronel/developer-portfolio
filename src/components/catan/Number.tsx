import React from "react";
import Image from "next/image";

interface NumberProps {
  value: number;
}

const Number: React.FC<NumberProps> = ({ value }) => {
  const getImageForNumber = (num: number): string => {
    const imageMap: { [key: number]: string } = {
      2: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/2.png`,
      3: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/3.png`,
      4: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/4.png`,
      5: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/5.png`,
      6: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/6.png`,
      8: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/8.png`,
      9: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/9.png`,
      10: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/10.png`,
      11: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/11.png`,
      12: `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/12.png`,
    };
    return (
      imageMap[num] ||
      `${process.env.NEXT_PUBLIC_S3_URL}/images/catan/numbers/2.png`
    );
  };

  if (value === 0) {
    return null;
  }

  return (
    <div className="number-container">
      <Image
        src={getImageForNumber(value)}
        alt={`Number ${value}`}
        className="number-image"
        layout="responsive"
        width={1}
        height={1}
        priority={true}
      />
    </div>
  );
};

export default Number;
