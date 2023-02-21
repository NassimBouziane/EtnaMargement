import { query, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



async function getAll(req: Request, res:Response){
    const QueryResult = await prisma.logs.findMany();

    res.json(QueryResult)
}

async function getByLogin(req: Request, res:Response){
    const { id } = req.params;
    const QueryResult = await prisma.logs.findMany({where: {login:id}});
    res.json(QueryResult)
}


export {getAll,getByLogin};