import Link from 'next/link';
import React from 'react';

class Footer extends React.Component {
  render() {
  	return (
         <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 margin-t-20">
                        <div className='' style={{display:'flex'}}>
                            <div className='_img'>
                                <img decoding="async" loading="lazy" src="data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xml%3Aspace%3D%22preserve%22%20viewBox%3D%220%200%2015%2015%22%20fill%3D%22%23fff%22%3E%0A%20%20%3Cpath%20d%3D%22M12.555%201C10.41%201%207.534%202.471%205.602%205H4c-1.157%200-1.82.864-2.277%201.777L1.11%208H4l1.5%201.5L7%2011v2.889l1.223-.612C9.136%2012.821%2010%2012.157%2010%2011V9.398c2.529-1.932%204-4.809%204-6.953V1h-1.445zM10%204a1%201%200%201%201%200%202%201%201%200%201%201%200-2zm-6.5%206-.5.5c-.722.722-1%202.5-1%202.5s1.698-.198%202.5-1l.5-.5L3.5%2010z%22%2F%3E%0A%3C%2Fsvg%3E" alt="" style={{width:'18px',height:'18px'}} />
                            </div>
                            <div>
                                <Link href="/" target="_self" rel="home" aria-current="page" style={{fontSize: "24px",color: '#e7e7e7'}}>FISH</Link>
                            </div>                                
                        </div>                        
                        <div className="text-muted margin-t-20">
                            <p style={{fontSize:'18px'}}>THE NEW FINANCE BUILT ON SUI</p>
                        </div>
                        <form className="form subscribe">
                            <input placeholder="Search website" className="form-control" required />
                            
                        </form>
                    </div>
                    <div className="col-lg-5  offset-lg-1 margin-t-20">
                        <h4 style={{fontSize:'21px'}}>Company</h4>
                        <div className="text-muted margin-t-20">
                            <ul className="list-unstyled footer-list" style={{fontSize:'18px'}}>
                                <li><Link href="#">Home</Link></li>
                                <li><Link href="#">About</Link></li>
                                <li><Link href="#">Pricing</Link></li>
                                <li><Link href="#">FAQ</Link></li>
                                <li><Link href="#">Reviews</Link></li>
                                <li><Link href="#">Contact</Link></li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </footer>
  	);
  }
}
export default Footer;