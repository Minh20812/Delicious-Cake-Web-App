import React from 'react';
import { Link } from 'react-router-dom';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from '@/contexts/AdminContext';
import { Settings } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';


// Mock blog posts data
const mockBlogPosts = [
  {
    id: 1,
    title: "Công thức bánh chocolate hạnh nhân mới nhất",
    excerpt: "Khám phá cách làm bánh chocolate hạnh nhân thơm ngon với lớp kem mịn màng và hương vị đặc trưng.",
    content: "Bài viết đầy đủ về công thức bánh chocolate hạnh nhân...",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1089&q=80",
    author: "Nguyễn Thị Hồng",
    date: "15/05/2025",
    category: "Công thức",
    tags: ["Chocolate", "Hạnh nhân", "Bánh ngọt"]
  },
  {
    id: 2,
    title: "5 mẹo làm bánh không bị xẹp khi nướng",
    excerpt: "Những bí quyết giúp bánh của bạn luôn nở đều và không bị xẹp trong quá trình nướng.",
    content: "Bài viết đầy đủ về 5 mẹo làm bánh không bị xẹp...",
    image: "https://images.unsplash.com/photo-1612198790700-0ff08cb726e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    author: "Trần Văn Nam",
    date: "02/05/2025",
    category: "Mẹo vặt",
    tags: ["Mẹo làm bánh", "Kỹ thuật"]
  },
  {
    id: 3,
    title: "Công thức bánh cupcake vani kem tươi",
    excerpt: "Hướng dẫn chi tiết cách làm bánh cupcake vani với lớp kem tươi mềm mịn và thơm ngon.",
    content: "Bài viết đầy đủ về công thức bánh cupcake vani...",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    author: "Lê Thị Mai",
    date: "28/04/2025",
    category: "Công thức",
    tags: ["Cupcake", "Vani", "Kem tươi"]
  },
  {
    id: 4,
    title: "Đánh giá 5 loại máy đánh trứng tốt nhất cho người làm bánh",
    excerpt: "So sánh và đánh giá chi tiết 5 loại máy đánh trứng phổ biến trên thị trường hiện nay.",
    content: "Bài viết đầy đủ về đánh giá 5 loại máy đánh trứng...",
    image: "https://images.unsplash.com/photo-1552478621-e8d4852c7954?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    author: "Phạm Minh Tuấn",
    date: "20/04/2025",
    category: "Đánh giá",
    tags: ["Dụng cụ làm bánh", "Thiết bị nhà bếp"]
  },
  {
    id: 5,
    title: "Cách trang trí bánh sinh nhật tại nhà đơn giản mà đẹp mắt",
    excerpt: "Hướng dẫn những cách trang trí bánh sinh nhật đơn giản nhưng vô cùng bắt mắt và chuyên nghiệp.",
    content: "Bài viết đầy đủ về cách trang trí bánh sinh nhật...",
    image: "https://images.unsplash.com/photo-1578873375969-d60aad647bb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    author: "Đặng Thu Hà",
    date: "15/04/2025",
    category: "Trang trí",
    tags: ["Trang trí bánh", "Bánh sinh nhật", "DIY"]
  },
  {
    id: 6,
    title: "Những nguyên liệu thay thế trong làm bánh cho người ăn kiêng",
    excerpt: "Giới thiệu các nguyên liệu thay thế lành mạnh cho người đang ăn kiêng hoặc có nhu cầu dinh dưỡng đặc biệt.",
    content: "Bài viết đầy đủ về những nguyên liệu thay thế trong làm bánh...",
    image: "https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    author: "Nguyễn Văn An",
    date: "10/04/2025",
    category: "Dinh dưỡng",
    tags: ["Ăn kiêng", "Low-carb", "Nguyên liệu thay thế"]
  },
];

export const BlogPosts = () => {
  const { isAdmin, isEditMode } = useAdmin();

  const handleEdit = (postId) => {
    toast.info("Tính năng chỉnh sửa bài viết đang được phát triển");
  };

  // List of categories for filters
  const categories = Array.from(new Set(mockBlogPosts.map(post => post.category)));

  return (
    <div>
      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant="outline" className="bg-brown text-cream border-none px-4 py-1">
          Tất cả
        </Badge>
        {categories.map(category => (
          <Badge 
            key={category} 
            variant="outline" 
            className="bg-cream text-brown border-brown/20 px-4 py-1 hover:bg-brown/10 cursor-pointer"
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBlogPosts.map(post => (
          <Card key={post.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <div className="relative">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </AspectRatio>
              <Badge className="absolute top-3 left-3 bg-brown text-cream">
                {post.category}
              </Badge>
              {isAdmin && isEditMode && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white text-brown rounded-full"
                  onClick={() => handleEdit(post.id)}
                >
                  <Settings size={18} />
                </Button>
              )}
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="font-playfair text-xl text-brown line-clamp-2">
                <Link to={`/blog/${post.id}`} className="hover:text-gold transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-xs text-brown/70">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <p className="text-brown/80 line-clamp-3">{post.excerpt}</p>
            </CardContent>
            
            <CardFooter className="pt-0">
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs bg-cream/50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};