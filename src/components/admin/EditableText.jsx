import React, { useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Pencil, Check, X } from "lucide-react";
import { toast } from "sonner";

const EditableText = ({ initialText, className, onSave, as = "p" }) => {
  const { isAdmin, isEditMode } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const Component = as;

  const handleEdit = () => {
    if (isAdmin && isEditMode) {
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    if (onSave) {
      onSave(text);
    }
    toast.success("Nội dung đã được cập nhật");
  };

  const handleCancel = () => {
    setText(initialText);
    setIsEditing(false);
  };

  if (isAdmin && isEditMode && isEditing) {
    return (
      <div className="relative group border border-dashed border-brown/40 p-2 rounded-md">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full min-h-[100px] p-2 border rounded-md bg-white/80 text-brown"
          autoFocus
        />
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
    <Component
      className={`${className} ${
        isAdmin && isEditMode ? "hover:bg-brown/10 cursor-pointer" : ""
      }`}
      onClick={handleEdit}
    >
      {text}
      {isAdmin && isEditMode && !isEditing && (
        <Pencil size={16} className="inline-block ml-2 text-brown/60" />
      )}
    </Component>
  );
};

export default EditableText;
