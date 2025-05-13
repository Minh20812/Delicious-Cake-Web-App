import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MinusCircle, PlusCircle, X, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Bánh Red Velvet",
      price: 35.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1586195831800-24f14c992cea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      id: 2,
      name: "Bánh Chocolate Truffle",
      price: 42.5,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
    },
    {
      id: 3,
      name: "Cupcakes Vanilla (6 cái)",
      price: 18.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1603532648955-039310d9ed75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ]);

  const updateQuantity = (id, change) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + change); // Minimum quantity is 1
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const removeItem = (id) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    toast.success("Sản phẩm đã được xóa khỏi giỏ hàng");
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleCheckout = () => {
    toast.success("Đặt hàng thành công! Cảm ơn bạn đã mua hàng.");
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 0 ? 5.99 : 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="font-playfair text-3xl md:text-4xl text-brown mb-8">
            Giỏ Hàng Của Bạn
          </h1>

          {cartItems.length > 0 ? (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#FFD6DC]/10">
                        <tr>
                          <th className="py-4 px-6 text-left text-brown font-medium">
                            Sản phẩm
                          </th>
                          <th className="py-4 px-6 text-center text-brown font-medium">
                            Số lượng
                          </th>
                          <th className="py-4 px-6 text-right text-brown font-medium">
                            Giá
                          </th>
                          <th className="py-4 px-6 text-right text-brown font-medium">
                            Thành tiền
                          </th>
                          <th className="py-4 px-6 text-right text-brown font-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {cartItems.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50">
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-20 w-20 object-cover rounded-md mr-4"
                                />
                                <span className="font-medium text-brown">
                                  {item.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center justify-center">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="text-brown/70 hover:text-brown"
                                >
                                  <MinusCircle size={18} />
                                </button>
                                <span className="mx-3 w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="text-brown/70 hover:text-brown"
                                >
                                  <PlusCircle size={18} />
                                </button>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-right">
                              ${item.price.toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-right font-medium">
                              ${(item.price * item.quantity).toFixed(2)}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-brown/70 hover:text-red-500"
                              >
                                <X size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between">
                  <Button
                    asChild
                    variant="outline"
                    className="mb-4 sm:mb-0 px-6 py-2 border-brown text-brown hover:bg-brown hover:text-cream"
                  >
                    <Link to="/catalog">Tiếp tục mua sắm</Link>
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="w-full lg:w-1/3">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="font-playfair text-xl text-brown mb-4">
                    Tổng Đơn Hàng
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-200 pb-4">
                      <span className="text-brown/80">Tạm tính</span>
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
                        Thanh Toán
                      </Button>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-medium text-brown mb-3">Mã giảm giá</h3>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Nhập mã giảm giá"
                        className="flex-grow"
                      />
                      <Button
                        variant="outline"
                        className="border-brown text-brown hover:bg-brown hover:text-cream"
                      >
                        Áp dụng
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <ShoppingBag size={64} className="text-brown/30" />
                <h2 className="font-playfair text-2xl text-brown mt-4">
                  Giỏ hàng của bạn đang trống
                </h2>
                <p className="text-brown/70 mt-2 mb-6">
                  Hãy thêm một số sản phẩm tuyệt vời vào giỏ hàng và quay lại
                  đây.
                </p>
                <Button
                  asChild
                  className="bg-brown hover:bg-brown/80 text-cream"
                >
                  <Link to="/catalog">Tiếp tục mua sắm</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
