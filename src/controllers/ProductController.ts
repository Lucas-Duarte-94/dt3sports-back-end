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

export const addChairColorImage = async (req: Request, res: Response) => {
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
        }

    }catch (err) {
        console.log(err)
    }
    
}

export const getPrice = (req: Request, res: Response) => {
    let price = 3359.0

    res.json(price)
}