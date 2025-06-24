import { useEffect, useState } from "react";
import MainPic from "../assets/contentPic.avif";
import SearchForm from "../components/SearchForm";
import { customFetch } from "../utils/fetch";
import PropertyBlock from "../components/PropertyBlock";
import Footer from "../components/Footer";
import FilterChips from "../components/FilterChips";
import type { Filter } from "../utils/types/Filter";
import type { Property } from "../utils/types/Property";
import { ArrowLeft, ArrowRight } from "lucide-react";

function MainPage() {
  const [properties, setProperties] = useState<Property[]>();
  const [page, setPage] = useState(0);
  const [size] = useState(3);
  const [totalPage, setTotalPage] = useState(1);
  const [appliedFilters, setAppliedFilters] = useState<Filter>({
    minPrice: null,
    maxPrice: null,
    minRooms: null,
    maxRooms: null,
    sell: null,
    propertyType: null,
    condition: null,
    city: null,
  });
  const [filters, setFilters] = useState<Filter>({
    minPrice: null,
    maxPrice: null,
    minRooms: null,
    maxRooms: null,
    sell: null,
    propertyType: null,
    condition: null,
    city: null,
  });

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

  useEffect(() => {
    filteredSearch();
  }, [appliedFilters]);

  async function filteredSearch() {
    const jwt = localStorage.getItem("jwt");
    const response = await customFetch({
      path: `property/filtered?page=${page}&size=${size}`,
      method: "POST",
      body: filters,
      jwt: jwt,
    });
    setProperties(response.data.content);
    setTotalPage(response.data.totalPages);
    setAppliedFilters(filters);
  }

  return (
    <div className="bg-stone-200">
      <div
        className="h-[100dvh] bg-center bg-cover flex justify-center items-end"
        style={{ backgroundImage: `url(${MainPic})` }}
      >
        <div className="flex w-[90%] rounded-[2rem] lg:h-60 bg-white/90 m-2 backdrop-blur-xl p-5 flex-col">
          <SearchForm
            filters={filters}
            setFilters={setFilters}
            filteredSearch={filteredSearch}
          />
        </div>
      </div>
      <div className="bg-white w-[90%] my-2 rounded-[2rem] p-5 flex-col mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-[1000]">Properties:</h1>
          <FilterChips
            appliedFilters={appliedFilters}
            setAppliedFilters={setAppliedFilters}
            setFilters={setFilters}
          />
        </div>

        <div>
          {properties &&
            properties.map((property) => (
              <PropertyBlock property={property} key={property.id} />
            ))}
        </div>
        <div className="flex mt-4 justify-center gap-2 ">
          {page > 0 ? (
            <button
              className="btn btn-success rounded-full"
              onClick={() => setPage(page - 1)}
            >
              <ArrowLeft />
            </button>
          ) : (
            <div className="w-[40px] h-[40px]" />
          )}
          <div className="text-2xl my-auto">
            {page + 1}/{totalPage}
          </div>
          {page < totalPage - 1 ? (
            <button
              className="btn btn-success rounded-full"
              onClick={() => setPage(page + 1)}
            >
              <ArrowRight />
            </button>
          ) : (
            <div className="w-[40px] h-[40px]" />
          )}
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MainPage;
