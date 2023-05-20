import React from 'react';
import Navbar from './Navbar';
import Services from './Services';
import Features from './Features';
import Features2 from './Features2';
import Descriptions from './Descriptions';
import Team from './Team';
import FooterLinks from './FooterLinks';
import SocialMedia from './SocialMedia';
import Footer from './Footer';
import Aux from './Aux_';



function App() {
  var bkg1 = {
    backgroundImage: 'url(images/wave-shape/wave1.png)',
  };
  var bkg2 = {
      backgroundImage: 'url(images/wave-shape/wave2.png)',
  };
  var bkg3 = {
      backgroundImage: 'url(images/wave-shape/wave3.png)',
  };
  var settings = {
      count: 5432,
      border: true,
      showTitle: true,
      noPoints: true,
  };
  const secondsInTheFuture = new Date("2023-06-10T18:30:00Z").getTime() / 1000;
  const secondsNow = new Date().getTime() / 1000;
  const difference = Math.round(secondsInTheFuture - secondsNow);

  return (
    <Aux>
      <Navbar />            
      <section className="section bg-home home-half" id="home">
          <div className="bg-overlay"></div>
          <div className="display-table">
              <div className="display-table-cell">
                  <div className="container">
                      <div className="row" id='_display_row'>
                          <div className="col-lg-12 text-white text-center">
                              <h1 className="home-title" id='_homeTitle'>NEW FINANCE ON SUI</h1>
                              <button  className="wp-block-button__link has-primary-gradient-background has-background wp-element-button  get_started">Get Started</button>
                              <button  className="wp-block-button__link  has-background wp-element-button learn_more">Learn More</button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div className="wp-block-cover aligncenter is-light" id='_video'>
              <video className="wp-block-cover__video-background intrinsic-ignore"  loop autoPlay muted>
                  <source src="images/fs.mp4" type="video/mp4" />
              </video> 
          </div>
      </section>

      <Services />
      <Descriptions />
      <Features />
      <Features2 />
      <Team />
      <Footer />
      <FooterLinks />
    </Aux>
  );
}

export default App;
