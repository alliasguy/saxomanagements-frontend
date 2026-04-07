import React from 'react'
import './plan.css'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
const Plan = () => {
    const navigate = useNavigate()
    const [withdrawMethods,setWithdrawalMethods] = useState([
      {
        id:1,
        min:'100',
        max:'10,999',
        type:'starter plan',
        minimumOrder:'0.1',
        maximumOrder: '10',
        leverage:'1:20',
        featured: false
      },
      {
        id:2,
        min:'11,000',
        max:'20,999',
        type:'medium plan',
        minimumOrder:'0.1',
        maximumOrder: '15',
        leverage:'1:50',
        featured: true
      },
      {
        id:3,
        min:'21,000',
        max:'100,000',
        type:'diamond plan',
        minimumOrder:'0.1',
        maximumOrder: '25',
        leverage:'1:100',
        featured: false
      },

      ])
  return (
    <div className='plan-section'>
      <div className="videoframe-text-container" data-aos="fade-up">
              <h1><span className="highlight">copytrade </span> plans</h1>
              <p>Choose a plan that fits your goals. Each tier is designed to deliver consistent, expert-managed returns through disciplined copy trading.</p>
      </div>
      <div className="service-gap"></div>
              <div className="plan-card-container">
              {
            withdrawMethods.map((withdrawmethod) => (
              <div className={`pack-container${withdrawmethod.featured ? ' featured' : ''}`} key={withdrawmethod.id} data-aos="fade-up">
            <div className="pack-header">
                  {withdrawmethod.featured && <span className="featured-badge">Most Popular</span>}
                  <h3>{withdrawmethod.type}</h3>
                  <h2>$ {withdrawmethod.min}</h2>
                  <button className='plan-card-btn' onClick={()=>navigate('/signup')}>
                    <p>Subscribe</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </button>

            </div>
                <div className='lot-wrapper'>
                  <div className="lot-container">
                      <span className="lot-line"></span><p>Minimum order: {withdrawmethod.minimumOrder} lots</p>
                  </div>
                  <div className="lot-container">
                      <span className="lot-line"></span><p>Maximum order: {withdrawmethod.maximumOrder} lots</p>
                  </div>
                  <div className="lot-container">
                      <span className="lot-line"></span><p>Leverage up to {withdrawmethod.leverage}</p>
                  </div>
            </div>
          </div>
          ))}
          </div>
        </div>
      )
    }

export default Plan