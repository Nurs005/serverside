// const { json } = require("hardhat/internal/core/params/argumentTypes");

// import axios from 'axios';
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiJkNDA4ZjExNC05N2I5LTQ5MjgtOTQ0Yy0wMWFiMzJhZGRiNGMiLCJlbWFpbCI6InBhc3RhZm9ydEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiNjhkNjhiN2RjMjk4Nzg0ZjA0MzciLCJzY29wZWRLZXlTZWNyZXQiOiJjYmFhNDRmOTljZjI2MTUwYjlmMjYyMmU2MTEzMDc3NzQ2NTU1N2RmYzVjNjU2MGE1YTY4ZDViMTM4NWVkZGFhIiwiaWF0IjoxNzEwNDA0MjMyfQ.jT0kCIxKIaYwrt5Bb0WA2LDtNenFY01RhoUMkFw34PY"
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
      image: `https://ipfs.io/ipfs/${imageCID}`,
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
        const imageURR = `https://ipfs.io/ipfs/${imageCID}`;
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
