// scraper packages
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const { first } = require("cheerio/lib/api/traversing");
const { moveMessagePortToContext } = require("worker_threads");
// const folderToBeScrapped = "./zprofiles/1english/";
const folderToBeScrapped = "./selectedFolder/good/";
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
                html = fs.readFileSync(folderToBeScrapped + currentProfile, { encoding: "utf8", flag: "r" });
                let $ = cheerio.load(html);
                wholeHTML = $("body").text();

                // close chat-popups to not affect word counting
                for (let i = 0; i < 7; i++) {
                    try { document.querySelector('div[class="display-flex flex-column justify-center overflow-hidden"]').parentElement.parentElement.parentElement.remove() } catch (error) { 1 + 1 }

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
                xjava = (wholeHTML.match(/java /gim) || []).length + (wholeHTML.match(/ java,/gim) || []).length + (wholeHTML.match(/ java./gim) || []).length;

                // xpython
                xpython = (wholeHTML.match(/python/gim) || []).length

                // xflask
                xflask = (wholeHTML.match(/flask/gim) || []).length

                // devops
                xdevops = (wholeHTML.match(/devops/gim) || []).length;

                // aws
                xaws = (wholeHTML.match(/aws/gim) || []).length;

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

                // attempt to get composed experiences out of the way until a solution is researched
                try { document.querySelectorAll('class="pv-entity__position-group-role-item"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('class="pv-entity__position-group-role-item"]')[1].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('class="pv-entity__position-group-role-item"]')[2].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('class="pv-entity__position-group-role-item"]')[3].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('class="pv-entity__position-group-role-item"]')[4].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('class="pv-entity__position-group-role-item"]')[5].remove() } catch (error) { 1 + 1 }


                // INDIVIDUAL experience titles and time
                let experiencesList = $('li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view')

                expTitle0 = experiencesList.eq(0).children().children().children().children().children().eq(1).children().eq(0).text()
                experiencetime0 = experiencesList.eq(0).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                expTitle1 = experiencesList.eq(1).children().children().children().children().children().eq(1).children().eq(0).text()
                experiencetime1 = experiencesList.eq(1).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                expTitle2 = experiencesList.eq(2).children().children().children().children().children().eq(1).children().eq(0).text()
                experiencetime2 = experiencesList.eq(2).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                expTitle3 = experiencesList.eq(3).children().children().children().children().children().eq(1).children().eq(0).text()
                experiencetime3 = experiencesList.eq(3).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                expTitle4 = experiencesList.eq(4).children().children().children().children().children().eq(1).children().eq(0).text()
                experiencetime4 = experiencesList.eq(4).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                expTitle5 = experiencesList.eq(5).children().children().children().children().children().eq(1).children().eq(0).text()
                experiencetime5 = experiencesList.eq(5).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                expTitle6 = experiencesList.eq(6).children().children().children().children().children().eq(1).children().eq(0).text()
                experiencetime6 = experiencesList.eq(6).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                expTitle7 = experiencesList.eq(7).children().children().children().children().children().eq(1).children().eq(0).text()
                experiencetime7 = experiencesList.eq(7).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                expTitle8 = experiencesList.eq(8).children().children().children().children().children().eq(1).children().eq(0).text()
                experiencetime8 = experiencesList.eq(8).children().children().children().children().children().eq(1).children().children().children().eq(3).text()


                function convertExpTimeIntoNumber_0() {

                    if (experiencetime0.includes('anos') && experiencetime0.includes('mês')) { experiencetime0 = experiencetime0.replace(' anos ', '.'); experiencetime0 = experiencetime0.replace('mês', '') }
                    if (experiencetime0.includes('anos') && experiencetime0.includes('meses')) { experiencetime0 = experiencetime0.replace(' anos ', '.'); experiencetime0 = experiencetime0.replace('meses', '') }
                    if (experiencetime0.includes('ano') && experiencetime0.includes('mês')) { experiencetime0 = experiencetime0.replace(' ano ', '.'); experiencetime0 = experiencetime0.replace(' mês', '') }
                    if (experiencetime0.includes('ano') && experiencetime0.includes('meses')) { experiencetime0 = experiencetime0.replace(' ano ', '.'); experiencetime0 = experiencetime0.replace(' meses', '') }

                    if (experiencetime0.includes('ano')) { experiencetime0 = experiencetime0.replace(/[^0-9.]/g, "") }
                    if (experiencetime0.includes('mês')) { experiencetime0 = experiencetime0.replace(' mês', ''); experiencetime0 = '0.' + experiencetime0 }
                    if (experiencetime0.includes('meses')) { experiencetime0 = experiencetime0.replace(' meses', ''); experiencetime0 = '0.' + experiencetime0 }

                    experiencetime0 = parseFloat(experiencetime0)

                }

                function convertExpTimeIntoNumber_1() {

                    if (experiencetime1.includes('anos') && experiencetime1.includes('mês')) { experiencetime1 = experiencetime1.replace(' anos ', '.'); experiencetime1 = experiencetime1.replace('mês', '') }
                    if (experiencetime1.includes('anos') && experiencetime1.includes('meses')) { experiencetime1 = experiencetime1.replace(' anos ', '.'); experiencetime1 = experiencetime1.replace('meses', '') }
                    if (experiencetime1.includes('ano') && experiencetime1.includes('mês')) { experiencetime1 = experiencetime1.replace(' ano ', '.'); experiencetime1 = experiencetime1.replace(' mês', '') }
                    if (experiencetime1.includes('ano') && experiencetime1.includes('meses')) { experiencetime1 = experiencetime1.replace(' ano ', '.'); experiencetime1 = experiencetime1.replace(' meses', '') }

                    if (experiencetime1.includes('ano')) { experiencetime1 = experiencetime1.replace(/[^0-9.]/g, "") }
                    if (experiencetime1.includes('mês')) { experiencetime1 = experiencetime1.replace(' mês', ''); experiencetime1 = '0.' + experiencetime1 }
                    if (experiencetime1.includes('meses')) { experiencetime1 = experiencetime1.replace(' meses', ''); experiencetime1 = '0.' + experiencetime1 }

                    experiencetime1 = parseFloat(experiencetime1)

                }

                function convertExpTimeIntoNumber_2() {

                    if (experiencetime2.includes('anos') && experiencetime2.includes('mês')) { experiencetime2 = experiencetime2.replace(' anos ', '.'); experiencetime2 = experiencetime2.replace('mês', '') }
                    if (experiencetime2.includes('anos') && experiencetime2.includes('meses')) { experiencetime2 = experiencetime2.replace(' anos ', '.'); experiencetime2 = experiencetime2.replace('meses', '') }
                    if (experiencetime2.includes('ano') && experiencetime2.includes('mês')) { experiencetime2 = experiencetime2.replace(' ano ', '.'); experiencetime2 = experiencetime2.replace(' mês', '') }
                    if (experiencetime2.includes('ano') && experiencetime2.includes('meses')) { experiencetime2 = experiencetime2.replace(' ano ', '.'); experiencetime2 = experiencetime2.replace(' meses', '') }

                    if (experiencetime2.includes('ano')) { experiencetime2 = experiencetime2.replace(/[^0-9.]/g, "") }
                    if (experiencetime2.includes('mês')) { experiencetime2 = experiencetime2.replace(' mês', ''); experiencetime2 = '0.' + experiencetime2 }
                    if (experiencetime2.includes('meses')) { experiencetime2 = experiencetime2.replace(' meses', ''); experiencetime2 = '0.' + experiencetime2 }

                    experiencetime2 = parseFloat(experiencetime2)

                }

                function convertExpTimeIntoNumber_3() {

                    if (experiencetime3.includes('anos') && experiencetime3.includes('mês')) { experiencetime3 = experiencetime3.replace(' anos ', '.'); experiencetime3 = experiencetime3.replace('mês', '') }
                    if (experiencetime3.includes('anos') && experiencetime3.includes('meses')) { experiencetime3 = experiencetime3.replace(' anos ', '.'); experiencetime3 = experiencetime3.replace('meses', '') }
                    if (experiencetime3.includes('ano') && experiencetime3.includes('mês')) { experiencetime3 = experiencetime3.replace(' ano ', '.'); experiencetime3 = experiencetime3.replace(' mês', '') }
                    if (experiencetime3.includes('ano') && experiencetime3.includes('meses')) { experiencetime3 = experiencetime3.replace(' ano ', '.'); experiencetime3 = experiencetime3.replace(' meses', '') }

                    if (experiencetime3.includes('ano')) { experiencetime3 = experiencetime3.replace(/[^0-9.]/g, "") }
                    if (experiencetime3.includes('mês')) { experiencetime3 = experiencetime3.replace(' mês', ''); experiencetime3 = '0.' + experiencetime3 }
                    if (experiencetime3.includes('meses')) { experiencetime3 = experiencetime3.replace(' meses', ''); experiencetime3 = '0.' + experiencetime3 }

                    experiencetime3 = parseFloat(experiencetime3)

                }

                function convertExpTimeIntoNumber_4() {

                    if (experiencetime4.includes('anos') && experiencetime4.includes('mês')) { experiencetime4 = experiencetime4.replace(' anos ', '.'); experiencetime4 = experiencetime4.replace('mês', '') }
                    if (experiencetime4.includes('anos') && experiencetime4.includes('meses')) { experiencetime4 = experiencetime4.replace(' anos ', '.'); experiencetime4 = experiencetime4.replace('meses', '') }
                    if (experiencetime4.includes('ano') && experiencetime4.includes('mês')) { experiencetime4 = experiencetime4.replace(' ano ', '.'); experiencetime4 = experiencetime4.replace(' mês', '') }
                    if (experiencetime4.includes('ano') && experiencetime4.includes('meses')) { experiencetime4 = experiencetime4.replace(' ano ', '.'); experiencetime4 = experiencetime4.replace(' meses', '') }

                    if (experiencetime4.includes('ano')) { experiencetime4 = experiencetime4.replace(/[^0-9.]/g, "") }
                    if (experiencetime4.includes('mês')) { experiencetime4 = experiencetime4.replace(' mês', ''); experiencetime4 = '0.' + experiencetime4 }
                    if (experiencetime4.includes('meses')) { experiencetime4 = experiencetime4.replace(' meses', ''); experiencetime4 = '0.' + experiencetime4 }

                    experiencetime4 = parseFloat(experiencetime4)

                }

                function convertExpTimeIntoNumber_5() {

                    if (experiencetime5.includes('anos') && experiencetime5.includes('mês')) { experiencetime5 = experiencetime5.replace(' anos ', '.'); experiencetime5 = experiencetime5.replace('mês', '') }
                    if (experiencetime5.includes('anos') && experiencetime5.includes('meses')) { experiencetime5 = experiencetime5.replace(' anos ', '.'); experiencetime5 = experiencetime5.replace('meses', '') }
                    if (experiencetime5.includes('ano') && experiencetime5.includes('mês')) { experiencetime5 = experiencetime5.replace(' ano ', '.'); experiencetime5 = experiencetime5.replace(' mês', '') }
                    if (experiencetime5.includes('ano') && experiencetime5.includes('meses')) { experiencetime5 = experiencetime5.replace(' ano ', '.'); experiencetime5 = experiencetime5.replace(' meses', '') }

                    if (experiencetime5.includes('ano')) { experiencetime5 = experiencetime5.replace(/[^0-9.]/g, "") }
                    if (experiencetime5.includes('mês')) { experiencetime5 = experiencetime5.replace(' mês', ''); experiencetime5 = '0.' + experiencetime5 }
                    if (experiencetime5.includes('meses')) { experiencetime5 = experiencetime5.replace(' meses', ''); experiencetime5 = '0.' + experiencetime5 }

                    experiencetime5 = parseFloat(experiencetime5)

                }

                function convertExpTimeIntoNumber_6() {

                    if (experiencetime6.includes('anos') && experiencetime6.includes('mês')) { experiencetime6 = experiencetime6.replace(' anos ', '.'); experiencetime6 = experiencetime6.replace('mês', '') }
                    if (experiencetime6.includes('anos') && experiencetime6.includes('meses')) { experiencetime6 = experiencetime6.replace(' anos ', '.'); experiencetime6 = experiencetime6.replace('meses', '') }
                    if (experiencetime6.includes('ano') && experiencetime6.includes('mês')) { experiencetime6 = experiencetime6.replace(' ano ', '.'); experiencetime6 = experiencetime6.replace(' mês', '') }
                    if (experiencetime6.includes('ano') && experiencetime6.includes('meses')) { experiencetime6 = experiencetime6.replace(' ano ', '.'); experiencetime6 = experiencetime6.replace(' meses', '') }

                    if (experiencetime6.includes('ano')) { experiencetime6 = experiencetime6.replace(/[^0-9.]/g, "") }
                    if (experiencetime6.includes('mês')) { experiencetime6 = experiencetime6.replace(' mês', ''); experiencetime6 = '0.' + experiencetime6 }
                    if (experiencetime6.includes('meses')) { experiencetime6 = experiencetime6.replace(' meses', ''); experiencetime6 = '0.' + experiencetime6 }

                    experiencetime6 = parseFloat(experiencetime6)

                }

                function convertExpTimeIntoNumber_7() {

                    if (experiencetime7.includes('anos') && experiencetime7.includes('mês')) { experiencetime7 = experiencetime7.replace(' anos ', '.'); experiencetime7 = experiencetime7.replace('mês', '') }
                    if (experiencetime7.includes('anos') && experiencetime7.includes('meses')) { experiencetime7 = experiencetime7.replace(' anos ', '.'); experiencetime7 = experiencetime7.replace('meses', '') }
                    if (experiencetime7.includes('ano') && experiencetime7.includes('mês')) { experiencetime7 = experiencetime7.replace(' ano ', '.'); experiencetime7 = experiencetime7.replace(' mês', '') }
                    if (experiencetime7.includes('ano') && experiencetime7.includes('meses')) { experiencetime7 = experiencetime7.replace(' ano ', '.'); experiencetime7 = experiencetime7.replace(' meses', '') }

                    if (experiencetime7.includes('ano')) { experiencetime7 = experiencetime7.replace(/[^0-9.]/g, "") }
                    if (experiencetime7.includes('mês')) { experiencetime7 = experiencetime7.replace(' mês', ''); experiencetime7 = '0.' + experiencetime7 }
                    if (experiencetime7.includes('meses')) { experiencetime7 = experiencetime7.replace(' meses', ''); experiencetime7 = '0.' + experiencetime7 }

                    experiencetime7 = parseFloat(experiencetime7)

                }

                function convertExpTimeIntoNumber_8() {

                    if (experiencetime8.includes('anos') && experiencetime8.includes('mês')) { experiencetime8 = experiencetime8.replace(' anos ', '.'); experiencetime8 = experiencetime8.replace('mês', '') }
                    if (experiencetime8.includes('anos') && experiencetime8.includes('meses')) { experiencetime8 = experiencetime8.replace(' anos ', '.'); experiencetime8 = experiencetime8.replace('meses', '') }
                    if (experiencetime8.includes('ano') && experiencetime8.includes('mês')) { experiencetime8 = experiencetime8.replace(' ano ', '.'); experiencetime8 = experiencetime8.replace(' mês', '') }
                    if (experiencetime8.includes('ano') && experiencetime8.includes('meses')) { experiencetime8 = experiencetime8.replace(' ano ', '.'); experiencetime8 = experiencetime8.replace(' meses', '') }

                    if (experiencetime8.includes('ano')) { experiencetime8 = experiencetime8.replace(/[^0-9.]/g, "") }
                    if (experiencetime8.includes('mês')) { experiencetime8 = experiencetime8.replace(' mês', ''); experiencetime8 = '0.' + experiencetime8 }
                    if (experiencetime8.includes('meses')) { experiencetime8 = experiencetime8.replace(' meses', ''); experiencetime8 = '0.' + experiencetime8 }

                    experiencetime8 = parseFloat(experiencetime8)

                }

                convertExpTimeIntoNumber_0()
                convertExpTimeIntoNumber_1()
                convertExpTimeIntoNumber_2()
                convertExpTimeIntoNumber_3()
                convertExpTimeIntoNumber_4()
                convertExpTimeIntoNumber_5()
                convertExpTimeIntoNumber_6()
                convertExpTimeIntoNumber_7()
                convertExpTimeIntoNumber_8()

                if (isNaN(experiencetime0)) { experiencetime0 = 0 }
                if (isNaN(experiencetime1)) { experiencetime1 = 0 }
                if (isNaN(experiencetime2)) { experiencetime2 = 0 }
                if (isNaN(experiencetime3)) { experiencetime3 = 0 }
                if (isNaN(experiencetime4)) { experiencetime4 = 0 }
                if (isNaN(experiencetime5)) { experiencetime5 = 0 }
                if (isNaN(experiencetime6)) { experiencetime6 = 0 }
                if (isNaN(experiencetime7)) { experiencetime7 = 0 }
                if (isNaN(experiencetime8)) { experiencetime8 = 0 }

                // pode ser que de falha se algum valor não existir, terei de usar TRY

                totalworkingtime = experiencetime0 + experiencetime1 + experiencetime2 + experiencetime3 + experiencetime4 + experiencetime5 + experiencetime6 + experiencetime7 + experiencetime8

                /////////// send data to xlsx   ///////////////
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
                        xFlask: xflask,
                        xdevops: xdevops,
                        xAWS: xaws,
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


                        totalWorkingTime: totalworkingtime,
                        firstExperienceTitle: expTitle0,
                        firstExperienceTime: experiencetime0,


                        secondExperienceTitle: expTitle1,
                        secondExperienceTime: experiencetime1,


                        thirdExperienceTitle: expTitle2,
                        thirdExperienceTime: experiencetime2,


                        fourthExperienceTitle: expTitle3,
                        fourthExperienceTime: experiencetime3,


                        fifthExperienceTitle: expTitle4,
                        fifthExperienceTime: experiencetime4,


                        sixthExperienceTitle: expTitle5,
                        sixthExperienceTime: experiencetime5,


                        seventhExperienceTitle: expTitle6,
                        seventhExperienceTime: experiencetime6,


                        eigthExperienceTitle: expTitle7,
                        eigthExperienceTime: experiencetime7,


                        ninethExperienceTitle: expTitle8,
                        ninethExperienceTime: experiencetime8,

                    });
                }

                updateSheet();

                // this updates the xlsx file
                // it needs to stay below the push method. I tried to put above, but it only works here.
                xlsx.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1);
                xlsx.writeFile(workbook, "db.xlsx");




            }
        });
    }
}

initialize();