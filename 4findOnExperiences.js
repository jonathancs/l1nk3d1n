const cheerio = require("cheerio");
const { first } = require("cheerio/lib/api/traversing");
const fs = require("fs");
const path = require("path");
const { moveMessagePortToContext } = require("worker_threads");
const folderToBeScrapped = "./zprofiles/1english/java/js test/";
const techFolder = "./techFolder/";
profilesToBeScraped = [];

saveAllFilesToArray()

readAndFilter()

/*  below is the documentation  */


function saveAllFilesToArray() {
	
	fs.readdir(folderToBeScrapped, (err, files) => {
		
		files.forEach((file) => {
			
			console.log(file + ' jogado na array'); // unit testing
			return profilesToBeScraped.push(file);
		});
	});
}

function readAndFilter () {

	setTimeout(() => {

		for (i = 0; i < profilesToBeScraped.length; i++) {
			currentProfile = profilesToBeScraped[i];

			// this will READ the looped file and apply the english filters
			fs.readFile(folderToBeScrapped + currentProfile, "utf8", (err, html) => {
				if (err) {
					console.error(err);
					return;
				}
		
				let $ = cheerio.load(html);
				let wholeHTML = $("body").text();
		
				let title = $('.text-body-medium.break-words').text();
		
				if (title.match(/ software /gim)) { moveTotechFolder(); console.log(title) }
				// else if (title.match(/ engen /gim)) { moveTotechFolder(); console.log(title) }
		
		
				// this is the code to change the folder's directory
				
			});
		}
		
	}, 2000);

	
}

function moveTotechFolder() {
	const currentPath = path.join(
		__dirname,
		folderToBeScrapped,
		currentProfile
	);
	const destinationPath = path.join(
		__dirname,
		techFolder,
		currentProfile
	);

	fs.rename(currentPath, destinationPath, function (err) {
		if (err) {
			throw err;
		} else { console.log(`moved ${i}`) }
	});
}


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
