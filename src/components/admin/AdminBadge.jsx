import React from "react";
import { useAdmin } from "@/contexts/AdminContext";

const AdminBadge = () => {
  const { isAdmin } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className="fixed top-4 left-4 z-50 bg-brown text-cream text-xs px-2 py-1 rounded-full shadow-lg">
      Admin Mode
    </div>
  );
};

export default AdminBadge;
