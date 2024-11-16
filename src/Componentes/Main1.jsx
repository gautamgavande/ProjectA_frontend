import React from 'react'
import Chart1 from './Chart1'
import Piech from './Piech'
import BarCharti from './BarCharti'

function Main1() {
  return (
    <div style={{display:"flex",flexWrap:"wrap"}}>
        <div style={{width:"65%"}}><BarCharti></BarCharti></div>
        <div style={{width:"33%",height:"80%"}}><Piech></Piech></div>
    </div>
  )
}

export default Main1