import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function SubMenu(props) {
    const { menu, open, show, location } = props
    const [actived, setActived] = useState(false);
    const [drop, setDrop] = useState(false);
    const handleDropDown = () => {
        setDrop(prev => !prev)
        if (menu.sub.findIndex(subMenu => subMenu.path === location.pathname) === -1) {
            setActived(prev => !prev)
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
    if (menu.sub) {
        return (
            <div className='grid grid-cols-1 px-2'>
                <button onClick={handleDropDown} className={`text-white hover:text-opacity-100
                    ${actived ? 'text-opacity-100' : 'text-opacity-60'} `}>
                    <div className={`flex justify-between items-center pl-4 py-3  ${open ? 'mr-4' : 'pr-4'}`}>
                        <div className="flex items-center gap-x-3">
                            <Icon icon={`${actived ? 'fluent:triangle-right-12-filled' : 'akar-icons:circle-fill'}`}
                                className={`${actived ? 'text-[6px]' : 'text-[4px]'} ${actived && 'text-gold'}`} />
                            <span className={`text-sm leading-none ${actived && 'text-white text-opacity-100'}`}>
                                {menu.title}
                            </span>
                        </div>
                        <Icon icon='akar-icons:chevron-right' className={`duration-300 text-xs 
                         ${drop && 'rotate-90'}`} />
                    </div>
                </button>
                <div className={`overflow-hidden duration-300`}
                    style={{ height: drop ? `${menu.sub.length * 38}px` : '0' }}>
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
                        ${location.pathname === menu.path ? 'text-gold' : ''}`} />
                    <span className={`text-sm leading-none ${!show ? 'hidden' : ''}
                    ${location.pathname === menu.path ? 'text-white text-opacity-100' : ''}`}>
                        {menu.title}
                    </span>
                </div>
            </NavLink>
        )
    }

}

export default SubMenu