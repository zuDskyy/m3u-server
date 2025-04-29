import React from 'react'

function CustomInput({label,...props}) {
  return (
    <div style={{width:'100%', display:"flex", justifyContent:"center", gap:'10px'}}>
     <label>{label}</label>
    <input   {...props} >

    </input></div>
  )
}

export default CustomInput