import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

<<<<<<< HEAD
export function useDebounce(value, delay = 2000) {
=======
export function useDebounce(value, delay = 500) {
>>>>>>> 8af062c2114cfd4b949f1e5e99188f89825ff271
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
