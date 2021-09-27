/*

    TO DO

    experience time

    path to local file

    set filters for QA

    fix currentCompany, some are blank, some get the title.

    add styling: color, borders, filter, table formating by data, column width.


*/


// scraper packages
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const fs = require("fs");
const {first} = require("cheerio/lib/api/traversing");
const {moveMessagePortToContext} = require("worker_threads");
const folderToBeScrapped = "./toBeScrapped/a/";
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

                    // get current date
                    var today = new Date();
                    var dd = String(today.getDate()).padStart(2, "0");
                    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
                    var yyyy = today.getFullYear();
                    dateOfEntry = dd + "/" + mm + "/" + yyyy;

                    // get candidate name
                    candidateName = $(".text-heading-xlarge.inline.t-24.v-align-middle.break-words").text();

                    // get location
                    rawLocation = $(".text-body-small.inline.t-black--light.break-words").text();
                    location = rawLocation.trim();

                    // profile title
                    rawProfileTitle = $(".text-body-medium.break-words").text();
                    profileTitle = rawProfileTitle.trim();

                    // connectionState
                    connectionStateButton = $(".pvs-profile-actions ").children().eq(1).text();

                    if (connectionStateButton.match(/Conectar/gim)) {
                        connectionState = "não conectado";
                    } else if (connectionStateButton.match(/Seguir/gim)) {
                        connectionState = "inconectável";
                    } else if (connectionStateButton.match(/enviar/gim)) {
                        connectionState = "conectado";
                    }

                    // currentCompany
                    rawCurrentCompany = $("h3.t-16.t-black.t-bold").eq(0).children().text();
                    currentCompany = rawCurrentCompany.replace(/Nome da empresa/gim, "");

                    // yearsOfExperience

                    // xSenior
                    wholeHTML = $("body").text();
                    fs.appendFile("./log.txt", wholeHTML + "\n\n\n\n", function (error) {
                        1 + 1;
                    });
                    xsenior = (wholeHTML.match(/ senior/gim) || []).length;

                    // xnode
                    wholeHTML = $("body").text();
                    xnode = (wholeHTML.match(/ node/gim) || []).length;

                    // xjava
                    wholeHTML = $("body").text();
                    xjava = (wholeHTML.match(/ java /gim) || []).length;

                    // x.net
                    wholeHTML = $("body").text();
                    xnet = (wholeHTML.match(/C#/gim) || []).length;

                    // xReact: xreact,
                    wholeHTML = $("body").text();
                    xreact = (wholeHTML.match(/ react/gim) || []).length;

                    // xAngular: xangular,
                    wholeHTML = $("body").text();
                    xangular = (wholeHTML.match(/ angular/gim) || []).length;

                    // xReactNative: xreactNative,
                    wholeHTML = $("body").text();
                    xreactNative = (wholeHTML.match(/ react native/gim) || []).length;

                    /*

                        COMPANY NAME

                        document.querySelector('[class="pv-entity__position-group-pager pv-profile-section__list-item ember-view"]').children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(2)

                        ROLE AT EXP

                        document.querySelector('[class="pv-entity__position-group-pager pv-profile-section__list-item ember-view"]').children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(0)


                        DOUBLE EXP TIME

                        document.querySelector('[class="pv-entity__position-group-pager pv-profile-section__list-item ember-view"]').children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(1)


                        BETTER TIME

                        document.querySelector('[class="pv-entity__position-group-pager pv-profile-section__list-item ember-view"]').children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1)

                   */

                    // experiences
                    // let experiencesLIs = $("li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view");

                    // for (let i = 0; i < experiencesLIs.length; i++) {
                    // let loopedExperience = $("li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view").eq(i);

                    // wordCounter = (loopedExperience.match(/java/igm) || []).length

                    // try { if (wordCounter > 0) { moveTotechnicalFolder() } } catch (error) {console.log('1')}

                    // }

                    // send data to xlsx
                    function updateSheet() {
                        worksheets.Sheet1.push({
                            // "First Name": `${i}`,
                            // Country: {},

                            URL: url,
                            dateOfEntry: dateOfEntry,
                            name: candidateName,
                            location: location,
                            title: profileTitle,
                            connectionState: connectionState,
                            currentCompany: currentCompany,
                            // yearsOfExperience: yearsOfExperience,
                            xSenior: xsenior,
                            xNode: xnode,
                            xJava: xjava,
                            xNet: xnet,
                            // xGolang: xgolang,
                            xReact: xreact,
                            xAngular: xangular,
                            // xVue: xvue,
                            // xIos: xios,
                            // xAndroid: xandroid,
                            xReactNative: xreactNative,
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
                // console.log("Successfully moved the file!"); // unit testing
            }
        });
    }
}

initialize();

/*

// BIO
document.querySelector('[class="pv-profile-section__card-header"]').nextElementSibling

// role title
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
