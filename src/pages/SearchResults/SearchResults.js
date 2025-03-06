import { useEffect, useState } from "react";
import axios from "axios";
import { HotelCard, Navbar } from "../../components";
import { useDate, useCategory } from "../../context";


export const SearchResults = () => {
  const { destination } = useDate();
  const { hotelCategory } = useCategory();
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    let isMounted = true; // Prevent state update if component unmounts

    (async () => {
      try {
        const { data } = await axios.get(
          `https://travel-backend-vy68.onrender.com/api/hotels?destination=${destination}`
        );

        if (isMounted) setHotels(data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      }
    })();

    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [destination]);

  // Ensure hotels is an array before filtering
  const filteredSearchResults = hotels?.filter(({ city, address, state }) =>
    [address, city, state].some((field) =>
      field?.toLowerCase().includes(destination?.toLowerCase())
    )
  );

  return (
    <>
      <Navbar />
      <section className="main d-flex align-center gap-larger">
        {filteredSearchResults.length > 0 ? (
          filteredSearchResults.map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))
        ) : (
          <h3>Nothing Found</h3>
        )}
      </section>
    </>
  );
};
