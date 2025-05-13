import React from "react";

const About = () => {
  return (
    <section className="bg-[#FFD6DC]/20 section-padding">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556910096-5cdcc73c1299?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                alt="Baker decorating a cake"
                className="rounded-lg shadow-lg w-full h-[300px] md:h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg max-w-[280px] hidden md:block">
                <p className="text-brown font-medium">
                  "We believe every celebration deserves the perfect cake,
                  crafted with love and attention to detail."
                </p>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <span className="font-dancing text-gold text-2xl">Our Story</span>
            <h2 className="font-playfair text-3xl md:text-4xl text-brown">
              Artistry in Every Slice
            </h2>
            <p className="text-brown/80">
              Founded in 2010, Delicious Cake began as a small family bakery
              with big dreams. Our passion for creating extraordinary cakes that
              not only look stunning but taste amazing has guided us through the
              years.
            </p>
            <p className="text-brown/80">
              Today, we continue to craft each cake with the same care and
              attention to detail, using only the finest ingredients and
              combining traditional baking techniques with innovative designs.
            </p>
            <p className="text-brown/80">
              Our dedicated team of master bakers and cake artists work
              tirelessly to ensure that every creation that leaves our kitchen
              exceeds expectations and makes your special moments even more
              memorable.
            </p>
            <div className="pt-4">
              <img
                src="https://i.imgur.com/qN8xFxm.png"
                alt="Signature"
                className="h-16"
              />
              <p className="font-medium text-brown mt-2">
                Maria Johnson, Founder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
