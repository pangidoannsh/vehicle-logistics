import { api } from "../config";

const moneyFormat = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const fetchOption = (url, setOption) => {
    api.get(url).then(res => {
        setOption(res.data)
    }).catch(error => {
        console.log(error.response);
        if (error.code === "ERR_NETWORK") {
            alert('Periksa jaringan anda dan Reload Browser')
        }
    })
}

const unformat = x => {
    const temp = x.split(".");
    let result = ""
    temp.forEach(element => {
        result += element
    });
    return result
}
export { moneyFormat, fetchOption, unformat };