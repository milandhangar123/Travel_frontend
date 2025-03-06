import { DateSelector } from "../DateSelector/DataSelector";
import "./SearchStayWithDate.css";
import { useCategory, useDate } from "../../context";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const SearchStayWithDate = () => {
  const [hotels, setHotels] = useState([]);
  const { destination, guests, isSearchResultOpen, dateDispatch } = useDate();
  const { hotelCategory } = useCategory();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const { data } = await axios.get(
          `https://travel-backend-vy68.onrender.com/api/hotels?category=${hotelCategory}`
        );

        if (isMounted) setHotels(data);
      } catch (err) {
        console.error("Error fetching hotels:", err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [hotelCategory]);

  const handleDestinationChange = (event) => {
    dateDispatch({ type: "DESTINATION", payload: event.target.value });
  };

  const handleGuestChange = (event) => {
    dateDispatch({ type: "GUEST", payload: event.target.value });
  };

  const handleSearchResultClick = (address) => {
    dateDispatch({ type: "DESTINATION", payload: address });
  };

  const handleDestinationFocus = () => {
    dateDispatch({ type: "SHOW_SEARCH_RESULT" });
  };

  const handleSearchButtonClick = () => {
    dateDispatch({
      type: "CLOSE_SEARCH_MODAL",
    });
    navigate("/hotels/${destination}");
  };

  const destinationOptions = hotels?.filter(
    ({ address, city, state, country }) =>
      [address, city, state, country].some((field) =>
        field.toLowerCase().includes(destination.toLowerCase())
      )
  );

  return (
    <div className="destination-container">
      <div className="destination-options d-flex align-center absolute">
        <div className="location-container">
          <label className="label">Where</label>
          <input
            value={destination}
            onChange={handleDestinationChange}
            onFocus={handleDestinationFocus}
            className="input search-dest"
            placeholder="Search Destination"
            autoFocus
          />
        </div>
        <div className="location-container">
          <label className="label">Check in</label>
          <DateSelector checkInType="in" />
        </div>
        <div className="location-container">
          <label className="label">Check out</label>
          <DateSelector checkInType="out" />
        </div>
        <div className="location-container">
          <label className="label">No. of Guests</label>
          <input
            type="number"
            value={guests}
            className="input search-dest"
            placeholder="Add Guests"
            onChange={handleGuestChange}
          />
        </div>
        <div
          className="search-container d-flex align-center cursor"
          onClick={handleSearchButtonClick}
        >
          <span className="material-symbols-outlined">Search</span>
          <span>Search</span>
        </div>
      </div>
      {isSearchResultOpen && (
        <div className="search-result-container absolute">
          {destinationOptions?.map(({ address, city }, index) => (
            <p
              key={index}
              className="p cursor-pointer"
              onClick={() => handleSearchResultClick(address)}
            >
              {address}, {city}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};
