import { Icon } from "@iconify/react"
import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import SubMenu from "./SubMenu";

function Menu(props) {
    const { menu, open, show, handleMenu, location } = props
    // state untuk mengaktifkan efek Menu ACTIVED
    const [actived, setActived] = useState(false);

    // state untuk button dropdown pada menu yang memiliki sub menu
    const [drop, setDrop] = useState(() => {
        if (menu.sub) {
            if (menu.sub.findIndex(subMenu => { return subMenu.sub }) !== -1) {
                return menu.sub.findIndex(subMenu => {
                    if (subMenu.sub) {
                        return subMenu.sub.findIndex(subSubMenu => { return subSubMenu.path === location.pathname }) !== -1
                    }
                    return subMenu.path === location.pathname
                }) !== -1;
            }
            return menu.sub.findIndex(subMenu => { return subMenu.path === location.pathname }) !== -1;
        }
        else {
            return false;
        }
    });

    // fungtion untuk toggle dropdown
    const handleDropDown = () => {
        if (!open && !drop) {
            handleMenu()
        }
        setDrop(!drop)
        if (menu.sub.findIndex(subMenu => { return subMenu.sub }) !== -1) {
            if (!(menu.sub.findIndex(subMenu => {
                if (subMenu.sub) {
                    return subMenu.sub.findIndex(subSubMenu => { return subSubMenu.path === location.pathname }) !== -1
                }
                return subMenu.path === location.pathname
            }) !== -1)) {
                setActived(!actived)
            }
        }
        else if (menu.sub.findIndex(subMenu => { return subMenu.path === location.pathname }) === -1) {
            setActived(!actived)
        }
    }

    useEffect(() => {
        setActived(() => {
            if (menu.sub) {
                if (menu.sub.findIndex(subMenu => { return subMenu.sub }) !== -1) {
                    return menu.sub.findIndex(subMenu => {
                        if (subMenu.sub) {
                            return subMenu.sub.findIndex(subSubMenu => { return subSubMenu.path === location.pathname }) !== -1
                        }
                        return subMenu.path === location.pathname
                    }) !== -1;
                }
                return menu.sub.findIndex(subMenu => { return subMenu.path === location.pathname }) !== -1;
            }
            else {
                return false;
            }
        });
        setDrop(() => {
            if (menu.sub) {
                if (menu.sub.findIndex(subMenu => { return subMenu.sub }) !== -1) {
                    return menu.sub.findIndex(subMenu => {
                        if (subMenu.sub) {
                            return subMenu.sub.findIndex(subSubMenu => { return subSubMenu.path === location.pathname }) !== -1
                        }
                        return subMenu.path === location.pathname
                    }) !== -1;
                }
                return menu.sub.findIndex(subMenu => { return subMenu.path === location.pathname }) !== -1;
            }
            else {
                return false;
            }
        })
    }, [location]);
    // VIEW yang akan di-RENDER
    if (menu.sub) {
        return (
            <div className="grid grid-cols-1">
                <button onClick={handleDropDown} className={` text-white text-opacity-60 hover:text-opacity-100`}>
                    <div className={`flex justify-between items-center pr-2 pl-4 py-3  ${open ? 'mr-4' : 'pr-4'} duration-300
                        ${actived && 'rounded-r-full bg-black bg-opacity-20'}`}>
                        <div className="flex items-center gap-x-3">
                            <Icon icon={menu.icon} className={`duration-300 
                            ${actived && ' text-gold'} ${show ? 'text-base' : 'text-xl'}`} />
                            <div className={`text-sm leading-none ${!show ? 'hidden' : ''} ${actived ? 'text-white ' : ''}`}>
                                {menu.title}
                            </div>
                        </div>
                        <Icon icon='akar-icons:chevron-right' className={`duration-300 text-xs 
                    ${!show && 'hidden'} ${drop && 'rotate-90'} ${actived && 'text-white'}`} />
                    </div>
                </button>
                {/* Dropdown */}
                <div className={` ${!show && 'hidden'} overflow-hidden duration-300 ${drop ? 'h-auto' : 'h-0'}`}>
                    {menu.sub.map((submenu, index) => (
                        <SubMenu key={index} open={open} show={show} menu={submenu} location={location} />
                    ))}
                </div>
            </div>
        )
    }
    else {
        return (
            <NavLink to={menu.path}>
                <div className={`flex gap-x-3 items-center pl-4 py-3 duration-300 hover:duration-75 text-white text-opacity-60 hover:text-opacity-100
                ${open ? 'mr-4' : 'pr-4'} 
                    ${location.pathname === menu.path && 'rounded-r-full bg-black bg-opacity-20'}`}>
                    <Icon icon={menu.icon} className={`duration-300 
                    ${show ? 'text-base' : 'text-xl'} ${location.pathname === menu.path && 'text-gold'}`} />
                    <span className={`text-sm leading-none  ${!show && 'hidden'}
                            ${location.pathname === menu.path && 'text-white'}`}>
                        {menu.title}
                    </span>
                </div>
            </NavLink>
        )
    }
}

export default Menu