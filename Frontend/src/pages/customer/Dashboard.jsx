import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Coffee, Truck, Star } from "lucide-react";
import HighlightedMenu from "../../components/HighlightedMenu";
import hero_coffee from "../../assets/hero-coffee1.jpg";
import coffeeTexture from "../../assets/coffee-texture.jpg";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const userName = user?.userName || "Customer";

  return (
    <section className="bg-white text-gray-800">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <img
            src={hero_coffee}
            alt="Coffee lifestyle"
            className="w-full h-full object-cover filter blur-sm scale-105"
            loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-yellow-400 text-lg mb-2">Welcome back, {userName}</h2>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-lg">
            Perfect Coffee, Made Easy
            </h1>
            <p className="text-lg md:text-xl text-gray-100 max-w-2xl mb-6">
            Brew barista-level coffee at home with our curated blends and premium gear.
            </p>
            <div className="flex gap-4">
            <Link
                to="/coffees"
                className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-2xl shadow hover:bg-yellow-600 transition"
            >
                Browse Coffees
            </Link>
            <Link
                to="/customer/cart"
                className="border border-white text-white px-6 py-3 rounded-2xl hover:bg-white hover:text-black transition"
            >
                Go to Cart
            </Link>
            </div>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="bg-yellow-100 py-4 text-center text-yellow-900 font-medium text-sm tracking-wide">
        🎁 Order online and pick up in-store — skip the queue and sip sooner!
      </div>

      {/* Why Choose Us */}
      <div className="py-10 max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        {/* Feature Card 1 */}
        <div className="bg-[#331104] rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center border border-gray-100">
            <Coffee className="mx-auto h-10 w-10 text-yellow-700 mb-4" />
            <h3 className="font-semibold text-lg text-yellow-500 mb-2">Freshly Roasted Beans</h3>
            <p className="text-white text-sm">
            We roast in small batches for peak freshness and bold flavor.
            </p>
        </div>

        {/* Feature Card 2 */}
        <div className="bg-[#331104] rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center border border-gray-100">
        <Truck className="mx-auto h-10 w-10 text-yellow-700 mb-4" />
        <h3 className="font-semibold text-lg text-yellow-500 mb-2">Quick In-Store Pickup</h3>
        <p className="text-white text-sm">
            Order online and collect your brew from our shop—fresh and ready when you arrive.
        </p>
        </div>

        {/* Feature Card 3 */}
        <div className="bg-[#331104] rounded-xl shadow-md hover:shadow-lg transition-all p-6 text-center border border-gray-100">
            <Star className="mx-auto h-10 w-10 text-yellow-700 mb-4" />
            <h3 className="font-semibold text-lg text-yellow-500 mb-2">Loyalty Rewards</h3>
            <p className="text-white text-sm">
            Earn points on every purchase and unlock exclusive perks.
            </p>
        </div>
      </div>

      {/* Highlighted Menu */}
      <div className="bg-gray-50">
        <HighlightedMenu />
      </div>

      {/* Call to Action */}
      <div className="relative bg-gradient-to-r from-yellow-500 via-orange-400 to-yellow-600 py-16 px-6 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 mix-blend-overlay"
          style={{
            backgroundImage: `url(${coffeeTexture})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl p-10 text-center shadow-lg border border-white/20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Ready for your next cup?
          </h2>
          <p className="text-lg text-yellow-100 mb-8">
            Discover new blends, earn rewards, and elevate your coffee ritual.
          </p>
          <Link
            to="/coffees"
            className="inline-block bg-white text-yellow-700 font-semibold px-8 py-4 rounded-full shadow-lg hover:scale-105 hover:bg-yellow-100 transition-transform duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;