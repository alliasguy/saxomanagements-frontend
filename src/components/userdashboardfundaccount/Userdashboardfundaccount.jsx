import React, { useState } from 'react'
import './userdashboardfundaccount.css'
import { useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import { FiArrowRight, FiChevronRight } from 'react-icons/fi'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import Swal from 'sweetalert2'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Checkout from '../Checkout'

const depositOptions = [
  { id:1, image:'/btc.png',       method:'BTC',                min:1, wallet:'bc1qs7x2x43jlc6ln5klfw77aswkkm4sfzf5nqvqmc' },
  { id:2, image:'/etherium.png',  method:'ETH',                min:1, wallet:'0x9fc6aa8e4A31a736b4723D1506543FFD571489f6' },
  { id:3, image:'/trc.jpg',       method:'USDT (TRC-20)',       min:1, wallet:'TKYSH6vrdhrxJEh1DF5YWoRfk5m3UtbYZ4' },
  { id:4, image:'/solana.png',    method:'Solana (SOL)',        min:1, wallet:'6ToY2pwMAGETYQ7X7JqpxCR7GMp62FFmGYj7vF4Rs2CH' },
  { id:5, image:'/erc.jpg',       method:'USDT (ERC-20)',       min:1, wallet:'0x9fc6aa8e4A31a736b4723D1506543FFD571489f6' },
  { id:6, image:'/bep.png',       method:'USDT (BEP-20)',       min:1, wallet:'6ToY2pwMAGETYQ7X7JqpxCR7GMp62FFmGYj7vF4Rs2CH' },
  { id:7, image:'/xrp-icon.png',  method:'XRP',                min:1, wallet:'raCpLSA7F1cYPdrnyWBPRoxuosrbxvMEwY' },
  { id:8, image:'/usdc-coin.png', method:'USDC (Base Mainnet)', min:1, wallet:'0x9fc6aa8e4A31a736b4723D1506543FFD571489f6' },
]

const Toast = Swal.mixin({ toast:true, position:'top-end', showConfirmButton:false, timer:3000, timerProgressBar:true })

const Userdashboardfundaccount = ({ route }) => {
  const navigate = useNavigate()
  const [selectedCrypto, setSelectedCrypto] = useState(null)
  const [depositAmount, setDepositAmount] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [activeMethod, setActiveMethod] = useState(null)
  const [checkoutPage, setCheckoutPage] = useState(false)

  const handleSelectMethod = (method) => {
    setSelectedCrypto(depositOptions.find(o => o.method === method) || null)
  }

  const handleNext = () => {
    const amt = parseInt(depositAmount)
    if (isNaN(amt)) return Toast.fire({ icon:'warning', title:'Enter a valid number' })
    if (amt < activeMethod.min) return Toast.fire({ icon:'warning', title:`Minimum deposit is $${activeMethod.min}` })
    setCheckoutPage(true)
  }

  if (checkoutPage) {
    return <Checkout Active={activeMethod} depositAmount={parseInt(depositAmount)} closepage={() => setCheckoutPage(false)} route={route} />
  }

  return (
    <div className="ud-layout">
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Fund Account</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">

          {/* Amount modal */}
          {showModal && activeMethod && (
            <div className="ud-modal-overlay">
              <div className="ud-modal">
                <button className="ud-modal-close" onClick={() => setShowModal(false)}><MdClose size={16} /></button>
                <p className="ud-modal-title">Deposit via {activeMethod.method}</p>
                <p className="ud-modal-sub">Minimum: <strong>${activeMethod.min}</strong></p>
                <div className="ud-amount-input-wrap">
                  <span className="ud-amount-prefix">$</span>
                  <input type="number" placeholder="0.00" className="ud-amount-input" onChange={e => setDepositAmount(e.target.value)} />
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
            <h2>Deposit Methods</h2>
            <p>Select a cryptocurrency to fund your account</p>
          </div>

          <div className="udf-container">
            <div className="ud-form-field">
              <label>Select Cryptocurrency</label>
              <select className="ud-form-select" defaultValue="" onChange={e => handleSelectMethod(e.target.value)}>
                <option value="" disabled>Choose a method…</option>
                {depositOptions.map(opt => (
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
                    <p className="udf-method-min">Min deposit: ${selectedCrypto.min}</p>
                  </div>
                </div>
                <button className="ud-btn-primary" style={{width:'100%', justifyContent:'center', marginTop:'8px'}} onClick={() => { setActiveMethod(selectedCrypto); setShowModal(true) }}>
                  Proceed to Deposit <FiArrowRight />
                </button>
              </div>
            )}
          </div>

          <button className="udf-history-link" onClick={() => navigate('/deposit')}>
            View deposit history <FiArrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Userdashboardfundaccount
