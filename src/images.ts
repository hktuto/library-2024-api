import {strapiUrl, strapiUrlUpload} from "../utils/helper";
import * as path from "path";
import * as fs from "fs";

export const uploadImage = async(fileName?:string) => {
    if(!fileName) {
        return {
            "id": 83,
            "name": "banner-100.png",
            "alternativeText": null,
            "caption": null,
            "width": 1092,
            "height": 583,
            "formats": {
                "xs": {
                    "ext": ".png",
                    "url": "https://lib-fest-spaces.sgp1.digitaloceanspaces.com/b781a5988c51cf9f0032a4df2052964e.png",
                    "hash": "b781a5988c51cf9f0032a4df2052964e",
                    "mime": "image/png",
                    "name": "xs_banner-100.png",
                    "path": null,
                    "size": 20.6,
                    "width": 256,
                    "height": 137,
                    "sizeInBytes": 20604
                },
                "large": {
                    "ext": ".png",
                    "url": "https://lib-fest-spaces.sgp1.digitaloceanspaces.com/3db391d2fdda6bf0e3870df20553ede7.png",
                    "hash": "3db391d2fdda6bf0e3870df20553ede7",
                    "mime": "image/png",
                    "name": "large_banner-100.png",
                    "path": null,
                    "size": 174.07,
                    "width": 1000,
                    "height": 534,
                    "sizeInBytes": 174067
                },
                "small": {
                    "ext": ".png",
                    "url": "https://lib-fest-spaces.sgp1.digitaloceanspaces.com/58850cd5d800f3b7ec36443596bf5459.png",
                    "hash": "58850cd5d800f3b7ec36443596bf5459",
                    "mime": "image/png",
                    "name": "small_banner-100.png",
                    "path": null,
                    "size": 56.98,
                    "width": 500,
                    "height": 267,
                    "sizeInBytes": 56983
                },
                "medium": {
                    "ext": ".png",
                    "url": "https://lib-fest-spaces.sgp1.digitaloceanspaces.com/d5a75689286a11acb816baae0d332d39.png",
                    "hash": "d5a75689286a11acb816baae0d332d39",
                    "mime": "image/png",
                    "name": "medium_banner-100.png",
                    "path": null,
                    "size": 111.74,
                    "width": 750,
                    "height": 400,
                    "sizeInBytes": 111735
                },
                "thumbnail": {
                    "ext": ".png",
                    "url": "https://lib-fest-spaces.sgp1.digitaloceanspaces.com/e006d867ed413f272e9267f3b44ff3de.png",
                    "hash": "e006d867ed413f272e9267f3b44ff3de",
                    "mime": "image/png",
                    "name": "thumbnail_banner-100.png",
                    "path": null,
                    "size": 7.54,
                    "width": 128,
                    "height": 68,
                    "sizeInBytes": 7543
                }
            },
            "hash": "31105a765516563e65179c986b8b3472",
            "ext": ".png",
            "mime": "image/png",
            "size": 37.26,
            "url": "https://lib-fest-spaces.sgp1.digitaloceanspaces.com/31105a765516563e65179c986b8b3472.png",
            "previewUrl": null,
            "provider": "strapi-provider-upload-do",
            "provider_metadata": null,
            "folderPath": "/",
            "createdAt": "2024-04-07T03:16:11.353Z",
            "updatedAt": "2024-04-07T03:16:11.353Z",
            "folder": null
        }
    }
    const res:any = await fetch(`${strapiUrl}/upload/files?sort=createdAt:DESC&page=1&pageSize=10&_q=${fileName}`,{
        method:"GET"
    }).then(res => res.json())

    return res[0]
    
    
}