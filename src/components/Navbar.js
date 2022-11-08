import { VehicleLogo } from "../assets"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SlideButton from "./SlideButton";
import Menu from "./menus/Menu";

// Data Menus
import { dashboard, generalData, application, report, administrator } from './menus/ListMenu'

function Navbar() {
    const storage = window.sessionStorage;

    const [open, setOpen] = useState(() => {
        if (storage.getItem('isOpen')) {
            if (storage.getItem('isOpen') === '1') {
                return true;
            }
            return false
        }
        storage.setItem('isOpen', '1');
        return true
    });
    const [show, setShow] = useState(() => {
        if (storage.getItem('isOpen')) {
            if (storage.getItem('isOpen') === '1') {
                return true;
            }
            return false
        }
        storage.setItem('isOpen', '1');
        return true
    });

    let location = useLocation()

    // Home
    const BaseMenu = {
        title: 'Dashboard',
        path: '/',
        icon: 'ic:baseline-dashboard'
    }
    const handleSlider = () => {
        if (open) {
            storage.setItem('isOpen', '0')
        } else {
            storage.setItem('isOpen', '1')
        }
        setOpen(!open);
        if (!show) {
            setTimeout(() => {
                setShow(!show)
            }, 300);
        } else {
            setShow(!show)
        }
    }
    const handleOnClickMenu = () => {
        setOpen(true)
        setTimeout(() => {
            setShow(true)
        }, 300);
    }
    return (
        <div className={` ${open ? 'w-[230px]' : 'w-16'} bg-dark-green h-screen duration-500`}>
            {/* Head */}
            <div className="bg-black bg-opacity-20 h-[72px]">
                <div className={`fixed top-5 z-10 duration-500 ${open ? 'left-4' : 'left-20'}`}>
                    <img src={VehicleLogo} className={`w-[100px]`} />
                </div>
                <SlideButton handleClick={handleSlider} isOpen={open} />
            </div>
            {/* Body */}
            <div id="navbar-menu" className="h-[90%] overflow-y-scroll">
                {/* Base */}
                <div className="mb-6 grid gap-y-2 mt-3">
                    <Menu open={open} show={show} handleMenu={handleOnClickMenu} menu={BaseMenu} location={location} />
                </div>
                {/* Group Menu : DASHBOARD */}
                <div className={`px-4 mb-3 `}>
                    <h3 className={`uppercase text-gold text-xs ${!show && 'hidden'}`}>Dashboard</h3>
                </div>
                <div className="mb-6 grid gap-y-2">
                    {dashboard.map((menu, index) => (
                        <Menu key={index} open={open} show={show} handleMenu={handleOnClickMenu} menu={menu} location={location} />
                    ))}
                </div>
                {/* Group Menu : GENERAL DATA */}
                <div className={`px-4 mb-3 `}>
                    <h3 className={`uppercase text-gold text-xs ${!show && 'hidden'}`}>General Data</h3>
                </div>
                <div className="mb-6 grid gap-y-2">
                    {generalData.map((menu, index) => (
                        <Menu key={index} open={open} show={show} handleMenu={handleOnClickMenu} menu={menu} location={location} />
                    ))}
                </div>
                {/* Group Menu : APPLICATION */}
                <div className={`px-4 mb-3 `}>
                    <h3 className={`uppercase text-gold text-xs ${!show && 'hidden'}`}>application</h3>
                </div>
                <div className="mb-6 grid gap-y-2">
                    {application.map((menu, index) => (
                        <Menu key={index} open={open} show={show} handleMenu={handleOnClickMenu} menu={menu} location={location} />
                    ))}
                </div>
                {/* Group Menu : REPORT */}
                <div className={`px-4 mb-3 `}>
                    <h3 className={`uppercase text-gold text-xs ${!show && 'hidden'}`}>Report</h3>
                </div>
                <div className="mb-6 grid gap-y-2">
                    {report.map((menu, index) => (
                        <Menu key={index} open={open} show={show} handleMenu={handleOnClickMenu} menu={menu} location={location} />
                    ))}
                </div>
                {/* Group Menu : ADMINISTRATOR */}
                <div className={`px-4 mb-3 `}>
                    <h3 className={`uppercase text-gold text-xs ${!show && 'hidden'}`}>administrator</h3>
                </div>
                <div className="mb-6 grid gap-y-2">
                    {administrator.map((menu, index) => (
                        <Menu key={index} open={open} show={show} handleMenu={handleOnClickMenu} menu={menu} location={location} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Navbar