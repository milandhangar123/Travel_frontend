import "./HotelImages.css"
export const HotelImages = ({ singleHotel }) => {
    if (!singleHotel) {
      return <p>Loading images...</p>; // Jab tak data nahi aata, yeh dikhao
    }
  
    const { image, imageArr = [] } = singleHotel; // Safe destructuring
  
    return (
      <div className="hotel-image-container d-flex gap-small">
        <div className="primary-image-container">
          <img className="primary-img" src={image} alt="primary-image" />
        </div>
        <div className="d-flex wrap gap-small">
          {imageArr.map((img, index) => (
            <img key={index} className="hotel-img" src={img} alt="hotel-image" />
          ))}
        </div>
      </div>
    );
  };
  