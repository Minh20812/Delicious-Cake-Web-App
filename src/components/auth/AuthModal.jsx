import React, { useState } from "react";

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Thay vì dùng toast, có thể sử dụng alert hoặc một component thông báo khác
      alert("Đăng nhập thành công!");
      onClose();
    }, 1000);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
      );
      onClose();
    }, 1000);
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Hãy kiểm tra email của bạn để đặt lại mật khẩu.");
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <div className="mb-6">
          <h2 className="text-center font-serif text-2xl text-brown">
            {mode === "signin" && "Đăng Nhập"}
            {mode === "signup" && "Đăng Ký"}
            {mode === "forgot-password" && "Quên Mật Khẩu"}
          </h2>
          <p className="text-center text-gray-600">
            {mode === "signin" && "Đăng nhập để truy cập tài khoản của bạn"}
            {mode === "signup" && "Tạo tài khoản mới để đặt bánh dễ dàng hơn"}
            {mode === "forgot-password" && "Nhập email để đặt lại mật khẩu"}
          </p>
        </div>

        {mode === "signin" && (
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your-email@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="block text-sm font-medium">
                  Mật khẩu
                </label>
                <button
                  type="button"
                  onClick={() => setMode("forgot-password")}
                  className="text-xs text-brown/70 hover:text-brown"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-amber-800 hover:bg-amber-700 text-white rounded-md font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
            <div className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-amber-800 hover:underline font-medium"
              >
                Đăng ký
              </button>
            </div>
          </form>
        )}

        {mode === "signup" && (
          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Họ tên
              </label>
              <input
                id="name"
                type="text"
                placeholder="Họ và tên"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your-email@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-amber-800 hover:bg-amber-700 text-white rounded-md font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký"}
            </button>
            <div className="text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-amber-800 hover:underline font-medium"
              >
                Đăng nhập
              </button>
            </div>
          </form>
        )}

        {mode === "forgot-password" && (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your-email@example.com"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-amber-800 hover:bg-amber-700 text-white rounded-md font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Gửi liên kết đặt lại"}
            </button>
            <div className="text-center text-sm text-gray-600">
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-amber-800 hover:underline font-medium"
              >
                Quay lại đăng nhập
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
