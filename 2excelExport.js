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

// FROM WITH ENGLISH
const folderToBeScrapped = "D:/Users/jonat/git/l1nk3d1n/withEnglish/";
const selectedFolder = "D:/Users/jonat/git/l1nk3d1n/zprofiles/selectedFolder/zexported/";

// FROM ZEXPORTED
// const folderToBeScrapped = "D:/Users/jonat/git/l1nk3d1n/zprofiles/selectedFolder/zexported/";
// const selectedFolder = "D:/Users/jonat/git/l1nk3d1n/zprofiles/selectedFolder/zexported/";


profilesToBeScraped = [];

// Read the file into memory
const workbook = xlsx.readFile("feb-newversion.xlsx");

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
            for (i = 0; i < 3000; i++) {
                currentProfile = profilesToBeScraped[i];

                // this will READ the looped file and extract the infos below
                html = fs.readFileSync(folderToBeScrapped + currentProfile, { encoding: "utf8", flag: "r" });
                let $ = cheerio.load(html);
                wholeHTML = $("body").text();

                function deleteChatPoPups() {

                    for (let i = 0; i < 7; i++) {
                        try { document.querySelector('div[class="display-flex flex-column justify-center overflow-hidden"]').parentElement.parentElement.parentElement.remove() } catch (error) { 1 + 1 }

                    }
                }

                function getFirstInfos() {

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


                    // currentCompany
                    rawCurrentCompany = $("h3.t-16.t-black.t-bold").eq(0).children().text();
                    currentCompany = rawCurrentCompany.replace(/Nome da empresa/gim, "");

                }

                function runWordCounters() {

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
                    xnet = ((wholeHTML.match(/C#/gim) || []).length) + ((wholeHTML.match(/.net/gim) || []).length) + ((wholeHTML.match(/dotnet/gim) || []).length);

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
                }

                function getComposedEXPS_A() {

                    let composedExpListA = $('li.pv-entity__position-group-role-item')

                    composedExpA_Title0 = composedExpListA.eq(0).children().children().children().children().children().children().children().children().eq(1).text()
                    composedExpA_TimeString0 = composedExpListA.eq(0).children().children().children().children().children().children().children().children().children().eq(3).text()

                    composedExpA_Title1 = composedExpListA.eq(1).children().children().children().children().children().children().children().children().eq(1).text()
                    composedExpA_TimeString1 = composedExpListA.eq(1).children().children().children().children().children().children().children().children().children().eq(3).text()

                    composedExpA_Title2 = composedExpListA.eq(2).children().children().children().children().children().children().children().children().eq(1).text()
                    composedExpA_TimeString2 = composedExpListA.eq(2).children().children().children().children().children().children().children().children().children().eq(3).text()

                    composedExpA_Title3 = composedExpListA.eq(3).children().children().children().children().children().children().children().children().eq(1).text()
                    composedExpA_TimeString3 = composedExpListA.eq(3).children().children().children().children().children().children().children().children().children().eq(3).text()

                    composedExpA_Title4 = composedExpListA.eq(4).children().children().children().children().children().children().children().children().eq(1).text()
                    composedExpA_TimeString4 = composedExpListA.eq(4).children().children().children().children().children().children().children().children().children().eq(3).text()

                    composedExpA_Title5 = composedExpListA.eq(5).children().children().children().children().children().children().children().children().eq(1).text()
                    composedExpA_TimeString5 = composedExpListA.eq(5).children().children().children().children().children().children().children().children().children().eq(3).text()

                    composedExpA_Title6 = composedExpListA.eq(6).children().children().children().children().children().children().children().children().eq(1).text()
                    composedExpA_TimeString6 = composedExpListA.eq(6).children().children().children().children().children().children().children().children().children().eq(3).text()


                }

                function getComposedEXPS_B() {

                    let composedExpListB = $('li.pv-entity__position-group-role-item-fading-timeline')

                    composedExpB_Title0 = composedExpListB.eq(0).children().children().children().children().children().children().children().eq(0).children().eq(1).text()
                    composedExpB_TimeString0 = composedExpListB.eq(0).children().children().children().children().children().children().children().children().eq(3).children().eq(1).text()

                    composedExpB_Title1 = composedExpListB.eq(1).children().children().children().children().children().children().children().eq(0).children().eq(1).text()
                    composedExpB_TimeString1 = composedExpListB.eq(1).children().children().children().children().children().children().children().children().eq(3).children().eq(1).text()

                    composedExpB_Title2 = composedExpListB.eq(2).children().children().children().children().children().children().children().eq(0).children().eq(1).text()
                    composedExpB_TimeString2 = composedExpListB.eq(2).children().children().children().children().children().children().children().children().eq(3).children().eq(1).text()

                    composedExpB_Title3 = composedExpListB.eq(3).children().children().children().children().children().children().children().eq(0).children().eq(1).text()
                    composedExpB_TimeString3 = composedExpListB.eq(3).children().children().children().children().children().children().children().children().eq(3).children().eq(1).text()


                }

                function removeComposedEXPs() {

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

                }

                function getIndividualExperiences() {

                    let experiencesList = $('.pv-profile-section > div > div > a')
                    // This selector catches all individual experiences without margin of error, but it goes one level deep inside the element and then you must go back one step to have access to infos

                    expTitle0 = experiencesList.eq(0).parent().eq(0).children().children().children().eq(1).text()
                    companyCountry0 = experiencesList.eq(0).parent().eq(0).children().eq(0).children().eq(1).children().eq(4).children().eq(1).text()
                    expDescription0 = experiencesList.eq(0).parent().eq(0).children().eq(1).text().trim()
                    experienceTime_as_String0 = experiencesList.eq(0).parent().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1).children().eq(1).text()

                    expTitle1 = experiencesList.eq(1).parent().eq(0).children().children().children().eq(1).text()
                    companyCountry1 = experiencesList.eq(1).parent().eq(0).children().eq(0).children().eq(1).children().eq(4).children().eq(1).text()
                    expDescription1 = experiencesList.eq(1).parent().eq(0).children().eq(1).text().trim()
                    experienceTime_as_String1 = experiencesList.eq(1).parent().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1).children().eq(1).text()

                    expTitle2 = experiencesList.eq(2).parent().eq(0).children().children().children().eq(1).text()
                    companyCountry2 = experiencesList.eq(2).parent().eq(0).children().eq(0).children().eq(1).children().eq(4).children().eq(1).text()
                    expDescription2 = experiencesList.eq(2).parent().eq(0).children().eq(1).text().trim()
                    experienceTime_as_String2 = experiencesList.eq(2).parent().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1).children().eq(1).text()

                    expTitle3 = experiencesList.eq(3).parent().eq(0).children().children().children().eq(1).text()
                    companyCountry3 = experiencesList.eq(3).parent().eq(0).children().eq(0).children().eq(1).children().eq(4).children().eq(1).text()
                    expDescription3 = experiencesList.eq(3).parent().eq(0).children().eq(1).text().trim()
                    experienceTime_as_String3 = experiencesList.eq(3).parent().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1).children().eq(1).text()

                    expTitle4 = experiencesList.eq(4).parent().eq(0).children().children().children().eq(1).text()
                    companyCountry4 = experiencesList.eq(4).parent().eq(0).children().eq(0).children().eq(1).children().eq(4).children().eq(1).text()
                    expDescription4 = experiencesList.eq(4).parent().eq(0).children().eq(1).text().trim()
                    experienceTime_as_String4 = experiencesList.eq(4).parent().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1).children().eq(1).text()

                    expTitle5 = experiencesList.eq(5).parent().eq(0).children().children().children().eq(1).text()
                    companyCountry5 = experiencesList.eq(5).parent().eq(0).children().eq(0).children().eq(1).children().eq(4).children().eq(1).text()
                    expDescription5 = experiencesList.eq(5).parent().eq(0).children().eq(1).text().trim()
                    experienceTime_as_String5 = experiencesList.eq(5).parent().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1).children().eq(1).text()

                    expTitle6 = experiencesList.eq(6).parent().eq(0).children().children().children().eq(1).text()
                    companyCountry6 = experiencesList.eq(6).parent().eq(0).children().eq(0).children().eq(1).children().eq(4).children().eq(1).text()
                    expDescription6 = experiencesList.eq(6).parent().eq(0).children().eq(1).text().trim()
                    experienceTime_as_String6 = experiencesList.eq(6).parent().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1).children().eq(1).text()

                    expTitle7 = experiencesList.eq(7).parent().eq(0).children().children().children().eq(1).text()
                    companyCountry7 = experiencesList.eq(7).parent().eq(0).children().eq(0).children().eq(1).children().eq(4).children().eq(1).text()
                    expDescription7 = experiencesList.eq(7).parent().eq(0).children().eq(1).text().trim()
                    experienceTime_as_String7 = experiencesList.eq(7).parent().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1).children().eq(1).text()

                    expTitle8 = experiencesList.eq(8).parent().eq(0).children().children().children().eq(1).text()
                    companyCountry8 = experiencesList.eq(8).parent().eq(0).children().eq(0).children().eq(1).children().eq(4).children().eq(1).text()
                    expDescription8 = experiencesList.eq(8).parent().eq(0).children().eq(1).text().trim()
                    experienceTime_as_String8 = experiencesList.eq(8).parent().eq(0).children().eq(0).children().eq(1).children().eq(3).children().eq(1).children().eq(1).text()

                }

                function convert_experience_time_strings_into_number() {

                    function convert_Exp_Time_String_Into_Number(expTimeString) {

                        if (expTimeString.includes('anos') && expTimeString.includes('mês')) { expTimeString = expTimeString.replace(' anos ', '.'); expTimeString = expTimeString.replace('mês', '') }
                        if (expTimeString.includes('anos') && expTimeString.includes('meses')) { expTimeString = expTimeString.replace(' anos ', '.'); expTimeString = expTimeString.replace('meses', '') }
                        if (expTimeString.includes('ano') && expTimeString.includes('mês')) { expTimeString = expTimeString.replace(' ano ', '.'); expTimeString = expTimeString.replace(' mês', '') }
                        if (expTimeString.includes('ano') && expTimeString.includes('meses')) { expTimeString = expTimeString.replace(' ano ', '.'); expTimeString = expTimeString.replace(' meses', '') }

                        if (expTimeString.includes('ano')) { expTimeString = expTimeString.replace(/[^0-9.]/g, "") }
                        if (expTimeString.includes('mês')) { expTimeString = expTimeString.replace(' mês', ''); expTimeString = '0.' + expTimeString }
                        if (expTimeString.includes('meses')) { expTimeString = expTimeString.replace(' meses', ''); expTimeString = '0.' + expTimeString }

                        expTimeString = parseFloat(expTimeString)
                        return expTimeString


                    }

                    // individual
                    experiencetime0 = convert_Exp_Time_String_Into_Number(experienceTime_as_String0)
                    experiencetime1 = convert_Exp_Time_String_Into_Number(experienceTime_as_String1)
                    experiencetime2 = convert_Exp_Time_String_Into_Number(experienceTime_as_String2)
                    experiencetime3 = convert_Exp_Time_String_Into_Number(experienceTime_as_String3)
                    experiencetime4 = convert_Exp_Time_String_Into_Number(experienceTime_as_String4)
                    experiencetime5 = convert_Exp_Time_String_Into_Number(experienceTime_as_String5)
                    experiencetime6 = convert_Exp_Time_String_Into_Number(experienceTime_as_String6)
                    experiencetime7 = convert_Exp_Time_String_Into_Number(experienceTime_as_String7)
                    experiencetime8 = convert_Exp_Time_String_Into_Number(experienceTime_as_String8)


                    // composed Exp group A
                    composedExpA_Time0 = convert_Exp_Time_String_Into_Number(composedExpA_TimeString0)
                    composedExpA_Time1 = convert_Exp_Time_String_Into_Number(composedExpA_TimeString1)
                    composedExpA_Time2 = convert_Exp_Time_String_Into_Number(composedExpA_TimeString2)
                    composedExpA_Time3 = convert_Exp_Time_String_Into_Number(composedExpA_TimeString3)
                    composedExpA_Time4 = convert_Exp_Time_String_Into_Number(composedExpA_TimeString4)
                    composedExpA_Time5 = convert_Exp_Time_String_Into_Number(composedExpA_TimeString5)
                    composedExpA_Time6 = convert_Exp_Time_String_Into_Number(composedExpA_TimeString6)

                    // composed Exp group B
                    composedExpB_Time0 = convert_Exp_Time_String_Into_Number(composedExpB_TimeString0)
                    composedExpB_Time1 = convert_Exp_Time_String_Into_Number(composedExpB_TimeString1)
                    composedExpB_Time2 = convert_Exp_Time_String_Into_Number(composedExpB_TimeString2)
                    composedExpB_Time3 = convert_Exp_Time_String_Into_Number(composedExpB_TimeString3)
                }

                function validate_EXP_Time_if_NaN() {
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
                }

                function Validate_EXP_Time_if_IT_Experience() {
                    function validateEXP(expTitle, expTime) {
                        let counter = 0
                        lwrCaseExpTitle = expTitle.toLowerCase()

                        if (lwrCaseExpTitle.includes('quality')) { counter++ }
                        if (lwrCaseExpTitle.includes('qa')) { counter++ }
                        if (lwrCaseExpTitle.includes('quality')) { counter++ }
                        if (lwrCaseExpTitle.includes('test')) { counter++ }
                        if (lwrCaseExpTitle.includes('sdet')) { counter++ }
                        if (lwrCaseExpTitle.includes('qualid')) { counter++ }

                        
                        if (lwrCaseExpTitle.includes('human')) { counter++ }
                        if (lwrCaseExpTitle.includes('talent')) { counter++ }
                        if (lwrCaseExpTitle.includes('recruiter')) { counter++ }

                        if (lwrCaseExpTitle.includes('java')) { counter++ }
                        if (lwrCaseExpTitle.includes('.net')) { counter++ }
                        if (lwrCaseExpTitle.includes('PHP')) { counter++ }
                        if (lwrCaseExpTitle.includes('python')) { counter++ }

                        if (lwrCaseExpTitle.includes('react')) { counter++ }
                        if (lwrCaseExpTitle.includes('front')) { counter++ }
                        if (lwrCaseExpTitle.includes('back')) { counter++ }
                        if (lwrCaseExpTitle.includes('full stack')) { counter++ }
                        if (lwrCaseExpTitle.includes('fullstack')) { counter++ }

                        if (lwrCaseExpTitle.includes('devops')) { counter++ }
                        if (lwrCaseExpTitle.includes('Infrastructure')) { counter++ }
                        if (lwrCaseExpTitle.includes('engineer')) { counter++ }
                        if (lwrCaseExpTitle.includes('engenheir')) { counter++ }
                        if (lwrCaseExpTitle.includes('architect')) { counter++ }
                        if (lwrCaseExpTitle.includes('arquitet')) { counter++ }
                        if (lwrCaseExpTitle.includes('mobile')) { counter++ }
                        if (lwrCaseExpTitle.includes('software')) { counter++ }
                        if (lwrCaseExpTitle.includes('developer')) { counter++ }
                        if (lwrCaseExpTitle.includes('program')) { counter++ }
                        if (lwrCaseExpTitle.includes('desenvolvedor')) { counter++ }
                        if (lwrCaseExpTitle.includes('free')) { counter++ }
                        if (lwrCaseExpTitle.includes('BI')) { counter++ }
                        if (lwrCaseExpTitle.includes('Business Intelligence')) { counter++ }
                        if (lwrCaseExpTitle.includes('sistema')) { counter++ }
                        if (lwrCaseExpTitle.includes('system')) { counter++ }
                        if (lwrCaseExpTitle.includes('senior')) { counter++ }
                        if (lwrCaseExpTitle.includes('consultant')) { counter++ }
                        if (lwrCaseExpTitle.includes('project')) { counter++ }
                        if (lwrCaseExpTitle.includes('scrum')) { counter++ }
                        if (lwrCaseExpTitle.includes('ux ')) { counter++ }
                        if (lwrCaseExpTitle.includes('UX/UI')) { counter++ }
                        if (lwrCaseExpTitle.includes('data')) { counter++ }
                        if (lwrCaseExpTitle.includes('machine')) { counter++ }
                        
                        // end of function
                        if (counter > 0) { 1 + 1 } else { expTime = 0 } // i could invalidate the title as well, but i want to know what other titles could i be ignoring
                        return expTime

                    }

                    // individual experiences
                    individualValidatedExp0 = validateEXP(expTitle0, experiencetime0)
                    individualValidatedExp1 = validateEXP(expTitle1, experiencetime1)
                    individualValidatedExp2 = validateEXP(expTitle2, experiencetime2)
                    individualValidatedExp3 = validateEXP(expTitle3, experiencetime3)
                    individualValidatedExp4 = validateEXP(expTitle4, experiencetime4)
                    individualValidatedExp5 = validateEXP(expTitle5, experiencetime5)
                    individualValidatedExp6 = validateEXP(expTitle6, experiencetime6)
                    individualValidatedExp7 = validateEXP(expTitle7, experiencetime7)
                    individualValidatedExp8 = validateEXP(expTitle8, experiencetime8)

                    // composed experiences GROUP A
                    composedA_ValidatedExp0 = validateEXP(composedExpA_Title0, composedExpA_Time0)
                    composedA_ValidatedExp1 = validateEXP(composedExpA_Title1, composedExpA_Time1)
                    composedA_ValidatedExp2 = validateEXP(composedExpA_Title2, composedExpA_Time2)
                    composedA_ValidatedExp3 = validateEXP(composedExpA_Title3, composedExpA_Time3)
                    composedA_ValidatedExp4 = validateEXP(composedExpA_Title4, composedExpA_Time4)
                    composedA_ValidatedExp5 = validateEXP(composedExpA_Title5, composedExpA_Time5)
                    composedA_ValidatedExp6 = validateEXP(composedExpA_Title6, composedExpA_Time6)

                    // composed experiences GROUP B
                    composedB_ValidatedExp0 = validateEXP(composedExpB_Title0, composedExpB_Time0)
                    composedB_ValidatedExp1 = validateEXP(composedExpB_Title1, composedExpB_Time1)
                    composedB_ValidatedExp2 = validateEXP(composedExpB_Title2, composedExpB_Time2)
                    composedB_ValidatedExp3 = validateEXP(composedExpB_Title3, composedExpB_Time3)
                }

                function sum_All_EXP_Time() {
                    totalworkingtime = individualValidatedExp0 + individualValidatedExp1 + individualValidatedExp2 + individualValidatedExp3 + individualValidatedExp4 + individualValidatedExp5 + individualValidatedExp6 + individualValidatedExp7 + individualValidatedExp8 + composedA_ValidatedExp0 + composedA_ValidatedExp1 + composedA_ValidatedExp2 + composedA_ValidatedExp3 + composedA_ValidatedExp4 + composedA_ValidatedExp5 + composedA_ValidatedExp6 + composedB_ValidatedExp0 + composedB_ValidatedExp1 + composedB_ValidatedExp2 + composedB_ValidatedExp3
                }

                function get_competences() {

                    let list_of_competences = $('li.pv-skill-category-entity pv-skill-category-entity--secondary pt4 pv-skill-endorsedSkill-entity relative ember-view')
                    
                    
                    
                    
                    
                    
                    
                    
                    
                }

                function moveToSelectedFolder() {
                    // this is the code to change the folder's directory
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

                function send_Data_to_Excel() {
                    worksheets.Plan1.push({
                        // "First Name": `${i}`,
                        // Country: {},

                        URL: url,
                        "file name": fileName,
                        dateOfEntry: dateOfEntry,
                        name: candidateName,
                        location: location,
                        title: profileTitle,
                        currentCompany: currentCompany,
                        // xSenior: xsenior,
                        // xNode: xnode,
                        // xJava: xjava,
                        // xPython: xpython,
                        // xFlask: xflask,
                        // xdevops: xdevops,
                        // xAWS: xaws,
                        // xdatascience: xdatascience,
                        // xArtificialIntelligence: xartificialintelligence,
                        // xMachineLearning: xmachinelearning,
                        // xDataArchitect: xdataarchitect,
                        // xArchitect: xarchitect,
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
                        // xSelenium: xselenium,


                        firstExperienceTitle: expTitle0,
                        experienceLocation0: companyCountry0,
                        experienceDescription0: expDescription0,
                        firstExperienceTime: individualValidatedExp0,


                        secondExperienceTitle: expTitle1,
                        experienceLocation1: companyCountry1,
                        experienceDescription1: expDescription1,
                        secondExperienceTime: individualValidatedExp1,


                        thirdExperienceTitle: expTitle2,
                        experienceLocation2: companyCountry2,
                        experienceDescription2: expDescription2,
                        thirdExperienceTime: individualValidatedExp2,


                        fourthExperienceTitle: expTitle3,
                        experienceLocation3: companyCountry3,
                        experienceDescription3: expDescription3,
                        fourthExperienceTime: individualValidatedExp3,


                        fifthExperienceTitle: expTitle4,
                        experienceLocation4: companyCountry4,
                        experienceDescription4: expDescription4,
                        fifthExperienceTime: individualValidatedExp4,


                        sixthExperienceTitle: expTitle5,
                        experienceLocation5: companyCountry5,
                        experienceDescription5: expDescription5,
                        sixthExperienceTime: individualValidatedExp5,


                        seventhExperienceTitle: expTitle6,
                        experienceLocation6: companyCountry6,
                        experienceDescription6: expDescription6,
                        seventhExperienceTime: individualValidatedExp6,


                        eigthExperienceTitle: expTitle7,
                        experienceLocation7: companyCountry7,
                        experienceDescription7: expDescription7,
                        eigthExperienceTime: individualValidatedExp7,


                        ninethExperienceTitle: expTitle8,
                        experienceLocation8: companyCountry8,
                        experienceDescription8: expDescription8,
                        ninethExperienceTime: individualValidatedExp8,

                        // COMPOSED EXP
                        // group A

                        composedExperienceA_Title0: composedExpA_Title0,
                        // composed_Experience_DescriptionA_0: composedExpDescA_0,
                        composedExperienceA_Time0: composedExpA_Time0,

                        composedExperienceA_Title1: composedExpA_Title1,
                        // composed_Experience_DescriptionA_1: composedExpDescA_1,
                        composedExperienceA_Time1: composedExpA_Time1,

                        composedExperienceA_Title2: composedExpA_Title2,
                        // composed_Experience_DescriptionA_2: composedExpDescA_2,
                        composedExperienceA_Time2: composedExpA_Time2,

                        composedExperienceA_Title3: composedExpA_Title3,
                        // composed_Experience_DescriptionA_3: composedExpDescA_3,
                        composedExperienceA_Time3: composedExpA_Time3,

                        composedExperienceA_Title4: composedExpA_Title4,
                        // composed_Experience_DescriptionA_4: composedExpDescA_4,
                        composedExperienceA_Time4: composedExpA_Time4,

                        composedExperienceA_Title5: composedExpA_Title5,
                        // composed_Experience_DescriptionA_5: composedExpDescA_5,
                        composedExperienceA_Time5: composedExpA_Time5,

                        composedExperienceA_Title6: composedExpA_Title6,
                        // composed_Experience_DescriptionA_6: composedExpDescA_6,
                        composedExperienceA_Time6: composedExpA_Time6,

                        // group B

                        composedExperienceB_Title0: composedExpB_Title0,
                        // composed_Experience_DescriptionB_0: composedExpDescB_0,
                        composedExperienceB_Time0: composedExpB_Time0,

                        composedExperienceB_Title1: composedExpB_Title1,
                        // composed_Experience_DescriptionB_1: composedExpDescB_1,
                        composedExperienceB_Time1: composedExpB_Time1,

                        composedExperienceB_Title2: composedExpB_Title2,
                        // composed_Experience_DescriptionB_2: composedExpDescB_2,
                        composedExperienceB_Time2: composedExpB_Time2,

                        composedExperienceB_Title3: composedExpB_Title3,
                        // composed_Experience_DescriptionB_3: composedExpDescB_3,
                        composedExperienceB_Time3: composedExpB_Time3,

                        totalWorkingTime: totalworkingtime

                    });
                }

                
                
                
                
                

                deleteChatPoPups()
                getFirstInfos()
                // runWordCounters() 
                // i deactivated it because i rarely  use this counter in excel.

                getComposedEXPS_A()
                getComposedEXPS_B()
                removeComposedEXPs()
                getIndividualExperiences()
                convert_experience_time_strings_into_number()
                validate_EXP_Time_if_NaN()
                Validate_EXP_Time_if_IT_Experience()
                sum_All_EXP_Time()
                // moveToSelectedFolder()
                send_Data_to_Excel()


                // this needs to stay below the push method. I tried to put above, but it only works here.
                xlsx.utils.sheet_add_json(workbook.Sheets["Plan1"], worksheets.Plan1);
                xlsx.writeFile(workbook, "feb-newversion.xlsx");

            }
        });
    }
}

initialize();


