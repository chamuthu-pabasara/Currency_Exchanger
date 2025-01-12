const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express(); // Corrected "axpress" to "express"

// Middlewares
app.use(express.json());
app.use(cors());

//get currencies
app.get("/getAllCurrency" ,async (req,res)=>{
    const nameURL= 'https://openexchangerates.org/api/currencies.json?app_id=edfb1ca8c87c4c298b8fbb06f56270aa';
    
    try{
        const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(nameData);
    }catch(err){
        console.error(err);
    }

});
//get target amount
app.get("/convert",async(req,res)=>{
    const{
        date,sourceCurrency,targetCurrency,amountSourceCurrency,
    }=req.query;
    try{
        const dataURL = `https://openexchangerates.org/api/historical/${date}.json?app_id=edfb1ca8c87c4c298b8fbb06f56270aa`;
        const dataResponce = await axios.get(dataURL);
       const rates =dataResponce.data.rates;
       //rates
       const sourceRate = rates[sourceCurrency];
       const targetRate=rates[targetCurrency];
       //final
       const targetAmount = (targetRate / sourceRate) * amountSourceCurrency;
       return res.json(targetAmount.toFixed(2));
    }catch(err){
        console.error(err);
    }
})

// Listen on a port
app.listen(5000, () => {
    console.log("Server started on port 5000");
});
