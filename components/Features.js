import React, { useEffect, useState } from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock } from "@mysten/sui.js";
import { FishNFTMintInfo, packageObjectId } from "../constants";
import ProgressBar  from 'react-bootstrap/ProgressBar';
import { useSuiProvider } from '@suiet/wallet-kit';

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

const Features = function () {
    const wallet = useWallet();
    const provider = useSuiProvider(wallet.chain.rpcUrl);
    const [mintNum, setMintNum] = useState(0);
    const [perNum, setPerNum] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            provider.getObject({id: FishNFTMintInfo, options: {
                showContent: true,
            }}).then(e => {
                // console.log(e);
                setMintNum(e.data.content.fields.commemorative_minted_num);
                setPerNum(e.data.content.fields.commemorative_minted_num * 100 / 2000);
                console.log('now_2>>', perNum)
            }).catch(err => {console.log(err)})
        }, 3000);
        return () => clearInterval(interval);
    }, [mintNum]);
    
    function handleMint() {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: `${packageObjectId}::fishnft::mint_commemorative`,
            arguments: [tx.pure(FishNFTMintInfo), tx.gas, tx.pure("0x6")],
        });
        wallet.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        }).catch(e => {console.log(e)});
    }
    
  	return (
        <section className="section bg-light" id="features">
            <div className="container margin-t-30" style={{maxWidth:'1230px',marginTop:'40px'}}>
                <div aria-hidden="true" className="wp-block-spacer has-fade-left-gradient-background has-background has-position-absolute has-top has-right has-bottom has-left has-z-index has-pointer-events-none has-width left_svg"></div>
                <div className='_mid_right' style={{width:'100%'}}>
                    <div aria-hidden="true" className="wp-block-spacer has-fade-right-gradient-background has-background has-position-absolute has-top has-right has-bottom has-left has-z-index has-pointer-events-none has-width right_svg"></div>    
                </div>
                
                <div className="row" style={{marginBottom:'8%'}}>
                    <div className="is-marquee">
                        <Svg_block_group />                    
                        <Svg_block_group />                    
                        <Svg_block_group />                    
                    </div>
                </div>
                <div className="row vertical-content">
                    <div className="col-lg-6" style={{paddingRight:'6%'}}>
                        <div className="features-box">
                            <p className="section-subtitle font-secondary" id='_feature_subtitle' style={{color:'#8686ff !important',marginBottom:'0px'}}>The fun continues</p>
                            <h1 className="" style={{fontSize:'52px',fontWeight:'600', color:'#5a6854'}}>MEMORIAL EDITION NFT</h1>
                            <h1 className="" style={{fontSize:'33px',lineHeight: '2',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'20px'}}>The launch of the Memorial Sui main net also represents the arrival of FISH, which will offer five fishing opportunities and three guarantees in the soon-to-be-released Fish Pond game, as well as airdrop eligibility for FISHSWAP.</h1>
                            <h1 className="" style={{fontSize:'55px',fontWeight:'600', color:'#5a6854'}}>$50</h1>
                        </div>
                    </div>
                    <div className="col-lg-6" style={{paddingLeft:'2%'}}>
                        <div className="features-box">
                        <img src="images/sui/22-1011x1024.jpg" style={{width:'100%', border:'40px solid #ffff', borderRadius
                    :'30px'}} alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className='container' style={{marginTop:'4%',zIndex:'99',position:'inherit',width:'70%'}}>
                <div style={{display: 'flex'}}>
                    <p style={{fontSize:'16px'}}>Received</p>
                    <p style={{fontSize:'16px', position:'absolute', right :'30px'}}>2000</p>
                </div>
                
                <ProgressBar animated now={perNum} label={`${perNum}%`} />
            </div>
            <div className='text-center'>                
                <h1 className="text-center" style={{fontSize:'33px',fontWeight:'550', color:'#5a6854',marginTop:'2%'}}>{mintNum}/2000</h1>
                <button className="btn  waves-effect waves-light _token" style={{marginTop: '1%',width:'150px',letterSpacing: '0px'}} onClick={handleMint}>MINT</button>
            </div>
        </section>
  	);
}
export default Features;