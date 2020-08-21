
// Get top 10 crypto
export function getTopCrypto(){
    const cryptoApiKey = '80d963dc-3181-4194-8653-ca4a543627b2'
    const cryptoTopURL = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=${cryptoApiKey}&limit=10
    $.ajax({
        url: cryptoTopURL,
        method: "GET",
    }).then(function(cryptoTopData) {
        console.log(cryptoTopData);
    });
}    