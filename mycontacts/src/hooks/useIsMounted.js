import { useEffect, useCallback } from 'react';
import { useRef } from 'react';

export default function useIsMounted() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  const getIsMounted = useCallback(() => isMounted.current, []);

  return getIsMounted;
}
