import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronRight } from 'lucide-react';

function HighlightedMenu() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products/top-rates")
            .then(res => setMenuItems(res.data))
            .catch(err => console.error("Error fetching products: ", err));
    }, []);
    return (
        <>
        {/* Menu Section */}
        <section className="py-20 bg-white/30">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Menu Highlights</h2>
              <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
              <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Discover our carefully curated selection of premium coffees and artisan pastries</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuItems.map((item, index) => (
                <div key={item._id} className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                    <img 
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-contain rounded-2xl"
                    />
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                            <span className="text-amber-600 font-bold text-lg">LKR {item.price}</span>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                        <div className="mt-2 text-sm text-yellow-600">⭐ {item.rating?.rate?.toFixed(1)} / 5</div>
                        <div className="mt-4 flex justify-end">
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

        </>
    )
}

export default HighlightedMenu;