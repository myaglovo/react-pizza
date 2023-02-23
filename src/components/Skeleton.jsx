import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#e8e8e8"
    foregroundColor="#c9c9c9"
    {...props}
  >
    <circle cx="110" cy="110" r="110" />
    <rect x="0" y="289" rx="4" ry="4" width="230" height="80" />
    <rect x="0" y="245" rx="4" ry="4" width="230" height="28" />
    <rect x="0" y="387" rx="4" ry="4" width="68" height="35" />
    <rect x="99" y="387" rx="20" ry="20" width="128" height="35" />
  </ContentLoader>
);

export default Skeleton;
