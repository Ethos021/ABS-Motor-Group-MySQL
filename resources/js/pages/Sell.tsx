// resources/js/Pages/Sell.tsx
import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Clock, Shield, ArrowRight, CheckCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Sell() {
  const flash = usePage<{ flash?: { success?: boolean; enquiryId?: number } }>().props.flash ?? {};
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(flash.success || false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    kilometers: "",
    condition: "",
    description: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    preferredContact: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.make.trim()) newErrors.make = "Required";
      if (!formData.model.trim()) newErrors.model = "Required";
      if (!formData.year.trim()) newErrors.year = "Required";
      if (!formData.kilometers.trim()) newErrors.kilometers = "Required";
    } else if (step === 2) {
      if (!formData.condition) newErrors.condition = "Required";
    } else if (step === 3) {
      if (!formData.contactName.trim()) newErrors.contactName = "Required";
      if (!formData.contactPhone.trim()) newErrors.contactPhone = "Required";
      if (!formData.contactEmail.trim()) newErrors.contactEmail = "Required";
      if (!formData.preferredContact) newErrors.preferredContact = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => validateStep() && setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  // Handle form submit
  const handleSubmit = () => {
    if (!validateStep()) return;

    // Submit via Inertia POST to EnquiryController
    const submissionData = {
      enquiry_type: "sell_vehicle",
      firstName: formData.contactName.split(" ")[0] || "",
      lastName: formData.contactName.split(" ").slice(1).join(" ") || "",
      mobile: formData.contactPhone,
      email: formData.contactEmail,
      message: `Sell Vehicle: ${formData.make} ${formData.model} ${formData.year}, ${formData.kilometers}km. Condition: ${formData.condition}. Details: ${formData.description}`,
      preferredContactMethod: formData.preferredContact?.toLowerCase() || null,
      wantsFinance: false,
      wantsTestDrive: false,
      hasTradein: false,
    };

    router.post("/contact-submit", submissionData, {
      onSuccess: () => {
        setSubmitted(true);
        setStep(4);
      },
      onError: (err) => console.log(err),
    });
  };

  return (
    <Layout>
      <div className="min-h-screen bg-zinc-950 py-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-zinc-50 mb-4">
              Sell Your <span className="text-red-500">Prestige Vehicle</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
              Get a premium valuation for your European or performance vehicle with our transparent consignment process
            </p>
          </div>

          {/* Why Choose Us */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="text-center">
                <div className="w-12 h-12 gradient-red rounded-full flex items-center justify-center mx-auto mb-3">
                  <DollarSign className="w-6 h-6 text-zinc-50" />
                </div>
                <CardTitle className="text-zinc-50">Premium Valuations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-center">
                  Market-leading valuations based on current market conditions and vehicle provenance
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="text-center">
                <div className="w-12 h-12 gradient-red rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-zinc-50" />
                </div>
                <CardTitle className="text-zinc-50">Quick Process</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-center">
                  Fast, professional evaluation and settlement within 24-48 hours of acceptance
                </p>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader className="text-center">
                <div className="w-12 h-12 gradient-red rounded-full flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-zinc-50" />
                </div>
                <CardTitle className="text-zinc-50">Trusted Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 text-center">
                  Transparent process, fair dealing, and expert handling of all documentation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Steps Progress */}
          <div className="flex justify-center mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step >= s
                      ? "gradient-red text-zinc-50 border-red-500"
                      : "border-zinc-600 text-zinc-400"
                  }`}
                >
                  {step > s ? <CheckCircle className="w-5 h-5" /> : s}
                </div>
                {s < 3 && <div className={`w-16 h-0.5 ${step > s ? "bg-red-500" : "bg-zinc-600"}`} />}
              </div>
            ))}
          </div>

          {/* Form Card */}
          <Card className="bg-zinc-900 border-zinc-800 luxury-shadow">
            <CardHeader>
              <CardTitle className="text-2xl text-zinc-50">
                {step === 1 && "Vehicle Details"}
                {step === 2 && "Additional Information"}
                {step === 3 && "Your Contact Details"}
                {step === 4 && "Submission Complete"}
              </CardTitle>
              <p className="text-zinc-400">
                {step === 1 && "Tell us about your vehicle"}
                {step === 2 && "Help us understand your vehicle's condition"}
                {step === 3 && "How can we reach you?"}
                {step === 4 && "We'll contact you soon"}
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Vehicle Details */}
              {step === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {["make", "model", "year", "kilometers"].map((field) => (
                    <div key={field}>
                      <label className="text-sm font-medium text-zinc-300 mb-2 block">
                        {field.charAt(0).toUpperCase() + field.slice(1)}{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <Input
                        placeholder={`Enter ${field}`}
                        value={formData[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        className="bg-zinc-800 border-zinc-700 text-zinc-50"
                      />
                      {errors[field] && <p className="text-red-500 text-sm mt-1">{errors[field]}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Step 2: Additional Info */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-zinc-300 mb-2 block">
                      Condition <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={(value) => handleInputChange("condition", value)}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Excellent", "Very Good", "Good", "Fair"].map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.condition && <p className="text-red-500 text-sm mt-1">{errors.condition}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-300 mb-2 block">
                      Additional Details
                    </label>
                    <Textarea
                      placeholder="Service history, modifications, damage, etc."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-50 h-32"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-zinc-300 mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Enter full name"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange("contactName", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-50"
                    />
                    {errors.contactName && <p className="text-red-500 text-sm mt-1">{errors.contactName}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-300 mb-2 block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Enter phone number"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-50"
                    />
                    {errors.contactPhone && <p className="text-red-500 text-sm mt-1">{errors.contactPhone}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-medium text-zinc-300 mb-2 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      placeholder="Enter email"
                      value={formData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-zinc-50"
                    />
                    {errors.contactEmail && <p className="text-red-500 text-sm mt-1">{errors.contactEmail}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-zinc-300 mb-2 block">
                      Preferred Contact <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={(value) => handleInputChange("preferredContact", value)}>
                      <SelectTrigger className="bg-zinc-800 border-zinc-700">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {["Phone", "Email", "WhatsApp"].map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.preferredContact && <p className="text-red-500 text-sm mt-1">{errors.preferredContact}</p>}
                  </div>
                </div>
              )}
            </CardContent>

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex justify-between p-6 border-t border-zinc-800">
                {step > 1 && (
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  onClick={step === 3 ? handleSubmit : nextStep}
                  className="gradient-red text-zinc-50 hover:opacity-90 ml-auto"
                >
                  {step === 3 ? "Submit Application" : "Continue"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Success Modal */}
        <AnimatePresence>
  {submitted && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={() => setSubmitted(false)}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-zinc-900 rounded-2xl shadow-2xl max-w-md w-full p-8 flex flex-col items-center text-center space-y-6"
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg">
          <CheckCircle className="w-12 h-12 text-white animate-bounce" />
        </div>
        <h3 className="text-2xl font-bold text-zinc-50">Submission Received!</h3>
        <p className="text-zinc-400">
          Thank you! Our team will contact you within 24 hours. <br />
          Your reference number is{" "}
          <span className="text-red-500 font-semibold">
            AP-{String(flash.enquiryId ?? Math.floor(Math.random() * 99999)).padStart(5, "0")}
          </span>
        </p>
        <Button
          onClick={() => {
            setSubmitted(false);
            // Clear form and reset to step 1
            setFormData({
              make: "",
              model: "",
              year: "",
              kilometers: "",
              condition: "",
              description: "",
              contactName: "",
              contactPhone: "",
              contactEmail: "",
              preferredContact: "",
            });
            setStep(1);
          }}
          variant="outline"
          className="bg-transparent border-zinc-700 text-zinc-50 hover:bg-zinc-800 transition-colors duration-300"
        >
          Submit Another Vehicle
        </Button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
      </div>
    </Layout>
  );
}
