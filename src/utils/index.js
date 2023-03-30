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

const dateDisplay = rawDate => {
    try {
        const date = rawDate.split(" ")[0].split("-").reverse();
        return `${date[0]}/${date[1]}/${date[2]}`;
    } catch (e) {
        return rawDate;
    }
}
export { moneyFormat, fetchOption, unformat, dateDisplay };
