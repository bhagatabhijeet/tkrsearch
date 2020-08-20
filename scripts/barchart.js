
// Temporary value (need input from searchbox)
let stockSymbols = 'AAPL'
const stockApiKey = '93422ad3ea073e8cede10d31527869b6'

// Stock Data API call
function stockApi(stockSymbols, stockApiKey){
    const stockURL = 'https://ondemand.websol.barchart.com/getQuote.json?apikey=${stockApiKey}&symbols=${stockSymbols}&fields=fiftyTwoWkHigh%2CfiftyTwoWkHighDate%2CfiftyTwoWkLow%2CfiftyTwoWkLowDate'
    $.ajax({
        url: stockURL,
        method: "GET",
    }).then(function(stockData) {
        console.log(stockData);
    });
}    

// Get company profile
function getProfile(stockSymbols, stockApiKey){
    const profileURL = 'https://ondemand.websol.barchart.com/getProfile.json?apikey=${stockApiKey}&symbols=${stockSymbols}&fields=qtrOneEarnings%2CqtrTwoEarnings%2CqtrThreeEarnings%2CqtrFourEarnings'
    $.ajax({
        url: profileURL,
        method: "GET",
    }).then(function(profileData) {
        console.log(profileData);
    });
}