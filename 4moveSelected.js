const fs = require("fs");
const path = require("path");
const {first} = require("cheerio/lib/api/traversing");
const {moveMessagePortToContext} = require("worker_threads");

// const folderToBeScrapped = "./zprofiles/1english/";
// const selectedFolder = "./selectedFolder/";

const folderToBeScrapped = "./selectedFolder/eval/";
const selectedFolder = "./selectedFolder/good/";

profilesToBeMoved = [
    'a (509).html',
    '(1) Augusto Kern _ LinkedIn.html',
    '(1) Gustavo Coelho _ LinkedIn.html',
    `(1) Leonardo Maia D'Avila Martins _ LinkedIn.html`,
    '(1) Oggo Petersen _ LinkedIn.html',
    'a (205).html',
    'a (502).html',
    'a (618).html',
    'a (1251).html',
    'a (1915).html',
    'a (1515).html',
    'evdevops (20).html',
    'a (1925).html',
    'a (2875).html',
    'a (3014).html',
    'a (3079).html',
    
];

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
