import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
function App() {
  const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const admin = user && JSON.parse(user).currentUser?.isAdmin;
  // console.log(currentUser);
  return (
    <Router>
      {admin && <Topbar />}
      {admin && (
        <div className="container">
            <Sidebar />
          <Routes>
            <>
              <Route exact path="/" element={<Home />}></Route>
              <Route path="/users" element={<UserList />}></Route>
              <Route path="/user/:userId" element={<User />}></Route>
              <Route path="/newUser" element={<NewUser />}></Route>
              <Route path="/products" element={<ProductList />}></Route>
              <Route path="/product/:productId" element={<Product />}></Route>
              <Route path="/newproduct" element={<NewProduct />}></Route>
            </>
          </Routes>
        </div>
      )}
      <Routes>
      {currentUser ? (
          ""
        ) : (
          <>
            {" "}
            <Route path="/login" element={<Login></Login>}></Route>
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
