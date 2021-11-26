// scraper packages
const cheerio = require("cheerio");
const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");
const { first } = require("cheerio/lib/api/traversing");
const { moveMessagePortToContext } = require("worker_threads");
const folderToBeScrapped = "./zprofiles/1english/";
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

                // IT EXP VALIDATION - don't count if exp is outside IT (i.e. photographer, salesperson)

                // COMPOSED EXP - GROUP A
                //
                //
                //
                //
                

                // function validate_composedExpA_Title0() {
                //     if (composedExpA_Title0.includes('architect' || 'arquiteto' || 'engineer' || 'engenheiro' || 'developer' || 'desenvolvedor' || 'sdet' || 'SDET' || 'tech' || 'técnico' || 'tecnico' || 'técnica' || 'desenvolvedora' || 'engenheira' || '' || 'Architect' || 'Arquiteto' || 'Engineer' || 'Engenheiro' || 'Developer' || 'Desenvolvedor' || 'Tech' || 'Técnico' || 'Tecnico' || 'Técnica' || 'Desenvolvedora' || 'Engenheira' || 'técnica' || 'Técnica' || 'BI' || 'CTO' || 'IT' || 'UX' || 'UI' || 'ux/ui' || 'Chief Operating Office' || 'desarrollador' || 'desarrolladora' || 'programador' || 'programadora' || 'programmer' || 'lead' || 'líder' || 'sistemas' || 'sistema' || 'system' || 'freelance' || 'data' || 'dados' || 'datos' || 'cloud' || 'business intelligence' || 'business inteligence' || 'test' || 'quality assurance' || 'QA' || 'qa' || 'machine learning' || 'consultor' || 'consultora' || 'consultant' || 'co-founder' || 'owner' || 'founder' || 'front' || 'front' || 'back' || 'fullstack' || 'head' || 'product' || 'Desarrollador' || 'Desarrolladora' || 'Programador' || 'Programadora' || 'Programmer' || 'Lead' || 'Líder' || 'Sistemas' || 'Sistema' || 'System' || 'Freelance' || 'Data' || 'Dados' || 'Datos' || 'Cloud' || 'Intelligence' || 'Inteligence' || 'Test' || 'Quality Assurance' || 'Qa' || 'Qa' || 'Machine Learning' || 'Consultor' || 'Consultora' || 'Consultant' || 'Co-Founder' || 'Owner' || 'Founder' || 'Front' || 'Front' || 'Back' || 'Fullstack' || 'Head' || 'Product' )) {1+1} else {composedExpA_Title0 = ''; composedExpA_Time0 = ''}
                // }


                // OR 

                // if (
                //     composedExpA_Title0.includes('architect') || composedExpA_Title0.includes('arquiteto') || composedExpA_Title0.includes('engineer') || composedExpA_Title0.includes('engenheiro') || composedExpA_Title0.includes('developer') || composedExpA_Title0.includes('desenvolvedor') || composedExpA_Title0.includes('sdet') || composedExpA_Title0.includes('SDET') || composedExpA_Title0.includes('tech') || composedExpA_Title0.includes('técnico') || composedExpA_Title0.includes('tecnico') || composedExpA_Title0.includes('técnica') || composedExpA_Title0.includes('desenvolvedora') || composedExpA_Title0.includes('engenheira') || composedExpA_Title0.includes('Architect') || composedExpA_Title0.includes('Arquiteto') || composedExpA_Title0.includes('Engineer') || composedExpA_Title0.includes('Engenheiro') || composedExpA_Title0.includes('Developer') || composedExpA_Title0.includes('Desenvolvedor') || composedExpA_Title0.includes('Tech') || composedExpA_Title0.includes('Técnico') || composedExpA_Title0.includes('Tecnico') || composedExpA_Title0.includes('Técnica') || composedExpA_Title0.includes('Desenvolvedora') || composedExpA_Title0.includes('Engenheira') || composedExpA_Title0.includes('técnica') || composedExpA_Title0.includes('Técnica') || composedExpA_Title0.includes('BI') || composedExpA_Title0.includes('CTO') || composedExpA_Title0.includes('IT') || composedExpA_Title0.includes('UX') || composedExpA_Title0.includes('UI') || composedExpA_Title0.includes('ux/ui') || composedExpA_Title0.includes('ChiefOperatingOffice') || composedExpA_Title0.includes('desarrollador') || composedExpA_Title0.includes('desarrolladora') || composedExpA_Title0.includes('programador') || composedExpA_Title0.includes('programadora') || composedExpA_Title0.includes('programmer') || composedExpA_Title0.includes('lead') || composedExpA_Title0.includes('líder') || composedExpA_Title0.includes('sistemas') || composedExpA_Title0.includes('sistema') || composedExpA_Title0.includes('system') || composedExpA_Title0.includes('freelance') || composedExpA_Title0.includes('data') || composedExpA_Title0.includes('dados') || composedExpA_Title0.includes('datos') || composedExpA_Title0.includes('cloud') || composedExpA_Title0.includes('businessintelligence') || composedExpA_Title0.includes('businessinteligence') || composedExpA_Title0.includes('test') || composedExpA_Title0.includes('qualityassurance') || composedExpA_Title0.includes('QA') || composedExpA_Title0.includes('qa') || composedExpA_Title0.includes('machinelearning') || composedExpA_Title0.includes('consultor') || composedExpA_Title0.includes('consultora') || composedExpA_Title0.includes('consultant') || composedExpA_Title0.includes('co-founder') || composedExpA_Title0.includes('owner') || composedExpA_Title0.includes('founder') || composedExpA_Title0.includes('front') || composedExpA_Title0.includes('front') || composedExpA_Title0.includes('back') || composedExpA_Title0.includes('fullstack') || composedExpA_Title0.includes('head') || composedExpA_Title0.includes('product') || composedExpA_Title0.includes('Desarrollador') || composedExpA_Title0.includes('Desarrolladora') || composedExpA_Title0.includes('Programador') || composedExpA_Title0.includes('Programadora') || composedExpA_Title0.includes('Programmer') || composedExpA_Title0.includes('Lead') || composedExpA_Title0.includes('Líder') || composedExpA_Title0.includes('Sistemas') || composedExpA_Title0.includes('Sistema') || composedExpA_Title0.includes('System') || composedExpA_Title0.includes('Freelance') || composedExpA_Title0.includes('Data') || composedExpA_Title0.includes('Dados') || composedExpA_Title0.includes('Datos') || composedExpA_Title0.includes('Cloud') || composedExpA_Title0.includes('Intelligence') || composedExpA_Title0.includes('Inteligence') || composedExpA_Title0.includes('Test') || composedExpA_Title0.includes('QualityAssurance') || composedExpA_Title0.includes('Qa') || composedExpA_Title0.includes('Qa') || composedExpA_Title0.includes('MachineLearning') || composedExpA_Title0.includes('Consultor') || composedExpA_Title0.includes('Consultora') || composedExpA_Title0.includes('Consultant') || composedExpA_Title0.includes('Co-Founder') || composedExpA_Title0.includes('Owner') || composedExpA_Title0.includes('Founder') || composedExpA_Title0.includes('Front') || composedExpA_Title0.includes('Front') || composedExpA_Title0.includes('Back') || composedExpA_Title0.includes('Fullstack') || composedExpA_Title0.includes('Head') || composedExpA_Title0.includes('Product')
                // ) {1+1} else {composedExpA_Title0='';composedExpA_Time0=''}

                
            

                totalworkingtime = experiencetime0 + experiencetime1 + experiencetime2 + experiencetime3 + experiencetime4 + experiencetime5 + experiencetime6 + experiencetime7 + experiencetime8 + composedExpA_Time0 + composedExpA_Time1 + composedExpA_Time2 + composedExpA_Time3 + composedExpA_Time4 + composedExpA_Time5 + composedExpA_Time6 + composedExpB_Time0 + composedExpB_Time0 + composedExpB_Time0 + composedExpB_Time0

                

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

