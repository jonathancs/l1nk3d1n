const cheerio = require("cheerio");
const { first } = require("cheerio/lib/api/traversing");
const fs = require("fs");
const path = require("path");
const { moveMessagePortToContext } = require("worker_threads");
const folderToBeScrapped = "./zprofiles/node/";
const englishFolder = "./withEnglish/";
profilesToBeScraped = [];

async function everything() {
  
  await saveAllFilesToArray(); // this will read all the files in the folder and save it to the array, to be scraped afterwards.

  // documentation below

  async function saveAllFilesToArray() {
    fs.readdir(folderToBeScrapped, (err, files) => {
      files.forEach((file) => {
        profilesToBeScraped.push(file);
        //   console.log(file); // unit testing
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

          let $ = cheerio.load(html);
          let wholeHTML = $("body").text();

          let languagesLIs = $("li.pv-accomplishment-entity");

          for (let i = 0; i < languagesLIs.length; i++) {
            let loopedLanguage = $("li.pv-accomplishment-entity").eq(i).text();
            englishLevel = "";


            if (loopedLanguage.match(/english/gim)) {
              englishLevel = $("li.pv-accomplishment-entity")
                .eq(i)
                .children()
                .next()
                .text();

            } else if (loopedLanguage.match(/inglês/gim)) {
              englishLevel = $("li.pv-accomplishment-entity")
                .eq(i)
                .children()
                .next()
                .text();

            } else if (loopedLanguage.match(/ingles/gim)) {
              englishLevel = $("li.pv-accomplishment-entity")
                .eq(i)
                .children()
                .next()
                .text();
            }

            // console.log(englishLevel); // unit testing

            if (englishLevel.match(/avançado/gim)) {moveToEnglishFolder()} else if (englishLevel.match(/fluente/gim)) {moveToEnglishFolder()}

            
          }
          
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
                throw err;
              } else {
                //     console.log("Successfully moved the file!"); // unit testing
              }
            });
          }

          // console.log((wholeHTML.match(/inglês/g) || []).length)

          // if () {}

          // proximo passo a pensar:
          // como evito copiar linhas de codigo mudando apenas o regex?

          // if (body.match(/ingles/g) || []) {}

          // fs.writeFile("test2.txt", firstText, function (err) { if (err) { console.log(err); } });
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
