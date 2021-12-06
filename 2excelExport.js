/*
NEXT STEPS
1750
pegou a primeira exp
mas pegou PHOTO EDITOR tbm.

por causa da extensão do chrome pra HIGHLIGHT, se a palavra bate no titulo, não valida na planilha.

mas photo editor passou, e não tava highlighted.




desenvolvimento
engenharia
qualidade
software
devops
dba


*/


// scraper packages
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const { first } = require("cheerio/lib/api/traversing");
const { moveMessagePortToContext } = require("worker_threads");
const folderToBeScrapped = "./zprofiles/1english/";
const selectedFolder = "./zprofiles/selectedFolder/zexported/";
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
            for (i = 0; i < 2000; i++) {
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


                let composedExpListA = $('li.pv-entity__position-group-role-item')
                let composedExpListB = $('li.pv-entity__position-group-role-item-fading-timeline')

                // GROUP A composed experience

                composedExpA_Title0 = composedExpListA.eq(0).children().children().children().children().children().children().children().children().eq(1).text()
                composedExpA_Time0 = composedExpListA.eq(0).children().children().children().children().children().children().children().children().children().eq(3).text()

                composedExpA_Title1 = composedExpListA.eq(1).children().children().children().children().children().children().children().children().eq(1).text()
                composedExpA_Time1 = composedExpListA.eq(1).children().children().children().children().children().children().children().children().children().eq(3).text()

                composedExpA_Title2 = composedExpListA.eq(2).children().children().children().children().children().children().children().children().eq(1).text()
                composedExpA_Time2 = composedExpListA.eq(2).children().children().children().children().children().children().children().children().children().eq(3).text()

                composedExpA_Title3 = composedExpListA.eq(3).children().children().children().children().children().children().children().children().eq(1).text()
                composedExpA_Time3 = composedExpListA.eq(3).children().children().children().children().children().children().children().children().children().eq(3).text()

                composedExpA_Title4 = composedExpListA.eq(4).children().children().children().children().children().children().children().children().eq(1).text()
                composedExpA_Time4 = composedExpListA.eq(4).children().children().children().children().children().children().children().children().children().eq(3).text()

                composedExpA_Title5 = composedExpListA.eq(5).children().children().children().children().children().children().children().children().eq(1).text()
                composedExpA_Time5 = composedExpListA.eq(5).children().children().children().children().children().children().children().children().children().eq(3).text()

                composedExpA_Title6 = composedExpListA.eq(6).children().children().children().children().children().children().children().children().eq(1).text()
                composedExpA_Time6 = composedExpListA.eq(6).children().children().children().children().children().children().children().children().children().eq(3).text()

                // GROUP B composed exps

                composedExpB_Title0 = composedExpListB.eq(0).children().children().children().children().children().children().children().eq(0).children().eq(1).text()
                composedExpB_Time0 = composedExpListB.eq(0).children().children().children().children().children().children().children().children().eq(3).children().eq(1).text()

                composedExpB_Title1 = composedExpListB.eq(1).children().children().children().children().children().children().children().eq(0).children().eq(1).text()
                composedExpB_Time1 = composedExpListB.eq(1).children().children().children().children().children().children().children().children().eq(3).children().eq(1).text()

                composedExpB_Title2 = composedExpListB.eq(2).children().children().children().children().children().children().children().eq(0).children().eq(1).text()
                composedExpB_Time2 = composedExpListB.eq(2).children().children().children().children().children().children().children().children().eq(3).children().eq(1).text()

                composedExpB_Title3 = composedExpListB.eq(3).children().children().children().children().children().children().children().eq(0).children().eq(1).text()
                composedExpB_Time3 = composedExpListB.eq(3).children().children().children().children().children().children().children().children().eq(3).children().eq(1).text()



                // ATTENTION HERE. maybe this is the bug.

                // remove composed after getting them
                for (let i = 0; i < 10; i++) {

                    try { document.querySelectorAll('[class="pv-entity__position-group-role-item"]')[i].remove() } catch (error) { 1 + 1 }

                    try { document.querySelectorAll('[class="pv-entity__position-group-role-item-fading-timeline"]')[i].remove() } catch (error) { 1 + 1 }

                }

                // or

                try { document.querySelectorAll('[class="pv-entity__position-group-role-item"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item-fading-timeline"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item-fading-timeline"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item-fading-timeline"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item-fading-timeline"]')[0].remove() } catch (error) { 1 + 1 }
                try { document.querySelectorAll('[class="pv-entity__position-group-role-item-fading-timeline"]')[0].remove() } catch (error) { 1 + 1 }






                // INDIVIDUAL experience titles and time
                let experiencesList = $('li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view')

                // individual experiences
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

                // COMPOSED EXP group A

                function convertComposed_A_ExpTimeIntoNumber_0() {

                    if (composedExpA_Time0.includes('anos') && composedExpA_Time0.includes('mês')) { composedExpA_Time0 = composedExpA_Time0.replace(' anos ', '.'); composedExpA_Time0 = composedExpA_Time0.replace('mês', '') }
                    if (composedExpA_Time0.includes('anos') && composedExpA_Time0.includes('meses')) { composedExpA_Time0 = composedExpA_Time0.replace(' anos ', '.'); composedExpA_Time0 = composedExpA_Time0.replace('meses', '') }
                    if (composedExpA_Time0.includes('ano') && composedExpA_Time0.includes('mês')) { composedExpA_Time0 = composedExpA_Time0.replace(' ano ', '.'); composedExpA_Time0 = composedExpA_Time0.replace(' mês', '') }
                    if (composedExpA_Time0.includes('ano') && composedExpA_Time0.includes('meses')) { composedExpA_Time0 = composedExpA_Time0.replace(' ano ', '.'); composedExpA_Time0 = composedExpA_Time0.replace(' meses', '') }

                    if (composedExpA_Time0.includes('ano')) { composedExpA_Time0 = composedExpA_Time0.replace(/[^0-9.]/g, "") }
                    if (composedExpA_Time0.includes('mês')) { composedExpA_Time0 = composedExpA_Time0.replace(' mês', ''); composedExpA_Time0 = '0.' + composedExpA_Time0 }
                    if (composedExpA_Time0.includes('meses')) { composedExpA_Time0 = composedExpA_Time0.replace(' meses', ''); composedExpA_Time0 = '0.' + composedExpA_Time0 }

                    composedExpA_Time0 = parseFloat(composedExpA_Time0)

                }

                function convertComposed_A_ExpTimeIntoNumber_1() {

                    if (composedExpA_Time1.includes('anos') && composedExpA_Time1.includes('mês')) { composedExpA_Time1 = composedExpA_Time1.replace(' anos ', '.'); composedExpA_Time1 = composedExpA_Time1.replace('mês', '') }
                    if (composedExpA_Time1.includes('anos') && composedExpA_Time1.includes('meses')) { composedExpA_Time1 = composedExpA_Time1.replace(' anos ', '.'); composedExpA_Time1 = composedExpA_Time1.replace('meses', '') }
                    if (composedExpA_Time1.includes('ano') && composedExpA_Time1.includes('mês')) { composedExpA_Time1 = composedExpA_Time1.replace(' ano ', '.'); composedExpA_Time1 = composedExpA_Time1.replace(' mês', '') }
                    if (composedExpA_Time1.includes('ano') && composedExpA_Time1.includes('meses')) { composedExpA_Time1 = composedExpA_Time1.replace(' ano ', '.'); composedExpA_Time1 = composedExpA_Time1.replace(' meses', '') }

                    if (composedExpA_Time1.includes('ano')) { composedExpA_Time1 = composedExpA_Time1.replace(/[^0-9.]/g, "") }
                    if (composedExpA_Time1.includes('mês')) { composedExpA_Time1 = composedExpA_Time1.replace(' mês', ''); composedExpA_Time1 = '0.' + composedExpA_Time1 }
                    if (composedExpA_Time1.includes('meses')) { composedExpA_Time1 = composedExpA_Time1.replace(' meses', ''); composedExpA_Time1 = '0.' + composedExpA_Time1 }

                    composedExpA_Time1 = parseFloat(composedExpA_Time1)

                }

                function convertComposed_A_ExpTimeIntoNumber_2() {

                    if (composedExpA_Time2.includes('anos') && composedExpA_Time2.includes('mês')) { composedExpA_Time2 = composedExpA_Time2.replace(' anos ', '.'); composedExpA_Time2 = composedExpA_Time2.replace('mês', '') }
                    if (composedExpA_Time2.includes('anos') && composedExpA_Time2.includes('meses')) { composedExpA_Time2 = composedExpA_Time2.replace(' anos ', '.'); composedExpA_Time2 = composedExpA_Time2.replace('meses', '') }
                    if (composedExpA_Time2.includes('ano') && composedExpA_Time2.includes('mês')) { composedExpA_Time2 = composedExpA_Time2.replace(' ano ', '.'); composedExpA_Time2 = composedExpA_Time2.replace(' mês', '') }
                    if (composedExpA_Time2.includes('ano') && composedExpA_Time2.includes('meses')) { composedExpA_Time2 = composedExpA_Time2.replace(' ano ', '.'); composedExpA_Time2 = composedExpA_Time2.replace(' meses', '') }

                    if (composedExpA_Time2.includes('ano')) { composedExpA_Time2 = composedExpA_Time2.replace(/[^0-9.]/g, "") }
                    if (composedExpA_Time2.includes('mês')) { composedExpA_Time2 = composedExpA_Time2.replace(' mês', ''); composedExpA_Time2 = '0.' + composedExpA_Time2 }
                    if (composedExpA_Time2.includes('meses')) { composedExpA_Time2 = composedExpA_Time2.replace(' meses', ''); composedExpA_Time2 = '0.' + composedExpA_Time2 }

                    composedExpA_Time2 = parseFloat(composedExpA_Time2)

                }

                function convertComposed_A_ExpTimeIntoNumber_3() {

                    if (composedExpA_Time3.includes('anos') && composedExpA_Time3.includes('mês')) { composedExpA_Time3 = composedExpA_Time3.replace(' anos ', '.'); composedExpA_Time3 = composedExpA_Time3.replace('mês', '') }
                    if (composedExpA_Time3.includes('anos') && composedExpA_Time3.includes('meses')) { composedExpA_Time3 = composedExpA_Time3.replace(' anos ', '.'); composedExpA_Time3 = composedExpA_Time3.replace('meses', '') }
                    if (composedExpA_Time3.includes('ano') && composedExpA_Time3.includes('mês')) { composedExpA_Time3 = composedExpA_Time3.replace(' ano ', '.'); composedExpA_Time3 = composedExpA_Time3.replace(' mês', '') }
                    if (composedExpA_Time3.includes('ano') && composedExpA_Time3.includes('meses')) { composedExpA_Time3 = composedExpA_Time3.replace(' ano ', '.'); composedExpA_Time3 = composedExpA_Time3.replace(' meses', '') }

                    if (composedExpA_Time3.includes('ano')) { composedExpA_Time3 = composedExpA_Time3.replace(/[^0-9.]/g, "") }
                    if (composedExpA_Time3.includes('mês')) { composedExpA_Time3 = composedExpA_Time3.replace(' mês', ''); composedExpA_Time3 = '0.' + composedExpA_Time3 }
                    if (composedExpA_Time3.includes('meses')) { composedExpA_Time3 = composedExpA_Time3.replace(' meses', ''); composedExpA_Time3 = '0.' + composedExpA_Time3 }

                    composedExpA_Time3 = parseFloat(composedExpA_Time3)

                }

                function convertComposed_A_ExpTimeIntoNumber_4() {

                    if (composedExpA_Time4.includes('anos') && composedExpA_Time4.includes('mês')) { composedExpA_Time4 = composedExpA_Time4.replace(' anos ', '.'); composedExpA_Time4 = composedExpA_Time4.replace('mês', '') }
                    if (composedExpA_Time4.includes('anos') && composedExpA_Time4.includes('meses')) { composedExpA_Time4 = composedExpA_Time4.replace(' anos ', '.'); composedExpA_Time4 = composedExpA_Time4.replace('meses', '') }
                    if (composedExpA_Time4.includes('ano') && composedExpA_Time4.includes('mês')) { composedExpA_Time4 = composedExpA_Time4.replace(' ano ', '.'); composedExpA_Time4 = composedExpA_Time4.replace(' mês', '') }
                    if (composedExpA_Time4.includes('ano') && composedExpA_Time4.includes('meses')) { composedExpA_Time4 = composedExpA_Time4.replace(' ano ', '.'); composedExpA_Time4 = composedExpA_Time4.replace(' meses', '') }

                    if (composedExpA_Time4.includes('ano')) { composedExpA_Time4 = composedExpA_Time4.replace(/[^0-9.]/g, "") }
                    if (composedExpA_Time4.includes('mês')) { composedExpA_Time4 = composedExpA_Time4.replace(' mês', ''); composedExpA_Time4 = '0.' + composedExpA_Time4 }
                    if (composedExpA_Time4.includes('meses')) { composedExpA_Time4 = composedExpA_Time4.replace(' meses', ''); composedExpA_Time4 = '0.' + composedExpA_Time4 }

                    composedExpA_Time4 = parseFloat(composedExpA_Time4)

                }

                function convertComposed_A_ExpTimeIntoNumber_5() {

                    if (composedExpA_Time5.includes('anos') && composedExpA_Time5.includes('mês')) { composedExpA_Time5 = composedExpA_Time5.replace(' anos ', '.'); composedExpA_Time5 = composedExpA_Time5.replace('mês', '') }
                    if (composedExpA_Time5.includes('anos') && composedExpA_Time5.includes('meses')) { composedExpA_Time5 = composedExpA_Time5.replace(' anos ', '.'); composedExpA_Time5 = composedExpA_Time5.replace('meses', '') }
                    if (composedExpA_Time5.includes('ano') && composedExpA_Time5.includes('mês')) { composedExpA_Time5 = composedExpA_Time5.replace(' ano ', '.'); composedExpA_Time5 = composedExpA_Time5.replace(' mês', '') }
                    if (composedExpA_Time5.includes('ano') && composedExpA_Time5.includes('meses')) { composedExpA_Time5 = composedExpA_Time5.replace(' ano ', '.'); composedExpA_Time5 = composedExpA_Time5.replace(' meses', '') }

                    if (composedExpA_Time5.includes('ano')) { composedExpA_Time5 = composedExpA_Time5.replace(/[^0-9.]/g, "") }
                    if (composedExpA_Time5.includes('mês')) { composedExpA_Time5 = composedExpA_Time5.replace(' mês', ''); composedExpA_Time5 = '0.' + composedExpA_Time5 }
                    if (composedExpA_Time5.includes('meses')) { composedExpA_Time5 = composedExpA_Time5.replace(' meses', ''); composedExpA_Time5 = '0.' + composedExpA_Time5 }

                    composedExpA_Time5 = parseFloat(composedExpA_Time5)

                }

                function convertComposed_A_ExpTimeIntoNumber_6() {

                    if (composedExpA_Time6.includes('anos') && composedExpA_Time6.includes('mês')) { composedExpA_Time6 = composedExpA_Time6.replace(' anos ', '.'); composedExpA_Time6 = composedExpA_Time6.replace('mês', '') }
                    if (composedExpA_Time6.includes('anos') && composedExpA_Time6.includes('meses')) { composedExpA_Time6 = composedExpA_Time6.replace(' anos ', '.'); composedExpA_Time6 = composedExpA_Time6.replace('meses', '') }
                    if (composedExpA_Time6.includes('ano') && composedExpA_Time6.includes('mês')) { composedExpA_Time6 = composedExpA_Time6.replace(' ano ', '.'); composedExpA_Time6 = composedExpA_Time6.replace(' mês', '') }
                    if (composedExpA_Time6.includes('ano') && composedExpA_Time6.includes('meses')) { composedExpA_Time6 = composedExpA_Time6.replace(' ano ', '.'); composedExpA_Time6 = composedExpA_Time6.replace(' meses', '') }

                    if (composedExpA_Time6.includes('ano')) { composedExpA_Time6 = composedExpA_Time6.replace(/[^0-9.]/g, "") }
                    if (composedExpA_Time6.includes('mês')) { composedExpA_Time6 = composedExpA_Time6.replace(' mês', ''); composedExpA_Time6 = '0.' + composedExpA_Time6 }
                    if (composedExpA_Time6.includes('meses')) { composedExpA_Time6 = composedExpA_Time6.replace(' meses', ''); composedExpA_Time6 = '0.' + composedExpA_Time6 }

                    composedExpA_Time6 = parseFloat(composedExpA_Time6)

                }

                // COMPOSED EXP group B

                function convertComposed_B_ExpTimeIntoNumber_0() {

                    if (composedExpB_Time0.includes('anos') && composedExpB_Time0.includes('mês')) { composedExpB_Time0 = composedExpB_Time0.replace(' anos ', '.'); composedExpB_Time0 = composedExpB_Time0.replace('mês', '') }
                    if (composedExpB_Time0.includes('anos') && composedExpB_Time0.includes('meses')) { composedExpB_Time0 = composedExpB_Time0.replace(' anos ', '.'); composedExpB_Time0 = composedExpB_Time0.replace('meses', '') }
                    if (composedExpB_Time0.includes('ano') && composedExpB_Time0.includes('mês')) { composedExpB_Time0 = composedExpB_Time0.replace(' ano ', '.'); composedExpB_Time0 = composedExpB_Time0.replace(' mês', '') }
                    if (composedExpB_Time0.includes('ano') && composedExpB_Time0.includes('meses')) { composedExpB_Time0 = composedExpB_Time0.replace(' ano ', '.'); composedExpB_Time0 = composedExpB_Time0.replace(' meses', '') }

                    if (composedExpB_Time0.includes('ano')) { composedExpB_Time0 = composedExpB_Time0.replace(/[^0-9.]/g, "") }
                    if (composedExpB_Time0.includes('mês')) { composedExpB_Time0 = composedExpB_Time0.replace(' mês', ''); composedExpB_Time0 = '0.' + composedExpB_Time0 }
                    if (composedExpB_Time0.includes('meses')) { composedExpB_Time0 = composedExpB_Time0.replace(' meses', ''); composedExpB_Time0 = '0.' + composedExpB_Time0 }

                    composedExpB_Time0 = parseFloat(composedExpB_Time0)

                }

                function convertComposed_B_ExpTimeIntoNumber_1() {

                    if (composedExpB_Time1.includes('anos') && composedExpB_Time1.includes('mês')) { composedExpB_Time1 = composedExpB_Time1.replace(' anos ', '.'); composedExpB_Time1 = composedExpB_Time1.replace('mês', '') }
                    if (composedExpB_Time1.includes('anos') && composedExpB_Time1.includes('meses')) { composedExpB_Time1 = composedExpB_Time1.replace(' anos ', '.'); composedExpB_Time1 = composedExpB_Time1.replace('meses', '') }
                    if (composedExpB_Time1.includes('ano') && composedExpB_Time1.includes('mês')) { composedExpB_Time1 = composedExpB_Time1.replace(' ano ', '.'); composedExpB_Time1 = composedExpB_Time1.replace(' mês', '') }
                    if (composedExpB_Time1.includes('ano') && composedExpB_Time1.includes('meses')) { composedExpB_Time1 = composedExpB_Time1.replace(' ano ', '.'); composedExpB_Time1 = composedExpB_Time1.replace(' meses', '') }

                    if (composedExpB_Time1.includes('ano')) { composedExpB_Time1 = composedExpB_Time1.replace(/[^0-9.]/g, "") }
                    if (composedExpB_Time1.includes('mês')) { composedExpB_Time1 = composedExpB_Time1.replace(' mês', ''); composedExpB_Time1 = '0.' + composedExpB_Time1 }
                    if (composedExpB_Time1.includes('meses')) { composedExpB_Time1 = composedExpB_Time1.replace(' meses', ''); composedExpB_Time1 = '0.' + composedExpB_Time1 }

                    composedExpB_Time1 = parseFloat(composedExpB_Time1)

                }

                function convertComposed_B_ExpTimeIntoNumber_2() {

                    if (composedExpB_Time2.includes('anos') && composedExpB_Time2.includes('mês')) { composedExpB_Time2 = composedExpB_Time2.replace(' anos ', '.'); composedExpB_Time2 = composedExpB_Time2.replace('mês', '') }
                    if (composedExpB_Time2.includes('anos') && composedExpB_Time2.includes('meses')) { composedExpB_Time2 = composedExpB_Time2.replace(' anos ', '.'); composedExpB_Time2 = composedExpB_Time2.replace('meses', '') }
                    if (composedExpB_Time2.includes('ano') && composedExpB_Time2.includes('mês')) { composedExpB_Time2 = composedExpB_Time2.replace(' ano ', '.'); composedExpB_Time2 = composedExpB_Time2.replace(' mês', '') }
                    if (composedExpB_Time2.includes('ano') && composedExpB_Time2.includes('meses')) { composedExpB_Time2 = composedExpB_Time2.replace(' ano ', '.'); composedExpB_Time2 = composedExpB_Time2.replace(' meses', '') }

                    if (composedExpB_Time2.includes('ano')) { composedExpB_Time2 = composedExpB_Time2.replace(/[^0-9.]/g, "") }
                    if (composedExpB_Time2.includes('mês')) { composedExpB_Time2 = composedExpB_Time2.replace(' mês', ''); composedExpB_Time2 = '0.' + composedExpB_Time2 }
                    if (composedExpB_Time2.includes('meses')) { composedExpB_Time2 = composedExpB_Time2.replace(' meses', ''); composedExpB_Time2 = '0.' + composedExpB_Time2 }

                    composedExpB_Time2 = parseFloat(composedExpB_Time2)

                }

                function convertComposed_B_ExpTimeIntoNumber_3() {

                    if (composedExpB_Time3.includes('anos') && composedExpB_Time3.includes('mês')) { composedExpB_Time3 = composedExpB_Time3.replace(' anos ', '.'); composedExpB_Time3 = composedExpB_Time3.replace('mês', '') }
                    if (composedExpB_Time3.includes('anos') && composedExpB_Time3.includes('meses')) { composedExpB_Time3 = composedExpB_Time3.replace(' anos ', '.'); composedExpB_Time3 = composedExpB_Time3.replace('meses', '') }
                    if (composedExpB_Time3.includes('ano') && composedExpB_Time3.includes('mês')) { composedExpB_Time3 = composedExpB_Time3.replace(' ano ', '.'); composedExpB_Time3 = composedExpB_Time3.replace(' mês', '') }
                    if (composedExpB_Time3.includes('ano') && composedExpB_Time3.includes('meses')) { composedExpB_Time3 = composedExpB_Time3.replace(' ano ', '.'); composedExpB_Time3 = composedExpB_Time3.replace(' meses', '') }

                    if (composedExpB_Time3.includes('ano')) { composedExpB_Time3 = composedExpB_Time3.replace(/[^0-9.]/g, "") }
                    if (composedExpB_Time3.includes('mês')) { composedExpB_Time3 = composedExpB_Time3.replace(' mês', ''); composedExpB_Time3 = '0.' + composedExpB_Time3 }
                    if (composedExpB_Time3.includes('meses')) { composedExpB_Time3 = composedExpB_Time3.replace(' meses', ''); composedExpB_Time3 = '0.' + composedExpB_Time3 }

                    composedExpB_Time3 = parseFloat(composedExpB_Time3)

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

                convertComposed_A_ExpTimeIntoNumber_0()
                convertComposed_A_ExpTimeIntoNumber_1()
                convertComposed_A_ExpTimeIntoNumber_2()
                convertComposed_A_ExpTimeIntoNumber_3()
                convertComposed_A_ExpTimeIntoNumber_4()
                convertComposed_A_ExpTimeIntoNumber_5()
                convertComposed_A_ExpTimeIntoNumber_6()
                convertComposed_B_ExpTimeIntoNumber_0()
                convertComposed_B_ExpTimeIntoNumber_1()
                convertComposed_B_ExpTimeIntoNumber_2()
                convertComposed_B_ExpTimeIntoNumber_3()

                // INDIVIDUAL exps
                if (isNaN(experiencetime0)) { experiencetime0 = 0 }
                if (isNaN(experiencetime1)) { experiencetime1 = 0 }
                if (isNaN(experiencetime2)) { experiencetime2 = 0 }
                if (isNaN(experiencetime3)) { experiencetime3 = 0 }
                if (isNaN(experiencetime4)) { experiencetime4 = 0 }
                if (isNaN(experiencetime5)) { experiencetime5 = 0 }
                if (isNaN(experiencetime6)) { experiencetime6 = 0 }
                if (isNaN(experiencetime7)) { experiencetime7 = 0 }
                if (isNaN(experiencetime8)) { experiencetime8 = 0 }

                // COMPOSED EXP group A
                if (isNaN(composedExpA_Time0)) { composedExpA_Time0 = 0 }
                if (isNaN(composedExpA_Time1)) { composedExpA_Time1 = 0 }
                if (isNaN(composedExpA_Time2)) { composedExpA_Time2 = 0 }
                if (isNaN(composedExpA_Time3)) { composedExpA_Time3 = 0 }
                if (isNaN(composedExpA_Time4)) { composedExpA_Time4 = 0 }
                if (isNaN(composedExpA_Time5)) { composedExpA_Time5 = 0 }
                if (isNaN(composedExpA_Time6)) { composedExpA_Time6 = 0 }

                // COMPOSED EXP group B
                if (isNaN(composedExpB_Time0)) { composedExpB_Time0 = 0 }
                if (isNaN(composedExpB_Time1)) { composedExpB_Time1 = 0 }
                if (isNaN(composedExpB_Time2)) { composedExpB_Time2 = 0 }
                if (isNaN(composedExpB_Time3)) { composedExpB_Time3 = 0 }

                function validateEXP(expTitle, expTime) {
                    let counter = 0
                    lwrCaseExpTitle = expTitle.toLowerCase()
                    
                    // portuguese
                    if (lwrCaseExpTitle.includes('arquiteto')) { counter++ }
                    if (lwrCaseExpTitle.includes('engenheiro')) { counter++ }
                    if (lwrCaseExpTitle.includes('desenvolvedor')) { counter++ }
                    if (lwrCaseExpTitle.includes('técnico')) { counter++ }
                    if (lwrCaseExpTitle.includes('tecnico')) { counter++ }
                    if (lwrCaseExpTitle.includes('técnica')) { counter++ }
                    if (lwrCaseExpTitle.includes('desenvolvedora')) { counter++ }
                    if (lwrCaseExpTitle.includes('engenheira')) { counter++ }
                    if (lwrCaseExpTitle.includes('técnica')) { counter++ }
                    if (lwrCaseExpTitle.includes('programador')) { counter++ }
                    if (lwrCaseExpTitle.includes('programadora')) { counter++ }
                    if (lwrCaseExpTitle.includes('programmer')) { counter++ }
                    if (lwrCaseExpTitle.includes('líder')) { counter++ }
                    if (lwrCaseExpTitle.includes('sistemas')) { counter++ }
                    if (lwrCaseExpTitle.includes('sistema')) { counter++ }
                    if (lwrCaseExpTitle.includes('dados')) { counter++ }
                    if (lwrCaseExpTitle.includes('consultor')) { counter++ }
                    if (lwrCaseExpTitle.includes('consultora')) { counter++ }
        
                    // english
                    if (lwrCaseExpTitle.includes('architect')) { counter++ }
                    if (lwrCaseExpTitle.includes('engineer')) { counter++ }
                    if (lwrCaseExpTitle.includes('developer')) { counter++ }
                    if (lwrCaseExpTitle.includes('sdet')) { counter++ }
                    if (lwrCaseExpTitle.includes('tech')) { counter++ }
                    if (lwrCaseExpTitle.includes(' bi')) { counter++ }
                    if (lwrCaseExpTitle.includes('cto')) { counter++ }
                    if (lwrCaseExpTitle.includes('it')) { counter++ }
                    if (lwrCaseExpTitle.includes('ux')) { counter++ }
                    if (lwrCaseExpTitle.includes('ui')) { counter++ }
                    if (lwrCaseExpTitle.includes('ux/ui')) { counter++ }
                    if (lwrCaseExpTitle.includes('chief operating office')) { counter++ }
                    if (lwrCaseExpTitle.includes('lead')) { counter++ }
                    if (lwrCaseExpTitle.includes('system')) { counter++ }
                    if (lwrCaseExpTitle.includes('freelance')) { counter++ }
                    if (lwrCaseExpTitle.includes('data')) { counter++ }
                    if (lwrCaseExpTitle.includes('cloud')) { counter++ }
                    if (lwrCaseExpTitle.includes('business intelligence')) { counter++ }
                    if (lwrCaseExpTitle.includes('business inteligence')) { counter++ }
                    if (lwrCaseExpTitle.includes('test')) { counter++ }
                    if (lwrCaseExpTitle.includes('quality assurance')) { counter++ }
                    if (lwrCaseExpTitle.includes('qa')) { counter++ }
                    if (lwrCaseExpTitle.includes('machine learning')) { counter++ }
                    if (lwrCaseExpTitle.includes('consultant')) { counter++ }
                    if (lwrCaseExpTitle.includes('co-founder')) { counter++ }
                    if (lwrCaseExpTitle.includes('owner')) { counter++ }
                    if (lwrCaseExpTitle.includes('founder')) { counter++ }
                    if (lwrCaseExpTitle.includes('front')) { counter++ }
                    if (lwrCaseExpTitle.includes('back')) { counter++ }
                    if (lwrCaseExpTitle.includes('fullstack')) { counter++ }
                    if (lwrCaseExpTitle.includes('full stack')) { counter++ }
                    if (lwrCaseExpTitle.includes('head')) { counter++ }
                    if (lwrCaseExpTitle.includes('product')) { counter++ }
        
                    // spanish
                    if (lwrCaseExpTitle.includes('desarrollador')) { counter++ }
                    if (lwrCaseExpTitle.includes('desarrolladora')) { counter++ }
                    if (lwrCaseExpTitle.includes('datos')) { counter++ }
        
                    // end of function
                    if (counter > 0) { 1 + 1 } else { expTime = 0 } // i could invalidate the title as well, but i want to know what other titles could i be wrongly ignoring
                    return expTime
        
                }

                // individual experiences
                
                let individualValidatedExp0 = validateEXP(expTitle0, experiencetime0)
                let individualValidatedExp1 = validateEXP(expTitle1, experiencetime1)
                let individualValidatedExp2 = validateEXP(expTitle2, experiencetime2)
                let individualValidatedExp3 = validateEXP(expTitle3, experiencetime3)
                let individualValidatedExp4 = validateEXP(expTitle4, experiencetime4)
                let individualValidatedExp5 = validateEXP(expTitle5, experiencetime5)
                let individualValidatedExp6 = validateEXP(expTitle6, experiencetime6)
                let individualValidatedExp7 = validateEXP(expTitle7, experiencetime7)
                let individualValidatedExp8 = validateEXP(expTitle8, experiencetime8)
                
                
                // composed experiences GROUP A
                let composedA_ValidatedExp0 = validateEXP(composedExpA_Title0, composedExpA_Time0)
                let composedA_ValidatedExp1 = validateEXP(composedExpA_Title1, composedExpA_Time1)
                let composedA_ValidatedExp2 = validateEXP(composedExpA_Title2, composedExpA_Time2)
                let composedA_ValidatedExp3 = validateEXP(composedExpA_Title3, composedExpA_Time3)
                let composedA_ValidatedExp4 = validateEXP(composedExpA_Title4, composedExpA_Time4)
                let composedA_ValidatedExp5 = validateEXP(composedExpA_Title5, composedExpA_Time5)
                let composedA_ValidatedExp6 = validateEXP(composedExpA_Title6, composedExpA_Time6)

                // composed experiences GROUP B
                let composedB_ValidatedExp0 = validateEXP(composedExpB_Title0, composedExpB_Time0)
                let composedB_ValidatedExp1 = validateEXP(composedExpB_Title1, composedExpB_Time1)
                let composedB_ValidatedExp2 = validateEXP(composedExpB_Title2, composedExpB_Time2)
                let composedB_ValidatedExp3 = validateEXP(composedExpB_Title3, composedExpB_Time3)
        

                totalworkingtime = individualValidatedExp0 + individualValidatedExp1 + individualValidatedExp2 + individualValidatedExp3 + individualValidatedExp4 + individualValidatedExp5 + individualValidatedExp6 + individualValidatedExp7 + individualValidatedExp8 + composedA_ValidatedExp0 + composedA_ValidatedExp1 + composedA_ValidatedExp2 + composedA_ValidatedExp3 + composedA_ValidatedExp4 + composedA_ValidatedExp5 + composedA_ValidatedExp6 + composedB_ValidatedExp0 + composedB_ValidatedExp1 + composedB_ValidatedExp2 + composedB_ValidatedExp3

                moveToSelectedFolder()

                // this is the code to change the folder's directory
                async function moveToSelectedFolder() {
                    const currentPath = path.join(__dirname, folderToBeScrapped, currentProfile);
                    const destinationPath = path.join(__dirname, selectedFolder, currentProfile);
                    fs.rename(currentPath, destinationPath, function (err) {
                        1 + 1
                        if (err) {
                            1 + 1;
                            // throw err;
                        } else {
                            // console.log("Successfully moved the file!"); // unit testing
                        }
                    });
                }



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


                        firstExperienceTitle: expTitle0,
                        firstExperienceTime: individualValidatedExp0,


                        secondExperienceTitle: expTitle1,
                        secondExperienceTime: individualValidatedExp1,


                        thirdExperienceTitle: expTitle2,
                        thirdExperienceTime: individualValidatedExp2,


                        fourthExperienceTitle: expTitle3,
                        fourthExperienceTime: individualValidatedExp3,


                        fifthExperienceTitle: expTitle4,
                        fifthExperienceTime: individualValidatedExp4,


                        sixthExperienceTitle: expTitle5,
                        sixthExperienceTime: individualValidatedExp5,


                        seventhExperienceTitle: expTitle6,
                        seventhExperienceTime: individualValidatedExp6,


                        eigthExperienceTitle: expTitle7,
                        eigthExperienceTime: individualValidatedExp7,


                        ninethExperienceTitle: expTitle8,
                        ninethExperienceTime: individualValidatedExp8,

                        // COMPOSED EXP
                        // group A

                        composedExperienceA_Title0: composedExpA_Title0,
                        composedExperienceA_Time0: composedExpA_Time0,

                        composedExperienceA_Title1: composedExpA_Title1,
                        composedExperienceA_Time1: composedExpA_Time1,

                        composedExperienceA_Title2: composedExpA_Title2,
                        composedExperienceA_Time2: composedExpA_Time2,

                        composedExperienceA_Title3: composedExpA_Title3,
                        composedExperienceA_Time3: composedExpA_Time3,

                        composedExperienceA_Title4: composedExpA_Title4,
                        composedExperienceA_Time4: composedExpA_Time4,

                        composedExperienceA_Title5: composedExpA_Title5,
                        composedExperienceA_Time5: composedExpA_Time5,

                        composedExperienceA_Title6: composedExpA_Title6,
                        composedExperienceA_Time6: composedExpA_Time6,

                        // group B

                        composedExperienceB_Title0: composedExpB_Title0,
                        composedExperienceB_Time0: composedExpB_Time0,

                        composedExperienceB_Title1: composedExpB_Title1,
                        composedExperienceB_Time1: composedExpB_Time1,

                        composedExperienceB_Title2: composedExpB_Title2,
                        composedExperienceB_Time2: composedExpB_Time2,

                        composedExperienceB_Title3: composedExpB_Title3,
                        composedExperienceB_Time3: composedExpB_Time3,

                        totalWorkingTime: totalworkingtime

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


