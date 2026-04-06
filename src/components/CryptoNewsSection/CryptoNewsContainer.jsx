import React from 'react'
import CryptoNewsWidget from '../CryptoNewsWidget'
import { useNavigate } from 'react-router-dom'
import './cryptonewscontainer.css'
const CryptoNewsContainer = () => {
    const navigate = useNavigate()
  return (
    <section className='tesla-widget-container'>
              <div className="videoframe-text-container">
                  <h1>Market  <span className="highlight">news </span></h1>
                  <p>Grab an overview of global markets including price changes, open, high, low, and close values for selected instruments.</p>
            </div>
          <div className="tesla-widget-wrapper">
              <div className="tesla-widget-chart-container">
                      <CryptoNewsWidget />
                  </div>
                  <div className="tesla-widget-text-container">
                      <h1>Top Stories</h1>
                      <p>Help your audience keep track of what's happening in the crypto and stock markets with our daily symbol snapshots – designed to be read in 20 seconds or less.</p>
                      <div className="tesla-widget-btn-container">
                          <button className="launch-btn cssbuttons-io" data-aos="fade-up" onClick={()=>{
                        navigate('/signup')
                    }}>
                        <span>start now!</span>
                        </button>
                      </div>
                  </div>
              </div>
        </section>
  )
}

export default CryptoNewsContainer