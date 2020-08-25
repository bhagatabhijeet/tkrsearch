const stockApiKey = 'pk_9eb49acc515249ba85d431d6a16d502b';

// Stock API call
export async function getStock(stockSymbols) {
  const stockURL = `https://cloud.iexapis.com/v1/stock/${stockSymbols}/book?token=${stockApiKey}`;
  let response = {};
  await $.ajax({
    url: stockURL,
    method: 'GET',
    statusCode: {
      // In case invalid symbol need to alert user
      404: function () {
        console.log('Not Found 404');
      },
    },
  }).then(function (stockData) {
    response = stockData;
  });
  return response;
}

// Gets company data
export async function getCompany(stockSymbols) {
  const companyURL = `https://cloud.iexapis.com/v1/stock/${stockSymbols}/company?token=${stockApiKey}`;
  let response = {};
  await $.ajax({
    url: companyURL,
    method: 'GET',
  }).then(function (companyData) {
    response = companyData;
  });
  return response;
}

// Gets top 10 active stocks
export async function getTopStocks() {
  const topURL = `https://cloud.iexapis.com/v1/stock/market/list/mostactive?token=${stockApiKey}`;
  let response = {};
  await $.ajax({
    url: topURL,
    method: 'GET',
  }).then(function (topStocks) {
    response = topStocks;
  });
  return response;
}
