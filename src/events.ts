import {uploadImage} from "./images";
import {strapiUrl} from "../utils/helper";

export const createEvents = async (data:EventFromXls[], allDistrict:any[], allCategories:any[]) => {
    
    let temObj :any;
    // loop 所有data
    for(let i =0; i < data.length; i++) {
        // 如果 當前 data 有 title, 那就是新 Event
        if(data[i]['title_HK']) {
            // 如果 temObj 有值
            // 那就是上一個 event 已經有了
            // 那就把它送到後端
            // 把 temObj 清空
            if(temObj){
                // send to backend and remove
                await sendToBackend(temObj)
                temObj = null
            }

            // 如果沒有值
            // 那就創建一個新的 event
            temObj = await newEvent(data[i], allDistrict, allCategories, i)
           
            
            // not new item
        }else{
            // 沒有 title_HK 
            // 那就不是新 Event, 
            // 那就創建一個新的 program
            // 加到 temObj 的 programs
            const p = await newProgram(data[i], allDistrict, allCategories, i)
            temObj.programs.push(p)
            
        }
    }
    // loop 完 temObj 應該還有最後一個 temObj
    // 那就把它送到後端
    if(temObj){
        await sendToBackend(temObj)
        temObj = null
    }
}

const newEvent = async(data:EventFromXls, allDistrict:any[], allCategories:any[], index:number)=> {
    const categoryObj:any = allCategories.find((cat:any) => cat.attributes.name_HK === data.event_categories);
    const event = {
        "categories": {
            "disconnect": [],
            "connect": []
        },
        "title_HK": data.title_HK,
        title_EN: data.title_EN,
        "photos": [
           
        ],
        "content_HK": data.content_HK,
        "content_EN": data.content_EN,
        host_HK: data.host_HK || "",
        host_EN: data.host_EN || "",
        programs:[]
    }
    if(categoryObj) {
        event.categories.connect.push({
            id: categoryObj.id
        })
    }
    if(data.photos) {
        // split all photo 
        const photosName = data.photos.split(',');
        for(let i = 0; i < photosName.length; i++) {
            const img = await uploadImage(photosName[i])
            event.photos.push(img)
        }
    }else{
        const img = await uploadImage()
        event.photos.push(img)
    }
    const p = await newProgram(data, allDistrict, allCategories, index)
    event.programs.push(p)
    return event
}

const newProgram = async(data:EventFromXls, allDistrict:any[], allCategories:any[], index:number) => {
    const districtObj:any = allDistrict.find((dis:any) => dis.attributes.label_HK === data.district);
    const program:any = {
        __temp_key__: index,
        district: {
            "disconnect": [],
            "connect": []
        },
        location_HK: data.location_HK,
        location_EN: data.location_EN,
        displayTime_HK: data.displayTime_HK,
        displayTime_EN: data.displayTime_EN,
        startDate: data.startDate,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
        target_HK: data.event_target_HK,
        target_EN: data.event_target_EN,
        quota_HK: data.quota_HK,
        quota_EN: data.quota_EN,
        register_HK: data.register_HK,
        register_EN: data.register_EN,
        period_HK: data.period_HK,
        period_EN: data.period_EN,
    }
    if(districtObj) {
        program.district.connect.push({
            id: districtObj.id
        })
    }
    if(data.categories) {
        const categoryObj:any = allCategories.find((cat:any) => cat.attributes.name_HK === data.categories);
        
        if(categoryObj) {
            program.categories = [categoryObj.attributes.name];
        }
    }
    return program
}

const sendToBackend = async(data:any)=> {
    console.log("New Event created");
    return await fetch(`${strapiUrl}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data})
    }).then(res => res.json())
}



// type
type EventFromXls = {
    title_HK?:string,
    content_HK?:string,
    host_HK?:string,
    event_target_HK?:string,
    event_remark_HK?:string,
    photos?:string,
    title_EN?:string,
    content_EN?:string,
    host_EN?:string,
    event_target_EN?:string,
    event_remark_EN?:string,
    event_categories?:string,
    District_HK?:string,
    district?:string,
    startDate?:string,
    endDate?:string,
    startTime?:string,
    endTime?:string,
    displayTime_HK?:string,
    location_HK?:string,
    register_HK?:string,
    period_HK?:string,
    quota_HK?:string,
    target_HK?:string,
    displayTime_EN?:string,
    location_EN?:string,
    register_EN?:string,
    period_EN?:string,
    quota_EN?:string,
    target_EN?:string,
    categories?:string,
}

