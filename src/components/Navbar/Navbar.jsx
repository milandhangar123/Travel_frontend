import "./Navbar.css";
import { useDate, useAuth } from "../../context";

export const Navbar = () => {
  const { destination, dateDispatch, checkInDate, checkOutDate, guests } =
    useDate();

  const { authDispatch } = useAuth();

  const handleSearchClick = () => {
    dateDispatch({ type: "OPEN_SEARCH_MODAL" });
  };

  const handleAuthClick = () => {
    authDispatch({
      type: "SHOW_AUTH_MODAL",
    });
  };

  return (
    <header className="heading d-flex align-center">
      <h1 className="heading-1">
        <a className="link" href="/">
          TravelO
        </a>
      </h1>

      {/* Search Bar */}
      <div
        className="form-container d-flex align-center cursor-pointer shadow"
        onClick={handleSearchClick}
      >
        <span className="form-option">{destination || "Anywhere"}</span>
        <span className="border-right-1px"></span>

        <span className="form-option">
          {checkInDate && checkOutDate
            ? `${checkInDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })} - 
               ${checkOutDate.toLocaleDateString("en-US", {
                 day: "numeric",
                 month: "short",
               })}`
            : "Any Week"}
        </span>
        <span className="border-right-1px"></span>

        <span className="form-option">
          {guests > 0 ? `${guests} guests` : "Add Guests"}
        </span>

        <span className="search material-symbols-outlined">search</span>
      </div>

      {/* Navigation Icons */}
      <nav className="d-flex align-center gap-large" onClick={handleAuthClick}>
        <div className="nav d-flex align-center cursor-pointer">
          <span className="material-symbols-outlined profile-option menu">
            menu
          </span>
          <span className="material-symbols-outlined profile-option menu">
            person
          </span>
        </div>
      </nav>
    </header>
  );
};
