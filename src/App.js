import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import BookDetails from "./components/BookDetails";
import Cart from "./components/Cart";
import Category from "./components/Category";
import Checkout from "./components/Checkout";
import HomeContainer from "./components/HomeContainer";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import Wishlist from "./components/Wishlist";
import About from "./pages/About";
import AddressPage from "./pages/AddressPage";
import AuthorDetails from "./pages/AuthorDetails";
import ChangePassword from "./pages/ChangePassword";
import Contact from "./pages/Contact";
import InternalServerError from "./pages/InternalServerError";
import MyOrders from "./pages/MyOrders";
import PersonalSetting from "./pages/PersonalSetting";
import Privacy_Policy from "./pages/Privacy_Policy";
import SearchedBooks from "./pages/SearchedBooks";
import Testimonials from "./pages/Testimonials";
import UserAccountPage from "./pages/UserAccountPage";
import AboutMe from "./pages/AboutMe";
import Registration from "./components/Registration";

function App() {
  window.globalPrentUrl = "http://localhost:8080/";
  // window.globalPrentUrl = "https://chapterly-production.up.railway.app/"
  const sidebarOpen = useSelector((state) => state.sidebar);
  return (
    <Router>
      <div className="App text-pretty">
        <Routes>
          <Route
            path={`/book/:id`}
            element={sidebarOpen ? <Sidebar /> : <BookDetails />}
          />
          <Route path="/privacy-policy" element={sidebarOpen ? <Sidebar /> : <Privacy_Policy />} />
          <Route path="/testimonials" element={sidebarOpen ? <Sidebar /> : <Testimonials />} />
          <Route path="/contact" element={sidebarOpen ? <Sidebar /> : <Contact />} />
          <Route path="/about" element={sidebarOpen ? <Sidebar /> : <About />} />
          <Route path="/aboutme" element={sidebarOpen ? <Sidebar /> : <AboutMe />} />
          <Route path="/myorders" element={sidebarOpen ? <Sidebar /> : <MyOrders />} />
          <Route path="/updateAddress" element={sidebarOpen ? <Sidebar /> : <AddressPage />} />
          <Route path="/changePassword" element={sidebarOpen ? <Sidebar /> : <ChangePassword />} />
          <Route path="/personalSetting" element={sidebarOpen ? <Sidebar /> : <PersonalSetting />} />
          <Route path="/myaccount" element={sidebarOpen ? <Sidebar /> : <UserAccountPage />} />
          <Route path="/author/:author" element={sidebarOpen ? <Sidebar /> : <AuthorDetails />} />
          <Route path="/cart" element={sidebarOpen ? <Sidebar /> : <Cart />} />
          <Route path="/checkout" element={sidebarOpen ? <Sidebar /> : <Checkout />} />
          <Route path={`/category/:cat`} element={sidebarOpen ? <Sidebar /> : <Category />} />
          <Route path="/error" element={sidebarOpen ? <Sidebar /> : <InternalServerError />} />
          <Route path="/wishlist" element={sidebarOpen ? <Sidebar /> : <Wishlist />} />
          <Route path={`/search/:key`} element={sidebarOpen ? <Sidebar /> : <SearchedBooks />} />
          <Route path="/login" element={ <LoginPage />} />
          <Route path="/register" element={ <Registration />} />
          <Route
            path="/"
            element={sidebarOpen ? <Sidebar /> : <HomeContainer />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
