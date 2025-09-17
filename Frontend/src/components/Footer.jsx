import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

function Footer() {
  const { token } = useSelector((state) => state.auth);

  return (
    <footer className="bg-[#2f2721] text-[#f5f5f5] py-10 mt-10">
      <div className="max-w-8xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Brand and Social Section */}
        <section className="px-5">
          <h2 className="text-2xl font-bold mb-4 tracking-wide">CaféNova</h2>
          <p className="leading-relaxed mb-6">
            CaféNova<br />
            123 New Street<br />
            Caffevilla, Colombo 07
          </p>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4 mt-2 text-xl">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>

            </div>
          </div>
        </section>

        {/* Opening Hours */}
        <section className="px-5">
            <div>
                <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">Opening Hours</h3>
                <p className="mb-4">
                <span className="text-xl font-bold block">Monday<br />To<br />Friday</span>
                <span className="block mt-2">08.00 AM – 09.00 PM</span>
                </p>
                <p className="mb-2"><strong>Saturday</strong><br />10.00 AM – 10.00 PM</p>
                <p><strong>Sunday</strong><br />10.00 AM – 08.00 PM</p>
          </div>
        </section>

        {/* Navigation */}
        <section className="px-5">
          {!token && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Home Links */}
                <div >
                    <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide"><Link to="/" className="hover:underline">Home</Link></h3>
                    <ul className="space-y-2">
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Menu</li>
                    <li>Events</li>
                    <li>Contact Us</li>
                    </ul>
                </div>

                {/* About Us Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide"><Link to="/about" className="hover:underline">About Us</Link></h3>
                    <ul className="space-y-2">
                    <li>Our Story</li>
                    <li>List Menu</li>
                    <li>News</li>
                    <li>Team</li>
                    <li>Blog</li>
                    </ul>
                </div>

                {/* Coffee Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide"><Link to="/coffees" className="hover:underline">Coffee</Link></h3>
                    <ul className="space-y-2">
                    <li>Coffee</li>
                    <li>List Menu</li>
                    <li>Order</li>
                    </ul>
                </div>
            </div>
          )} 

          {token && (
            <div>
              <h3 className="text-lg font-semibold mb-4 uppercase tracking-wide">Quick Access</h3>
              <ul className="space-y-2">
                <li><Link to="/customer/dashboard" className="hover:underline">Dashboard</Link></li>
                <li><Link to="/coffees" className="hover:underline">Shop</Link></li>
                <li><Link to="/customer/orders" className="hover:underline">My Orders</Link></li>
                <li><Link to="/customer/profile" className="hover:underline">Profile</Link></li>
              </ul>
            </div>
          )}
        </section>
      </div>

      {/* Footer Bottom */}
      <div className="text-center mt-10 text-sm border-t border-[#5c4f45] pt-4">
        © 2025 <span className="font-semibold">CaféNova</span> | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;