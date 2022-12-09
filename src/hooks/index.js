import { useEffect } from "react";
import { useState } from "react"
import { api } from "../config"

const useFetch = (url, dataGet, setLoading) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        api.get(url).then(res => {
            if (dataGet) {
                setData(res.data.map(geted => { return dataGet(geted) }));
                setLoading(false)
            } else {
                setData(res.data)
                setLoading(false)
            }
        }).catch(error => {
            console.log(error);
        });
    }, []);

    return [data, setData];
}

export { useFetch };