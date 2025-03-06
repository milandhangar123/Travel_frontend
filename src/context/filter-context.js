import { createContext, useContext, useReducer } from "react";
import { filterReducer } from "../reducer";

const initialValue = {
  isFilterModalOpen: false,
  priceRange: [300, 20000],
  noOfBathrooms: "Any",
  noOfBedrooms: "Any",
  noOfBeds: "Any",
  propertyType: "Any",
  traveloRating: 1,
  isCancelable: true,
};
const FilterContext = createContext(initialValue);

const FilterProvider = ({ children }) => {
  const [
    {
      isFilterModalOpen,
      priceRange,
      noOfBathrooms,
      noOfBedrooms,
      noOfBeds,
      propertyType,
      traveloRating,
      isCancelable,
    },
    filterDispatch,
  ] = useReducer(filterReducer, initialValue);
  return (
    <FilterContext.Provider
      value={{
        isFilterModalOpen,
        priceRange,
        noOfBathrooms,
        noOfBeds,
        noOfBedrooms,
        propertyType,
        traveloRating,
        filterDispatch,
        isCancelable,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export { FilterProvider, useFilter };
