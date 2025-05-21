import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search, User } from "lucide-react";
import SearchBar from "./SearchBar";
import AuthModal from "../auth/AuthModal";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAdmin } from "@/contexts/AdminContext";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const { isAdmin, isEditMode, toggleEditMode } = useAdmin();
  const { cart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className="bg-[#FFF9E6] border-b border-brown/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img
              src="/logoicon1.png"
              alt="Delicious Cake Logo"
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
            <div className="flex flex-col md:flex-row items-start md:items-center gap-0 md:gap-1">
              <span className="font-dancing text-2xl md:text-3xl lg:text-4xl text-brown">
                Delicious
              </span>
              <span className="font-dancing text-2xl md:text-3xl lg:text-4xl text-pink-dark">
                Cake
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-brown hover:text-gold transition-colors"
            >
              Home
            </Link>
            <Link
              to="/catalog"
              className="text-brown hover:text-gold transition-colors"
            >
              Shop
            </Link>
            <Link
              to="/custom"
              className="text-brown hover:text-gold transition-colors"
            >
              Custom Order
            </Link>
            <Link
              to="/about"
              className="text-brown hover:text-gold transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-brown hover:text-gold transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="text-brown hover:text-gold transition-colors"
            >
              Blog
            </Link>
          </div>

          {/* Search, Cart, Account and Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSearch}
              className="text-brown hover:text-gold transition-colors"
              aria-label="Search"
            >
              <Search size={24} />
            </button>
            <Link
              to="/cart"
              className="text-brown hover:text-gold transition-colors"
            >
              <ShoppingCart size={24} />
            </Link>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="text-brown hover:text-gold transition-colors cursor-pointer"
              aria-label="Account"
            >
              {user ? (
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <User size={24} />
              )}
            </button>
            <button className="md:hidden text-brown" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFF9E6] border-t border-brown/10 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="flex flex-col space-y-4 py-4">
              <Link
                to="/"
                className="text-brown hover:text-gold transition-colors py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/catalog"
                className="text-brown hover:text-gold transition-colors py-2"
                onClick={toggleMenu}
              >
                Shop
              </Link>
              <Link
                to="/custom"
                className="text-brown hover:text-gold transition-colors py-2"
                onClick={toggleMenu}
              >
                Custom Order
              </Link>
              <Link
                to="/about"
                className="text-brown hover:text-gold transition-colors py-2"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-brown hover:text-gold transition-colors py-2"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                to="/blog"
                className="block text-brown hover:text-gold transition-colors py-2"
                onClick={toggleMobileMenu}
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
