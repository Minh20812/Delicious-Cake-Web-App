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
import { Search, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD-001",
    customer: "Nguyễn Văn A",
    date: "2025-05-15",
    total: 720000,
    status: "pending",
    items: [
      { name: "Bánh kem chocolate", quantity: 1, price: 350000 },
      { name: "Bánh macaron", quantity: 10, price: 250000 },
      { name: "Bánh cupcake vanilla", quantity: 3, price: 120000 },
    ],
    address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    phone: "0901234567",
  },
  {
    id: "ORD-002",
    customer: "Trần Thị B",
    date: "2025-05-14",
    total: 500000,
    status: "processing",
    items: [
      { name: "Bánh tiramisu", quantity: 1, price: 320000 },
      { name: "Bánh táo Mỹ", quantity: 1, price: 180000 },
    ],
    address: "456 Đường Nguyễn Huệ, Quận 1, TP.HCM",
    phone: "0909876543",
  },
  {
    id: "ORD-003",
    customer: "Lê Văn C",
    date: "2025-05-13",
    total: 600000,
    status: "completed",
    items: [
      { name: "Bánh kem chocolate", quantity: 1, price: 350000 },
      { name: "Bánh cupcake vanilla", quantity: 5, price: 175000 },
    ],
    address: "789 Đường Lý Tự Trọng, Quận 3, TP.HCM",
    phone: "0912345678",
  },
  {
    id: "ORD-004",
    customer: "Phạm Thị D",
    date: "2025-05-12",
    total: 320000,
    status: "cancelled",
    items: [{ name: "Bánh tiramisu", quantity: 1, price: 320000 }],
    address: "101 Đường Võ Văn Tần, Quận 3, TP.HCM",
    phone: "0987654321",
  },
];

export const OrderManagement = () => {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter orders based on search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
  };

  const getStatusColor = (statu) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const statusTranslations = {
    pending: "Chờ xử lý",
    processing: "Đang xử lý",
    completed: "Đã hoàn thành",
    cancelled: "Đã hủy",
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }

    toast.success(`Cập nhật trạng thái đơn hàng thành công!`);
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full md:w-1/3">
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown/40"
          size={18}
        />
        <Input
          placeholder="Tìm kiếm theo mã đơn hoặc khách hàng..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead className="text-right">Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>
                    {new Date(order.date).toLocaleDateString("vi-VN")}
                  </TableCell>
                  <TableCell className="text-right">
                    {order.total.toLocaleString()}đ
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(order.status)}
                    >
                      {statusTranslations[order.status]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => handleViewOrder(order)}
                      >
                        <span className="sr-only">Xem chi tiết</span>
                        <Eye className="h-4 w-4 text-brown" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-6 text-brown/60"
                >
                  Không tìm thấy đơn hàng nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Order Detail Dialog */}
      {selectedOrder && (
        <Dialog
          open={!!selectedOrder}
          onOpenChange={(open) => !open && setSelectedOrder(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-center font-playfair text-2xl text-brown">
                Chi tiết đơn hàng {selectedOrder.id}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 pt-4">
              <div className="flex flex-wrap gap-y-4">
                <div className="w-full md:w-1/2">
                  <h3 className="font-medium text-brown">
                    Thông tin khách hàng
                  </h3>
                  <p className="text-brown/70">{selectedOrder.customer}</p>
                  <p className="text-brown/70">{selectedOrder.phone}</p>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-medium text-brown">Địa chỉ giao hàng</h3>
                  <p className="text-brown/70">{selectedOrder.address}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-y-4">
                <div className="w-full md:w-1/2">
                  <h3 className="font-medium text-brown">Ngày đặt hàng</h3>
                  <p className="text-brown/70">
                    {new Date(selectedOrder.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-medium text-brown">
                    Trạng thái đơn hàng
                  </h3>
                  <div className="flex items-center gap-4 mt-1">
                    <Select
                      value={selectedOrder.status}
                      onValueChange={(value) =>
                        handleUpdateStatus(selectedOrder.id, value)
                      }
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Chờ xử lý</SelectItem>
                        <SelectItem value="processing">Đang xử lý</SelectItem>
                        <SelectItem value="completed">Đã hoàn thành</SelectItem>
                        <SelectItem value="cancelled">Đã hủy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-brown mb-2">Sản phẩm đã đặt</h3>
                <div className="bg-white rounded border border-gray-200 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sản phẩm</TableHead>
                        <TableHead className="text-right">Đơn giá</TableHead>
                        <TableHead className="text-center">SL</TableHead>
                        <TableHead className="text-right">Thành tiền</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedOrder.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell className="text-right">
                            {item.price.toLocaleString()}đ
                          </TableCell>
                          <TableCell className="text-center">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {(item.price * item.quantity).toLocaleString()}đ
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-right font-medium"
                        >
                          Tổng cộng
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {selectedOrder.total.toLocaleString()}đ
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-brown text-cream hover:bg-brown/80"
                >
                  Đóng
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
