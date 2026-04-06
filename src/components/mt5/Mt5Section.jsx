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
                Discover the brilliance of Mirostat Trading — an innovative platform that flawlessly reflects the achievements of skilled traders, enabling you to copy proven strategies or share your own approach for others to follow, creating opportunities for mutual growth and profit.
              </p>
              <button className="launch-btn cssbuttons-io" data-aos="fade-up" onClick={()=>{
                        navigate('/signup')
                    }}>
                <span>start now!</span>
              </button>
        </div>
        <div className="about-img-container mt5-img" data-aos="fade-up">
            <img src="/mirrorstatmockup12.png" className='forex-img '/>
            </div>
        </div>
    </div>
  )
}

export default Mt5Section