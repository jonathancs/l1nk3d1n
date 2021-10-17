const fs = require("fs");
const path = require("path");
const {first} = require("cheerio/lib/api/traversing");
const {moveMessagePortToContext} = require("worker_threads");
const folderToBeScrapped = "./zprofiles/1english";
const selectedFolder = "./selectedFolder/";

profilesToBeMoved = [



];

async function initialize() {
    // this will loop the list of profiles to be scraped
    for (i = 0; i < profilesToBeMoved.length; i++) {
        loopedProfile = profilesToBeMoved[i];

        try {moveToSelectedFolder()} catch (error) {1+1}

        // this is the code to change the folder's directory
        async function moveToSelectedFolder() {
            const currentPath = path.join(__dirname, folderToBeScrapped, loopedProfile);
            const destinationPath = path.join(__dirname, selectedFolder, loopedProfile);
            fs.rename(currentPath, destinationPath, function (err) {
                if (err) {
                    1 + 1;
                    // throw err;
                } else {
                    // console.log("Successfully moved the file!"); // unit testing
                }
            });
        }
    }
}

initialize();
