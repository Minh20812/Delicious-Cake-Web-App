import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

// Sample products data
const products = [
  {
    id: 1,
    name: "Chocolate Indulgence",
    description:
      "Rich layers of chocolate sponge filled with ganache and covered in smooth chocolate frosting. Made with premium Belgian chocolate and fresh cream for an unforgettable taste experience. Perfect for chocolate lovers and special celebrations.",
    price: 65.99,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
    category: "Chocolate",
  },
  {
    id: 2,
    name: "Vanilla Dream",
    description:
      "Light and fluffy vanilla sponge with layers of vanilla bean buttercream. Made with Madagascar bourbon vanilla and farm-fresh eggs for a rich flavor profile. Elegantly simple yet irresistibly delicious.",
    price: 55.99,
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
    category: "Vanilla",
  },
  {
    id: 3,
    name: "Strawberry Bliss",
    description:
      "Delicate sponge with fresh strawberry compote and cream cheese frosting. Made with locally sourced seasonal strawberries for the most vibrant flavor. The perfect balance of sweetness and tang.",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    category: "Fruit",
  },
  {
    id: 4,
    name: "Caramel Macchiato",
    description:
      "Coffee-infused sponge with salted caramel layers and espresso buttercream. Made with freshly brewed espresso and homemade caramel sauce for coffee enthusiasts and dessert lovers alike.",
    price: 62.99,
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    category: "Coffee",
  },
];

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === parseInt(id || "0"));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col font-poppins">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-playfair text-brown">
              Product Not Found
            </h1>
            <p className="text-brown/70 mt-2">
              The product you're looking for doesn't exist.
            </p>
            <Link to="/catalog" className="mt-6 inline-block btn-primary">
              Back to Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-[#FFF9E6]">
        <section className="section-padding">
          <div className="container mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm text-brown/60 mb-6">
              <Link to="/" className="hover:text-brown">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link to="/catalog" className="hover:text-brown">
                Shop
              </Link>
              <span className="mx-2">/</span>
              <span className="text-brown">{product.name}</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Product Image */}
              <div className="w-full lg:w-1/2">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="w-full lg:w-1/2">
                <div className="sticky top-24 space-y-6">
                  <div className="border-l-4 border-gold pl-4">
                    <span className="text-brown/70">{product.category}</span>
                    <h1 className="font-playfair text-3xl md:text-4xl text-brown mt-1">
                      {product.name}
                    </h1>
                  </div>

                  <div className="text-2xl font-semibold text-brown">
                    ${product.price.toFixed(2)}
                  </div>

                  <div className="prose text-brown/80">
                    <p>{product.description}</p>
                  </div>

                  <div className="pt-4 border-t border-brown/10">
                    <div className="flex items-center space-x-6">
                      <label className="text-brown">Quantity</label>
                      <div className="flex items-center border border-brown/20 rounded-lg">
                        <button
                          onClick={decrementQuantity}
                          className="px-3 py-1 text-brown hover:bg-brown/5 transition"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 text-brown min-w-[30px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={incrementQuantity}
                          className="px-3 py-1 text-brown hover:bg-brown/5 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="btn-primary flex-grow">
                      Add to Cart
                    </button>
                    <Link
                      to="/custom"
                      className="btn-outline flex-grow text-center"
                    >
                      Customize
                    </Link>
                  </div>

                  <div className="pt-6 border-t border-brown/10">
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gold flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                          />
                        </svg>
                        <p className="text-sm text-brown/70">
                          Made fresh daily with premium ingredients
                        </p>
                      </div>
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gold flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                          />
                        </svg>
                        <p className="text-sm text-brown/70">
                          Order by 3pm for next day delivery
                        </p>
                      </div>
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gold flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-sm text-brown/70">
                          100% satisfaction guarantee
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
