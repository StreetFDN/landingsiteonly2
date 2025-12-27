# Street Labs Landing Site

A premium Next.js landing site for Street Labs featuring multiple interactive experiences including 3D visualizations, countdown timers, and knowledge graphs.

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📍 Routes

### Main Routes

- **`/`** - Main landing page with Street Labs branding and features
- **`/city`** - 3D Network City visualization with interactive buildings
- **`/knowledge-graph`** - 3D Interactive Knowledge Graph of the robotics ecosystem
- **`/scouting`** - Scouting page
- **`/countdown`** - Countdown timer experience
- **`/web3`** - Web3 research page
- **`/verify`** - Verification page

### Featured: Knowledge Graph (`/knowledge-graph`)

An immersive 3D visualization exploring the interconnected world of robotics companies, investors, founders, technologies, and geographic hubs.

**Features:**
- 40+ nodes across 5 categories
- Force-directed 3D layout with physics simulation
- Interactive filtering by node type
- Premium visual effects (bloom, glow, vignette)
- Detailed information panels for each entity
- Real-time statistics and legend
- Full camera controls (rotate, zoom, pan)

**Tech Stack:**
- Three.js for 3D rendering
- React Three Fiber for React integration
- Custom force simulation algorithm
- Post-processing effects

See [components/knowledge-graph/README.md](components/knowledge-graph/README.md) for detailed documentation.

## 🎨 Visual Experiences

### Network City (`/city`)
- Futuristic 3D city layout
- Interactive startup buildings
- Dynamic day/night cycle
- Premium lighting and effects
- Detailed company information panels

### Knowledge Graph (`/knowledge-graph`)
- Force-directed graph layout
- Multiple node and edge types
- Real-world robotics data
- Interactive exploration
- Advanced filtering

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **3D Graphics:** Three.js, React Three Fiber, React Three Drei
- **Styling:** Tailwind CSS 4
- **Animation:** Framer Motion
- **Post-processing:** React Three Postprocessing
- **Icons:** Lucide React

## 📦 Dependencies

### Core
- `next` - Latest Next.js framework
- `react` - 19.2.0
- `react-dom` - 19.2.0

### 3D Graphics
- `three` - 0.182.0
- `@react-three/fiber` - 9.4.2
- `@react-three/drei` - 10.7.7
- `@react-three/postprocessing` - 3.0.4
- `@types/three` - 0.182.0

### UI & Animation
- `framer-motion` - 12.23.24
- `lucide-react` - 0.554.0
- `tailwindcss` - 4

## 🏗️ Project Structure

```
├── app/
│   ├── city/              # 3D Network City page
│   ├── knowledge-graph/   # 3D Knowledge Graph page
│   ├── countdown/         # Countdown page
│   ├── scouting/          # Scouting page
│   ├── web3/              # Web3 research page
│   ├── verify/            # Verification page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main landing page
├── components/
│   ├── city/              # Network City components
│   │   ├── assets/        # 3D models and assets
│   │   ├── effects/       # Visual effects
│   │   ├── layout/        # Layout components
│   │   └── ui/            # UI components
│   ├── knowledge-graph/   # Knowledge Graph components
│   │   ├── types.ts       # Type definitions
│   │   ├── graphdata.ts   # Dataset
│   │   ├── forcesimulation.ts # Physics engine
│   │   ├── graph3d.tsx    # Main 3D component
│   │   ├── graphnode.tsx  # Node component
│   │   ├── graphedge.tsx  # Edge component
│   │   └── ...            # UI components
│   └── physicsfooter.tsx  # Physics-based footer
├── public/
│   └── models/            # 3D model files (.glb)
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript config
└── tailwind.config.js     # Tailwind config
```

## 🎯 Key Features

### 3D Visualizations
- Hardware-accelerated WebGL rendering
- Optimized for performance
- Responsive design
- Premium visual effects

### Interactive Elements
- Click interactions
- Hover states
- Camera controls
- Dynamic filtering
- Smooth animations

### Data-Driven
- Real company information
- Relationship mapping
- Geographic clustering
- Technology connections

## 🚀 Development

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/StreetFDN/landingsiteonly2.git

# Navigate to directory
cd landingsiteonly2

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Create optimized build
npm run build

# Start production server
npm start
```

### Linting

```bash
npm run lint
```

## 🎨 Styling

The project uses Tailwind CSS 4 with a custom dark theme optimized for premium 3D experiences.

### Color Palette

```css
/* Dark Mode (Primary) */
--background: #202020;
--surface: #1A1A1A;
--surface-highlight: #2A2A2A;
--border: #3A3A3A;
--text-main: #EAEAEA;
--text-muted: #999999;
--street-green: #00C957;
--street-red: #FF4D4D;

/* Knowledge Graph */
--kg-bg: #0a0a0a;
--company: #00bfff;
--investor: #ff8c00;
--founder: #ffd700;
--technology: #00ff7f;
--location: #ff69b4;
```

## 📝 Documentation

- [Knowledge Graph Documentation](components/knowledge-graph/README.md)
- [Model References](MODEL_REFERENCES.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)

## 🐛 Troubleshooting

### 3D Scenes Not Rendering
- Ensure WebGL is supported in your browser
- Check browser console for errors
- Try disabling hardware acceleration as a test

### Performance Issues
- Use filtering to reduce visible elements
- Lower quality settings in effects
- Check GPU usage in browser dev tools

### Build Errors
- Clear `.next` directory: `rm -rf .next`
- Delete node_modules: `rm -rf node_modules`
- Reinstall: `npm install`
- Rebuild: `npm run build`

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Other Platforms

This Next.js app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- Render
- AWS Amplify
- Google Cloud Run

See [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for details.

## 🤝 Contributing

This is a private project for Street Labs. For contributions, please contact the team.

## 📄 License

All rights reserved © 2024 Street Labs

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/) by Vercel
- [Three.js](https://threejs.org/) for 3D graphics
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) by Poimandres
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📧 Contact

For questions or support:
- Website: [street.app](https://street.app)
- Twitter: [@StreetFDN](https://twitter.com/StreetFDN)
- GitHub: [StreetFDN](https://github.com/StreetFDN)
