import React, { useState, useEffect, useRef } from 'react'
import './userdashboardreferrals.css'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { MdOutlineContentCopy, MdOutlineDone } from 'react-icons/md'
import { FiLink } from 'react-icons/fi'
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'

const Userdashboardreferrals = ({ route }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)
  const [copied, setCopied] = useState(false)
  const clipRef = useRef(null)

  useEffect(() => {
    setLoader(true)
    if (localStorage.getItem('token')) {
      const getData = async () => {
        const res = await (await fetch(`${route}/api/getData`, {
          headers: { 'x-access-token': localStorage.getItem('token') }
        })).json()
        setUserData(res)
        if (res.status === 'error') navigate('/login')
        setLoader(false)
      }
      getData()
    } else {
      navigate('/login')
    }
  }, [])

  const referralLink = `saxomanagements.com/user/${userData?.username || userData?.referral || ''}`

  const copyLink = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Referrals</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">

          {/* Referral Link Card */}
          <div className="ud-card udr-link-card">
            <div className="udr-link-header">
              <div className="udr-link-icon"><FiLink /></div>
              <div>
                <p className="udr-link-title">Your Referral Link</p>
                <p className="udr-link-sub">Earn <strong>10%</strong> of every deposit made by your referrals</p>
              </div>
            </div>
            <div className="udr-copy-row">
              <input ref={clipRef} readOnly value={referralLink} className="udr-link-input" />
              <button className="udr-copy-btn" onClick={copyLink}>
                {copied ? <><MdOutlineDone /> Copied!</> : <><MdOutlineContentCopy /> Copy</>}
              </button>
            </div>
          </div>

          {/* Stats Row */}
          {userData && (
            <div className="udr-stats-row">
              <div className="ud-card udr-stat">
                <p className="udr-stat-label">Total Referrals</p>
                <p className="udr-stat-value">{userData.referred?.length || 0}</p>
              </div>
              <div className="ud-card udr-stat">
                <p className="udr-stat-label">Commission Earned</p>
                <p className="udr-stat-value">${userData.refBonus || 0} USD</p>
              </div>
            </div>
          )}

          {/* Referral Table */}
          <div className="ud-section-header" style={{marginTop:'28px'}}>
            <h2>Referred Users</h2>
          </div>

          {userData?.referred?.length > 0 ? (
            <div className="ud-table-wrap">
              <table className="ud-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Joined</th>
                    <th>Commission</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.referred.map((ref, i) => (
                    <tr key={i}>
                      <td>{ref.firstname} {ref.lastname}</td>
                      <td style={{color:'rgba(255,255,255,0.4)', fontSize:'0.8rem'}}>{ref.email}</td>
                      <td style={{color:'rgba(255,255,255,0.4)', fontSize:'0.8rem'}}>{ref.date}</td>
                      <td style={{fontFamily:'monospace', fontWeight:600, color:'rgb(72,199,130)'}}>${ref.refBonus || 0} USD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ud-empty">
              <p>You haven't referred anyone yet. Share your link to start earning commission.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Userdashboardreferrals
