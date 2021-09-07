const fs = require('fs').promises;
const puppeteer = require('puppeteer')
testFolder = './toBeScrapped'
profilesToBeScraped = []
// keyboard keys map: https://github.com/puppeteer/puppeteer/blob/main/src/common/USKeyboardLayout.ts


errorCounter = 0

async function uploadCVs() {

	/*===== necessary configs to launch the application =====*/

	let browser = await puppeteer.launch({ headless: false, defaultViewport: null, args: ['--start-maximized'] })
	let page = await browser.newPage()

	/*====== adjust scree size ======*/
	// await greaterMonitorView()
	await mediumMonitorView()
	// await notebookSizeView()


	/*==== function-calls to be done ====*/

	await standardConfigurations()

	await scrapeProfiles()
	
	
	
	/*==== End of the calls ====*/
	
	/*==== below is the base script ====*/
	
	
	
	/*==== operative functions ====*/
	
	async function scrapeProfiles() {
		
		
		await openProfiles()
		
		await xx()
		await zz()
		
		// documentation
		

		async function openProfiles() {

			for (let i = 0; i < profilesToBeScraped.length; i++) {
				const loopedProfile = profilesToBeScraped[i]
				
				await page.goto(`file://D:/docs/git/l1nk3d1n/toBeScrapped/${loopedProfile}`, { waitUntil: 'networkidle0' })
				
			}

		}

		async function xx() {console.log("isso deveria ter acontecido antes")}
		async function zz() {console.log(profilesToBeScraped)}
		
		
		
		
	}
	
	
	
	
	/*========== standard utility functions ==========*/
	
	async function standardConfigurations() {

		await saveAllFilesToArray()
		
		startTimeMarker = Date.now()
		await page.setDefaultNavigationTimeout(0)
		
		async function saveAllFilesToArray() {

			fs.readdir(testFolder, (err, files) => {
				files.forEach((file) => {
					profilesToBeScraped.push(file);
					console.log(file); // unit testing
				});
			})
		}
	}

	async function timerStart() {
		
		startTimeMarker = Date.now()

	}

	async function timerStop() {
		
		endingTimeMarker = Date.now()
		await console.log(`loop ${i} executed in`, Math.ceil(((endingTimeMarker - startTimeMarker) / 1000) / 60) + ' minutes' + '\n')

	}

	async function waitOneSecond() {

		const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
		const element = async () => {
			await sleep(1000)

		}

		await element()

	}

	async function waitTwoSeconds() {
		await waitOneSecond()
		await waitOneSecond()
	}

	async function waitThreeSeconds() {
		await waitOneSecond()
		await waitOneSecond()
		await waitOneSecond()
	}

	async function greaterMonitorView() {
		await page.setViewport({ width: 1880, height: 920, deviceScaleFactor: 1, })

	}

	async function mediumMonitorView() {
		await page.setViewport({ width: 1300, height: 650, deviceScaleFactor: 1, })

	}

	async function notebookSizeView() {
		await page.setViewport({ width: 1240, height: 650, deviceScaleFactor: 1, })

	}

	async function close() {
		const endingTimeMarker = Date.now()
		await console.log('whole application executed in', Math.ceil(((endingTimeMarker - startTimeMarker) / 1000) / 60) + ' minutes' + '\n')

		await browser.close()
	}

}

uploadCVs()