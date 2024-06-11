import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export function GET (req:MedusaRequest,res:MedusaResponse){
    let hostname = req.hostname;
    let baseurl = req.baseUrl;
    let headers = req.headers["access-control-allow-credentials"]?.toString();
    let originalUrl = req.originalUrl;
    let url = req.url;
    let urlpath = req.path;
    let id = req.path.split('/')[3]
    return res.json({
        hostname,baseurl,headers,originalUrl,url,urlpath, id
    })
}