const cheerio = require("cheerio");
const { first } = require("cheerio/lib/api/traversing");
const fs = require("fs");
const path = require("path");
const testFolder = "./toBeScrapped/";
const englishFolder = "./withEnglish/";
profilesToBeScraped = [];

async function everything() {
  await saveAllFilesToArray();

  // documentation below

  async function saveAllFilesToArray() {
    fs.readdir(testFolder, (err, files) => {
      files.forEach((file) => {
        profilesToBeScraped.push(file);
        //   console.log(file); // unit testing
      });

      // load the file to use it
      for (let i = 0; i < profilesToBeScraped.length; i++) {
        let currentProfile = profilesToBeScraped[i];

        // read the file
        fs.readFile(testFolder + currentProfile, "utf8", (err, html) => {
          if (err) {
            console.error(err);
            return;
          }

          let $ = cheerio.load(html);
          // let wholeHTML = $("body").text();

          fs.appendFile('./results.txt', wholeHTML + '\n\n\n\n', function (error) {console.log(error)})

          async function moveToEnglishFolder() {
            

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