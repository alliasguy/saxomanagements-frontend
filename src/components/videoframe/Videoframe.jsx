import React from 'react'
import './videoframe.css'
import Marketdatawidget from '../Marketdatawidget'
import { Navigate, useNavigate } from 'react-router-dom'
import Forexcrossmaps from '../Forexcrossmaps'
const Videoframe = () => {
  const navigate = useNavigate()
  return (
      <section className='tesla-widget-container'>
                <div className="videoframe-text-container" data-aos="fade-up">
                    <h1>Market  <span className="highlight">rates</span></h1>
                    <p>Grab an overview of global markets including price changes, open, high, low, and close values for selected instruments.</p>
              </div>
                <div className="tesla-widget-wrapper">
                    <div className="tesla-widget-text-container" data-aos="fade-up">
                        <h1>forex <span className="highlight">cross rates</span></h1>
                        <p>This one allows you to display real-time quotes of selected currencies in comparison to other major currencies.</p>
                        <div className="tesla-widget-btn-container">
                        <button className="launch-btn cssbuttons-io">
                        <span>start now!</span>
                        </button>
                        </div>
                    </div>
                    <div className="tesla-widget-chart-container">
                        <Forexcrossmaps />
                    </div>
                </div>
          </section>
  )
}

export default Videoframe