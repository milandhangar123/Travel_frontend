import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navbar, HotelImages, HotelDetails,FinalPrice } from "../../components";

import "./SingleHotel.css";

export const SingleHotel = () => {
  const { id } = useParams();
  const [singleHotel, setSingleHotel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://travel-backend-vy68.onrender.com/api/hotels/${id}`
        );
        setSingleHotel(data);
      } catch (err) {
        console.log("Error fetching hotel data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) {
    return <p>Loading hotel details...</p>;
  }

  if (!singleHotel) {
    return <p>Hotel not found.</p>;
  }

  return (
    <>
      <Navbar />
      <main className="single-hotel-page">
        <p className="hotel-name-add">{singleHotel.name}, {singleHotel.state}</p>
        <HotelImages singleHotel={singleHotel} />
        <div className="d-flex">
        <HotelDetails singleHotel={singleHotel}/>
        <FinalPrice singleHotel={singleHotel} />
        </div>
      </main>
    </>
  );
};
