import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();



async function deletebyid(req: Request, res:Response){
    const {id}  = req.params
    const QueryResult = await prisma.logs.delete({
        where: {
          id: Number(id),
        },
      })

      res.status(200).json('Delete Sucessful')

}
async function deletebylogin(req: Request, res:Response){
    const { login } = req.params
    const QueryResult = await prisma.logs.deleteMany({
        where: {
          login: login,
        },
      })
      if(QueryResult.count >0){
      res.status(200).json(`Deleted Sucessfully : ${QueryResult.count} logs`)}
else{
        res.status(404).json('Logs not Found')}
      
      

}

async function createlog(req:Request,res:Response){
    const body = req.body

    const QueryResult = await prisma.logs.create({data: body})
    if(QueryResult){
        res.status(200).send(QueryResult)
        console.log(new Date(QueryResult.date))
    }
    else{
        res.status(404).send('Wrong data sent')
    }
    
}


export { deletebyid,deletebylogin,createlog }