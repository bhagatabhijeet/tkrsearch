/* 
    i.e -> https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=80d963dc-3181-4194-8653-ca4a543627b2&start=1&limit=5000&convert=USD
    key -> 80d963dc-3181-4194-8653-ca4a543627b2
*/

// Variables
const regex = /^\s*$/;
const cryptokey = '80d963dc-3181-4194-8653-ca4a543627b2';

// Get top 10 crypto
export async function getTopCrypto() {
  const cryptoTopURL = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${cryptokey}&limit=10&sort=cmc_rank`;
  let response = {};
  await $.ajax({
    url: cryptoTopURL,
    method: 'GET',
  })
    .then(({ data }) => {
      response = { data, error: false };
    })
    .fail((err) => {
      console.error(err);
      response = { error: true, message: err.error_message };
    });

  return response;
}
/* 

    Get Latest 100 coins (Max 5000)
    @param {string} limit - Default 100, Max 5000. This is how many coins you want on return.

*/
export async function getCryptoList(limit = '100') {
  let response = {};

  if (parseInt(limit) > 5000) {
    response = { error: true, message: `Limit is exceeding Max of 5000` };
  } else {
    await $.ajax({
      method: 'GET',
      url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${cryptokey}&start=1&limit=${limit}&convert=USD`,
    })
      .then(({ data }) => {
        response = { data, error: false };
      })
      .fail((err) => {
        console.error(err);
        response = { error: true, message: err.error_message };
      });
  }

  // Will return an array containing ~5000 coins.
  return response;
}
/* 
    @param {string} [cryptoSymbol=''] - Symbol of the crypto you're trying to get
    -> Ignored, will check later if possible.
*/
/* export async function getCryptoBySymbol(cryptoSymbol = '') {
  let response = {};

  // Checking for empty strings -> if not empty -> continue
  if (cryptoSymbol !== '' && cryptoSymbol.match(regex)) {
    await $.ajax({
      method: 'GET',
      url: `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${cryptokey}&symbol=${cryptoSymbol}`,
    })
      .then(({ data }) => {
        response = data;
      })
      .fail((err) => {
        console.error(err);
        response = err;
      });
  }
}
 */
