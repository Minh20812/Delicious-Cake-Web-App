import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-[#FFF9E6] py-12 lg:py-20">
      <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row items-center">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 lg:pr-8 space-y-6 mb-8 lg:mb-0">
          <span className="font-dancing text-gold text-2xl md:text-3xl">
            Handcrafted with love
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-brown leading-tight">
            Artisanal Cakes for Your Special Moments
          </h1>
          <p className="text-brown/80 text-lg md:text-xl max-w-lg">
            Indulge in our premium, handcrafted cakes made with the finest
            ingredients for celebrations that deserve to be remembered.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/catalog" className="btn-primary">
              Shop Now
            </Link>
            <Link to="/custom" className="btn-outline">
              Custom Order
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80"
              alt="Delicious cake on display"
              className="w-full h-[400px] md:h-[500px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden md:block">
            <div className="bg-[#FFD6DC] p-6 rounded-full shadow-lg">
              <p className="font-dancing text-brown text-2xl">
                Made Fresh Daily
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-4 w-24 h-24 rounded-full bg-[#FFCB47]/20 -z-10 hidden lg:block"></div>
      <div className="absolute bottom-12 right-8 w-40 h-40 rounded-full bg-[#FFD6DC]/20 -z-10 hidden lg:block"></div>
    </section>
  );
};

export default Hero;
