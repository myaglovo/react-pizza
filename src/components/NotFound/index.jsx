import React from "react";
import styles from "./index.module.scss";
import { useRouteError, Link } from "react-router-dom";

function NotFound() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className={styles.text_center}>
      <h1>Cтраница не найдена!</h1>
      <p>Был изменен адрес или страница была удалена.</p>
      <Link className={styles.btn} to={"/"}>
        <p>Вернуться назад</p>
      </Link>
    </div>
  );
}

export default NotFound;
