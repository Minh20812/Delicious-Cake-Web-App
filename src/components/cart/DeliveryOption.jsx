import React, { useCallback } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Truck, Store, CalendarDays, Clock, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

const DeliveryOptions = ({
  className,
  deliveryMethod,
  setDeliveryMethod,
  deliveryDate,
  setDeliveryDate,
}) => {
  // Get tomorrow and following dates
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const dayAfterTomorrow = new Date();
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

  // Defining available dates (e.g. next 14 days)
  const today = new Date();
  const twoWeeksLater = new Date();
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

  // Get today's hour to determine if same-day delivery is available
  const currentHour = today.getHours();
  const isSameDayAvailable = currentHour < 14; // Available only before 2 PM

  // Block past dates and beyond 2 weeks
  const disabledDays = {
    before: isSameDayAvailable ? null : tomorrow,
    after: twoWeeksLater,
  };

  // Time slots for delivery
  const timeSlots = [
    { id: "morning", label: "Buổi sáng (9:00 - 12:00)", available: true },
    { id: "afternoon", label: "Buổi chiều (12:00 - 17:00)", available: true },
    { id: "evening", label: "Buổi tối (17:00 - 20:00)", available: false },
  ];

  // Store locations
  const storeLocations = [
    {
      id: "store1",
      name: "Chi nhánh trung tâm",
      address: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    },
    {
      id: "store2",
      name: "Chi nhánh quận 3",
      address: "456 Đường Nguyễn Thị Minh Khai, Quận 3, TP.HCM",
    },
  ];

  // Format date for display
  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Memoized handler for Calendar to avoid infinite loop
  const handleDateSelect = useCallback(
    (date) => {
      // Only update if value changes or null
      if (!date || !deliveryDate || date.getTime() !== deliveryDate.getTime()) {
        setDeliveryDate(date);
      }
    },
    [deliveryDate, setDeliveryDate]
  );

  // Function to check if a date is disabled
  const isDateDisabled = (date) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // If same-day delivery is not available, disable today
    if (
      !isSameDayAvailable &&
      date.getDate() === currentDate.getDate() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    ) {
      return true;
    }

    // Disable dates before today
    if (date < currentDate) {
      return true;
    }

    // Disable dates after two weeks
    const maxDate = new Date(currentDate);
    maxDate.setDate(maxDate.getDate() + 14);
    if (date > maxDate) {
      return true;
    }

    return false;
  };

  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-4 md:p-6", className)}>
      <h2 className="font-medium text-lg text-brown mb-4">
        Tùy chọn giao hàng
      </h2>

      <Tabs
        defaultValue="delivery"
        value={deliveryMethod}
        onValueChange={setDeliveryMethod}
      >
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="delivery" className="flex items-center gap-2">
            <Truck size={16} />
            <span>Giao hàng</span>
          </TabsTrigger>
          <TabsTrigger value="pickup" className="flex items-center gap-2">
            <Store size={16} />
            <span>Nhận tại cửa hàng</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="delivery" className="space-y-6">
          <div>
            <Label className="block mb-3 text-brown">
              Chọn ngày giao hàng:
            </Label>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Calendar
                mode="single"
                selected={deliveryDate}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                today={today}
                initialFocus
                locale="vi-VN"
                weekStartsOn={1}
                className="rounded-md border"
                modifiersClassNames={{
                  selected: "bg-amber-500 text-white hover:bg-amber-600",
                  today: "bg-yellow-500 text-amber-900 font-medium",
                  disabled: "text-gray-300 opacity-50 cursor-not-allowed",
                  outside: "text-gray-400 opacity-50",
                }}
                classNames={{
                  table: "border-collapse space-y-1",
                  head_cell: "text-brown text-xs font-medium",
                  caption:
                    "flex items-center justify-between text-brown text-sm font-medium px-2",
                  nav_button: "text-brown hover:bg-gray-100 px-2", // dùng chung cho cả 2 nút
                  // KHÔNG cần nav_button_previous / nav_button_next trừ khi cần thêm style
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal text-brown hover:bg-gray-100 aria-selected:opacity-100",
                }}
              />
            </div>
            {deliveryDate && (
              <div className="mt-3 text-sm flex items-center text-brown/80 gap-2">
                <CalendarDays size={16} />
                <span>Ngày đã chọn: {formatDate(deliveryDate)}</span>
              </div>
            )}
          </div>

          <div>
            <Label className="block mb-3 text-brown">
              Các hình thức giao hàng:
            </Label>
            <RadioGroup defaultValue="standard">
              <div className="space-y-3">
                <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="flex-1 cursor-pointer">
                    <div className="font-medium text-brown">
                      Giao hàng tiêu chuẩn
                    </div>
                    <div className="text-sm text-brown/70">
                      Giao hàng trong 3-5 giờ - $5.99
                    </div>
                  </Label>
                </div>

                <div className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 hover:bg-gray-50">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express" className="flex-1 cursor-pointer">
                    <div className="font-medium text-brown">
                      Giao hàng nhanh
                    </div>
                    <div className="text-sm text-brown/70">
                      Giao hàng trong 1-2 giờ - $9.99
                    </div>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {deliveryDate && (
            <div>
              <Label className="block mb-3 text-brown">
                Chọn khung giờ giao hàng:
              </Label>
              <RadioGroup defaultValue="morning">
                <div className="space-y-3">
                  {timeSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={cn(
                        "flex items-center space-x-2 border rounded-md p-3",
                        slot.available
                          ? "border-gray-200 hover:bg-gray-50"
                          : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                      )}
                    >
                      <RadioGroupItem
                        value={slot.id}
                        id={slot.id}
                        disabled={!slot.available}
                      />
                      <Label
                        htmlFor={slot.id}
                        className={cn(
                          "flex-1",
                          slot.available
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        )}
                      >
                        {slot.label}
                        {!slot.available && (
                          <p className="text-xs text-red-500 mt-1">
                            Không còn slot trống
                          </p>
                        )}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pickup" className="space-y-6">
          <div>
            <Label className="block mb-3 text-brown">Chọn cửa hàng:</Label>
            <RadioGroup defaultValue="store1">
              <div className="space-y-3">
                {storeLocations.map((store) => (
                  <div
                    key={store.id}
                    className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 hover:bg-gray-50"
                  >
                    <RadioGroupItem value={store.id} id={store.id} />
                    <Label htmlFor={store.id} className="flex-1 cursor-pointer">
                      <div className="font-medium text-brown">{store.name}</div>
                      <div className="text-sm text-brown/70">
                        {store.address}
                      </div>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="block mb-3 text-brown">
              Chọn ngày nhận hàng:
            </Label>
            <div className="bg-gray-50 p-4 rounded-lg">
              <Calendar
                mode="single"
                selected={deliveryDate}
                onSelect={handleDateSelect}
                disabled={isDateDisabled}
                className="rounded-md border"
                today={today}
                initialFocus
                locale="vi-VN"
                weekStartsOn={1}
                classNames={{
                  day_today: "bg-amber-100 text-amber-900 font-medium",
                  day_selected: "bg-amber-500 text-white hover:bg-amber-600",
                  day_disabled: "text-gray-300 opacity-50 cursor-not-allowed",
                  head_cell: "text-brown text-xs font-medium",
                  caption: "text-brown text-sm font-medium",
                  nav_button: "text-brown hover:bg-gray-100",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  table: "border-collapse space-y-1",
                  cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                  day: "h-9 w-9 p-0 font-normal text-brown hover:bg-gray-100 aria-selected:opacity-100",
                  day_outside: "text-gray-400 opacity-50",
                }}
              />
            </div>
            {deliveryDate && (
              <div className="mt-3 text-sm flex items-center text-brown/80 gap-2">
                <CalendarDays size={16} />
                <span>Ngày đã chọn: {formatDate(deliveryDate)}</span>
              </div>
            )}
          </div>

          {deliveryDate && (
            <div>
              <Label className="block mb-3 text-brown">
                Chọn khung giờ nhận hàng:
              </Label>
              <RadioGroup defaultValue="morning">
                <div className="space-y-3">
                  {timeSlots
                    .filter((slot) => slot.id !== "evening")
                    .map((slot) => (
                      <div
                        key={slot.id}
                        className="flex items-center space-x-2 border border-gray-200 rounded-md p-3 hover:bg-gray-50"
                      >
                        <RadioGroupItem
                          value={slot.id}
                          id={`pickup-${slot.id}`}
                        />
                        <Label
                          htmlFor={`pickup-${slot.id}`}
                          className="flex-1 cursor-pointer"
                        >
                          {slot.label}
                        </Label>
                      </div>
                    ))}
                </div>
              </RadioGroup>

              <div className="mt-4 p-3 bg-cream rounded-md flex items-start gap-3">
                <div className="text-brown mt-0.5">
                  <Info size={16} />
                </div>
                <p className="text-sm text-brown/90">
                  Vui lòng mang theo đơn hàng và CMND/CCCD khi đến lấy bánh.
                  Bánh sẽ được giữ lại trong 24 giờ kể từ thời gian đã chọn.
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Separator className="my-6" />

      <div className="flex items-center gap-2 text-sm text-brown/70">
        <Clock size={14} />
        <span>
          Đặt hàng trước 14:00 để nhận hàng trong ngày (tùy thuộc vào khu vực
          giao hàng)
        </span>
      </div>
    </div>
  );
};

export default DeliveryOptions;
