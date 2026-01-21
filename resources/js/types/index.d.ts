import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export 
interface Vehicle {
    id: number;
    make: string;
    model: string;
    year: number;
    price: number;
    stock_number: string | null;
    badge: string | null;
    rego_num: string | null;
    vin: string | null;
    engine_number: string | null;
    serial_number: string | null;
    special_price: number | null;
    odometer: number | null;
    body: string | null;
    color: string | null;
    interior_colour: string | null;
    engine_size: string | null;
    engine_make: string | null;
    cylinders: number | null;
    gear_type: string | null;
    gear_count: number | null;
    fuel_type: string | null;
    drive: string | null;
    door_num: number | null;
    wheel_size: string | null;
    wheels: number | null;
    axle_configuration: string | null;
    engine_power: string | null;
    power_kw: number | null;
    power_hp: number | null;
    rego_state: string | null;
    rego_expiry: string | null;
    build_date: string | null;
    compliance_date: string | null;
    gcm: number | null;
    gvm: number | null;
    tare: number | null;
    sleeping_capacity: number | null;
    toilet: boolean;
    shower: boolean;
    air_conditioning: boolean;
    fridge: boolean;
    stereo: boolean;
    gps: boolean;
    standard_features: string | null;
    optional_features: string | null;
    adv_description: string | null;
    short_description: string | null;
    yard_code: string | null;
    series: string | null;
    nvic: string | null;
    redbook_code: string | null;
    stock_type: string | null;
    is_demo: boolean;
    is_special: boolean;
    is_prestiged: boolean;
    is_used: boolean;
    is_dap: boolean;
    is_miles: boolean;
    is_featured: boolean;
    stock_status: string | null;
    warranty: string | null;
    towball_weight: number | null;
    images: string[] | null;
    created_by: number | null;
}
