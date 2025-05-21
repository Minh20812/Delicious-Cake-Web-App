import React, { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminLogin = ({ isOpen, onClose }) => {
  const { setIsAdmin } = useAdmin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Mô phỏng quá trình xác thực (trong thực tế nên sử dụng API)
    setTimeout(() => {
      // Giá trị cứng cho demo, trong thực tế nên sử dụng xác thực thực sự
      if (username === "admin" && password === "admin123") {
        setIsAdmin(true);
        localStorage.setItem("isAdmin", "true");
        toast.success("Đăng nhập admin thành công!");
        onClose();
      } else {
        toast.error("Thông tin đăng nhập không đúng!");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center font-playfair text-2xl text-brown">
            Admin Đăng Nhập
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-brown hover:bg-brown/80 text-cream"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;
