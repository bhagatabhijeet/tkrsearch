// Temporary value (need input from searchbox)
let stockSymbols = 'AAPL';

// Stock API call
export async function getStock(stockSymbols) {
  const stockApiKey = 'pk_9eb49acc515249ba85d431d6a16d502b';
  const stockURL = `https://cloud.iexapis.com/v1/stock/${stockSymbols}/book?token=${stockApiKey}`;
  let response = {};
  await $.ajax({
    url: stockURL,
    method: 'GET',
  }).then(function (stockData) {
    console.log(stockData);
    response = stockData;
  });
  return response;
}

// Gets company data
export async function getCompany(stockSymbols) {
  const stockApiKey = 'pk_9eb49acc515249ba85d431d6a16d502b';
  const companyURL = `https://cloud.iexapis.com/v1/stock/${stockSymbols}/company?token=${stockApiKey}`;
  let response = {};
  await $.ajax({
    url: companyURL,
    method: 'GET',
  }).then(function (companyData) {
    console.log(companyData);
    response = companyData;
  });
  return companyData;
}

// Gets top 10 active stocks
export async function getTopStocks() {
  const stockApiKey = 'pk_9eb49acc515249ba85d431d6a16d502b';
  const topURL = `https://cloud.iexapis.com/v1/stock/market/list/mostactive?token=${stockApiKey}`;
  let response = {};
  await $.ajax({
    url: topURL,
    method: 'GET',
  }).then(function (topStocks) {
    console.log(topStocks);
    response = topStocks;
  });
  return response;
}
