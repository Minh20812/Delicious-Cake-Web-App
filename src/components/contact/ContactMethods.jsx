import React from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const ContactMethods = () => {
  return (
    <div className="space-y-8 mb-8">
      <h2 className="font-playfair text-2xl md:text-3xl text-brown mb-6">
        Thông Tin Liên Hệ
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-brown/10">
        <div className="flex items-start space-x-4">
          <Phone className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-brown">Điện thoại:</h3>
            <p className="text-brown/80">
              <a
                href="tel:+84555123456"
                className="hover:text-gold transition-colors"
              >
                (+84) 555 123-456
              </a>
            </p>
            <p className="text-brown/60 text-sm mt-1">
              Giờ hỗ trợ: 8:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-brown/10">
        <div className="flex items-start space-x-4">
          <Mail className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-brown">Email:</h3>
            <p className="text-brown/80">
              <a
                href="mailto:info@deliciouscake.com"
                className="hover:text-gold transition-colors"
              >
                info@deliciouscake.com
              </a>
            </p>
            <p className="text-brown/60 text-sm mt-1">
              Phản hồi trong vòng 24 giờ
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-brown/10">
        <div className="flex items-start space-x-4">
          <MapPin className="h-6 w-6 text-gold flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-brown">Địa chỉ:</h3>
            <p className="text-brown/80">
              123 Bakers Street, Cakeville, CV 98765
            </p>
            <p className="text-brown/60 text-sm mt-1">
              Gần trung tâm thương mại City Mall
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
