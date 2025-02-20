import { useEffect, useState } from "react";

interface IUseDebounce {
  value: string;
}

const useDebounce = ({ value }: IUseDebounce) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const handleDebounced = setTimeout(() => {
      setDebounced(value);
    }, 400);

    return () => {
      clearTimeout(handleDebounced);
    };
  }, [value, 400]);
  return debounced;
};

export default useDebounce;
