import {strapiUrl} from "../utils/helper";

export const getDistrict = async(data:any, create?:boolean) => {
    if(!create){
        console.log("Get district from strapi");
        const res= await fetch(`${strapiUrl}/districts?populate=%2A&pagination[limit]=100`);
        
        const json:any = await res.json();
        return json.data
    }
    const allDistrict:any = []
    for(let i = 0; i < data.length; i++) {
        const body: any = {
            data: {
                label_EN: data[i].label_EN,
                label_HK: data[i].label_HK,
                main_district: data[i].main_district,
            }
        }
        const res = await fetch(`${strapiUrl}/districts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        allDistrict.push(res.data)
    }
    return allDistrict
}