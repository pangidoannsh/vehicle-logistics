import { useState, useEffect } from "react"
import { api } from "../config";

const useAuth = (setUser) => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        api.get("/cektoken").then(res => {
            setUser(res.data)
            setIsLogged(true);
        }).catch(error => {
            if (error.response.status === 401) {
                setIsLogged(false)
            }
        })
    }, [])

    return [isLogged, setIsLogged];
}

export default useAuth;