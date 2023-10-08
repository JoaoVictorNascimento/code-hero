import { act, renderHook } from '@testing-library/react';
import useIsCurrentScreenWidth from './useIsCurrentScreenWidth';

describe('useIsCurrentScreenWidth', () => {
  let mockWindowWidth: number;

  beforeAll(() => {
    mockWindowWidth = window.innerWidth;
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: mockWindowWidth,
    });
  });

  afterAll(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: mockWindowWidth,
    });
  });

  it('should return true when window.innerWidth matches the provided screenWidth', async () => {
    const { result } = renderHook(() => useIsCurrentScreenWidth(1024));

    expect(result.current).toBe(true);

    window.innerWidth = 1024;

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current).toBe(true);
  });

  it('should return false when window.innerWidth does not match the provided screenWidth', async () => {
    const { result } = renderHook(() => useIsCurrentScreenWidth(768));

    expect(result.current).toBe(false);

    window.innerWidth = 1024;

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current).toBe(false);
  });
});