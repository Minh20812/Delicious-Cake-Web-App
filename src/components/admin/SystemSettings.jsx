import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Check,
  Save,
  X,
  Database,
  Users,
  Globe,
  Bell,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

const SystemSettings = ({ open, onOpenChange }) => {
  // Settings state
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [language, setLanguage] = useState("vi");
  const [currency, setCurrency] = useState("vnd");
  const [siteTitle, setSiteTitle] = useState("Bánh Ngon Bakery");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSaveSettings = () => {
    toast.success("Các thay đổi của bạn đã được lưu thành công");

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-brown">
            Cài đặt hệ thống
          </DialogTitle>
          <DialogDescription>
            Điều chỉnh các cài đặt cho hệ thống quản lý Bánh Ngon Bakery
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full mt-4">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="general">Chung</TabsTrigger>
            <TabsTrigger value="store">Cửa hàng</TabsTrigger>
            <TabsTrigger value="users">Người dùng</TabsTrigger>
            <TabsTrigger value="advanced">Nâng cao</TabsTrigger>
          </TabsList>

          {/* General Settings Tab */}
          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base" htmlFor="dark-mode">
                    Chế độ tối
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Bật chế độ tối cho giao diện
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base" htmlFor="notifications">
                    Thông báo
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Nhận thông báo về đơn hàng mới
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base" htmlFor="auto-save">
                    Tự động lưu
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Tự động lưu thay đổi sản phẩm
                  </p>
                </div>
                <Switch
                  id="auto-save"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>

              <div className="space-y-2">
                <Label>Ngôn ngữ</Label>
                <ToggleGroup
                  type="single"
                  value={language}
                  onValueChange={(value) => {
                    if (value) setLanguage(value);
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="vi">Tiếng Việt</ToggleGroupItem>
                  <ToggleGroupItem value="en">English</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-2">
                <Label>Đơn vị tiền tệ</Label>
                <ToggleGroup
                  type="single"
                  value={currency}
                  onValueChange={(value) => {
                    if (value) setCurrency(value);
                  }}
                  className="justify-start"
                >
                  <ToggleGroupItem value="vnd">VND</ToggleGroupItem>
                  <ToggleGroupItem value="usd">USD</ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </TabsContent>

          {/* Store Settings Tab */}
          <TabsContent value="store" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site-title">Tên cửa hàng</Label>
                <Input
                  id="site-title"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-email">Email liên hệ</Label>
                <Input
                  id="store-email"
                  type="email"
                  placeholder="contact@banhngonbakery.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-phone">Số điện thoại</Label>
                <Input id="store-phone" placeholder="0987654321" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-address">Địa chỉ</Label>
                <Input
                  id="store-address"
                  placeholder="123 Nguyễn Văn Linh, Quận 7, TP. Hồ Chí Minh"
                />
              </div>
            </div>
          </TabsContent>

          {/* Users Settings Tab */}
          <TabsContent value="users" className="space-y-4">
            <p className="text-muted-foreground mb-4">
              Quản lý cài đặt cho tài khoản người dùng và phân quyền
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Cho phép đăng ký</Label>
                  <p className="text-sm text-muted-foreground">
                    Cho phép người dùng đăng ký tài khoản mới
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">Xác thực email</Label>
                  <p className="text-sm text-muted-foreground">
                    Yêu cầu xác thực email khi đăng ký
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base">
                    Đăng nhập bằng mạng xã hội
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Cho phép đăng nhập bằng Google, Facebook
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </TabsContent>

          {/* Advanced Settings Tab */}
          <TabsContent value="advanced" className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base" htmlFor="maintenance-mode">
                    Chế độ bảo trì
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Đóng trang web cho người dùng
                  </p>
                </div>
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="backup-freq">Tần suất sao lưu dữ liệu</Label>
                <ToggleGroup
                  type="single"
                  defaultValue="daily"
                  className="justify-start"
                >
                  <ToggleGroupItem value="daily">Hàng ngày</ToggleGroupItem>
                  <ToggleGroupItem value="weekly">Hàng tuần</ToggleGroupItem>
                  <ToggleGroupItem value="monthly">Hàng tháng</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cache-lifetime">
                  Thời gian lưu cache (phút)
                </Label>
                <Input
                  id="cache-lifetime"
                  type="number"
                  defaultValue="60"
                  min="1"
                  max="1440"
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
            onClick={() => onOpenChange(false)}
          >
            <X className="mr-2 h-4 w-4" />
            Hủy
          </Button>
          <Button
            className="bg-brown text-cream hover:bg-brown/90"
            onClick={handleSaveSettings}
          >
            <Save className="mr-2 h-4 w-4" />
            Lưu cài đặt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SystemSettings;
