import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Tôi cần đặt bánh trước bao lâu?",
    answer:
      "Đối với bánh tiêu chuẩn, bạn nên đặt trước ít nhất 48 giờ. Đối với bánh tùy chỉnh hoặc bánh cưới, chúng tôi khuyên bạn nên đặt trước 1-2 tuần để đảm bảo có đủ thời gian cho quá trình thiết kế và chuẩn bị.",
  },
  {
    question: "Vùng giao hàng của bạn là gì?",
    answer:
      "Chúng tôi giao hàng trong bán kính 25km từ cửa hàng với phí giao hàng tiêu chuẩn. Đối với khoảng cách xa hơn, có thể áp dụng phí giao hàng bổ sung. Vui lòng liên hệ với chúng tôi để biết thêm chi tiết về vị trí cụ thể của bạn.",
  },
  {
    question: "Tôi có thể thay đổi hoặc hủy đơn hàng của mình không?",
    answer:
      "Thay đổi có thể được thực hiện tùy thuộc vào tình trạng đơn hàng và thời gian trước khi giao hàng. Đối với hủy đơn, chúng tôi yêu cầu thông báo ít nhất 48 giờ trước thời gian giao hàng hoặc lấy hàng đã hẹn để được hoàn lại tiền đầy đủ.",
  },
  {
    question: "Các phương thức thanh toán được chấp nhận?",
    answer:
      "Chúng tôi chấp nhận tiền mặt, thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng và các ví điện tử phổ biến. Đối với đơn đặt hàng lớn hoặc bánh cưới, chúng tôi yêu cầu đặt cọc 50% khi đặt hàng.",
  },
  {
    question: "Bánh của bạn có phù hợp với người ăn chay không?",
    answer:
      "Chúng tôi có các lựa chọn bánh chay và có thể điều chỉnh nhiều công thức của mình cho phù hợp với chế độ ăn chay. Vui lòng thông báo cho chúng tôi về yêu cầu cụ thể của bạn khi đặt hàng.",
  },
  {
    question: "Làm thế nào để bảo quản bánh để giữ độ tươi ngon?",
    answer:
      "Các loại bánh của chúng tôi nên được bảo quản ở nhiệt độ mát (khoảng 18-22°C) và tránh ánh nắng trực tiếp. Bánh kem nên được bảo quản trong tủ lạnh và lấy ra 30 phút trước khi dùng để đạt được hương vị tốt nhất. Chúng tôi khuyên bạn nên thưởng thức bánh trong vòng 3 ngày để có trải nghiệm hương vị tốt nhất.",
  },
];

export const ContactFAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className="border-brown/10"
        >
          <AccordionTrigger className="text-brown hover:text-gold transition-colors text-left">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-brown/80">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
