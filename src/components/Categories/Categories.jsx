import { useEffect, useState } from "react";
import axios from "axios";
import { useCategory, useFilter } from "../../context";

import "./Categories.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [numberOfCategoriesToShow, setNumberOfCategoriesToShow] = useState(0);
  const { hotelCategory, setHotelCategory } = useCategory();
  const { filterDispatch } = useFilter();

  const handleShowMoreRightClick = () => {
    setNumberOfCategoriesToShow((prev) => prev + 10);
  };

  const handleShowMoreLeftClick = () => {
    setNumberOfCategoriesToShow((prev) => prev - 10);
  };

  const handleFilterClick = () => {
    filterDispatch({
      type: "SHOW_FILTER_MODAL",
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://travel-backend-vy68.onrender.com/api/category"
        );
        const categoriesToShow = data.slice(
          numberOfCategoriesToShow + 10 > data.length
            ? data.length - 10
            : numberOfCategoriesToShow,
          numberOfCategoriesToShow > data.length
            ? data.length
            : numberOfCategoriesToShow + 10
        );
        setCategories(categoriesToShow);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [numberOfCategoriesToShow]);

  const handleCategoryClick = (category) => {
    setHotelCategory(category);
  };

  return (
    <section className="categories d-flex align-center gap-large cursor-pointer">
      {numberOfCategoriesToShow >= 10 && (
        <button
          className="button btn-category btn-left fixed cursor-pointer"
          onClick={handleShowMoreLeftClick}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
      )}

      {categories &&
        categories.map(({ _id, category }) => (
          <span
            className={category === hotelCategory ? "border-bottom" : ""}
            key={_id}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </span>
        ))}

      {numberOfCategoriesToShow - 10 < categories.length && (
        <button
          className="button btn-category btn-right fixed cursor-pointer"
          onClick={handleShowMoreRightClick}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )}

      <button
        className="button btn-filter d-flex align-center gap-small cursor-pointer fixed"
        onClick={handleFilterClick}
      >
        <span className="material-symbols-outlined">filter_alt</span>
        <span>Filter</span>
      </button>
    </section>
  );
};
