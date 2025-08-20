import React from 'react';
import { Coffee, Users, Clock, Heart, Star, Calendar, ChevronRight, MapPin } from 'lucide-react';
import logo from "/logo.png"; 
import HighlightedMenu from "../components/HighlightedMenu";

const AboutUs = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
      {/* Main Content */}
      <main>
        {/* Hero Image */}
        <section className="relative h-96 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&h=400&fit=crop&crop=center" 
            alt="Coffee shop interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4">Welcome to Our Story</h2>
              <p className="text-xl">Where every cup tells a tale...</p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
                <div className="w-24 h-1 bg-amber-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-12 items-center">
                <div className="lg:col-span-2">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Born from Passion</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Founded in 2018 by coffee enthusiasts Maria and James, Brew & Bean started as a small neighborhood cafe with a big dream: to bring exceptional coffee experiences to our community.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      What began as a modest 20-seat cafe has grown into a beloved local institution, serving over 1,000 customers daily with the same passion and attention to quality that inspired our founding.
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-amber-600 pb-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Downtown District</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>Est. 2018</span>
                      </div>
                    </div>
                    <img 
                        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop&crop=center" 
                        alt="Coffee beans and brewing equipment" 
                        className="w-full h-48 object-cover rounded-2xl shadow-xl"
                    />
                  </div>
                    
                </div>
                
                <div className="space-y-6">
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-3">
                      <Coffee className="h-6 w-6 text-amber-600 mr-3" />
                      <h4 className="font-semibold text-gray-800">Premium Quality</h4>
                    </div>
                    <p className="text-gray-600 text-sm">We source our beans directly from sustainable farms worldwide</p>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-3">
                      <Heart className="h-6 w-6 text-amber-600 mr-3" />
                      <h4 className="font-semibold text-gray-800">Community First</h4>
                    </div>
                    <p className="text-gray-600 text-sm">Building connections one cup at a time in our neighborhood</p>
                  </div>
                  
                  <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-3">
                      <Star className="h-6 w-6 text-amber-600 mr-3" />
                      <h4 className="font-semibold text-gray-800">Artisan Craftsmanship</h4>
                    </div>
                    <p className="text-gray-600 text-sm">Every drink is crafted with skill, precision, and love</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section */}
        <HighlightedMenu />
        {/* News Section */}

        {/* Team Section */}

        {/* Blog Section */}
        
      </main>
    </div>
  );
};

export default AboutUs;