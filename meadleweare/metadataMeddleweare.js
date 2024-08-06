// const { json } = require("hardhat/internal/core/params/argumentTypes");

// import axios from 'axios';
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkMmJmZGZmZS02Yzg0LTQwNzktYjRmMy00YTU5YWRjNjQ1NTgiLCJlbWFpbCI6ImlzbWFpbG92Lm5AZ2V4YWJ5dGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImMzZWI0Nzk2MDcxMzMwOTRiNGRkIiwic2NvcGVkS2V5U2VjcmV0IjoiZGQyMzU4OGRiOGYzNjg0ZTdiNjM0MjlhOTQ5M2YxMGMyMDgxNzY2MjVjOTgwZTk3ZWI1YWM1ZmNhNzRiODM1MiIsImlhdCI6MTcyMjU5Njg1M30.T6-kMfgVNdrXjRgTJUwUQZY5TQTQHXrQ1Qp_jA6Ijso"
const apiSecret = "cbaa44f99cf26150b9f2622e61130777465557dfc5c6560a5a68d5b1385eddaa"

class newClass {
  async uploadMetadata(req, res, next) {
    const { image, name, description, degreeValue } = req.body;
    if (degreeValue == '' && degreeValue == '') {
      return res.status(404).json("Не заданы версия цвета диплома и степень")
    }
    let imageCID = ''
    let collor = ''
    let degree = ''
    if (image == 'red' && degreeValue == 'bachelor') {
      imageCID = 'QmdsRS3BJeh1NgroQJkG4StD85cntWVfLReeBwg5dr3UQm'
      collor = 'Красный'
      degree = 'Бакалавр'
    } else if (image == 'blue' && degreeValue == 'bachelor') {
      imageCID = 'QmdsRS3BJeh1NgroQJkG4StD85cntWVfLReeBwg5dr3UQm'
      collor = 'Синий'
      degree = 'Бакалавр'
    } else if (image == 'red' && degreeValue == 'master') {
      imageCID = 'QmdsRS3BJeh1NgroQJkG4StD85cntWVfLReeBwg5dr3UQm'
      collor = 'Красный'
      degree = 'Мастер'
    } else if (image == 'blue' && degreeValue == 'master') {
      imageCID = 'QmdsRS3BJeh1NgroQJkG4StD85cntWVfLReeBwg5dr3UQm'
      collor = 'Синий'
      degree = 'Мастер'
    } else if (image == 'red' && degreeValue == 'doctor') {
      imageCID = 'QmdsRS3BJeh1NgroQJkG4StD85cntWVfLReeBwg5dr3UQm'
      collor = 'Красный'
      degree = 'Доктор'
    } else if (image == 'blue' && degreeValue == 'doctor') {
      imageCID = 'QmdsRS3BJeh1NgroQJkG4StD85cntWVfLReeBwg5dr3UQm'
      collor = 'Синий'
      degree = 'Доктор'
    }

    let objj = [{ "trait_type": "Цвет диплома", "value": `${collor}` }, { "trait_type": "Степень", "value": `${degree}` }];

    if (imageCID === '') {
      return res.status(404).json("Не правильная версия цвета диплома")
    }

    const metadata = JSON.stringify({
      name: name,
      description: description,
      image: `https://coral-magic-mackerel-539.mypinata.cloud/ipfs/QmR4AzXbj7myPBCqZpdMnKVNS1esVqGH6GKKP8sdVkBEWL`,
      attributes: objj, // Атрибут должен идти в виде массива из обьектов [{}, {}] 
    });
    try {
      const response = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
        method: 'POST',
        body: metadata,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Metadata uploaded successfully. CID:', `https://ipfs.io/ipfs/${data.IpfsHash}`);
        const metaUri = `https://ipfs.io/ipfs/${data.IpfsHash}`;
        const imageURR = `https://coral-magic-mackerel-539.mypinata.cloud/ipfs/QmR4AzXbj7myPBCqZpdMnKVNS1esVqGH6GKKP8sdVkBEWL`;
        req.metadata = metaUri;
        req.ipfsImage = imageURR;
        next()
        return
      }
    } catch (error) {
      return res.status(400).json(error.message)
    }
  }
}

module.exports = new newClass();
