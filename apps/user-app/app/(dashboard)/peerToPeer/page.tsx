'use client'
import { Button } from '@repo/ui/button'
import { TextInput } from '@repo/ui/TextInput'
import React, { useState } from 'react'
import { P2pTrans } from '../../lib/actions/p2pTrans'

export default function PeerToPeer() {
   const [number,setNumber]=useState<string>('')
   const [amount,setAmount]=useState<number>(0)
  return (
   <div className='flex items-center justify-center mx-auto '>
      <div className='bg-white p-4 py-2 border-b-1 rounded'>
         <p className='font-semibold my-2 text-xl'>Send Money To Users</p>

         <TextInput placeholder='Number' label='Number' onChange={(value => setNumber(value ) )}/>
         <TextInput placeholder='Amount' label='Amount' onChange={(value => setAmount(Number(value) ) )}/>
         <div className='flex items-center justify-center my-auto mt-4 mb-6'>
            <Button onClick={async()=> {
               await P2pTrans({number,amount})
            }} className='bg-black text-white px-4 py-1 rounded-lg hover:bg-slate-100 hover:text-black '>Send</Button>
         </div>
      </div>
   </div>
  )
}
