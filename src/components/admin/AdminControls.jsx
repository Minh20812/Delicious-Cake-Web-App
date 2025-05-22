import React from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Settings, LogOut, LayoutDashboard } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const AdminControls = () => {
  const { isAdmin, isEditMode, toggleEditMode, setIsAdmin } = useAdmin();

  if (!isAdmin) return null;

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
    toast.success("Đã đăng xuất khỏi tài khoản admin");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <Link
        to="/admin"
        className="w-12 h-12 bg-brown text-cream rounded-full shadow-lg flex items-center justify-center"
        title="Đến trang quản trị"
      >
        <LayoutDashboard size={24} />
      </Link>

      <button
        onClick={toggleEditMode}
        className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center ${
          isEditMode ? "bg-gold text-brown" : "bg-brown text-cream"
        }`}
        title={isEditMode ? "Tắt chế độ chỉnh sửa" : "Bật chế độ chỉnh sửa"}
      >
        <Settings size={24} />
      </button>

      <button
        onClick={handleLogout}
        className="w-12 h-12 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center"
        title="Đăng xuất"
      >
        <LogOut size={24} />
      </button>

      {isEditMode && (
        <div className="absolute right-14 bottom-12 bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium text-brown whitespace-nowrap">
          Đang ở chế độ chỉnh sửa
        </div>
      )}
    </div>
  );
};

export default AdminControls;
