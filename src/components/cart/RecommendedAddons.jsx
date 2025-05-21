import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const RecommendedAddons = ({ setCartItems }) => {
  const addons = [
    {
      id: 101,
      name: "Nến sinh nhật (10 cái)",
      price: 2.99,
      image:
        "https://images.unsplash.com/photo-1578922864601-79ddb7356a69?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 102,
      name: "Đèn cầy số (0-9)",
      price: 4.99,
      image:
        "https://images.unsplash.com/photo-1607394527159-5de8225fc43c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      id: 103,
      name: "Dao cắt bánh inox",
      price: 9.99,
      image:
        "https://images.unsplash.com/photo-1608500218890-c4f9545fdea7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ];

  const handleAddToCart = (addon) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === addon.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === addon.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...addon, quantity: 1 }];
      }
    });

    toast.success(`Đã thêm ${addon.name} vào giỏ hàng`);
  };

  // Render addon item with consistent layout
  const renderAddonItem = (addon) => (
    <div
      key={addon.id}
      className="border border-gray-100 rounded-md p-3 hover:border-gray-200 transition-colors h-full flex flex-col"
    >
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 flex-shrink-0">
          <AspectRatio
            ratio={1 / 1}
            className="bg-gray-100 rounded-md overflow-hidden"
          >
            <img
              src={addon.image}
              alt={addon.name}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        </div>

        <div className="flex-1 space-y-2">
          <h4 className="font-medium text-sm text-brown line-clamp-2">
            {addon.name}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-brown/80">${addon.price.toFixed(2)}</span>
            <Button
              onClick={() => handleAddToCart(addon)}
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-brown hover:text-brown/70 hover:bg-brown/5"
            >
              <PlusCircle size={18} />
            </Button>
          </div>
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
            {addons.map((addon) => (
              <CarouselItem key={addon.id} className="basis-1/3">
                {renderAddonItem(addon)}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-end space-x-2 mt-4">
            <CarouselPrevious className="relative inset-auto h-8 w-8 rounded-full border border-brown text-brown" />
            <CarouselNext className="relative inset-auto h-8 w-8 rounded-full border border-brown text-brown" />
          </div>
        </Carousel>
      </div>

      {/* Mobile view: Simple grid */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {addons.map(renderAddonItem)}

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

export default RecommendedAddons;
