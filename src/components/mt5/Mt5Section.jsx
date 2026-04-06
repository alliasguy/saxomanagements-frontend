import React from 'react'
import './mt5section.css'
import { useNavigate } from 'react-router-dom'
const Mt5Section = () => {
    const navigate = useNavigate()
  return (
      <div className='about-section mt5-trade-section' id='about'>
          <div className="about-wrapper copy-trade-wrapper mt5-wrapper">
              
            <div className="why-choose-us-text-container about-text copy-trade-text mt5-text">
                <h1 data-aos="fade-up">Start <span className="highlight">copying </span>& start   <span className="highlight">earning </span></h1>
                <p data-aos="fade-up">
                Discover the power of Saxo Managements — a professional platform that replicates the trades of skilled experts directly into your account. Copy proven strategies effortlessly and let experienced traders drive your growth.
              </p>
              <button className="launch-btn cssbuttons-io" data-aos="fade-up" onClick={()=>{
                        navigate('/signup')
                    }}>
                <span>start now!</span>
              </button>
        </div>
        </div>
    </div>
  )
}

export default Mt5Section