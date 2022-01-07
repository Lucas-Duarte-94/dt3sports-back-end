import { Router, Request, Response } from 'express';
import * as ProductController from '../controllers/ProductController';

const router = Router();

router.get('/ping', (req: Request, res: Response) => {
    return res.json({ status: true })
})

router.post('/register', (req: Request, res: Response) => {
    console.log(req)

    return res.json({ status: true })
})

router.post('/product', ProductController.addChairColorImage)

router.get('/product', ProductController.getImages)
router.get('/price', ProductController.getPrice)

export default router;