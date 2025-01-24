import express  from "express";
import db from "@repo/db/client"

const app=express()

app.use(express.json());

app.post('/hdfcbank-handiler',async(req,res)=> {
   //pending Zod validation
   interface PaymentInfo {
      token: string;
      id: number;
      amount: number;
  }
   const paymentInformation :PaymentInfo={
      token:req.body.token,
      id:req.body.id,
      amount:req.body.amount
   }
   try{
      await db.$transaction([
          db.balance.update({
            where:{
               userId:paymentInformation.id
            },
            data:{
               amount:{
                  increment:paymentInformation.amount
               }
            }
         }),
          db.onRampTransaction.update({
            where:{
               token:paymentInformation.token,
            },
            data:{
               status:'Success'
            }
         })
      ]
   )
   res.status(200).json({
      message : "captured"
   })
   }catch(e){
      res.status(411).json({
         message : "un-captured"
      })
      db.onRampTransaction.update({
         where:{
            token:paymentInformation.token,
         },
         data:{
            status:'Failure'
         }
      })
      throw e
   }
})

app.get('/',(req,res)=> {
   res.json({
      message:"am hear.."
   })
})


app.listen(3002,()=> {
   console.log(`bank-webhook is running in port 3002`)
})