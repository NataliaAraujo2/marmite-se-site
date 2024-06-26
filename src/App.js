//CSS
import "./App.css";
//Routes
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//hooks and services
import { useEffect, useState } from "react";
import { useAuthentication } from "./hooks/useAuthentication";
import { onAuthStateChanged } from "firebase/auth";
//context
import { AuthProvider } from "./context/AuthContext";
//pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Pocket from "./pages/ProductsType/Pocket";
import Desserts from "./pages/ProductsType/Desserts";
import Coffee from "./pages/ProductsType/Coffee";
import Broths from "./pages/ProductsType/Broths";
import FrozenFoods from "./pages/ProductsType/FrozenFoods";
import PocketStore from "./pages/Store/PocketStore";
import DessertStore from "./pages/Store/DessertStore";
import CoffeeStore from "./pages/Store/CoffeeStore";
import BrothStore from "./pages/Store/BrothStore";
import FrozenFoodStore from "./pages/Store/FrozenFoodStore";
import Checkout from "./pages/Checkout/Checkout";
import Menu from "./pages/Menu/Menu";
import CloserPlaces from "./pages/Store/Distributors/CloserPlaces";
import Resume from "./pages/Resume/Resume";
import Cart from "./pages/Cart/Cart";
//components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Contact from "./pages/Contact/Contact";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();


  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="App">
      <PayPalScriptProvider
        options={{
          clientId:
            process.env.REACT_APP_PAYPAL_CLIENT_ID,
          currency: "BRL",
        }}
      >
        <AuthProvider value={{ user }}>
          <BrowserRouter>
            <Navbar />

            <div className="container">
              <Routes>
                <Route
                  path="/checkout"
                  element={user ? <Checkout /> : <Login />}
                />

                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                <Route path="/contact" element={<Contact />} />
                <Route path="/resume/:id" element={<Resume />} />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/register"
                  element={!user ? <Register /> : <Navigate to="/" />}
                />
                <Route
                  path="/cart/:id"
                  element={user ? <Cart /> : <Navigate to="/login" />}
                />

                <Route
                  path="/productsType/register"
                  element={!user ? <Register /> : <Navigate to="/" />}
                />
                <Route path="/productsType/pockets" element={<Pocket />} />
                <Route path="/productsType/desserts" element={<Desserts />} />
                <Route path="/productsType/coffees" element={<Coffee />} />
                <Route path="/productsType/broths" element={<Broths />} />
                <Route
                  path="/productsType/frozenFoods"
                  element={<FrozenFoods />}
                />
                <Route path="/store/Marmitas" element={<PocketStore />} />
                <Route path="/store/Sobremesas" element={<DessertStore />} />
                <Route path="/store/Coffee-Break" element={<CoffeeStore />} />
                <Route path="/store/Caldos e Sopas" element={<BrothStore />} />
                <Route path="/store/Congelados" element={<FrozenFoodStore />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/store/checkout" element={<Checkout />} />
                <Route path="/store/map" element={<CloserPlaces />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </AuthProvider>
      </PayPalScriptProvider>
    </div>
  );
}

export default App;
