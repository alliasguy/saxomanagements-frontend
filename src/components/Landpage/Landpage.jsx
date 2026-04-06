import './landpage.css'
import Header from '../Header/Header'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import TypoAnime from '../typo/TypoAnime'
import Tickertape from '../Tickertape'
const Landpage = () => {
    const navigate= useNavigate()
  return (
      <main className='landpage' >
        <Header />
        <div className='landpage-content-wrapper'>
           
            <motion.div className="landpage-text-container" 
            >
                <motion.h1
                    initial={{y:45, opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{duration:0.65,delay:0.2}}
                >

                    Your Capital, Managed by Experts — <TypoAnime />
                </motion.h1>
                <motion.p
                    initial={{y:45, opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{duration:0.65,delay:0.4}}
                >
                   At Saxo Managements, we take the complexity out of investing. Our seasoned traders handle every position while you watch your portfolio grow. Step into a smarter, more profitable financial future — guided by professionals who put your returns first.
                  </motion.p>
                <motion.button className="launch-btn cssbuttons-io"initial={{y:45, opacity:0}}
                    animate={{y:0, opacity:1}}
                    transition={{duration:0.65,delay:0.4}} onClick={()=>{
                        navigate('/signup')
                    }} >
                  <span>get started</span>
                </motion.button>
            </motion.div>
              <div className="landpage-img-container">
                  <motion.img src="/mirrorstatmockup11.png" alt="" className='phone'
                    initial={{ y: 45, opacity: 0 }}
                    animate={{y:0, opacity:1}}
                    transition={{duration:0.65,delay:0.6}}/>
            </div>
      </div>
      <div className="landpage-stats-strip">
          <div className="landpage-stat"><strong>12,400+</strong><span>Satisfied users</span></div>
          <div className="landpage-stat-divider"></div>
          <div className="landpage-stat"><strong>96+</strong><span>Countries served</span></div>
          <div className="landpage-stat-divider"></div>
          <div className="landpage-stat"><strong>34,900+</strong><span>Successful withdrawals</span></div>
          <div className="landpage-stat-divider"></div>
          <div className="landpage-stat"><strong>58,200+</strong><span>Investments managed</span></div>
      </div>
      <Tickertape />
    </main>
  )
}

export default Landpage
