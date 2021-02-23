import {useState, useEffect} from 'react'

const useLocalStorage  = (key : string, init : any) =>{
    const [value, setValue] = useState(() => {
        const saved = window.localStorage.getItem(key);
        if (saved !== null) {
            return JSON.parse(saved);
        }
          return init;
        });
      
    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);
      
    return [value, setValue];
}

export default useLocalStorage;