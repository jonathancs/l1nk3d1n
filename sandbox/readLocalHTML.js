const cheerio = require('cheerio')
const { first } = require('cheerio/lib/api/traversing')
const fs = require('fs')

fs.readFile('D:/docs/userCasagrande/Remy Barros _ LinkedIn 20210823.html', 'utf8' , (err, html) => {
	if (err) {
		console.error(err)
		return
	}

	let $ = cheerio.load(html)
	// profileName = $('h1.text-heading-xlarge')
	// console.log(profileName.text())

	firstText = $('div[style="line-height:2.4rem;max-height:4.8rem;-webkit-line-clamp:2;"]').parent().next().eq(0).text()

	console.log(firstText)

	// fs.writeFile("test2.txt", firstText, function (err) { if (err) { console.log(err); } });






})





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
*/