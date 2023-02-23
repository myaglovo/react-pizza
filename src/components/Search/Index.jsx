import { React, useState, useContext, useRef, useCallback } from "react";
import { SearchContext } from "../../App";
import Styles from "./Search.module.scss";
import debounce from "lodash.debounce";

function Search() {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef();
  const { setSearchValue } = useContext(SearchContext);

  const onInputClick = () => {
    inputRef.current.focus();
  };

  const updateSearchValue = (e) => {
    onChangeInput(e.target.value);
    setInputValue(e.target.value);
  };

  const onChangeInput = useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 400),
    []
  );

  return (
    <div onClick={onInputClick} className={Styles.wrapper}>
      <svg
        className={Styles.icon}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        ></path>
      </svg>
      <input
        ref={inputRef}
        onChange={(e) => updateSearchValue(e)}
        value={inputValue}
        className={Styles.input}
        type="text"
        placeholder="Поиск пиццы"
      />
    </div>
  );
}

export default Search;
