import { query, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { deletebyid } from '../services/logs.service';
import { deletebylogin } from '../services/logs.service';
import { createlog } from '../services/logs.service';


async function getAll(req: Request, res:Response){
    const QueryResult = await prisma.logs.findMany();

    res.json(QueryResult)
}

async function getByLogin(req: Request, res:Response){
    const { id } = req.params;
    const QueryResult = await prisma.logs.findMany({where: {login:id}});
    res.json(QueryResult)
}
async function deleteById(req: Request, res:Response){
    await deletebyid(req,res)

}
async function deleteByLogin(req: Request, res:Response){
    await deletebylogin(req,res)
}
async function createLog(req: Request, res:Response){
    await createlog(req,res)
}
export {getAll,getByLogin, deleteById,deleteByLogin,createLog};