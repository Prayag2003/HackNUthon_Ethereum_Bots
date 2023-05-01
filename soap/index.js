const soapRequest = require('easy-soap-request');
const fs = require('fs');
const url = 'http://localhost:8000/wsdl';

const express = require("express")
const app = express();
const port = 6000;

const sampleHeaders = {
    'Content-Type': 'text/xml;charset=UTF-8',
    'soapAction': 'http://www.example.com/OrderService/FulfillOrder',
};

const xml = fs.readFileSync('test.xml', 'utf-8');

app.post('/', async (req, res) => {
    try {
        const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 });
        res.send(response);

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});