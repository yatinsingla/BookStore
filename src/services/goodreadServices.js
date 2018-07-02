const axios = require('axios');
const xml2js = require('xml2js')

const parser = xml2js.Parser({explicitArray: false});

function goodreadService(){
    function getBookById(id){
        return new Promise((resolve, reject)=>{
            axios.get('https://www.goodreads.com/book/show/656.xml?key=B01LW6Cx0NIsEPG4FGm2A')
            .then((response)=>{
                parser.parseString(response.data, (err, result)=>{
                    if (err) {
                        console.log(err);
                    } else {
                        resolve(result.GoodreadsResponse.book);
                    }
                })
            })
            .catch((err)=>{
                reject(err);
            })
        });
    }

    return {getBookById};
}

module.exports = goodreadService();