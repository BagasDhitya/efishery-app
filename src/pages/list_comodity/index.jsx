import React, { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Input from "../../components/Input";

const ListComodity = () => {
  const [comodities, setComodities] = useState([]);
  const [filteredComodities, setFilteredComodities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [comoditiesPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();

  const headers = ["Comodity", "Price", "City", "Province"];

  const getData = async () => {
    try {
      const response = await axios.get("list");
      setLoading(true);
      setComodities(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchComodities = () => {
    const searchTerm = search?.toLowerCase();
    if (!searchTerm) {
      setFilteredComodities([]);
      return;
    }

    const filtered = comodities.filter((comodity) => {
      const { komoditas, price, area_kota, area_provinsi } = comodity;
      return (
        komoditas?.toLowerCase().includes(searchTerm) ||
        price?.toString().includes(searchTerm) ||
        area_kota?.toLowerCase().includes(searchTerm) ||
        area_provinsi?.toLowerCase().includes(searchTerm)
      );
    });

    setFilteredComodities(filtered);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    searchComodities();
  }, [search, comodities]);

  const indexOfLastComodity = currentPage * comoditiesPerPage;
  const indexOfFirstComodity = indexOfLastComodity - comoditiesPerPage;
  const currentComodities = filteredComodities.length
    ? filteredComodities.slice(indexOfFirstComodity, indexOfLastComodity)
    : comodities.slice(indexOfFirstComodity, indexOfLastComodity);

  const onPageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout>
      {loading === true ? (
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
                id="search-comodity"
                placeholder="Search for comodity, price, etc..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(comodities.length / comoditiesPerPage)}
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
              data={currentComodities.map((comodity) => [
                comodity?.komoditas,
                comodity?.price,
                comodity?.area_kota,
                comodity?.area_provinsi,
              ])}
              themeColor="theme-green"
            />
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            fontSize: "24px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            marginLeft: "40%",
            marginTop: "10%",
            color: "#0d9488",
          }}
        >
          <p>Loading data list comodity ...</p>
        </div>
      )}
    </Layout>
  );
};

export default ListComodity;
