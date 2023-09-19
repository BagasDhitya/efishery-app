import { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Input from "../../components/Input";

const ListCity = () => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(10);
  const [filteredCities, setFilteredCities] = useState([]);

  const headers = ["Province", "City"];

  const getData = async () => {
    try {
      const response = await axios.get("option_area");
      setCities(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchCities = () => {
    const searchTerm = search?.toLowerCase();
    if (!searchTerm) {
      setFilteredCities([]);
      return;
    }

    const filtered = cities.filter((cities) => {
      const { province, city } = cities;
      return (
        province?.toLowerCase().includes(searchTerm) ||
        city?.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredCities(filtered);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchCities();
  }, [search, cities]);

  const indexOfLastCities = currentPage * citiesPerPage;
  const indexOfFirstCities = indexOfLastCities - citiesPerPage;
  const currentCities = filteredCities.length
    ? filteredCities.slice(indexOfFirstCities, indexOfLastCities)
    : cities.slice(indexOfFirstCities, indexOfLastCities);

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          marginLeft: "40%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "100px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "50%",
            }}
          >
            <Input
              id="search-city"
              placeholder="Search for city or province..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(cities.length / citiesPerPage)}
            onPageChange={onPageChange}
          />
        </div>
        <div
          style={{
            width: "100vh",
            maxWidth: "800px",
            marginTop: "20px",
          }}
        >
          <Table
            headers={headers}
            data={currentCities.map((city) => [city?.province, city?.city])}
            themeColor="theme-green"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ListCity;
