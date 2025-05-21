import React, { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPosts } from "../components/blog/BlogPosts.jsx";
import { EventsList } from "../components/blog/EventsList.jsx";
import EditableText from "../components/admin/EditableText.jsx";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";

const BlogAndEvents = () => {
  const { isAdmin, isEditMode } = useAdmin();
  const [activeTab, setActiveTab] = useState("blog");

  const handleAddNew = () => {
    if (activeTab === "blog") {
      toast.info("Tính năng thêm bài viết đang được phát triển");
    } else {
      toast.info("Tính năng thêm sự kiện đang được phát triển");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow bg-cream">
        {/* Page Header */}
        <section className="bg-pink/20 py-12">
          <div className="container mx-auto text-center">
            <EditableText
              initialText="Blog & Sự kiện"
              className="font-playfair text-4xl md:text-5xl text-brown"
              as="h1"
            />
            <EditableText
              initialText="Khám phá các bài viết về công thức nấu ăn, mẹo làm bánh, và thông tin về sự kiện sắp tới của chúng tôi."
              className="text-brown/70 mt-4 max-w-2xl mx-auto"
              as="p"
            />
          </div>
        </section>

        {/* Blog and Events Content */}
        <section className="section-padding py-12">
          <div className="container mx-auto">
            <Tabs
              defaultValue="blog"
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-8">
                <TabsList className="w-full md:w-auto">
                  <TabsTrigger value="blog" className="flex-1">
                    Blog & Công thức
                  </TabsTrigger>
                  <TabsTrigger value="events" className="flex-1">
                    Sự kiện
                  </TabsTrigger>
                </TabsList>

                {isAdmin && isEditMode && (
                  <Button
                    onClick={handleAddNew}
                    className="hidden md:flex items-center bg-brown text-cream hover:bg-brown/80"
                  >
                    <Plus size={18} className="mr-2" />
                    {activeTab === "blog" ? "Thêm bài viết" : "Thêm sự kiện"}
                  </Button>
                )}
              </div>

              <TabsContent value="blog">
                <BlogPosts />
              </TabsContent>

              <TabsContent value="events">
                <EventsList />
              </TabsContent>
            </Tabs>

            {isAdmin && isEditMode && (
              <div className="md:hidden mt-8">
                <Button
                  onClick={handleAddNew}
                  className="w-full flex items-center justify-center bg-brown text-cream hover:bg-brown/80"
                >
                  <Plus size={18} className="mr-2" />
                  {activeTab === "blog" ? "Thêm bài viết" : "Thêm sự kiện"}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogAndEvents;
