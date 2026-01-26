import React, { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react"; // Inertia integration
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator
} from "@/components/ui";
import {
  Car, Gauge, Fuel, Cog, Palette, Users, Calendar, Shield, Phone,
  MessageCircle, X, CheckCircle, FileText, Star, Send
} from "lucide-react";

import VehicleImageGallery from "@/components/vehicle/VehicleImageGallery";
import VehicleEnquiryForm from "@/components/vehicle/VehicleEnquiryForm";
import VehicleFinanceCalculator from "@/components/vehicle/VehicleFinanceCalculator";
import StickyVehicleCTA from "@/components/vehicle/StickyVehicleCTA";
import VehicleCard from "@/components/shared/VehicleCard";
import Layout from "@/components/layout";

export default function VehicleDetail() {
  // Pull vehicle & related vehicles from Inertia page props
  const { vehicle: pageVehicle, relatedVehicles: pageRelated } = usePage().props;

  const [vehicle, setVehicle] = useState(pageVehicle || null);
  const [relatedVehicles, setRelatedVehicles] = useState(pageRelated || []);
  const [showMobileEnquiry, setShowMobileEnquiry] = useState(false);

  // Weekly payment calculation
  const calculateWeeklyPayment = (price: number | null) => {
    if (!price) return null;
    const principal = price * 0.9; // 10% deposit
    const monthlyRate = 0.0599 / 12;
    const months = 60;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return Math.round((monthlyPayment * 12) / 52);
  };

  const weeklyPayment = calculateWeeklyPayment(vehicle?.price);

  const handleCall = () => window.open("tel:+61419330301", "_self");
  const handleWhatsApp = () => {
    if (!vehicle) return;
    const message = encodeURIComponent(
      `Hi, I'm interested in the ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.price?.toLocaleString()}).`
    );
    window.open(`https://wa.me/61419330301?text=${message}`, "_blank");
  };
  const handleQuickEnquiry = () => setShowMobileEnquiry(true);

  if (!vehicle) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-50 mb-4">Vehicle Not Found</h1>
          <p className="text-zinc-400 mb-6">This vehicle may have been sold or is no longer available.</p>
          <Link href="/browse">
            <Button className="gradient-red text-zinc-50">Browse Other Vehicles</Button>
          </Link>
        </div>
      </div>
    );
  }

  const specItems = [
    { icon: Gauge, label: "Kilometers", value: vehicle.kilometers?.toLocaleString() + " km" },
    { icon: Calendar, label: "Year", value: vehicle.year },
    { icon: Fuel, label: "Fuel Type", value: vehicle.fuel_type },
    { icon: Cog, label: "Transmission", value: vehicle.transmission },
    { icon: Car, label: "Body Type", value: vehicle.body_type },
    { icon: Shield, label: "Drivetrain", value: vehicle.drivetrain },
    { icon: Palette, label: "Exterior", value: vehicle.exterior_color },
    { icon: Users, label: "Previous Owners", value: vehicle.owners || 'Contact Us' },
  ];

  return (
    <Layout>
    <div className="bg-zinc-950 min-h-screen">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-6 pt-6">
        <nav className="text-sm text-zinc-400 mb-6">
          <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/browse" className="hover:text-red-500 transition-colors">Browse</Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-50">{vehicle.year} {vehicle.make} {vehicle.model}</span>
        </nav>
      </div>

      <div className="container mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Vehicle Title */}
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-zinc-50 mb-2">{vehicle.year} {vehicle.make} {vehicle.model}</h1>
              <div className="flex flex-wrap gap-3 mb-4">
                <Badge variant="outline" className="bg-zinc-800 border-zinc-700 text-zinc-300">
                  Stock: {vehicle.id}
                </Badge>
              </div>
            </div>

            {/* Image gallery */}
            <VehicleImageGallery vehicle={vehicle} />

            {/* Price & Mobile actions */}
            <div className="bg-zinc-900 rounded-xl p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4">
                <div>
                  <p className="text-sm text-zinc-400 mb-1">Drive Away Price</p>
                  <p className="text-3xl md:text-4xl font-bold text-zinc-50">${vehicle.price?.toLocaleString()}</p>
                </div>
                {weeklyPayment && (
                  <div className="text-left sm:text-right mt-2 sm:mt-0">
                    <p className="text-sm text-zinc-400">Finance from</p>
                    <p className="text-xl md:text-2xl font-bold text-red-500">${weeklyPayment}/week*</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:hidden">
                <Button onClick={handleCall} className="gradient-red text-zinc-50 hover:opacity-90 font-semibold">
                  <Phone className="w-4 h-4 mr-2"/> Call
                </Button>
                <Button onClick={handleWhatsApp} className="bg-green-600 hover:bg-green-700 text-zinc-50 font-semibold">
                  <MessageCircle className="w-4 h-4 mr-2"/> WhatsApp
                </Button>
                <Button onClick={handleQuickEnquiry} variant="outline" className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-semibold">
                  <Send className="w-4 h-4 mr-2"/> Enquire
                </Button>
              </div>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {specItems.slice(0, 4).map((spec, i) => {
                const Icon = spec.icon;
                return (
                  <div key={i} className="bg-zinc-800 rounded-lg p-3 md:p-4 text-center">
                    <Icon className="w-4 h-4 md:w-5 md:h-5 text-red-500 mx-auto mb-2"/>
                    <p className="text-xs text-zinc-400 mb-1">{spec.label}</p>
                    <p className="text-sm font-semibold text-zinc-50">{spec.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid grid-cols-4 bg-zinc-900 p-1 rounded-lg">
                <TabsTrigger value="overview" className="data-[state=active]:bg-red-500 data-[state=active]:text-zinc-50">Overview</TabsTrigger>
                <TabsTrigger value="specs" className="data-[state=active]:bg-red-500 data-[state=active]:text-zinc-50">Specifications</TabsTrigger>
                <TabsTrigger value="features" className="data-[state=active]:bg-red-500 data-[state=active]:text-zinc-50">Features</TabsTrigger>
                <TabsTrigger value="history" className="data-[state=active]:bg-red-500 data-[state=active]:text-zinc-50">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="bg-zinc-900 border-zinc-800">
                  <CardHeader><CardTitle className="text-zinc-50">Vehicle Overview</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-zinc-400">{vehicle.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              {/* Specs, Features, History content similar */}
            </Tabs>

            {/* Dealer Comments */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader><CardTitle className="text-zinc-50 flex items-center"><Star className="w-5 h-5 mr-2 text-red-500"/>Dealer's Comments</CardTitle></CardHeader>
              <CardContent className="text-zinc-400">{vehicle.dealer_comments}</CardContent>
            </Card>

            {/* Related Vehicles */}
            {relatedVehicles.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-zinc-50">Similar Vehicles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedVehicles.map((v) => <VehicleCard key={v.id} vehicle={v} />)}
                </div>
              </div>
            )}
          </div>

          {/* Right column - desktop */}
          <div className="hidden lg:block lg:col-span-4 space-y-6">
            <VehicleEnquiryForm vehicle={vehicle} />
            <VehicleFinanceCalculator vehicle={vehicle} />
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="p-6 space-y-3">
                <Button onClick={handleCall} className="w-full gradient-red text-zinc-50 hover:opacity-90"><Phone className="w-4 h-4 mr-2"/> Call</Button>
                <Button onClick={handleWhatsApp} className="w-full bg-green-600 hover:bg-green-700 text-zinc-50"><MessageCircle className="w-4 h-4 mr-2"/> WhatsApp</Button>
                <Button variant="outline" className="w-full bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800"><Calendar className="w-4 h-4 mr-2"/> Book Test Drive</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Enquiry Modal */}
      {showMobileEnquiry && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileEnquiry(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-zinc-900 rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-zinc-50">Quick Enquiry</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMobileEnquiry(false)} className="text-zinc-400"><X className="w-5 h-5"/></Button>
            </div>
            <VehicleEnquiryForm vehicle={vehicle} />
          </div>
        </div>
      )}

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-800 p-4">
        <div className="flex space-x-3">
          <Button onClick={handleCall} className="flex-1 gradient-red text-zinc-50 hover:opacity-90 font-semibold py-3"><Phone className="w-4 h-4 mr-2"/> Call</Button>
          <Button onClick={handleWhatsApp} className="flex-1 bg-green-600 hover:bg-green-700 text-zinc-50 font-semibold py-3"><MessageCircle className="w-4 h-4 mr-2"/> WhatsApp</Button>
          <Button onClick={handleQuickEnquiry} variant="outline" className="flex-1 bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 font-semibold py-3"><Send className="w-4 h-4 mr-2"/> Enquire</Button>
        </div>
      </div>

      <StickyVehicleCTA vehicle={vehicle} className="hidden lg:block" />
    </div>
    </Layout>
  );
}
