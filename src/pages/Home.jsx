import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import './Home.css'
import bbg from '../components/Assets/weldbgg.jpg'
import weldrod from '../components/Assets/weldingrod.jpg'
import weldmachine from '../components/Assets/weldmachine.jpg'
import weldacc from '../components/Assets/weldacc.jpg'
import accessories from "../components/Assets/availweld.png"
import happycust from "../components/Assets/happycust.png"
import servedyears from "../components/Assets/yearserve.png"
import CountUp from './CountUp'
import migwelder from "../components/Assets/migmac.jpeg"
import tigwelder from "../components/Assets/tigmac.jpeg";
import multiwelder from "../components/Assets/multiwelder.jpeg";
import mpesalogo from "../components/Assets/mpesalogo.jpg"
import pb from "../components/Assets/primebanklogo.jpeg"

const Home = () => {
  const isDesktoporLaptop = useMediaQuery({ minDeviceWidth: 1224});
  const isTabletorMobile = useMediaQuery({ maxDeviceWidth: 1224});
  const navigate = useNavigate();

  return (
    <div className='all-contain'>
      <div className="homeContainer">
        {isDesktoporLaptop && <img src={bbg} className="weldbg" alt="w" />}
        <div className="overlay">
          <div className="overlay-content">
            <h1>Discover Our Welding Solutions</h1>
            {isTabletorMobile && <p>Tap below to learn more</p>}
            <p>
              At Hardware and Welding Supplies, we understand the importance of
              reliable and efficient welding equipment in achieving superior
              results. Whether you're a seasoned professional or a DIY
              enthusiast, our extensive range of products caters to all your
              welding needs. From state-of-the-art welding machines to a wide
              selection of electrodes, wires, and accessories, we have
              everything you need to tackle any welding project with confidence.
            </p>
          </div>
        </div>
      </div>
      <div className="card-container">
        <div className="card">
          <img src={weldmachine} alt="Welding Machines" />
          <button onClick={() => navigate("/weldingmachines")}>
            Welding Machines
          </button>
        </div>
        <div className="card">
          <img src={weldrod} alt="Welding Rods" />
          <button onClick={() => navigate("/weldingrods")}>Welding Rods</button>
        </div>
        <div className="card">
          <img src={weldacc} alt="Welding Accessories" />
          <button onClick={() => navigate("/weldingaccessories")}>
            Welding Accessories
          </button>
        </div>
      </div>

      <div className="number-widget">
        <div className="number-item">
          <img src={happycust} alt="" />
          <CountUp start={0} end={500} duration={2000} suffix="+" />
          <p>
            <b>Happy Customers</b>
          </p>
        </div>
        <div className="number-item">
          <img src={accessories} alt="" />
          <CountUp start={0} end={2500} duration={2000} suffix="+" />
          <p>
            <b>Available Welding Equipment</b>
          </p>
        </div>
        <div className="number-item">
          <img src={servedyears} alt="" />
          <CountUp start={0} end={40} duration={2000} suffix="+" />
          <p>
            <b>Years serving you</b>
          </p>
        </div>
      </div>

      <div className="featured-products">
        <h1>CHECK OUT THE FAVORITES!</h1>
        <div className="favorites">
          <div className="faves">
            <img src={migwelder} alt="" />
            <h4>The Mig-250 welder</h4>
            <p>
              Experience unmatched precision and power with the Mig 250 Welder,
              perfect for all your heavy-duty welding needs.
            </p>
            <button>Request Quote</button>
          </div>
          <div className="faves">
            <img src={tigwelder} alt="" />
            <h4>The Tig Welder</h4>
            <p>
              Achieve flawless, high-quality welds with the versatile and
              reliable Tig Welder for professional-grade results.
            </p>
            <button>Request Quote</button>
          </div>
          <div className="faves">
            <img src={multiwelder} alt="" />
            <h4>The Multi-Welder</h4>
            <p>
              Discover ultimate flexibility with the Multi-Welder, combining
              Mig, Tig, and Plasma welding capabilities in one powerful machine
            </p>
            <button>Request Quote</button>
          </div>
        </div>
      </div>
      <div className="payment-details">
        <h1>Payment Details</h1>
        <div className="online-pay">
          <div className="mobile-pay">
            <img src={mpesalogo} alt="" className="pay-logo" />
            <h3>M-Pesa</h3>
            <div className="pay-details">
              <h4 className="account-label">Paybill No: </h4>
              <h4>865459</h4>
            </div>
            <div className="pay-details">
              <h4 className="account-label">Account Name: </h4>
              <h4>HWS</h4>
            </div>
          </div>
          <div className="bank-pay">
            <img src={pb} alt="" className="pay-logo" />
            <h3>Prime Bank</h3>
            <div className="pay-details">
              <h4 className="account-label">Paybill No: </h4>
              <h4> 982800</h4>
            </div>
            <div className="pay-details">
              <h4 className="account-label">Account No: </h4>
              <h4> 3000021956</h4>
            </div>
          </div>
        </div>
      </div>
      <div className='transport-area'>
        <h4>We Transport Goods Countrywide!</h4>
        <h2>Kindly contact 0726102499 for prices!</h2>
      </div>
    </div>
  );
}

export default Home
