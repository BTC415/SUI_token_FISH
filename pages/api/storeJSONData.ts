import { readFile, writeFile } from "fs/promises";
import { NetworkType, SuiKit } from '@scallop-io/sui-kit';
import { fishObjectId } from "../../constants";

const dataFilePath = process.env.DataPath + '/ClaimData.json';

const secretKey = process.env.SecretKey;
const networkType = process.env.Network;

const suiKit = new SuiKit({
    secretKey: secretKey,
    networkType: networkType as NetworkType,
});
const amount = 2_400_000

async function transfer (recipient) {
    const coinType = `${fishObjectId}::fish::FISH`;
    const balance = (await suiKit.getBalance(coinType)).totalBalance
    console.log('balance ', balance)
    await suiKit.transferCoin(recipient, amount, coinType);
}

export default async function handler(req, res) {
    if(req.method === 'GET') {
        let objectData = {}
        try {
            const jsonData = await readFile(dataFilePath);
            objectData = JSON.parse(jsonData.toString());
        } catch (e) {

        }

        res.status(200).json(objectData);
    } else {
        let jsonData = {}
        let jsonString = ""
        try {
            jsonData = await readFile(dataFilePath);
            jsonString = jsonData.toString();
        }
        catch (e) {

        }
        try {
            let objectData = {};
            if(jsonString != '') {
                objectData = JSON.parse(jsonString);
            }
            const userInfo = req.body;
            if(userInfo.address == undefined) {
                res.status(200).json({ message: 'Wallet is not connected.', type: 'error' });
            }
            else if(objectData[userInfo.address]) {
                res.status(200).json({ message: 'User aleady exists.', type: 'error' });
            } else {
                objectData[userInfo.address] = userInfo;
                const updatedData = JSON.stringify(objectData);
                await transfer(userInfo.address);
                await writeFile(dataFilePath, updatedData);
                res.status(200).json({ message: 'Data stored successfully', type: 'success' });
            }            
        } catch (error) {
            console.error('error>>>',error);
            res.status(500).json({ message: error });
        }
    }    
}
