import { useEffect } from "react";

export function useKey(key, action) {
     useEffect(() => {
          function callback(e) {

            if(e.code.toLowerCase() === key.toLowerCase()){
              action();
            }
          }
          document.addEventListener('keydown',callback)
          return function (params) {
            document.removeEventListener('keydown' , callback);
          }
        },[action,key]);
}
