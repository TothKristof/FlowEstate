import React, { useEffect, useState } from "react";
import MainPic from "../assets/contentPic.avif";
import SearchForm from "../components/SearchForm";
import { customFetch } from "../utils/fetch";
import PropertyBlock from "../components/PropertyBlock";
import Footer from "../components/Footer";

function MainPage() {
  const [properties, setProperties] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPage, setTotalPage] = useState(null);

  useEffect(() => {
    async function loadProperties() {
      const jwt = localStorage.getItem("jwt");
      const response = await customFetch({
        path: `property/all?page=${page}&size=${size}`,
        method: "GET",
        jwt: jwt,
      });
      console.log(response);
      setProperties(response.data.content);
      setTotalPage(response.data.totalPages);
    }
    loadProperties();
  }, [page]);

  return (
    <div className="bg-stone-200">
      <div
        className="h-[100dvh] bg-center bg-cover flex justify-center items-end"
        style={{ backgroundImage: `url(${MainPic})` }}
      >
        <div className="flex w-[90%] rounded-[2rem]  md:h-60 bg-white/90 m-2 backdrop-blur-xl p-5 flex-col">
          <SearchForm></SearchForm>
        </div>
      </div>
      <div className="bg-white w-[90%] my-2 rounded-[2rem] p-5 flex-col mx-auto">
        <h1 className="text-emerald-500 text-3xl font-[1000]">Properties:</h1>
        <div>
          {properties &&
            properties.map((property) => (
              <PropertyBlock property={property} key={property.id} />
            ))}
        </div>
        <div className="flex mt-4 justify-center gap-2">
          {page>0 && <button className="btn btn-primary w-30" onClick={() => setPage(page-1)}>Prev</button>}
          <div className="text-2xl my-auto">{page+1}/{totalPage}</div>
          {page<totalPage-1 && <button className="btn btn-primary w-30" onClick={() => setPage(page+1)}>Next</button>}
        </div>
      </div>
              <Footer></Footer>
    </div>
  );
}

export default MainPage;
