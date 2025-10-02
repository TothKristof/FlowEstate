import React from 'react'
import { useState } from 'react';

function AiChat() {
    const [propertyDeatilsText, setPropertyDeatilsText] = useState<string>('');
    
    const handleSearch = () => {
        console.log(propertyDeatilsText);
    }
  return (
    <div className="flex flex-col items-between justify-between h-70 w-70 bg-white absolute bottom-1 right-17 rounded-lg p-2 border-2 border-success">
        <h5 className=' text-2xl font-bold'>Tell us what type of property you are looking for</h5>
        <div className='flex flex-col items-center justify-center'>
            <textarea value={propertyDeatilsText} onChange={(e) => setPropertyDeatilsText(e.target.value)} maxLength={300} placeholder='Property details' className='textarea w-full h-20 resize-none' />
        </div>
        <button className='btn btn-success rounded-full' onClick={handleSearch}>Search</button>
    </div>
  )
}

export default AiChat