// scraper packages
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const {first} = require("cheerio/lib/api/traversing");
const {moveMessagePortToContext} = require("worker_threads");
const folderToBeScrapped = "./toBeScrapped/";
const destinyFolder = "./destinyFolder/";
profilesToBeScraped = [];
urlArray = []
fileArray = []

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

                // obtain URL
                let rawURL = $(".ember-view.link-without-visited-state.cursor-pointer.text-heading-small.inline-block.break-words").attr("href");
                url = rawURL.split("detail")[0];
                urlArray.push(url)
                fileArray.push(currentProfile)

            }

            let duplicates = []
            
            for (let i = 0; i < urlArray.length; i++) {
              if (urlArray[i + 1] === urlArray[i]) {
                // duplicates.push(fileArray[i])
                fs.appendFile('./output.txt', `'` + fileArray[i] + `',` + '\n', function (error) {1+1} )
              }
            }
            
            
        });
    }
}

initialize();