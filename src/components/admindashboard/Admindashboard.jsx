import React from 'react'
import './admindashboard.css'
import Swal from 'sweetalert2'
import axios from "axios";
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { AiOutlineArrowLeft } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
import { IoMdNotifications } from "react-icons/io";
import { FaUserAlt, FaAngleDown, FaEllipsisH } from "react-icons/fa";
import { MdClose } from 'react-icons/md'
import AdminHeader from '../AdminHeader'
import { RxUpload } from 'react-icons/rx'
import { MdCandlestickChart, MdOutlineShowChart, MdDeleteSweep } from 'react-icons/md'
import { BsImage } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { GiReceiveMoney } from 'react-icons/gi'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'
const Admindashboard = ({ route }) => {

  const fetchTraders = async () => {
    try {
      const req = await fetch(`${route}/api/fetchTraders`, {
        headers: { 'Content-Type': 'application/json' }
      })
      const res = await req.json()
      setTraders(res.status === 200 ? res.traders : [])
    } catch {
      setTraders([])
    } finally {
      setLoader(false)
    }
  }

  const fetchUsers = async () => {
    try {
      const req = await fetch(`${route}/api/getUsers`, {
        headers: { 'Content-Type': 'application/json' }
      })
      const res = await req.json()
      setUsers(res || [])
    } catch {
      setUsers([])
    } finally {
      setLoader(false)
    }
  }

  useEffect(() => {
    setLoader(true)
    fetchUsers()
    fetchTraders()
  }, [])

  // sweet alert function 
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const creditUser = async () => {
    setLoader(true)
    const req = await fetch(`${route}/api/fundwallet`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: userAmount, email: email
        })
      })

    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
      Toast.fire({
        icon: 'success',
        title: `Acoount credited with  $${res.funded} USD`
      })
      const data = {
        service_id: 'service_yqknanp',
        template_id: 'template_vd5j2eh',
        user_id: '0wcKB0jFnO7iPqwgZ',
        template_params: {
          'name': `${res.name}`,
          'email': `${res.email}`,
          'message': `${res.message}`,
          'reply_to': `saxomanagements@gmail.com`,
          'subject': `${res.subject}`
        }
      };

      if (res.upline === null) {
        await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
        })
      }
      else {
        const uplineData = {
          service_id: 'service_yqknanp',
          template_id: 'template_vd5j2eh',
          user_id: '0wcKB0jFnO7iPqwgZ',
          template_params: {
            'name': `${res.uplineName}`,
            'email': `${res.uplineEmail}`,
            'message': `${res.uplineMessage}`,
            'reply_to': `saxomanagements@gmail.com`,
            'subject': `${res.uplineSubject}`
          }
        };

        await Promise.all([
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
          }),
          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(uplineData),
          })
        ])
      }

      setEmail('')
      setUserAmount('')
      fetchUsers()
    }
    else {
      Toast.fire({
        icon: 'error',
        title: `sorry, something went wrong ${res.error} `
      })
    }
  }

  const debitUser = async () => {
    setLoader(true)
    const req = await fetch(`${route}/api/debitwallet`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: userAmount, email: email
        })
      })

    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
      Toast.fire({
        icon: 'success',
        title: `Acoount debited with  $${res.funded} USD`
      })
      const data = {
        service_id: 'service_yqknanp',
        template_id: 'template_vd5j2eh',
        user_id: '0wcKB0jFnO7iPqwgZ',
        template_params: {
          'name': `${res.name}`,
          'email': `${res.email}`,
          'message': `${res.message}`,
          'reply_to': `saxomanagements@gmail.com`,
          'subject': `${res.subject}`
        }
      };


      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      setEmail('')
      setUserAmount('')
      fetchUsers()
    }
    else {
      Toast.fire({
        icon: 'error',
        title: `amount ${res.funded}, is more than users capital, something went wrong ${res.error} `
      })
    }
  }

  const [name, setName] = useState('')

  const approveWithdraw = async () => {
    const userDetails = await fetch(`${route}/api/getWithdrawInfo`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: activeEmail
      })
    })
    const awaitedData = await userDetails.json()
    console.log(awaitedData.amount)


    if (awaitedData.amount !== undefined) {
      const data = {
        service_id: 'service_yqknanp',
        template_id: 'template_vd5j2eh',
        user_id: '0wcKB0jFnO7iPqwgZ',
        template_params: {
          'name': `${name}`,
          'email': `${activeEmail}`,
          'message': `Congratulations! your withdrawal $${awaitedData.amount} has been approved. confirm withdrawal of $${awaitedData.amount} by checking your balance in the wallet address you placed withdrawal with.`,
          'reply_to': `saxomanagements@gmail.com`,
          'subject': `successful withdrawal`
        }
      };

      Toast.fire({
        icon: 'success',
        title: `approval email sent`
      })

      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
    }
    else {
      Toast.fire({
        icon: 'error',
        title: `user hasn't made any withdrawal yet`
      })
    }
  }

  const navigate = useNavigate()
  const [showDeleteModal, setShowDeletModal] = useState()
  const [activeEmail, setActiveEmail] = useState('')
  const [showUpgradeModal, setShowUpgradeModal] = useState()
  const [showForm, SetShowFoarm] = useState(true)
  const [showDashboard, setShowDasboard] = useState(false)
  const [users, setUsers] = useState()
  const [loader, setLoader] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [userAmount, setUserAmount] = useState()
  const [showModal, setShowModal] = useState(false)
  const [showCreateTrader, setShowCreateTrader] = useState(false)
  const [showTraderLogs, setShowTraderLogs] = useState(false)
  const [showUsers, setShowUsers] = useState(true)
  const [showImage, setShowImage] = useState();
  const [traders, setTraders] = useState([])
  const [activeTrader, setActiveTrader] = useState({

  })
  const [showTraderLogForm, setShowTraderLogForm] = useState(false)
  const [activeTraderId, setActiveTraderId] = useState()
  const [selectedValue, setSelectedValue] = useState()
  const [showStatus, setShowStatus] = useState(false)
  const [debitModal, setDebitModal] = useState(false)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 })

  // New state for individual allocations
  const [copyTraders, setCopyTraders] = useState([])
  const [individualAllocations, setIndividualAllocations] = useState({})

  // User Management UI State
  const [activeActionMenu, setActiveActionMenu] = useState(null)
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    const handleClickOutside = () => setActiveActionMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Bulk Action State
  const [bulkAmount, setBulkAmount] = useState('')
  const [bulkType, setBulkType] = useState('profit')

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const closeMenu = () => {
    setShowStatus(false)
  }

  const openCreateTrader = () => {
    setShowCreateTrader(true)
    setShowTraderLogs(false)
    setShowUsers(false)
  }
  const openTraderLogs = () => {
    setShowTraderLogs(true)
    setShowUsers(false)
    setShowCreateTrader(false)
  }

  const openUsers = () => {
    setShowCreateTrader(false)
    setShowTraderLogs(false)
    setShowUsers(true)
  }


  const upgradeUser = async () => {

    setLoader(true)
    const req = await fetch(`${route}/api/upgradeUser`,
      {
        method: 'POST',
        headers: {
          'content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: userAmount, email: activeEmail
        })
      })
    const res = await req.json()
    setLoader(false)
    if (res.status === 'ok') {
      Toast.fire({
        icon: 'success',
        title: `Acoount upgraded by  $${res.funded} USD in profit`
      })
      setShowUpgradeModal(false)
      fetchUsers()
    } else {
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }

  }

  const applyBulkAllocation = () => {
    if (!copyTraders || copyTraders.length === 0) return;

    const newAllocations = {};
    copyTraders.forEach(user => {
      newAllocations[user._id] = {
        amount: parseFloat(bulkAmount) || 0,
        type: bulkType
      };
    });
    setIndividualAllocations(newAllocations);

    // Optional: Visual feedback
    // Toast.fire({ icon: 'success', title: 'Applied to all' });
  }

  const updateTraderLog = async () => {
    try {
      const date = new Date()
      const today = date.toLocaleDateString()

      // Base master log (optional, but good for trader history)
      const masterTradeLog = {
        ...activeTrader,
        'id': activeTraderId,
        'tradeType': selectedValue || 'profit',
        'date': today
      }

      // Construct distributions array from individualAllocations
      const distributions = copyTraders.map(user => {
        const allocation = individualAllocations[user._id] || {};
        const amount = allocation.amount || 0;
        const type = allocation.type || 'profit';

        return {
          email: user.email,
          amount: amount,
          type: type,
          pair: masterTradeLog.pair || 'Unknown Asset'
        };
      }).filter(dist => dist.amount > 0);

      setLoader(true)

      const req = await fetch(`${route}/api/distributeProfit`,
        {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify({
            distributions: distributions,
            traderId: activeTraderId,
            addToHistory: true,
            masterTradeLog: masterTradeLog
          })
        })
      const res = await req.json()
      console.log(res)
      setLoader(false)

      if (res.status === 'ok') {
        Toast.fire({
          icon: 'success',
          title: `Profits/Losses distributed successfully!`
        })
        setShowTraderLogForm(false)
        fetchTraders()
        setIndividualAllocations({})
        setCopyTraders([])
      } else {
        Toast.fire({
          icon: 'error',
          title: `Something went wrong: ${res.error || 'Unknown error'}`
        })
      }
    } catch (error) {
      console.error(error);
      setLoader(false);
      Toast.fire({
        icon: 'error',
        title: `Client error: ${error.message}`
      })
    }
  }

  const deleteUser = async (email) => {
    const req = await fetch(`${route}/api/deleteUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
      })
    })
    const res = await req.json()
    if (res.status === 200) {
      setShowDeletModal(false)
      Toast.fire({
        icon: 'success',
        title: `you have successfully deleted this user`
      })
      fetchUsers()
    } else {
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }
  }

  const deleteTrader = async (id) => {
    const req = await fetch(`${route}/api/deleteTrader`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
      })
    })
    const res = await req.json()
    if (res.status === 200) {
      setShowDeletModal(false)
      Toast.fire({
        icon: 'success',
        title: `you have successfully deleted this trader`
      })
      fetchTraders()
    } else {
      Toast.fire({
        icon: 'error',
        title: `something went wrong`
      })
    }
  }

  const login = async () => {
    setLoader(true);
    const req = await fetch(`${route}/api/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const res = await req.json();
    console.log(res);
    setLoader(false);

    if (res.status === 200) {
      // Save token if available
      localStorage.setItem('token', res.token || 'admin'); // use res.token if your backend sends one
      SetShowFoarm(false)
      setShowDasboard(true) // or whatever your admin route is
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Invalid credentials'
      });
    }
  };


  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    winRate: "",
    avgReturn: "",
    followers: "",
    riskRewardRatio: "",
    nationality: "",
    minimumcapital: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)

    const FormData = {
      ...formData, traderImage: showImage
    }
    try {
      const response = await axios.post(`${route}/api/createTrader`, FormData);

      console.log("Trader created:", response.data);

      // Optionally reset form
      setFormData({
        firstname: "",
        lastname: "",
        winRate: "",
        avgReturn: "",
        followers: "",
        riskRewardRatio: "",
        nationality: "",
        minimumCapital: "",
      });
      setLoader(false)
      Toast.fire({
        icon: 'success',
        title: `Trader successfully created!`
      })
      fetchTraders()
    } catch (error) {

      setLoader(false)
      Toast.fire({
        icon: 'error',
        title: `Error creating trader:, ${error}`
      })
    }
  };

  const uploadProof = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'upload');

    const req = await fetch('https://api.cloudinary.com/v1_1/duesyx3zu/image/upload', {
      method: 'POST',
      body: formData,
    });
    const res = await req.json();
    if (res) {
      setShowImage(res.secure_url);
    }
  };

  const verifyUserPdtStatus = async (id) => {
    setLoader(true)
    console.log(id)
    const req = await fetch(`${route}/api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    })
    const res = await req.json()
    setLoader(false)
    console.log(res)
    fetchUsers()
  }
  const approveKYC = async (user) => {
    const email = user.email;
    const result = await Swal.fire({
      title: 'Approve KYC?',
      text: 'This will approve the user\'s KYC verification',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setLoader(true);
      try {
        const response = await fetch(`${route}/api/admin/approveKYC`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await response.json();
        setLoader(false);

        if (data.status === 'ok') {
          Toast.fire({ icon: 'success', title: 'KYC Approved Successfully' });

          const emailData = {
            service_id: 'service_yqknanp',
            template_id: 'template_vd5j2eh',
            user_id: '0wcKB0jFnO7iPqwgZ',
            template_params: {
              'name': `${user.firstname}`,
              'email': `${user.email}`,
              'message': `Congratulations, ${user.firstname}! Your KYC verification has been approved. You can now enjoy full access to our services.`,
              'reply_to': `saxomanagements@gmail.com`,
              'subject': `KYC Verification Approved`
            }
          };

          await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData),
          });

          fetchUsers();
        } else {
          Toast.fire({ icon: 'error', title: 'Failed to approve KYC' });
        }
      } catch (error) {
        setLoader(false);
        Toast.fire({ icon: 'error', title: 'An error occurred' });
      }
    }
  };

  const rejectKYC = async (email) => {
    const { value: reason } = await Swal.fire({
      title: 'Reject KYC',
      input: 'textarea',
      inputLabel: 'Rejection Reason',
      inputPlaceholder: 'Enter reason for rejection...',
      inputAttributes: { 'aria-label': 'Enter rejection reason' },
      showCancelButton: true,
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel'
    });

    if (reason) {
      setLoader(true);
      try {
        const response = await fetch(`${route}/api/admin/rejectKYC`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, reason })
        });
        const data = await response.json();
        setLoader(false);

        if (data.status === 'ok') {
          Toast.fire({ icon: 'success', title: 'KYC Rejected' });
          fetchUsers();
        } else {
          Toast.fire({ icon: 'error', title: 'Failed to reject KYC' });
        }
      } catch (error) {
        setLoader(false);
        Toast.fire({ icon: 'error', title: 'An error occurred' });
      }
    }
  }


  const MODAL_OVERLAY = { position:'fixed', inset:0, background:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'20px' }
  const ADMIN_MODAL = { background:'rgb(8,14,30)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'16px', width:'100%', maxWidth:'460px', padding:'32px', position:'relative', boxShadow:'0 24px 64px rgba(0,0,0,0.5)' }
  const MODAL_TITLE = { fontSize:'1rem', fontWeight:'700', color:'white', letterSpacing:'0.5px', marginBottom:'24px', textTransform:'capitalize' }
  const MODAL_INPUT_WRAP = { display:'flex', alignItems:'center', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0 16px', height:'52px', marginBottom:'20px' }
  const MODAL_INPUT_STYLE = { flex:1, background:'transparent', border:'none', outline:'none', color:'white', fontSize:'1rem', fontFamily:'monospace' }
  const MODAL_LABEL = { color:'rgba(255,255,255,0.4)', fontSize:'0.75rem', marginRight:'8px', minWidth:'36px' }
  const BTN_PRIMARY = { flex:1, height:'48px', background:'rgb(37,172,208)', border:'none', borderRadius:'10px', color:'white', fontWeight:'700', fontSize:'0.9rem', cursor:'pointer', letterSpacing:'0.5px' }
  const BTN_GHOST = { height:'48px', padding:'0 20px', background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'10px', color:'rgba(255,255,255,0.6)', fontWeight:'600', fontSize:'0.9rem', cursor:'pointer' }
  const BTN_DANGER = { flex:1, height:'48px', background:'rgba(255,80,80,0.15)', border:'1px solid rgba(255,80,80,0.3)', borderRadius:'10px', color:'rgb(255,100,100)', fontWeight:'700', fontSize:'0.9rem', cursor:'pointer' }
  const CLOSE_BTN = { position:'absolute', top:'20px', right:'20px', background:'rgba(255,255,255,0.06)', border:'none', borderRadius:'8px', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'rgba(255,255,255,0.5)' }

  return (
    <div className='admin-root'>
      {loader && <Loader />}

      {/* ── LOGIN ── */}
      {showForm && (
        <div className="adm-login-bg">
          <form className="adm-login-card" onSubmit={e => { e.preventDefault(); login() }}>
            <img src="/saxomanagements%20logo5.png" alt="Saxo Managements" className="adm-login-logo" />
            <p className="adm-login-sub">Admin panel — sign in to continue</p>
            <div className="adm-login-field">
              <label>Email</label>
              <input type="text" placeholder="admin@saxomanagements.com" required
                onChange={e => setEmail(e.target.value.trim().toLowerCase())} />
            </div>
            <div className="adm-login-field">
              <label>Password</label>
              <div className="adm-login-pw-wrap">
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" required
                  onChange={e => setPassword(e.target.value.trim())} />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <BsEye /> : <BsEyeSlash />}
                </span>
              </div>
            </div>
            <button type="submit" className="adm-login-btn">Sign In</button>
          </form>
        </div>
      )}

      {/* ── DASHBOARD ── */}
      {showDashboard && (
        <div className="adm-layout">

          {/* SIDEBAR */}
          <aside className="adm-sidebar">
            <div className="adm-sidebar-brand">
              <img src="/saxomanagements%20logo5.png" alt="Saxo Managements" className="adm-brand-logo" />
            </div>
            <nav className="adm-nav">
              <button className={`adm-nav-item ${showUsers ? 'active' : ''}`} onClick={openUsers}>
                <RxDashboard size={16} /> Users
              </button>
              <button className={`adm-nav-item ${showCreateTrader ? 'active' : ''}`} onClick={openCreateTrader}>
                <GiReceiveMoney size={16} /> Create Trader
              </button>
              <button className={`adm-nav-item ${showTraderLogs ? 'active' : ''}`} onClick={openTraderLogs}>
                <MdCandlestickChart size={16} /> Trader Logs
              </button>
            </nav>
            <button className="adm-logout-btn" onClick={logout}>
              <FiLogOut size={15} /> Sign Out
            </button>
          </aside>

          {/* MOBILE BOTTOM NAV */}
          <nav className="adm-bottom-nav">
            <button className={`adm-bottom-nav-item ${showUsers ? 'active' : ''}`} onClick={openUsers}>
              <RxDashboard size={20} />
              Users
            </button>
            <button className={`adm-bottom-nav-item ${showCreateTrader ? 'active' : ''}`} onClick={openCreateTrader}>
              <GiReceiveMoney size={20} />
              Create
            </button>
            <button className={`adm-bottom-nav-item ${showTraderLogs ? 'active' : ''}`} onClick={openTraderLogs}>
              <MdCandlestickChart size={20} />
              Logs
            </button>
            <button className="adm-bottom-nav-logout" onClick={logout}>
              <FiLogOut size={20} />
              Logout
            </button>
          </nav>

          {/* MAIN */}
          <div className="adm-main">

            {/* TOPBAR */}
            <header className="adm-topbar">
              <div className="adm-topbar-left">
                <h2 className="adm-page-title">
                  {showUsers && 'Users'}
                  {showCreateTrader && 'Create Trader'}
                  {showTraderLogs && 'Trader Logs'}
                </h2>
                {showUsers && users && (
                  <span className="adm-count-badge">{users.length} total</span>
                )}
              </div>
              <div className="adm-topbar-right">
                <div className="adm-avatar">A</div>
              </div>
            </header>

            {/* CONTENT */}
            <div className="adm-content">

          {/* ── MODALS ── */}
          {showDeleteModal && (
            <div style={MODAL_OVERLAY}>
              <div style={{...ADMIN_MODAL, maxWidth:'380px'}}>
                <button style={CLOSE_BTN} onClick={() => setShowDeletModal(false)}><MdClose size={16}/></button>
                <div style={{textAlign:'center', marginBottom:'20px'}}>
                  <div style={{width:'48px',height:'48px',borderRadius:'50%',background:'rgba(255,80,80,0.12)',border:'1px solid rgba(255,80,80,0.25)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'rgb(255,100,100)',fontSize:'1.3rem'}}>⚠</div>
                  <h3 style={{color:'white',fontWeight:'700',marginBottom:'8px'}}>Delete user?</h3>
                  <p style={{color:'rgba(255,255,255,0.4)',fontSize:'0.85rem',lineHeight:1.6}}>This will permanently remove the user and all their data. This cannot be undone.</p>
                </div>
                <div style={{display:'flex',gap:'12px'}}>
                  <button style={BTN_GHOST} onClick={() => setShowDeletModal(false)}>Cancel</button>
                  <button style={BTN_DANGER} onClick={() => deleteUser(activeEmail)}>Delete</button>
                </div>
              </div>
            </div>
          )}

          {showUpgradeModal && (
            <div style={MODAL_OVERLAY}>
              <div style={ADMIN_MODAL}>
                <button style={CLOSE_BTN} onClick={() => setShowUpgradeModal(false)}><MdClose size={16}/></button>
                <p style={MODAL_TITLE}>Upgrade User Profit</p>
                <div style={MODAL_INPUT_WRAP}>
                  <span style={MODAL_LABEL}>USD</span>
                  <input style={MODAL_INPUT_STYLE} type="number" placeholder="0.00" onChange={e => setUserAmount(parseInt(e.target.value))} />
                </div>
                <div style={{display:'flex',gap:'12px'}}>
                  <button style={BTN_GHOST} onClick={() => setShowUpgradeModal(false)}>Cancel</button>
                  <button style={BTN_PRIMARY} onClick={upgradeUser}>Apply</button>
                </div>
              </div>
            </div>
          )}

          {showModal && (
            <div style={MODAL_OVERLAY}>
              <div style={ADMIN_MODAL}>
                <button style={CLOSE_BTN} onClick={() => setShowModal(false)}><MdClose size={16}/></button>
                <p style={MODAL_TITLE}>Credit User</p>
                <div style={MODAL_INPUT_WRAP}>
                  <span style={MODAL_LABEL}>USD</span>
                  <input style={MODAL_INPUT_STYLE} type="number" placeholder="0.00" onChange={e => setUserAmount(parseInt(e.target.value))} />
                </div>
                <div style={{display:'flex',gap:'12px'}}>
                  <button style={BTN_GHOST} onClick={() => setShowModal(false)}>Cancel</button>
                  <button style={BTN_PRIMARY} onClick={creditUser}>Credit</button>
                </div>
              </div>
            </div>
          )}

          {debitModal && (
            <div style={MODAL_OVERLAY}>
              <div style={ADMIN_MODAL}>
                <button style={CLOSE_BTN} onClick={() => setDebitModal(false)}><MdClose size={16}/></button>
                <p style={MODAL_TITLE}>Debit User</p>
                <div style={MODAL_INPUT_WRAP}>
                  <span style={MODAL_LABEL}>USD</span>
                  <input style={MODAL_INPUT_STYLE} type="number" placeholder="0.00" onChange={e => setUserAmount(parseInt(e.target.value))} />
                </div>
                <div style={{display:'flex',gap:'12px'}}>
                  <button style={BTN_GHOST} onClick={() => setDebitModal(false)}>Cancel</button>
                  <button style={BTN_DANGER} onClick={debitUser}>Debit</button>
                </div>
              </div>
            </div>
          )}
          {
            showTraderLogForm &&
            <motion.div

            >
              <div className="modal-container">
                <div className="modal">
                  <div className="modal-header">
                    <h2>update trader logs</h2>
                  </div>
                  <MdClose className='close-modal-btn' onClick={() => { setShowTraderLogForm(false) }} />
                  <div className="modal-input-container">
                    <div className="modal-input">
                      <select
                        onChange={(e) =>
                          setActiveTrader({ ...activeTrader, pair: e.target.value })
                        } className='custom-select'
                      >
                        <option value="">Select trade pair</option>

                        {/* Forex Pairs */}
                        <optgroup label="Forex Pairs">
                          <option value="EUR/USD">EUR/USD</option>
                          <option value="USD/JPY">USD/JPY</option>
                          <option value="XAU/USD">XAU/USD</option>
                          <option value="GBP/USD">GBP/USD</option>
                          <option value="USD/CHF">USD/CHF</option>
                          <option value="AUD/USD">AUD/USD</option>
                          <option value="USD/CAD">USD/CAD</option>
                          <option value="NZD/USD">NZD/USD</option>
                        </optgroup>

                        {/* Indices */}
                        <optgroup label="Indices">
                          <option value="US30">US30 (Dow Jones)</option>
                          <option value="NAS100">NAS100 (Nasdaq 100)</option>
                          <option value="SPX500">SPX500 (S&P 500)</option>
                          <option value="GER40">GER40 (DAX 40)</option>
                          <option value="UK100">UK100 (FTSE 100)</option>
                          <option value="JPN225">JPN225 (Nikkei 225)</option>
                          <option value="FRA40">FRA40 (CAC 40)</option>
                          <option value="AUS200">AUS200 (ASX 200)</option>
                          <option value="HK50">HK50 (Hang Seng)</option>
                          <option value="EU50">EU50 (Euro Stoxx 50)</option>
                          <option value="ES35">ES35 (IBEX 35)</option>
                          <option value="SWI20">SWI20 (SMI)</option>
                        </optgroup>

                        {/* Commodities */}
                        <optgroup label="Commodities">
                          <option value="XAU/USD">Gold</option>
                          <option value="XAG/USD">Silver</option>
                          <option value="WTI/USD">Crude Oil (WTI)</option>
                          <option value="BRENT/USD">Brent Oil</option>
                          <option value="NG/USD">Natural Gas</option>
                          <option value="COPPER">Copper</option>
                          <option value="CORN">Corn</option>
                          <option value="WHEAT">Wheat</option>
                          <option value="SOYBEAN">Soybeans</option>
                          <option value="COFFEE">Coffee</option>
                        </optgroup>

                        {/* Bonds */}
                        <optgroup label="Bonds">
                          <option value="US10Y">US 10Y Treasury</option>
                          <option value="US30Y">US 30Y Treasury</option>
                          <option value="US5Y">US 5Y Treasury</option>
                          <option value="GER10Y">Germany 10Y Bund</option>
                          <option value="UK10Y">UK 10Y Gilt</option>
                          <option value="JP10Y">Japan 10Y Bond</option>
                        </optgroup>

                        {/* Options (Index & Asset Options) */}
                        <optgroup label="Options">
                          <option value="SPX_OPT">S&P 500 Options</option>
                          <option value="NDX_OPT">Nasdaq 100 Options</option>
                          <option value="DJI_OPT">Dow Jones Options</option>
                          <option value="AAPL_OPT">Apple Options</option>
                          <option value="TSLA_OPT">Tesla Options</option>
                          <option value="BTC_OPT">Bitcoin Options</option>
                        </optgroup>

                        {/* Cryptos */}
                        <optgroup label="Cryptos">
                          <option value="BTC/USD">BTC/USD</option>
                          <option value="ETH/USD">ETH/USD</option>
                          <option value="XRP/USD">XRP/USD</option>
                          <option value="SOL/USD">SOL/USD</option>
                          <option value="DOGE/USD">DOGE/USD</option>
                          <option value="ADA/USD">ADA/USD</option>
                          <option value="LTC/USD">LTC/USD</option>
                          <option value="BNB/USD">BNB/USD</option>
                          <option value="AVAX/USD">AVAX/USD</option>
                          <option value="TRX/USD">TRX/USD</option>
                          <option value="DOT/USD">DOT/USD</option>
                          <option value="SHIB/USD">SHIB/USD</option>
                          <option value="MATIC/USD">MATIC/USD</option>
                        </optgroup>

                        {/* Stocks */}
                        <optgroup label="Stocks">
                          <option value="AAPL">AAPL (Apple)</option>
                          <option value="GOOGL">GOOGL (Google)</option>
                          <option value="MSFT">MSFT (Microsoft)</option>
                          <option value="AMZN">AMZN (Amazon)</option>
                          <option value="META">META (Meta)</option>
                          <option value="TSLA">TSLA (Tesla)</option>
                          <option value="NVDA">NVDA (NVIDIA)</option>
                          <option value="NFLX">NFLX (Netflix)</option>
                          <option value="AMD">AMD</option>
                          <option value="INTC">INTC</option>
                          <option value="BA">BA (Boeing)</option>
                          <option value="JPM">JPM (JP Morgan)</option>
                          <option value="V">V (Visa)</option>
                          <option value="MA">MA (Mastercard)</option>
                          <option value="XOM">XOM (Exxon Mobil)</option>
                          <option value="CVX">CVX (Chevron)</option>
                          <option value="BABA">BABA (Alibaba)</option>
                          <option value="UBER">UBER</option>
                          <option value="DIS">DIS (Disney)</option>
                          <option value="KO">KO (Coca-Cola)</option>
                          <option value="NKE">NKE (Nike)</option>
                          <option value="MOVE">MOVE</option>
                          <option value="REVB">REVB</option>
                          <option value="DRCT">DRCT</option>
                          <option value="IOTR">IOTR</option>
                          <option value="HCTI">HCTI</option>
                          <option value="NAMM">NAMM</option>
                          <option value="ASTI">ASTI</option>
                          <option value="IOBT">IOBT</option>
                        </optgroup>

                      </select>

                      {/* <span></span> */}
                    </div>

                    {/* NEW: Copy Traders Individual Allocation Section */}
                    <div className="copy-traders-section">
                      <h4>Copy Traders ({copyTraders.length})</h4>

                      {copyTraders.length === 0 ? (
                        <p className="no-traders-msg">No users are copying this trader.</p>
                      ) : (
                        <div className="copy-traders-list-container">
                          {copyTraders.map(user => (
                            <div className="copy-trader-row" key={user._id}>
                              <div className="ct-info">
                                <span className="ct-name">{user.firstname} {user.lastname}</span>
                                <span className="ct-email">{user.email}</span>
                                <span className="ct-balance">Bal: ${user.funded}</span>
                              </div>
                              <div className="ct-inputs">
                                <input
                                  type="number"
                                  placeholder="Amt"
                                  className="ct-amount-input"
                                  value={individualAllocations[user._id]?.amount || ''}
                                  onChange={(e) => {
                                    setIndividualAllocations({
                                      ...individualAllocations,
                                      [user._id]: { ...individualAllocations[user._id], amount: parseFloat(e.target.value) }
                                    })
                                  }}
                                />
                                <select
                                  className="ct-type-select"
                                  value={individualAllocations[user._id]?.type || 'profit'}
                                  onChange={(e) => {
                                    setIndividualAllocations({
                                      ...individualAllocations,
                                      [user._id]: { ...individualAllocations[user._id], type: e.target.value }
                                    })
                                  }}
                                >
                                  <option value="profit">Profit</option>
                                  <option value="loss">Loss</option>
                                </select>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="modal-input trade-input" style={{ display: 'none' }}>
                      {/* Hidden original inputs */}
                    </div>
                  </div>
                  <div className="modal-btn-container">
                    <button class="noselect" onClick={() => {
                      setShowTraderLogForm(false)
                    }}>
                      <span class="text">close</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span>
                    </button>
                    <button className='next' onClick={() => updateTraderLog()}>
                      <span class="label">Next</span>
                      <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path></svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          }
              {
                showUsers &&
                <>
                  {/* User Details Modal */}
                  {showUserDetailsModal && selectedUser && (
                    <div style={MODAL_OVERLAY}>
                      <div style={{...ADMIN_MODAL, maxWidth:'520px', maxHeight:'85vh', overflowY:'auto'}}>
                        <button style={CLOSE_BTN} onClick={() => setShowUserDetailsModal(false)}><MdClose size={16}/></button>
                        <p style={{...MODAL_TITLE, marginBottom:'20px'}}>User Profile</p>

                        {/* Basic info */}
                        {[
                          ['Full Name', `${selectedUser.firstname} ${selectedUser.lastname}`],
                          ['Email', selectedUser.email],
                          ['Username', selectedUser.username],
                          ['Password', selectedUser.password],
                          ['Total Balance', `$${(selectedUser.funded || 0).toLocaleString()}`],
                          ['Annual Income', selectedUser.annualIncome || '—'],
                          ['Country', selectedUser.country || '—'],
                          ['State', selectedUser.state || '—'],
                          ['Postal Code', selectedUser.zipcode || '—'],
                          ['Address', selectedUser.address || '—'],
                        ].map(([label, value]) => (
                          <div key={label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                            <span style={{color:'rgba(255,255,255,0.4)',fontSize:'0.8rem'}}>{label}</span>
                            <span style={{color:'white',fontWeight:'600',fontSize:'0.85rem',fontFamily: label === 'Password' || label === 'Total Balance' ? 'monospace' : 'inherit'}}>{value}</span>
                          </div>
                        ))}

                        {/* KYC status row */}
                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'10px 0',borderBottom:'1px solid rgba(255,255,255,0.06)'}}>
                          <span style={{color:'rgba(255,255,255,0.4)',fontSize:'0.8rem'}}>KYC Status</span>
                          <span className={`adm-badge ${selectedUser.kycStatus === 'verified' ? 'adm-badge-verified' : 'adm-badge-pending'}`}>
                            {selectedUser.kycStatus ? selectedUser.kycStatus.replace('_',' ') : 'Not Submitted'}
                          </span>
                        </div>

                        {/* KYC document preview */}
                        {selectedUser.kycSubmitted && selectedUser.kycDocument && (
                          <div style={{marginTop:'16px'}}>
                            <p style={{color:'rgba(255,255,255,0.4)',fontSize:'0.75rem',marginBottom:'10px',textTransform:'uppercase',letterSpacing:'1px'}}>KYC Document</p>
                            <a href={selectedUser.kycDocument} target="_blank" rel="noreferrer"
                              style={{display:'inline-flex',alignItems:'center',gap:'8px',padding:'10px 16px',background:'rgba(37,172,208,0.08)',border:'1px solid rgba(37,172,208,0.2)',borderRadius:'10px',color:'rgb(37,172,208)',fontSize:'0.82rem',fontWeight:'600',textDecoration:'none'}}>
                              View Document ↗
                            </a>
                          </div>
                        )}

                        <div style={{marginTop:'20px'}}>
                          <button style={BTN_GHOST} onClick={() => setShowUserDetailsModal(false)}>Close</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {users && users.length !== 0 ?
                    <div className="adm-table-wrap">
                      <table className="adm-table">
                        <thead>
                          <tr>
                            <th>User</th>
                            <th>KYC</th>
                            <th>Balance</th>
                            <th>Credit / Debit</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(refer => (
                            <tr key={refer.email}>
                              <td>
                                <span className="adm-user-name">{refer.firstname} {refer.lastname}</span>
                                <span className="adm-user-meta">{refer.email}</span>
                                <span className="adm-user-meta">{refer.username}</span>
                              </td>
                              <td>
                                <span className={`adm-badge ${refer.kycStatus === 'verified' ? 'adm-badge-verified' : 'adm-badge-pending'}`}>
                                  {refer.kycStatus ? refer.kycStatus.replace('_', ' ') : 'Not Submitted'}
                                </span>
                              </td>
                              <td>
                                <span className="adm-balance">${refer.funded.toLocaleString()}</span>
                              </td>
                              <td>
                                <span style={{display:'block',fontFamily:'monospace',fontSize:'0.82rem',color:'rgb(72,199,130)'}}>+${refer.credit || 0}</span>
                                <span style={{display:'block',fontFamily:'monospace',fontSize:'0.82rem',color:'rgb(255,100,100)'}}>-${refer.debit || 0}</span>
                              </td>
                              <td className="adm-action-cell">
                                <button
                                  className="adm-menu-btn"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (activeActionMenu === refer.email) {
                                      setActiveActionMenu(null);
                                    } else {
                                      const rect = e.currentTarget.getBoundingClientRect();
                                      const dropdownHeight = 420;
                                      const spaceBelow = window.innerHeight - rect.bottom;
                                      const top = spaceBelow < dropdownHeight
                                        ? Math.max(10, rect.top - dropdownHeight - 6)
                                        : rect.bottom + 6;
                                      setDropdownPos({ top, right: window.innerWidth - rect.right });
                                      setActiveActionMenu(refer.email);
                                    }
                                  }}
                                >
                                  <FaEllipsisH size={13} />
                                </button>

                                {activeActionMenu === refer.email && (
                                  <div className="adm-dropdown" style={{ top: dropdownPos.top, right: dropdownPos.right }}>
                                    <button className="adm-dropdown-item" onClick={() => {
                                      setSelectedUser(refer)
                                      setShowUserDetailsModal(true)
                                      setActiveActionMenu(null)
                                    }}>View Details</button>

                                    <button className="adm-dropdown-item" onClick={() => {
                                      setShowModal(true)
                                      setEmail(refer.email)
                                      setActiveActionMenu(null)
                                    }}>Credit Account</button>

                                    <button className="adm-dropdown-item" onClick={() => {
                                      setDebitModal(true)
                                      setEmail(refer.email)
                                      setActiveActionMenu(null)
                                    }}>Debit Account</button>

                                    <button className="adm-dropdown-item" onClick={() => {
                                      setShowUpgradeModal(true)
                                      setActiveEmail(refer.email)
                                      setActiveActionMenu(null)
                                    }}>Upgrade User</button>

                                    <button className="adm-dropdown-item" onClick={() => {
                                      verifyUserPdtStatus(refer._id)
                                      setActiveActionMenu(null)
                                    }}>{refer.verified ? 'Lock PDT' : 'Unlock PDT'}</button>

                                    <button className="adm-dropdown-item" onClick={() => {
                                      setActiveEmail(refer.email)
                                      setName(refer.firstname)
                                      approveWithdraw()
                                      setActiveActionMenu(null)
                                    }}>Approve Withdraw</button>

                                    <button className="adm-dropdown-item success" onClick={() => {
                                      approveKYC(refer)
                                      setActiveActionMenu(null)
                                    }}>Approve KYC</button>

                                    <button className="adm-dropdown-item danger" onClick={() => {
                                      rejectKYC(refer.email)
                                      setActiveActionMenu(null)
                                    }}>Reject KYC</button>

                                    <div className="adm-dropdown-divider" />

                                    <a href={`mailto:${refer.email}`} className="adm-dropdown-item">Send Email</a>

                                    <button className="adm-dropdown-item danger" onClick={() => {
                                      setShowDeletModal(true)
                                      setActiveEmail(refer.email)
                                      setActiveActionMenu(null)
                                    }}>Delete User</button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    :
                    <div className="adm-empty">
                      <p>No registered users yet</p>
                    </div>
                  }
                </>
              }
              {
                showCreateTrader &&
                <div className="adm-create-trader-wrap">
                  <div className="adm-section-header">
                    <h2>New Trader</h2>
                    <p>Add a copy trader to the platform</p>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="adm-form-grid">
                      {/* Photo upload — full width */}
                      <div className="adm-photo-upload">
                        <div className="adm-photo-circle">
                          {showImage ? <img src={showImage} alt="" /> : <BsImage />}
                        </div>
                        <label htmlFor="file-input" className="adm-upload-btn">
                          <RxUpload size={14} /> Upload Photo
                          <input type="file" accept=".jpg,.png,.svg,.webp,.jpeg" id="file-input" style={{display:'none'}} required onChange={(e) => uploadProof(e.target.files[0])} />
                        </label>
                      </div>

                      <div className="adm-form-field">
                        <label>First Name</label>
                        <input type="text" name="firstname" className="adm-form-input" placeholder="e.g. James" value={formData.firstname} onChange={handleChange} />
                      </div>

                      <div className="adm-form-field">
                        <label>Last Name</label>
                        <input type="text" name="lastname" className="adm-form-input" placeholder="e.g. Carter" value={formData.lastname} onChange={handleChange} />
                      </div>

                      <div className="adm-form-field">
                        <label>Win Rate</label>
                        <input type="text" name="winRate" className="adm-form-input" placeholder="e.g. 78%" value={formData.winRate} onChange={handleChange} />
                      </div>

                      <div className="adm-form-field">
                        <label>Avg Return</label>
                        <input type="text" name="avgReturn" className="adm-form-input" placeholder="e.g. 12%" value={formData.avgReturn} onChange={handleChange} />
                      </div>

                      <div className="adm-form-field">
                        <label>Followers</label>
                        <input type="text" name="followers" className="adm-form-input" placeholder="e.g. 3400" value={formData.followers} onChange={handleChange} />
                      </div>

                      <div className="adm-form-field">
                        <label>Risk / Reward Ratio</label>
                        <input type="text" name="rrRatio" className="adm-form-input" placeholder="e.g. 1:3" value={formData.rrRatio} onChange={handleChange} />
                      </div>

                      <div className="adm-form-field">
                        <label>Nationality</label>
                        <input type="text" name="nationality" className="adm-form-input" placeholder="e.g. American" value={formData.nationality} onChange={handleChange} />
                      </div>

                      <div className="adm-form-field">
                        <label>Min Capital (USD)</label>
                        <input type="number" name="minimumcapital" className="adm-form-input" placeholder="e.g. 500" value={formData.minimumcapital} onChange={handleChange} />
                      </div>

                      <button type="submit" className="adm-submit-btn">Add Trader</button>
                    </div>
                  </form>
                </div>
              }
              {
                showTraderLogs && traders &&
                <>
                  <div className="adm-section-header">
                    <h2>Trader Logs</h2>
                    <p>{traders.length} active trader{traders.length !== 1 ? 's' : ''}</p>
                  </div>
                  <div className="adm-traders-grid">
                    {traders.map(trader => (
                      <div className="adm-trader-card" key={trader._id}>
                        <div className="adm-trader-card-delete" onClick={() => deleteTrader(trader._id)}>
                          <MdDeleteSweep size={15} />
                        </div>
                        <img src={trader.traderImage} alt="" className="adm-trader-img" />
                        <p className="adm-trader-name">{trader.firstname} {trader.lastname}</p>
                        <p className="adm-trader-sub">{trader.nationality || 'Professional Trader'}</p>
                        <div className="adm-trader-stats">
                          <div className="adm-trader-stat">
                            <span className="adm-trader-stat-label">Win Rate</span>
                            <span className="adm-trader-stat-value">{trader.profitrate}</span>
                          </div>
                          <div className="adm-trader-stat">
                            <span className="adm-trader-stat-label">Avg Return</span>
                            <span className="adm-trader-stat-value">{trader.averagereturn}</span>
                          </div>
                          <div className="adm-trader-stat">
                            <span className="adm-trader-stat-label">Min Capital</span>
                            <span className="adm-trader-stat-value">${trader.minimumcapital}</span>
                          </div>
                        </div>
                        <button className="adm-update-log-btn" onClick={() => {
                          setShowTraderLogForm(true)
                          setActiveTraderId(trader._id)
                          if (users) {
                            const tradersUsers = users.filter(user => user.trader === trader._id)
                            setCopyTraders(tradersUsers)
                            const initialAllocations = {}
                            tradersUsers.forEach(u => { initialAllocations[u._id] = { amount: '', type: 'profit' } })
                            setIndividualAllocations(initialAllocations)
                          }
                        }}>Update Log</button>
                      </div>
                    ))}
                  </div>
                </>
              }

            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Admindashboard

