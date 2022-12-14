import { useEffect, useState } from "react";
import { api } from "../config"

const useFetch = ({ url, setLoading, howDataGet }) => {
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