import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-[#FFD6DC]/10 py-12">
          <div className="container mx-auto px-4">
            <h1 className="font-playfair text-3xl md:text-4xl lg:text-5xl text-brown text-center">
              Về Chúng Tôi
            </h1>
            <p className="text-center text-brown/80 mt-4 max-w-2xl mx-auto">
              Khám phá câu chuyện đằng sau Delicious Cake - nơi mỗi chiếc bánh
              là một tác phẩm nghệ thuật tạo nên từ niềm đam mê và sự tỉ mỉ.
            </p>
          </div>
        </div>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1607478900766-efe13248b125?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80"
                  alt="Our bakery shop"
                  className="w-full h-[400px] object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <span className="font-dancing text-gold text-2xl">
                  Câu Chuyện Của Chúng Tôi
                </span>
                <h2 className="font-playfair text-3xl text-brown">
                  Từ Niềm Đam Mê Đến Thương Hiệu
                </h2>
                <p className="text-brown/80">
                  Delicious Cake được thành lập vào năm 2010 bởi Maria Johnson,
                  một người đam mê bánh ngọt với ước mơ mang đến những chiếc
                  bánh ngọt chất lượng cao, làm thủ công cho mọi dịp đặc biệt.
                </p>
                <p className="text-brown/80">
                  Ban đầu là một tiệm bánh nhỏ chỉ phục vụ khu phố, chúng tôi đã
                  dần phát triển thành một thương hiệu bánh được yêu thích với
                  nhiều chi nhánh, nhờ vào sự ủng hộ của khách hàng và cam kết
                  về chất lượng không ngừng nghỉ.
                </p>
                <p className="text-brown/80">
                  Ngày nay, chúng tôi tự hào được phục vụ hàng ngàn khách hàng
                  mỗi tháng, từ những bữa tiệc sinh nhật nhỏ đến những đám cưới
                  sang trọng và sự kiện doanh nghiệp lớn. Mỗi chiếc bánh rời
                  khỏi lò đều được làm với tình yêu và sự tỉ mỉ.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="bg-[#FFF9E6] py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="font-dancing text-gold text-2xl">
                Giá Trị Cốt Lõi
              </span>
              <h2 className="font-playfair text-3xl text-brown mt-2">
                Điều Làm Nên Delicious Cake
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[#FFD6DC]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-brown"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl text-brown mb-3">
                  Chất Lượng
                </h3>
                <p className="text-brown/80">
                  Chúng tôi chỉ sử dụng những nguyên liệu tươi ngon nhất, không
                  chất bảo quản và phụ gia nhân tạo để tạo ra những chiếc bánh
                  thuần khiết và ngon miệng.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[#FFD6DC]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-brown"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl text-brown mb-3">
                  Tình Yêu
                </h3>
                <p className="text-brown/80">
                  Mỗi chiếc bánh được làm với niềm đam mê và sự chăm sóc tỉ mỉ.
                  Chúng tôi luôn đặt tâm huyết vào từng sản phẩm như làm cho gia
                  đình mình.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-[#FFD6DC]/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-brown"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-playfair text-xl text-brown mb-3">
                  Đúng Hẹn
                </h3>
                <p className="text-brown/80">
                  Chúng tôi hiểu rằng thời gian là quan trọng, đặc biệt là cho
                  những dịp đặc biệt. Vì vậy, chúng tôi cam kết giao hàng đúng
                  hẹn, mọi lúc.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="font-dancing text-gold text-2xl">
                Đội Ngũ Của Chúng Tôi
              </span>
              <h2 className="font-playfair text-3xl text-brown mt-2">
                Những Nghệ Nhân Phía Sau Mỗi Chiếc Bánh
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                    alt="Maria Johnson - Founder"
                    className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="font-playfair text-xl text-brown">
                  Maria Johnson
                </h3>
                <p className="text-brown/80">Người Sáng Lập</p>
              </div>
              <div className="text-center">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt="David Chen - Head Chef"
                    className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="font-playfair text-xl text-brown">David Chen</h3>
                <p className="text-brown/80">Bếp Trưởng</p>
              </div>
              <div className="text-center">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                    alt="Michael Rodriguez - Cake Designer"
                    className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="font-playfair text-xl text-brown">
                  Michael Rodriguez
                </h3>
                <p className="text-brown/80">Thiết Kế Bánh</p>
              </div>
              <div className="text-center">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src="https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                    alt="Sophie Kim - Pastry Chef"
                    className="w-full h-72 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <h3 className="font-playfair text-xl text-brown">Sophie Kim</h3>
                <p className="text-brown/80">Đầu Bếp Bánh Ngọt</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
