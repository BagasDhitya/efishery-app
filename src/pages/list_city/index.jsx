import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Input from "../../components/Input";

const ListCity = () => {
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(10);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const headers = ["Province", "City"];

  const getData = async () => {
    try {
      const response = await axios.get("option_area");
      setCities(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedCity("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedProvince("");
  };

  const searchCities = () => {
    const searchTerm = search?.toLowerCase();
    if (!searchTerm && !selectedProvince && !selectedCity) {
      setFilteredCities([]);
      return;
    }

    const filtered = cities.filter((city) => {
      const { province, city: cityName } = city;
      const isProvinceMatch =
        !selectedProvince || province === selectedProvince;
      const isCityMatch = !selectedCity || cityName === selectedCity;
      const isSearchMatch =
        !searchTerm ||
        province?.toLowerCase().includes(searchTerm) ||
        cityName?.toLowerCase().includes(searchTerm);
      return isProvinceMatch && isCityMatch && isSearchMatch;
    });

    setFilteredCities(filtered);
  };

  const indexOfLastCities = currentPage * citiesPerPage;
  const indexOfFirstCities = indexOfLastCities - citiesPerPage;

  const currentCities = filteredCities.length
    ? filteredCities.slice(indexOfFirstCities, indexOfLastCities)
    : cities.slice(indexOfFirstCities, indexOfLastCities);

  const uniqueProvinces = Array.from(
    new Set(cities.map((city) => city.province))
  );
  const uniqueCities = Array.from(new Set(cities.map((city) => city.city)));
  const totalPages = Math.ceil(filteredCities.length / citiesPerPage);
  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchCities();
  }, [search, cities, selectedProvince, selectedCity]);

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
          marginTop: "10%",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            columnGap: "20px",
            width: "100%",
          }}
        >
          <div
            style={{
              width: "25%",
            }}
          >
            <select
              id="select-province"
              style={{
                backgroundColor: "#fff",
                borderColor: "#0d9488",
                borderRadius: "5px",
                height: "35px",
                width: "140px",
                color: "#0d9488",
              }}
              value={selectedProvince}
              onChange={handleProvinceChange}
            >
              <option value="">Filter by Province</option>
              {uniqueProvinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              width: "25%",
            }}
          >
            <select
              id="select-cities"
              style={{
                backgroundColor: "#fff",
                borderColor: "#0d9488",
                borderRadius: "5px",
                height: "35px",
                width: "140px",
                color: "#0d9488",
              }}
              value={selectedCity}
              onChange={handleCityChange}
            >
              <option value="">Filter by City</option>
              {uniqueCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              width: "25%",
            }}
          >
            <Input
              id="search-city"
              placeholder="Search for city or province..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ListCity;
