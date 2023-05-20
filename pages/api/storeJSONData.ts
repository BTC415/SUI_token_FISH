
import { readFile, writeFile } from "fs/promises";

const dataFilePath = process.env.PATH + '/ClaimData.json';

export default async function handler(req, res) {
    if(req.method === 'GET') {
        const jsonData = await readFile(dataFilePath);
        const objectData = JSON.parse(jsonData.toString());

        res.status(200).json(objectData);
    } else {
        try {
            let jsonData = await readFile(dataFilePath);
            // console.log("objectData?>>>>>", jsonData.toString())
            let jsonString = jsonData.toString();
            let objectData = {};
            if(jsonString != '') {
                objectData = JSON.parse(jsonString);
            }        
            const userInfo = req.body;
            if(objectData[userInfo.address]) {
                res.status(200).json({ message: 'User aleady exists.', type: 'error' });
            } else {
                objectData[userInfo.address] = userInfo;
                const updatedData = JSON.stringify(objectData);
                await writeFile(dataFilePath, updatedData);
                res.status(200).json({ message: 'Data stored successfully', type: 'success' });
            }            
        } catch (error) {
            console.error('error>>>',error);
            // Send an error response
            res.status(500).json({ message: error });
        }
    }    
}


// export default async function handler(req, res) {
//     console.log("backend-req?>>>>>", req)
//     try {
//         let jsonData = await readFile(dataFilePath);
//         const objectData = JSON.parse(jsonData.toString());
//         const userInfo = req.body;
//         objectData.push(userInfo);
//         const updatedData = JSON.stringify(objectData);
//         await writeFile(dataFilePath, updatedData);
//         res.status(200).json({ message: 'Data stored successfully' });
//     } catch (error) {
//         console.error('error>>>',error);
//         // Send an error response
//         res.status(500).json({ message: error });
//     }
// }