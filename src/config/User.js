import React from 'react'

export const UserContext = React.createContext()

const User = (props) => {
    const user = {
        id: null,
        name: "",
        branch: "",
    }
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}

export default User;
