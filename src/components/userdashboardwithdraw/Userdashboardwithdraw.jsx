import React, { useState, useEffect } from 'react'
import './userdashboardwithdraw.css'
import { useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { FiArrowRight, FiChevronRight } from 'react-icons/fi'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import WithdrawReview from '../WithdrawReview'

const withdrawMethods = [
  { id:1, image:'/btc.png',     method:'BTC',            min:1 },
  { id:2, image:'/etherium.png',method:'ETH',            min:10 },
  { id:3, image:'/tron.png',    method:'Tether (TRC-20)',min:1 },
  { id:4, image:'/solana.png',  method:'Solana (SOL)',   min:1 },
]

const Toast = Swal.mixin({ toast:true, position:'top-end', showConfirmButton:false, timer:3000, timerProgressBar:true })

const Userdashboardwithdraw = ({ route }) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState()
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [activeMethod, setActiveMethod] = useState(null)
  const [checkoutPage, setCheckoutPage] = useState(false)

  useEffect(() => {
    setLoader(true)
    if (localStorage.getItem('token')) {
      const getData = async () => {
        const req = await fetch(`${route}/api/getData`, {
          headers: { 'x-access-token': localStorage.getItem('token') }
        })
        const res = await req.json()
        setUserData(res)
        if (res.status === 'error') navigate('/login')
        setLoader(false)
      }
      getData()
    } else {
      navigate('/login')
    }
  }, [])

  const handleSelectMethod = (method) => {
    setSelectedCrypto(withdrawMethods.find(o => o.method === method) || null)
  }

  const handleNext = () => {
    const amt = parseInt(withdrawAmount)
    if (isNaN(amt)) return Toast.fire({ icon:'warning', title:'Amount must be a number' })
    if (amt < activeMethod.min) return Toast.fire({ icon:'warning', title:`Minimum withdrawal is $${activeMethod.min}` })
    setCheckoutPage(true)
  }

  if (checkoutPage) {
    return <WithdrawReview Active={activeMethod} withdrawAmount={parseInt(withdrawAmount)} closepage={() => setCheckoutPage(false)} route={route} funded={userData?.funded} />
  }

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Withdraw</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">

          {showModal && activeMethod && (
            <div className="ud-modal-overlay">
              <div className="ud-modal">
                <button className="ud-modal-close" onClick={() => setShowModal(false)}><MdClose size={16} /></button>
                <p className="ud-modal-title">Withdraw via {activeMethod.method}</p>
                <p className="ud-modal-sub">Minimum: <strong>${activeMethod.min}</strong></p>
                <div className="ud-amount-input-wrap">
                  <span className="ud-amount-prefix">$</span>
                  <input type="number" placeholder="0.00" className="ud-amount-input" onChange={e => setWithdrawAmount(e.target.value)} />
                  <span className="ud-amount-suffix">USD</span>
                </div>
                <div className="ud-modal-actions">
                  <button className="ud-btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
                  <button className="ud-btn-primary" onClick={handleNext}>Continue <FiChevronRight /></button>
                </div>
              </div>
            </div>
          )}

          <div className="ud-section-header">
            <h2>Withdrawal Methods</h2>
            <p>Select a cryptocurrency to withdraw your funds</p>
          </div>

          <div className="udf-container">
            <div className="ud-form-field">
              <label>Select Cryptocurrency</label>
              <select className="ud-form-select" defaultValue="" onChange={e => handleSelectMethod(e.target.value)}>
                <option value="" disabled>Choose a method…</option>
                {withdrawMethods.map(opt => (
                  <option key={opt.id} value={opt.method}>{opt.method}</option>
                ))}
              </select>
            </div>

            {selectedCrypto && (
              <div className="ud-card udf-method-card">
                <div className="udf-method-header">
                  <img src={selectedCrypto.image} alt={selectedCrypto.method} className="udf-coin-img" />
                  <div>
                    <p className="udf-method-name">{selectedCrypto.method}</p>
                    <p className="udf-method-min">Min withdrawal: ${selectedCrypto.min}</p>
                  </div>
                </div>
                <button className="ud-btn-primary" style={{width:'100%', justifyContent:'center', marginTop:'8px'}} onClick={() => { setActiveMethod(selectedCrypto); setShowModal(true) }}>
                  Proceed to Withdraw <FiArrowRight />
                </button>
              </div>
            )}
          </div>

          <button className="udf-history-link" onClick={() => navigate('/withdrawlogs')}>
            View withdrawal history <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Userdashboardwithdraw
