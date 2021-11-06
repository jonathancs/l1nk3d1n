const fs = require("fs");
const path = require("path");
const {first} = require("cheerio/lib/api/traversing");
const {moveMessagePortToContext} = require("worker_threads");
const folderToBeScrapped = "./zprofiles/1english/";
const selectedFolder = "./selectedFolder/";

// const folderToBeScrapped = "./selectedFolder/";
// const selectedFolder = "./selectedFolder/good/";

profilesToBeMoved = [];

async function initialize() {
    // this will loop the list of profiles to be scraped
    for (i = 0; i < profilesToBeMoved.length; i++) {
        loopedProfile = profilesToBeMoved[i];

        await moveToSelectedFolder()

        // this is the code to change the folder's directory
        async function moveToSelectedFolder() {
            const currentPath = path.join(__dirname, folderToBeScrapped, loopedProfile);
            const destinationPath = path.join(__dirname, selectedFolder, loopedProfile);
            fs.rename(currentPath, destinationPath, function (err) {
                1+1
                if (err) {
                    1 + 1;
                    throw err;
                } else {
                    // console.log("Successfully moved the file!"); // unit testing
                }
            });
        }
    }
}

initialize();
