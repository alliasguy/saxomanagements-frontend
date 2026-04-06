import React from 'react'
import './faq.css'
import { useState } from 'react'
import {HiOutlineChevronDown} from 'react-icons/hi'
const Faq = () => {
    const [faqs,setFaqs] = useState([
        {
        id: 1,
        active: true,
        question: 'What is Saxo Managements?',
        answer: "Saxo Managements is a professional copy trading platform that gives investors access to expert-managed trading across global financial markets — including forex, stocks, indices, and crypto. Our seasoned traders handle every position using proven strategies such as scalping, swing trading, and trend following, so your portfolio grows without you needing to trade manually."
    },
    {
        id: 2,
        active: false,
        question: 'Where does the copy trading activity take place?',
        answer: "All trading activity at Saxo Managements is executed by experienced professionals in high-liquidity markets including forex, cryptocurrency pairs, stock CFDs, and major global indices. These markets are selected for their volatility, volume, and consistent profit potential. Our traders apply advanced technical and fundamental analysis to generate steady, reliable returns."
    },
    {
        id: 3,
        active: false,
        question: 'What are the advantages of joining Saxo Managements?',
        answer: "When you join Saxo Managements, your capital is managed by trading professionals with years of real-market experience. They analyse trends, identify optimal entry and exit points, and execute trades using strategies calibrated to current market conditions. You benefit from expert-level performance without needing any prior trading knowledge."
    },
    {
        id: 4,
        active: false,
        question: 'How do I withdraw my profit?',
        answer: "Withdrawing your profit is fast and straightforward. Navigate to the withdrawal page, select your preferred method, enter the amount, paste your wallet address, and submit. Your wallet will be credited within approximately 30 minutes. Supported withdrawal methods include BTC, USDT, ETH, SOLANA, XRP, and DOGECOIN."
    },
    {
        id: 5,
        active: false,
        question: 'What cryptocurrencies are supported?',
        answer: "Saxo Managements supports a range of cryptocurrencies for both deposits and withdrawals, including Bitcoin (BTC), Tether (USDT), Ethereum (ETH), and Solana (SOL). Additional options will be added over time to give you greater flexibility."
    }

    ])

    const dropDown = (id)=>{
        setFaqs(
        faqs.map(faq => faq.id === id ? {...faq, active:!faq.active} : {...faq, active:false}))
        console.log(faqs)
    }
  return (
    <div className='faq-section' id='faq'>
        <div className="faq-wrapper">
            <div className="why-choose-us-text-container faq-p">
                <div className="header" data-aos="fade-up">
                    <span className="header-line"></span>
                    <h2>faq</h2>
                </div>
                <h1 data-aos="fade-up">frequently asked questions</h1>
                {/* <p data-aos="fade-up">
                We’ve provided answers about Saxo Managements, our plans, supported cryptocurrencies, and other common questions. For anything else, reach out via our contact page or email address.
                </p> */}
            </div>
        </div>
        <div className="faq-container">
            {
                faqs.map(faq =>
                    <div className="faq-card" key={faq.id} data-aos="fade-up">
                        <div className="question-tab">
                            <h2>{`${faq.question}`}</h2>
                            <span className={`dropdown-btn ${faq.active && 'rotate'}`} onClick={()=>{
                                dropDown(faq.id)
                            }}>
                                <HiOutlineChevronDown />
                            </span>
                        </div>
                        
                        <div className={`answer-tab ${faq.active && 'drop'}`}>
                            <p>{faq.answer}</p>
                        </div>  
                        
                    </div>
                )
            }
        </div>

    </div>
  )
}

export default Faq