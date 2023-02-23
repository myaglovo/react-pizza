import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { selectCategory } from "../store/filterSlice";

function Categories({ activeCategory }) {
  const dispatch = useDispatch();
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((value, i) => (
          <li
            onClick={() => dispatch(selectCategory({ i }))}
            key={value}
            className={activeCategory === i ? "active" : ""}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
