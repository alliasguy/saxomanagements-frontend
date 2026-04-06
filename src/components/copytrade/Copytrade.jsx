import React from 'react'
import './copytrade.css'
import { useNavigate } from 'react-router-dom'
const Copytrade = () => {
    const navigate = useNavigate()
  return (
      <div className='about-section copy-trade-section' id='about'>
          <div className="about-wrapper copy-trade-wrapper about-copy-trade-section">
              
            <div className="why-choose-us-text-container about-text copy-trade-text">
                <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2 >what we do at</h2>
                </div>
                <h1 data-aos="fade-up" className='copytrade-header'>Saxo Managements</h1>
                <p data-aos="fade-up">
                At Saxo Managements, we deliver precise market analysis and expert trade execution to help investors grow their capital through copy trading. Using MT4 and MT5, our professionals analyse global markets with both technical and fundamental strategies — pinpointing high-probability opportunities across forex, crypto, stocks, and indices. Clients benefit from real-time trade replication, regular market updates, and transparent risk management, all designed to make professional-grade investing accessible to everyone.
                  </p>
        </div>
        <div className="about-page-img forex-img-container">
            <img src="/mirrorstatmockup12.png" className='forex-img '/>
            </div>
        </div>
    </div>
  )
}

export default Copytrade