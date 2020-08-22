// Import functions
import { getTopCrypto, getCryptoBy } from './scripts/marketcoin.js';
import { getStock, getCompany, getTopStocks } from './scripts/stock.js';

let stockSymbols = 'AAPL';
// getStock('AAPL');

$('document').ready(async () => {
  // // Populate Top Stocks
  // let topStocks = await getTopStocks();
  // console.log(topStocks);
  // let stockList = '';
  // let i = 1;

  // // This will loop through the returned Data Array
  // topStocks.forEach((element) => {
  //   // Creating a string of the following
  //   stockList += `
  //      <tr>
  //          <th scope="row">${i++}</th>
  //          <td>${element.companyName}</td>
  //          <td>${element.symbol}</td>
  //          <td>${element.latestPrice}</td>
  //          <td>${element.marketCap}</td>
  //      </tr>
  //      `;
  // });

  // // Append list into table body
  // $('#stockList').html(stockList);
  // }
  // // Get Top 10 Crypto from API
  // let topCrypto = await getTopCrypto();
  // // No Error in API Response -> Continue
  // if (topCrypto.error === false) {
  //   let cryptoList = '';

  //   // This will loop through Data Array
  //   topCrypto.Data.forEach((element, index) => {
  //     // Concatening an HTML String of the following
  //     cryptoList += `
  //       <tr>
  //         <th scope="row">${index + 1}</th>
  //         <td>${element.CoinInfo.FullName}</td>
  //         <td>${element.CoinInfo.Name}</td>
  //         <td>${element.DISPLAY.USD.PRICE}</td>
  //       </tr>
  //     `;

  //     // Append list into table body
  //     $('#cryptoList').html(cryptoList);
  //   });
  // }

  $('#searchBtn').on('click', async (e) => {
    e.preventDefault();
    let response = {};

    if ($('#defaultInline1').prop('checked')) {
      console.log(`Stocks`);
    } else if ($('#defaultInline2').prop('checked')) {
      let cSymbol = $('#searchInput').val().toUpperCase();
      response = await getCryptoBy(cSymbol);

      // Deconstruct
      let { PRICE: price } = response.DISPLAY.cSymbol.USD;
    } else {
      console.log(`huh`);
    }
  });
}); // End of Doc.ready()

// function displayCrypto() {}
// function getCrytpo() {}
// function displayTopCrypto() {}
