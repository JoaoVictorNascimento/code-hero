import { renderHook, act, waitFor } from '@testing-library/react';
import useDebounce from './useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('should return the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initialValue', 300));
    
    expect(result.current).toBe('initialValue');
  });
  
  it('should return the updated value after the delay', async () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initialValue', delay: 300 },
    });
    
    expect(result.current).toBe('initialValue');
    
    act(() => {
      rerender({ value: 'updatedValue', delay: 300 });
    });
    
    await waitFor(() => {
      expect(result.current).toBe('updatedValue');
    });
  });
});