import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../ui/ProductCard";

const featuredProducts = [
  {
    id: 1,
    name: "Chocolate Indulgence",
    description:
      "Rich layers of chocolate sponge filled with ganache and covered in smooth chocolate frosting.",
    price: 65.99,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
    category: "Chocolate",
  },
  {
    id: 2,
    name: "Vanilla Dream",
    description:
      "Light and fluffy vanilla sponge with layers of vanilla bean buttercream.",
    price: 55.99,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
    category: "Vanilla",
  },
  {
    id: 3,
    name: "Strawberry Bliss",
    description:
      "Delicate sponge with fresh strawberry compote and cream cheese frosting.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    category: "Fruit",
  },
  {
    id: 4,
    name: "Caramel Macchiato",
    description:
      "Coffee-infused sponge with salted caramel layers and espresso buttercream.",
    price: 62.99,
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "Coffee",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="bg-[#FFF9E6] section-padding">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="font-dancing text-gold text-2xl">Our Selection</span>
          <h2 className="font-playfair text-3xl md:text-4xl text-brown mt-2">
            Featured Cakes
          </h2>
          <p className="text-brown/70 max-w-xl mx-auto mt-4">
            Discover our most popular handcrafted cakes, made with premium
            ingredients and baked with love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/catalog" className="btn-outline">
            View All Cakes
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
