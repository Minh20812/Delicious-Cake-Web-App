import React, { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

const EditableImage = ({ src, alt, className, onSave }) => {
  const { isAdmin, isEditMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [tempSrc, setTempSrc] = useState(src);

  const handleEdit = () => {
    if (isAdmin && isEditMode) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setImageSrc(tempSrc);
    setIsEditing(false);
    if (onSave) {
      onSave(tempSrc);
    }
    toast.success("Hình ảnh đã được cập nhật");
  };

  const handleCancel = () => {
    setTempSrc(imageSrc);
    setIsEditing(false);
  };

  if (isAdmin && isEditMode && isEditing) {
    return (
      <div className="relative group border border-dashed border-brown/40 p-2 rounded-md">
        <input
          type="text"
          value={tempSrc}
          onChange={(e) => setTempSrc(e.target.value)}
          className="w-full p-2 mb-2 border rounded-md bg-white/80 text-brown"
          placeholder="URL hình ảnh"
          autoFocus
        />
        {tempSrc && (
          <div className="mb-2 max-h-60 overflow-hidden">
            <img
              src={tempSrc}
              alt="Xem trước"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        )}
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
      className={`relative ${
        isAdmin && isEditMode ? "cursor-pointer group" : ""
      }`}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={className}
        onClick={handleEdit}
      />
      {isAdmin && isEditMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
          <Pencil size={24} className="text-white" />
        </div>
      )}
    </div>
  );
};

export default EditableImage;
