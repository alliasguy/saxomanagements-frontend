import { useNavigate } from 'react-router-dom'
import './traderslist.css'
const TradersList = () => {
  const navigate = useNavigate()

  return (
    <section className='TraderListSection'>
      <div className="traderListSectionWrapper">
        <div className="videoframe-text-container" data-aos="fade-up">
          <h1>More than 1000  <span className="highlight">traders </span></h1>
          <p>to choose from on Saxo Managements</p>
        </div>
        <div className="traderListSectionCardContainer" data-aos="fade-up">

          <div className="traderListCard">
            <div className="traderProfileContainer">
              <div className="traderListProfile">
                <img src="/jurica-koletic-7YVZYZeITc8-unsplash.jpg" alt="" className="traderListProfilePicture" />
                <span className="traderListProfileName">
                  <p className="traderListProfileFirstname">
                    Maximuz
                  </p>
                  <p className="traderListProfileLastname">
                    Cole
                  </p>
                </span>
              </div>
              <div className="copyBtn" onClick={() => {
                navigate('/signup')
              }}>
                  <p>copy</p>
              </div>
            </div>
            <div className="traderPerformanceContainer">
              <h3>+223%</h3>
              <p>gain</p>
              <small>+55% all time</small>
            </div>
            <div className="traderListCardFooter">
              <div className="riskLevelContainer"></div>
              <div className="traderFollowerContainer">
                <p>56 followers</p>
              </div>
            </div>
          </div>
          <div className="traderListCard">
            <div className="traderProfileContainer">
              <div className="traderListProfile">
                <img src="/fortune-vieyra-QIMjYJSFoXM-unsplash.jpg" alt="" className="traderListProfilePicture" />
                <span className="traderListProfileName">
                  <p className="traderListProfileFirstname">
                    pete
                  </p>
                  <p className="traderListProfileLastname">
                    Duplexi
                  </p>
                </span>
              </div>
              <div className="copyBtn" onClick={() => {
                navigate('/signup')
              }}>
                  <p>copy</p>
              </div>
            </div>
            <div className="traderPerformanceContainer">
              <h3>+356%</h3>
              <p>gain</p>
              <small>+87% all time</small>
            </div>
            <div className="traderListCardFooter">
              <div className="riskLevelContainer"></div>
              <div className="traderFollowerContainer">
                <p>105 followers</p>
              </div>
            </div>
          </div>
          <div className="traderListCard">
            <div className="traderProfileContainer">
              <div className="traderListProfile">
                <img src="/gregory-gill-4Bf5LNEPqZ0-unsplash.jpg" alt="" className="traderListProfilePicture" />
                <span className="traderListProfileName">
                  <p className="traderListProfileFirstname">
                    EA trader
                  </p>
                  <p className="traderListProfileLastname">
                    Paul
                  </p>
                </span>
              </div>
              <div className="copyBtn" onClick={() => {
                navigate('/signup')
              }}>
                  <p>copy</p>
              </div>
            </div>
            <div className="traderPerformanceContainer">
              <h3>+421%</h3>
              <p>gain</p>
              <small>+308% all time</small>
            </div>
            <div className="traderListCardFooter">
              <div className="riskLevelContainer"></div>
              <div className="traderFollowerContainer">
                <p>2k+ followers</p>
              </div>
            </div>
          </div>
          <div className="traderListCard">
            <div className="traderProfileContainer">
              <div className="traderListProfile">
                <img src="/istockphoto-1322849492-170667a.jpg" alt="" className="traderListProfilePicture" />
                <span className="traderListProfileName">
                  <p className="traderListProfileFirstname">
                    Forex
                  </p>
                  <p className="traderListProfileLastname">
                    Guy
                  </p>
                </span>
              </div>
              <div className="copyBtn" onClick={() => {
                navigate('/signup')
              }}>
                  <p>copy</p>
              </div>
            </div>
            <div className="traderPerformanceContainer">
              <h3>+683%</h3>
              <p>gain</p>
              <small>+553% all time</small>
            </div>
            <div className="traderListCardFooter">
              <div className="riskLevelContainer"></div>
              <div className="traderFollowerContainer">
                <p>6k+ followers</p>
              </div>
            </div>
          </div>
          <div className="traderListCard">
            <div className="traderProfileContainer">
              <div className="traderListProfile">
                <img src="/black2.jpg" alt="" className="traderListProfilePicture" />
                <span className="traderListProfileName">
                  <p className="traderListProfileFirstname">
                    john
                  </p>
                  <p className="traderListProfileLastname">
                    kennedy
                  </p>
                </span>
              </div>
              <div className="copyBtn" onClick={() => {
                navigate('/signup')
              }}>
                  <p>copy</p>
              </div>
            </div>
            <div className="traderPerformanceContainer">
              <h3>+396%</h3>
              <p>gain</p>
              <small>+75% all time</small>
            </div>
            <div className="traderListCardFooter">
              <div className="riskLevelContainer"></div>
              <div className="traderFollowerContainer">
                <p>116 followers</p>
              </div>
            </div>
          </div>
          <div className="traderListCard">
            <div className="traderProfileContainer">
              <div className="traderListProfile">
                <img src="/coporate-woman.jpg" alt="" className="traderListProfilePicture" />
                <span className="traderListProfileName">
                  <p className="traderListProfileFirstname">
                    rachael
                  </p>
                  <p className="traderListProfileLastname">
                    pico
                  </p>
                </span>
              </div>
              <div className="copyBtn" onClick={() => {
                navigate('/signup')
              }}>
                  <p>copy</p>
              </div>
            </div>
            <div className="traderPerformanceContainer">
              <h3>+123%</h3>
              <p>gain</p>
              <small>+99% all time</small>
            </div>
            <div className="traderListCardFooter">
              <div className="riskLevelContainer"></div>
              <div className="traderFollowerContainer">
                <p>55 followers</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
    </section>
  )
}

export default TradersList