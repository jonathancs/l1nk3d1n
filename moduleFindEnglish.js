const cheerio = require('cheerio')
const { first } = require('cheerio/lib/api/traversing')
const fs = require('fs')
const path = require("path");
const currentProfile = './toBeScrapped/Ana Goreanu _ LinkedIn 20210827.html'

async function executeScript() {

	fs.readFile(currentProfile, 'utf8' , (err, html) => {
		if (err) {
			console.error(err)
			return
		}
				
		let $ = cheerio.load(html)
		let wholeHTML = $('body').text()


		let languagesLIs = $('li.pv-accomplishment-entity')

		for (let i = 0; i < languagesLIs.length; i++) {
			let loopedLanguage = $('li.pv-accomplishment-entity').eq(i).text()
			englishLevel = ''

			if (loopedLanguage.match(/english/igm))
			{englishLevel = $('li.pv-accomplishment-entity').eq(i).children().next().text()}

			console.log(englishLevel)

			if (englishLevel.match(/nível avançado/igm) ) {}
			
		}

		// wordCounter = (wholeHTML.match(/english/igm) || []).length
		
		// let languagesLIs = $('li.pv-accomplishment-entity').eq(0).text()

		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		// wordCounter = (languagesLI.match(/english/igm) || []).length

		// if (wordCounter) {console.log(wordCounter)} // unit test
		

		// better to write a FOR to run in the languages

		// console.log(languagesTxt)
		
		// if ((wholeHTML.match(/inglês/g) || []).length > 0) {keywordsCounter++}

	})
}
                              
executeScript()







/*

//PROFILE PARTS 

// BIO
document.querySelector('[class="pv-profile-section__card-header"]').nextElementSibling

// position title
document.querySelectorAll('[class="pv-entity__secondary-title t-14 t-black t-normal"]')[0].previousElementSibling.previousElementSibling.innerText

// experience time
document.querySelectorAll('[class="pv-entity__bullet-item-v2"]')[0]

// experiences bio
document.querySelectorAll('[class="pv-entity__extra-details t-14 t-black--light ember-view"]')[0]

// languages
document.querySelector('[class="pv-accomplishments-block__list-container"]').children[0].children[0]

// when i is the english element at unknown position
document.querySelector('[class="pv-accomplishments-block__list-container"]').children[0].children[i].children[1].innerText


document.querySelector('h4[class="pv-accomplishment-entity__title t-14 t-bold"]')
*/

