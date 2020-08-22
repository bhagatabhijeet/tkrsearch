// Import functions
import { getStock, getCompany, getTopActive } from './scripts/stock.js';
import { getTopCrypto, getCryptoList } from './scripts/marketcoin.js';

let stockSymbols = 'AAPL';
// getStock(stockSymbols);

$('document').ready(async () => {
  // Populate 5000 Coins
  // TODO -> Use better API
  // let cryptoData = getCryptoList('5000');

  // Populate Top Stocks

  // Populate Top Crypto
  let topCrypto = await getTopCrypto();
  console.log(topCrypto);
  // No Error -> Continue
  if (topCrypto.error === false) {
    let cryptoList = '';

    topCrypto.data.forEach((element) => {
      console.log(element);
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

    $('#cryptoList').html(cryptoList);
  }

  // Get Crypto if no Crypto check for Stock.
});
