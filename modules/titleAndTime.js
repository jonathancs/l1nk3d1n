const cheerio = require("cheerio");
const { first } = require("cheerio/lib/api/traversing");
const fs = require("fs");
const path = require("path");
const { moveMessagePortToContext } = require("worker_threads");
const folderToBeScrapped = "./zprofiles/1english/node/";
const techFolder = "./techFolder/";
profileToBeScraped = 'D:/Users/jonat/git/l1nk3d1n/zprofiles/1english/(1) ☕ Everton (Tom) Costa _ LinkedIn.html';

fs.readFile(profileToBeScraped, "utf8", (err, html) => {
    if (err) {
        console.error(err);
        return;
    }

    let $ = cheerio.load(html);
    let wholeHTML = $("body").text();

    let allExperiences = $('li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view')

    for (let i = 0; i < allExperiences.length; i++) {

        // access exp title's text
        let allExperiencesTitle = allExperiences.eq(i).children().children().children().children().children().eq(1).children().eq(0).text()

        // access exp total time
        let allExperienceTotalTime = allExperiences.eq(i).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

        fs.appendFile('./output.txt', allExperienceTotalTime + '\n', function (error) { if (error) {console.log(error)} })

    }

});