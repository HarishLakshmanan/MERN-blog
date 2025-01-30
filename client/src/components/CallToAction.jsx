import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500
    justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
      <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
            Want to learn more about javascript?
        </h2>
        <p className='text-gray-500 my-2'>
            Checkout these resource with 100 JavaScript Projects
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl -bottom-6
        rounded-bl-none'>
            <a href='https://imagify-j6sm.onrender.com/' target='_blank'
            rel='noopener noreferrer'>
              MERN Project
            </a>
        </Button>
      </div>
      <div className='p-7 flex-1'>
        <img src='https://cloud.z.com/vn/wp-content/uploads/2024/01/Screenshot_1-6.png'/>
      </div>
    </div>
  )
}
