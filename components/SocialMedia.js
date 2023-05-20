import React from 'react';

class SocialMedia extends React.Component {
  render() {
  	return (
        <section className="cta bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <ul className="list-inline social margin-t-20">
                            <li className="list-inline-item"> <button className="social-icon"><i className="mdi mdi-facebook"></i></button></li>
                            <li className="list-inline-item"> <button className="social-icon"><i className="mdi mdi-twitter"></i></button></li>
                            <li className="list-inline-item"> <button className="social-icon"><i className="mdi mdi-google-plus"></i></button></li>
                            <li className="list-inline-item"> <button className="social-icon"><i className="mdi mdi-dribbble"></i></button></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 margin-t-30">
                        <p className="margin-b-0 contact-title"><i className="pe-7s-call"></i> &nbsp;+91 123 456 7890</p>
                    </div>
                    <div className="col-lg-3 margin-t-30 text-right">
                        <p className="contact-title"><i className="pe-7s-mail-open"></i>&nbsp; fish@info.com</p>
                    </div>
                </div>
            </div>
        </section>
  	);
  }
}
export default SocialMedia;