import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { Eye, MessageCircle, Phone, Play } from 'lucide-react';

export default function FeaturedVehicle({ vehicle }) {
    if (!vehicle) return null;

    const handleViewDetails = () => {
        window.open(createPageUrl(`VehicleDetail?id=${vehicle.id}`), '_self');
    };

    const handleCall = () => {
        window.open('tel:+61419330301', '_self');
    };

    const handleWhatsApp = () => {
        const message = encodeURIComponent(
            `Hi, I'm interested in the featured ${vehicle.year} ${vehicle.make} ${vehicle.model}. Can you provide more information?`,
        );
        window.open(`https://wa.me/61419330301?text=${message}`, '_blank');
    };

    const calculateStandardWeeklyPayment = (price) => {
        if (!price) return null;
        const principal = price * 0.9;
        const monthlyRate = 0.0599 / 12;
        const termInMonths = 60;

        if (principal <= 0) return 0;

        const monthlyPayment =
            (principal *
                monthlyRate *
                Math.pow(1 + monthlyRate, termInMonths)) /
            (Math.pow(1 + monthlyRate, termInMonths) - 1);
        const weeklyPayment = (monthlyPayment * 12) / 52;

        return weeklyPayment.toFixed(0);
    };

    const weeklyPayment = calculateStandardWeeklyPayment(vehicle.price);

    return (
        <section className="bg-zinc-900 py-12 md:py-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mb-8 text-center md:mb-12">
                    <Badge className="gradient-red mb-4 px-4 py-2 text-sm text-zinc-50">
                        Car of the Week
                    </Badge>
                    <h2 className="mb-4 text-3xl font-bold text-zinc-50 md:text-4xl lg:text-5xl">
                        Featured Selection
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-zinc-400 md:text-xl">
                        Handpicked for excellence, showcasing the finest in
                        prestige motoring
                    </p>
                </div>

                <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-2">
                    {/* Vehicle Image */}
                    <div className="group relative">
                        <div className="luxury-shadow aspect-[16/9] overflow-hidden rounded-2xl md:aspect-[4/3]">
                            <img
                                src={
                                    vehicle.images?.[0] ||
                                    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop'
                                }
                                alt={`${vehicle.make} ${vehicle.model}`}
                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>

                        {/* Play Button Overlay - Hidden on mobile for better UX */}
                        <button className="group absolute inset-0 hidden items-center justify-center md:flex">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500 transition-transform group-hover:scale-110">
                                <Play className="ml-1 h-6 w-6 text-zinc-50" />
                            </div>
                        </button>
                    </div>

                    {/* Vehicle Details */}
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <h3 className="mb-2 text-2xl font-bold text-zinc-50 md:text-3xl lg:text-4xl">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                            </h3>
                            <p className="text-base text-zinc-400 md:text-lg">
                                {vehicle.description}
                            </p>
                        </div>

                        {/* Key Specs */}
                        <div className="grid grid-cols-2 gap-3 md:gap-4">
                            <div className="rounded-lg bg-zinc-800 p-3 md:p-4">
                                <p className="text-xs text-zinc-400 md:text-sm">
                                    Kilometers
                                </p>
                                <p className="text-sm font-semibold text-zinc-50 md:text-base">
                                    {vehicle.kilometers?.toLocaleString()} km
                                </p>
                            </div>
                            <div className="rounded-lg bg-zinc-800 p-3 md:p-4">
                                <p className="text-xs text-zinc-400 md:text-sm">
                                    Fuel Type
                                </p>
                                <p className="text-sm font-semibold text-zinc-50 md:text-base">
                                    {vehicle.fuel_type}
                                </p>
                            </div>
                            <div className="rounded-lg bg-zinc-800 p-3 md:p-4">
                                <p className="text-xs text-zinc-400 md:text-sm">
                                    Transmission
                                </p>
                                <p className="text-sm font-semibold text-zinc-50 md:text-base">
                                    {vehicle.transmission}
                                </p>
                            </div>
                            <div className="rounded-lg bg-zinc-800 p-3 md:p-4">
                                <p className="text-xs text-zinc-400 md:text-sm">
                                    Body Type
                                </p>
                                <p className="text-sm font-semibold text-zinc-50 md:text-base">
                                    {vehicle.body_type}
                                </p>
                            </div>
                        </div>

                        {/* Badges */}
                        {vehicle.badges && vehicle.badges.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                                {vehicle.badges.map((badge, index) => (
                                    <Badge
                                        key={index}
                                        variant="outline"
                                        className="border-zinc-700 bg-zinc-800 text-xs text-zinc-300"
                                    >
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                        )}

                        {/* Price & Finance */}
                        <div className="rounded-xl bg-zinc-800 p-4 md:p-6">
                            <div className="mb-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-end">
                                <div>
                                    <p className="text-xs text-zinc-400 md:text-sm">
                                        Price
                                    </p>
                                    <p className="text-2xl font-bold text-zinc-50 md:text-3xl">
                                        ${vehicle.price?.toLocaleString()}
                                    </p>
                                </div>
                                {weeklyPayment && (
                                    <div className="text-left sm:text-right">
                                        <p className="text-xs text-zinc-400 md:text-sm">
                                            From
                                        </p>
                                        <p className="text-lg font-semibold text-red-500 md:text-xl">
                                            ${weeklyPayment}/week
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Button
                                    onClick={handleViewDetails}
                                    className="gradient-red flex-1 text-zinc-50 hover:opacity-90"
                                >
                                    <Eye className="mr-2 h-4 w-4" />
                                    View Details
                                </Button>
                                <Button
                                    onClick={handleCall}
                                    variant="outline"
                                    className="flex-1 border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-700 sm:flex-none"
                                >
                                    <Phone className="mr-2 h-4 w-4" />
                                    Call
                                </Button>
                                <Button
                                    onClick={handleWhatsApp}
                                    variant="outline"
                                    className="flex-1 border-zinc-600 bg-transparent text-zinc-300 hover:bg-zinc-700 sm:flex-none"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
