# Wardogs L81 Fire Control

A lightweight mobile mortar fire control calculator designed for quick coordinate entry and rapid firing on the fly.

<img width="300" height="591" alt="L81 Fire Control Mobile Preview" src="https://github.com/user-attachments/assets/acfa8fa7-07f8-4af8-ada4-71c99ff8a7c0" />

## Features

- **Instant Ballistic Solution**: Computes distance and azimuth/bearing (0–359.9°) as coordinates are entered.
- **Built for Mobile**: Purpose-built tactical keypad with large tap targets and zero reliance on system software keyboards.
- **Auto-Advancing Grid Entry**: Automatically shifts focus to the next coordinate field.
- **Mortar Position Lock**: Lock mortar coordinates to quickly enter new target coordinates without accidental overwrites.
- **Clean Tactical UI**: High-contrast dark theme optimized for low-light environments and quick readability.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/TaylorBeck/Wardogs-L81-Fire-Control.git
   cd Wardogs-L81-Fire-Control
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) on your mobile browser or emulator.

## Coordinate Format & Math

- **Coordinates**: Decimal grid values (e.g., `109.08` and `96.67`).
- **Distance**: Calculated as scaled Euclidean distance between mortar and target coordinates.
- **Azimuth / Bearing**: Calculated clockwise relative to North (0–359.9°).

## Scripts

- `npm run dev` - Run development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server

## License

MIT
