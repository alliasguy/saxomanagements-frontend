import React, { useState, useEffect } from 'react'
import './Userdashboardlivetrading.css'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { MdOutlineLockClock } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'
import Livechart from '../Livechart'
import TickerTape from '../Tickertape'

const UserdashboardLiveTrading = ({ route }) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState(null)
  const [showLockedModal, setShowLockedModal] = useState(false)

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

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Live Trading</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content udlt-content">
          {userData?.verified ? (
            <>
              <div className="udlt-ticker-wrap">
                <TickerTape />
              </div>
              <div className="ud-card udlt-chart-card">
                <Livechart />
              </div>
            </>
          ) : (
            <div className="ud-card udlt-locked-card">
              <div className="udlt-locked-video-wrap">
                <video
                  src="/chart-big.hvc1.6af4110d38611a03c3a4.mp4"
                  autoPlay loop muted
                  className="udlt-locked-video"
                />
                <div className="udlt-locked-overlay" />
              </div>
              <div className="udlt-locked-body">
                <div className="udlt-lock-icon"><MdOutlineLockClock size={32} /></div>
                <h3 className="udlt-locked-title">Feature Locked</h3>
                <p className="udlt-locked-desc">
                  Live trading sessions provide real-time insights into market strategies. Participants
                  engage directly with master traders, ask questions, and observe decisions as they
                  unfold — building confidence and practical skills in a dynamic environment.
                </p>
                <button className="ud-btn-primary udlt-unlock-btn" onClick={() => setShowLockedModal(true)}>
                  <MdOutlineLockClock size={16} /> Unlock Feature
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Locked modal */}
      {showLockedModal && (
        <div className="ud-modal-overlay" onClick={() => setShowLockedModal(false)}>
          <div className="ud-modal udlt-modal" onClick={e => e.stopPropagation()}>
            <div className="udlt-modal-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
            </div>
            <h3 className="udlt-modal-title">Restricted Feature</h3>
            <p className="udlt-modal-msg">
              Your account has not attained PDT level to unlock this feature. Please reach out
              to our support team via email or live chat.
            </p>
            <button className="ud-btn-primary" style={{width:'100%'}} onClick={() => setShowLockedModal(false)}>
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserdashboardLiveTrading
