import React, { useState } from 'react'
import './userdashboardplans.css'
import { useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { FiArrowRight, FiChevronRight } from 'react-icons/fi'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'

const plans = [
  { id:1, type:'Starter Plan',     min:100,    max:4999,    percent:'20%', duration:'2 days',  color:'rgb(37,172,208)' },
  { id:2, type:'Gold Plan',        min:5000,   max:19999,   percent:'35%', duration:'4 days',  color:'rgb(255,180,0)' },
  { id:3, type:'Premium Plan',     min:20000,  max:49999,   percent:'50%', duration:'7 days',  color:'rgb(160,100,255)' },
  { id:4, type:'Diamond Plan',     min:50000,  max:99000,   percent:'65%', duration:'10 days', color:'rgb(72,199,130)' },
  { id:5, type:'VIP Plan',         min:100000, max:199999,  percent:'80%', duration:'12 days', color:'rgb(255,100,100)' },
  { id:6, type:'Real Estate Plan', min:200000, max:5000000, percent:'100%',duration:'14 days', color:'rgb(255,140,0)' },
]

const Toast = Swal.mixin({ toast:true, position:'top-end', showConfirmButton:false, timer:3000, timerProgressBar:true })

const Userdashboardplans = ({ route }) => {
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [activeMethod, setActiveMethod] = useState(null)
  const [amount, setAmount] = useState('')
  const [loader, setLoader] = useState(false)

  const invest = async () => {
    setLoader(true)
    try {
      const res = await (await fetch(`${route}/api/invest`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
        body: JSON.stringify({ amount: parseInt(amount), percent: activeMethod.percent, min: activeMethod.min, max: activeMethod.max, plan: activeMethod.type, duration: activeMethod.duration })
      })).json()
      if (res.status === 'ok') {
        Toast.fire({ icon:'success', title:`Investment of $${res.amount} successful` })
        navigate('/investments')
      } else {
        Toast.fire({ icon:'error', title: res.message || res.error || 'Something went wrong' })
      }
    } catch { Toast.fire({ icon:'error', title:'An error occurred' }) }
    finally { setLoader(false) }
  }

  const handleInvest = () => {
    const amt = parseInt(amount)
    if (isNaN(amt)) return Toast.fire({ icon:'error', title:'Amount must be a number' })
    if (amt < activeMethod.min) return Toast.fire({ icon:'error', title:`Minimum is $${activeMethod.min}` })
    if (amt > activeMethod.max) return Toast.fire({ icon:'error', title:`Maximum is $${activeMethod.max}` })
    invest()
  }

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Investment Plans</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">

          {/* Invest modal */}
          {showModal && activeMethod && (
            <div className="ud-modal-overlay">
              <div className="ud-modal">
                <button className="ud-modal-close" onClick={() => setShowModal(false)}><MdClose size={16} /></button>
                <p className="ud-modal-title">{activeMethod.type}</p>
                <p className="ud-modal-sub">Range: <strong>${activeMethod.min.toLocaleString()} – ${activeMethod.max.toLocaleString()}</strong></p>
                <div className="ud-amount-input-wrap">
                  <span className="ud-amount-prefix">$</span>
                  <input type="number" placeholder="0.00" className="ud-amount-input" onChange={e => setAmount(e.target.value)} />
                  <span className="ud-amount-suffix">USD</span>
                </div>
                <div className="ud-modal-actions">
                  <button className="ud-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="ud-btn-primary" onClick={handleInvest}>Invest <FiChevronRight /></button>
                </div>
              </div>
            </div>
          )}

          <div className="ud-section-header">
            <h2>Choose a Plan</h2>
            <p>Select an investment plan to start earning</p>
          </div>

          <div className="udp-grid">
            {plans.map(plan => (
              <div className="udp-card ud-card" key={plan.id} style={{'--plan-color': plan.color}}>
                <div className="udp-card-top">
                  <div className="udp-plan-dot" />
                  <p className="udp-plan-type">{plan.type}</p>
                </div>
                <div className="udp-return">
                  <span className="udp-return-value">{plan.percent}</span>
                  <span className="udp-return-label">daily return</span>
                </div>
                <div className="udp-details">
                  <div className="udp-detail"><span>Min</span><strong>${plan.min.toLocaleString()}</strong></div>
                  <div className="udp-detail"><span>Max</span><strong>${plan.max.toLocaleString()}</strong></div>
                  <div className="udp-detail"><span>Duration</span><strong>{plan.duration}</strong></div>
                  <div className="udp-detail"><span>Referral</span><strong>10%</strong></div>
                </div>
                <button className="udp-invest-btn" onClick={() => { setActiveMethod(plan); setShowModal(true) }}>
                  Choose Plan <FiArrowRight />
                </button>
              </div>
            ))}
          </div>

          <button className="udf-history-link" onClick={() => navigate('/investments')}>
            View investment history <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Userdashboardplans
