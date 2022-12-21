import { useContext, useEffect, useState } from "react";
import { api, AuthContext } from "../config"

const useFetch = ({ url, setLoading, howDataGet }) => {
    const [isLogged, setIsLogged] = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const fetchData = () => {
        setLoading(true);
        api.get(url).then(res => {
            setData(res.data.map(data => {
                if (howDataGet) {
                    return howDataGet(data);
                }
                return data;
            }))
        }).catch(err => {
            if (err.code === "ERR_NETWORK") {
                setError(true);
            }
            if (err.response.status === 401) {
                localStorage.clear();
                setIsLogged(false);
            }
        }).finally(() => setLoading(false))
    }
    let mount = true;
    useEffect(() => {
        if (mount) fetchData();
        return () => {
            mount = false;
        }
    }, []);
    return [data, setData, fetchData, error, setError];
}

export default useFetch;