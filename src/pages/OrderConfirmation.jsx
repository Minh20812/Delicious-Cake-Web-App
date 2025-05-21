import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Clock } from "lucide-react";

const OrderConfirmation = () => {
  // Mock order data
  const orderData = {
    id: "ODR12345678",
    date: new Date().toLocaleDateString("vi-VN"),
    total: 102.47,
    items: 3,
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <h1 className="font-playfair text-3xl text-brown mb-4">
              Đặt hàng thành công!
            </h1>
            <p className="text-brown/70 mb-6">
              Cảm ơn bạn đã đặt hàng tại Bakery của chúng tôi. Chúng tôi sẽ sớm
              xử lý đơn hàng của bạn.
            </p>

            <div className="border-t border-b border-gray-100 py-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-brown/60 text-sm">Mã đơn hàng</p>
                  <p className="font-medium text-lg text-brown">
                    {orderData.id}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-brown/60 text-sm">Ngày đặt</p>
                  <p className="font-medium text-lg text-brown">
                    {orderData.date}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-brown/60 text-sm">Tổng cộng</p>
                  <p className="font-medium text-lg text-brown">
                    ${orderData.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-center justify-center gap-3 text-brown">
                <Package size={20} />
                <span>Đơn hàng của bạn đang được xử lý</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-brown">
                <Clock size={20} />
                <span>Bạn sẽ nhận được email xác nhận trong vòng 30 phút</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-brown hover:bg-brown/80 text-cream">
                <Link to="/catalog">Tiếp tục mua sắm</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-brown text-brown hover:bg-brown/5"
              >
                <Link to="/">Trang chủ</Link>
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-brown/70 mb-2">Bạn có thắc mắc về đơn hàng?</p>
            <p className="text-brown mb-4">
              Liên hệ với chúng tôi qua email{" "}
              <a
                href="mailto:support@bakery.com"
                className="text-brown font-medium underline"
              >
                support@bakery.com
              </a>
              hoặc gọi{" "}
              <a
                href="tel:+84123456789"
                className="text-brown font-medium underline"
              >
                +84 123 456 789
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderConfirmation;
