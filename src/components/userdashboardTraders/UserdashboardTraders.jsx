import React, { useState, useEffect } from 'react'
import './userdashboardtraders.css'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import { FiSearch, FiArrowLeft } from 'react-icons/fi'
import { MdCandlestickChart } from 'react-icons/md'
import { MdOutlineShowChart } from 'react-icons/md'
import Swal from 'sweetalert2'
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'

const Toast = Swal.mixin({ toast:true, position:'top-end', showConfirmButton:false, timer:3000, timerProgressBar:true })

const UserdashboardTraders = ({ route }) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [traders, setTraders] = useState([])
  const [userData, setUserData] = useState({})
  const [myTrader, setMyTrader] = useState(null)
  const [activeTrader, setActiveTrader] = useState(null)
  const [search, setSearch] = useState('')

  const getData = async () => {
    try {
      setLoader(true)
      const token = localStorage.getItem('token')
      if (!token) { navigate('/login'); return }
      const res = await (await fetch(`${route}/api/getData`, {
        headers: { 'x-access-token': token, 'Content-Type': 'application/json' }
      })).json()
      if (res.status === 'error') { localStorage.removeItem('token'); navigate('/login') }
      else setUserData(res)
    } catch { navigate('/login') }
    finally { setLoader(false) }
  }

  const fetchTraders = async () => {
    const res = await (await fetch(`${route}/api/fetchTraders`, { headers: { 'Content-Type': 'application/json' } })).json()
    setTraders(res.status === 200 ? res.traders : [])
  }

  useEffect(() => { getData(); fetchTraders() }, [])

  useEffect(() => {
    if (traders.length > 0 && userData?.trader) {
      setMyTrader(traders.find(t => t._id === userData.trader) || null)
    }
  }, [traders, userData])

  const copyTrade = async (trader) => {
    if (userData.funded < trader.minimumcapital) {
      return Toast.fire({ icon:'error', title:'Capital not enough to copy this trader' })
    }
    setLoader(true)
    const res = await (await fetch(`${route}/api/copytrade`, {
      method:'POST',
      headers: { 'Content-Type':'application/json', 'x-access-token': localStorage.getItem('token') },
      body: JSON.stringify({ trader: trader._id })
    })).json()
    Toast.fire({ icon: res.status === 200 ? 'success' : 'error', title: res.message })
    getData()
    setLoader(false)
  }

  const stopCopyTrade = async (trader) => {
    setLoader(true)
    const res = await (await fetch(`${route}/api/stopcopytrade`, {
      method:'POST',
      headers: { 'Content-Type':'application/json', 'x-access-token': localStorage.getItem('token') },
      body: JSON.stringify({ trader: trader._id })
    })).json()
    Toast.fire({ icon: res.status === 200 ? 'success' : 'error', title: res.message })
    getData()
    setLoader(false)
  }

  const filteredTraders = traders.filter(t =>
    t.firstname.toLowerCase().includes(search.toLowerCase()) ||
    t.lastname.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            {activeTrader
              ? <button className="udt-back-btn" onClick={() => setActiveTrader(null)}><FiArrowLeft size={16}/> Back</button>
              : <p className="ud-greeting">Copy Traders</p>
            }
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">

          {/* ── TRADER PROFILE VIEW ── */}
          {activeTrader ? (
            <div className="udt-profile-wrap">
              <div className="udt-profile-card ud-card">
                <div className="udt-profile-hero">
                  <img src={activeTrader.traderImage} alt="" className="udt-profile-img" />
                  <div>
                    <h2 className="udt-profile-name">{activeTrader.firstname} {activeTrader.lastname}</h2>
                    <p className="udt-profile-sub">{activeTrader.nationality || 'Professional Trader'}</p>
                  </div>
                </div>
                <div className="udt-stats-grid">
                  {[
                    ['Win Rate',         `${activeTrader.profitrate}%`,      <MdCandlestickChart />],
                    ['Avg Return',        activeTrader.averagereturn,         <MdOutlineShowChart />],
                    ['Followers',         activeTrader.followers,             null],
                    ['Risk/Reward',       activeTrader.rrRatio,               null],
                    ['Min Capital',       `$${activeTrader.minimumcapital}`,  null],
                  ].map(([label, value, icon]) => (
                    <div className="udt-stat" key={label}>
                      <p className="udt-stat-label">{label}</p>
                      <p className="udt-stat-value">{icon && <span>{icon}</span>}{value}</p>
                    </div>
                  ))}
                </div>
                <button className="ud-btn-primary udt-copy-btn" onClick={() => copyTrade(activeTrader)}>
                  Copy Trade
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ── MY CURRENT TRADER ── */}
              {myTrader && (
                <div className="udt-my-trader-section">
                  <div className="ud-section-header">
                    <h2>Your Current Trader</h2>
                  </div>
                  <div className="ud-card udt-active-card">
                    <div className="udt-active-header">
                      <img src={myTrader.traderImage} alt="" className="udt-active-img" />
                      <div className="udt-active-info">
                        <p className="udt-active-name">{myTrader.firstname} {myTrader.lastname}</p>
                        <span className="ud-badge ud-badge-profit">Active</span>
                      </div>
                      <button className="ud-btn-danger udt-stop-btn" onClick={() => stopCopyTrade(myTrader)}>Stop Copying</button>
                    </div>
                    <div className="udt-active-stats">
                      <div className="udt-active-stat"><span>Win Rate</span><strong>{myTrader.profitrate}%</strong></div>
                      <div className="udt-active-stat"><span>Avg Return</span><strong>{myTrader.averagereturn}</strong></div>
                      <div className="udt-active-stat"><span>Min Capital</span><strong>${myTrader.minimumcapital}</strong></div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── SEARCH + GRID ── */}
              <div className="ud-section-header" style={{marginTop: myTrader ? '32px' : '0'}}>
                <h2>Choose a Trader</h2>
                <p>Select an expert to manage your portfolio</p>
              </div>

              <div className="udt-search-wrap">
                <FiSearch className="udt-search-icon" />
                <input
                  type="text"
                  placeholder="Search by name…"
                  className="udt-search-input"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              {filteredTraders.length > 0 ? (
                <div className="udt-grid">
                  {filteredTraders.map(trader => (
                    <div className="ud-card udt-card" key={trader._id}>
                      <div className="udt-card-header">
                        <img src={trader.traderImage} alt="" className="udt-card-img" />
                        <div>
                          <p className="udt-card-name">{trader.firstname} {trader.lastname}</p>
                          <p className="udt-card-sub">{trader.nationality || 'Expert Trader'}</p>
                        </div>
                      </div>
                      <div className="udt-card-stats">
                        <div className="udt-card-stat"><span>Win Rate</span><strong>{trader.profitrate}%</strong></div>
                        <div className="udt-card-stat"><span>Avg Return</span><strong>{trader.averagereturn}</strong></div>
                        <div className="udt-card-stat"><span>Min Capital</span><strong>${trader.minimumcapital}</strong></div>
                      </div>
                      <div className="udt-card-actions">
                        <button className="ud-btn-ghost" style={{flex:1, justifyContent:'center'}} onClick={() => setActiveTrader(trader)}>View Profile</button>
                        <button className="ud-btn-primary" style={{flex:1, justifyContent:'center'}} onClick={() => copyTrade(trader)}>Copy Trade</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="ud-empty"><p>No traders found.</p></div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserdashboardTraders
