import React from 'react'

export const UserContext = React.createContext()

const User = (props) => {
    const user = {
        id: 1,
        name: "DEV",
        branch: "30000",
    }
    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    );
}

export default User;
