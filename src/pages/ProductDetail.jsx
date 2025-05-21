import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Share,
  Heart,
  Plus,
  Minus,
  Star,
  ChevronRight,
  Package,
  Truck,
  Clock,
  Calendar,
  Info,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCart } from "@/contexts/CartContext";

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
    isNew: false,
    isBestSeller: true,
    ingredients:
      "Eggs, butter, flour, cocoa powder, Belgian dark chocolate, heavy cream, sugar, vanilla extract",
    nutritionalInfo:
      "Calories: 320 per slice, Fat: 18g, Carbs: 38g, Protein: 4g",
    servingSize: "12-16 slices",
    dimensions: "9-inch round, 4 inches tall",
    storageInstructions:
      "Keep refrigerated. Consume within 3 days for best quality.",
    images: [
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80",
    ],
    stock: 10,
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
    isNew: true,
    isBestSeller: false,
    ingredients:
      "Eggs, butter, flour, sugar, Madagascar bourbon vanilla, milk, baking powder",
    nutritionalInfo:
      "Calories: 290 per slice, Fat: 14g, Carbs: 34g, Protein: 3g",
    servingSize: "12-16 slices",
    dimensions: "9-inch round, 4 inches tall",
    storageInstructions:
      "Keep refrigerated. Consume within 4 days for best quality.",
    images: [
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
      "https://images.unsplash.com/photo-1602630209855-dceac222dcd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    ],
    stock: 15,
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
    isNew: false,
    isBestSeller: true,
    ingredients:
      "Eggs, butter, flour, sugar, fresh strawberries, cream cheese, heavy cream, lemon zest",
    nutritionalInfo:
      "Calories: 280 per slice, Fat: 15g, Carbs: 32g, Protein: 3g",
    servingSize: "12-16 slices",
    dimensions: "9-inch round, 4 inches tall",
    storageInstructions: "Keep refrigerated. Best consumed within 2 days.",
    images: [
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
      "https://images.unsplash.com/photo-1488477304112-4944851de03d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
    ],
    stock: 8,
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
    isNew: true,
    isBestSeller: false,
    ingredients:
      "Eggs, butter, flour, sugar, espresso, caramel, salt, heavy cream",
    nutritionalInfo:
      "Calories: 310 per slice, Fat: 16g, Carbs: 36g, Protein: 4g",
    servingSize: "12-16 slices",
    dimensions: "9-inch round, 4 inches tall",
    storageInstructions:
      "Keep refrigerated. Consume within 3 days for best quality.",
    images: [
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1561087548-94e6d0b35d15?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    ],
    stock: 12,
  },
];

