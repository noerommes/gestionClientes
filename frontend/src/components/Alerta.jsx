import React from 'react'

const Alerta = ({alerta}) => {
  return (
    <div className='flex justify-center'>
      <div className={`${ alerta.error ?'bg-red-600 mb-5': 'bg-indigo-600 mb-5'} rounded-lg py-2 uppercase text-xs font-semibold text-white w-full md:w-96`}>
          {alerta.msg}
      </div>
    </div>
  )
}

export default Alerta