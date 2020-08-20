
// Temporary value (need input from searchbox)
let stockSymbols = 'AAPL'

// Stock API call
function stockApi(stockSymbols){
    const stockApiKey = '93422ad3ea073e8cede10d31527869b6'
    const stockURL = 'https://ondemand.websol.barchart.com/getQuote.json?apikey=${stockApiKey}&symbols=${stockSymbols}&fields=fiftyTwoWkHigh%2CfiftyTwoWkHighDate%2CfiftyTwoWkLow%2CfiftyTwoWkLowDate'
    $.ajax({
        url: stockURL,
        method: "GET",
    }).then(function(stockData) {
        console.log(stockData);
    });
}    






