import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import CartProgress from "@/components/cart/CartProgress";
import { toast } from "sonner";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import CustomerInformation from "@/components/checkout/CustomerInformation";
import DeliveryOptions from "@/components/cart/DeliveryOption";
import PaymentMethod from "@/components/checkout/PaymentMethod";
import OrderNotes from "@/components/checkout/OrderNotes";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import RelatedProducts from "@/components/checkout/RelatedProducts";
import { useCart } from "@/contexts/CartContext";

const Checkout = () => {
  // Now step 1 corresponds to Delivery (the first step in our new progress bar)
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    district: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [deliveryDate, setDeliveryDate] = useState(undefined);
  const [paymentMethod, setPaymentMethod] = useState("momo");
  const [orderNotes, setOrderNotes] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const navigate = useNavigate();
  const { cart } = useCart();

  // Check if customer info is complete
  const isCustomerInfoComplete = () => {
    return (
      customerInfo.fullName.trim() !== "" &&
      customerInfo.email.trim() !== "" &&
      customerInfo.phone.trim() !== "" &&
      customerInfo.address.trim() !== "" &&
      customerInfo.city.trim() !== "" &&
      customerInfo.district.trim() !== ""
    );
  };

  // Check if delivery options are complete
  const isDeliveryOptionsComplete = () => {
    return deliveryDate !== undefined;
  };

  // Check if step 1 (delivery) is complete
  const isStep1Complete = () => {
    return isCustomerInfoComplete() && isDeliveryOptionsComplete();
  };

  // Update completed steps when information changes
  useEffect(() => {
    if (isStep1Complete() && !completedSteps.includes(1)) {
      setCompletedSteps((prev) => [...prev, 1]);
    } else if (!isStep1Complete() && completedSteps.includes(1)) {
      setCompletedSteps((prev) => prev.filter((s) => s !== 1));
    }
  }, [customerInfo, deliveryDate]);

  // Redirect to home page if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      toast.info("Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.");
      navigate("/");
    }
  }, [cart, navigate, toast]);

  const handleCustomerInfoSubmit = (info) => {
    setCustomerInfo(info);
  };

  const handleDeliveryOptionsSubmit = () => {
    if (!deliveryDate) {
      toast.error("Vui lòng chọn ngày giao hàng");
      return;
    }

    if (!isCustomerInfoComplete()) {
      toast.error("Vui lòng điền đầy đủ thông tin giao hàng");
      return;
    }

    setCompletedSteps((prev) => (prev.includes(1) ? prev : [...prev, 1]));
    setStep(2); // Move to payment step
  };

  const handlePaymentSubmit = () => {
    if (!paymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return;
    }

    if (!agreeToTerms) {
      toast.error("Vui lòng đồng ý với điều khoản và điều kiện");
      return;
    }

    // In a real app, this would proceed to actual payment processing
    toast.info("Đơn hàng của bạn đang được xử lý...");

    // Complete step 2
    setCompletedSteps((prev) => (prev.includes(2) ? prev : [...prev, 1, 2]));

    // Simulate payment processing delay
    setTimeout(() => {
      toast.success("Đặt hàng thành công");
      navigate("/order-confirmation");
    }, 2000);
  };

  // Handle clicking on a step in the progress bar
  const handleStepClick = (clickedStep) => {
    // Can only go to a step if it's completed or it's step 1
    if (clickedStep === 1 || completedSteps.includes(clickedStep - 1)) {
      setStep(clickedStep);
    }
  };

  // Handle going back to the previous step
  const handleGoBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      // Go back to cart if on step 1
      navigate("/cart");
    }
  };

  const getMainContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <CustomerInformation
              customerInfo={customerInfo}
              onSubmit={handleCustomerInfoSubmit}
            />
            <DeliveryOptions
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              deliveryDate={deliveryDate}
              setDeliveryDate={setDeliveryDate}
            />
            <div className="flex justify-between mt-6">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-brown text-brown hover:bg-brown/10"
              >
                <ChevronLeft size={16} /> Quay lại
              </Button>

              <Button
                onClick={handleDeliveryOptionsSubmit}
                className="bg-brown hover:bg-brown/80 text-cream"
                disabled={!isStep1Complete()}
              >
                Tiếp tục <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <PaymentMethod
              selected={paymentMethod}
              onChange={setPaymentMethod}
            />
            <OrderNotes value={orderNotes} onChange={setOrderNotes} />
            <div className="flex justify-between mt-6">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="border-brown text-brown hover:bg-brown/10"
              >
                <ChevronLeft size={16} /> Quay lại
              </Button>

              <Button
                onClick={handlePaymentSubmit}
                className="bg-brown hover:bg-brown/80 text-cream"
                disabled={!agreeToTerms}
              >
                Hoàn tất đặt hàng <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Calculate order totals
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = deliveryMethod === "express" ? 9.99 : 5.99;
  const total = subtotal + shipping;

  // Get main category of items for recommendations
  // Update to handle undefined category property
  const mainCategory =
    cart.length > 0 && cart[0].category ? cart[0].category : "";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-6 md:py-8 flex-grow">
        <div className="max-w-6xl mx-auto">
          {/* Order progress indicator with clickable steps - now hidden by setting display to false */}
          <div className="mb-8">
            <CartProgress
              currentStep={step}
              completedSteps={completedSteps}
              onStepClick={handleStepClick}
              display={true}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main checkout content */}
            <div className="w-full lg:w-2/3 space-y-6">
              {/* Checkout notice */}
              <div className="bg-cream/30 rounded-lg p-4 border border-cream flex items-center gap-3">
                <div className="text-brown text-sm font-medium">
                  Đặt hàng trước 2:00 CH để nhận hàng trong ngày
                </div>
              </div>

              {/* Main content based on step */}
              {getMainContent()}
            </div>

            {/* Order summary sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="lg:sticky lg:top-24 space-y-6">
                <CheckoutSummary
                  cartItems={cart}
                  subtotal={subtotal}
                  shipping={shipping}
                  total={total}
                />

                <div className="mt-4 px-4 py-3 bg-white rounded-lg shadow-sm border border-gray-100">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="rounded text-brown mr-2"
                    />
                    <span className="text-sm text-brown/80">
                      Tôi đã đọc và đồng ý với các điều khoản và điều kiện
                    </span>
                  </label>
                </div>

                {mainCategory && <RelatedProducts category={mainCategory} />}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
