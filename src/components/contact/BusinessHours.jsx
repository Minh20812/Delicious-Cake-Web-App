import React from "react";
import { Clock } from "lucide-react";

export const BusinessHours = () => {
  const isOpen = () => {
    // Check if the store is currently open based on day and time
    const now = new Date();
    const day = now.getDay(); // 0 is Sunday, 1 is Monday, etc.
    const hours = now.getHours();

    // Store is closed on Sunday (day 0)
    if (day === 0) return false;

    // Store hours: Monday-Friday 8AM-6PM, Saturday 9AM-5PM
    if (day >= 1 && day <= 5) {
      return hours >= 8 && hours < 18;
    } else if (day === 6) {
      // Saturday
      return hours >= 9 && hours < 17;
    }

    return false;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-brown/10">
      <div className="flex items-start space-x-4 mb-4">
        <Clock className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
        <h3 className="font-medium text-brown">Giờ làm việc:</h3>
      </div>

      <div className="ml-10">
        <div className="flex justify-between py-1">
          <span className="text-brown">Thứ Hai - Thứ Sáu:</span>
          <span className="text-brown/80">8:00 AM - 6:00 PM</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-brown">Thứ Bảy:</span>
          <span className="text-brown/80">9:00 AM - 5:00 PM</span>
        </div>
        <div className="flex justify-between py-1">
          <span className="text-brown">Chủ Nhật:</span>
          <span className="text-brown/80">Đóng cửa</span>
        </div>

        <div className="mt-4 pt-3 border-t border-brown/10">
          <div className="flex items-center">
            <span className="mr-2 text-brown">Trạng thái:</span>
            {isOpen() ? (
              <span className="inline-flex items-center text-green-600">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Đang mở cửa
              </span>
            ) : (
              <span className="inline-flex items-center text-red-500">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Đã đóng cửa
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
