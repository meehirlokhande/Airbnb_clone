import axios from "axios";
import  { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const IndexPage = () =>{
    const [places,setPlaces] = useState([]);

    useEffect(() =>{
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    },[]);
    return(
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {
            places.length > 0 && places.map((place,index) => (
              <Link to={'/place/'+ place._id} key={index}>
                  <div className="bg-gray-500 mb-2 rounded-2xl flex ">
                    {place.photos?.[0] && (
                      <img className="rounded-2xl object-cover aspect-square " src={'http://localhost:4000'+place.photos[0]} alt="image" />
                    )}
                  </div>
                  <h2 className="font-bold text-sm">{place.address}</h2>
                  <h3 className="text-sm text-gray-500">{place.title}</h3>
                  
                  <div className="mt-1 font-bold"><span>${place.price}</span> per night</div>
              </Link>
            ))
          }
        </div>
    );
};

export default IndexPage;