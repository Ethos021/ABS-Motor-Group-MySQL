import React, { useState, useEffect } from "react";
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
  Badge,
  Slider
} from "@/components/ui";
import { CheckCircle, Send, Calculator, Car } from "lucide-react";

export default function VehicleEnquiryForm({ vehicle }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    message: '',
    hasTradein: null,
    tradeInYear: '',
    tradeInMake: '',
    wantsFinance: null,
    wantsTestDrive: null
  });

  const [financeCalculator, setFinanceCalculator] = useState({
    deposit: Math.min(vehicle.price * 0.1 || 5000, vehicle.price * 0.5),
    term: 60,
    interestRate: 5.99
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculatePayments = () => {
    const principal = vehicle.price - financeCalculator.deposit;
    const monthlyRate = financeCalculator.interestRate / 100 / 12;
    if (principal <= 0 || monthlyRate === 0) return { weekly: 0, monthly: 0 };

    const monthly = (principal * monthlyRate * Math.pow(1 + monthlyRate, financeCalculator.term)) /
      (Math.pow(1 + monthlyRate, financeCalculator.term) - 1);
    const weekly = (monthly * 12) / 52;

    return { weekly: isNaN(weekly) ? 0 : weekly, monthly: isNaN(monthly) ? 0 : monthly };
  };

  const payments = calculatePayments();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const urlParams = new URLSearchParams(window.location.search);
      const leadData = {
        ...formData,
        hasTradein: formData.hasTradein === 'yes',
        wantsFinance: formData.wantsFinance === 'yes',
        wantsTestDrive: formData.wantsTestDrive === 'yes',
        vehicleId: vehicle.id,
        vehicleDetails: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        vehiclePrice: vehicle.price,
        financeEstimate: formData.wantsFinance === 'yes' ? `$${payments.weekly.toFixed(0)}/week` : null,
        utmSource: urlParams.get('utm_source') || 'direct',
        utmMedium: urlParams.get('utm_medium') || 'website',
        utmCampaign: urlParams.get('utm_campaign') || 'vdp',
        referrer: document.referrer || 'direct',
        pageUrl: window.location.href,
        timestamp: new Date().toISOString(),
      };

      // Submit to Laravel backend via Inertia
      await router.post('/enquiries', leadData);

      setSubmitted(true);
    } catch (error) {
      console.error('Enquiry submission error:', error);
      alert('There was an error sending your enquiry. Please call us directly at (04) 1933 0301.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <Card className="bg-zinc-900 border-zinc-800">
        <CardContent className="text-center p-6">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full gradient-red">
            <CheckCircle className="w-8 h-8 text-zinc-50" />
          </div>
          <h3 className="text-xl font-bold text-zinc-50 mb-2">Enquiry Received!</h3>
          <p className="text-sm text-zinc-400 mb-4">
            Thanks for your interest in this {vehicle.year} {vehicle.make} {vehicle.model}. We will contact you shortly.
          </p>
          <Badge className="gradient-red text-zinc-50 mb-4 text-sm">
            Reference: AP-{Math.random().toString(36).substr(2, 6).toUpperCase()}
          </Badge>
          <p className="text-sm text-zinc-500">
            Need immediate assistance? <span className="font-medium text-red-500">(04) 1933 0301</span>
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader className="p-6">
        <CardTitle className="text-xl text-zinc-50">Enquire Now</CardTitle>
        <p className="text-sm text-zinc-400">Get more info, arrange inspection, or book a test drive</p>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-zinc-300 mb-1 block">First Name <span className="text-red-500">*</span></label>
              <Input
                placeholder="First Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-50"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-300 mb-1 block">Last Name <span className="text-red-500">*</span></label>
              <Input
                placeholder="Last Name"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-zinc-50"
                required
              />
            </div>
          </div>

          {/* Contact Fields */}
          <div>
            <label className="text-sm font-medium text-zinc-300 mb-1 block">Mobile <span className="text-red-500">*</span></label>
            <Input
              placeholder="Mobile"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-zinc-50"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-300 mb-1 block">Email Address</label>
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-zinc-50"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-zinc-300 mb-1 block">Message</label>
            <Textarea
              placeholder="Your message..."
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="bg-zinc-800 border-zinc-700 text-zinc-50 h-20"
            />
          </div>

          {/* Trade-in */}
          <div>
            <p className="text-sm font-medium text-zinc-300 mb-1">Do you have a vehicle to trade in?</p>
            <div className="flex space-x-2 mb-2">
              <Button
                type="button"
                variant={formData.hasTradein === 'yes' ? 'default' : 'outline'}
                onClick={() => handleInputChange('hasTradein', 'yes')}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={formData.hasTradein === 'no' ? 'default' : 'outline'}
                onClick={() => handleInputChange('hasTradein', 'no')}
              >
                No
              </Button>
            </div>

            {formData.hasTradein === 'yes' && (
              <div className="grid grid-cols-2 gap-3">
                <Select onValueChange={(v) => handleInputChange('tradeInYear', v)}>
                  <SelectTrigger className="bg-zinc-700 border-zinc-600">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="Make"
                  value={formData.tradeInMake}
                  onChange={(e) => handleInputChange('tradeInMake', e.target.value)}
                  className="bg-zinc-700 border-zinc-600 text-zinc-50"
                />
              </div>
            )}
          </div>

          {/* Finance */}
          <div>
            <p className="text-sm font-medium text-zinc-300 mb-1">Do you want finance?</p>
            <div className="flex space-x-2 mb-2">
              <Button
                type="button"
                variant={formData.wantsFinance === 'yes' ? 'default' : 'outline'}
                onClick={() => handleInputChange('wantsFinance', 'yes')}
              >
                Yes
              </Button>
              <Button
                type="button"
                variant={formData.wantsFinance === 'no' ? 'default' : 'outline'}
                onClick={() => handleInputChange('wantsFinance', 'no')}
              >
                No
              </Button>
            </div>

            {formData.wantsFinance === 'yes' && (
              <div className="bg-zinc-800 rounded-lg p-4 space-y-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calculator className="w-4 h-4 text-red-500" />
                  <p className="text-sm font-medium text-zinc-300">Finance Calculator</p>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 mb-1">Deposit: ${financeCalculator.deposit.toLocaleString()}</label>
                  <Slider
                    value={[financeCalculator.deposit]}
                    onValueChange={([v]) => setFinanceCalculator({ ...financeCalculator, deposit: v })}
                    min={0}
                    max={vehicle.price * 0.5}
                    step={1000}
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 mb-1">Term: {financeCalculator.term} months</label>
                  <Slider
                    value={[financeCalculator.term]}
                    onValueChange={([v]) => setFinanceCalculator({ ...financeCalculator, term: v })}
                    min={12}
                    max={84}
                    step={6}
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 text-center bg-zinc-700 rounded-lg p-3">
                  <div>
                    <p className="text-xs text-zinc-400">Weekly</p>
                    <p className="text-lg font-bold text-red-500">${payments.weekly.toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400">Monthly</p>
                    <p className="text-lg font-bold text-red-500">${payments.monthly.toFixed(0)}</p>
                  </div>
                </div>
                <p className="text-xs text-zinc-500 text-center mt-1">
                  *Estimate at {financeCalculator.interestRate}% p.a. Subject to approval
                </p>
              </div>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full gradient-red text-zinc-50 py-3 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-zinc-50 mr-2" />
            ) : <Send className="w-4 h-4 mr-2" />}
            {loading ? 'Sending...' : 'Submit Enquiry'}
          </Button>

          <p className="text-xs text-zinc-500 mt-2">
            By submitting, you agree to be contacted about this vehicle. We respect your privacy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
