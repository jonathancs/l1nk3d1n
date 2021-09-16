const cheerio = require("cheerio");
const { first } = require("cheerio/lib/api/traversing");
const fs = require("fs");
const path = require("path");
const testFolder = "./toBeScrapped/";
const englishFolder = "./withEnglish/";
profilesToBeScraped = [];

function everything() {
	saveAllFilesToArray();

	// documentation below

	function saveAllFilesToArray() {
		fs.readdir(testFolder, (err, files) => {
			files.forEach((file) => {
				profilesToBeScraped.push(file);
				//   console.log(file); // unit testing
			});

			for (let i = 0; i < profilesToBeScraped.length; i++) {
				let currentProfile = profilesToBeScraped[i];
				keywordsCounter = 0
				console.log("///// loop " + `${i} ` + `${currentProfile} ` + " + /////")

				fs.readFile(testFolder + currentProfile, "utf8", (err, html) => {
					if (err) {
						console.error(err);
						// run into a bug of having a FOLDER inside this aimed folder. Since it is a FOLDER, the code TRYES to read it, but fails, then notifies an error. i tried to look into the code of listing ONLY files with a specific extension, but it seemed hard for the time being, i can just work without that folder inside.
						return;
					}
					let $ = cheerio.load(html);
					let wholeHTML = $("body").text();

					// ALL BOILER PLATE UNTIL HERE
					// NOW STARTS THE FUNCTIONS
					// DOCUMENTATION BELOW

					allProfileEnglishFind()

					function allProfileEnglishFind() {
						////// INGLÊS AVANÇADO

						if ((wholeHTML.match(/inglês avançado/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("inglês avançado")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/avançado em inglês/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("avançado em inglês")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/avançado de inglês/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("avançado de inglês")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/avançado no inglês/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("avançado no inglês")
							console.log(keywordsCounter)
						}

						////// INGLÊS AVANÇADO

						if ((wholeHTML.match(/ingles avançado/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("ingles avançado")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/avançado em ingles/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("avançado em ingles")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/avançado de ingles/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("avançado de ingles")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/avançado no ingles/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("avançado no ingles")
							console.log(keywordsCounter)
						}

						///// INGLES FLUENTE

						if ((wholeHTML.match(/inglês fluente/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("inglês fluente")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/fluente em inglês/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("fluente em inglês")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/fluente de inglês/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("fluente de inglês")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/fluente no inglês/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("fluente no inglês")
							console.log(keywordsCounter)
						}

						///// advanced english

						if ((wholeHTML.match(/advanced english/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("advanced english")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/advanced in english/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("advanced in english")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/advanced on english/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("advanced on english")
							console.log(keywordsCounter)
						}

						///// fluent english

						if ((wholeHTML.match(/fluent english/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("fluent english")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/fluent in english/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("fluent in english")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/fluent on english/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("fluent on english")
							console.log(keywordsCounter)
						}

						///// INTERCÂMBIO

						if ((wholeHTML.match(/intercâmbio/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("intercâmbio")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/intercambio/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("intercambio")
							console.log(keywordsCounter)
						}

						if ((wholeHTML.match(/exchange/igm) || []).length > 0) {
							keywordsCounter++;
							console.log("exchange")
							console.log(keywordsCounter)
						}
					}

					if (keywordsCounter > 0) { moveToenglishFolder }



					function moveToenglishFolder() {
						if (err) {
							console.error(err);
							return;
						}

						const currentPath = path.join(
							__dirname,
							testFolder,
							currentProfile
						);
						const destinationPath = path.join(
							__dirname,
							englishFolder,
							currentProfile
						);

						fs.rename(currentPath, destinationPath, function (err) {
							if (err) {
								throw err;
							} else {
								//     console.log("Successfully moved the file!"); // unit testing
							}
						});
					}

				});
			}
		});
	}

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
