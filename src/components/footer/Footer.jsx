import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'
const Footer = () => {
  return (
    <footer className='footer'>
        <div className="trusted-patners-section">
            <h2 data-aos="fade-up">our <span className="highlight">partners</span></h2>
            <div className="trusted-patners-img-container">
                <img src="/a-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/b-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/c-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/d-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
                <img src="/e-xs-light.png" alt="" className="trusted-patener-icon" data-aos="fade-up"/>
            </div>
        </div>
        <div className="quicklinks-container">
            <div className="quicklink-card-container">
                <div className="quicklink-card footer-brand-col" data-aos="fade-up">
                    <span className="footer-brand-name">Saxo Managements</span>
                    <p className="footer-brand-desc">Professional copy trading platform connecting investors with expert traders across global financial markets.</p>
                    <p className="footer-address">Keizersgracht 555, 1017 DR Amsterdam, Netherlands</p>
                    <a href="mailto:saxomanagements@gmail.com" className="footer-email">saxomanagements@gmail.com</a>
                </div>
                <div className="quicklink-card" data-aos="fade-up">
                    <span className="footer-col-heading">Company</span>
                    <Link to='/'>home</Link>
                    <Link to="/about">about us</Link>
                    <Link to="/faq">faqs</Link>
                    <Link to="/policy">privacy policy</Link>
                    <Link to="/team">team</Link>
                </div>
                <div className="quicklink-card" data-aos="fade-up">
                    <span className="footer-col-heading">Markets</span>
                    <Link to="/forex">forex</Link>
                    <Link to="/indices">indices</Link>
                    <Link to="/stocks">stocks</Link>
                    <Link to="/futures">futures</Link>
                    <Link to="/commodities">commodities</Link>
                    <Link to="/bonds">bonds</Link>
                    <Link to="/options">options</Link>
                </div>
                <div className="quicklink-card" data-aos="fade-up">
                    <span className="footer-col-heading">Analytics</span>
                    <Link to="/news">market news</Link>
                    <Link to="/technical-analysis">technical analysis</Link>
                    <Link to="/heatmaps">heatmaps</Link>
                    <Link to="/watchlists">watchlists</Link>
                </div>
            </div>
            <div className="copyright-container">
                <div className="copyright-txt">
                    <p>copyright &copy; 2024 Saxo Managements. All rights reserved.</p>
                </div>
                <div className="policy-txt">
                    <Link to="/policy">terms and conditions</Link>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer