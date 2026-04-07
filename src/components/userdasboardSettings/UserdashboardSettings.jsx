import { useState, useEffect } from 'react'
import './userdashboardsettings.css'
import { useNavigate } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { FiUser, FiLock, FiMail } from 'react-icons/fi'
import Swal from 'sweetalert2'
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'

const Toast = Swal.mixin({ toast:true, position:'top-end', showConfirmButton:false, timer:3000, timerProgressBar:true })

const UserdashboardSettings = ({ route }) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState('profile')

  const [profileForm, setProfileForm] = useState({ firstname:'', lastname:'', username:'' })
  const [passwordForm, setPasswordForm] = useState({ currentPassword:'', newPassword:'', confirmPassword:'' })

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const getData = async () => {
        try {
          setLoader(true)
          const res = await (await fetch(`${route}/api/getData`, {
            headers: { 'x-access-token': localStorage.getItem('token') }
          })).json()
          if (res.status === 'error') navigate('/login')
          else {
            setUserData(res)
            setProfileForm({ firstname: res.firstname || '', lastname: res.lastname || '', username: res.username || '' })
          }
        } catch { navigate('/login') }
        finally { setLoader(false) }
      }
      getData()
    } else { navigate('/login') }
  }, [])

  const handleProfileSave = async (e) => {
    e.preventDefault()
    Toast.fire({ icon:'info', title:'Profile update coming soon' })
  }

  const handlePasswordSave = async (e) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword)
      return Toast.fire({ icon:'error', title:'Passwords do not match' })
    Toast.fire({ icon:'info', title:'Password update coming soon' })
  }

  const tabs = [
    { id:'profile',  icon:<FiUser />,  label:'Profile' },
    { id:'security', icon:<FiLock />,  label:'Security' },
    { id:'contact',  icon:<FiMail />,  label:'Contact' },
  ]

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Settings</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">
          <div className="uds-wrap">

            {/* Avatar + name banner */}
            <div className="ud-card uds-profile-banner">
              <div className="uds-avatar-circle">{userData?.firstname?.[0]?.toUpperCase() || 'U'}</div>
              <div>
                <p className="uds-banner-name">{userData?.firstname} {userData?.lastname}</p>
                <p className="uds-banner-email">{userData?.email}</p>
              </div>
            </div>

            {/* Tab bar */}
            <div className="uds-tabs">
              {tabs.map(tab => (
                <button key={tab.id} className={`uds-tab ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="ud-card uds-form-card">
                <h3 className="uds-form-title">Profile Information</h3>
                <form onSubmit={handleProfileSave}>
                  <div className="uds-form-grid">
                    <div className="ud-form-field">
                      <label>First Name</label>
                      <input className="ud-form-input" type="text" value={profileForm.firstname} onChange={e => setProfileForm({...profileForm, firstname:e.target.value})} />
                    </div>
                    <div className="ud-form-field">
                      <label>Last Name</label>
                      <input className="ud-form-input" type="text" value={profileForm.lastname} onChange={e => setProfileForm({...profileForm, lastname:e.target.value})} />
                    </div>
                    <div className="ud-form-field uds-full">
                      <label>Username</label>
                      <input className="ud-form-input" type="text" value={profileForm.username} onChange={e => setProfileForm({...profileForm, username:e.target.value})} />
                    </div>
                  </div>
                  <button type="submit" className="ud-btn-primary" style={{marginTop:'8px'}}>Save Changes</button>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="ud-card uds-form-card">
                <h3 className="uds-form-title">Change Password</h3>
                <form onSubmit={handlePasswordSave}>
                  <div className="ud-form-field">
                    <label>Current Password</label>
                    <input className="ud-form-input" type="password" placeholder="••••••••" value={passwordForm.currentPassword} onChange={e => setPasswordForm({...passwordForm, currentPassword:e.target.value})} />
                  </div>
                  <div className="ud-form-field">
                    <label>New Password</label>
                    <input className="ud-form-input" type="password" placeholder="••••••••" value={passwordForm.newPassword} onChange={e => setPasswordForm({...passwordForm, newPassword:e.target.value})} />
                  </div>
                  <div className="ud-form-field">
                    <label>Confirm New Password</label>
                    <input className="ud-form-input" type="password" placeholder="••••••••" value={passwordForm.confirmPassword} onChange={e => setPasswordForm({...passwordForm, confirmPassword:e.target.value})} />
                  </div>
                  <button type="submit" className="ud-btn-primary">Update Password</button>
                </form>
              </div>
            )}

            {/* Contact Tab */}
            {activeTab === 'contact' && (
              <div className="ud-card uds-form-card">
                <h3 className="uds-form-title">Contact Details</h3>
                <div className="ud-form-field">
                  <label>Email Address</label>
                  <input className="ud-form-input" type="email" value={userData?.email || ''} disabled />
                </div>
                <div className="ud-form-field">
                  <label>Country</label>
                  <input className="ud-form-input" type="text" value={userData?.country || '—'} disabled />
                </div>
                <div className="ud-form-field">
                  <label>State</label>
                  <input className="ud-form-input" type="text" value={userData?.state || '—'} disabled />
                </div>
                <p style={{fontSize:'0.78rem', color:'rgba(255,255,255,0.25)', marginTop:'8px'}}>To update contact info, please submit a KYC form or contact support.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserdashboardSettings
