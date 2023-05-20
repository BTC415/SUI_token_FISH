import React, { Component } from 'react';

const Svg_block = () => {
    return (
        <div className='svg_block'>
            <svg xmlns="http://www.w3.org/2000/svg" className="_svg" viewBox="0 0 24 24"><path d="m16.7 7.1-6.3 8.5-3.3-2.5-.9 1.2 4.5 3.4L17.9 8z"/></svg>
            <p className='svg_p'>FISH is coming soon!</p>
        </div>
    );
}

const Svg_block_group = () => {
    return (
        <div className='svg_block_group'>
            <Svg_block />
            <Svg_block />
            <Svg_block />
            <Svg_block />
            <Svg_block />
            <Svg_block />
        </div>
    )
}

const Team = () => {
  	return (
     <section className="section pt-4" id="team">
            <div className="container" style={{marginTop:'1%',maxWidth:'none'}}>
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className='text-center'>
                            <h1 className="text-center" style={{fontSize:'56px',fontWeight:'600', color:'#5a6854',marginTop:'4%'}}>READY TO BECOME A FISH?</h1>
                            <button className="btn  waves-effect waves-light _token" style={{marginTop: '1%',letterSpacing: '0px', marginBottom:'2%',paddingLeft:'30px',paddingRight:'30px',fontSize:'30px'}}>White Paper</button>
                            <h1 className="text-center" style={{fontSize:'30px',fontWeight:'400', color:'#acacd0'}}>SWIM IN THE SUI TOGETHER!</h1>
                        </div>
                    </div>
                </div>
                <div className="row" style={{marginTop:'5%'}}>
                    <div className="is-marquee2">
                        <Svg_block_group />                    
                        <Svg_block_group />                    
                        <Svg_block_group />                    
                    </div>
                </div>
            </div>
        </section>
    
  	);
}
export default Team;