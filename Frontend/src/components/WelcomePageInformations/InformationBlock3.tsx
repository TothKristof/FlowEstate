
function InformationBlock3() {
  return (
    <>
      <div className='flex-col xl:flex flex-row'>
        <div className='flex gap-4 p-4 xl:w-1/2'>
          <div className='w-1/2 bg-stone-200 h- rounded-2xl overflow-hidden'>
            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop" alt="Modern luxury house" className="w-full h-full object-cover" />
          </div>
          <div className='w-1/2 flex flex-col gap-4'>
            <div className='h-1/2 rounded-2xl overflow-hidden'>
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop" alt="Contemporary family house" className="w-full h-full object-cover" />
            </div>
            <div className='h-1/2 rounded-2xl overflow-hidden'>
              <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" alt="Modern residential house" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className='p-8 flex flex-col justify-center xl:w-1/2'>
          <h1 className='text-4xl font-bold mb-6'>Book a Viewing</h1>
          <p className='text-lg text-gray-700 leading-relaxed'>
            Would you like to see your dream home in person? With our flexible scheduling system, you can easily arrange a personal viewing of your chosen property. Our expert colleagues will give you a detailed tour of the property and answer all your questions. Booking an appointment is completely free and comes with no obligations.
          </p>
        </div>
      </div>
    </>
  )
}

export default InformationBlock3