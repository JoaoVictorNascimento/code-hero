import { renderHook } from '@testing-library/react';
import { PaginationProvider } from '../../providers/PaginationProvider/PaginationProvider';
import { usePaginationContext } from '../../providers/PaginationProvider/PaginationProvider';
import { ReactNode } from 'react';

type WrapperProps = {
  children: ReactNode;
};

describe('usePaginationContext', () => {
  it('should get the context', () => {
    const wrapper: React.FC<WrapperProps> = ({ children }: WrapperProps) => (
      <PaginationProvider>{children}</PaginationProvider>
    );

    const { result } = renderHook(() => usePaginationContext(), {
      wrapper,
    });

    expect(result.current).toBeDefined();
    expect(result.current.paginationState.currentPage).toBe(1);
  });
});