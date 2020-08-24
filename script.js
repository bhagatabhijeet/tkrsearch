// Import functions
import { getTopCrypto, getCryptoBySymbol } from './scripts/marketcoin.js';
import { getStock, getCompany, getTopStocks } from './scripts/stock.js';

$('document').ready(async () => {
  // Populate Top Stocks
  let topStocks = await getTopStocks();
  let stockList = '';
  $('#stockList').empty();
  // This will loop through the returned Data Array
  topStocks.forEach((element, i) => {
    console.log(element.symbol)
    const tr =  $("<tr>").attr("value", element.symbol);
    const rank = $("<td>").text(i + 1);
    const sName = $("<td>").text(element.companyName);
    const sym = $("<td>").text(element.symbol);
    const price = $("<td>").text('$' + element.latestPrice);
    tr.append(rank, sName, sym, price);
    $('#stockList').append(tr);
  });

  var stockTable = new Tabulator("#stockTable", {
    layout: "fitDataStretch",//"fitDataStretch",
    columns: [
      { title: "#" },
      { title: "Name" },
      { title: "Symbol" },
      { title: "Price $", hozAlign: "right"}
    ],
    
    rowFormatter:function(row){   
      row.getElement().style.color = "#0b33d3"; //apply css change to row element
      row.getElement().style.fontWeight = "400";
      
     }
  });

  // // Get Top 10 Crypto from API
  let topCrypto = await getTopCrypto();
  // No Error in API Response -> Continue
  if (topCrypto.error === false) {
    let cryptoList = '';

    // This will loop through Data Array
    topCrypto.Data.forEach((element, index) => {
      // Concatening an HTML String of the following
      cryptoList += `
        <tr>
          <td>${index + 1}</td>
          <td>${element.CoinInfo.FullName}</td>
          <td>${element.CoinInfo.Name}</td>
          <td>${element.DISPLAY.USD.PRICE}</td>
        </tr>
      `;

      // Append list into table body
      $('#cryptoList').html(cryptoList);
    });
    var cryptoTable = new Tabulator("#cryptoTable", {
      layout: "fitDataStretch",
      columns: [
        { title: "Rank" },
        { title: "Name" },
        { title: "Symbol" },
        { title: "Price $", hozAlign: "right" }
      ],    
    rowFormatter:function(row){   
      row.getElement().style.color = "#0b33d3"; //apply css change to row element
      row.getElement().style.fontWeight = "400";
      
     }
    });
  }

  // Icon Click -> Home -> Defaults
  $('.navbar-brand').on('click', showDefault);

  // Search BUtton Listener
  $('#searchBtn').on('click', async (e) => {
    e.preventDefault();
    // Check if any panel is open and hide it.
    // Hide Panels on Search
    // TODO: Show loading Gif
    $('.panelLeft').hide();
    $('.panelRight').hide();
    $('#stockResults').hide();
    $('#cryptoResults').hide();

    // Variables
    let response = {};
    // Get Search Input
    let cSymbol = $('#searchInput').val().toUpperCase();

    try {
      // Check if searchInput is empty
      if (cSymbol !== '') {
        // If Stocks Radio is Checked
        if ($('#defaultInline1').prop('checked')) {
          // Get Stock Data
          let response = await getStock(cSymbol);
          renderStock(response);
        }
        // If Crypto Radio is Checked
        else if ($('#defaultInline2').prop('checked')) {
          response = await getCryptoBySymbol(cSymbol);
          if (response.HasWarning) {
            console.log(response.Message);
          }

          // console.log(response.DISPLAY);
          // console.log(response.DISPLAY[cSymbol]);
          // Deconstruct, name, symbol -> cSymbol, price, open, high, low
          let {
            PRICE: price,
            OPENDAY: open,
            HIGHDAY: high,
            LOWDAY: low,
          } = response.DISPLAY[cSymbol].USD;

          // IMAGEURL: imgUrl,
          // TBA
          // imgUrl = 'https://www.cryptocompare.com' + imgUrl;
          $('#cryptoName').text(cSymbol);
          $('#cryptoTicker').text('NA');
          $('#cryptoPrice').text(price);
          $('#cryptoOpen').text(open);
          $('#cryptoHigh').text(high);
          $('#cryptoLow').text(low);

          // Show Crypto Panel
          $('#cryptoResults').show();
          $('#searchInput').val('');
        } // if
      } else {
        // TODO: Need a pop up for invalid input
        showDefault();
        $('#searchInput').val('Invalid Input');
      }
    } catch (error) {
      showDefault();
      console.log(error);
    }
  });

  $("#stockList").click(async function (event) {
    $('.panelLeft').hide();
    $('.panelRight').hide();
    $('#stockResults').hide();
    $('#cryptoResults').hide();
    // console.log(event.target.parentNode.getAttribute('value'));
    let stockSymbols = event.target.parentNode.getAttribute('value');
    
    let response = await getStock(stockSymbols);
    console.log(response);
    renderStock(response);
  });

  // Render Stock Details on new panel
  function renderStock(response){
          $('#stockName').text(response.quote.companyName);
          $('#stockTicker').text(response.quote.symbol);
          $('#stockPrice').text('$' + response.quote.latestPrice);
          $('#stockOpen').text('$' + response.quote.previousClose);
          $('#stockHigh').text('$' + response.quote.week52High);
          $('#stockLow').text('$' + response.quote.week52Low);
          //  Show Stock Panel
          $('#stockResults').show();
          $('#searchInput').val('');
  }

}); // End of Doc.ready()

function showDefault() {
  $('#cryptoResults').hide();
  $('#stockResults').hide();
  $('#searchInput').val('');
  $('.panelLeft').show();
  $('.panelRight').show();
}
