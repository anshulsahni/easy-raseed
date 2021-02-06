// const http = require('http');
import axios from 'axios';

const ids = [
  "1K7L8N2LcN",
  "kQ7qDT1bNr",
  "wAOZTWkYLA",
  "TZdmY51oGa",
  "D6vHkOQaTf",
  "kv2nmn1WHh",
  "Hc2PNVJD1U",
];

ids.forEach(id => {
  // console.log({id}, 'from testing');
  console.log('http://127.0.0.1:8888/receipts/'+id);
  axios({
    url: 'http://127.0.0.1:8888/receipts/'+id,
    data: { id },
  }).then(response => {
    console.log(response.data);
  });
})