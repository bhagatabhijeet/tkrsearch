// Import functions
import { getTopCrypto } from './scripts/marketcoin.js';
import { getStock, getCompany, getTopStocks } from './scripts/stock.js';


let stockSymbols = 'AAPL';
// getStock('AAPL');

$('document').ready(async () => {
  // Get Top 10 Crypto from API

  let topCrypto = await getTopCrypto();

  // No Error in API Response -> Continue
  if (topCrypto.error === false) {
    let cryptoList = '';

    // This will loop through Data Array
    topCrypto.Data.forEach((element, index) => {
      // Concatening an HTML String of the following
      cryptoList += `
        <tr>
          <th scope="row">${index + 1}</th>
          <td>${element.CoinInfo.FullName}</td>
          <td>${element.CoinInfo.Name}</td>
          <td>${element.DISPLAY.USD.PRICE}</td>
        </tr>

      `;

      // Append list into table body
      $('#cryptoList').html(cryptoList);
    });
  }

  // Get Crypto if no Crypto check for Stock.
});
