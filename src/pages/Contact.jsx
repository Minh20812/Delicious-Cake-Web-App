import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(
      "Tin nhắn của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi trong thời gian sớm nhất."
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-[#FFD6DC]/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-brown text-center">
              Liên Hệ
            </h1>
            <p className="text-center text-brown/80 mt-4 max-w-2xl mx-auto">
              Hãy kết nối với chúng tôi! Chúng tôi luôn sẵn sàng lắng nghe ý
              kiến và phản hồi của bạn.
            </p>
          </div>
        </div>

        {/* Contact Form and Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Form */}
              <div className="w-full lg:w-1/2">
                <h2 className="font-playfair text-2xl text-brown mb-6">
                  Gửi Tin Nhắn
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label
                      htmlFor="name"
                      className="block text-brown font-medium"
                    >
                      Họ tên
                    </label>
                    <Input
                      id="name"
                      placeholder="Vui lòng nhập họ tên"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="email"
                      className="block text-brown font-medium"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="subject"
                      className="block text-brown font-medium"
                    >
                      Chủ đề
                    </label>
                    <Input
                      id="subject"
                      placeholder="Tiêu đề tin nhắn của bạn"
                      required
                    />
                  </div>
                  <div className="space-y-3">
                    <label
                      htmlFor="message"
                      className="block text-brown font-medium"
                    >
                      Tin nhắn
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Vui lòng nhập nội dung tin nhắn"
                      className="h-40"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-brown hover:bg-brown/80 text-cream"
                  >
                    Gửi Tin Nhắn
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <h2 className="font-playfair text-2xl text-brown mb-6">
                    Thông Tin Liên Hệ
                  </h2>
                  <p className="text-brown/80 mb-8">
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ bằng một
                    trong những cách dưới đây.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-brown">Địa chỉ:</h3>
                      <p className="text-brown/80">
                        123 Bakers Street, Cakeville, CV 98765
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Mail className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-brown">Email:</h3>
                      <p className="text-brown/80">info@deliciouscake.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Phone className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-brown">Điện thoại:</h3>
                      <p className="text-brown/80">(555) 123-4567</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <Clock className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-brown">Giờ làm việc:</h3>
                      <p className="text-brown/80">
                        Thứ Hai - Thứ Sáu: 8:00 AM - 6:00 PM
                      </p>
                      <p className="text-brown/80">
                        Thứ Bảy: 9:00 AM - 5:00 PM
                      </p>
                      <p className="text-brown/80">Chủ Nhật: Đóng cửa</p>
                    </div>
                  </div>
                </div>

                {/* Social Media Links */}
                <div>
                  <h3 className="font-medium text-brown mb-3">
                    Theo dõi chúng tôi:
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="text-brown hover:text-gold transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-brown hover:text-gold transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="2"
                          y="2"
                          width="20"
                          height="20"
                          rx="5"
                          ry="5"
                        ></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                    <a
                      href="#"
                      className="text-brown hover:text-gold transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M8 12l8-8v16l-8-8z"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="pb-16">
          <div className="container mx-auto px-4">
            <h2 className="font-playfair text-2xl text-brown mb-6">
              Vị Trí Cửa Hàng
            </h2>
            <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden">
              {/* Replace this div with an actual map integration if needed */}
              <div className="w-full h-full flex items-center justify-center bg-[#FFD6DC]/10">
                <p className="text-brown">
                  Bản đồ vị trí cửa hàng sẽ được hiển thị ở đây
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
