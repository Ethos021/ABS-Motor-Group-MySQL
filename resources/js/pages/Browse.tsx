import React from "react";
import { Head } from "@inertiajs/react";
import Layout from "@/components/layout";
import VehicleCard from "@/components/shared/VehicleCard";

type Vehicle = {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number | null;
  images?: string[];
  odometer?: number;
  kilometers?: number;
  transmission?: string;
  body_type?: string;
  fuel_type?: string;
  engine?: string;
  badges?: string[];
  description?: string;
};

export default function Browse({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <Layout>
      <Head title="Browse Stock" />

      <section className="container mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-50 mb-8">
          Browse Our <span className="text-red-500">Collection</span>
        </h1>

        {vehicles.length === 0 && (
          <p className="text-zinc-400">No vehicles available.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </section>
    </Layout>
  );
}
