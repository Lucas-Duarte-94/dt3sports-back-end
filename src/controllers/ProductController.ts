import { Request, Response } from "express";
import qs from "qs";
import { Product } from "../models/chair";

async function urlByChairColor(chairName: string, colorName: string) {
    try {
        const chair = await Product.findAll({
            where: {
                chair_name: chairName,
                color_name: colorName
            },
            attributes: ['url']
        })
    
        let parsedResult = chair.map(res => res.url)
        return parsedResult;
        
    }catch(err) {
        console.log(err)
    }
}

export const addProduct = async (req: Request, res: Response) => {
    const { chair, color, image } = qs.parse(req.body)

    try {
        const result = await Product.findOrCreate({
            where: {
                chair_name: chair,
                color_name: color,
                url: image
            }
        })
        
        if(result[1]) {
            return res.sendStatus(201);
        }
    
        return res.json({message: "Cadeira já existente no banco de dados"})
    }catch (err) {
        res.json({ error: "Não foi possivel criar o registro no banco de dados" })
    }
}

export const getImages = async (req: Request, res: Response) => {
    try {
        const { chairName } = req.query;
        if (typeof chairName === 'string') {
            
            const productEachColor = await Product.findAll({
                where: {
                    chair_name: chairName
                },
                attributes: ['color_name'],
                group: 'color_name'
            })
    
            const colors = productEachColor.map(color => color.color_name)
    
            let chairInfos = await Promise.all(colors.map(async color => {
                let urls = await urlByChairColor(chairName, color)
    
                let info = {
                    color,
                    available: true,
                    urls 
                }
    
                return info
            }))
    
            res.json(chairInfos)
        }else {
            res.sendStatus(400)
        }

    }catch (err) {
        console.log(err)
    }

    // Para testar sem o banco de dados comente o código acima e utilize o código abaixo.

    // const chairInfos = [
    //     {
    //         "color": "black",
    //         "available": true,
    //         "urls": [
    //             "http://localhost:4000/media/rhino/black/Rhino-black2.png",
    //             "http://localhost:4000/media/rhino/black/Rhino-black1.jpg",
    //             "http://localhost:4000/media/rhino/black/Rhino-black5.jpg",
    //             "http://localhost:4000/media/rhino/black/Rhino-black9.jpg",
    //             "http://localhost:4000/media/rhino/black/Rhino-3-12.jpg",
    //             "http://localhost:4000/media/rhino/black/Rhino-12-12.jpg",
    //             "http://localhost:4000/media/rhino/black/Rhino-13-12.jpg",
    //             "http://localhost:4000/media/rhino/black/Rhino-15-12.jpg",
    //             "http://localhost:4000/media/rhino/black/Cotas-DT3sports-Rhino.jpg"
    //         ]
    //     },
    //     {
    //         "color": "blue",
    //         "available": true,
    //         "urls": [
    //             "http://localhost:4000/media/rhino/blue/Rhino-blue2.png",
    //             "http://localhost:4000/media/rhino/blue/Rhino-blue1.jpg",
    //             "http://localhost:4000/media/rhino/blue/Rhino-blue5.jpg",
    //             "http://localhost:4000/media/rhino/blue/Rhino-blue9.jpg",
    //             "http://localhost:4000/media/rhino/blue/Rhino-3-13.jpg",
    //             "http://localhost:4000/media/rhino/blue/Rhino-12-13.jpg",
    //             "http://localhost:4000/media/rhino/blue/Rhino-13-13.jpg",
    //             "http://localhost:4000/media/rhino/blue/Rhino-15-13.jpg",
    //             "http://localhost:4000/media/rhino/blue/Cotas-DT3sports-Rhino.jpg"
    //         ]
    //     },
    //     {
    //         "color": "green",
    //         "available": true,
    //         "urls": [
    //             "http://localhost:4000/media/rhino/green/Rhino-green2.png",
    //             "http://localhost:4000/media/rhino/green/Rhino-green1.jpg",
    //             "http://localhost:4000/media/rhino/green/Rhino-green5.jpg",
    //             "http://localhost:4000/media/rhino/green/Rhino-green9.jpg",
    //             "http://localhost:4000/media/rhino/green/Rhino-3-10.jpg",
    //             "http://localhost:4000/media/rhino/green/Rhino-12-10.jpg",
    //             "http://localhost:4000/media/rhino/green/Rhino-13-10.jpg",
    //             "http://localhost:4000/media/rhino/green/Rhino-15-10.jpg",
    //             "http://localhost:4000/media/rhino/green/Cotas-DT3sports-Rhino.jpg"
    //         ]
    //     },
    //     {
    //         "color": "orange",
    //         "available": true,
    //         "urls": [
    //             "http://localhost:4000/media/rhino/orange/Rhino-2-15.png",
    //             "http://localhost:4000/media/rhino/orange/Rhino-1-14.jpg",
    //             "http://localhost:4000/media/rhino/orange/Rhino-5-14.jpg",
    //             "http://localhost:4000/media/rhino/orange/Rhino-9-14.jpg",
    //             "http://localhost:4000/media/rhino/orange/Rhino-3-7.jpg",
    //             "http://localhost:4000/media/rhino/orange/Rhino-12-7.jpg",
    //             "http://localhost:4000/media/rhino/orange/Rhino-13-7.jpg",
    //             "http://localhost:4000/media/rhino/orange/Rhino-15-7.jpg",
    //             "http://localhost:4000/media/rhino/orange/Cotas-DT3sports-Rhino.jpg"
    //         ]
    //     },
    //     {
    //         "color": "red",
    //         "available": true,
    //         "urls": [
    //             "http://localhost:4000/media/rhino/red/Rhino-red2.png",
    //             "http://localhost:4000/media/rhino/red/Rhino-red1.jpg",
    //             "http://localhost:4000/media/rhino/red/Rhino-red5.jpg",
    //             "http://localhost:4000/media/rhino/red/Rhino-red9.jpg",
    //             "http://localhost:4000/media/rhino/red/Rhino-3-11.jpg",
    //             "http://localhost:4000/media/rhino/red/Rhino-12-11.jpg",
    //             "http://localhost:4000/media/rhino/red/Rhino-13-11.jpg",
    //             "http://localhost:4000/media/rhino/red/Rhino-15-11.jpg",
    //             "http://localhost:4000/media/rhino/red/Cotas-DT3sports-Rhino.jpg"
    //         ]
    //     },
    //     {
    //         "color": "white",
    //         "available": true,
    //         "urls": [
    //             "http://localhost:4000/media/rhino/white/Rhino-white2.png",
    //             "http://localhost:4000/media/rhino/white/Rhino-white1.jpg",
    //             "http://localhost:4000/media/rhino/white/Rhino-white5.jpg",
    //             "http://localhost:4000/media/rhino/white/Rhino-white9.jpg",
    //             "http://localhost:4000/media/rhino/white/Rhino-3-9.jpg",
    //             "http://localhost:4000/media/rhino/white/Rhino-12-9.jpg",
    //             "http://localhost:4000/media/rhino/white/Rhino-13-9.jpg",
    //             "http://localhost:4000/media/rhino/white/Rhino-15-9.jpg",
    //             "http://localhost:4000/media/rhino/white/Cotas-DT3sports-Rhino.jpg"
    //         ]
    //     }
    // ]

    // res.json(chairInfos)
    
}

export const getPrice = (req: Request, res: Response) => {
    let price = 3359.0

    res.json(price)
}