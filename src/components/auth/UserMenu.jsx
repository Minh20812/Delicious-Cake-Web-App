import React from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

const UserMenu = ({ user, onClose }) => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("Đã đăng xuất thành công");
      onClose();
    } catch (error) {
      toast.error("Lỗi khi đăng xuất");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
      >
        ✕
      </button>

      <div className="flex flex-col items-center gap-4">
        {user.photoURL && (
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-20 h-20 rounded-full"
          />
        )}
        <div className="text-center">
          <h2 className="font-serif text-2xl text-brown">{user.displayName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="w-full pt-4 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="w-full py-2 px-4 bg-amber-800 hover:bg-amber-700 text-white rounded-md font-medium cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
