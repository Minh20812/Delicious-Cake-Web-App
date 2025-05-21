import React from "react";
import {
  CalendarIcon,
  MapPin,
  Clock,
  ExternalLink,
  Calendar,
  Settings,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useAdmin } from "@/contexts/AdminContext";
import { toast } from "sonner";

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Workshop làm bánh Macaron",
    description:
      "Khám phá bí quyết làm bánh Macaron hoàn hảo cùng đầu bếp nổi tiếng Nguyễn Văn A.",
    image:
      "https://images.unsplash.com/photo-1569864358642-9d1684040f43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    date: "25/06/2025",
    time: "14:00 - 17:00",
    location: "Cửa hàng bánh ABC, 123 Đường Lê Lợi, Quận 1, TP.HCM",
    isFree: false,
    price: "350.000đ",
    status: "upcoming",
    tags: ["Workshop", "Macaron", "Học làm bánh"],
  },
  {
    id: 2,
    title: "Triển lãm Bánh ngọt Quốc tế 2025",
    description:
      "Sự kiện triển lãm bánh ngọt lớn nhất năm với sự tham gia của các đầu bếp hàng đầu trong và ngoài nước.",
    image:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1026&q=80",
    date: "10/07/2025 - 15/07/2025",
    time: "09:00 - 21:00",
    location: "Trung tâm Hội nghị và Triển lãm Sài Gòn (SECC)",
    locationUrl: "https://maps.google.com",
    isFree: false,
    price: "200.000đ",
    status: "upcoming",
    tags: ["Triển lãm", "Quốc tế", "Bánh ngọt"],
  },
  {
    id: 3,
    title: "Lớp học làm bánh cupcake cho trẻ em",
    description:
      "Lớp học thú vị dành cho các bé từ 8-12 tuổi, giúp trẻ phát triển kỹ năng làm bánh và sáng tạo.",
    image:
      "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    date: "15/05/2025",
    time: "09:00 - 11:30",
    location: "Cửa hàng bánh ABC, 123 Đường Lê Lợi, Quận 1, TP.HCM",
    isFree: true,
    status: "ongoing",
    tags: ["Trẻ em", "Cupcake", "Lớp học"],
  },
  {
    id: 4,
    title: "Thử thách làm bánh sinh nhật",
    description:
      "Cuộc thi dành cho những người đam mê làm bánh, với giải thưởng hấp dẫn và cơ hội trở thành đầu bếp tại cửa hàng.",
    image:
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80",
    date: "01/06/2025",
    time: "08:00 - 17:00",
    location: "Trung tâm Văn hóa Quận 3, TP.HCM",
    locationUrl: "https://maps.google.com",
    isFree: false,
    price: "500.000đ",
    status: "upcoming",
    tags: ["Cuộc thi", "Bánh sinh nhật", "Giải thưởng"],
  },
  {
    id: 5,
    title: "Ngày hội làm bánh vì cộng đồng",
    description:
      "Sự kiện từ thiện với các hoạt động làm bánh, bán bánh gây quỹ hỗ trợ trẻ em có hoàn cảnh khó khăn.",
    image:
      "https://images.unsplash.com/photo-1608500218890-c4f9545fdea7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    date: "20/04/2025",
    time: "08:00 - 17:00",
    location: "Công viên Lê Văn Tám, Quận 1, TP.HCM",
    isFree: true,
    status: "past",
    tags: ["Từ thiện", "Cộng đồng", "Sự kiện"],
  },
];

export const EventsList = () => {
  const { isAdmin, isEditMode } = useAdmin();

  const upcomingEvents = mockEvents.filter(
    (event) => event.status === "upcoming"
  );
  const ongoingEvents = mockEvents.filter(
    (event) => event.status === "ongoing"
  );
  const pastEvents = mockEvents.filter((event) => event.status === "past");

  const handleEdit = (eventId) => {
    toast.info("Tính năng chỉnh sửa sự kiện đang được phát triển");
  };

  const handleRegister = (eventId) => {
    toast.success("Đã đăng ký tham gia sự kiện thành công!");
  };

  const renderEvent = (event) => (
    <Card key={event.id} className="overflow-hidden border-none shadow-md">
      <div className="relative">
        <AspectRatio ratio={16 / 9}>
          <img
            src={event.image}
            alt={event.title}
            className="object-cover w-full h-full rounded-t-lg"
          />
        </AspectRatio>
        <div className="absolute top-3 left-3">
          <Badge
            className={`
            ${
              event.status === "ongoing"
                ? "bg-green-500"
                : event.status === "upcoming"
                ? "bg-brown"
                : "bg-gray-500"
            }
            text-white
          `}
          >
            {event.status === "ongoing"
              ? "Đang diễn ra"
              : event.status === "upcoming"
              ? "Sắp diễn ra"
              : "Đã kết thúc"}
          </Badge>
        </div>
        {event.isFree ? (
          <Badge className="absolute top-3 right-3 bg-pink text-brown">
            Miễn phí
          </Badge>
        ) : (
          <Badge className="absolute top-3 right-3 bg-gold text-white">
            {event.price}
          </Badge>
        )}
        {isAdmin && isEditMode && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-brown rounded-full"
            onClick={() => handleEdit(event.id)}
          >
            <Settings size={18} />
          </Button>
        )}
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="font-playfair text-xl text-brown line-clamp-2">
          {event.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <p className="text-brown/80 line-clamp-2">{event.description}</p>

        <div className="flex items-start gap-2 text-sm">
          <Calendar size={16} className="text-brown mt-0.5" />
          <span className="text-brown/80">
            {event.date}
            <br />
            {event.time}
          </span>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <MapPin size={16} className="text-brown mt-0.5" />
          <span className="text-brown/80">{event.location}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 flex justify-between">
        <div className="flex flex-wrap gap-2">
          {event.tags.slice(0, 2).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs bg-cream/50">
              {tag}
            </Badge>
          ))}
        </div>

        {event.status !== "past" && (
          <Button
            size="sm"
            onClick={() => handleRegister(event.id)}
            className="bg-brown text-cream hover:bg-brown/80"
          >
            Đăng ký
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div>
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="w-full mb-6 justify-start">
          <TabsTrigger value="upcoming" className="flex-1 sm:flex-initial">
            Sắp diễn ra
          </TabsTrigger>
          <TabsTrigger value="ongoing" className="flex-1 sm:flex-initial">
            Đang diễn ra
          </TabsTrigger>
          <TabsTrigger value="past" className="flex-1 sm:flex-initial">
            Đã kết thúc
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map(renderEvent)
            ) : (
              <p className="text-brown/70 col-span-full text-center py-12">
                Không có sự kiện nào sắp diễn ra.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="ongoing">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ongoingEvents.length > 0 ? (
              ongoingEvents.map(renderEvent)
            ) : (
              <p className="text-brown/70 col-span-full text-center py-12">
                Không có sự kiện nào đang diễn ra.
              </p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.length > 0 ? (
              pastEvents.map(renderEvent)
            ) : (
              <p className="text-brown/70 col-span-full text-center py-12">
                Không có sự kiện đã kết thúc.
              </p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
