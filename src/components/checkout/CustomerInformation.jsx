import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for cities and districts
const cities = [
  { id: "hcm", name: "TP. Hồ Chí Minh" },
  { id: "hn", name: "Hà Nội" },
  { id: "dn", name: "Đà Nẵng" },
];

const districts = {
  hcm: ["Quận 1", "Quận 3", "Quận 7", "Thủ Đức"],
  hn: ["Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng", "Đống Đa"],
  dn: ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn"],
};

const CustomerInformation = ({ customerInfo, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: customerInfo,
  });

  const selectedCity = watch("city");
  const formValues = watch();

  // Add debouncing to prevent excessive updates
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only submit if there are actual changes
      if (JSON.stringify(formValues) !== JSON.stringify(customerInfo)) {
        onSubmit(formValues);
      }
    }, 500); // Wait 500ms after last change before submitting

    return () => clearTimeout(timer);
  }, [formValues, onSubmit, customerInfo]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-playfair text-xl text-brown mb-6">
        Thông tin giao hàng
      </h2>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              {...register("fullName", { required: "Vui lòng nhập họ tên" })}
              placeholder="Nguyễn Văn A"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              {...register("phone", {
                required: "Vui lòng nhập số điện thoại",
                pattern: {
                  value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
              placeholder="0987654321"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register("email", {
              required: "Vui lòng nhập email",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email không hợp lệ",
              },
            })}
            placeholder="example@email.com"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">
            Địa chỉ <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            {...register("address", { required: "Vui lòng nhập địa chỉ" })}
            placeholder="Số nhà, tên đường, phường/xã"
          />
          {errors.address && (
            <p className="text-sm text-red-500">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">
              Tỉnh/Thành phố <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => {
                setValue("city", value);
                setValue("district", ""); // Reset district when city changes
              }}
              defaultValue={customerInfo.city}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn tỉnh/thành phố" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.city && (
              <p className="text-sm text-red-500">{errors.city.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="district">
              Quận/Huyện <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={(value) => setValue("district", value)}
              defaultValue={customerInfo.district}
              disabled={!selectedCity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn quận/huyện" />
              </SelectTrigger>
              <SelectContent>
                {selectedCity &&
                  districts[selectedCity]?.map((district) => (
                    <SelectItem key={district} value={district}>
                      {district}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            {errors.district && (
              <p className="text-sm text-red-500">{errors.district.message}</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerInformation;
