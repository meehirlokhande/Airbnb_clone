
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import axios from "axios";
import BookingWidget from '../BookingWidget';

function PlacePage() {
    const {id} = useParams();
    const [place,setPlace] = useState(null);
    const [showAllPhotos,setShowAllPhotos] = useState(false);
    useEffect(()=>{
      if(!id){
        return;
      }

      axios.get(`/places/${id}`).then(response => {
        setPlace(response.data);
      });

    },[id]);

    if(!place) return "";

    if(showAllPhotos){
      return (
        <div className='fixed inset-0 bg-black min-h-screen overflow-auto'>
            <div className='relative p-8'>
                <h2 className='text-3xl text-white mb-4'>Photos of {place.title}</h2>
                <button onClick={() => setShowAllPhotos(false)} className='rounded-2xl fixed top-4 right-12 flex gap-1 py-2 px-4 shadow shadow-black bg-gray-800 text-white z-50'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Close
                </button>
                <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg'>
                    {place?.photos?.length > 0 && place.photos.map((photo, index) => (
                        <div key={index} className='relative'>
                            <img className='w-full h-auto object-cover rounded-lg aspect-square' src={'http://localhost:4000' + photo} alt="image" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    }
  return (
    <div className='mt-4 py-8 bg-gray-100 -mx-8 px-8'>
      <h1 className='text-3xl'>{place.title}</h1>
      <a className='my-2 block font-semibold underline' target='_blank' href={'https://maps.google.com/?q=' + place.address}>{place.address}</a>
      <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] ">
        <div>
          {place.photos?.[0] &&(
            <div>
              <img onClick={()=> setShowAllPhotos(true)} className=' cursor-pointer w-full h-full aspect-square object-cover rounded-2xl' src={'http://localhost:4000'+place.photos[0]} alt="image" />
            </div>  
          )}
        </div>
        <div className='grid'>
          {place.photos?.[1] &&(
            <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer w-full h-full aspect-square object-cover rounded-2xl' src={'http://localhost:4000'+place.photos[1]} alt="image" />
          )}
          <div className='overflow-hidden'>
          {place.photos?.[2] &&(
            <img onClick={()=> setShowAllPhotos(true)} className='cursor-pointer w-full h-full aspect-square object-cover relative top-2 rounded-2xl' src={'http://localhost:4000'+place.photos[2]} alt="image" />
          )}
          </div>
        </div>
      </div>
      <div>
        <button onClick={() => setShowAllPhotos(true)} className='absolute bottom-2 right-2 py-2 px-2 bg-white rounded-2xl shadow-md shadow-gray-500'>Show more photos</button>
      </div>
      </div>  
      <div className='mt-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]'>
        <div>
        <div className='my-4 '>
        <h2 className='font-semibold text-2xl '>Description</h2>
        {place.description}
        </div>
          Check-in: {place.checkIn} <br/>
          Check-out: {place.checkOut} <br />
          Max number of guest: {place.maxGuests}
        </div>
        <div>
          <BookingWidget place={place}/>
        </div>
        
        <div>
        <h2 className='font-semibold text-2xl '>Extra info</h2>        </div>
      </div>
      <div className='mb-4 mt-1 text-sm text-gray-700 leading-5'>{place.extraInfo}</div>

    </div>
  )
}

export default PlacePage