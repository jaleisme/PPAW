import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListProduct from "./ListProduct";
import "./index.css";
import Product from "./Product";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListProduct />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
