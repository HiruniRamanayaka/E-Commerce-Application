import React, { useState, useEffect } from "react";
import axios from "axios";
import { Coffee, Snowflake, Star, ChevronRight } from "lucide-react";

function Coffees() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products: ", err));
  }, []);

  return (
    <section className="py-10 bg-[#fdf8f3] text-[#3e2c1d]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Coffee Selection</h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto rounded-full"></div>
          <p className="text-[#5a3e2b] mt-4 max-w-2xl mx-auto">
            Explore our handcrafted coffee menu from bold hot brews to refreshing cold blends.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mx-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-sm text-[#5a3e2b] mb-2">{product.description}</p>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-yellow-700">LKR {product.price}</span>
                  <div className="flex items-center gap-2 text-yellow-600 text-sm">
                    <Star className="w-4 h-4" />
                    {product.rating?.rate?.toFixed(1)} / 5
                  </div>
                </div>

                <div className="mt-3 flex gap-3 text-sm text-[#3e2c1d]">
                  {product.category?.hot && (
                    <span className="flex items-center gap-1">
                      <Coffee className="w-4 h-4" /> Hot
                    </span>
                  )}
                  {product.category?.cold && (
                    <span className="flex items-center gap-1">
                      <Snowflake className="w-4 h-4" /> Cold
                    </span>
                  )}
                </div>

                <div className="mt-auto pt-4 flex justify-end">
                  <button className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center">
                    Order Now <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Coffees;