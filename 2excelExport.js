// scraper packages
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const {first} = require("cheerio/lib/api/traversing");
const {moveMessagePortToContext} = require("worker_threads");
const folderToBeScrapped = "./zprofiles/1english/";
const technicalFolder = "./techFolder/";
profilesToBeScraped = [];

// Read the file into memory
const workbook = xlsx.readFile("db.xlsx");

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
            for (i = 0; i < profilesToBeScraped.length; i++) {
                currentProfile = profilesToBeScraped[i];

                // this will READ the looped file and extract the infos below
                html = fs.readFileSync(folderToBeScrapped + currentProfile, {encoding: "utf8", flag: "r"});
                let $ = cheerio.load(html);
                wholeHTML = $("body").text();

                // close chat-popups to not affect word counting
                for (let i = 0; i < 7; i++) {
                    try {document.querySelector('div[class="display-flex flex-column justify-center overflow-hidden"]').parentElement.parentElement.parentElement.remove()} catch (error) {1+1}
                    
                }
                

                // obtain URL
                let rawURL = $(".ember-view.link-without-visited-state.cursor-pointer.text-heading-small.inline-block.break-words").attr("href");
                url = rawURL.split("detail")[0];

                // obtain file name
                fileName = currentProfile


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

                // xSenior
                xsenior = (wholeHTML.match(/ senior/gim) || []).length;

                // xnode
                xnode = (wholeHTML.match(/ node/gim) || []).length;

                // xjava
                xjava = (wholeHTML.match(/ java /gim) || []).length + (wholeHTML.match(/ java,/gim) || []).length + (wholeHTML.match(/ java./gim) || []).length;

                // xpython
                xpython = (wholeHTML.match(/ python /gim) || []).length

                // devops
                xdevops = (wholeHTML.match(/devops/gim) || []).length;
                
                // data science
                xdatascience = ((wholeHTML.match(/data science/gim) || []).length) + ((wholeHTML.match(/ciência de dados/gim) || []).length) + ((wholeHTML.match(/ciencia de dados/gim) || []).length)

                // Artificial Intelligence
                xartificialintelligence = ((wholeHTML.match(/artificial intelligence/gim) || []).length) + ((wholeHTML.match(/Inteligência artificial/gim) || []).length) + ((wholeHTML.match(/Inteligencia artificial/gim) || []).length) + ((wholeHTML.match(/ IA /gim) || []).length) + ((wholeHTML.match(/ AI /gim) || []).length) + ((wholeHTML.match(/ IA,/gim) || []).length) + ((wholeHTML.match(/ AI,/gim) || []).length)


                // machine learning
                xmachinelearning = ((wholeHTML.match(/machine learning/gim) || []).length) + ((wholeHTML.match(/machine-learning/gim) || []).length)


                // data architect
                xdataarchitect = ((wholeHTML.match(/data architect/gim) || []).length) + ((wholeHTML.match(/arquiteto de dados/gim) || []).length)

                // architect
                xarchitect = ((wholeHTML.match(/architect/gim) || []).length) + ((wholeHTML.match(/arquiteto/gim) || []).length) + ((wholeHTML.match(/arquitetura/gim) || []).length) + ((wholeHTML.match(/arquitetação/gim) || []).length)



                // x.net
                xnet = (wholeHTML.match(/C#/gim) || []).length;

                // golang
                xgolang = ((wholeHTML.match(/golang/gim) || []).length) + ((wholeHTML.match(/ go /gim) || []).length)

                // xReact: xreact,
                xreact = (wholeHTML.match(/ react/gim) || []).length;

                // xAngular: xangular,
                xangular = (wholeHTML.match(/ angular/gim) || []).length;

                // xReactNative: xreactNative,
                xreactNative = (wholeHTML.match(/ react native/gim) || []).length;

                // xFullstack: xfullstack,
                xfullstack = (wholeHTML.match(/ fullstack/gim) || []).length + (wholeHTML.match(/ full stack/gim) || []).length;

                // xTest: xtest,
                xtest = (wholeHTML.match(/ test/gim) || []).length;

                // xQuality: xquality,
                xquality = (wholeHTML.match(/ quality/gim) || []).length + (wholeHTML.match(/ qualidade/gim) || []).length + (wholeHTML.match(/ qa/gim) || []).length;

                // xAutomation: xautomation,
                xautomation = (wholeHTML.match(/ automa/gim) || []).length;

                // xCypress: xcypress,
                xcypress = (wholeHTML.match(/ cypress/gim) || []).length;
                
                // xSelenium: xselenium,
                xselenium = (wholeHTML.match(/ selenium/gim) || []).length;

                // english level
                let languagesLIs = $("li.pv-accomplishment-entity");
                for (let i = 0; i < languagesLIs.length; i++) {
                    let loopedLanguage = $("li.pv-accomplishment-entity").eq(i).text();
                    englishLevel = "";

                    if (loopedLanguage.match(/english/gim)) {
                        englishLevel = $("li.pv-accomplishment-entity").eq(i).children().next().text();
                    } else if (loopedLanguage.match(/inglês/gim)) {
                        englishLevel = $("li.pv-accomplishment-entity").eq(i).children().next().text();
                    } else if (loopedLanguage.match(/ingles/gim)) {
                        englishLevel = $("li.pv-accomplishment-entity").eq(i).children().next().text();
                    }
                }

                /*

                        COMPANY NAME

                        document.querySelector('[class="pv-entity__position-group-pager pv-profile-section__list-item ember-view"]').children().eq(0).children().eq(0).children().eq(0).children().eq(0).children().eq(1).children().eq(2)

                        ROLE AT EXP

                        


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
                        "file name": fileName,
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
                        xPython: xpython,
                        xdevops: xdevops,
                        xdatascience: xdatascience,
                        xArtificialIntelligence: xartificialintelligence,
                        xMachineLearning: xmachinelearning,
                        xDataArchitect: xdataarchitect,
                        xArchitect: xarchitect,
                        xNet: xnet,
                        xGolang: xgolang,
                        xReact: xreact,
                        xAngular: xangular,
                        // xVue: xvue,
                        // xIos: xios,
                        // xAndroid: xandroid,
                        xReactNative: xreactNative,
                        xFullstack: xfullstack,
                        xTest: xtest,
                        xQuality: xquality,
                        xAutomation: xautomation,
                        xCypress: xcypress,
                        xSelenium: xselenium,
                        englishLevel: englishLevel,

                        // biography: biography,
                        // firstExperienceTitle: expRole0,
                        // firstExperienceCompany: firstExperienceCompany,
                        // firstExperienceTime: firstExperienceTime,
                        // firstExperienceDescription: firstExperienceDescription,
                        // secondExperienceTitle: expRole2,
                        // secondExperienceCompany: secondExperienceCompany,
                        // secondExperienceTime: secondExperienceTime,
                        // secondExperienceDescription: secondExperienceDescription,
                        // thirdExperienceTitle: expRole3,
                        // thirdExperienceCompany: thirdExperienceCompany,
                        // thirdExperienceTime: thirdExperienceTime,
                        // thirdExperienceDescription: thirdExperienceDescription,
                        // fourthExperienceTitle: expRole4,
                        // fourthExperienceCompany: fourthExperienceCompany,
                        // fourthExperienceTime: fourthExperienceTime,
                        // fourthExperienceDescription: fourthExperienceDescription,
                        // fifthExperienceTitle: expRole5,
                        // fifthExperienceCompany: fifthExperienceCompany,
                        // fifthExperienceTime: fifthExperienceTime,
                        // fifthExperienceDescription: fifthExperienceDescription,
                        // sixthExperienceTitle: expRole6,
                        // sixthExperienceCompany: sixthExperienceCompany,
                        // sixthExperienceTime: sixthExperienceTime,
                        // sixthExperienceDescription: sixthExperienceDescription,
                        // seventhExperienceTitle: expRole7,
                        // seventhExperienceCompany: seventhExperienceCompany,
                        // seventhExperienceTime: seventhExperienceTime,
                        // seventhExperienceDescription: seventhExperienceDescription,
                        // eigthExperienceTitle: expRole8,
                        // eigthExperienceCompany: eigthExperienceCompany,
                        // eigthExperienceTime: eigthExperienceTime,
                        // eigthExperienceDescription: eigthExperienceDescription,
                        // ninethExperienceTitle: expRole9,
                        // ninethExperienceCompany: ninethExperienceCompany,
                        // ninethExperienceTime: ninethExperienceTime,
                        // ninethExperienceDescription: ninethExperienceDescription
                    });
                }

                updateSheet();

                // this needs to stay below the push method.
                // Update the xlsx file
                xlsx.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1);
                xlsx.writeFile(workbook, "db.xlsx");

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