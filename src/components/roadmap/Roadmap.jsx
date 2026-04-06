import './roadmap.css'
import { FaArrowRight } from "react-icons/fa";
const Roadmap = () => {
  return (
    <section className='roadmapSection'>
      <div className="rodmapWrapper">
        <div className="videoframe-text-container" data-aos="fade-up">
          <h1>Start Trading in 3 Steps</h1>
        </div>
        <div className="roadmapContainer">
          <div className="roadmapCard" data-aos="fade-up">

            <div className="roadmapCounter">
              <h1>1</h1>
            </div>

            <div className="roadmapCardText">
              <h2>register</h2>
              <p>Open a live account and start copytrading in just minutes.</p>
            </div>
            
          </div>

          <div className="roadmapSvgContainer" data-aos="fade-up">
            <FaArrowRight />
          </div>
          <div className="roadmapCard" data-aos="fade-up">

            <div className="roadmapCounter">
              <h1>2</h1>
            </div>

            <div className="roadmapCardText">
              <h2>fund</h2>
              <p>Fund your account using a wide range of funding methods.</p>
            </div>
            
          </div>

          <div className="roadmapSvgContainer" data-aos="fade-up">
            <FaArrowRight />
          </div>
          <div className="roadmapCard" data-aos="fade-up">

            <div className="roadmapCounter">
              <h1>3</h1>
            </div>

            <div className="roadmapCardText">
              <h2>trade</h2>
              <p>Access 1000+ pro traders across all asset classes</p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}

export default Roadmap