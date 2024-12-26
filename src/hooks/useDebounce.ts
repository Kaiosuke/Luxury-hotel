import { useEffect, useState } from "react";

interface IUseDebounce {
  value: string;
  delay: number;
}

const useDebounce = ({ value, delay }: IUseDebounce) => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handleDebounced = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => {
      clearTimeout(handleDebounced);
    };
  }, [value, delay]);
  return debounced;
};

export default useDebounce;
