import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useAdmin } from "@/contexts/AdminContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductManagement } from "@/components/admin/ProductManagement";
import { OrderManagement } from "@/components/admin/OrderManagement";
import { Settings, BookOpen } from "lucide-react";

const AdminDashboard = () => {
  const { isAdmin } = useAdmin();

  // Redirect to home if not admin
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="font-playfair text-3xl text-brown">
              Quản lý hệ thống
            </h1>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={18} />
                <span>Cài đặt hệ thống</span>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/blog">
                  <BookOpen size={18} />
                  <span>Xem trang Blog</span>
                </Link>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="products" className="w-full">
            <TabsList className="w-full md:w-auto mb-6">
              <TabsTrigger value="products" className="flex-1">
                Sản phẩm
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex-1">
                Đơn hàng
              </TabsTrigger>
              <TabsTrigger value="customers" className="flex-1">
                Khách hàng
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex-1">
                Blog & Sự kiện
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <ProductManagement />
            </TabsContent>

            <TabsContent value="orders">
              <OrderManagement />
            </TabsContent>

            <TabsContent value="customers">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-playfair text-brown mb-4">
                  Khách hàng
                </h2>
                <p className="text-brown/70">Chức năng đang được phát triển.</p>
              </div>
            </TabsContent>

            <TabsContent value="blog">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-playfair text-brown mb-4">
                  Quản lý Blog & Sự kiện
                </h2>
                <p className="text-brown/70 mb-6">
                  Chức năng đang được phát triển. Bạn có thể xem và quản lý bài
                  viết và sự kiện tại trang Blog.
                </p>
                <Button
                  className="bg-brown text-cream hover:bg-brown/80"
                  asChild
                >
                  <Link to="/blog">
                    <BookOpen size={18} className="mr-2" />
                    <span>Đến trang Blog & Sự kiện</span>
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
