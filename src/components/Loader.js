import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="20" y="265" rx="10" ry="10" width="240" height="25" />
    <rect x="0" y="312" rx="10" ry="10" width="280" height="88" />
    <rect x="129" y="420" rx="23" ry="23" width="150" height="40" />
    <rect x="0" y="427" rx="10" ry="10" width="100" height="25" />
    <circle cx="140" cy="120" r="120" />
  </ContentLoader>
);

export default MyLoader;
