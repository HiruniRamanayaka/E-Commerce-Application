import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api";

function Team() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api
      .get('/employees')
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error("Error fetching employees: ", err));
  }, []);

  return (
    <section className="py-10 bg-white/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto rounded-full"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Our passionate coffee experts bring flavor, warmth, and craft to every cup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-10">
          {employees.map((person) => (
            <div
              key={person._id}
              className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-64 object-cover rounded-t-2xl"
              />
              <div className="p-6">
                <h3 className="font-semibold text-xl text-gray-800">{person.name}</h3>
                <p className="text-yellow-600 font-medium mb-2">{person.speciality}</p>
                <p className="text-gray-600 text-sm mb-1">
                  <strong>Experience:</strong> {person.experience}
                </p>
                <p className="text-gray-600 text-sm">
                  <strong>Position:</strong> {person.position}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;