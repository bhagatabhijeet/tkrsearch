
    // Temporary value (need input from searchbox)
    let stockSymbols = 'AAPL'

    // Stock API call
    function getStock(stockSymbols){
        const stockApiKey = 'pk_9eb49acc515249ba85d431d6a16d502b'
        const stockURL = `https://cloud.iexapis.com/v1/stock/${stockSymbols}/batch?types=quote,news,chart&token=${stockApiKey}`
        $.ajax({
            url: stockURL,
            method: "GET",
        }).then(function(stockData) {
            console.log(stockData);
        });
    }    

    function getCompany(stockSymbols){
        const stockApiKey = 'pk_9eb49acc515249ba85d431d6a16d502b'
        const companyURL = `https://cloud.iexapis.com/v1/stock/${stockSymbols}/company?token=${stockApiKey}`
        $.ajax({
            url: companyURL,
            method: "GET",
        }).then(function(companyData) {
            console.log(companyData);
        });
    }
