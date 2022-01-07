import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import path from 'path';
import cors from 'cors';

dotenv.config();

const server = express();

server.use(cors())

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use(productRoutes);

server.use((req: Request, res: Response) => {
    console.log(req)

    res.status(201)
})

server.listen(process.env.PORT)