import React from "react";
import ProductList from "./ProductList";
import NewProductForm from "./NewProductForm";

const Home = () => {
  return (
    <main className="w-100 d-flex px-5 pt-5 text-light">
      <div className="w-75 me-3">
        <ProductList />
      </div>
      <NewProductForm />
    </main>
  );
};

export default Home;
