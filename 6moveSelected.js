const fs = require("fs");
const path = require("path");
const {first} = require("cheerio/lib/api/traversing");
const {moveMessagePortToContext} = require("worker_threads");
const folderToBeScrapped = "./toBeScrapped/a/";
const selectedFolder = "./selectedFolder/";

profilesToBeScraped = [

      
];

async function initialize() {
    // this will loop the list of profiles to be scraped
    for (i = 0; i < profilesToBeScraped.length; i++) {
        currentProfile = profilesToBeScraped[i];

        moveToSelectedFolder()

        // this is the code to change the folder's directory
        async function moveToSelectedFolder() {
            const currentPath = path.join(__dirname, folderToBeScrapped, currentProfile);
            const destinationPath = path.join(__dirname, selectedFolder, currentProfile);
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
}

initialize();
