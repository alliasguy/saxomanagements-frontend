import React from 'react'
import './userdashboardhomepage.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { IoMdNotifications } from "react-icons/io"
import { FaUserAlt } from "react-icons/fa"
import { IoCloseSharp } from "react-icons/io5"
import { RiLuggageDepositLine } from "react-icons/ri"
import { BiMoneyWithdraw } from "react-icons/bi"
import { MdCandlestickChart } from "react-icons/md"
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import TeslaWidget from '../TeslaWidget'

const Userdashboardhomepage = ({ route }) => {
    const navigate = useNavigate()
    const [userData, setUserData] = useState()
    const [loader, setLoader] = useState(false)
    const [showNotification, setShowNotification] = useState(true)
    const [dailyTrades, setDailyTrades] = useState([])
    const today = new Date().toLocaleDateString()

    useEffect(() => {
        const getData = async () => {
            try {
                setLoader(true)
                const token = localStorage.getItem('token')
                if (!token) { navigate('/login'); return }
                const response = await fetch(`${route}/api/getData`, {
                    headers: { 'x-access-token': token, 'Content-Type': 'application/json' },
                })
                const data = await response.json()
                if (data.status === 'error') {
                    localStorage.removeItem('token')
                    navigate('/login')
                } else {
                    setUserData(data)
                }
            } catch (error) {
                navigate('/login')
            } finally {
                setLoader(false)
            }
        }
        getData()
    }, [navigate, route])

    useEffect(() => {
        if (userData?.trades?.length > 0) {
            setDailyTrades(userData.trades.filter(t => t.date === today))
        }
    }, [userData])

    const getPlan = (funded) => {
        if (funded >= 21000) return { name: 'Diamond Plan', range: '$21,000 – $100,000', leverage: '1:100' }
        if (funded >= 11000) return { name: 'Medium Plan',  range: '$11,000 – $20,999', leverage: '1:50' }
        return { name: 'Starter Plan', range: '$100 – $10,999', leverage: '1:20' }
    }

    return (
        <div className="ud-layout">
            {loader && <Loader />}
            <Userdashboardheader route={route} />

            <div className="ud-main">
                {/* TOPBAR */}
                <header className="ud-topbar">
                    <div className="ud-topbar-left">
                        <p className="ud-greeting">
                            Hi, <span>{userData?.firstname || '—'}</span>
                        </p>
                    </div>
                    <div className="ud-topbar-right">
                        <div className="ud-notif-btn">
                            <IoMdNotifications />
                            {showNotification && userData?.funded === 0 && <span className="ud-notif-dot" />}
                        </div>
                        <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
                    </div>
                </header>

                {/* CONTENT */}
                <div className="ud-content">
                    {/* Deposit nudge */}
                    {showNotification && userData?.funded === 0 && (
                        <div className="ud-notice">
                            <span>No deposit yet — <Link to="/fundwallet">Make your first deposit →</Link></span>
                            <div className="ud-notice-close-wrap">
                                <button className="ud-notice-close" onClick={() => setShowNotification(false)}>
                                    <span className="ud-notice-close-icon"><IoCloseSharp /></span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ── BALANCE HERO ── */}
                    <div className="udh-hero">
                        <div className="udh-balance-block">
                            <p className="udh-balance-label">Total Balance</p>
                            <div className="udh-balance-amount">
                                <span className="udh-amount-value">${userData?.funded?.toLocaleString() || '0'}</span>
                                <span className="udh-currency-tag">USD</span>
                            </div>
                        </div>
                        <div className="udh-action-row">
                            <Link to="/fundwallet" className="ud-btn-primary">Deposit</Link>
                            <Link to="/withdraw"   className="ud-btn-ghost">Withdraw</Link>
                        </div>
                    </div>

                    {/* ── STATS ROW ── */}
                    <div className="udh-stats-row">
                        <div className="ud-card udh-stat-card">
                            <div className="udh-stat-icon deposit-icon"><RiLuggageDepositLine /></div>
                            <div>
                                <p className="udh-stat-label">Total Deposit</p>
                                <p className="udh-stat-value">${userData?.totaldeposit?.toLocaleString() || '0'}</p>
                            </div>
                        </div>
                        <div className="ud-card udh-stat-card">
                            <div className="udh-stat-icon withdraw-icon"><BiMoneyWithdraw /></div>
                            <div>
                                <p className="udh-stat-label">Total Withdrawal</p>
                                <p className="udh-stat-value">${userData?.totalwithdraw?.toLocaleString() || '0'}</p>
                            </div>
                        </div>
                    </div>

                    {/* ── CHART ── */}
                    <div className="ud-card udh-chart-card">
                        <TeslaWidget />
                    </div>

                    {/* ── CURRENT PLAN ── */}
                    <div className="udh-plan-section">
                        <div className="ud-section-header">
                            <h2>Current Plan</h2>
                            <p>Your active trading plan based on balance</p>
                        </div>
                        {userData && userData.funded >= 100 ? (() => {
                            const plan = getPlan(userData.funded)
                            return (
                                <div className="ud-card udh-plan-card">
                                    <div className="udh-plan-badge"><MdCandlestickChart /> Active</div>
                                    <h3 className="udh-plan-name">{plan.name}</h3>
                                    <div className="udh-plan-stats">
                                        <div className="udh-plan-stat">
                                            <span className="udh-plan-stat-label">Capital Range</span>
                                            <span className="udh-plan-stat-value">{plan.range}</span>
                                        </div>
                                        <div className="udh-plan-stat">
                                            <span className="udh-plan-stat-label">Leverage</span>
                                            <span className="udh-plan-stat-value">{plan.leverage}</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })() : (
                            <div className="ud-card udh-plan-card udh-plan-inactive">
                                <p className="udh-plan-inactive-title">No Active Plan</p>
                                <p className="udh-plan-inactive-sub">
                                    Deposit a minimum of <strong>$100</strong> to activate your Starter Plan.
                                </p>
                                <Link to="/fundwallet" className="ud-btn-primary" style={{ marginTop: '16px' }}>Deposit Now</Link>
                            </div>
                        )}
                    </div>

                    {/* ── DAILY TRADES ── */}
                    <div className="udh-trades-section">
                        <div className="ud-section-header">
                            <h2>Today's Trades</h2>
                            <p>{today}</p>
                        </div>
                        {dailyTrades.length > 0 ? (
                            <div className="ud-table-wrap">
                                <table className="ud-table">
                                    <thead>
                                        <tr>
                                            <th>Pair</th>
                                            <th>Amount</th>
                                            <th>Type</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dailyTrades.map((trade, i) => (
                                            <tr key={i}>
                                                <td>{trade.pair}</td>
                                                <td>${trade.amount} USD</td>
                                                <td>
                                                    <span className={`ud-badge ${trade.tradeType === 'profit' ? 'ud-badge-profit' : 'ud-badge-loss'}`}>
                                                        {trade.tradeType}
                                                    </span>
                                                </td>
                                                <td>{trade.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="ud-empty">
                                <p>Your trader has not placed any trades today. Check back later.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userdashboardhomepage
