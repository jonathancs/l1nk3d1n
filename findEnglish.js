const cheerio = require('cheerio')
const { first } = require('cheerio/lib/api/traversing')
const fs = require('fs')
const path = require("path");
const testFolder = './toBeScrapped/';
const englishFolder = './withEnglish/';
profilesToBeScraped = []

async function everything() {

      await saveAllFilesToArray()

      // documentation below

      async function saveAllFilesToArray() {

            fs.readdir(testFolder, (err, files) => {
                  files.forEach(file => {
                        profilesToBeScraped.push(file)
                        console.log(file)
                  });

                  for (let i = 0; i < profilesToBeScraped.length; i++) {
                        let currentProfile = profilesToBeScraped[i];
                        
                        fs.readFile(testFolder + currentProfile, 'utf8' , (err, html) => {
                              if (err) {
                                    console.error(err)
                                    // run into a bug of having a FOLDER inside this aimed folder. Since it is a FOLDER, the code TRYES to read it, but fails, then notifies an error. i tried to look into the code of listing ONLY files with a specific extension, but it seemed hard for the time being, i can just work without that folder inside.
                                    return
                              }
                        
                              let $ = cheerio.load(html)
                              let keywordsCounter = 0
                  
                              let wholeHTML = $('body').text()

                              // if (wholeHTML.match(/inglês/g) || []) {console.log((wholeHTML.match(/inglês/g) || []).length)} // unit test
                              
                              if ((wholeHTML.match(/inglês/g) || []).length > 0) {keywordsCounter++}
                              if ((wholeHTML.match(/ingles/g) || []).length > 0) {keywordsCounter++}
                              if ((wholeHTML.match(/english/g) || []).length > 0) {keywordsCounter++}
                              if ((wholeHTML.match(/inglês/g) || []).length > 0) {keywordsCounter++}

                              async function moveToEnglishFolder() {

                                    const currentPath = path.join(__dirname, testFolder, currentProfile);
                                    const destinationPath = path.join(__dirname, englishFolder, currentProfile);

                                    fs.rename(currentPath, destinationPath, function (err) {
                                          if (err) {
                                                throw err
                                          } else {
                                                console.log("Successfully moved the file!");
                                          }
                                    });

                              }
                              
                              // console.log((wholeHTML.match(/inglês/g) || []).length)
                              
                              
                              // if () {}

                              // proximo passo a pensar:
                              // como evito copiar linhas de codigo mudando apenas o regex?
                  
                              // if (body.match(/ingles/g) || []) {}
                  
                              // fs.writeFile("test2.txt", firstText, function (err) { if (err) { console.log(err); } });
                  
                              
                        })
                                    
                                    
                  }
            });

      }
      

      async function readFiles_DetectEnglish() {

                              
            
      }

      
      
}
                  
                  
everything()







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