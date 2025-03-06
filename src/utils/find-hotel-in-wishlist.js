export const findHotelInWishlist = (wishlist, singleHotel) => {
  return (
    Array.isArray(wishlist) &&
    wishlist.some((hotel) => hotel._id === singleHotel._id)
  );
};
