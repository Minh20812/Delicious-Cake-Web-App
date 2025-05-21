import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MessageSquare } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const ContactForm = () => {
  const [inquiryType, setInquiryType] = useState < InquiryType > "general";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success(
      "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi trong thời gian sớm nhất."
    );

    // Reset form
    e.currentTarget.reset();
    setInquiryType("general");
    setIsSubmitting(false);
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <MessageSquare className="h-6 w-6 text-gold mr-3" />
        <h2 className="font-playfair text-2xl md:text-3xl text-brown">
          Gửi Tin Nhắn
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-sm border border-brown/10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-brown">
              Họ tên
            </Label>
            <Input
              id="fullName"
              placeholder="Vui lòng nhập họ tên"
              required
              className="border-brown/20 focus-visible:ring-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-brown">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              required
              className="border-brown/20 focus-visible:ring-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-brown">
              Số điện thoại (tùy chọn)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(+84) xxx-xxx-xxx"
              className="border-brown/20 focus-visible:ring-gold"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inquiryType" className="text-brown">
              Loại yêu cầu
            </Label>
            <Select
              onValueChange={(value) => setInquiryType(value)}
              defaultValue="general"
            >
              <SelectTrigger className="border-brown/20 focus-visible:ring-gold">
                <SelectValue placeholder="Chọn loại yêu cầu" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="general">Câu hỏi chung</SelectItem>
                  <SelectItem value="custom-cake">
                    Đặt bánh tùy chỉnh
                  </SelectItem>
                  <SelectItem value="feedback">Phản hồi về đơn hàng</SelectItem>
                  <SelectItem value="catering">
                    Đặt hàng số lượng lớn
                  </SelectItem>
                  <SelectItem value="career">Tuyển dụng</SelectItem>
                  <SelectItem value="partnership">
                    Hợp tác kinh doanh
                  </SelectItem>
                  <SelectItem value="press">Báo chí/Truyền thông</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {inquiryType === "feedback" && (
          <div className="space-y-2">
            <Label htmlFor="orderNumber" className="text-brown">
              Mã đơn hàng
            </Label>
            <Input
              id="orderNumber"
              placeholder="VD: DC-12345"
              className="border-brown/20 focus-visible:ring-gold"
            />
          </div>
        )}

        {inquiryType === "custom-cake" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="occasion" className="text-brown">
                Dịp đặc biệt
              </Label>
              <Input
                id="occasion"
                placeholder="VD: Sinh nhật, Kỷ niệm..."
                className="border-brown/20 focus-visible:ring-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateNeeded" className="text-brown">
                Ngày cần bánh
              </Label>
              <Input
                id="dateNeeded"
                type="date"
                className="border-brown/20 focus-visible:ring-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="servings" className="text-brown">
                Số lượng người
              </Label>
              <Input
                id="servings"
                type="number"
                placeholder="10"
                min="1"
                className="border-brown/20 focus-visible:ring-gold"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flavor" className="text-brown">
                Hương vị yêu thích
              </Label>
              <Input
                id="flavor"
                placeholder="VD: Socola, Vani..."
                className="border-brown/20 focus-visible:ring-gold"
              />
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="message" className="text-brown">
            Tin nhắn
          </Label>
          <Textarea
            id="message"
            placeholder="Vui lòng nhập nội dung tin nhắn"
            className="h-40 border-brown/20 focus-visible:ring-gold"
            required
          />
        </div>

        <div className="flex items-start space-x-2">
          <Checkbox
            id="privacy"
            className="mt-1 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
            required
          />
          <Label htmlFor="privacy" className="text-sm text-brown/80">
            Tôi đồng ý với việc Delicious Cake lưu trữ thông tin của tôi để phản
            hồi yêu cầu này. Thông tin của bạn sẽ không được sử dụng cho mục
            đích nào khác.
          </Label>
        </div>

        <Button
          type="submit"
          className="bg-brown hover:bg-brown/80 text-cream w-full md:w-auto"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang gửi..." : "Gửi Tin Nhắn"}
        </Button>
      </form>
    </div>
  );
};
