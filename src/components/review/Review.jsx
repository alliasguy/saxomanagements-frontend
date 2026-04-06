import React, {useRef,useState} from 'react'
import './review.css'
// Import Swiper React components
import {ImQuotesLeft} from 'react-icons/im'
import {ImQuotesRight} from 'react-icons/im'
import {AiTwotoneStar} from 'react-icons/ai'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules


const Review = () => {
    
  return (
    <>
    <div className='review-section'>
        <div className="videoframe-text-container" data-aos="fade-up">
          <h1>Client <span className="highlight">reviews </span></h1>
          <p>here are some reviews left by our most profitable copytraders.</p>
        </div>
        <div className="review-card-container">
          <div className="review-card" data-aos="fade-up">
            <div className="review-card-img-container">
              <img src="/24.jpg" alt="" />
              <div className="review-card-rating-container">
                <div className="rate-icon-container">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <p className='investor-name'>james Donald.</p>
              </div>
            </div>
            <div className="investor-review-container">
              <span className='right-quote'>
                <ImQuotesLeft />
              </span>
              <p>I've been with Saxo Managements for over a year and the results have been outstanding. The platform connects me to skilled traders whose strategies are replicated directly into my account. It takes the guesswork out of investing and lets my capital grow steadily. The transparency and tracking tools give me full confidence. Among everything I've tried, Saxo Managements stands above the rest.</p>

              <span className="left-quote">
                <ImQuotesRight />
              </span>
            </div>
          </div>
          <div className="review-card" data-aos="fade-up">
            <div className="review-card-img-container">
              <img src="/83.jpg" alt="" />
              <div className="review-card-rating-container">
                <div className="rate-icon-container">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <p className='investor-name'>paul Mossad.</p>
              </div>
            </div>
            <div className="investor-review-container">
             <span className='right-quote'>
                <ImQuotesLeft />
              </span>
              <p>Saxo Managements completely changed the way I approach the markets. I wanted to start investing but had no idea where to begin. Their copy trading system, managed by professionals, gave me access to expert-level strategies without needing to trade myself. I’ve seen consistent growth and now feel genuinely confident about my finances, despite having no prior trading experience.</p>

              <span className="left-quote">
                <ImQuotesRight />
              </span>
            </div>
          </div>
          <div className="review-card" data-aos="fade-up">
            <div className="review-card-img-container">
              <img src="/92.jpg" alt="" />
              <div className="review-card-rating-container">
                <div className="rate-icon-container">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <p className='investor-name'>Michael H.</p>
              </div>
            </div>
            <div className="investor-review-container">
              <span className='right-quote'>
                <ImQuotesLeft />
              </span>
              <p>Choosing Saxo Managements has been one of the best financial decisions I’ve made. The real-time trade mirroring, combined with a clean interface and clear analytics, makes it effortless to monitor my account. I trust the traders behind the platform and the overall consistency of the system. It’s professional, reliable, and I’d recommend it to anyone looking to grow their wealth.</p>

              <span className="left-quote">
                <ImQuotesRight />
              </span>
            </div>
          </div>
          <div className="review-card" data-aos="fade-up">
            <div className="review-card-img-container">
              <img src="/76.jpg" alt="" />
              <div className="review-card-rating-container">
                <div className="rate-icon-container">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <p className='investor-name'>Kairo Bensley</p>
              </div>
            </div>
            <div className="investor-review-container">
              <span className='right-quote'>
                <ImQuotesLeft />
              </span>
              <p>Joining Saxo Managements ranks among the best financial moves I’ve ever made. Live trade syncing, an intuitive layout, and detailed data make managing my account incredibly straightforward. I have full respect for the traders I follow and complete trust in the platform’s stability. It delivers real, dependable value. I strongly recommend it to anyone serious about growing their wealth.</p>

              <span className="left-quote">
                <ImQuotesRight />
              </span>
            </div>
          </div>
          <div className="review-card" data-aos="fade-up">
            <div className="review-card-img-container">
              <img src="/67.jpg" alt="" />
              <div className="review-card-rating-container">
                <div className="rate-icon-container">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <p className='investor-name'>Zaylen Cross</p>
              </div>
            </div>
            <div className="investor-review-container">
              <span className='right-quote'>
                <ImQuotesLeft />
              </span>
              <p>Saxo Managements is easily one of the smartest financial choices I've made. Real-time trade replication, a user-friendly interface, and in-depth insights make monitoring my portfolio completely effortless. The expertise of the traders and the platform's consistent performance speak for themselves. It earns both trust and results. I'd strongly recommend it to anyone ready to take their investments seriously.</p>

              <span className="left-quote">
                <ImQuotesRight />
              </span>
            </div>
          </div>
          <div className="review-card" data-aos="fade-up">
            <div className="review-card-img-container">
              <img src="/85.jpg" alt="" />
              <div className="review-card-rating-container">
                <div className="rate-icon-container">
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                  <AiTwotoneStar />
                </div>
                <p className='investor-name'>Mira Okoro</p>
              </div>
            </div>
            <div className="investor-review-container">
              <span className='right-quote'>
                <ImQuotesLeft />
              </span>
              <p>Choosing Saxo Managements has proven to be an excellent financial decision. The platform excels at live trade syncing, and its clean layout paired with clear analytics makes tracking my account completely simple. I value the skill of the traders behind it and trust the platform completely. It’s a solid, dependable solution for anyone who wants to build wealth with real confidence.</p>

              <span className="left-quote">
                <ImQuotesRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Review