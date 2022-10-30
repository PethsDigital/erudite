import React from "react";
import { Route, Routes } from "react-router-dom";
import { SearchBar, Widget } from "../components";
import { Home } from "../views";
import { profileIcon, writeIcon } from "../assets/icons";

export default function Forum() {
  const handleSearch = (searchValue: string) => {
    console.log(searchValue);
  };

  const handleProfileClick = () => {};

  const startDiscussion = () => {};

  return (
    <React.Fragment>
      <div className="flex items-center">
        <SearchBar handleSearch={handleSearch} />

        <span
          className="ml-4 cursor-pointer"
          onClick={() => handleProfileClick()}
        >
          <img src={profileIcon} alt="" />
        </span>

        <div className="flex cursor-pointer" onClick={() => startDiscussion()}>
          <img src={writeIcon} alt="" className="mx-4" />
          <span className="text-poppins font-medium text-[18px] leading-[27px] text-[#121921FC]/[99%] hidden lg:inline">
            Start a discussion
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row mt-10">
        <div className="w-full sm:w-3/5 xl:w-[807px]">
          <main>
            <Routes>
              <Route path="" element={<Home />} />
            </Routes>
          </main>
        </div>

        <div className="w-full sm:w-2/5 xl:w-[378px] mt-4 sm:mt-0 sm:ml-2 xl:ml-[55px]">
          <aside>
            <Widget />
          </aside>
        </div>
      </div>
    </React.Fragment>
  );
}
