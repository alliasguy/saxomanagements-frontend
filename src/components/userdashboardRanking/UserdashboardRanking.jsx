import React, { useState, useEffect } from 'react'
import './userdashboardranking.css'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'

const PLANS = [
  { id: 1, name: 'Starter Plan',  min: 100,   max: 10999,  minLabel: '$100',    maxLabel: '$10,999',  minOrder: '0.1 lots', maxOrder: '10 lots',  leverage: '1:20' },
  { id: 2, name: 'Medium Plan',   min: 11000, max: 20999,  minLabel: '$11,000', maxLabel: '$20,999',  minOrder: '0.1 lots', maxOrder: '15 lots',  leverage: '1:50',  featured: true },
  { id: 3, name: 'Diamond Plan',  min: 21000, max: 100000, minLabel: '$21,000', maxLabel: '$100,000', minOrder: '0.1 lots', maxOrder: '25 lots',  leverage: '1:100' },
]

const getCurrentPlan = (funded) => {
  if (!funded || funded < 100) return null
  if (funded >= 21000) return PLANS[2]
  if (funded >= 11000) return PLANS[1]
  return PLANS[0]
}

const UserdashboardRanking = ({ route }) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true)
        const token = localStorage.getItem('token')
        if (!token) { navigate('/login'); return }
        const data = await (await fetch(`${route}/api/getData`, {
          headers: { 'x-access-token': token, 'Content-Type': 'application/json' }
        })).json()
        if (data.status === 'error') { localStorage.removeItem('token'); navigate('/login') }
        else setUserData(data)
      } catch { navigate('/login') }
      finally { setLoader(false) }
    }
    getData()
  }, [navigate, route])

  const funded = userData ? Number(userData.funded) : 0
  const currentPlan = getCurrentPlan(funded)

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Ranking & Plans</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">
          <div className="udrk-wrap">

            {/* Section: Your Active Plan */}
            <div className="ud-section-header">
              <h2>Your Active Plan</h2>
              <p>Determined automatically by your total funded amount.</p>
            </div>

            {currentPlan ? (
              <div className="ud-card current-plan-card" style={{marginBottom:'28px'}}>
                <div className="current-plan-badge">Active Plan</div>
                <div className="current-plan-top">
                  <div>
                    <p className="current-plan-label">Plan</p>
                    <h2 className="current-plan-name">{currentPlan.name}</h2>
                  </div>
                  <div>
                    <p className="current-plan-label">Your Deposit</p>
                    <h2 className="current-plan-amount">${funded.toLocaleString()}</h2>
                  </div>
                </div>
                <div className="current-plan-details">
                  <div className="plan-detail-item">
                    <span className="plan-detail-label">Capital Range</span>
                    <span className="plan-detail-value">{currentPlan.minLabel} – {currentPlan.maxLabel}</span>
                  </div>
                  <div className="plan-detail-item">
                    <span className="plan-detail-label">Min Order</span>
                    <span className="plan-detail-value">{currentPlan.minOrder}</span>
                  </div>
                  <div className="plan-detail-item">
                    <span className="plan-detail-label">Max Order</span>
                    <span className="plan-detail-value">{currentPlan.maxOrder}</span>
                  </div>
                  <div className="plan-detail-item">
                    <span className="plan-detail-label">Leverage</span>
                    <span className="plan-detail-value">{currentPlan.leverage}</span>
                  </div>
                </div>
                {currentPlan.id < 3 && (
                  <button className="plan-upgrade-btn" onClick={() => navigate('/fundwallet')}>
                    Upgrade to {PLANS[currentPlan.id].name} →
                  </button>
                )}
              </div>
            ) : (
              <div className="ud-card no-plan-card" style={{marginBottom:'28px'}}>
                <div className="no-plan-icon">—</div>
                <h3>No Active Plan</h3>
                <p>You need a minimum deposit of <strong>$100</strong> to activate the Starter Plan and begin copy trading.</p>
                <button className="plan-upgrade-btn" onClick={() => navigate('/fundwallet')}>
                  Fund your account
                </button>
              </div>
            )}

            {/* Section: All Plans */}
            <div className="ud-section-header" style={{marginBottom:'16px'}}>
              <h2>Available Plans</h2>
              <p>Deposit the minimum amount for any plan to activate it automatically.</p>
            </div>

            <div className="all-plans-grid">
              {PLANS.map((plan) => {
                const isActive   = currentPlan && currentPlan.id === plan.id
                const isUnlocked = funded >= plan.min
                return (
                  <div
                    key={plan.id}
                    className={`plan-tier-card${plan.featured ? ' plan-tier-featured' : ''}${isActive ? ' plan-tier-active' : ''}`}
                  >
                    {plan.featured && !isActive && <span className="plan-tier-badge">Most Popular</span>}
                    {isActive && <span className="plan-tier-badge plan-tier-badge-active">Current Plan</span>}
                    <p className="plan-tier-name">{plan.name}</p>
                    <h2 className="plan-tier-price">{plan.minLabel}</h2>
                    <p className="plan-tier-range">up to {plan.maxLabel}</p>
                    <div className="plan-tier-features">
                      <div className="plan-tier-feature"><span className="plan-tier-dot" />Min order: {plan.minOrder}</div>
                      <div className="plan-tier-feature"><span className="plan-tier-dot" />Max order: {plan.maxOrder}</div>
                      <div className="plan-tier-feature"><span className="plan-tier-dot" />Leverage up to {plan.leverage}</div>
                    </div>
                    {isActive ? (
                      <button className="plan-tier-btn plan-tier-btn-active" disabled>Active</button>
                    ) : isUnlocked ? (
                      <button className="plan-tier-btn plan-tier-btn-active" disabled>Unlocked</button>
                    ) : (
                      <button className="plan-tier-btn" onClick={() => navigate('/fundwallet')}>
                        Deposit {plan.minLabel} to unlock
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserdashboardRanking
