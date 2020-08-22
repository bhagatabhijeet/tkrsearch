// Import functions
import { getStock, getCompany, getTopStocks } from './scripts/stock.js';
import { getTopCrypto, getCryptoList } from './scripts/marketcoin.js';

let stockSymbols = 'AAPL';
// getStock(stockSymbols);

$('document').ready(async () => {
  // Populate 5000 Coins
  // TODO -> Use better API
  // let cryptoData = getCryptoList('5000');


  // Populate Top Stocks
  let topStocks = await getTopStocks();
  console.log(topStocks);
  let stockList = '';
  let i = 1;

  // This will loop through the returned Data Array
  topStocks.forEach((element) => {
    // Creating a string of the following
    stockList += ` 
      <tr>
          <th scope="row">${i++}</th>
          <td>${element.companyName}</td>
          <td>${element.symbol}</td>
          <td>${element.latestPrice}</td>
          <td>${element.marketCap}</td>
      </tr>
      `;
  });

  // Append list into table body
  $('#stockList').html(stockList);
// }

  // Populate Top Crypto
  let topCrypto = await getTopCrypto();
  console.log(topCrypto);
  // No Error -> Continue
  if (topCrypto.error === false) {
    let cryptoList = '';

    // This will loop through the returned Data Array
    topCrypto.data.forEach((element) => {
      // Creating a string of the following
      cryptoList += ` 
        <tr>
            <th scope="row">${element.rank}</th>
            <td>${element.name}</td>
            <td>${element.symbol}</td>
            <td>${moment(element.last_historical_data).format(
              'HH[:]mm [-] MM[/]DD[/]YY'
            )}</td>
        </tr>
        `;
    });

    // Append list into table body
    $('#cryptoList').html(cryptoList);
  }

  // Get Crypto if no Crypto check for Stock.
});
