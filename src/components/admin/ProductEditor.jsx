import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, X } from "lucide-react";
import { toast } from "sonner";

const ProductEditor = ({ product, isOpen, onClose, onSave }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (field, value) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCheckboxChange = (field, checked) => {
    setEditedProduct((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Giả lập thời gian lưu
    setTimeout(() => {
      onSave(editedProduct);
      toast.success("Sản phẩm đã được cập nhật thành công!");
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center font-playfair text-2xl text-brown">
            {product.id ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên sản phẩm</Label>
            <Input
              id="name"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
              placeholder={product.name}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
              rows={3}
              placeholder={product.description}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Giá (VNĐ)</Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={editedProduct.price}
              onChange={handleChange}
              placeholder={product.price?.toString() || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Số lượng tồn kho</Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              min="0"
              value={editedProduct.stock}
              onChange={handleChange}
              placeholder={product.stock?.toString() || ""}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL hình ảnh</Label>
            <Input
              id="image"
              name="image"
              value={editedProduct.image}
              onChange={handleChange}
              placeholder={product.image}
            />
            {editedProduct.image && (
              <div className="mt-2 border rounded-md p-2">
                <img
                  src={editedProduct.image}
                  alt="Product preview"
                  className="h-40 object-cover rounded-md mx-auto"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Danh mục</Label>
            <Select
              value={editedProduct.category}
              onValueChange={(value) => handleSelectChange("category", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={product.category} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chocolate">Chocolate</SelectItem>
                <SelectItem value="Vanilla">Vanilla</SelectItem>
                <SelectItem value="Fruit">Fruit</SelectItem>
                <SelectItem value="Coffee">Coffee</SelectItem>
                <SelectItem value="Specialty">Specialty</SelectItem>
                <SelectItem value="Bánh sinh nhật">Bánh sinh nhật</SelectItem>
                <SelectItem value="Bánh ngọt">Bánh ngọt</SelectItem>
                <SelectItem value="Bánh nhỏ">Bánh nhỏ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="ingredients">Nguyên liệu</Label>
            <Textarea
              id="ingredients"
              name="ingredients"
              value={editedProduct.ingredients || ""}
              onChange={handleChange}
              placeholder={
                product.ingredients ||
                "Danh sách nguyên liệu, phân cách bằng dấu phẩy"
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specifications">Thông số kỹ thuật</Label>
            <Textarea
              id="specifications"
              name="specifications"
              value={editedProduct.specifications || ""}
              onChange={handleChange}
              placeholder={
                product.specifications ||
                "Kích thước, trọng lượng, số người dùng, v.v."
              }
              rows={3}
            />
          </div>

          {/* Các tùy chọn khác như Best Seller, New */}
          <div className="flex flex-wrap space-x-6">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isBestSeller"
                checked={!!editedProduct.isBestSeller}
                onChange={(e) =>
                  handleCheckboxChange("isBestSeller", e.target.checked)
                }
                className="h-4 w-4"
              />
              <Label htmlFor="isBestSeller">Sản phẩm bán chạy</Label>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isNew"
                checked={!!editedProduct.isNew}
                onChange={(e) =>
                  handleCheckboxChange("isNew", e.target.checked)
                }
                className="h-4 w-4"
              />
              <Label htmlFor="isNew">Sản phẩm mới</Label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-brown hover:bg-brown/80 text-cream"
              disabled={isLoading}
            >
              {isLoading ? (
                "Đang lưu..."
              ) : (
                <>
                  <Check size={18} className="mr-2" />
                  Lưu thay đổi
                </>
              )}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              <X size={18} className="mr-2" />
              Hủy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductEditor;
