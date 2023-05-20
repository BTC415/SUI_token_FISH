import React from 'react';
import {CountUp} from 'use-count-up';
import Link from 'next/link';

class Descriptions extends React.Component {
  render() {
  	return (
          <section className="section section-lg bg-web-desc" id='_description'>
            {/* <div className="bg-overlay" style={{opacity:'0.2'}}></div> */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 text-center">
                            <Link href="https://docks.fishui.xyz" target="_blank" className="btn  waves-effect waves-light _token">TOKEN ECONOMICS</Link>                        
                    </div>
                </div>
                <div className="row">
                    <div className='text-center text-white margin-t-30 div_countup'>
                        <p className="countup"><CountUp isCounting start={100} end={638} duration={2} />K <span className="padding-t-15 home-desc" style={{fontSize:'20px',lineHeight:'54px'}}>Address</span></p>
                        <p className="countup"><CountUp  isCounting start={0} end={7} duration={1.5} />B <span className="padding-t-15 home-desc" style={{fontSize:'20px',lineHeight:'54px'}}>Tokens</span></p>
                        <p className="countup"><CountUp  isCounting start={10} end={24} duration={1} /> <span className="padding-t-15 home-desc" style={{fontSize:'20px',lineHeight:'54px'}}>hr</span></p>
                        <p className="countup"><CountUp  isCounting start={100} end={300} duration={1.5} />m <span className="padding-t-15 home-desc" style={{fontSize:'20px',lineHeight:'54px'}}>Interaction</span></p>
                    </div>
                </div>       
            </div>
        </section>
  	);
  }
}
export default Descriptions;