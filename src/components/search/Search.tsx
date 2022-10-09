import React, { useCallback, useEffect, useState } from "react";
import styles from "./Search.module.scss";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";
import { changeSearch } from "../../redux/slices/filterSlice";

const Search: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce((value: string) => {
      dispatch(changeSearch(value));
    }, 400),
    []
  );

  useEffect(() => {
    updateSearchValue(searchValue);
  }, [searchValue, updateSearchValue]);

  return (
    <div className={styles.search}>
      <input
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        placeholder="search field"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="16"
        height="16"
        viewBox="0 0 16 16"
      >
        <path d="M 7 0 C 3.134 0 0 3.134 0 7 C 0 10.866 3.134 14 7 14 C 8.5715444 14 10.017271 13.475972 11.185547 12.601562 L 14.398438 15.814453 L 15.814453 14.398438 L 12.601562 11.185547 C 13.475972 10.017271 14 8.5715444 14 7 C 14 3.134 10.866 0 7 0 z M 6.5 3 C 7.39575 3 8.2911094 3.3418906 8.9746094 4.0253906 L 7.5605469 5.4394531 C 6.9745469 4.8534531 6.0244531 4.8534531 5.4394531 5.4394531 C 4.8534531 6.0254531 4.8534531 6.9755469 5.4394531 7.5605469 L 4.0253906 8.9746094 C 2.6583906 7.6076094 2.6583906 5.3923906 4.0253906 4.0253906 C 4.7088906 3.3418906 5.60425 3 6.5 3 z" />
      </svg>
    </div>
  );
};

export default Search;
