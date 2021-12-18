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
const folderToBeScrapped = "./zprofiles/selectedFolder/eval/temp/";
const selectedFolder = "./zprofiles/selectedFolder/eval/temp/";
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

                function closeChatPoPups() {

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

                    let experiencesList = $('li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view')

                    expTitle0 = experiencesList.eq(0).children().children().children().children().children().eq(1).children().eq(0).text()
                    experienceTime_as_String0 = experiencesList.eq(0).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                    expTitle1 = experiencesList.eq(1).children().children().children().children().children().eq(1).children().eq(0).text()
                    experienceTime_as_String1 = experiencesList.eq(1).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                    expTitle2 = experiencesList.eq(2).children().children().children().children().children().eq(1).children().eq(0).text()
                    experienceTime_as_String2 = experiencesList.eq(2).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                    expTitle3 = experiencesList.eq(3).children().children().children().children().children().eq(1).children().eq(0).text()
                    experienceTime_as_String3 = experiencesList.eq(3).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                    expTitle4 = experiencesList.eq(4).children().children().children().children().children().eq(1).children().eq(0).text()
                    experienceTime_as_String4 = experiencesList.eq(4).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                    expTitle5 = experiencesList.eq(5).children().children().children().children().children().eq(1).children().eq(0).text()
                    experienceTime_as_String5 = experiencesList.eq(5).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                    expTitle6 = experiencesList.eq(6).children().children().children().children().children().eq(1).children().eq(0).text()
                    experienceTime_as_String6 = experiencesList.eq(6).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                    expTitle7 = experiencesList.eq(7).children().children().children().children().children().eq(1).children().eq(0).text()
                    experienceTime_as_String7 = experiencesList.eq(7).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

                    expTitle8 = experiencesList.eq(8).children().children().children().children().children().eq(1).children().eq(0).text()
                    experienceTime_as_String8 = experiencesList.eq(8).children().children().children().children().children().eq(1).children().children().children().eq(3).text()
                }

                function convert_experience_time_strings_into_number() {

                    function convert_Exp_Time_String_Into_Number (expTimeString) {

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

                closeChatPoPups()
                getFirstInfos()
                runWordCounters()
                getComposedEXPS_A()
                getComposedEXPS_B()
                removeComposedEXPs()
                getIndividualExperiences()
                convert_experience_time_strings_into_number()

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
                    if (counter > 0) { 1 + 1 } else { expTime = 0 } // i could invalidate the title as well, but i want to know what other titles could i be ignoring
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


