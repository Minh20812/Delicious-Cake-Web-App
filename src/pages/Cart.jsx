import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { MinusCircle, PlusCircle, X, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.info("Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán");
      return;
    }

    navigate("/checkout");
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
    toast.success("Sản phẩm đã được xóa khỏi giỏ hàng");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-playfair text-3xl text-brown mb-8">
            Giỏ hàng của bạn
          </h1>

          {cart.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-24 sm:h-24 mb-4 sm:mb-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-cover rounded-md"
                          />
                        </div>

                        <div className="flex-1 sm:ml-6">
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <div className="mb-4 md:mb-0">
                              <p className="font-medium text-lg text-brown">
                                {item.name}
                              </p>
                            </div>

                            <div className="flex flex-row items-center justify-between md:flex-col md:items-end">
                              <div className="flex items-center gap-3 order-1 md:order-2 md:mt-3">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.id,
                                      item.quantity - 1
                                    )
                                  }
                                  className="text-brown/70 hover:text-brown transition-colors"
                                  aria-label="Giảm số lượng"
                                >
                                  <MinusCircle size={18} />
                                </button>
                                <span className="w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="text-brown/70 hover:text-brown transition-colors"
                                  aria-label="Tăng số lượng"
                                >
                                  <PlusCircle size={18} />
                                </button>
                              </div>

                              <div className="order-2 md:order-1">
                                <div className="text-right">
                                  <span className="font-medium text-brown">
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </span>
                                  <span className="block text-xs text-brown/60">
                                    ${item.price.toFixed(2)} / cái
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-brown/40 hover:text-red-500 transition-colors absolute top-6 right-6 md:relative md:top-auto md:right-auto md:mt-3"
                                aria-label="Xóa sản phẩm"
                              >
                                <X size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* "Continue shopping" button */}
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    className="px-6 py-2 border-brown text-brown hover:bg-brown hover:text-cream"
                  >
                    <Link to="/catalog">Tiếp tục mua sắm</Link>
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-1/3 mt-8 lg:mt-0">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="font-playfair text-xl text-brown mb-4">
                    Tổng đơn hàng
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="text-brown/80">
                        Tạm tính (
                        {cart.reduce((acc, item) => acc + item.quantity, 0)} sản
                        phẩm)
                      </span>
                      <span className="font-medium text-brown">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="text-brown/80">Phí giao hàng</span>
                      <span className="font-medium text-brown">
                        ${shipping.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2">
                      <span className="font-medium text-lg text-brown">
                        Tổng cộng
                      </span>
                      <span className="font-bold text-lg text-brown">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-brown hover:bg-brown/80 text-cream py-3"
                      >
                        Tiến hành thanh toán
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 bg-brown/5 rounded-full flex items-center justify-center">
                  <ShoppingBag size={32} className="text-brown/30" />
                </div>
                <h2 className="font-playfair text-2xl text-brown mt-2">
                  Giỏ hàng của bạn đang trống
                </h2>
                <p className="text-brown/70 mt-1 mb-6 max-w-md mx-auto">
                  Hãy thêm một số sản phẩm tuyệt vời vào giỏ hàng và quay lại
                  đây để hoàn tất đơn hàng.
                </p>
                <Button
                  asChild
                  className="bg-brown hover:bg-brown/80 text-cream"
                >
                  <Link to="/catalog">Khám phá các sản phẩm của chúng tôi</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Mobile Sticky Footer for Checkout */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_10px_rgba(0,0,0,0.05)] p-4 md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-brown">Tổng cộng:</span>
            <span className="font-bold text-brown">${total.toFixed(2)}</span>
          </div>
          <Button
            onClick={handleCheckout}
            className="w-full bg-brown hover:bg-brown/80 text-cream"
          >
            Tiến hành thanh toán
          </Button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;
