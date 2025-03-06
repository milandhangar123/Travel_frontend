import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import "./HotelCard.css";
import { useWishlist } from "../../context";
import { findHotelInWishlist } from "../../utils";

export const HotelCard = ({ hotel }) => {
  // Provide default values to prevent errors if `hotel` is undefined or properties are missing
  const { _id, name, image, address, state, rating, price } = hotel; // Use an empty object as a fallback

  const navigate = useNavigate();

  const { wishlistDispatch, wishlist } = useWishlist();

  const {accessToken, authDispatch} = useAuth();

  const handleHotelCardClick = () => {
    navigate(`/hotels/${name}/${address}-${state}/${_id}/reserve`);
  };

  
  const isHotelInWishlist = findHotelInWishlist(wishlist, _id);
 
  const handleWishlistClick = () => {
    if (accessToken) {
      if (!isHotelInWishlist) {
        wishlistDispatch({
          type: "ADD_TO_WISHLIST",
          payload: hotel,
        });
        
      } else {
        wishlistDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: _id,
        });
        
      }
    } else {
      authDispatch({
        type: "SHOW_AUTH_MODAL",
      });
    }
  };

  return (
    <div className="relative hotelcard-container shadow cursor-pointer">
      <div onClick={handleHotelCardClick}>
        <img className="img" src={image} alt={name} />
        <div className="hotelcard-details">
          <div className="d-flex align-center">
            <span className="location">
              {address}, {state}
            </span>
            <span className="rating d-flex align-center">
              <span className="material-symbols-outlined">star</span>
              <span>{rating}</span>
            </span>
          </div>

          <p className="hotel-name">{name}</p>
          <p className="price-details">
            <span className="price">Rs. {price}</span>
            <span>Night</span>
          </p>
        </div>
      </div>

      <button
        className="button btn-wishlist absolute d-flex align-center"
        onClick={handleWishlistClick}
      >
        <span className="favorite material-symbols-outlined">favorite</span>
      </button>
    </div>
  );
};
