// src/components/Disclosure.tsx
import React, { useState } from 'react';

interface DisclosureProps {
  children: (open: boolean, toggle: () => void) => React.ReactNode;
}

const Disclosure: React.FC<DisclosureProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      {children(isOpen, toggle)}
    </>
  );
};

export default Disclosure;
