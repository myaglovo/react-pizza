import { React, useState, useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import Categories from "../components/Categories";
import Sort, { sortItems } from "../components/Sort";
import PizzaCard from "../components/PizzaCard";
import Skeleton from "../components/Skeleton";
import { useOutletContext, useNavigate } from "react-router-dom";
import Styles from "../components/Pagination/Pagination.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { selectPage, setFilters } from "../store/filterSlice";
import { fetchPizzas } from "../store/pizzasSlice";
import qs from "qs";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const status = useSelector((state) => state.pizzas.status);
  const pizzas = useSelector((state) => state.pizzas.pizzas);
  const activeCategory = useSelector((state) => state.filter.category);
  const orderByInc = useSelector((state) => state.filter.orderBy);
  const page = useSelector((state) => state.filter.page);
  const sortBy = useSelector((state) => state.filter.sort.label);
  const [searchValue, setSearchValue] = useOutletContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("effect");
    dispatch(
      fetchPizzas({ activeCategory, page, sortBy, orderByInc, searchValue })
    );
  }, [dispatch]);
  // const fetchPizzas = () => {
  //   setIsLoading(true);
  //   axios
  //     .get(
  //       `https://639b5be1d5141501975358d5.mockapi.io/pizzas?${
  //         activeCategory > 0 ? `category=${activeCategory}` : ""
  //       }&limit=5&page=${page}&sortBy=${sortBy}&order=${
  //         orderByInc ? "asc" : "desc"
  //       }&${searchValue.length > 0 ? `search=${searchValue}` : ""}`
  //     )
  //     .then((response) => setPizzas(response.data))
  //     .finally(() => setIsLoading(false));
  //   window.scrollTo(0, 0);
  // };

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));
  //     const sort = sortItems.find((item) => params.sortBy === item.label);
  //     dispatch(setFilters({ ...params, sort }));
  //     isSearch.current = true;
  //   }
  // }, []);

  // useEffect(() => {
  //   window.scrollTo(0, 0);

  //   if (!isSearch.current) {
  //     fetchPizzas();
  //   }
  //   isSearch.current = false;
  // }, [activeCategory, sortBy, orderByInc, searchValue, page]);

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       activeCategory,
  //       sortBy,
  //       orderByInc,
  //       page,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [activeCategory, sortBy, orderByInc, page]);

  return (
    <>
      <div className="content__top">
        <Categories activeCategory={activeCategory} />
        <Sort orderByInc={orderByInc} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__grid">
        <div className="content__items">
          {status === "pending"
            ? [...new Array(7)].map((_, i) => <Skeleton key={i} />)
            : pizzas.map((pizza, i) => <PizzaCard key={i} {...pizza} />)}
        </div>
        <ReactPaginate
          className={Styles.root}
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => dispatch(selectPage({ page: e.selected + 1 }))}
          forcePage={page - 1}
          pageRangeDisplayed={5}
          pageCount={3}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  );
}

export default Home;
