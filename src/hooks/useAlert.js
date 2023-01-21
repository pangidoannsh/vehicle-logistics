import { useState } from "react";

const useAlert = () => {
    const [alert, setAlert] = useState({
        isActived: false,
        code: 0,
        title: "title",
        message: "message"
    });

    const handleSetAlert = (props) => {
        setAlert(current => ({ ...current, ...props }))
    }
    return [alert, handleSetAlert];
}

export default useAlert;