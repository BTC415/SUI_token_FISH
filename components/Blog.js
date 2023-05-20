import React from 'react';
import { Link } from 'react-router-dom';

class Blog extends React.Component {
  render() {
  	return (
            <section className="section bg-light pt-5" id="blog">
              <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <h1 className="section-title text-center">Blog</h1>
                        <p className="section-subtitle text-muted text-center font-secondary padding-t-30">Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean className at a euismod mus luctus quam.</p>
                    </div>
                </div>

                <div className="row margin-t-30">
                    <div className="col-lg-4">
                        <div className="blog-box margin-t-30 hover-effect">
                            <img src="images/blog/img-1.jpg" className="img-fluid" alt="" />
                            <div>
                                <h5 className="mt-4 text-muted">UI & UX Design</h5>
                                <h4 className="mt-3"><Link to="JavaScript:Void(0);" className="blog-title"> Doing a cross country road trip </Link></h4>
                                <p className="text-muted">She packed her seven versalia, put her initial into the belt and made herself on the way..</p>
                                <div className="mt-3">
                                    <Link to="JavaScript:Void(0);" className="read-btn">Read More <i className="mdi mdi-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="blog-box margin-t-30 hover-effect">
                            <img src="images/blog/img-2.jpg" className="img-fluid" alt="" />
                            <div>
                                <h5 className="mt-4 text-muted">Digital Marketing</h5>
                                <h4 className="mt-3"><Link to="JavaScript:Void(0);" className="blog-title">New exhibition at our Museum</Link></h4>
                                <p className="text-muted">Pityful a rethoric question ran over her cheek, then she continued her way.</p>
                                <div className="mt-3">
                                    <Link to="JavaScript:Void(0);" className="read-btn">Read More <i className="mdi mdi-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="blog-box margin-t-30 hover-effect">
                            <img src="images/blog/img-3.jpg" className="img-fluid" alt="" />
                            <div>
                                <h5 className="mt-4 text-muted">Travelling</h5>
                                <h4 className="mt-3"><Link to="JavaScript:Void(0);"className="blog-title">Why are so many people..</Link></h4>
                                <p className="text-muted">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</p>
                                <div className="mt-3">
                                    <Link to="JavaScript:Void(0);" className="read-btn">Read More <i className="mdi mdi-arrow-right"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  	);
  }
}
export default Blog;