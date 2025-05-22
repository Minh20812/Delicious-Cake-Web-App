import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import ProductEditor from "./ProductEditor";

// Use the Product type from ProductCard to ensure consistency

// Mock data for products with enhanced fields
const mockProducts = [
  {
    id: 1,
    name: "Bánh kem chocolate",
    category: "Bánh sinh nhật",
    price: 350000,
    stock: 10,
    description: "Bánh kem chocolate thơm ngon với lớp kem mịn màng",
    ingredients: "Bột mì, đường, bơ, trứng, chocolate đen, kem tươi",
    specifications: "Đường kính: 20cm, Chiều cao: 10cm, Phục vụ: 8-10 người",
    isBestSeller: true,
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
  },
  {
    id: 2,
    name: "Bánh táo Mỹ",
    category: "Bánh ngọt",
    price: 180000,
    stock: 15,
    description:
      "Bánh táo truyền thống kiểu Mỹ với vỏ giòn và nhân táo thơm ngọt",
    ingredients: "Bột mì, đường, bơ, táo tươi, quế, vani",
    specifications: "Đường kính: 22cm, Chiều cao: 5cm, Phục vụ: 6-8 người",
    image:
      "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    name: "Bánh macaron",
    category: "Bánh nhỏ",
    price: 25000,
    stock: 50,
    description: "Bánh macaron thơm ngon với lớp kem mịn màng",
    ingredients: "Bột mì, đường, bơ, trứng, chocolate đen, kem tươi",
    specifications: "Đường kính: 15cm, Chiều cao: 5cm, Phục vụ: 4-6 người",
    image:
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    name: "Bánh cupcake vanilla",
    category: "Bánh nhỏ",
    price: 35000,
    stock: 25,
    description: "Bánh cupcake vanilla thơm ngon với lớp kem mịn màng",
    ingredients: "Bột mì, đường, bơ, trứng, chocolate đen, kem tươi",
    specifications: "Đường kính: 18cm, Chiều cao: 5cm, Phục vụ: 4-6 người",
    image:
      "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 5,
    name: "Bánh tiramisu",
    category: "Bánh ngọt",
    price: 320000,
    stock: 8,
    description: "Bánh tiramisu thơm ngon với lớp kem mịn màng",
    ingredients: "Bột mì, đường, bơ, trứng, chocolate đen, kem tươi",
    specifications: "Đường kính: 20cm, Chiều cao: 10cm, Phục vụ: 8-10 người",
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
];

export const ProductManagement = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSaveProduct = (product) => {
    if (currentProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === currentProduct.id ? { ...product, id: currentProduct.id } : p
        )
      );
      toast.success("Cập nhật sản phẩm thành công!");
    } else {
      // Add new product
      const newProduct = {
        ...product,
        id:
          products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      };
      setProducts([...products, newProduct]);
      toast.success("Thêm sản phẩm mới thành công!");
    }

    setIsAddDialogOpen(false);
    setCurrentProduct(null);
  };

  const handleAddProduct = () => {
    const newEmptyProduct = {
      id: 0,
      name: "",
      category: "Bánh ngọt",
      price: 0,
      stock: 0,
      image: "",
      description: "",
      ingredients: "",
      specifications: "",
      isBestSeller: false,
      isNew: false,
    };

    setCurrentProduct(null); // Ensure we're in "add" mode
    setIsAddDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsAddDialogOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      setProducts(products.filter((p) => p.id !== productId));
      toast.success("Xóa sản phẩm thành công!");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown/40"
            size={18}
          />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Button
          className="bg-brown text-cream hover:bg-brown/80 flex items-center gap-2"
          onClick={handleAddProduct}
        >
          <Plus size={18} />
          <span>Thêm sản phẩm</span>
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hình ảnh</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead className="text-right">Giá (VNĐ)</TableHead>
              <TableHead className="text-center">Tồn kho</TableHead>
              <TableHead className="text-center">Đặc biệt</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="text-right">
                    {product.price.toLocaleString()}đ
                  </TableCell>
                  <TableCell className="text-center">{product.stock}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {product.isBestSeller && (
                        <Badge
                          variant="secondary"
                          className="bg-gold text-white"
                        >
                          Bán chạy
                        </Badge>
                      )}
                      {product.isNew && (
                        <Badge
                          variant="secondary"
                          className="bg-green-500 text-white"
                        >
                          Mới
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditProduct(product)}
                      >
                        <span className="sr-only">Chỉnh sửa</span>
                        <Edit className="h-4 w-4 text-brown" />
                      </Button>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <span className="sr-only">Xóa</span>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-brown/60"
                >
                  Không tìm thấy sản phẩm nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Product Editor Dialog */}
      <ProductEditor
        product={
          currentProduct || {
            id: 0,
            name: "",
            category: "Bánh ngọt",
            price: 0,
            stock: 0,
            image: "",
            description: "",
            ingredients: "",
            specifications: "",
            isBestSeller: false,
            isNew: false,
          }
        }
        isOpen={isAddDialogOpen}
        onClose={() => {
          setIsAddDialogOpen(false);
          setCurrentProduct(null);
        }}
        onSave={handleSaveProduct}
      />
    </div>
  );
};
