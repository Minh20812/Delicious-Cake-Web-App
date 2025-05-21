import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

const OrderNotes = ({ value, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-playfair text-xl text-brown mb-4">
        Ghi chú đơn hàng
      </h2>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="notes">Ghi chú thêm về đơn hàng</Label>
          <Textarea
            id="notes"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Ví dụ: Thời gian giao hàng cụ thể, hướng dẫn giao hàng, yêu cầu đặc biệt về bánh..."
            className="min-h-[100px]"
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <Label htmlFor="terms" className="text-sm leading-snug">
            Tôi đồng ý với{" "}
            <a href="#" className="text-brown underline">
              điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a href="#" className="text-brown underline">
              chính sách bảo mật
            </a>{" "}
            của Bánh Ngon Bakery
          </Label>
        </div>
      </div>
    </div>
  );
};

export default OrderNotes;
