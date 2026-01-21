// resources/js/Components/HeroSection.jsx
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const heroImages = [
  "/images/hero-1.jpg",
  "/images/hero-2.jpg",
  "/images/hero-3.jpg",
];

export default function HeroSection({ vehicles = [] }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Filters state
  const [filters, setFilters] = useState({
    make: "", // internal value
    yearRange: [2015, 2024],
    priceRange: [0, 500000],
    kmRange: [0, 300000],
  });

  // Hero image slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Unique vehicle makes
  const uniqueMakes = [...new Set((vehicles || []).map((v) => v.make).filter(Boolean))].sort();

  // Years list dynamically from 2000 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2000 + 1 }, (_, i) => currentYear - i);

  // Predefined KM ranges
  const kmRanges = [
    { label: "Under 50,000 km", value: [0, 50000] },
    { label: "50,000 - 100,000 km", value: [50000, 100000] },
    { label: "100,000 - 150,000 km", value: [100000, 150000] },
    { label: "150,000 - 200,000 km", value: [150000, 200000] },
    { label: "Above 200,000 km", value: [200000, 300000] },
  ];

  // Predefined Price ranges
  const priceRanges = [
    { label: "Under $150,000", value: [0, 150000] },
    { label: "$150,000 - $300,000", value: [150000, 300000] },
    { label: "$300,000 - $550,000", value: [300000, 550000] },
    { label: "Above $550,000", value: [550000, 999999999] },
  ];

  const handleSearch = () => {
    router.get("/browse", {
      make: filters.make || undefined,
      priceMin: filters.priceRange[0],
      priceMax: filters.priceRange[1],
      yearMin: filters.yearRange[0],
      yearMax: filters.yearRange[1],
      kmMin: filters.kmRange[0],
      kmMax: filters.kmRange[1],
    });
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Background Images */}
      <AnimatePresence mode="wait">
        <motion.img
          key={currentImage}
          src={heroImages[currentImage]}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-black/70" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center px-6">
  {/* Open Hours Badge */}
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm mb-6"
  >
    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
    <span className="text-red-500 text-sm font-medium tracking-wider">
      OPEN MON-FRI
    </span>
  </motion.div>

  <h1 className="text-6xl font-bold text-white mb-6">
    Welcome to <span className="text-red-500">A.B.S Motor Group</span>
  </h1>
        <div className="bg-zinc-900/80 rounded-xl p-6 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Make Selector */}
            <Select
              value={filters.make || "all"}
              onValueChange={(v) => setFilters({ ...filters, make: v === "all" ? "" : v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Makes</SelectItem>
                {uniqueMakes.map((make) => (
                  <SelectItem key={make} value={make}>
                    {make}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="bg-zinc-800 border border-zinc-700 rounded px-4 py-2 flex justify-between items-center w-full">
                  {filters.yearRange[0] === filters.yearRange[1]
                    ? filters.yearRange[0]
                    : `${filters.yearRange[0]} - ${filters.yearRange[1]}`}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-40 p-2 bg-zinc-800 border border-zinc-700">
                <div className="max-h-64 overflow-y-auto">
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => setFilters({ ...filters, yearRange: [y, y] })}
                      className={`block w-full text-left px-2 py-1 rounded hover:bg-red-500/20 ${
                        filters.yearRange[0] === y && filters.yearRange[1] === y
                          ? "bg-red-500/20"
                          : ""
                      }`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Price Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="bg-zinc-800 border border-zinc-700 rounded px-4 py-2 flex justify-between items-center w-full">
                  {filters.priceRange[0] === 0 && filters.priceRange[1] === 500000
                    ? "Price"
                    : `$${filters.priceRange[0].toLocaleString()} - $${filters.priceRange[1].toLocaleString()}`}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4 bg-zinc-800 border border-zinc-700">
                <div className="space-y-2">
                  {priceRanges.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setFilters({ ...filters, priceRange: r.value })}
                      className="block w-full text-left px-2 py-1 rounded hover:bg-red-500/20"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* KM Popover */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="bg-zinc-800 border border-zinc-700 rounded px-4 py-2 flex justify-between items-center w-full">
                  {filters.kmRange[0] === 0 && filters.kmRange[1] === 300000
                    ? "Kilometers"
                    : `${filters.kmRange[0].toLocaleString()} - ${filters.kmRange[1].toLocaleString()} km`}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4 bg-zinc-800 border border-zinc-700">
                <div className="space-y-2">
                  {kmRanges.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => setFilters({ ...filters, kmRange: r.value })}
                      className="block w-full text-left px-2 py-1 rounded hover:bg-red-500/20"
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              className="col-span-1 md:col-span-1 bg-red-600 flex items-center justify-center"
            >
              <Search className="mr-2" /> Search Vehicles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
