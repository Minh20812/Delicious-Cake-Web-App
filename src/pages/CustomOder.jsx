import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

const CustomOrder = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cakeType: "birthday",
      size: "medium",
      flavor: "vanilla",
      filling: "cream",
      specialRequests: "",
      deliveryDate: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.success(
      "Đơn hàng tùy chỉnh của bạn đã được gửi! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất."
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Navbar />
      <main className="flex-grow">
        <div className="bg-[#FFD6DC]/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-brown text-center">
              Đặt Bánh Theo Yêu Cầu
            </h1>
            <p className="text-center text-brown/80 mt-4 max-w-2xl mx-auto">
              Tạo chiếc bánh độc đáo cho dịp đặc biệt của bạn. Hãy điền thông
              tin dưới đây và chúng tôi sẽ liên hệ để tư vấn thiết kế bánh phù
              hợp nhất.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-10">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    {...form.register("name", { required: true })}
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm">Vui lòng nhập họ tên</p>
                  )}
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
                    placeholder="example@email.com"
                    type="email"
                    {...form.register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm">
                      Vui lòng nhập email hợp lệ
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="phone"
                    className="block text-brown font-medium"
                  >
                    Số điện thoại
                  </label>
                  <Input
                    id="phone"
                    placeholder="Vui lòng nhập số điện thoại"
                    {...form.register("phone", { required: true })}
                  />
                  {form.formState.errors.phone && (
                    <p className="text-red-500 text-sm">
                      Vui lòng nhập số điện thoại
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="deliveryDate"
                    className="block text-brown font-medium"
                  >
                    Ngày cần bánh
                  </label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    {...form.register("deliveryDate", { required: true })}
                  />
                  {form.formState.errors.deliveryDate && (
                    <p className="text-red-500 text-sm">Vui lòng chọn ngày</p>
                  )}
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="cakeType"
                    className="block text-brown font-medium"
                  >
                    Loại bánh
                  </label>
                  <select
                    id="cakeType"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                    {...form.register("cakeType", { required: true })}
                  >
                    <option value="birthday">Bánh sinh nhật</option>
                    <option value="wedding">Bánh cưới</option>
                    <option value="anniversary">Bánh kỷ niệm</option>
                    <option value="corporate">Bánh cho doanh nghiệp</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="size"
                    className="block text-brown font-medium"
                  >
                    Kích thước
                  </label>
                  <select
                    id="size"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                    {...form.register("size", { required: true })}
                  >
                    <option value="small">Nhỏ (6-8 người)</option>
                    <option value="medium">Vừa (10-15 người)</option>
                    <option value="large">Lớn (15-20 người)</option>
                    <option value="xlarge">Rất lớn (25+ người)</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="flavor"
                    className="block text-brown font-medium"
                  >
                    Hương vị
                  </label>
                  <select
                    id="flavor"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                    {...form.register("flavor", { required: true })}
                  >
                    <option value="vanilla">Vani</option>
                    <option value="chocolate">Socola</option>
                    <option value="strawberry">Dâu tây</option>
                    <option value="coffee">Cà phê</option>
                    <option value="red-velvet">Red Velvet</option>
                    <option value="other">Khác</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label
                    htmlFor="filling"
                    className="block text-brown font-medium"
                  >
                    Nhân bánh
                  </label>
                  <select
                    id="filling"
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                    {...form.register("filling", { required: true })}
                  >
                    <option value="cream">Kem tươi</option>
                    <option value="chocolate-ganache">Socola ganache</option>
                    <option value="fruit">Trái cây tươi</option>
                    <option value="jam">Mứt</option>
                    <option value="custard">Kem trứng</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="specialRequests"
                  className="block text-brown font-medium"
                >
                  Yêu cầu đặc biệt
                </label>
                <Textarea
                  id="specialRequests"
                  placeholder="Mô tả chi tiết yêu cầu của bạn (màu sắc, chủ đề, hình vẽ, chữ trên bánh...)"
                  className="h-40"
                  {...form.register("specialRequests")}
                />
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full md:w-auto bg-brown hover:bg-brown/80 text-cream py-3"
                >
                  Gửi Yêu Cầu
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomOrder;
