import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function SubMenu(props) {
    const { menu, open, show, location } = props
    const [actived, setActived] = useState(() => {
        if (menu.sub) {
            return menu.sub.findIndex(subMenu => { return subMenu.path === location.pathname }) !== -1
        }
        else {
            return false;
        }
    });
    const [drop, setDrop] = useState(() => {
        if (menu.sub) {
            return menu.sub.findIndex(subMenu => { return subMenu.path === location.pathname }) !== -1
        }
        else {
            return false;
        }
    });
    const handleDropDown = () => {
        setDrop(!drop)
        if (menu.sub.findIndex(subMenu => { return subMenu.path === location.pathname }) === -1) {
            setActived(!actived)
        }
    }
    if (menu.sub) {
        return (
            <div className='grid grid-cols-1 px-2'>
                <button onClick={handleDropDown} className={`text-white text-opacity-60 hover:text-opacity-100`}>
                    <div className={`flex justify-between items-center pl-4 py-3  ${open ? 'mr-4' : 'pr-4'}`}>
                        <div className="flex items-center gap-x-3">
                            <Icon icon={`${actived ? 'fluent:triangle-right-12-filled' : 'akar-icons:circle-fill'}`}
                                className={`${actived ? 'text-[8px]' : 'text-[4px]'} ${actived && 'text-gold'}`} />
                            <span className={`text-sm leading-none
                            ${actived && 'text-white text-opacity-100'}`}>
                                {menu.title}
                            </span>
                        </div>
                        <Icon icon='akar-icons:chevron-right' className={`duration-300 text-xs 
                         ${drop && 'rotate-90'} ${actived && 'text-opacity-100'}`} />
                    </div>
                </button>
                <div className={`overflow-hidden duration-300 ${drop ? 'h-auto' : 'h-0'}`}>
                    {menu.sub.map((submenu, index) => (
                        <SubMenu key={index} open={open} show={show} menu={submenu} location={location} />
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <NavLink to={menu.path} className='px-2 block'>
                <div className={`flex gap-x-3 items-center pl-4 py-3  ${open ? 'mr-4' : 'pr-4'} 
                    text-white text-opacity-60 hover:text-opacity-100`}>
                    <Icon icon={`${location.pathname === menu.path ? 'fluent:triangle-right-12-filled' : 'akar-icons:circle-fill'}`}
                        className={`${location.pathname === menu.path ? 'text-[8px]' : 'text-[4px]'} 
                        ${location.pathname === menu.path && 'text-gold'}`} />
                    <span className={`text-sm leading-none ${!show && 'hidden'}
                    ${location.pathname === menu.path && 'text-white text-opacity-100'}`}>
                        {menu.title}
                    </span>
                </div>
            </NavLink>
        )
    }

}

export default SubMenu