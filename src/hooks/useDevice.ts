import { useContext } from "react";
import { WebContext } from "contexts/web/WebContext";

const useDevice = () => useContext(WebContext)

export default useDevice