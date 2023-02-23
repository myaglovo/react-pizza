import { React, useState, createContext } from "react";
import Header from "./components/Header";
import "./scss/app.scss";
import { Outlet } from "react-router-dom";

export const SearchContext = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Outlet context={[searchValue, setSearchValue]} />
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
