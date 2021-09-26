const cheerio = require("cheerio");
const { first } = require("cheerio/lib/api/traversing");
const fs = require("fs");
const path = require("path");
const { moveMessagePortToContext } = require("worker_threads");
const xfile = "./zprofiles/node/www.linkedin.com__in_▪️-henrique-schmitt-20b2a010a node.html"

async function everything() {

	// this will READ the looped file and apply the english filters
	fs.readFile(xfile, "utf8", (err, html) => {
		if (err) {
			console.error(err);
			return;
		}

		let $ = cheerio.load(html);
		let wholeHTML = $("body").text();

		// test to know if profile loaded.
		let title = $('.text-body-medium.break-words').text();
		console.log(title)

		let languagesLIs = $("li.pv-accomplishment-entity");

		for (let i = 0; i < languagesLIs.length; i++) {
			let loopedLanguage = $("li.pv-accomplishment-entity").eq(i).text();
			englishLevel = "";


			if (loopedLanguage.match(/english/gim)) {
				try {
					englishLevel = $("li.pv-accomplishment-entity")
						.eq(i)
						.children()
						.next()
						.text()
					console.log(englishLevel)
				} catch (error) { englishLevel = 0 }


			} else if (loopedLanguage.match(/inglês/gim)) {
				try {
					englishLevel = $("li.pv-accomplishment-entity")
						.eq(i)
						.children()
						.next()
						.text()
					console.log(englishLevel)
				} catch (error) { englishLevel = 0 }


			} else if (loopedLanguage.match(/ingles/gim)) {
				try {
					englishLevel = $("li.pv-accomplishment-entity")
						.eq(i)
						.children()
						.next()
						.text()
					console.log(englishLevel)
				} catch (error) { englishLevel = 0 }

			}

			// console.log(englishLevel); // unit testing

		}

	});
}

everything();

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
