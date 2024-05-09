import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <div className='flex justify-center max-w-[80%] m-auto'>
      {children}
    </div>
  );
};

export default Wrapper;
