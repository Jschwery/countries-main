import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useDark() {
  const [dark, setDark] = useLocalStorage('color-mode' ,'light');

  useEffect(()=>{
    const className = 'dark';
    const bodyClass = window.document.body.classList;
    dark === 'dark' ? bodyClass.add(className) : bodyClass.remove(className);
  }, [dark])
}
