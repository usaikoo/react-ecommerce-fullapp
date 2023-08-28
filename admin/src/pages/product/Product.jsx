import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../network/apiCalls";
export default function Product() {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [categories, setCategories] = useState([]);
  // console.log(productId)
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  //   console.log(product);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState();
  const handleChage = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCategories = (e) => {
    setCategories(e.target.value.split(","));
  };
  const updateProductBtn = (e) => {
    e.preventDefault();
    if (file) {
      const fileName = new Date().getTime() + file;
      const storage = getStorage(app);

      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;
            case "storage/canceled":
              // User canceled the upload
              break;

            // ...

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // console.log();
            const product = {
              ...inputs,
              img: downloadURL,
              categories: categories,
            };
            updateProduct(dispatch, productId, product);
          });
        }
      );
    }

    console.log(file + "j");
    const product = {
      ...inputs,
      categories: categories,

      // categories: categories,
    };
    updateProduct(dispatch, productId, product);
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={productData} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>

            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              name="title"
              type="text"
              placeholder={product.title}
              onChange={handleChage}
            />
            <label>Product Description</label>
            <input
              name="description"
              type="text"
              placeholder={product.description}
              onChange={handleChage}
            />
            <label>Product Price</label>
            <input
              name="price"
              type="text"
              placeholder={product.price}
              onChange={handleChage}
            />
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={handleChage}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <div className="addProductItem">
              <label>Categories</label>
              <input
                name="categories"
                type="text"
                placeholder={product.categories}
                onChange={handleCategories}
              />
            </div>
          </div>

          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input
                onChange={(e) => setFile(e.target.files[0])}
                type="file"
                id="file"
                style={{ display: "none" }}
              />
            </div>
            <button onClick={updateProductBtn} className="productButton">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
