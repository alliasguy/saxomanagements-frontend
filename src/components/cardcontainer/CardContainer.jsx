import './cardcontainer.css'
import {TbChartDots2} from 'react-icons/tb'
import {TfiPieChart} from 'react-icons/tfi'
import {BsBarChartLine} from 'react-icons/bs'
import {BiNetworkChart} from 'react-icons/bi'
import {GiChart} from 'react-icons/gi'
import { MdOutlineAddchart } from 'react-icons/md'

const CardContainer = () => {
  return (
    <section className='cardSection'>
      <div className="cardSectionImageContainer">
        <img src="/home-row5-img1-2﹖v=4.webp" alt="" />
      </div>
      <div className="cardSectionWrapper" data-aos="fade-up">
        <div className="cardSectionCard" data-aos="fade-up">
            <span className="cardSectionCardSvg">
                <TbChartDots2 />
            </span>
            <div className="cardSectionCardSvgText">
                <h2>Premium Economic Calendar</h2>
                <span className="distorted-line l"></span>
                <p>Start trading news like the pros with our pro economic calendar</p>
            </div>
        </div>
        
        <div className="cardSectionCard" data-aos="fade-up">
            <span className="cardSectionCardSvg">
                <TfiPieChart />
            </span>
            <div className="cardSectionCardSvgText">
                <h2>Technical Views</h2>
                <span className="distorted-line"></span>
                <p>Access live trading setups based on pattern recognition and expert analysis.</p>
            </div>
          </div>
        <div className="cardSectionCard" data-aos="fade-up">
            <span className="cardSectionCardSvg">
                <BiNetworkChart />
            </span>
            <div className="cardSectionCardSvgText">
                <h2>Alpha EA</h2>
                <span className="distorted-line"></span>
                <p>Unlock live trading ideas with three EAs for your MT4 and MT5 platform.</p>
            </div>
          </div>
        <div className="cardSectionCard" data-aos="fade-up">
            <span className="cardSectionCardSvg">
                <BsBarChartLine />
            </span>
            <div className="cardSectionCardSvgText">
                <h2>AI Market Buzz</h2>
                <span className="distorted-line"></span>
                <p>Gain live market-moving insights of over 35,000 tradable assets.</p>
            </div>
          </div>
        <div className="cardSectionCard" data-aos="fade-up">
            <span className="cardSectionCardSvg">
                <MdOutlineAddchart />
            </span>
            <div className="cardSectionCardSvgText">
                <h2>Trade Signals</h2>
                <span className="distorted-line"></span>
                <p>Access daily trading ideas and technical setups in real-time.</p>
            </div>
          </div>
        <div className="cardSectionCard" data-aos="fade-up">
            <span className="cardSectionCardSvg">
                <GiChart />
            </span>
            <div className="cardSectionCardSvgText">
                <h2>Cashback Bonus</h2>
                <span className="distorted-line"></span>
                <p>Get a 50% Cashback Bonus that converts to cash when you trade.</p>
            </div>
          </div>
      </div>
    </section>
  )
}

export default CardContainer