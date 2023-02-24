import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { count } from 'console';
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

async function insertintologs_service(req:Request,res:Response){
  try{
  const QueryResult = await prisma.$queryRaw`SELECT * FROM Logs`
  if(QueryResult){
    console.log(QueryResult)
    res.status(300).json(QueryResult)
}
else{
    res.status(404).json('Wrong data sent')
}
  }
  catch(e){
    res.json(e)
  }



}
async function statlogs_bylogin(req:Request, res:Response){
  const { login } = req.params;
  
  const absentCount = await prisma.logs.groupBy({
    where: {
      login: login,
      OR: [
        { morning: "Absent" },
        { afternoon: "Absent" }
      ]
    },
    by: ['morning', 'afternoon'],
    _count: true
  });
  let countAbsent = 0;
  let countRetard = 0;


  absentCount.forEach((item) => {
    if (item.morning === 'Absent') {
      countAbsent += item._count;
    }
  
    if (item.afternoon === 'Absent') {
      countAbsent += item._count;
    }
    if (item.morning === 'Retard') {
      countRetard += item._count;
    }
  
    if (item.afternoon === 'Retard') {
      countRetard += item._count;
    }
  });
  
  


  
  if (countAbsent >= 0 && countRetard >= 0) {
    res.json({
      Absent: countAbsent.toString(),
      Retard: countRetard.toString()
    });
  } else {
    res.json("Wrong login");
  }
}


export { deletebyid,deletebylogin,createlog,statlogs_bylogin, insertintologs_service }