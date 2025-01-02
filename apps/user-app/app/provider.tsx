'use client'
import React from 'react'
import { RecoilRoot } from 'recoil'

function Provider({ children }:{
   children:React.ReactNode
}) {
  return ( <RecoilRoot>
   {children}
  </RecoilRoot>

  )
}

export default Provider
