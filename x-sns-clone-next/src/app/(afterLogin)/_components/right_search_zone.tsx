"use client";

import style from "./right_search_zone.module.css";
import { usePathname } from "next/navigation";
import React from "react";
import SearchForm from "./search_form";

export default function RightSearchZone() {
  const pathname = usePathname();
  const onChangeFollow = () => {};
  const onChangeAll = () => {};
  if (pathname === "/explore") {
    return null;
  }
  if (pathname === "/search") {
    return (
      <div>
        <h5 className={style.filterTitle}>Search filters</h5>
        <div className={style.filterSection}>
          <div>
            <label>People</label>
            <div className={style.radio}>
              <div>From anyone</div>
              <input
                type="radio"
                name="pf"
                defaultChecked
                onChange={onChangeAll}
              />
            </div>
            <div className={style.radio}>
              <div>People you follow</div>
              <input
                type="radio"
                name="pf"
                value="on"
                onChange={onChangeFollow}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ marginBottom: 60, width: "inherit" }}>
      <SearchForm />
    </div>
  );
}
