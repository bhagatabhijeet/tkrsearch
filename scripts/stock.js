// Temporary value (need input from searchbox)
let stockSymbols = 'AAPL';

// Stock API call
export function getStock(stockSymbols) {
  const stockApiKey = 'pk_9eb49acc515249ba85d431d6a16d502b';
  const stockURL = `https://cloud.iexapis.com/v1/stock/${stockSymbols}/book?token=${stockApiKey}`;
  $.ajax({
    url: stockURL,
    method: 'GET',
  }).then(function (stockData) {
    console.log(stockData);
  });
}

// Gets company data
export function getCompany(stockSymbols) {
  const stockApiKey = 'pk_9eb49acc515249ba85d431d6a16d502b';
  const companyURL = `https://cloud.iexapis.com/v1/stock/${stockSymbols}/company?token=${stockApiKey}`;
  $.ajax({
    url: companyURL,
    method: 'GET',
  }).then(function (companyData) {
    console.log(companyData);
  });
}

// Gets top 10 active stocks
export function getTopActive() {
  const stockApiKey = 'pk_9eb49acc515249ba85d431d6a16d502b';
  const topURL = `https://cloud.iexapis.com/v1/stock/market/list/mostactive?token=${stockApiKey}`;
  $.ajax({
    url: topURL,
    method: 'GET',
  }).then(function (topData) {
    console.log(topData);
  });
}
