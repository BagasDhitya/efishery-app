import { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";

const ListComodity = () => {
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [citiesPerPage] = useState(10);

  const headers = ["Province", "City"];

  const getData = async () => {
    try {
      const response = await axios.get("option_area");
      setCities(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastComodity = currentPage * citiesPerPage;
  const indexOfFirstComodity = indexOfLastComodity - citiesPerPage;
  const currentCities = cities.slice(indexOfFirstComodity, indexOfLastComodity);

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
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(cities.length / citiesPerPage)}
          onPageChange={onPageChange}
        />
        <div
          style={{
            width: "100vh",
            maxWidth: "800px",
            marginTop: "20px",
          }}
        >
          <Table
            headers={headers}
            data={currentCities.map((city) =>
              city?.province && city?.city
                ? [city?.province, city?.city]
                : ["-", "-"]
            )}
            themeColor="theme-green"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ListComodity;
