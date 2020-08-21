$(document).ready(function(){

    // Temporary value (need input from searchbox)
    let stockSymbols = 'AAPL'
    const stockApiKey = '93422ad3ea073e8cede10d31527869b6'

    // Stock API call
    function stockApi(stockSymbols){
        const stockApiKey = '93422ad3ea073e8cede10d31527869b6'
        const stockURL = `https://marketdata.websol.barchart.com/getQuote.json?apikey=${stockApiKey}&symbols=${stockSymbols}`
        $.ajax({
            url: stockURL,
            method: "GET",
        }).then(function(stockData) {
            console.log(stockData);
        });
    }    

    // Company Profile call
    function getProfile(stockSymbols){
        const stockApiKey = '93422ad3ea073e8cede10d31527869b6'
        const profileURL = `https://marketdata.websol.barchart.com/getProfile.json?apikey=${stockApiKey}&symbols=${stockSymbols}`
        $.ajax({
            url: profileURL,
            method: "GET",
        }).then(function(profileData) {
            console.log(profileData);
        });
    } 

    // Gets Top 10 Hot stocks
    function getLeaders(stockSymbols){
        const stockApiKey = '93422ad3ea073e8cede10d31527869b6'
        const leadersURL = `https://marketdata.websol.barchart.com/getLeaders.json?apikey=${stockApiKey}&symbols=${stockSymbols}&assetType=STK&type=hot&maxRecords=10&sortDirection=DESC`
        $.ajax({
            url: profileURL,
            method: "GET",
        }).then(function(leadersData) {
            console.log(leadersData);
        });
    } 

    stockApi(stockSymbols);
    getProfile(stockSymbols);
    getLeaders(stockSymbols);
})
