import React from "react";
import Header from "../components/Header";
import NotFound from "../components/NotFound/index";
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <NotFound />
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
