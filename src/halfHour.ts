import {strapiUrl} from "../utils/helper";

export const createHalfHour = async(data:any[], allDistrict:any[], create?:boolean) => {
    if(!create){
        return;
    }
    const allHalfHour:any = []
    for(let i = 0; i < data.length; i++) {
        const district = allDistrict.find((dis:any) => dis.attributes.label_HK === data[i].District);
        
        const body: any = {
            data: {
                StartDate: data[i].StartDate,
                EndDate: data[i].EndDate,
                StartTime: data[i].StartTime,
                EndTime: data[i].EndTime,
                Category: data[i].Category || null,
                DisplayTime_HK: data[i].DisplayTime_HK,
                DisplayTime_EN: data[i].DisplayTime_EN,
                Name_HK: data[i].Name_HK,
                Description_HK: data[i].Description_HK,
                Location_HK: data[i].Location_HK,
                Host_HK: data[i].Host_HK,
                Address_HK: data[i].Address_HK,
                Name_EN: data[i].Name_EN,
                Description_EN: data[i].Description_EN,
                Location_EN: data[i].Location_EN,
                Host_EN: data[i].Host_EN,
                Address_EN: data[i].Address_EN
            }
        }
        if(district) {
            body.data.district = {
                connect: [{
                    id: district.id
                }]
            }
        }
        try{
            
        const res = await fetch(`${strapiUrl}/half-an-hours`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        console.log("New Half an hour :" + i)
        allHalfHour.push(res.data)
        }catch(e) {
            console.log(e)
        }
    }
    return allHalfHour
}