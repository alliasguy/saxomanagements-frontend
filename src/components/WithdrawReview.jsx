import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { MdOutlineAccountBalanceWallet } from 'react-icons/md'
import Swal from 'sweetalert2'
import Loader from './Loader'
import Userdashboardheader from './userdashboardheader/Userdashboardheader'
import './withdraw-review.css'

const Toast = Swal.mixin({
  toast: true, position: 'top-end',
  showConfirmButton: false, timer: 4000, timerProgressBar: true,
})

const WithdrawReview = ({ Active, withdrawAmount, closepage, route, funded }) => {
  const navigate = useNavigate()
  const [step, setStep] = useState('preview') // 'preview' | 'submit'
  const [wallet, setWallet] = useState('')
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    if (!Active) navigate('/withdraw')
  }, [])

  if (!Active) return null

  const balanceAfter = Number(funded) - Number(withdrawAmount)

  const withdraw = async (e) => {
    e.preventDefault()
    if (!wallet.trim()) return Toast.fire({ icon: 'warning', title: 'Please enter your wallet address' })
    setLoader(true)
    try {
      const res = await (await fetch(`${route}/api/withdraw`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-access-token': localStorage.getItem('token') },
        body: JSON.stringify({ wallet, WithdrawAmount: withdrawAmount, method: Active.method }),
      })).json()

      const emailBase = {
        service_id: 'service_yqknanp',
        template_id: 'template_vd5j2eh',
        user_id: '0wcKB0jFnO7iPqwgZ',
      }

      if (res.status === 'ok') {
        Toast.fire({ icon: 'success', title: `Withdrawal of $${res.withdraw} placed! Awaiting approval.` })
        await Promise.all([
          fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...emailBase, template_params: { name: res.name, email: res.email, message: res.message, reply_to: 'saxomanagements@gmail.com', subject: res.subject } }),
          }),
          fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...emailBase, template_params: { name: 'Bro', email: 'saxomanagements@gmail.com', message: res.adminMessage, reply_to: res.email, subject: res.subject } }),
          }),
        ])
        setWallet('')
      } else {
        Toast.fire({ icon: 'warning', title: res.withdrawMessage || 'Withdrawal failed' })
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...emailBase, template_params: { name: res.name, email: res.email, message: res.withdrawMessage, reply_to: 'saxomanagements@gmail.com', subject: res.subject } }),
        })
        setWallet('')
      }
    } catch {
      Toast.fire({ icon: 'error', title: 'An error occurred. Try again.' })
    } finally { setLoader(false) }
  }

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <button
              className="ud-btn-ghost wdr-back-btn"
              onClick={step === 'submit' ? () => setStep('preview') : closepage}
            >
              <FiArrowLeft size={15} />
              {step === 'submit' ? 'Back to Preview' : 'Back'}
            </button>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">
          <div className="wdr-wrap">

            {/* ── STEP INDICATOR ── */}
            <div className="wdr-steps">
              <div className={`wdr-step ${step === 'preview' ? 'active' : 'done'}`}>
                <span className="wdr-step-num">{step === 'submit' ? '✓' : '1'}</span>
                <span className="wdr-step-label">Preview</span>
              </div>
              <div className="wdr-step-line" />
              <div className={`wdr-step ${step === 'submit' ? 'active' : ''}`}>
                <span className="wdr-step-num">2</span>
                <span className="wdr-step-label">Submit</span>
              </div>
            </div>

            {step === 'preview' ? (
              <>
                <div className="ud-section-header">
                  <h2>Withdrawal Preview</h2>
                  <p>Review your withdrawal details before proceeding</p>
                </div>

                <div className="ud-card wdr-card">
                  {/* Method badge */}
                  <div className="wdr-method-row">
                    <img src={Active.image} alt={Active.method} className="wdr-coin-img" />
                    <div>
                      <p className="wdr-method-name">{Active.method}</p>
                      <p className="wdr-method-sub">Selected withdrawal method</p>
                    </div>
                  </div>

                  {/* Detail rows */}
                  <div className="wdr-details">
                    <div className="wdr-detail-row">
                      <span>Current Balance</span>
                      <strong>${Number(funded).toLocaleString()} USD</strong>
                    </div>
                    <div className="wdr-detail-row">
                      <span>Requested Amount</span>
                      <strong>${Number(withdrawAmount).toLocaleString()} USD</strong>
                    </div>
                    <div className="wdr-detail-row">
                      <span>Withdrawal Charge</span>
                      <strong className="wdr-green">$0 USD</strong>
                    </div>
                    <div className="wdr-detail-row">
                      <span>After Charge</span>
                      <strong className="wdr-green">$0 USD</strong>
                    </div>
                    <div className="wdr-detail-row">
                      <span>Conversion Rate</span>
                      <strong>1 USD = 1 USD</strong>
                    </div>
                    <div className="wdr-detail-row">
                      <span>You Will Get</span>
                      <strong className="wdr-accent">${Number(withdrawAmount).toLocaleString()} USD</strong>
                    </div>
                    <div className="wdr-detail-row wdr-detail-total">
                      <span>Balance After Withdrawal</span>
                      <strong>${balanceAfter.toLocaleString()} USD</strong>
                    </div>
                  </div>

                  <button
                    className="ud-btn-primary wdr-proceed-btn"
                    onClick={() => setStep('submit')}
                  >
                    Proceed to Submit <FiArrowRight />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="ud-section-header">
                  <h2>Submit Withdrawal</h2>
                  <p>Enter your {Active.method} wallet address to complete the request</p>
                </div>

                <div className="ud-card wdr-card">
                  {/* Summary strip */}
                  <div className="wdr-summary-strip">
                    <div className="wdr-summary-item">
                      <span>Amount</span>
                      <strong>${Number(withdrawAmount).toLocaleString()} USD</strong>
                    </div>
                    <div className="wdr-summary-divider" />
                    <div className="wdr-summary-item">
                      <span>Method</span>
                      <strong>{Active.method}</strong>
                    </div>
                    <div className="wdr-summary-divider" />
                    <div className="wdr-summary-item">
                      <span>Balance After</span>
                      <strong>${balanceAfter.toLocaleString()} USD</strong>
                    </div>
                  </div>

                  <form onSubmit={withdraw} className="wdr-form">
                    <div className="ud-form-field">
                      <label>
                        <MdOutlineAccountBalanceWallet style={{display:'inline', marginRight:'6px'}} />
                        {Active.method} Wallet Address
                      </label>
                      <input
                        className="ud-form-input wdr-wallet-input"
                        type="text"
                        placeholder={`Enter your ${Active.method} address`}
                        value={wallet}
                        onChange={e => setWallet(e.target.value)}
                        required
                      />
                      <p className="wdr-wallet-hint">
                        Double-check your address — withdrawals cannot be reversed once approved.
                      </p>
                    </div>

                    <button type="submit" className="ud-btn-primary wdr-submit-btn">
                      Confirm Withdrawal <FiArrowRight />
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WithdrawReview
