const cheerio = require("cheerio");
const { first } = require("cheerio/lib/api/traversing");
const { Console } = require("console");
const fs = require("fs");
const path = require("path");
const { moveMessagePortToContext } = require("worker_threads");
const folderToBeScrapped = "./toBeScrapped/";
const englishFolder = "./withEnglish/";
profilesToBeScraped = [];

async function everything() {
  
  await saveAllFilesToArray(); // this will read all the files in the folder and save it to the array, to be scraped afterwards.

  // documentation below

  async function saveAllFilesToArray() {
    fs.readdir(folderToBeScrapped, (err, files) => {
      files.forEach((file) => {
        profilesToBeScraped.push(file);
          // console.log(file); // unit testing
      });

      /*
        i couldn't manage to save this array to the memory, that's why you have this code inside the FS.READDIR
      */
      
     // this will loop the list of profiles to be scraped
     for (let i = 0; i < profilesToBeScraped.length; i++) {
       let currentProfile = profilesToBeScraped[i];

        // this will READ the looped file and apply the english filters
        fs.readFile(folderToBeScrapped + currentProfile, "utf8", (err, html) => {
          if (err) {
            console.error(err);
            return;
          }

          // this will READ the looped file and extract the infos below
          html = fs.readFileSync(folderToBeScrapped + currentProfile, { encoding: "utf8", flag: "r" });
          let $ = cheerio.load(html);
          wholeHTML = $("html").html();
          wholeBody = $("body").text();

          function getLanguages() {
            // Para "níveis" de inglês:
            regex1 = /<!---->(?:inglês|english|ingles|inglés).*<!---->[\s\S]{1,300}Nível (.*?)</im

            // Para inglês fluente ou nativo:
            regex2 = /<!---->(?:inglês|english|ingles|inglés).*<!---->[\s\S]{1,300}(Fluente.ou.nativo)/im

            firstRegexTest = wholeHTML.match(regex1)
            secondRegexTest = wholeHTML.match(regex2)
            englishCounter = 0

            try {if (firstRegexTest[1].match(/avançado/im)) { englishCounter++ } } catch (error) {}
            try {if (secondRegexTest[1].match(/fluente/im)) {englishCounter++} } catch (error) {}

            try {console.log(currentProfile + ' ' + firstRegexTest[1])} catch (error) {1+1}
            try {console.log(currentProfile + ' ' + secondRegexTest[1])} catch (error) {1+1}

            
            // fs.appendFile('./firstRegexTest.txt', firstRegexTest[1] + '\n')


            // try {console.log(firstRegexTest[1] + ' ' + currentProfile)} catch (error) {1+1}
            // try { fs.appendFile('./firstRegexTest.txt', firstRegexTest[1] + '\n', (err) => {if (err) {console.log(err)}})} catch (error) {1+1}


            if (englishCounter > 0) { moveToEnglishFolder() }

            // this is the code to change the folder's directory
            async function moveToEnglishFolder() {
                const currentPath = path.join(
                    __dirname,
                    folderToBeScrapped,
                    currentProfile
                );
                
                const destinationPath = path.join(
                    __dirname,
                    englishFolder,
                    currentProfile
                );

                fs.rename(currentPath, destinationPath, function (err) {
                    if (err) {
                        console.log(err)
                        throw err;
                    } else {
                        //     console.log("Successfully moved the file!"); // unit testing
                    }
                });
            }



          }

          getLanguages()
          
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




// document.querySelectorAll('li[class="artdeco-list__item pvs-list__item--line-separated pvs-list__item--one-column"]')[0]




// document.querySelector(`[class="pvs-entity
//     pvs-entity--padded pvs-list__item--no-padding-when-nested
    
    
//     "]`)

// document.querySelector('div.pvs-entity.pvs-entity--padded pvs-list__item--no-padding-when-nested')
