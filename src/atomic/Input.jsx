import React from 'react'

function Input({type, name, value, id ,onChange}) {
  return (
    <div>
        <input type={type} name={name} value={value} id={id} onChange = {handleOnChange} />
    </div>
  )
}

export default Input