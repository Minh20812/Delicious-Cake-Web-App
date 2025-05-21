import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

export const ContactMap = () => {
  // Function to open directions in Google Maps
  const openDirections = () => {
    window.open(
      "https://maps.google.com/?q=123+Bakers+Street+Cakeville",
      "_blank"
    );
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-brown/10">
      <AspectRatio ratio={16 / 9} className="md:aspect-[21/9] lg:aspect-[3/1]">
        {/* This would be replaced with an actual map integration like Google Maps or Mapbox */}
        <div className="w-full h-full bg-pink/10 flex flex-col items-center justify-center p-4 text-center">
          <MapPin className="h-12 w-12 text-gold mb-4" />
          <h3 className="text-lg font-medium text-brown">Delicious Cake</h3>
          <p className="text-brown/80 mb-4">
            123 Bakers Street, Cakeville, CV 98765
          </p>
          <p className="text-brown/70 text-sm max-w-md mb-6">
            Cửa hàng của chúng tôi nằm ở trung tâm thành phố, gần City Mall. Có
            bãi đậu xe miễn phí phía sau tòa nhà.
          </p>
          <Button
            onClick={openDirections}
            className="bg-gold hover:bg-gold/80 text-white"
          >
            <MapPin className="h-4 w-4 mr-2" />
            Chỉ đường
          </Button>
          <p className="text-brown/60 text-sm mt-6">
            * Đây là bản đồ tạm thời. Trong triển khai thực tế, sẽ được thay thế
            bằng Google Maps hoặc Mapbox.
          </p>
        </div>
      </AspectRatio>
    </div>
  );
};
