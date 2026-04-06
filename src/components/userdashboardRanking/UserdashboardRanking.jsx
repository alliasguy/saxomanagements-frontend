import React from 'react'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Loader from '../Loader'
import { useState, useEffect } from 'react'
import { FaUserAlt, FaAngleDown } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import './userdashboardranking.css'
import MobileDropdown from '../MobileDropdown'

const PLANS = [
  {
    id: 1,
    name: 'Starter Plan',
    min: 3000,
    max: 10999,
    minLabel: '$3,000',
    maxLabel: '$10,999',
    minOrder: '0.1 lots',
    maxOrder: '10 lots',
    leverage: '1:20',
  },
  {
    id: 2,
    name: 'Medium Plan',
    min: 11000,
    max: 20999,
    minLabel: '$11,000',
    maxLabel: '$20,999',
    minOrder: '0.1 lots',
    maxOrder: '15 lots',
    leverage: '1:50',
    featured: true,
  },
  {
    id: 3,
    name: 'Diamond Plan',
    min: 21000,
    max: 100000,
    minLabel: '$21,000',
    maxLabel: '$100,000',
    minOrder: '0.1 lots',
    maxOrder: '25 lots',
    leverage: '1:100',
  },
]

const getCurrentPlan = (funded) => {
  if (!funded || funded < 3000) return null
  if (funded >= 21000) return PLANS[2]
  if (funded >= 11000) return PLANS[1]
  return PLANS[0]
}

const UserdashboardRanking = ({route}) => {
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)
  const [showMobileDropdown, setShowMobileDropdown] = useState(false)
  const navigate = useNavigate()

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
        console.error('Error fetching user data:', error)
        navigate('/login')
      } finally {
        setLoader(false)
      }
    }
    getData()
  }, [navigate, route])

  const closeMobileMenu = () => setShowMobileDropdown(false)

  const funded = userData ? Number(userData.funded) : 0
  const currentPlan = getCurrentPlan(funded)

  return (
    <main className='homewrapper'>
      {loader && <Loader />}
      <Userdashboardheader />
      <section className='dashboardhomepage'>
        <div className="dashboardheaderwrapper">
          <div className="header-notification-icon-container"><IoMdNotifications /></div>
          <div className="header-username-container">
            <h3>Hi, {userData ? userData.firstname : ''}</h3>
          </div>
          <div className="header-userprofile-container">
            <div className="user-p-icon-container"><FaUserAlt /></div>
            <div className="user-p-drop-icon" onClick={() => setShowMobileDropdown(!showMobileDropdown)}>
              <FaAngleDown />
            </div>
            <MobileDropdown showStatus={showMobileDropdown} route={route} closeMenu={closeMobileMenu} />
          </div>
        </div>

        {/* Current Plan */}
        <div className="plans-page-section">
          <div className="plans-page-header">
            <h1>Your current <span className="highlight">Plan</span></h1>
            <p>Your active investment plan is determined by your total funded amount.</p>
          </div>

          {currentPlan ? (
            <div className="current-plan-card">
              <div className="current-plan-badge">Active Plan</div>
              <div className="current-plan-top">
                <div>
                  <p className="current-plan-label">Plan</p>
                  <h2 className="current-plan-name">{currentPlan.name}</h2>
                </div>
                <div className="current-plan-deposit">
                  <p className="current-plan-label">Your deposit</p>
                  <h2 className="current-plan-amount">${funded.toLocaleString()}</h2>
                </div>
              </div>
              <div className="current-plan-details">
                <div className="plan-detail-item">
                  <span className="plan-detail-label">Capital range</span>
                  <span className="plan-detail-value">{currentPlan.minLabel} – {currentPlan.maxLabel}</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-label">Min order</span>
                  <span className="plan-detail-value">{currentPlan.minOrder}</span>
                </div>
                <div className="plan-detail-item">
                  <span className="plan-detail-label">Max order</span>
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
            <div className="no-plan-card">
              <div className="no-plan-icon">—</div>
              <h3>No active plan</h3>
              <p>You need a minimum deposit of <strong>$3,000</strong> to activate your Starter Plan and begin copy trading.</p>
              <button className="plan-upgrade-btn" onClick={() => navigate('/fundwallet')}>
                Fund your account
              </button>
            </div>
          )}

          {/* All Plans */}
          <div className="plans-page-header" style={{marginTop: '48px'}}>
            <h1>Available <span className="highlight">Plans</span></h1>
            <p>Deposit the minimum amount for any plan to activate it automatically.</p>
          </div>

          <div className="all-plans-grid">
            {PLANS.map((plan) => {
              const isActive = currentPlan && currentPlan.id === plan.id
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
                    <div className="plan-tier-feature">
                      <span className="plan-tier-dot"></span>
                      <span>Min order: {plan.minOrder}</span>
                    </div>
                    <div className="plan-tier-feature">
                      <span className="plan-tier-dot"></span>
                      <span>Max order: {plan.maxOrder}</span>
                    </div>
                    <div className="plan-tier-feature">
                      <span className="plan-tier-dot"></span>
                      <span>Leverage up to {plan.leverage}</span>
                    </div>
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
      </section>
    </main>
  )
}

export default UserdashboardRanking
