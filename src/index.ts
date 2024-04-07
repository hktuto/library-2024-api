
import * as path from 'path';
import * as XLSX from "xlsx";
import {getCategory} from "./category";
import {getDistrict} from "./district";
import {createHalfHour} from "./halfHour";
import {createEvents} from "./events";


async function main() {
    console.log('Start');
    // @ts-ignore
    const docPath = path.join(__dirname, "../source/all-data.xlsx");
    const workbook = XLSX.readFile(docPath);
    const eventJson:any[] = XLSX.utils.sheet_to_json(workbook.Sheets['event'], {raw: false});
    const halfAnHourJson:any[] = XLSX.utils.sheet_to_json(workbook.Sheets['halfAnHour'], {raw: false});
    const districtJson:any[] = XLSX.utils.sheet_to_json(workbook.Sheets['district'], {raw: false});
    const categoryJson:any[] = XLSX.utils.sheet_to_json(workbook.Sheets['category'], {raw: false});

    console.log("create Category")
    const allCategory = await getCategory(categoryJson, true);
    console.log("create District")
    const allDistrict = await getDistrict(districtJson);
    console.log("create Half an hour")
    await createHalfHour(halfAnHourJson, allDistrict);
    console.log("create Event")
    await createEvents(eventJson, allDistrict, allCategory);
    console.log("Finish")
}


main();