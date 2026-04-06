import Landpage from '../components/Landpage/Landpage'
import Why from '../components/why/Why'
import Plan from '../components/plans/Plan'
import About from '../components/about/About'
import Faq from '../components/Faq/Faq'
import Review from '../components/review/Review'
import Contact from '../components/contact/Contact'
import Footer from '../components/footer/Footer'
import Faqcard from './Faqcard'
import Videoframe from '../components/videoframe/Videoframe'
import TradersList from '../components/tradersList/TradersList'
import CardContainer from '../components/cardcontainer/CardContainer'
import TeslaWidgetContainer from '../components/Teslawidget/TeslaWidgetContainer'
import CryptoNewsContainer from '../components/CryptoNewsSection/CryptoNewsContainer'
import ForexAnalysisSection from '../components/ForexAnalysisSection/ForexAnalysisSection'
import Mt5Section from '../components/mt5/Mt5Section'
import Roadmap from '../components/roadmap/Roadmap'
const Home = () => {
  return (
    <main className='home-img'>
      <Landpage />
      <Roadmap />
      <CardContainer />
      <Mt5Section />
      <TradersList />
      <Plan />
      <TeslaWidgetContainer />
      <Why />
      <Review />
      <CryptoNewsContainer />
      <ForexAnalysisSection />
      <Faq />
      <Contact />
      <Footer />
    </main>
  )
}

export default Home