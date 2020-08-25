// Variables
const cryptokey =
  '83a1421578bfc4aa4b0995785d474aeabd08e8dd93ea1ce467246ca8da9dc036';
/*
 * @param {string} limit - Minimum 10, Max 100
 */
export async function getTopCrypto(limit = '10') {
  // Get top 10 crypto
  console.log(`Top 10 Crypto`);
  const cryptoTopURL = `https://min-api.cryptocompare.com/data/top/totalvolfull?limit=${limit}&tsym=USD&api_key=${cryptokey}`;
  let response = {};

  await $.get({
    url: cryptoTopURL,
  })
    .then(({ Data }) => {
      response = { Data, error: false };
    })
    .fail((err) => {
      console.log(err.Message);
      response = { error: true, message: err.Message };
    });
  return response;
}
/*
 * @param {string} cSymbol - Must get a Symbol
 */
export async function getCryptoBySymbol(cSymbol) {
  // Get Crypto information by Symbol
  console.log(`Getting data for ${cSymbol}`);
  const cryptoGetcSymbolURL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cSymbol}&tsyms=USD&api_key=${cryptokey}`;
  let response = {};

  await $.get({
    url: cryptoGetcSymbolURL,
  })
    .then((data) => {
      response = data;
    })
    .fail((err) => {
      console.log(err.Message);
      response = { error: true, message: err.Message };
    });
  return response;
}