// Related products based on category
const getRelatedProducts = (currentProduct, allProducts) => {
  return allProducts
    .filter(
      (p) =>
        p.category === currentProduct.category && p.id !== currentProduct.id
    )
    .slice(0, 3);
};

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { addToCart } = useCart();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const product = products.find((p) => p.id === parseInt(id || "0"));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
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

  const relatedProducts = getRelatedProducts(product, products);

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });

    toast.success(`${quantity} × ${product.name} đã được thêm vào giỏ hàng`);
  };

  const handleAddToWishlist = () => {
    toast.success(
      `${product.name} đã được thêm vào danh sách yêu thích của bạn`
    );
  };

  const handleShareProduct = () => {
    // In a real app, this would use the Web Share API if available
    toast.success("Đã sao chép đường dẫn sản phẩm vào clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />

      <main className="flex-grow">
        {/* Breadcrumbs - Hidden as per requirements */}
        <div className="bg-white py-2 shadow-sm hidden">
          <div className="container mx-auto">
            <Breadcrumb hidden={true}>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/catalog">Shop</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={`/catalog?category=${product?.category}`}
                  >
                    {product?.category}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <ChevronRight className="h-4 w-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage>{product?.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Product Detail Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Product Gallery - Left Side on Desktop */}
              <div className="w-full lg:w-1/2">
                {/* Mobile Carousel */}
                <div className="block lg:hidden">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {product.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <AspectRatio
                            ratio={1}
                            className="bg-white rounded-lg overflow-hidden"
                          >
                            <img
                              src={image}
                              alt={`${product.name} view ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </AspectRatio>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious className="left-2" />
                    <CarouselNext className="right-2" />
                  </Carousel>
                </div>

                {/* Desktop Gallery */}
                <div className="hidden lg:block">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 gap-3 mt-4">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        className={`aspect-square rounded-md overflow-hidden border-2 ${
                          selectedImage === index
                            ? "border-gold"
                            : "border-transparent"
                        }`}
                        onClick={() => setSelectedImage(index)}
                      >
                        <img
                          src={image}
                          alt={`${product.name} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Info - Right Side on Desktop */}
              <div className="w-full lg:w-1/2">
                <div className="space-y-6">
                  {/* Product Name and Badges */}
                  <div>
                    <div className="flex items-center gap-3">
                      {product.isBestSeller && (
                        <span className="bg-gold text-brown text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          Best Seller
                        </span>
                      )}
                      {product.isNew && (
                        <span className="bg-pink text-brown text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <h1 className="font-playfair text-3xl md:text-4xl text-brown mt-2">
                      {product.name}
                    </h1>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5"
                        fill={i < 4 ? "#E7B10A" : "transparent"}
                        stroke={i < 4 ? "#E7B10A" : "#8E9196"}
                      />
                    ))}
                    <span className="text-sm text-brown/60 ml-2">
                      4.0 (24 reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="text-2xl font-semibold text-brown">
                    ${product.price.toFixed(2)}
                  </div>

                  {/* Short Description */}
                  <div className="prose text-brown/80">
                    <p>{product.description.split(".")[0]}.</p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="pt-4 border-t border-brown/10">
                    <div className="flex items-center space-x-6">
                      <label className="text-brown">Quantity</label>
                      <div className="flex items-center border border-brown/20 rounded-lg">
                        <button
                          onClick={decrementQuantity}
                          className="p-2 text-brown hover:bg-brown/5 transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-1 text-brown min-w-[40px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={incrementQuantity}
                          className="p-2 text-brown hover:bg-brown/5 transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="btn-primary flex-grow flex items-center justify-center gap-2 text-base py-6"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="icon"
                        className="aspect-square h-12 w-12 border-2"
                        onClick={handleAddToWishlist}
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="aspect-square h-12 w-12 border-2"
                        onClick={handleShareProduct}
                      >
                        <Share className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Info Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-brown/10">
                    <div className="flex items-start gap-3">
                      <Package className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-brown">
                          Premium Quality
                        </h4>
                        <p className="text-sm text-brown/70">
                          Made with fresh, high-quality ingredients
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Truck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-brown">
                          Fast Delivery
                        </h4>
                        <p className="text-sm text-brown/70">
                          Order by 3pm for next day delivery
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-brown">Freshly Made</h4>
                        <p className="text-sm text-brown/70">
                          Cakes are baked fresh to order
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-brown">
                          Advance Orders
                        </h4>
                        <p className="text-sm text-brown/70">
                          Book for special occasions in advance
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Add to Cart Bar for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] p-4 lg:hidden z-10">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-brown">
                    {product.name}
                  </p>
                  <p className="text-lg font-semibold text-brown">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <Button className="btn-primary" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Product Details Tabs Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto">
            {/* Desktop Tabs */}
            <div className="hidden md:block">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="specifications">
                    Specifications
                  </TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <div className="mt-8 max-w-3xl mx-auto">
                  <TabsContent
                    value="description"
                    className="prose text-brown/80"
                  >
                    <p>{product.description}</p>
                    <h4>Perfect For</h4>
                    <ul>
                      <li>Birthdays</li>
                      <li>Anniversaries</li>
                      <li>Special celebrations</li>
                      <li>Corporate events</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="ingredients">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Ingredients
                        </h3>
                        <p className="text-brown/70">{product.ingredients}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Allergen Information
                        </h3>
                        <p className="text-brown/70">
                          Contains: Eggs, Dairy, Wheat
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Eggs
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Dairy
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Wheat
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Nutritional Information
                        </h3>
                        <p className="text-brown/70">
                          {product.nutritionalInfo}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="specifications">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Dimensions
                        </h3>
                        <p className="text-brown/70">{product.dimensions}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Serving Size
                        </h3>
                        <p className="text-brown/70">{product.servingSize}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Storage Instructions
                        </h3>
                        <p className="text-brown/70">
                          {product.storageInstructions}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Shelf Life
                        </h3>
                        <p className="text-brown/70">
                          Best enjoyed within 3-4 days of purchase
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="reviews">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-medium text-brown">
                            Customer Reviews
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4"
                                fill={i < 4 ? "#E7B10A" : "transparent"}
                                stroke={i < 4 ? "#E7B10A" : "#8E9196"}
                              />
                            ))}
                            <span className="text-sm text-brown/60 ml-2">
                              Based on 24 reviews
                            </span>
                          </div>
                        </div>
                        <Button variant="outline">Write a Review</Button>
                      </div>

                      {/* Sample Reviews */}
                      <div className="space-y-4">
                        <div className="border-b border-brown/10 pb-4">
                          <div className="flex justify-between">
                            <div>
                              <span className="font-medium text-brown">
                                Sarah J.
                              </span>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-3 h-3"
                                    fill={i < 5 ? "#E7B10A" : "transparent"}
                                    stroke={i < 5 ? "#E7B10A" : "#8E9196"}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-brown/60">
                              3 days ago
                            </span>
                          </div>
                          <p className="text-brown/70 mt-2">
                            Absolutely delicious! The cake was moist and the
                            flavor was incredible. Delivery was on time and the
                            presentation was beautiful.
                          </p>
                        </div>
                        <div className="border-b border-brown/10 pb-4">
                          <div className="flex justify-between">
                            <div>
                              <span className="font-medium text-brown">
                                Michael T.
                              </span>
                              <div className="flex items-center gap-1 mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-3 h-3"
                                    fill={i < 4 ? "#E7B10A" : "transparent"}
                                    stroke={i < 4 ? "#E7B10A" : "#8E9196"}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-brown/60">
                              1 week ago
                            </span>
                          </div>
                          <p className="text-brown/70 mt-2">
                            Ordered this for my wife's birthday and she loved
                            it! The cake was fresh and exactly as described.
                            Would definitely order again.
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>

            {/* Mobile Accordion */}
            <div className="md:hidden">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="description">
                  <AccordionTrigger className="text-brown">
                    Description
                  </AccordionTrigger>
                  <AccordionContent className="prose text-brown/80">
                    <p>{product.description}</p>
                    <h4>Perfect For</h4>
                    <ul>
                      <li>Birthdays</li>
                      <li>Anniversaries</li>
                      <li>Special celebrations</li>
                      <li>Corporate events</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="ingredients">
                  <AccordionTrigger className="text-brown">
                    Ingredients
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Ingredients
                        </h3>
                        <p className="text-brown/70">{product.ingredients}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Allergen Information
                        </h3>
                        <p className="text-brown/70">
                          Contains: Eggs, Dairy, Wheat
                        </p>
                        <div className="flex gap-2 mt-2">
                          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Eggs
                          </span>
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Dairy
                          </span>
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            Wheat
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Nutritional Information
                        </h3>
                        <p className="text-brown/70">
                          {product.nutritionalInfo}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="specifications">
                  <AccordionTrigger className="text-brown">
                    Specifications
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Dimensions
                        </h3>
                        <p className="text-brown/70">{product.dimensions}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Serving Size
                        </h3>
                        <p className="text-brown/70">{product.servingSize}</p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Storage Instructions
                        </h3>
                        <p className="text-brown/70">
                          {product.storageInstructions}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-brown">
                          Shelf Life
                        </h3>
                        <p className="text-brown/70">
                          Best enjoyed within 3-4 days of purchase
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="reviews">
                  <AccordionTrigger className="text-brown">
                    Reviews
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4"
                                fill={i < 4 ? "#E7B10A" : "transparent"}
                                stroke={i < 4 ? "#E7B10A" : "#8E9196"}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-brown/60">
                            Based on 24 reviews
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          Write a Review
                        </Button>
                      </div>

                      {/* Sample Reviews */}
                      <div className="space-y-4">
                        <div className="border-b border-brown/10 pb-4">
                          <div className="flex justify-between">
                            <span className="font-medium text-brown">
                              Sarah J.
                            </span>
                            <span className="text-sm text-brown/60">
                              3 days ago
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3"
                                fill={i < 5 ? "#E7B10A" : "transparent"}
                                stroke={i < 5 ? "#E7B10A" : "#8E9196"}
                              />
                            ))}
                          </div>
                          <p className="text-brown/70 mt-2">
                            Absolutely delicious! The cake was moist and the
                            flavor was incredible.
                          </p>
                        </div>
                        <div className="border-b border-brown/10 pb-4">
                          <div className="flex justify-between">
                            <span className="font-medium text-brown">
                              Michael T.
                            </span>
                            <span className="text-sm text-brown/60">
                              1 week ago
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3"
                                fill={i < 4 ? "#E7B10A" : "transparent"}
                                stroke={i < 4 ? "#E7B10A" : "#8E9196"}
                              />
                            ))}
                          </div>
                          <p className="text-brown/70 mt-2">
                            Ordered this for my wife's birthday and she loved
                            it!
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* You May Also Like Section */}
        <section className="section-padding">
          <div className="container mx-auto">
            <h2 className="font-playfair text-2xl md:text-3xl text-brown mb-6">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  to={`/product/${relatedProduct.id}`}
                  key={relatedProduct.id}
                >
                  <Card className="h-full transition-all hover:shadow-md">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="h-full w-full object-cover transition-all hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-brown">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-brown/70 mt-1">
                        {relatedProduct.category}
                      </p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-semibold text-brown">
                          ${relatedProduct.price.toFixed(2)}
                        </span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white py-12">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-playfair text-2xl md:text-3xl text-brown mb-6 text-center">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    How far in advance should I order?
                  </AccordionTrigger>
                  <AccordionContent>
                    We recommend placing your order at least 48 hours in advance
                    for standard cakes. For custom designs or special occasion
                    cakes, we suggest ordering 5-7 days ahead to ensure we can
                    accommodate your request.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>
                    Do you offer gluten-free or vegan options?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer gluten-free and vegan cake options for most of
                    our flavors. Please specify your dietary requirements when
                    ordering, and our bakers will accommodate your needs.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>
                    How should I store my cake?
                  </AccordionTrigger>
                  <AccordionContent>
                    Our cakes should be refrigerated to maintain freshness.
                    Remove the cake from refrigeration about 30 minutes before
                    serving to allow it to reach room temperature for the best
                    flavor and texture.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Can I add a custom message to my cake?
                  </AccordionTrigger>
                  <AccordionContent>
                    Absolutely! During checkout, you'll have the option to add a
                    custom message that we'll elegantly write on your cake. For
                    more complex customization, please visit our Custom Order
                    page.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
