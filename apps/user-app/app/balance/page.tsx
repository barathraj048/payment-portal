'use client'
import React from 'react'
import { useBalance } from '@repo/store/useBalance'

function Balance() {
   const balance =useBalance()
  return (
    <div>
      hi this is balance {balance}
    </div>
  )
}

export default Balance
