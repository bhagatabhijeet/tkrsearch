
import { getTopCrypto, getCryptoBy } from './scripts/marketcoin.js';
import { getStock, getCompany, getTopStocks } from './scripts/stock.js';

let stockSymbols = 'AAPL';
// getStock('AAPL');

$('document').ready(async () => {
  // Populate Top Stocks
  let topStocks = await getTopStocks();
  console.log(topStocks);
  let stockList = '';

  // This will loop through the returned Data Array
  topStocks.forEach((element, i) => {
    // Creating a string of the following
    stockList += `
       <tr>
           <th scope="row">${i + 1}</th>
           <td>${element.companyName}</td>
           <td>${element.symbol}</td>
           <td style='text-align: right;'>$${element.latestPrice}</td>
       </tr>
       `;
  });

  // Append list into table body
  $('#stockList').html(stockList);
  
  // Get Top 10 Crypto from API
  let topCrypto = await getTopCrypto();
  // No Error in API Response -> Continue
  if (topCrypto.error === false) {
    let cryptoList = '';

    // This will loop through Data Array
    // topCrypto.Data.forEach((element, index) => {
    //   // Concatening an HTML String of the following
    //   cryptoList += `
    //     <tr>
    //       <th scope="row">${index + 1}</th>
    //       <td>${element.CoinInfo.FullName}</td>
    //       <td>${element.CoinInfo.Name}</td>
    //       <td>$${element.DISPLAY.USD.PRICE}</td>
    //     </tr>
    //   `;

    //   // Append list into table body
    //   $('#cryptoList').html(cryptoList);
    // });
  }

  $('#searchBtn').on('click', async (e) => {
    e.preventDefault();
    let response = {};
    if ($('#searchInput').val() === ""){
      return;
    }
    let cSymbol = $('#searchInput').val().toUpperCase();
    if ($('#defaultInline1').prop('checked')) {
      console.log(`Stocks`);
      response = await getStock(cSymbol);
      console.log(response);
    } else if ($('#defaultInline2').prop('checked')) {
      response = await getCryptoBySymbol(cSymbol);
      if(response.HasWarning){
        console.log(response);
      }


      // Deconstruct
      let { PRICE: price } = response.DISPLAY.cSymbol.USD;
    } else {
      console.log(`huh`);
    }
  });
}); 
// End of Doc.ready()

// function displayCrypto() {}
// function getCrytpo() {}
// function displayTopCrypto() {}
