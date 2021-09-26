const xlsx = require('xlsx');
const path = require('path');
const workSheetName = 'data1';
const filePath = './outputFiles/excel-from-js.xlsx';

const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = xlsx.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = xlsx.utils.aoa_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
}

const exportData1ToExcel = (data1, workSheetColumnNames, workSheetName, filePath) => {
    const data = data1.map(profile => {
        return [
            
            profile.URL,
            profile.dateOfEntry,
            profile.name,
            profile.location,
            profile.title,
            profile.connectionState,
            profile.currentCompany,
            profile.yearsOfExperience,
            profile.xSenior ,
            profile.xNode,
            profile.xJava,
            profile.xNet,
            profile.xGolang,
            profile.xReact,
            profile.xAngular,
            profile.xVue,
            profile.xIos,
            profile.xAndroid,
            profile.xReactNative,
            profile.xFullstack,
            profile.xTest,
            profile.xQuality,
            profile.xAutomation,
            profile.xCypress,
            // profile.firstExperienceTitle,
            // profile.firstExperienceCompany,
            // profile.firstExperienceTime,
            // profile.firstExperienceDescription,
            // profile.secondExperienceTitle,
            // profile.secondExperienceCompany,
            // profile.secondExperienceTime,
            // profile.secondExperienceDescription,
            // profile.thirdExperienceTitle,
            // profile.thirdExperienceCompany,
            // profile.thirdExperienceTime,
            // profile.thirdExperienceDescription,
            // profile.fourthExperienceTitle,
            // profile.fourthExperienceCompany,
            // profile.fourthExperienceTime,
            // profile.fourthExperienceDescription,
            // profile.fifthExperienceTitle,
            // profile.fifthExperienceCompany,
            // profile.fifthExperienceTime,
            // profile.fifthExperienceDescription,
            // profile.sixthExperienceTitle,
            // profile.sixthExperienceCompany,
            // profile.sixthExperienceTime,
            // profile.sixthExperienceDescription,
            // profile.seventhExperienceTitle,
            // profile.seventhExperienceCompany,
            // profile.seventhExperienceTime,
            // profile.seventhExperienceDescription,
            // profile.eigthExperienceTitle,
            // profile.eigthExperienceCompany,
            // profile.eigthExperienceTime,
            // profile.eigthExperienceDescription,
            // profile.ninethExperienceTitle,
            // profile.ninethExperienceCompany,
            // profile.ninethExperienceTime,
            // profile.ninethExperienceDescription

        ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
}

const data1 = [
    
    {
        URL: url,
        dateOfEntry: dateOfEntry,
        name: candidateName,
        location: location,
        title: profileTitle,
        connectionState: connectionState,
        currentCompany: currentCompany,
        yearsOfExperience: yearsOfExperience,
        xSenior : xsenior,
        xNode: xnode,
        xJava: xjava,
        xNet: xnet,
        xGolang: xgolang,
        xReact: xreact,
        xAngular: xangular,
        xVue: xvue,
        xIos: xios,
        xAndroid: xandroid,
        xReactNative: xreactNative,
        xFullstack: xfullstack,
        xTest: xtest,
        xQuality: xquality,
        xAutomation: xautomation,
        xCypress: xcypress,
        // firstExperienceTitle: firstExperienceTitle,
        // firstExperienceCompany: firstExperienceCompany,
        // firstExperienceTime: firstExperienceTime,
        // firstExperienceDescription: firstExperienceDescription,
        // secondExperienceTitle: secondExperienceTitle,
        // secondExperienceCompany: secondExperienceCompany,
        // secondExperienceTime: secondExperienceTime,
        // secondExperienceDescription: secondExperienceDescription,
        // thirdExperienceTitle: thirdExperienceTitle,
        // thirdExperienceCompany: thirdExperienceCompany,
        // thirdExperienceTime: thirdExperienceTime,
        // thirdExperienceDescription: thirdExperienceDescription,
        // fourthExperienceTitle: fourthExperienceTitle,
        // fourthExperienceCompany: fourthExperienceCompany,
        // fourthExperienceTime: fourthExperienceTime,
        // fourthExperienceDescription: fourthExperienceDescription,
        // fifthExperienceTitle: fifthExperienceTitle,
        // fifthExperienceCompany: fifthExperienceCompany,
        // fifthExperienceTime: fifthExperienceTime,
        // fifthExperienceDescription: fifthExperienceDescription,
        // sixthExperienceTitle: sixthExperienceTitle,
        // sixthExperienceCompany: sixthExperienceCompany,
        // sixthExperienceTime: sixthExperienceTime,
        // sixthExperienceDescription: sixthExperienceDescription,
        // seventhExperienceTitle: seventhExperienceTitle,
        // seventhExperienceCompany: seventhExperienceCompany,
        // seventhExperienceTime: seventhExperienceTime,
        // seventhExperienceDescription: seventhExperienceDescription,
        // eigthExperienceTitle: eigthExperienceTitle,
        // eigthExperienceCompany: eigthExperienceCompany,
        // eigthExperienceTime: eigthExperienceTime,
        // eigthExperienceDescription: eigthExperienceDescription,
        // ninethExperienceTitle: ninethExperienceTitle,
        // ninethExperienceCompany: ninethExperienceCompany,
        // ninethExperienceTime: ninethExperienceTime,
        // ninethExperienceDescription: ninethExperienceDescription

    }

];

const workSheetColumnName = [
    'URL',
    'date of entry',
    'name',
    'location',
    'title',
    'connection', // send message, connect, pendant
    'current company',
    'years of experience',

    // number of keywords
    '# senior',  // sr, lead, 
    '# node',
    '# java',
    '# net', // C#
    '# golang', // Go
    '# react',
    '# angular',
    '# vue',
    '# ios',
    '# android',
    '# react native',
    '# fullstack',
    '# test',
    '# quality', // qualidade, qa
    '# automation', // automated, automatization, automação, automatizado
    '# cypress',

    // descriptions
    // '1st experience title',
    // '1st experience company',
    // '1st experience time',
    // '1st experience description',
    
    // '2nd experience title',
    // '2nd experience company',
    // '2nd experience time',
    // '2nd experience description',
    
    // '3rd experience title',
    // '3rd experience company',
    // '3rd experience time',
    // '3rd experience description',
    
    // '4th experience title',
    // '4th experience company',
    // '4th experience time',
    // '4th experience description',
    
    // '5th experience title',
    // '5th experience company',
    // '5th experience time',
    // '5th experience description',
    
    // '6th experience title',
    // '6th experience company',
    // '6th experience time',
    // '6th experience description',
    
    // '7th experience title',
    // '7th experience company',
    // '7th experience time',
    // '7th experience description',
    
    // '8th experience title',
    // '8th experience company',
    // '8th experience time',
    // '8th experience description',
    
    // '9th experience title',
    // '9th experience company',
    // '9th experience time',
    // '9th experience description'

]

exportData1ToExcel(data1, workSheetColumnName, workSheetName, filePath);

