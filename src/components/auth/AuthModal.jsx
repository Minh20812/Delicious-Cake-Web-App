import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "sonner";
import UserMenu from "./UserMenu";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState("signin");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { setIsAdmin } = useAdmin();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Thành công
      toast.success("Đăng nhập thành công!");
      console.log("User Info:", result.user);
      onClose();
    } catch (error) {
      // Xử lý các lỗi cụ thể
      if (error.code === "auth/popup-closed-by-user") {
        toast.error("Đăng nhập bị hủy bởi người dùng");
      } else if (error.code === "auth/popup-blocked") {
        toast.error("Popup bị chặn. Vui lòng cho phép popup và thử lại");
      } else {
        toast.error("Đăng nhập thất bại. Vui lòng thử lại sau");
      }
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;
    const email = form.elements.namedItem("email").value;
    const password = form.elements.namedItem("password").value;

    // Simulate API call with admin check
    setTimeout(() => {
      setIsLoading(false);

      // Check if this is an admin email
      if (email === "admin@example.com" && password === "admin123") {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
        toast.success("Đăng nhập thành công với quyền quản trị!");
      } else {
        // Normal user login success
        toast.success("Đăng nhập thành công!");
      }
      onClose();
    }, 1000);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
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
      toast.success("Hãy kiểm tra email của bạn để đặt lại mật khẩu.");
      onClose();
    }, 1000);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  if (user) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <UserMenu user={user} onClose={onClose} />
      </div>
    );
  }

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
          <form onSubmit={handleSignIn} className="space-y-2">
            <div className="space-y-1">
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
            <div className="space-y-1">
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
              onClick={handleGoogleSignIn}
              className="w-full py-2 px-4 bg-white border border-gray-300 rounded-md font-medium text-brown"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập với Google"}
            </button>
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
          <form onSubmit={handleSignUp} className="space-y-2">
            <div className="space-y-1">
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
            <div className="space-y-1">
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
            <div className="space-y-1">
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
            <div className="space-y-1">
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
              onClick={handleGoogleSignIn}
              className="w-full py-2 px-4 bg-white border-1 border-black text-brown rounded-md font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng ký với Google"}
            </button>
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
          <form onSubmit={handleForgotPassword} className="space-y-2">
            <div className="space-y-1">
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
