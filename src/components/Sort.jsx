import { React, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSort, selectOrderBy } from "../store/filterSlice";

export const sortItems = [
  { text: "популярности", label: "rating" },
  { text: "цене", label: "price" },
  { text: "алфавиту", label: "title" },
];

function Sort() {
  const dispatch = useDispatch();
  const activeSort = useSelector((state) => state.filter.sort);
  const orderBy = useSelector((state) => state.filter.orderBy);
  const [showPopup, setShowPopup] = useState(false);

  const sortRef = useRef(null);

  const onClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    if (!showPopup) return;

    const handleClick = (e) => {
      if (!sortRef.current) return;
      if (!sortRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [showPopup, onClose]);

  const onClickPopup = () => {
    setShowPopup(!showPopup);
  };

  const onClickSort = (obj) => {
    dispatch(selectSort({ text: obj.text, label: obj.label }));
    setShowPopup(false);
  };

  return (
    <div className="sort">
      <div onClick={() => onClickPopup()} className="sort__label">
        <svg
          onClick={() => dispatch(selectOrderBy({ orderBy: !orderBy }))}
          className={`sort__icon ${orderBy ? "" : "desc"}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="20" x2="12" y2="10"></line>
          <line x1="18" y1="20" x2="18" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="16"></line>
        </svg>
        <div ref={sortRef} className="sort__text">
          <b>Сортировка по:</b>
          <span>{activeSort.text}</span>
        </div>
      </div>
      {showPopup && (
        <div className="sort__popup">
          <ul>
            {sortItems.map((obj, i) => (
              <li onClick={() => onClickSort(obj)} key={i}>
                {obj.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
