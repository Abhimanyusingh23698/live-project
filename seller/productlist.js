import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const Productlist = () => {
  let [newproduct, setNewproduct] = useState([]);
  const getProduct = () => {
    let url = "http://localhost:1234/productapi/";
    fetch(url)
      .then((response) => response.json())
      .then((productArray) => {
        setNewproduct(productArray.reverse());
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await fetch(`http://localhost:1234/productapi/${id}`, {
        method: "DELETE",
      });
      getProduct();
    } catch (error) {
      console.error("Error:", error);
    }
  };


   //for pagination
   const PER_PAGE = 5; //displays 5 items/records per page
   const [currentPage, setCurrentPage] = useState(0);
   function handlePageClick({ selected: selectedPage }) {
     setCurrentPage(selectedPage)
   }
   const offset = currentPage * PER_PAGE;
   const pageCount = Math.ceil(newproduct.length / PER_PAGE);

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-xl-9 text-center">
          <h3 className="text-info"> {newproduct.length} : Product in inventory</h3>
        </div>
        <div className="col-xl-3">
          <input type="text" placeholder="Search..." className="form-control" />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-xl-12">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#ID</th>
                <th>Product Name</th>
                <th className="bg-warning">
                  <i className="fa fa-arrow-up"></i> Product Price
                </th>
                <th>Product Details</th>
                <th>Photo</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {newproduct.slice(offset, offset + PER_PAGE).map((product, index) => {
                return (
                  <tr key={index}>
                    <td>{product.id}</td>
                    <td>{product.pname}</td>
                    <td>{product.price}</td>
                    <td>{product.details}</td>
                    <td> <img src={product.photo} height="100" width="120"/> </td>
                    <td className="text-center">
                      <button className="btn btn-danger" onClick={obj=>deleteProduct(product.id)}>
                        <i className="fa fa-trash sm"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="pager">
                    <ReactPaginate
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={handlePageClick}
                    />
                   </div>
        </div>
      </div>
      {/* <div className="row">
        <div className="col-xl-12 text-center mt-3">
          <button className="btn btn-light">Previous</button>
          <button className="btn btn-light">Next</button>
        </div>
      </div> */}

    </div>
  );
};
export default Productlist;
