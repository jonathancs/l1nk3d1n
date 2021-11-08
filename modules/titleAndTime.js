const cheerio = require("cheerio");
const { first } = require("cheerio/lib/api/traversing");
const fs = require("fs");
const path = require("path");
const { moveMessagePortToContext } = require("worker_threads");
const folderToBeScrapped = "./zprofiles/1english/node/";
const techFolder = "./techFolder/";
profileToBeScraped = 'D:/Users/jonat/git/l1nk3d1n/zprofiles/1english/(2) Fabiana Viana _ LinkedIn.html';

fs.readFile(profileToBeScraped, "utf8", (err, html) => {
    if (err) {
        console.error(err);
        return;
    }

    let $ = cheerio.load(html);
    let wholeHTML = $("body").text();

    let experiencesList = $('li.pv-entity__position-group-pager.pv-profile-section__list-item.ember-view')

    // get title and time for all grouped experiences first
    // try { let groupedExperiencesList = $('pv-entity__position-group-role-item') } catch (error) { console.log(error) }

    for (let i = 0; i < experiencesList.length; i++) {
        let loopedExperienceText = experiencesList[i]
        console.log(loopedExperienceText)

            // access exp title's text
            let loopedExperienceTitle = experiencesList.eq(i).children().children().children().children().children().eq(1).children().eq(0).text()
 
            // access exp total time
            let loopedExperiencesTotalTime = experiencesList.eq(i).children().children().children().children().children().eq(1).children().children().children().eq(3).text()

            fs.appendFile('./log.txt', loopedExperienceTitle + '\n', function (error) { if (error) { console.log(error) } })
            fs.appendFile('./log.txt', loopedExperiencesTotalTime + '\n', function (error) { if (error) { console.log(error) } })
            fs.appendFile('./log.txt', '\n\n', function (error) { if (error) { console.log(error) } })
            
            
    }

});