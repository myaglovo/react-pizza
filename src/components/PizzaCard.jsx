import { React, useState, useEffect } from "react";
import { addToCart } from "../store/cartSlice";
import { useSelector, useDispatch } from "react-redux";

function PizzaCard({ id, title, price, imageUrl, sizes, types }) {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.cart.items);
  const [pickedSize, setPickedSize] = useState(23);
  const [pickedDough, setPickedDough] = useState("тонкое");
  const [currentPrice, setCurrentPrice] = useState();
  const [basePrice, setBasePrice] = useState(price);

  const doughTypes = ["тонкое", "традиционно"];

  const calculatePrice = (price) => {
    const factor = {
      dough: { тонкое: 1, традиционно: 1.25 },
      size: { 23: 1, 30: 1.1, 35: 1.2, 40: 1.3 },
    };

    setCurrentPrice(() =>
      Math.round(price * factor.dough[pickedDough] * factor.size[pickedSize])
    );
  };

  useEffect(() => {
    calculatePrice(price);
  }, [pickedDough, pickedSize]);

  const handlerAddToCart = (title, id) => {
    dispatch(
      addToCart({
        id,
        amount: 1,
        data: {
          title,
          size: pickedSize,
          dough: pickedDough,
        },
      })
    );
  };

  // [{id:1, amount: 2, totalPrice: 232, data: {title: "Сырная", doudh: 23, size: 13, price: 322,  amount: 1}}, ...]

  const onClickChooseSize = (size) => {
    calculatePrice(price);
    setPickedSize(size);
  };

  const onClickChooseDough = (dough) => {
    calculatePrice(price);
    setPickedDough(doughTypes[dough]);
  };

  return (
    <div className="pizza-block">
      <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((dough) => (
            <li
              onClick={() => onClickChooseDough(dough)}
              key={dough}
              className={pickedDough === doughTypes[dough] ? "active" : ""}
            >
              {doughTypes[dough]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              onClick={() => onClickChooseSize(size)}
              key={i}
              className={pickedSize === size ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {currentPrice} ₽</div>
        <div
          onClick={() => handlerAddToCart(title, id)}
          className="button button--outline button--add"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          <i>{amount.length}</i>
        </div>
      </div>
    </div>
  );
}

export default PizzaCard;
