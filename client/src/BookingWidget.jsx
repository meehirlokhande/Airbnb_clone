import React, { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns';
function BookingWidget({place}) {
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [numberOfGuests,setNumberOfGuests] = useState(1);
    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
    }
  return (
    <div className='bg-white shadow p-4 rounded-2xl'>
            <div className='text-2xl text-center mb-2'>
            Price: ${place.price} / per night
            </div> 
            <div className='border rounded-2xl'>
              <div className="flex">
                  <div className=' py-4 px-4 '>
                  <label>Check in:</label>
                  <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)}/>
                </div>
                <div className=' py-4 px-4  border-l'>
                  <label>Check out:</label>
                  <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                </div>
                <div> 
                </div>
                
              </div>
              <div className=' py-4 px-4  border-l'>
                  <label>Number of guests:</label>
                  <input type="Number"  value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
            </div>
            <button className='primary mt-4'>
                Book this place
                {numberOfNights > 0  && (
                    <span> ${numberOfNights * place.price}</span>
                )}
            </button>
            
          </div>
  )
}

export default BookingWidget