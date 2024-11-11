
import { Link } from "react-router-dom";
import AccountNav from "../AccountNav";
import { useEffect, useState } from "react";
import axios from "axios";

const PlacesPage = () => {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        })
    }, [])

    return (
        <div>
            <AccountNav />

            <div className="text-center">

                <Link to={'/account/places/new'} className="inline-flex bg-primary text-white mb-3 py-2 px-6 rounded-full gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add new place

                </Link>
            </div>

            {places.length > 0 && places.map(place => (
                <Link to={'/account/places/' + place._id} className="flex bg-gray-200 cursor-pointer gap-4 p-4 rounded-2xl mb-2 " key={place._id}>
                    <div className="flex bg-gray-100   w-32 h-32 grow shrink-0 ">
                        {place.photos.length > 0 ? (
                            <img className="object-cover w-full rounded-xl" src={'http://localhost:4000' + place.photos[0]} alt={place.title} onError={(e) => { e.target.onerror = null; e.target.src = 'fallback-image-url'; }} />
                        ) : (
                            <p className="text-center">No photos available</p>
                        )}
                    </div>
                    <div className="grow-0 shrink">
                        <h2 className="text-xl">{place.title}</h2>
                        <p className="text-sm mt-2">{place.description}</p>
                    </div>
                </Link>
            ))}

        </div>
    );
}

export default PlacesPage;