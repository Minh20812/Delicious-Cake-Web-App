import React, { useState, useEffect } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/ui/ProductCard";
import { Menu, ChevronDown, FilterIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";

// Sample products data with additional flags
// const products = [
//   {
//     id: 1,
//     name: "Chocolate Indulgence",
//     description:
//       "Rich layers of chocolate sponge filled with ganache and covered in smooth chocolate frosting.",
//     price: 65.99,
//     image:
//       "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
//     category: "Chocolate",
//     isBestSeller: true,
//     isNew: false,
//   },
//   {
//     id: 2,
//     name: "Vanilla Dream",
//     description:
//       "Light and fluffy vanilla sponge with layers of vanilla bean buttercream.",
//     price: 55.99,
//     image:
//       "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
//     category: "Vanilla",
//     isBestSeller: true,
//     isNew: false,
//   },
//   {
//     id: 3,
//     name: "Strawberry Bliss",
//     description:
//       "Delicate sponge with fresh strawberry compote and cream cheese frosting.",
//     price: 59.99,
//     image:
//       "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
//     category: "Fruit",
//     isBestSeller: false,
//     isNew: true,
//   },
//   {
//     id: 4,
//     name: "Caramel Macchiato",
//     description:
//       "Coffee-infused sponge with salted caramel layers and espresso buttercream.",
//     price: 62.99,
//     image:
//       "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//     category: "Coffee",
//     isBestSeller: false,
//     isNew: true,
//   },
//   {
//     id: 5,
//     name: "Red Velvet",
//     description:
//       "Classic red velvet cake with cream cheese frosting, a perfect balance of cocoa and vanilla.",
//     price: 58.99,
//     image:
//       "https://images.unsplash.com/photo-1586788680434-30d324edf8d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//     category: "Specialty",
//     isBestSeller: true,
//     isNew: false,
//   },
//   {
//     id: 6,
//     name: "Lemon Zest",
//     description:
//       "Light lemon sponge with lemon curd and cream cheese frosting, topped with candied lemon.",
//     price: 56.99,
//     image:
//       "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=786&q=80",
//     category: "Fruit",
//     isBestSeller: false,
//     isNew: false,
//   },
//   {
//     id: 7,
//     name: "Tiramisu Cake",
//     description:
//       "Coffee-soaked layers with mascarpone cream and cocoa dusting.",
//     price: 64.99,
//     image:
//       "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
//     category: "Coffee",
//     isBestSeller: false,
//     isNew: true,
//   },
//   {
//     id: 8,
//     name: "Black Forest",
//     description:
//       "Chocolate sponge with cherries, cherry syrup, and whipped cream.",
//     price: 67.99,
//     image:
//       "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1203&q=80",
//     category: "Chocolate",
//     isBestSeller: true,
//     isNew: false,
//   },
//   {
//     id: 9,
//     name: "Chocolate Indulgence",
//     description:
//       "Rich layers of chocolate sponge filled with ganache and covered in smooth chocolate frosting.",
//     price: 65.99,
//     image:
//       "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
//     category: "Chocolate",
//     isBestSeller: true,
//     isNew: false,
//   },
//   {
//     id: 10,
//     name: "Vanilla Dream",
//     description:
//       "Light and fluffy vanilla sponge with layers of vanilla bean buttercream.",
//     price: 55.99,
//     image:
//       "https://images.unsplash.com/photo-1621303837174-89787a7d4729?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80",
//     category: "Vanilla",
//     isBestSeller: true,
//     isNew: false,
//   },
//   {
//     id: 11,
//     name: "Strawberry Bliss",
//     description:
//       "Delicate sponge with fresh strawberry compote and cream cheese frosting.",
//     price: 59.99,
//     image:
//       "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
//     category: "Fruit",
//     isBestSeller: false,
//     isNew: true,
//   },
//   {
//     id: 12,
//     name: "Caramel Macchiato",
//     description:
//       "Coffee-infused sponge with salted caramel layers and espresso buttercream.",
//     price: 62.99,
//     image:
//       "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//     category: "Coffee",
//     isBestSeller: false,
//     isNew: true,
//   },
//   {
//     id: 13,
//     name: "Red Velvet",
//     description:
//       "Classic red velvet cake with cream cheese frosting, a perfect balance of cocoa and vanilla.",
//     price: 58.99,
//     image:
//       "https://images.unsplash.com/photo-1586788680434-30d324edf8d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//     category: "Specialty",
//     isBestSeller: true,
//     isNew: false,
//   },
//   {
//     id: 14,
//     name: "Lemon Zest",
//     description:
//       "Light lemon sponge with lemon curd and cream cheese frosting, topped with candied lemon.",
//     price: 56.99,
//     image:
//       "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=786&q=80",
//     category: "Fruit",
//     isBestSeller: false,
//     isNew: false,
//   },
//   {
//     id: 15,
//     name: "Tiramisu Cake",
//     description:
//       "Coffee-soaked layers with mascarpone cream and cocoa dusting.",
//     price: 64.99,
//     image:
//       "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
//     category: "Coffee",
//     isBestSeller: false,
//     isNew: true,
//   },
//   {
//     id: 16,
//     name: "Black Forest",
//     description:
//       "Chocolate sponge with cherries, cherry syrup, and whipped cream.",
//     price: 67.99,
//     image:
//       "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1203&q=80",
//     category: "Chocolate",
//     isBestSeller: true,
//     isNew: false,
//   },
// ];

// Category options
// const categories = [
//   "All",
//   "Chocolate",
//   "Vanilla",
//   "Fruit",
//   "Coffee",
//   "Specialty",
// ];

const ProductCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsSnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch categories
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        const fetchedCategories = [
          "All",
          ...categoriesSnapshot.docs.map((doc) => doc.data().name),
        ];

        setAllProducts(fetchedProducts);
        setCategories(fetchedCategories);
        filterProducts(
          selectedCategory,
          sortOption,
          searchParams.get("search") || "",
          fetchedProducts
        );
      } catch (error) {
        console.error("Error fetching data:", error);
        // Set default values if fetch fails
        setAllProducts([]);
        setCategories(["All"]);
        setFilteredProducts([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    filterProducts(
      selectedCategory,
      sortOption,
      searchParams.get("search") || "",
      allProducts
    );
  }, [searchParams, selectedCategory, sortOption]);

  const filterProducts = (
    category,
    sort,
    search,
    productsSource = allProducts
  ) => {
    let result =
      category === "All"
        ? [...productsSource]
        : productsSource.filter((product) => product.category === category);

    if (search && search.trim() !== "") {
      const searchLower = search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
      );
    }

    switch (sort) {
      case "bestSeller":
        result = result.filter((product) => product.isBestSeller);
        break;
      case "new":
        result = result.filter((product) => product.isNew);
        break;
      case "lowToHigh":
        result = result.sort((a, b) => a.price - b.price);
        break;
      case "highToLow":
        result = result.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(
      category,
      sortOption,
      searchParams.get("search") || undefined
    );
  };

  // Handle sort option selection
  const handleSortChange = (value) => {
    setSortOption(value);
    filterProducts(
      selectedCategory,
      value,
      searchParams.get("search") || undefined
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-cream">
        {/* Page Header */}
        <section className="bg-pink/20 py-12">
          <div className="container mx-auto text-center">
            <h1 className="font-playfair text-4xl md:text-5xl text-brown">
              Our Cakes
            </h1>
            <p className="text-brown/70 mt-4 max-w-2xl mx-auto">
              Browse our selection of handcrafted cakes, made with premium
              ingredients and baked fresh daily.
            </p>
          </div>
        </section>

        {/* Product Catalog */}
        <section className="section-padding">
          <div className="container mx-auto">
            {/* Mobile Filters Toggle */}
            <div className="md:hidden mb-6">
              <button
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className="w-full flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-brown/10"
              >
                <span className="flex items-center">
                  <Menu size={18} className="mr-2" />
                  <span>Filters</span>
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform ${
                    isFiltersOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isFiltersOpen && (
                <div className="mt-2 bg-white p-4 rounded-lg shadow-sm border border-brown/10 animate-fade-in">
                  <div className="mb-4">
                    <h3 className="font-medium text-brown mb-3">Sort By</h3>
                    <Select value={sortOption} onValueChange={handleSortChange}>
                      <SelectTrigger className="w-full border-brown/20 focus:ring-brown">
                        <SelectValue placeholder="Sort by..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default</SelectItem>
                        <SelectItem value="bestSeller">Best Sellers</SelectItem>
                        <SelectItem value="new">New Arrivals</SelectItem>
                        <SelectItem value="lowToHigh">
                          Price: Low to High
                        </SelectItem>
                        <SelectItem value="highToLow">
                          Price: High to Low
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <h3 className="font-medium text-brown mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`block w-full text-left px-4 py-2 rounded-md ${
                          selectedCategory === category
                            ? "bg-brown text-cream"
                            : "text-brown hover:bg-brown/5"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Active filters display */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== "All" && (
                <Badge
                  variant="outline"
                  className="bg-cream text-brown border-brown/20 px-3 py-1"
                >
                  Category: {selectedCategory}
                </Badge>
              )}
              {sortOption !== "default" && (
                <Badge
                  variant="outline"
                  className="bg-cream text-brown border-brown/20 px-3 py-1"
                >
                  {sortOption === "bestSeller" && "Best Sellers"}
                  {sortOption === "new" && "New Arrivals"}
                  {sortOption === "lowToHigh" && "Price: Low to High"}
                  {sortOption === "highToLow" && "Price: High to Low"}
                </Badge>
              )}
              {searchParams.get("search") && (
                <Badge
                  variant="outline"
                  className="bg-cream text-brown border-brown/20 px-3 py-1"
                >
                  Search: {searchParams.get("search")}
                </Badge>
              )}
            </div>

            <div className="flex flex-col md:flex-row">
              {/* Desktop Filters Sidebar */}
              <div className="hidden md:block w-64 flex-shrink-0 pr-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-brown/10 sticky top-24">
                  <div className="mb-6">
                    <h3 className="font-playfair text-xl text-brown mb-4">
                      Sort By
                    </h3>
                    <div className="space-y-2">
                      <Select
                        value={sortOption}
                        onValueChange={handleSortChange}
                      >
                        <SelectTrigger className="w-full border-brown/20 focus:ring-brown">
                          <SelectValue placeholder="Sort by..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="default">Default</SelectItem>
                          <SelectItem value="bestSeller">
                            Best Sellers
                          </SelectItem>
                          <SelectItem value="new">New Arrivals</SelectItem>
                          <SelectItem value="lowToHigh">
                            Price: Low to High
                          </SelectItem>
                          <SelectItem value="highToLow">
                            Price: High to Low
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl text-brown mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`block w-full text-left px-4 py-2 rounded-md ${
                          selectedCategory === category
                            ? "bg-brown text-cream"
                            : "text-brown hover:bg-brown/5"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-grow">
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <FilterIcon className="inline-block mb-3 text-brown/40 h-12 w-12" />
                    <p className="text-brown/70 text-lg">
                      No products found with the selected filters.
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory("All");
                        setSortOption("default");
                        setSearchParams({});
                      }}
                      className="mt-4 text-brown underline hover:text-brown/70"
                    >
                      Clear all filters
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                      {filteredProducts.map((product) => (
                        <div key={product.id} className="relative">
                          {product.isBestSeller && (
                            <div className="absolute top-3 right-3 z-10">
                              <Badge className="bg-brown text-cream">
                                <img
                                  src="/bestseller1.png"
                                  alt="Delicious Cake icon for best seller"
                                  className="w-6 h-6 object-contain"
                                />
                                Best Seller
                              </Badge>
                            </div>
                          )}
                          {product.isNew && (
                            <div className="absolute top-3 left-3 z-10">
                              <Badge className="bg-pink text-brown font-semibold">
                                <img
                                  src="/new3.png"
                                  alt="Delicious Cake icon for best seller"
                                  className="w-6 h-6 object-contain"
                                />
                                New
                              </Badge>
                            </div>
                          )}
                          <ProductCard product={product} />
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 text-center text-brown/60 text-sm">
                      Showing {filteredProducts.length} of {allProducts.length}{" "}
                      products
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductCatalog;
