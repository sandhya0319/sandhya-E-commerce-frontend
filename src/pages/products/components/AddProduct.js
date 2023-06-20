import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

const baseURL = "http://localhost:5050";
const AddProduct = () => {
  const user_id = localStorage.getItem("token_data")
    ? JSON.parse(localStorage.getItem("token_data"))
    : {};
  const [productData, setProductData] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}/product/displaydata`)
      .then((response) => {
        setProductData(response.data);
        console.log("data", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  const columns = [
    {
      name: "Title",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "image",
      selector: (row) => row.imageUrl,
      sortable: true,
    },
    {
      name: "description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "price",
      selector: (row) => row.price,
      sortable: true,
    },
  ];

  const [searchText, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const getSearchData = (searchdata) => {
    return Object.values(searchdata).some(
      (val) =>
        (typeof val == "string" || typeof val == "number") &&
        val.toString().toLowerCase().includes(searchText.toLowerCase())
    );
  };
  return (
    <div>
      <>
        <div className="container">
          <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            onChange={handleSearch}
            style={{ width: "30%" }}
          />
        </div>
        <h1>AddProduct</h1>
        <DataTable
          seachdata={productData
            .filter((searchdata) => getSearchData(searchdata))}
          //onRowClicked={}
          //onChangePage={}
          columns={columns}
          data={productData}
          selectableRows
          pagination
        />
      </>
    </div>
  );
};

export default AddProduct;
