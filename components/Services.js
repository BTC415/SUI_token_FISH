import React, { useEffect, useReducer, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { toast } from 'react-toastify';
import ProgressBar  from 'react-bootstrap/ProgressBar';
import CountdownTimer from './CountdownTimer';

const Services = () => {
    const wallet = useWallet();
    const userAddress = wallet.account?.address;

    const [timeVarible, setTimeVarible] = useState(0);
    const [nowTime, setNowTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [claimNum, setClaimNum] = useState(0);

    useEffect(() => {
        setTimeVarible(10 * 60 * 60 * 1000);
        setNowTime(Date.UTC(2023, 4, 27, 10, 50, 0));
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/api/storeJSONData')
                .then(response =>  response.json())
                .then(data => {
                    const claimLength = Object.keys(data).length;
                    setClaimNum(2.4 * claimLength);
                    setProgress(2400000 * claimLength * 100 / 6000000000);
                })
                .catch(err => console.log(err))            
        }, 3000);
        return () => clearInterval(interval);
    }, [progress]);

    const _claimInert = async (userAddress) => {
        const response = await fetch('/api/storeJSONData' ,{
            method: 'POST',
            headers: {
                'content-Type' : 'application/json'
            },
            body: JSON.stringify({'address':userAddress})
        })
        const data = await response.json();
        console.log('data==>>>>>', data);
        toast(data.message, { hideProgressBar: true, autoClose: 2000, type: data.type, position:'bottom-right'});
        
    }

  	return (        
        <section className="section pt-5" id="services">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <h1 className="text-center" style={{fontSize:'30px',fontWeight:'600', color:'#5a6854', fontFamily:'Albert Sans, sans-serif'}}>WELCOME TO SUI</h1>
                        <h1 className="text-center" style={{fontSize:'60px',fontWeight:'700', fontFamily:'Albert Sans, sans-serif'}}>A GIFT FROM FISH</h1>                        
                    </div>
                </div>
                <div className="row vertical-content _aboutDiv">
                    <div className="mg-t-10">
                        <div className="features-box" style={{fontFamily:'Albert Sans, sans-serif !important'}}>
                            <h1 className="" style={{fontSize:'30px',fontWeight:'600', color:'#5a6854',lineHeight:'1.9'}}>A TOTAL OF 6,000,000,000 $FISH TOKENS ARE NOW AVAILABLE TO THOSE WHO MEET THE FOLLOWING CRITERIA.</h1>
                            <h1 className="text-center" style={{fontSize:'30px',fontWeight:'500', color:'#5a6854'}}>BEFORE MAY 5, 2023</h1>
                            <h1 className="" style={{fontSize:'32px',fontWeight:'400', color:'#5a6854',marginTop:'20px'}}>1. Mainnet address has sui tokens</h1>
                            <h1 className="" style={{fontSize:'32px',fontWeight:'400', color:'#5a6854',marginTop:'20px'}}>2. Test network interaction more than 5 times</h1>
                            <h1 className="" style={{fontSize:'32px',fontWeight:'400', color:'#5a6854',marginTop:'20px'}}>3. Contract deployer</h1>
                            <h1 className="text-center" style={{fontSize:'30px',fontWeight:'500', color:'#5a6854',marginTop:'6%',lineHeight:'1.7'}}>FOR A LIMITED TIME OF 24 HOURS, ANY UNCLAIMED TOKENS WILL BE DESTROYED</h1>
                            <h1 className="text-center" style={{fontSize:'30px',fontWeight:'500', color:'#5a6854',marginTop:'5%'}}>FIRST COME, FIRST SERVED</h1>
                            <div className='text-center'>
                                <button className="btn wp-element-button has-primary-gradient-background  waves-effect waves-light _claim" onClick={() => _claimInert(userAddress)}>CLAIM 2,400,000$FISH</button>
                            </div>                            
                        </div>
                    </div>
                    <div className='container' style={{marginTop:'4%',zIndex:'99',position:'inherit',width:'70%'}}>
                        <div style={{display: 'flex'}}>
                            <p style={{fontSize:'16px'}}>{claimNum}M</p>
                            <p style={{fontSize:'16px', marginLeft:'87%'}}>6000M</p>
                        </div>
                        
                        <ProgressBar animated now={progress} label={`${progress}%`} />
                    </div>
                    <div className='row' style={{width:'100%'}}></div>
                    <div className='_countdown row' >
                        <CountdownTimer targetDate={timeVarible + nowTime} />
                    </div>
                </div>
                <div className="row vertical-content _aboutDiv" style={{marginTop: '13%'}}>
                    <div className="mg-t-50">
                        <div className="features-box">
                            <h1 className="text-center" style={{fontSize:'35px',fontWeight:'600', color:'#3e3b3b'}}>ABOUT $FISH</h1>
                            <h1 className="" style={{fontSize:'30px',fontWeight:'500', color:'#5a6854',marginTop:'20px'}}>$10 billion in total $FISH</h1>
                            <h1 className="" style={{fontSize:'30px',fontWeight:'500', color:'#5a6854',marginTop:'20px'}}>(Free distribution to users who meet the requirements on sui)</h1>
                            <h1 className="" style={{fontSize:'30px',fontWeight:'500', color:'#5a6854',marginTop:'20px'}}>Liquidity is 30% of the total</h1>
                            <h1 className="" style={{fontSize:'30px',fontWeight:'500', color:'#5a6854',marginTop:'20px'}}>Team accounts for 10% of the total</h1>
                            <h1 className="" style={{fontSize:'30px',fontWeight:'500', color:'#5a6854',marginTop:'20px', lineHeight:'1.7'}}>(team will use 7% of this 10% as start-up capital for the fishpond play and 2% for buybacks)</h1>
                        </div>
                    </div>
                </div>
            </div>
        </section>
  	);
}
export default Services;