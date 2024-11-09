import { useEffect, useState } from "react";

const NewProduct = () => {
  let [catlist, setCategory] = useState([]);
  let [categoryName, setCategoryName] = useState(""); // State for selected category
  let [prodname, setProdname] = useState("");
  let [prodprice, setProdprice] = useState("");
  let [prodphoto, setProdphoto] = useState("");
  let [proddesc, setProddesc] = useState("");
  const [message, setMessage] = useState("");

  const getCategory = () => {
    let url = "http://localhost:1234/categoryapi/";
    fetch(url)
      .then((response) => response.json())
      .then((catArray) => {
        setCategory(catArray.reverse());
      });
  };

  const save = () => {
    if(categoryName=="" || prodname=="" || prodprice=="" || prodphoto=="" || proddesc==""){
      setMessage("Invalid Product Details !..");
    }else{
      let newProduct = {
        category: categoryName,
        pname: prodname,
        price: prodprice,
        photo: prodphoto,
        details: proddesc,
      };
      let purl = "http://localhost:1234/productapi/";
      let postdata = {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(newProduct),
      };

      fetch(purl, postdata)
        .then((response) => response.json())
        .then((data) => {
          setMessage(`${data.category} saved successfully`);
          clearAll();
        });
    }
  };

  const clearAll = () => {
    setCategoryName("");
    setProdname("");
    setProdprice("");
    setProdphoto("");
    setProddesc("");
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="container">
      <div className="row mt-3">
        <div className="col-xl-12 text-center">
          <h1 className="text-info">Enter Product Details</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12 text-center">
          <p className="text-danger">The * Marked fields are mandatory</p>
          <p className="text-success">{message}</p>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-3">
          <p>
            Product Category <span className="text-danger">*</span>
          </p>
          <select
            className="form-select"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          >
            <option value="">Choose</option>
            {catlist.map((category, index) => (
              <option key={index} value={category.catname}>
                {category.catname}
              </option>
            ))}
          </select>
        </div>

        <div className="col-xl-3">
          <p>
            Product Name <span className="text-danger">*</span>
          </p>
          <input
            type="text"
            className="form-control"
            value={prodname}
            onChange={(e) => setProdname(e.target.value)}
          />
        </div>
        <div className="col-xl-3">
          <p>
            Product Price <span className="text-danger">*</span>
          </p>
          <input
            type="number"
            className="form-control"
            value={prodprice}
            onChange={(e) => setProdprice(e.target.value)}
          />
        </div>
        <div className="col-xl-3">
          <p>
            Product Photo URL <span className="text-danger">*</span>
          </p>
          <input
            type="text"
            className="form-control"
            value={prodphoto}
            onChange={(e) => setProdphoto(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-xl-12">
          <p>
            Product Description <span className="text-danger">*</span>
          </p>
          <textarea
            className="form-control"
            value={proddesc}
            onChange={(e) => setProddesc(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-xl-4 offset-4 text-center">
          <button className="btn btn-success text-white m-2" onClick={save}>
            Save Product
          </button>
          <button className="btn btn-warning m-2" onClick={clearAll}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
