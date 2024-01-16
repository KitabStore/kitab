import { createContext, useContext } from "react";
import { useState, useEffect } from "react";

const stateContext = createContext();

export const StateProvider = ({children}) => {
    
    const [signedIn, setSignedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('/api')
            .then(res => res.json())
            .then(data => {
                setSignedIn(data.logged);
                setLoading(false);
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <stateContext.Provider value={{loading, signedIn, setSignedIn}}>
            {children}
        </stateContext.Provider>
    )
}

export const useSignedIn = () => {
    return useContext(stateContext);
}