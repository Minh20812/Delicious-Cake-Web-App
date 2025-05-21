import React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Wallet, Building, Info } from "lucide-react";

const PaymentMethod = ({ selected, onChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-playfair text-xl text-brown mb-6">
        Phương thức thanh toán
      </h2>

      <RadioGroup value={selected} onValueChange={onChange}>
        <div className="space-y-4">
          {/* Momo Payment */}
          <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4 hover:bg-gray-50">
            <RadioGroupItem value="momo" id="momo" />
            <Label
              htmlFor="momo"
              className="flex flex-1 items-center cursor-pointer"
            >
              <div className="w-10 h-10 bg-pink-500 rounded-md flex items-center justify-center mr-3 text-white font-bold">
                M
              </div>
              <div>
                <div className="font-medium text-brown">MoMo</div>
                <div className="text-sm text-brown/70">
                  Thanh toán qua ví điện tử MoMo
                </div>
              </div>
            </Label>
          </div>

          {/* VNPAY Payment */}
          <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4 hover:bg-gray-50">
            <RadioGroupItem value="vnpay" id="vnpay" />
            <Label
              htmlFor="vnpay"
              className="flex flex-1 items-center cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center mr-3 text-white font-bold">
                VN
              </div>
              <div>
                <div className="font-medium text-brown">VNPAY</div>
                <div className="text-sm text-brown/70">
                  Thanh toán qua VNPAY QR
                </div>
              </div>
            </Label>
          </div>

          {/* Credit Card Payment */}
          <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4 hover:bg-gray-50">
            <RadioGroupItem value="card" id="card" />
            <Label
              htmlFor="card"
              className="flex flex-1 items-center cursor-pointer"
            >
              <div className="w-10 h-10 rounded-md flex items-center justify-center mr-3 text-brown">
                <CreditCard size={24} />
              </div>
              <div>
                <div className="font-medium text-brown">
                  Thẻ tín dụng / ghi nợ
                </div>
                <div className="text-sm text-brown/70">
                  Visa, Mastercard, JCB
                </div>
              </div>
            </Label>
          </div>

          {/* Digital Wallet Payment */}
          <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4 hover:bg-gray-50">
            <RadioGroupItem value="wallet" id="wallet" />
            <Label
              htmlFor="wallet"
              className="flex flex-1 items-center cursor-pointer"
            >
              <div className="w-10 h-10 rounded-md flex items-center justify-center mr-3 text-brown">
                <Wallet size={24} />
              </div>
              <div>
                <div className="font-medium text-brown">Ví điện tử</div>
                <div className="text-sm text-brown/70">ZaloPay, ShopeePay</div>
              </div>
            </Label>
          </div>

          {/* Bank Transfer Payment */}
          <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-4 hover:bg-gray-50">
            <RadioGroupItem value="bank" id="bank" />
            <Label
              htmlFor="bank"
              className="flex flex-1 items-center cursor-pointer"
            >
              <div className="w-10 h-10 rounded-md flex items-center justify-center mr-3 text-brown">
                <Building size={24} />
              </div>
              <div>
                <div className="font-medium text-brown">
                  Chuyển khoản ngân hàng
                </div>
                <div className="text-sm text-brown/70">
                  Chuyển khoản thủ công
                </div>
              </div>
            </Label>
          </div>
        </div>
      </RadioGroup>

      {selected === "bank" && (
        <div className="mt-4 p-4 bg-cream rounded-md">
          <div className="flex items-start gap-3">
            <Info size={18} className="text-brown mt-0.5" />
            <div>
              <h4 className="font-medium text-brown">
                Thông tin chuyển khoản:
              </h4>
              <div className="mt-2 space-y-1 text-sm text-brown/80">
                <p>
                  Ngân hàng: <span className="font-medium">VIETCOMBANK</span>
                </p>
                <p>
                  Số tài khoản: <span className="font-medium">1234567890</span>
                </p>
                <p>
                  Tên tài khoản:{" "}
                  <span className="font-medium">CÔNG TY TNHH BAKERY</span>
                </p>
                <p className="italic mt-2">
                  Nội dung:{" "}
                  <span className="font-medium">
                    [Họ tên] thanh toán đơn hàng
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
