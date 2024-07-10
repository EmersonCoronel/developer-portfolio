import React from 'react';

interface NumberProps {
  value: number;
}

const CNumber: React.FC<NumberProps> = ({ value }) => {
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
    return imageMap[num] || '/images/catan/numbers/12.png';
  };

  if (value === 0) {
    return null;
  }

  return (
    <div className={'catan-number'}>
      <img src={getImageForNumber(value)} alt={`Number ${value}`} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default CNumber;
