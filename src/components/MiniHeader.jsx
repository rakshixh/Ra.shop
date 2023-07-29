import React from 'react'
import MiniHeaderCSS from '../css/miniheader.module.css'

function MiniHeader() {
  return (
    <>
    <div className={MiniHeaderCSS.smallBanner}>
      <p className={MiniHeaderCSS.ptag}>Free shipping world wide on orders above Rs.2479/- 🤑💰</p>
    </div>
    </>
  )
}

export default MiniHeader
