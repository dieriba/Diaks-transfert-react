import { stateContext } from "../../context/context-provider/contextProvider";
import { useContext } from "react";

const useGlobalContext = () => {
  return useContext(stateContext);
};

