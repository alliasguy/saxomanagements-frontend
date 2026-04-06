import React from 'react'
import { useNavigate } from 'react-router-dom'
import TeslaWidget from '../TeslaWidget'
import './teslawidget.css'
const TeslaWidgetContainer = () => {
    const navigate = useNavigate()
  return (
      <section className='tesla-widget-container'>
          <div className="videoframe-text-container" data-aos="fade-up">
              <h1>Market  <span className="highlight">Data </span></h1>
              <p>Grab an overview of global markets including price changes, open, high, low, and close values for selected instruments.</p>
        </div>
          <div className="tesla-widget-wrapper">
              <div className="tesla-widget-text-container" data-aos="fade-up">
                  <h1>Symbol <span className="highlight">Overview</span> </h1>
                  <p>Embed the latest quotes, plus a simple chart of a single symbol of your choice. A great option for any web or mobile-geared pages.</p>
                  <div className="tesla-widget-btn-container">
                      <button className="launch-btn cssbuttons-io" data-aos="fade-up" onClick={()=>{
                        navigate('/signup')
                    }}>
                        <span>start now!</span>
                        </button>
                  </div>
              </div>
              <div className="tesla-widget-chart-container">
                  <TeslaWidget />
              </div>
          </div>
    </section>
  )
}

export default TeslaWidgetContainer