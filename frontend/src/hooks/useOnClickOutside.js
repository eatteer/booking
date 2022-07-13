import { useEffect } from "react";

export const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
      // console.log('useEffect')
      //console.log(ref.current)
      const listener = (event) => {
        // console.log('listener')
        // console.log(ref.current)
        if (ref.current && !ref.current.contains(event.target)) {
          // console.log(ref.current.contains(event.target))
          // console.log(ref.current)
          // console.log(event.target)
          // console.log("You clicked outside of me!");
          handler(event);
        }
      };
      document.addEventListener("click", listener);
      return () => {
        document.removeEventListener("click", listener);
      };
    }, [ref, handler]);
}