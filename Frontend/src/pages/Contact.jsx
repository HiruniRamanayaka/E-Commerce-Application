import React, { useState } from "react";
import logo from "/logo.png";
import { MdEmail, MdPhone } from "react-icons/md";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Contact() {
  const [showMap, setShowMap] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleShowMap = () => setShowMap(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContact = async (e) => {
    e.preventDefault();

    const payload = {
      to: "hiruniramanayaka1@gmail.com", 
      subject: `Message from ${formData.name} (${formData.email})`,
      message: formData.message,
    };

    try {
      const res = await fetch("http://localhost:5000/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message.");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section */}
        <div className="space-y-10">
          {/* Logo + Mission */}
          <div>
            <div className="flex items-center space-x-3">
              <img src={logo} alt="CaféNova Logo" className="h-12 w-auto" />
              <h1 className="text-2xl font-bold text-amber-900">CaféNova</h1>
            </div>
            <p className="text-gray-600 mt-4 max-w-md leading-relaxed">
              We made it our mission to create community every day and grow meaningful,
              lasting relationships with our staff, suppliers, and of course, our customers.
            </p>
          </div>

          {/* Store Locations */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Store Locations</h3>
            <p className="text-gray-600 mb-4">
              Find your nearest CaféNova store with opening hours, location, and contact details.
            </p>
            <button
              onClick={handleShowMap}
              className="text-yellow-600 font-semibold hover:underline"
            >
              FIND MY COFFEE SHOP →
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-10">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-center gap-3">
                <MdEmail className="w-5 h-5 text-yellow-600" />
                CaféNova@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <MdPhone className="w-5 h-5 text-yellow-600" />
                +94 77 123 4567
              </li>
            </ul>
            <div className="flex gap-4 mt-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-600"><FaFacebook size={20} /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-600"><FaInstagram size={20} /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-600"><FaTwitter size={20} /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-yellow-600"><FaLinkedin size={20} /></a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Send Us a Message</h3>
            <form className="space-y-4" onSubmit={handleContact}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-300"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-300"
                required
              />
              <textarea
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-yellow-300"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      {showMap && (
        <div className="mt-12 flex justify-center">
          <iframe
            title="CaféNova Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.7393409342!2d79.786164!3d6.927079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2596c6f6e3e3f%3A0x9e7a8d8e8c8a8e8e!2sCoffeeHouse%20Colombo!5e0!3m2!1sen!2slk!4v1692345678901"
            width="90%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-md"
          ></iframe>
        </div>
      )}
    </section>
  );
}

export default Contact;