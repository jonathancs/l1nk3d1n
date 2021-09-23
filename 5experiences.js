const cheerio = require("cheerio");
const { first } = require("cheerio/lib/api/traversing");
const fs = require("fs");
const path = require("path");
const { moveMessagePortToContext } = require("worker_threads");
const folderToBeScrapped = "./zprofiles/1english/java/";
const technicalFolder = "./techFolder/";
profilesToBeScraped = [];

async function everything() {
  console.time('timer')

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

          let experiencesUL = $("li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view");

          for (let i = 0; i < experiencesUL.length; i++) {
            let loopedExperience = $("li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view").eq(i).text();

            wordCounter = (loopedExperience.match(/java/igm) || []).length

            try { if (wordCounter > 0) { moveTotechnicalFolder() } } catch (error) {console.log('1')}

          }



          // this is the code to change the folder's directory
          async function moveTotechnicalFolder() {
            const currentPath = path.join(
              __dirname,
              folderToBeScrapped,
              currentProfile
            );
            const destinationPath = path.join(
              __dirname,
              technicalFolder,
              currentProfile
            );

            fs.rename(currentPath, destinationPath, function (err) {
              if (err) {
                // throw err;
                1+1
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


  console.timeEnd('timer')
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
