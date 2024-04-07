import {strapiUrl} from "../utils/helper";
import {uploadImage} from "./images";

export const getCategory = async(data:any, create?:boolean) => {
    if(!create){
        console.log("Get category from strapi");
        const res= await fetch(`${strapiUrl}/categories?populate=%2A&sort=order&pagination[limit]=100`);
        const json:any = await res.json();
        return json.data
    }
    const allCategory:any = []
    for(let i = 0; i < data.length; i++) {
        const body: any = {
            data: {
                name_HK: data[i].name_HK,
                name_EN: data[i].name_EN,
                name: data[i].name,
                order: i,
                color: data[i].color || null,
                externalURL: data[i].externalURL || null,
                showFeatureImage: false,
                showInHome: data[i].showInHome ? true : false,
                show_programs: data[i].show_programs ? true : false
            }
        }
        // check need to upload image
        const img: any = await uploadImage(data[i].feature)
        body.data.feature = img

        // console.log(body)
        const res = await fetch(`${strapiUrl}/categories`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(res => res.json())
        allCategory.push(res.data)
    }
    return allCategory
    // const res= await fetch(`${strapiUrl}/categories?populate=%2A&sort=order&pagination[limit]=100`);
    // const json:any = await res.json();
    // return json.data
}