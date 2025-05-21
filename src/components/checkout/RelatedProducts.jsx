import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RelatedProducts = ({ category }) => {
  // Mock data with product recommendations based on category
  const getProductsByCategory = () => {
    switch (category) {
      case "Bánh sinh nhật":
        return [
          {
            id: 201,
            name: "Nến số (0-9)",
            price: 4.99,
            image:
              "https://images.unsplash.com/photo-1607394527159-5de8225fc43c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          },
          {
            id: 202,
            name: "Pháo bông bánh kem",
            price: 6.99,
            image:
              "https://images.unsplash.com/photo-1575224526797-5730d09d781d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          },
        ];
      case "Bánh chocolate":
        return [
          {
            id: 301,
            name: "Sốt chocolate cao cấp",
            price: 8.99,
            image:
              "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          },
          {
            id: 302,
            name: "Hộp quà kèm bánh",
            price: 12.99,
            image:
              "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          },
        ];
      case "Cupcakes":
        return [
          {
            id: 401,
            name: "Hộp đựng 12 cupcakes",
            price: 7.99,
            image:
              "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          },
          {
            id: 402,
            name: "Toppers trang trí cupcake",
            price: 5.99,
            image:
              "https://images.unsplash.com/photo-1586195831874-80a527cccad0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          },
        ];
      default:
        return [
          {
            id: 101,
            name: "Nến sinh nhật (10 cái)",
            price: 2.99,
            image:
              "https://images.unsplash.com/photo-1578922864601-79ddb7356a69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          },
          {
            id: 102,
            name: "Dao cắt bánh inox",
            price: 9.99,
            image:
              "https://images.unsplash.com/photo-1608500218890-c4f9545fdea7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          },
        ];
    }
  };

  const products = getProductsByCategory();

  const handleAddToCart = (product) => {
    toast.success(`Đã thêm ${product.name} vào giỏ hàng`);
  };

  // Render product item with consistent layout
  const renderProductItem = (product) => (
    <div
      key={product.id}
      className="border border-gray-100 rounded-md p-3 hover:border-gray-200 transition-colors h-full flex flex-col"
    >
      <div className="mb-3 w-full">
        <AspectRatio
          ratio={1 / 1}
          className="bg-gray-100 rounded-md overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </AspectRatio>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium text-sm text-brown line-clamp-2">
          {product.name}
        </h4>
        <div className="flex items-center justify-between">
          <span className="text-brown/80">${product.price.toFixed(2)}</span>
          <Button
            onClick={() => handleAddToCart(product)}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-brown hover:text-brown/70 hover:bg-brown/5"
          >
            <PlusCircle size={18} />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="font-playfair text-lg text-brown mb-4">Sản phẩm đi kèm</h3>

      {/* Desktop view: Carousel */}
      <div className="hidden md:block relative">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-1/2">
                {renderProductItem(product)}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end space-x-2 mt-4">
            <CarouselPrevious className="relative inset-auto h-8 w-8 rounded-full border border-brown text-brown" />
            <CarouselNext className="relative inset-auto h-8 w-8 rounded-full border border-brown text-brown" />
          </div>
        </Carousel>
      </div>

      {/* Mobile view: Grid */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {products.map(renderProductItem)}

        {/* Mobile-only navigation buttons */}
        <div className="mt-4 flex justify-between">
          <Button
            variant="outline"
            className="border-brown text-brown hover:bg-brown/10"
          >
            Quay lại
          </Button>

          <Button className="bg-brown hover:bg-brown/80 text-cream">
            Tiếp tục
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
