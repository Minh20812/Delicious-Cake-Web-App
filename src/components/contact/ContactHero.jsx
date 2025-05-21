import React from "react";

export const ContactHero = () => {
  return (
    <div className="bg-pink/10 py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-brown mb-4">
            Liên Hệ Với Chúng Tôi
          </h1>
          <p className="text-brown/80 text-lg md:text-xl">
            Chúng tôi rất mong được nghe từ bạn! Dù bạn có câu hỏi, đề xuất hay
            muốn đặt bánh tùy chỉnh, đội ngũ của chúng tôi luôn sẵn sàng hỗ trợ
            và phản hồi trong vòng 24 giờ.
          </p>
        </div>
      </div>
    </div>
  );
};
