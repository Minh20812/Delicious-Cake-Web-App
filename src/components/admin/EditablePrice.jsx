import React, { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

const EditablePrice = ({ initialPrice, className, onSave }) => {
  const { isAdmin, isEditMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [price, setPrice] = useState(initialPrice);

  const handleEdit = () => {
    if (isAdmin && isEditMode) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(price);
    }
    toast.success("Giá đã được cập nhật");
  };

  const handleCancel = () => {
    setPrice(initialPrice);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setPrice(value);
    }
  };

  if (isAdmin && isEditMode && isEditing) {
    return (
      <div className="relative group border border-dashed border-brown/40 p-2 rounded-md">
        <div className="flex items-center">
          <span className="mr-1">$</span>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={handleChange}
            className="w-24 p-2 border rounded-md bg-white/80 text-brown"
            autoFocus
          />
        </div>
        <div className="flex space-x-2 mt-2">
          <button
            onClick={handleSave}
            className="bg-brown text-white p-2 rounded-md hover:bg-brown/80 flex items-center text-sm"
          >
            <Check size={16} className="mr-1" />
            Lưu
          </button>
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-400 flex items-center text-sm"
          >
            <X size={16} className="mr-1" />
            Hủy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${className} ${
        isAdmin && isEditMode ? "hover:bg-brown/10 cursor-pointer" : ""
      }`}
      onClick={handleEdit}
    >
      ${price.toFixed(2)}
      {isAdmin && isEditMode && !isEditing && (
        <Pencil size={16} className="inline-block ml-2 text-brown/60" />
      )}
    </div>
  );
};

export default EditablePrice;
