// Import functions
import { getTopCrypto, getCryptoBySymbol } from './scripts/marketcoin.js';
import { getStock, getCompany, getTopStocks } from './scripts/stock.js';

$('document').ready(async () => {
  // Get Top Stocks
  let topStocks = await getTopStocks();
  // Get Top 10 Crypto from API
  let topCrypto = await getTopCrypto();

  $('#stockList').empty();
  // This will loop through the returned Data Array
  topStocks.forEach((element, i) => {
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
      $('.panelLeft').hide();
      $('.panelRight').hide();
      $('#stockResults').hide();
      $('#cryptoResults').hide();

      // Get Stock symbol from row object and pass it for response
      let response = await getStock(row._row.data.symbol);
      renderStock(response);
    },
  });

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

        // Get Crytpo symbol from row object and pass it for response
        renderCrypto(
          await getCryptoBySymbol(row._row.data.symbol),
          row._row.data.symbol
        );
      },
    });
  }

  // Icon Click -> Home -> Defaults
  $('.navbar-brand').on('click', showDefault);

  // Search Button Listener
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
      // Checks for empty string -> returns => true when NOT empty
      if (/([^\s])/.test(cSymbol)) {
        // Check for empty spaces before or after string -> returns => true when NO empty spaces before or after
        if (/^[^\s]+(\s+[^\s]+)*$/.test(cSymbol)) {
          // If Stocks Radio is Checked
          if ($('#defaultInline1').prop('checked')) {
            // Get Stock Data by symbol
            response = await getStock(cSymbol);
            renderStock(response);
          }
          // If Crypto Radio is Checked
          else if ($('#defaultInline2').prop('checked')) {
            // Get Crypto Data by symbol
            response = await getCryptoBySymbol(cSymbol);
            renderCrypto(response, cSymbol);
          } // if
        } else {
          console.log(`Cannot have spaces before or after the string.`);
          showDefault();
        }
      } else {
        console.log(`Empty string -> Invalid`);
        showDefault();
      }
    } catch (error) {
      console.log(error);
      showDefault();
    }
  });
}); // End of Doc.ready()

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

// Render Crypto
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
  $('#cryptoPrice').text(price);
  $('#cryptoOpen').text(open);
  $('#cryptoHigh').text(high);
  $('#cryptoLow').text(low);

  // Show Crypto Panel
  $('#cryptoResults').show();
  $('#searchInput').val('');
}

// Reset to default
function showDefault() {
  $('#cryptoResults').hide();
  $('#stockResults').hide();
  $('#searchInput').val('');
  $('.panelLeft').show();
  $('.panelRight').show();
}
