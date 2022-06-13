const fs = require("fs");
const axios = require('axios');
const FormData = require('form-data');
const pinataSDK = require('@pinata/sdk');
const basePath = process.cwd();
const buildDir = `${basePath}/build`;
const { symbol, imgExtension } = require(`${basePath}/src/config.js`);
const dotenv = require("dotenv");
dotenv.config({path: `${basePath}/.env`});

const API_URL = process.env.API_URL;
const API_TOKEN = process.env.API_TOKEN;
const PINATA_KEY = process.env.PINATA_KEY;
const PINATA_SECRET = process.env.PINATA_SECRET;

class Upload {
  constructor() {
    this.apiUrl = API_URL;
    this.apiToken = API_TOKEN;
    this.pinata = pinataSDK(PINATA_KEY, PINATA_SECRET);
  }

    imageS3 = async(_editionCount) => {
        console.log(this.apiUrl, this.apiToken)
        const formData = new FormData();
        formData.append('files', fs.readFileSync(`${buildDir}/images/${symbol}_${_editionCount + imgExtension}`), { filename: `${symbol}_${_editionCount + imgExtension}`});
            try {
                const response = await axios.post(this.apiUrl+'upload', formData, {
                'maxContentLength': Infinity,
                'maxBodyLength': Infinity,
                headers: {
                    "Connection": "keep-alive",
                    ...formData.getHeaders(),
                    Authorization: `Bearer ${this.apiToken}`,
                },
                });
                console.log(response);
                return response.data[0].url;
            } catch (error) {
                console.warn("Error: ", error);
            }  
    };

    previewS3 = async(_editionCount) => {
        console.log(this.apiUrl, this.apiToken)
        const formData = new FormData();
        formData.append('files', fs.readFileSync(`${buildDir}/images/preview_${symbol}_${_editionCount}.png`), { filename: `preview_${symbol}_${_editionCount}.png`});
            try {
                const response = await axios.post(this.apiUrl+'upload', formData, {
                'maxContentLength': Infinity,
                'maxBodyLength': Infinity,
                headers: {
                    "Connection": "keep-alive",
                    ...formData.getHeaders(),
                    Authorization: `Bearer ${this.apiToken}`,
                },
                });
                console.log(response);
                return response.data[0].url;
            } catch (error) {
                console.warn("Error: ", error);
            }  
    };

    metadatasS3 = async(nftData) => {
        try {
            const response = await axios.post(this.apiUrl+'metadata',nftData, {
            headers: {
                // "Connection": "keep-alive",
                // ...formData.getHeaders(),
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${this.apiToken}`,
            },
            });
            console.log(response);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    updateMetadatasS3 = async(nftData, _editionCount) => {
        try {
            const response = await axios.put(this.apiUrl+`metadata/${symbol}/${id}`, nftData, {
            headers: {
                // "Connection": "keep-alive",
                // ...formData.getHeaders(),
                'Content-Type' : 'application/json',
                Authorization: `Bearer ${this.apiToken}`,
            },
            });
            console.log(response);
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    imageIpfs = async(_editionCount) => {
        const file = fs.readFileSync(`${buildDir}/images/${symbol}_${_editionCount + imgExtension}`);
        try {
            return await this.pinata.pinFileToIPFS(file);
        } catch (e) {
            console.log(e);
        }
    };

    previewIpfs = async(_editionCount) => {
        const file = fs.readFileSync(`${buildDir}/images/preview_${symbol}_${_editionCount}.png`);
        try {
            return await this.pinata.pinFileToIPFS(file);
        } catch (e) {
            console.log(e);
        }
    };

    folderIpfs = async() => {
        try {
            return await this.pinata.pinFromFS(`${buildDir}/json`);
        } catch (e) {
            console.log(e);
        }
    };
}

module.exports = Upload;