# Home Components

This directory contains React components specifically designed for the home/welcome page.

## Usage

All components in this directory are automatically exported through `index.ts` and can be imported in the welcome page like this:

```tsx
import * as HomeComponents from '@/components/home';

// Use individual components
<HomeComponents.FeaturedVehicle vehicle={vehicleData} />;
```

Or import specific components:

```tsx
import { FeaturedVehicle } from '@/components/home';

// Use the component
<FeaturedVehicle vehicle={vehicleData} />;
```

## Adding New Components

1. Create your component file in this directory (e.g., `HeroSection.tsx`)
2. Add an export to `index.ts`:
    ```ts
    export { default as HeroSection } from './HeroSection.tsx';
    ```
3. The component will automatically be available in the welcome page via the `HomeComponents` namespace

## Available Components

- **FeaturedVehicle**: Displays a featured vehicle with details, images, and call-to-action buttons
