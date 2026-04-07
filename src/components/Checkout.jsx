import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import Userdashboardheader from './userdashboardheader/Userdashboardheader'
import Deposit from './Deposit'
import './checkout.css'

const Checkout = ({ Active, depositAmount, closepage, route }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState('preview') // 'preview' | 'address'

  if (!Active) {
    navigate('/fundwallet')
    return null
  }

  return (
    <div className="ud-layout">
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <button className="ud-btn-ghost chk-back-btn"
              onClick={step === 'address' ? () => setStep('preview') : closepage}>
              <FiArrowLeft size={15} />
              {step === 'address' ? 'Back to Preview' : 'Back'}
            </button>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">
          {step === 'preview' ? (
            <div className="chk-wrap">
              {/* Step indicator */}
              <div className="chk-steps">
                <div className="chk-step active">
                  <span className="chk-step-num">1</span>
                  <span className="chk-step-label">Preview</span>
                </div>
                <div className="chk-step-line" />
                <div className="chk-step">
                  <span className="chk-step-num">2</span>
                  <span className="chk-step-label">Deposit Address</span>
                </div>
              </div>

              <div className="ud-section-header">
                <h2>Payment Preview</h2>
                <p>Review your deposit details before proceeding</p>
              </div>

              <div className="ud-card chk-card">
                {/* Method header */}
                <div className="chk-method-header">
                  <img src={Active.image} alt={Active.method} className="chk-coin-img" />
                  <div>
                    <p className="chk-method-name">{Active.method}</p>
                    <p className="chk-method-sub">Selected payment method</p>
                  </div>
                </div>

                {/* Detail rows */}
                <div className="chk-details">
                  <div className="chk-detail-row">
                    <span>Amount to Deposit</span>
                    <strong>${depositAmount.toLocaleString()} USD</strong>
                  </div>
                  <div className="chk-detail-row">
                    <span>Processing Charge</span>
                    <strong className="chk-green">$0 USD</strong>
                  </div>
                  <div className="chk-detail-row">
                    <span>Minimum Deposit</span>
                    <strong>${Active.min} USD</strong>
                  </div>
                  <div className="chk-detail-row">
                    <span>Conversion Rate</span>
                    <strong>1 USD = 1 USD</strong>
                  </div>
                  <div className="chk-detail-row chk-detail-total">
                    <span>Total in USD</span>
                    <strong>${depositAmount.toLocaleString()} USD</strong>
                  </div>
                </div>

                <button
                  className="ud-btn-primary chk-proceed-btn"
                  onClick={() => setStep('address')}
                >
                  Proceed to Deposit <FiArrowRight />
                </button>
              </div>
            </div>
          ) : (
            <Deposit
              amount={depositAmount}
              active={Active}
              close={() => setStep('preview')}
              route={route}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Checkout
