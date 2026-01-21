import { Head, usePage } from '@inertiajs/react';
import HeroSection from "@/components/home/HeroSection";
import { type SharedData } from '@/types';
import { Vehicle } from '@/types';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData & { vehicles: any[] }>().props;
    const { vehicles } = usePage<{ vehicles: Vehicle[] }>().props;

    return (
        <>
            <Head title="Welcome">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <HeroSection vehicles={vehicles} />
        </>
    );
}
