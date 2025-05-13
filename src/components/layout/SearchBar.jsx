import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      onClose();
      setSearchQuery("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start pt-20 justify-center animate-fade-in">
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg w-full max-w-3xl mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-playfair text-xl text-brown">
            Tìm kiếm sản phẩm
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-brown hover:text-brown/70"
          >
            <X size={24} />
          </Button>
        </div>

        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nhập từ khóa tìm kiếm..."
            className="pr-12"
            autoFocus
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-1 top-1 bg-brown hover:bg-brown/80 text-cream"
          >
            <Search size={18} />
          </Button>
        </form>

        <div className="mt-6">
          <h3 className="text-sm font-medium text-brown mb-2">
            Tìm kiếm phổ biến:
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("Bánh sinh nhật");
                navigate("/catalog?search=Bánh sinh nhật");
                onClose();
              }}
              className="border-brown/30 text-brown hover:bg-brown/10"
            >
              Bánh sinh nhật
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("Bánh socola");
                navigate("/catalog?search=Bánh socola");
                onClose();
              }}
              className="border-brown/30 text-brown hover:bg-brown/10"
            >
              Bánh socola
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("Cupcake");
                navigate("/catalog?search=Cupcake");
                onClose();
              }}
              className="border-brown/30 text-brown hover:bg-brown/10"
            >
              Cupcake
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("Bánh cưới");
                navigate("/catalog?search=Bánh cưới");
                onClose();
              }}
              className="border-brown/30 text-brown hover:bg-brown/10"
            >
              Bánh cưới
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
