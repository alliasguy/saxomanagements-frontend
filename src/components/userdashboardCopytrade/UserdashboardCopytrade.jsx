import React, { useState, useEffect } from 'react'
import './userdashboardcopytrade.css'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'

const UserdashboardCopytrade = ({ route }) => {
  const navigate = useNavigate()
  const [loader, setLoader] = useState(false)
  const [userData, setUserData] = useState()

  useEffect(() => {
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
    getData()
  }, [navigate, route])

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Copy Trading</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">
          <div className="ud-section-header">
            <h2>Trade Logs</h2>
            <p>All trades placed by your assigned trader</p>
          </div>

          {userData?.trades?.length > 0 ? (
            <div className="ud-table-wrap">
              <table className="ud-table">
                <thead>
                  <tr>
                    <th>Pair</th>
                    <th>Amount</th>
                    <th>Type</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.trades.map((trade, i) => (
                    <tr key={i}>
                      <td>{trade.pair}</td>
                      <td style={{fontFamily:'monospace', fontWeight:600}}>${trade.amount} USD</td>
                      <td>
                        <span className={`ud-badge ${trade.tradeType === 'profit' ? 'ud-badge-profit' : 'ud-badge-loss'}`}>
                          {trade.tradeType}
                        </span>
                      </td>
                      <td style={{color:'rgba(255,255,255,0.4)', fontSize:'0.8rem'}}>{trade.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ud-empty">
              <p>Your trader hasn't placed any trades yet. Trades will appear here once your trader begins managing your portfolio.</p>
              <Link to="/fundwallet">Make a deposit to get started →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default UserdashboardCopytrade
