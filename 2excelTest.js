// scraper packages
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const fs = require("fs");
const {first} = require("cheerio/lib/api/traversing");
const {moveMessagePortToContext} = require("worker_threads");
const folderToBeScrapped = "./toBeScrapped/";
const technicalFolder = "./techFolder/";
profilesToBeScraped = [];

// Read the file into memory
const workbook = xlsx.readFile("database.xlsx");

// Convert the xlsx to JSON
let worksheets = {};
for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

async function initialize() {
    await saveAllFilesToArray(); // this will read all the files in the folder and save it to the array, to be scraped afterwards.

    async function saveAllFilesToArray() {
        fs.readdir(folderToBeScrapped, (err, files) => {
            files.forEach((file) => {
                profilesToBeScraped.push(file);
                //   console.log(file); // unit testing
            });

            // this will loop the list of profiles to be scraped
            for (let i = 0; i < profilesToBeScraped.length; i++) {
                currentProfile = profilesToBeScraped[i];

                // this will READ the looped file and apply the filters
                fs.readFile(folderToBeScrapped + currentProfile, "utf8", (err, html) => {
                    if (err) {
                        // console.error(err);
                        return;
                    }

                    let $ = cheerio.load(html);

                    // obtain URL
                    let rawURL = $(".ember-view.link-without-visited-state.cursor-pointer.text-heading-small.inline-block.break-words").attr("href");
                    url = rawURL.split("detail")[0];

                    //     URL: url,
                    //     dateOfEntry: dateOfEntry,
                    //     name: candidateName,
                    //     location: location,
                    //     title: profileTitle,

                    //     // experiences
                    //     let experiencesLIs = $("li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view");

                    //     for (let i = 0; i < experiencesLIs.length; i++) {
                    //       let loopedExperience = $("li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view").eq(i);

                    //       wordCounter = (loopedExperience.match(/java/igm) || []).length

                    //       try { if (wordCounter > 0) { moveTotechnicalFolder() } } catch (error) {console.log('1')}

                    //     }

                    
                    
                    // send data to xlsx
                    function updateSheet() {
                        worksheets.Sheet1.push({
                            // "First Name": `${i}`,
                            // Country: {},

                            URL: url,
                            // dateOfEntry: dateOfEntry,
                            // name: candidateName,
                            // location: location,
                            // title: profileTitle,
                            // connectionState: connectionState,
                            // currentCompany: currentCompany,
                            // yearsOfExperience: yearsOfExperience,
                            // xSenior : xsenior,
                            // xNode: xnode,
                            // xJava: xjava,
                            // xNet: xnet,
                            // xGolang: xgolang,
                            // xReact: xreact,
                            // xAngular: xangular,
                            // xVue: xvue,
                            // xIos: xios,
                            // xAndroid: xandroid,
                            // xReactNative: xreactNative,
                            // xFullstack: xfullstack,
                            // xTest: xtest,
                            // xQuality: xquality,
                            // xAutomation: xautomation,
                            // xCypress: xcypress,

                            // biography: biography,
                            // firstExperienceTitle: firstExperienceTitle,
                            // firstExperienceCompany: firstExperienceCompany,
                            // firstExperienceTime: firstExperienceTime,
                            // firstExperienceDescription: firstExperienceDescription,
                            // secondExperienceTitle: secondExperienceTitle,
                            // secondExperienceCompany: secondExperienceCompany,
                            // secondExperienceTime: secondExperienceTime,
                            // secondExperienceDescription: secondExperienceDescription,
                            // thirdExperienceTitle: thirdExperienceTitle,
                            // thirdExperienceCompany: thirdExperienceCompany,
                            // thirdExperienceTime: thirdExperienceTime,
                            // thirdExperienceDescription: thirdExperienceDescription,
                            // fourthExperienceTitle: fourthExperienceTitle,
                            // fourthExperienceCompany: fourthExperienceCompany,
                            // fourthExperienceTime: fourthExperienceTime,
                            // fourthExperienceDescription: fourthExperienceDescription,
                            // fifthExperienceTitle: fifthExperienceTitle,
                            // fifthExperienceCompany: fifthExperienceCompany,
                            // fifthExperienceTime: fifthExperienceTime,
                            // fifthExperienceDescription: fifthExperienceDescription,
                            // sixthExperienceTitle: sixthExperienceTitle,
                            // sixthExperienceCompany: sixthExperienceCompany,
                            // sixthExperienceTime: sixthExperienceTime,
                            // sixthExperienceDescription: sixthExperienceDescription,
                            // seventhExperienceTitle: seventhExperienceTitle,
                            // seventhExperienceCompany: seventhExperienceCompany,
                            // seventhExperienceTime: seventhExperienceTime,
                            // seventhExperienceDescription: seventhExperienceDescription,
                            // eigthExperienceTitle: eigthExperienceTitle,
                            // eigthExperienceCompany: eigthExperienceCompany,
                            // eigthExperienceTime: eigthExperienceTime,
                            // eigthExperienceDescription: eigthExperienceDescription,
                            // ninethExperienceTitle: ninethExperienceTitle,
                            // ninethExperienceCompany: ninethExperienceCompany,
                            // ninethExperienceTime: ninethExperienceTime,
                            // ninethExperienceDescription: ninethExperienceDescription
                        });
                    }

                    updateSheet();

                    // this needs to stay below the push method.
                    // Update the xlsx file
                    xlsx.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1);
                    xlsx.writeFile(workbook, "database.xlsx");
                });
            }
        });
    }

    // this is the code to change the folder's directory
    async function moveTotechnicalFolder() {
        const currentPath = path.join(__dirname, folderToBeScrapped, currentProfile);
        const destinationPath = path.join(__dirname, technicalFolder, currentProfile);

        fs.rename(currentPath, destinationPath, function (err) {
            if (err) {
                // throw err;
                1 + 1;
            } else {
                //     console.log("Successfully moved the file!"); // unit testing
            }
        });
    }
}

initialize();
