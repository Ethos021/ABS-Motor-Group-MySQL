import React, { useState } from "react";
import { router } from "@inertiajs/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  Input,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Slider,
} from "@/components/ui";
import { CheckCircle, Send, Calculator } from "lucide-react";

export default function VehicleEnquiryForm({ vehicle }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    enquiry_type: "vehicle_interest",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    message: "",
    hasTradein: false,
    tradeInYear: "",
    tradeInMake: "",
    tradeInModel: "",
    wantsFinance: false,
    wantsTestDrive: false,
  });

  const [finance, setFinance] = useState({
    deposit: Math.min(vehicle.price * 0.1, vehicle.price * 0.5),
    term: 60,
    rate: 5.99,
  });

  const update = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const calculatePayments = () => {
    const principal = vehicle.price - finance.deposit;
    const r = finance.rate / 100 / 12;
    if (principal <= 0 || r <= 0) return { weekly: 0, monthly: 0 };
    const monthly =
      (principal * r * Math.pow(1 + r, finance.term)) /
      (Math.pow(1 + r, finance.term) - 1);
    return { monthly, weekly: (monthly * 12) / 52 };
  };

  const payments = calculatePayments();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const leadData = {
      ...form,
      vehicle_id: vehicle.id,
      vehicleDetails: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      vehiclePrice: vehicle.price,
      financeEstimate: form.wantsFinance
        ? {
            weekly: Math.round(payments.weekly),
            monthly: Math.round(payments.monthly),
            deposit: finance.deposit,
            term: finance.term,
            rate: finance.rate,
          }
        : null,
    };

    router.post("/enquiries", leadData, {
      onSuccess: () => setSubmitted(true),
      onFinish: () => setLoading(false),
    });
  };

  if (submitted) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full gradient-red">
            <CheckCircle className="w-8 h-8 text-zinc-50" />
          </div>
          <h3 className="text-xl font-bold text-zinc-50 mb-2">
            Enquiry Received!
          </h3>
          <p className="text-sm text-zinc-400 mb-4">
            Thanks for your interest in this {vehicle.year} {vehicle.make}{" "}
            {vehicle.model}. We will contact you shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  // Toggle button colors
  const buttonOn = "bg-white text-black";
  const buttonOff = "bg-black text-white";

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="p-6">
        <CardTitle className="text-xl text-zinc-50">Enquire Now</CardTitle>
        <p className="text-sm text-zinc-400">
          Request more info, finance, or a test drive
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Names */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              placeholder="First Name"
              required
              className="bg-zinc-800 border-zinc-700 text-zinc-50"
              onChange={(e) => update("firstName", e.target.value)}
            />
            <Input
              placeholder="Last Name"
              required
              className="bg-zinc-800 border-zinc-700 text-zinc-50"
              onChange={(e) => update("lastName", e.target.value)}
            />
          </div>

          {/* Contact */}
          <Input
            placeholder="Mobile"
            required
            className="bg-zinc-800 border-zinc-700 text-zinc-50"
            onChange={(e) => update("mobile", e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email (optional)"
            className="bg-zinc-800 border-zinc-700 text-zinc-50"
            onChange={(e) => update("email", e.target.value)}
          />

          {/* Message */}
          <Textarea
            placeholder="Your message"
            className="bg-zinc-800 border-zinc-700 text-zinc-50 h-20"
            onChange={(e) => update("message", e.target.value)}
          />

          {/* Trade-in */}
          <div>
            <p className="text-sm font-medium text-zinc-300 mb-1">
              Do you have a vehicle to trade in?
            </p>
            <div className="flex gap-2 mb-2">
              <Button
                type="button"
                className={form.hasTradein ? buttonOn : buttonOff}
                onClick={() => update("hasTradein", true)}
              >
                Yes
              </Button>
              <Button
                type="button"
                className={!form.hasTradein ? buttonOn : buttonOff}
                onClick={() => update("hasTradein", false)}
              >
                No
              </Button>
            </div>

            {form.hasTradein && (
              <div className="grid grid-cols-2 gap-3">
                <Select onValueChange={(v) => update("tradeInYear", v)}>
                  <SelectTrigger className="bg-zinc-700 border-zinc-600">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map(
                      (year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Make"
                  className="bg-zinc-700 border-zinc-600 text-zinc-50"
                  onChange={(e) => update("tradeInMake", e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Finance */}
          <div>
            <p className="text-sm font-medium text-zinc-300 mb-1">
              Do you want finance?
            </p>
            <div className="flex gap-2 mb-2">
              <Button
                type="button"
                className={form.wantsFinance ? buttonOn : buttonOff}
                onClick={() => update("wantsFinance", true)}
              >
                Yes
              </Button>
              <Button
                type="button"
                className={!form.wantsFinance ? buttonOn : buttonOff}
                onClick={() => update("wantsFinance", false)}
              >
                No
              </Button>
            </div>

            {form.wantsFinance && (
              <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
                <div className="flex items-center gap-2 mb-2 text-zinc-300">
                  <Calculator className="w-4 h-4 text-red-500" />
                  Finance Calculator
                </div>

                <div>
                  <label className="text-xs text-zinc-400 mb-1">
                    Deposit: ${finance.deposit.toLocaleString()}
                  </label>
                  <Slider
                    value={[finance.deposit]}
                    min={0}
                    max={vehicle.price * 0.5}
                    step={1000}
                    onValueChange={([v]) =>
                      setFinance({ ...finance, deposit: v })
                    }
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 mb-1">
                    Term: {finance.term} months
                  </label>
                  <Slider
                    value={[finance.term]}
                    min={12}
                    max={84}
                    step={6}
                    onValueChange={([v]) =>
                      setFinance({ ...finance, term: v })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-center bg-zinc-700 rounded-lg p-3">
                  <div>
                    <p className="text-xs text-zinc-400">Weekly</p>
                    <p className="text-lg font-bold text-red-500">
                      ${Math.round(payments.weekly)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Monthly</p>
                    <p className="text-lg font-bold text-red-500">
                      ${Math.round(payments.monthly)}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Test Drive Button */}
          <Button
            type="button"
            className={`${form.wantsTestDrive ? buttonOn : buttonOff} w-full`}
            onClick={() => update("wantsTestDrive", !form.wantsTestDrive)}
          >
            {form.wantsTestDrive ? "Requesting Test Drive" : "Request Test Drive"}
          </Button>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full gradient-red text-zinc-50 py-3 flex items-center justify-center"
            disabled={loading}
          >
            <Send className="w-4 h-4 mr-2" />
            {loading ? "Sending..." : "Submit Enquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
