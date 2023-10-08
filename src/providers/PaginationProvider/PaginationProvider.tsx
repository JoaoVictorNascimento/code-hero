import React, { createContext, useContext, useState, ReactNode } from 'react';
interface PaginationState {
  currentPage: number
}

interface PaginationContextProviderProps {
  children: ReactNode;
}

export type PaginationContextType = {
  paginationState: PaginationState;
  setPaginationState: React.Dispatch<React.SetStateAction<PaginationState>>;
};

export const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

export const PaginationProvider: React.FC<PaginationContextProviderProps> = ({ children }) => {
  const [paginationState, setPaginationState] = useState<PaginationState>({
    currentPage: 1
  });

  return (
    <PaginationContext.Provider value={{ paginationState, setPaginationState }}>
      {children}
    </PaginationContext.Provider>
  );
};

export const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePaginationContext deve ser usado dentro de um PaginationProvider');
  }
  return context;
};