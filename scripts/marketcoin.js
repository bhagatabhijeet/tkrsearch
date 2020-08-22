// Variables
const regex = /^\s*$/;
const cryptokey = '80d963dc-3181-4194-8653-ca4a543627b2';

// Get top 10 crypto
export async function getTopCrypto(limit = '5') {
  console.log(`Top 10 Crypto`);
  const cryptoTopURL = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY=${cryptokey}&limit=${limit}&sort=cmc_rank`;
  let response = {};

  await $.ajax({
    url: cryptoTopURL,
    method: 'GET',
  })
    .then(({ data }) => {
      response = { data, error: false };
    })
    .fail((err) => {
      console.log(err);
      response = { error: true, message: err.error_message };
    });
  return response;
}
/* 
    Get Latest 100 coins (Max 5000)
    @param {string} limit - Default 100, Max 5000. This is how many coins you want on return.
*/
export async function getCryptoList(limit = '100') {
  console.log(`Crypto List`);

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
  console.log(response);

  // Will return an array containing ~5000 coins.
  return response;
}

// Function Exports
