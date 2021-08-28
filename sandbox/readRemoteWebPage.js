// deu certo

const request = require('request')
const cheerio = require('cheerio')

request ('https://www.mercadolivre.com.br', function (err, res, body) {
      if (!err && res.statusCode === 200) {
            let $ = cheerio.load(body)
            $('title').each(function(){
                  console.log($(this).html())
            })
      }
})