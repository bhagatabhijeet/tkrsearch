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
    console.log(element.symbol);
    const tr = $('<tr>').attr('value', element.symbol);
    const rank = $('<td>').text(i + 1);
    const sName = $('<td>').text(element.companyName);
    const sym = $('<td>').text(element.symbol);
    const price = $('<td>').text('$' + element.latestPrice);
    tr.append(rank, sName, sym, price);
    $('#stockList').append(tr);
  });

  var stockTable = new Tabulator('#stockTable', {
    layout: 'fitDataStretch', //"fitDataStretch",
    columns: [
      { title: '#' },
      { title: 'Name' },
      { title: 'Symbol' },
      { title: 'Price $', hozAlign: 'right' },
    ],
    rowFormatter: function (row) {
      row.getElement().style.color = '#0b33d3'; //apply css change to row element
      row.getElement().style.fontWeight = '400';
    },
    rowClick: async function (e, row) {
      //e - the click event object
      //row - row component
      console.log('clicked ' + row._row.data.symbol);

      $('.panelLeft').hide();
      $('.panelRight').hide();
      $('#stockResults').hide();
      $('#cryptoResults').hide();
      // console.log(event.target.parentNode.getAttribute('value'));
      // let stockSymbols = event.target.parentNode.getAttribute('value');
      let stockSymbols = row._row.data.symbol;

      let response = await getStock(stockSymbols);
      console.log(response);
      renderStock(response);
    },
  });

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
          <td>${index + 1}</td>
          <td>${element.CoinInfo.FullName}</td>
          <td>${element.CoinInfo.Name}</td>
          <td>${element.DISPLAY.USD.PRICE}</td>
        </tr>
      `;

      // Append list into table body
      $('#cryptoList').html(cryptoList);
    });
    var cryptoTable = new Tabulator('#cryptoTable', {
      layout: 'fitDataStretch',
      columns: [
        { title: 'Rank' },
        { title: 'Name' },
        { title: 'Symbol' },
        { title: 'Price $', hozAlign: 'right' },
      ],
      rowFormatter: function (row) {
        row.getElement().style.color = '#0b33d3'; //apply css change to row element
        row.getElement().style.fontWeight = '400';
      },
      rowClick: async (e, row) => {
        // Hide Current layout
        $('.panelLeft').hide();
        $('.panelRight').hide();
        $('#stockResults').hide();
        $('#cryptoResults').hide();

        // Show Bitcoin information based on click
        renderCrypto(
          await getCryptoBySymbol(row._row.data.symbol),
          row._row.data.symbol
        );
      },
    });
  }

  // Icon Click -> Home -> Defaults
  $('.navbar-brand').on('click', showDefault);

  // Search BUtton Listener
  $('#searchBtn').on('click', async (e) => {
    e.preventDefault();
    $('.panelLeft').hide();
    $('.panelRight').hide();
    $('#stockResults').hide();
    $('#cryptoResults').hide();

    // Variables
    let response = {};
    let cSymbol = $('#searchInput').val().toUpperCase(); // Get Search Input

    try {
      // Check if searchInput is empty
      if (cSymbol !== '') {
        // If Stocks Radio is Checked
        if ($('#defaultInline1').prop('checked')) {
          // Get Stock Data
          response = await getStock(cSymbol);
          renderStock(response);
        }
        // If Crypto Radio is Checked
        else if ($('#defaultInline2').prop('checked')) {
          // Get Crypto Data
          response = await getCryptoBySymbol(cSymbol);
          renderCrypto(response, cSymbol);
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

  /*** NO LONGER REQUIRED --- SEE LINE #34 */
  // $("#stockList").click(async function (event) {
  //   $('.panelLeft').hide();
  //   $('.panelRight').hide();
  //   $('#stockResults').hide();
  //   $('#cryptoResults').hide();
  //   // console.log(event.target.parentNode.getAttribute('value'));
  //   let stockSymbols = event.target.parentNode.getAttribute('value');
  //   let response = await getStock(stockSymbols);
  //   console.log(response);
  //   renderStock(response);
  // });

  // Render Stock Details on new panel
  function renderStock(response) {
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

function renderCrypto(response, cSymbol) {
  if (response.HasWarning) {
    console.log(response.Message);
  }

  // Deconstruct -> cSymbol, price, open, high, low
  let {
    PRICE: price,
    OPENDAY: open,
    HIGHDAY: high,
    LOWDAY: low,
  } = response.DISPLAY[cSymbol].USD;

  $('#cryptoName').text(cSymbol);
  $('#cryptoTicker').text('NA');
  $('#cryptoPrice').text(price);
  $('#cryptoOpen').text(open);
  $('#cryptoHigh').text(high);
  $('#cryptoLow').text(low);

  // Show Crypto Panel
  $('#cryptoResults').show();
  $('#searchInput').val('');
}

function showDefault() {
  $('#cryptoResults').hide();
  $('#stockResults').hide();
  $('#searchInput').val('');
  $('.panelLeft').show();
  $('.panelRight').show();
}
