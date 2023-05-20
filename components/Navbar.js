
import React from 'react';
import { ConnectButton } from '@suiet/wallet-kit';
import Link from 'next/link';

class Navbar extends React.Component {
  render() {
  	return (
        <nav className="navbar navbar-expand-lg fixed-top navbar-custom sticky sticky-dark" style={{position:'absolute'}}>
            <div className="container" id='_nav_container'>            
                <Link className="navbar-brand logo text-uppercase" href="/" id='_nav_logo'>
                     FISH
                </Link>
                {/* <button type="button" aria-label="Theme switcher" data-title="Toggle dark mode" className="blog-theme-switcher tooltip-handle css-dsq3q4" style={{marginRight: '25px',backgroundColor:'#9e9fa1'}}>
                    <svg className="css-edyqgg" id='_dL' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M3 11.4489C3 16.7238 7.16904 21 12.3118 21C16.2709 21 19.6529 18.4657 21 14.8925C19.9331 15.4065 18.7418 15.6938 17.485 15.6938C12.9137 15.6938 9.20787 11.8928 9.20787 7.20396C9.20787 5.24299 9.85605 3.4373 10.9446 2C6.45002 2.6783 3 6.65034 3 11.4489Z" ></path></svg>
                </button> */}
                <div style={{marginRight: '125px'}} >
                    <ConnectButton label='Connect Wallet' onConnectError={(e) => console.log(e)}/>
                </div>
            </div>
        </nav>
  	);
  }
}

export default Navbar;