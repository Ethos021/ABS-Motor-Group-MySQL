import React from "react";
import Layout from "@/components/layout";
import { Shield, Car, HandCoins, Truck, FileText, Landmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const services = [
    {
      icon: Car,
      title: "Hand-Picked Vehicles",
      description:
        "A carefully curated selection of prestige and luxury vehicles, inspected and presented to a high standard.",
    },
    {
      icon: HandCoins,
      title: "Trade-In Appraisals",
      description:
        "Competitive on-the-spot trade-in appraisals across all makes and models.",
    },
    {
      icon: Truck,
      title: "Australia-Wide Delivery",
      description:
        "Door-to-door vehicle delivery available for interstate customers.",
    },
    {
      icon: Shield,
      title: "Extended Warranties",
      description:
        "A range of extended warranty options available for added peace of mind.",
    },
    {
      icon: Landmark,
      title: "Multiple Finance Options",
      description:
        "Access to a broad network of lenders to secure the right finance solution.",
    },
    {
      icon: FileText,
      title: "Sell Direct To Us",
      description:
        "Sell your vehicle directly to us with a fast, transparent process.",
    },
  ];

  return (
    <Layout>
      <div className="bg-zinc-950 text-zinc-50">
        {/* HERO */}
        <section className="relative h-[70vh] flex items-center">
          <img
            src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=1920&h=900&fit=crop"
            alt="Luxury showroom"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 to-zinc-950/60" />

          <div className="relative container mx-auto px-6">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                About{" "}
                <span className="text-red-500">A.B.S Motor Group</span>
              </h1>
              <p className="text-xl md:text-2xl text-zinc-300 leading-relaxed">
                The home of prestige and luxury vehicles.
              </p>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section className="py-24 bg-zinc-900">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Dealership</h2>
                <div className="space-y-6 text-zinc-400 leading-relaxed">
                  <p>
                    A.B.S Motor Group is built on a simple belief — buying a car
                    should be clear, honest, and uncomplicated.
                  </p>
                  <p>
                    We focus on quality over volume and long-term relationships
                    over short-term sales. From your first enquiry to vehicle
                    handover, our approach is transparent, considered, and
                    professional.
                  </p>
                  <p>
                    Every vehicle is carefully selected, thoroughly inspected,
                    and accurately represented — both online and in person.
                  </p>
                  <p>
                    No pressure. No mixed messages. Just the right vehicle and a
                    seamless buying experience.
                  </p>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1558284344-9c95ad9e678a?w=800&h=600&fit=crop"
                  alt="Showroom vehicle"
                  className="rounded-2xl shadow-2xl"
                />

                <div className="absolute -bottom-8 -left-8 bg-zinc-800 rounded-xl p-4 flex items-center gap-4 border border-zinc-700">
                  <div className="w-12 h-12 bg-white rounded-md flex items-center justify-center">
                    <img
                      src="https://images.squarespace-cdn.com/content/v1/5e718e24c539f905c3d25f29/1585292728987-9VBC1Y92TO4Y09C6I4D9/VACC-logo.png"
                      alt="VACC"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">VACC Accredited</p>
                    <p className="text-zinc-400 text-sm">LMCT 12986</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Our Services
              </h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                Everything you need to support the purchase, sale, and ownership
                of your next vehicle.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <Card
                    key={index}
                    className="bg-zinc-900 border-zinc-800 hover:bg-zinc-800 transition-all"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-xl gradient-red flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">
                        {service.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
