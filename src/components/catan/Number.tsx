import React from 'react';

interface NumberProps {
  value: number;
}

const Number: React.FC<NumberProps> = ({ value }) => {
  const getImageForNumber = (num: number): string => {
    const imageMap: { [key: number]: string } = {
      2: '/images/catan/numbers/2.png',
      3: '/images/catan/numbers/3.png',
      4: '/images/catan/numbers/4.png',
      5: '/images/catan/numbers/5.png',
      6: '/images/catan/numbers/6.png',
      8: '/images/catan/numbers/8.png',
      9: '/images/catan/numbers/9.png',
      10: '/images/catan/numbers/10.png',
      11: '/images/catan/numbers/11.png',
      12: '/images/catan/numbers/12.png',
    };
    return imageMap[num] || '/images/catan/numbers/2.png';
  };

  if (value === 0) {
    return null;
  }

  return (
    <div className='number-container'>
      <img src={getImageForNumber(value)} alt={`Number ${value}`} className='number-image' />
    </div>
  );
};

export default Number;
