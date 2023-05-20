import React, {useState, useEffect} from 'react';
import { useWallet } from '@suiet/wallet-kit';
import { TransactionBlock } from "@mysten/sui.js";
import { FishNFTMintInfo, packageObjectId } from "../constants";
import ProgressBar  from 'react-bootstrap/ProgressBar';
import { useSuiProvider } from '@suiet/wallet-kit';

const Features2 = () => {
    const wallet = useWallet()
    const provider = useSuiProvider(wallet.chain.rpcUrl);
    const [mintNum, setMintNum] = useState(0);
    const [perNum, setPerNum] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            provider.getObject({id: FishNFTMintInfo, options: {
                showContent: true,
            }}).then(e => {
                // console.log(e);
                setMintNum(e.data.content.fields.general_minted_num);
                setPerNum(e.data.content.fields.general_minted_num * 100 / 8000);
                // console.log('now_2>>', perNum)
            }).catch(err => {console.log(err)})
        }, 3000);
        return () => clearInterval(interval);
    }, [mintNum]);

    function handleMint() {
        const tx = new TransactionBlock();
        tx.moveCall({
            target: `${packageObjectId}::fishnft::mint_general`,
            arguments: [tx.pure(FishNFTMintInfo), tx.gas, tx.pure("0x6")],
        });
        wallet.signAndExecuteTransactionBlock({
            transactionBlock: tx,
        }).catch(e => {console.log(e)});
    }

  	return (
        <section className="section" id="features2">
            <div className="row" style={{marginTop:'2%'}}>
                <div className="col-lg-8 offset-lg-2">
                    
                </div>
            </div>
            <div className="container" style={{marginTop:'2%', maxWidth: '1290px'}}>
                <div className="row vertical-content">
                    <div className="col-lg-6" style={{paddingRight : '4%'}}>
                        <div className="features-box">
                        <img src="images/sui/11-1-1011x1024.jpg" style={{width:'100%', border:'40px solid #ffff', borderRadius
                    :'30px'}} alt="" />
                        </div>
                    </div>
                    <div className="col-lg-6" style={{paddingLeft:'5%', paddingRight:'8%'}}>
                        <div className="features-box">
                            <p className="section-subtitle font-secondary" id='_feature_subtitle' style={{color:'#8686ff',marginBottom:'0px'}}>The fun continues</p>
                            <h1 className="" style={{fontSize:'52px',fontWeight:'600', color:'#5a6854'}}>NORMAL</h1>
                            <h1 className="" style={{fontSize:'33px',lineHeight: '2',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'20px'}}>There are 2 chances to fish in the fish pond with one guarantee (must produce a reward), with which you can certify the early supporters of FISHSWAP and may be surprised.</h1>
                            <h1 className="" style={{fontSize:'55px',fontWeight:'600', color:'#5a6854'}}>$10</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container' style={{marginTop:'4%',zIndex:'99',position:'inherit',width:"70%"}}>
                <div style={{display: 'flex'}}>
                    <p style={{fontSize:'16px'}}>Received</p>
                    <p style={{fontSize:'16px', position:'absolute', right :'30px'}}>8000</p>
                </div>
                
                <ProgressBar animated now={perNum} label={`${perNum}%`} />
            </div>
            <div className='text-center'>
                <h1 className="text-center" style={{fontSize:'33px',fontWeight:'550', color:'#5a6854',marginTop:'4%'}}>{mintNum}/8000</h1>
                <button  className="btn  waves-effect waves-light _token" style={{marginTop: '1%',width:'150px',letterSpacing: '0px'}} onClick={handleMint}>MINT</button>
            </div>
            <div className="container" style={{marginTop:'8%'}}>
                <p className="section-subtitle font-secondary" style={{color:'#8686ff',marginBottom:'20px',fontSize: '18.4px'}}>fish</p>
                <h1 className="" style={{fontSize:'51px',fontWeight:'600', color:'#5a6854'}}>WHAT IS FISH</h1>
                <h1 className="" style={{fontSize:'28px',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'30px'}}>GIFT OF THE DEEP SEA</h1>
                <h1 className="" style={{fontSize:'28px',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'30px'}}>FISH IS JUST THE APPETIZER</h1>
                <h1 className="" style={{fontSize:'28px',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'30px'}}>MORE ON FISHSWAP COMING SOON</h1>
            </div>
            <div className="container" style={{marginTop:'5%'}}>
                <p className="section-subtitle font-secondary" style={{color:'#8686ff',marginBottom:'20px',fontSize: '18.4px'}}>fish</p>
                <h1 className="" style={{fontSize:'51px',fontWeight:'600', color:'#5a6854'}}>WHERE DOES FISH COME FROM</h1>
                <h1 className="" style={{fontSize:'28px',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'30px'}}>FISH WAS BORN FROM A MYSTERIOUS SEA</h1>
                <h1 className="" style={{fontSize:'28px',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'30px'}}>FWHERE THERE ARE 15 PARTNERS</h1>
                <h1 className="" style={{fontSize:'28px',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'30px'}}>WHO WORK TOGETHER TO MAINTAIN FISH</h1>
            </div>
            <div className="container" style={{marginTop:'5%'}}>
                <p className="section-subtitle font-secondary" style={{color:'#8686ff',marginBottom:'20px',fontSize: '18.4px'}}>fish</p>
                <h1 className="" style={{fontSize:'51px',fontWeight:'600', color:'#5a6854'}}>HOW TO JOIN</h1>
                <h1 className="" style={{fontSize:'28px',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'30px'}}>0 6 1 0</h1>
                <h1 className="" style={{fontSize:'28px',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'30px'}}>FISHSWAP WILL BE ONLINE SOON</h1>
                <h1 className="" style={{fontSize:'28px',fontWeight:'400', color:'#b7b0c1 !important',marginTop:'30px',lineHeight:'1.8'}}>MY FISH PARTNER TOLD ME THAT THERE WILL BE A MYSTERIOUS REWARD FOR HOLDING $FISH</h1>
            </div>
            <div className="container" style={{marginTop:'2%'}}>                
                <h1 className="text-center" style={{fontSize:'28px',fontWeight:'400', color:'#3a2f2f',marginTop:'30px'}}>INTERACTING WITH FISH CAN ALSO GIVE YOU SOME ANSWERS.</h1>
            </div>
            <div className='text-center' style={{height:'600px', textAlign:'center'}}>
                <iframe src="https://ora.ai/embed/7910c962-dffd-4935-be28-b86456ef2fbe" style={{height:'100%', width:'400px'}}  ></iframe>
            </div>
        </section>
  	);
}
export default Features2;