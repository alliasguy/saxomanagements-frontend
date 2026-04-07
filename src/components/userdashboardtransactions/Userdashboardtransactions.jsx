import React, { useState, useEffect } from 'react'
import './userdashboardtransactions.css'
import { useNavigate, Link } from 'react-router-dom'
import { IoMdNotifications } from 'react-icons/io'
import { FaUserAlt } from 'react-icons/fa'
import Loader from '../Loader'
import Userdashboardheader from '../userdashboardheader/Userdashboardheader'

const Userdashboardtransactions = ({ route }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [loader, setLoader] = useState(false)

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

  const getTypeClass = (type) => {
    if (!type) return ''
    const t = type.toLowerCase()
    if (t.includes('deposit') || t.includes('credit') || t.includes('profit')) return 'ud-badge-profit'
    if (t.includes('withdraw') || t.includes('debit') || t.includes('loss')) return 'ud-badge-loss'
    return 'ud-badge-pending'
  }

  return (
    <div className="ud-layout">
      {loader && <Loader />}
      <Userdashboardheader route={route} />

      <div className="ud-main">
        <header className="ud-topbar">
          <div className="ud-topbar-left">
            <p className="ud-greeting">Transactions</p>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-notif-btn"><IoMdNotifications /></div>
            <div className="ud-user-avatar"><FaUserAlt size={14} /></div>
          </div>
        </header>

        <div className="ud-content">
          <div className="ud-section-header">
            <h2>Transaction History</h2>
            <p>A full record of all your account activity</p>
          </div>

          {userData?.transaction?.length > 0 ? (
            <div className="ud-table-wrap">
              <table className="ud-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Balance After</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.transaction.map((tx, i) => (
                    <tr key={i}>
                      <td style={{fontFamily:'monospace', fontSize:'0.78rem', color:'rgba(255,255,255,0.4)'}}>{tx.id}</td>
                      <td><span className={`ud-badge ${getTypeClass(tx.type)}`}>{tx.type}</span></td>
                      <td style={{fontFamily:'monospace', fontWeight:700, color:'white'}}>${tx.amount} USD</td>
                      <td style={{fontFamily:'monospace', color:'rgba(255,255,255,0.5)'}}>${tx.balance} USD</td>
                      <td style={{color:'rgba(255,255,255,0.4)', fontSize:'0.8rem'}}>{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="ud-empty">
              <p>You haven't performed any transactions yet.</p>
              <Link to="/fundwallet">Make your first deposit →</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Userdashboardtransactions
