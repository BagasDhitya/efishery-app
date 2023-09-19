import { useState, useEffect } from "react";
import axios from "axios";

import Layout from "../../components/Layout";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";

const ListComodity = () => {
  const [comodities, setComodities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [comoditiesPerPage] = useState(10);

  const headers = ["Comodity", "Price", "City", "Province"];

  const getData = async () => {
    try {
      const response = await axios.get("list");
      setComodities(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const indexOfLastComodity = currentPage * comoditiesPerPage;
  const indexOfFirstComodity = indexOfLastComodity - comoditiesPerPage;
  const currentComodities = comodities.slice(
    indexOfFirstComodity,
    indexOfLastComodity
  );

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
          totalPages={Math.ceil(comodities.length / comoditiesPerPage)}
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
            data={currentComodities.map((comodity) => [
              comodity?.komoditas,
              comodity?.price,
              comodity?.area_kota,
              comodity.area_provinsi,
            ])}
            themeColor="theme-green"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ListComodity;
