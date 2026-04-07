import React, { useState, useEffect } from 'react'
import "./userdashboardheader.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { AiOutlineAppstoreAdd, AiOutlineSafety, AiOutlineSetting } from "react-icons/ai"
import { GrLineChart, GrTransaction } from "react-icons/gr"
import { FiAward, FiLogOut } from "react-icons/fi"
import { MdAddchart } from "react-icons/md"
import { FaRegChartBar } from 'react-icons/fa'
import { RiLockPasswordLine } from 'react-icons/ri'

const Userdashboardheader = ({ route }) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState()

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const getData = async () => {
                try {
                    const req = await fetch(`${route}/api/getData`, {
                        headers: { 'x-access-token': localStorage.getItem('token') }
                    })
                    const res = await req.json()
                    setUserData(res)
                } catch (e) {}
            }
            getData()
        } else {
            navigate('/login')
        }
    }, [])

    const navLinks = [
        { to: '/dashboard',     icon: <AiOutlineAppstoreAdd size={16} />, label: 'Home' },
        { to: '/traders',       icon: <MdAddchart size={16} />,           label: 'Copy Traders' },
        { to: '/usercopytrade', icon: <FaRegChartBar size={16} />,        label: 'Copy Trading' },
        { to: '/live-trading',  icon: <GrLineChart size={16} />,          label: 'Live Trading' },
        { to: '/transactions',  icon: <GrTransaction size={16} />,        label: 'Transactions' },
        { to: '/ranking',       icon: <FiAward size={16} />,              label: 'Plans' },
        { to: '/kyc',           icon: <AiOutlineSafety size={16} />,      label: 'KYC' },
        { to: '/settings',      icon: <AiOutlineSetting size={16} />,     label: 'Settings' },
        { to: '/passwordreset', icon: <RiLockPasswordLine size={16} />,   label: 'Reset Password' },
    ]

    return (
        <>
            {/* ── DESKTOP SIDEBAR ── */}
            <aside className="ud-sidebar">
                <div className="ud-sidebar-brand">
                    <img src="/saxomanagements%20logo5.png" alt="Saxo Managements" className="ud-brand-logo" />
                </div>
                <nav className="ud-nav">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) => `ud-nav-item${isActive ? ' active' : ''}`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <button className="ud-logout-btn" onClick={logout}>
                    <FiLogOut size={14} />
                    <span>Sign Out</span>
                </button>
            </aside>

            {/* ── MOBILE BOTTOM NAV ── */}
            <nav className="ud-bottom-nav">
                <NavLink to="/dashboard"    className={({ isActive }) => `ud-bottom-nav-item${isActive ? ' active' : ''}`}><AiOutlineAppstoreAdd size={20} />Home</NavLink>
                <NavLink to="/traders"      className={({ isActive }) => `ud-bottom-nav-item${isActive ? ' active' : ''}`}><MdAddchart size={20} />Traders</NavLink>
                <NavLink to="/transactions" className={({ isActive }) => `ud-bottom-nav-item${isActive ? ' active' : ''}`}><GrTransaction size={20} />History</NavLink>
                <NavLink to="/kyc"          className={({ isActive }) => `ud-bottom-nav-item${isActive ? ' active' : ''}`}><AiOutlineSafety size={20} />KYC</NavLink>
                <NavLink to="/settings"     className={({ isActive }) => `ud-bottom-nav-item${isActive ? ' active' : ''}`}><AiOutlineSetting size={20} />Settings</NavLink>
            </nav>
        </>
    )
}

export default Userdashboardheader
