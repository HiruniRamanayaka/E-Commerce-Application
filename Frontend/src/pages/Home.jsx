import React from "react";
import heroImage from "../assets/image1.jpg"
import mainImage from "../assets/image2.jpg"
import HighlightedMenu from "../components/HighlightedMenu";

function Home() {
    return (
        <>
        <section className="bg-gradient-to-br from-amber-50 to-orange-100 text-[#3e2c1d] px-6 py-12 md:py-10 lg:px-24 font-sans">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                {/* Left: Text Content */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Enjoy Your Morning Coffee
                    </h1>
                    <p className="text-lg mb-6 text-[#5a3e2b]">
                        Boost your productivity and build your mood with a glass of coffee in the morning, 100% natural from garden.
                    </p>    
                    <div className="flex items-center gap-4 mb-6">
                        <button className="bg-yellow-600 text-white px-6 py-3 rounded-full hover:bg-yellow-700 transition">
                        Order Now →
                        </button>
                        <span className="text-sm text-[#7a5e47]">Start At LKR 300</span>
                    </div>
                    <div className="flex gap-8 text-sm font-medium text-[#7a5e47]">
                        <div><span className="md:text-4xl">1K+</span> <br/> Reviews</div>
                        <div><span className="md:text-4xl">3K+</span> <br/>  Sell</div>
                        <div><span className="md:text-4xl">150+</span> <br/> Menu</div>
                    </div>
                </div>

                {/* Right: Image */}
                <div className="relative">
                    <img
                        src={heroImage}
                        alt="Coffee cups"
                        className="w-full rounded-xl shadow-lg"
                    />
                </div>
            </div>
        </section>

        <section>
            <HighlightedMenu />
        </section>

        <section className="bg-[#fdf8f3] text-[#3e2c1d] px-6 py-12 md:py-10 lg:px-24 font-sans">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                <img
                    src={mainImage}
                    alt="Coffee cups"
                    className="w-81 rounded-xl shadow-lg ml-20"
                />
                </div>
                <div className="space-y-8">
                    <div>
                    <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                        Order Your
                        <br />
                        <span className="text-gray-800">Favourite Coffee</span>
                    </h1>
                    <p className="text-gray-600 mt-6 text-lg leading-relaxed max-w-md">
                        Start your day with the perfect cup. <br/> Crafted with care, our coffee delivers rich flavor and comfort in every sip. Whether you're rushing to work or relaxing at home, we've got your brew.
                    </p>
                    </div>
                    <button className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105 shadow-lg">
                    ORDER NOW
                    </button>
                </div>
            </div>
            
            
        </section>
        </>
    )
}

export default Home;