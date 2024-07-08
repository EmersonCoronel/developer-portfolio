import React from 'react';
import Header from '../components/Header';
import Board from '../components/catan/Board';

const Catan: React.FC = () => {
  return (
    <div>
      <Header />
      <Board expansion={false} />
    </div>
  );
};

export default Catan;
