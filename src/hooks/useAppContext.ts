import AppContext from "@/context/AppContext";
import { useContext } from "react";

const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("Error context");
  }
  return context;
};

export default useAppContext;
