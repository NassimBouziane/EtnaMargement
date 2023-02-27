import { query, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { statlogs_bylogin, insertintologs_service, deletebylogin, createlog, serviceStatLogsByDate } from '../services/logs.service';

async function getAll(req: Request, res:Response){
    const QueryResult = await prisma.logs.findMany();

    res.json(QueryResult)
}
async function getByDate(req:Request, res:Response){
    const date= req.params.date;
    const login = req.params.login
    const QueryResult = await prisma.logs.findMany({ where: {date:date, login:login}})
    res.json(QueryResult)
    
}

async function updateLogs(req:Request, res:Response){
    const id = Number(req.params.id)
    const body = req.body.body
    const QueryResult = await prisma.logs.update({ where: {id:id}, data:body})
}

async function getByLogin(req: Request, res:Response){
    const { id } = req.params;
    const QueryResult = await prisma.logs.findMany({where: {login:id}});
    res.json(QueryResult)
}
// async function deleteById(req: Request, res:Response){
//     await deletebyid(req,res)

// }
async function deleteByLogin(req: Request, res:Response){
    await deletebylogin(req,res)
}
async function createLog(req: Request, res:Response){
    await createlog(req,res)
}
async function getstats(req:Request, res:Response){
    await statlogs_bylogin(req,res)
}
async function insertintologs(req:Request, res:Response){
    await insertintologs_service(req,res)
}
async function statLogsByDate(req:Request, res:Response){
    await serviceStatLogsByDate(req,res)
}

export {getAll,getByLogin,deleteByLogin,createLog, getstats, insertintologs,getByDate, statLogsByDate, updateLogs};