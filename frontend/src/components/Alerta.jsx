import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className={`${ alerta.error ?'bg-red-600 mb-5': 'bg-indigo-600 mb-5'} rounded-lg py-2 uppercase text-sm font-semibold `}>
        {alerta.msg}
    </div>
  )
}

export default Alerta