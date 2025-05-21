import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CheckoutSummary = ({ cartItems, subtotal, shipping, total }) => {
  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "bakery10") {
      setPromoApplied(true);
      toast.success("Giảm giá 10% đã được áp dụng vào đơn hàng của bạn!");
    } else {
      toast.error("Mã giảm giá bạn nhập không hợp lệ hoặc đã hết hạn.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-playfair text-xl text-brown mb-4">Tổng Đơn Hàng</h2>

      {/* Cart items summary - collapsible */}
      <div className="mb-4">
        <button
          className="flex items-center justify-between w-full text-left mb-2"
          onClick={() => setIsCartExpanded(!isCartExpanded)}
        >
          <span className="text-brown/80">
            Xem chi tiết giỏ hàng ({totalItems} sản phẩm)
          </span>
          {isCartExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isCartExpanded && (
          <div className="border-t border-gray-100 pt-3 space-y-3 max-h-[300px] overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-16 h-16 relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <div className="absolute -top-2 -right-2 bg-brown text-cream w-5 h-5 rounded-full flex items-center justify-center text-xs">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-brown line-clamp-1">
                    {item.name}
                  </p>
                  {item.size && (
                    <p className="text-xs text-brown/70">{item.size}</p>
                  )}
                  <p className="text-sm font-medium text-brown mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order summary calculations */}
      <div className="space-y-3">
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="text-brown/80">
            Tạm tính ({totalItems} sản phẩm)
          </span>
          <span className="font-medium text-brown">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="text-brown/80">Phí giao hàng</span>
          <span className="font-medium text-brown">${shipping.toFixed(2)}</span>
        </div>

        {promoApplied && (
          <div className="flex justify-between border-b border-gray-200 pb-3 text-green-600">
            <span>Giảm giá (10%)</span>
            <span className="font-medium">-${(subtotal * 0.1).toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between pt-2">
          <span className="font-semibold text-lg text-brown">Tổng cộng</span>
          <span className="font-bold text-lg text-brown">
            $
            {promoApplied
              ? (total - subtotal * 0.1).toFixed(2)
              : total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Promo code section */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-brown mb-3">Mã giảm giá</h3>
        <div className="flex space-x-2">
          <Input
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Nhập mã giảm giá"
            className="flex-grow"
          />
          <Button
            onClick={applyPromoCode}
            variant="outline"
            className="border-brown text-brown hover:bg-brown hover:text-cream whitespace-nowrap"
          >
            Áp dụng
          </Button>
        </div>
        {promoApplied && (
          <p className="mt-2 text-sm text-green-600">
            Mã giảm giá đã được áp dụng!
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;
