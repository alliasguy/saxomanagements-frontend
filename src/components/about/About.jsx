import React from 'react'
import './about.css'
import { useNavigate } from 'react-router-dom'
import TradingViewWidget from '../TradingViewWidget'

import { IoWallet } from "react-icons/io5";
import { BsBarChartFill } from "react-icons/bs";

const About = () => {
    const navigate = useNavigate()
  return (
      <div className='about-section' id='about'>
        <div className='why-choose-section'>
      <div className="why-choose-us-img-container">
        <div className="videoframe-text-container" data-aos="fade-up">
                <h1>Market  <span className="highlight">overview</span></h1>
                <p>Grab an overview of global markets including price changes, open, high, low, and close values for selected instruments.</p>
        </div>
        <img src="/saxomockup3.png" alt="" className="mockup" data-aos="fade-up"/>
        </div>
      <div className="why-choose-us-card-container">
        <div className="why-choose-us-text-container">
            <div className="header" data-aos="fade-up">
                <span className="header-line"></span>
                <h2>why choose us</h2>
            </div>
            <h1 data-aos="fade-up">why we stand out</h1>
            <p data-aos="fade-up">Our team brings deep expertise across forex, stocks, indices, and crypto — combining passion with proven strategies to deliver consistent, measurable returns for every client.</p>
        </div>
            <div className="why-choose-us-card" data-aos="fade-up">
                            <span className="card-counter">01</span>
                            <IoWallet />
                            <h2>Fund your account</h2>
                            <p>Getting started is straightforward. Choose a plan that suits your goals and fund your account. Your investment plan is fully upgradeable at any time as your confidence and capital grow.</p>
                        </div>
                        <div className="why-choose-us-card" data-aos="fade-up">
                            <span className="card-counter">02</span>
                            <BsBarChartFill />
                            <h2>We trade for you</h2>
                            <p>Our experienced traders execute every position on your behalf, applying disciplined strategies to minimise cost and maximise returns — so you earn without lifting a finger.</p>
                        </div>
        </div>
        </div>
    </div>
  )
}

export default About