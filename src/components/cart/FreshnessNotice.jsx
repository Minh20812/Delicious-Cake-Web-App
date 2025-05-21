import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Info, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

const FreshnessNotice = ({ className }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cn(
        "bg-pink/10 rounded-lg p-4 md:p-6 border border-pink/30",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Clock size={20} className="text-brown" />
            </div>
            <h3 className="font-medium text-brown text-lg">
              Thông tin về độ tươi mới
            </h3>
          </div>
          <button className="text-brown p-1 hover:bg-pink/20 rounded-full transition-colors">
            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>

        {/* Always show the basic info */}
        <div className="pl-0 sm:pl-14">
          <p className="text-brown/80 text-sm">
            Tất cả các loại bánh của chúng tôi được làm tươi mỗi ngày và có thời
            gian bảo quản tốt nhất trong vòng <strong>48 giờ</strong>.
          </p>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="pl-0 sm:pl-14 animate-fade-in">
            <div className="text-brown/80 text-sm mt-2">
              <p className="mb-3">
                Chúng tôi đảm bảo bánh được giao đến tay bạn trong tình trạng
                hoàn hảo nhất.
              </p>

              <div className="sm:flex gap-8">
                <div className="mb-3 sm:mb-0">
                  <p className="text-sm text-brown/80 font-medium mb-2">
                    Thời gian bảo quản tốt nhất:
                  </p>
                  <ul className="text-sm space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500"></span>
                      <span>Ngày đầu tiên: Tươi ngon nhất</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      <span>Ngày thứ hai: Vẫn ngon</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      <span>Sau 48 giờ: Nên bảo quản lạnh</span>
                    </li>
                  </ul>
                </div>

                <Link
                  to="/about#freshness-policy"
                  className="text-brown underline decoration-dotted text-sm inline-block hover:text-brown/70 mt-2"
                >
                  Tìm hiểu thêm về chính sách độ tươi của chúng tôi
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreshnessNotice;
