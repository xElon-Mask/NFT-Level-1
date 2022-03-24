require("dotenv").config();
const key = process.env.PINATA_KEY;
const secret = process.env.PINATA_SECRET;
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(key, secret);
const fs = require("fs");
const readableStreamForFile = fs.createReadStream("xElon-Mask.jpg");

const options = {
  pinataMetadata: {
    name: "xElon-Mask",
  },
  pinataOptions: {
    cidVersion: 0,
  },
};

pinata
  .pinFileToIPFS(readableStreamForFile, options)
  .then((result) => {
    const body = {
      description: "First NFT from Elon Mask.",
      image: result.IpfsHash,
      name: "A  NFTportrait of Elon Mask",
    };

    pinata
      .pinJSONToIPFS(body, options)
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });
