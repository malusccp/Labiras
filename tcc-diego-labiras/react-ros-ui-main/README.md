# React ROS UI

A modern web-based dashboard for monitoring and controlling ROS (Robot Operating System) robots, with a focus on Roomba robot management. This application provides real-time sensor data visualization, robot control interfaces, and activity logging.

## 🚀 Technologies

### Core Framework
- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Vite 5.2.0** - Build tool and dev server

### UI & Styling
- **Chakra UI 2.8.2** - Component library
- **Framer Motion 11.2.10** - Animations
- **Emotion** - CSS-in-JS styling
- **Plus Jakarta Sans** - Custom font

### Data Management
- **TanStack Query (React Query) 5.90.12** - Server state management and data fetching
- **Zustand 5.0.8** - Client state management
- **Axios 1.7.9** - HTTP client

### ROS Integration
- **ROSLIB.js 1.4.1** - ROS bridge client for WebSocket communication

### Data Visualization
- **Chart.js 4.4.3** - Charting library
- **react-chartjs-2 5.2.0** - React wrapper for Chart.js

### Routing & Navigation
- **React Router DOM 6.23.1** - Client-side routing

### Additional Libraries
- **react-joystick-component 6.2.1** - Joystick control for robot movement
- **react-spinners 0.14.1** - Loading indicators
- **dotenv 16.4.7** - Environment variable management

## 📁 Project Structure

```
src/
├── App.tsx                 # Root component with providers
├── main.tsx                # Application entry point
├── theme.ts                # Chakra UI theme configuration
│
├── axios/                  # HTTP client configuration
│   └── api.ts             # Axios instance setup
│
├── domain/                 # Domain models and types
│   ├── api/               # API response types
│   ├── bridge/            # ROS bridge types and requests
│   └── roomba/            # Roomba-specific types
│       ├── requests.ts    # API request functions
│       └── roombaTypes/   # Roomba sensor types
│           ├── battery.ts
│           ├── bumper.ts
│           ├── chargingState.ts
│           ├── cliff.ts
│           ├── wheels.ts
│           └── robot.ts
│
├── modules/                # Feature modules
│   ├── homePage/          # Home page
│   ├── roomba/            # Roomba monitoring dashboard
│   │   ├── components/    # Roomba-specific components
│   │   │   ├── activityCard/    # Activity chart component
│   │   │   ├── batteryCard/     # Battery status card
│   │   │   ├── bumperCard/      # Bumper sensors card
│   │   │   ├── cliffCard/       # Cliff sensors card
│   │   │   ├── wheelsCard/      # Wheel sensors card
│   │   │   └── Logs/            # Activity logs viewer
│   │   └── index.tsx
│   ├── roombaControl/     # Robot control interface
│   ├── browseTopics/      # ROS topics browser
│   └── robotsTopic/       # Individual robot topic viewer
│
├── services/               # Business logic and API services
│   ├── hooks/             # Custom React hooks
│   │   └── useGetLogs.ts  # Logs data fetching hook
│   └── logs_service.ts    # Logs service functions
│
├── shared/                 # Shared components and utilities
│   ├── components/        # Reusable UI components
│   │   ├── navbar/        # Navigation bar
│   │   ├── heading.tsx
│   │   └── Subtitles.tsx
│   ├── contexts/          # React contexts
│   │   ├── ros/           # ROS connection context
│   │   │   ├── ros_provider.tsx
│   │   │   ├── ros_hook.ts
│   │   │   └── ros_context.ts
│   │   └── navbar/        # Navbar context
│   ├── layouts/           # Layout components
│   │   └── main_layout.tsx
│   └── fakeSates/         # Mock data for development
│
├── stores/                 # Zustand state stores
│   ├── useRobotControlStore.ts
│   └── useVizualizationTypeStore.ts
│
├── routes/                 # Application routes
│   └── index.tsx
│
├── utils/                  # Utility functions
│   ├── blockedTopics.ts
│   ├── dateUtils.ts
│   ├── findMessageTypeByName.ts
│   ├── formattedLabel.ts
│   └── handleMessageClassByType.ts
│
└── models/                 # Data models
    └── generic/            # Generic model types
```

## 🎯 Features

### Robot Monitoring
- **Real-time Sensor Data**: Monitor battery, bumper, cliff, and wheel sensors
- **Activity Dashboard**: View monthly activity charts with duration tracking
- **Sensor Visualization**: Interactive cards displaying sensor states
- **Connection Status**: Real-time ROS connection monitoring

### Robot Control
- **Joystick Control**: Intuitive joystick interface for robot movement
- **Control Panel**: Direct control interface for Roomba operations

### ROS Integration
- **Topic Browser**: Browse and inspect ROS topics
- **WebSocket Connection**: Real-time communication with ROS bridge
- **Message Type Handling**: Automatic message type detection and parsing

### Data Management
- **Activity Logs**: Historical activity data with filtering by year
- **Data Caching**: Efficient data caching with React Query
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun
- ROS bridge running on `ws://localhost:9090` (or configure custom URL)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd react-ros-ui
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file (if needed)
```env
VITE_API_URL=http://localhost:3000
VITE_ROS_BRIDGE_URL=ws://localhost:9090
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

The production build will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### ROS Bridge Connection
The ROS connection URL can be configured in `src/shared/contexts/ros/ros_provider.tsx`:
```typescript
const url = "ws://localhost:9090";
```

### API Configuration
API base URL is configured in `src/axios/api.ts`.

## 🏗️ Architecture

### State Management
- **Server State**: Managed by TanStack Query for API data
- **Client State**: Managed by Zustand for UI state
- **ROS State**: Managed by React Context for ROS connection

### Component Architecture
- **Feature-based modules**: Each feature has its own module directory
- **Shared components**: Reusable components in `shared/components`
- **Domain-driven**: Domain types and models separated from UI

### Data Flow
1. ROS messages received via WebSocket
2. Messages parsed and typed using domain models
3. State updated through React Context
4. Components re-render with new data
5. API calls handled by React Query hooks

## 🧪 Development

### Code Style
- TypeScript strict mode enabled
- ESLint configured for React and TypeScript
- Component-based architecture

### Adding New Features
1. Create module in `src/modules/`
2. Add route in `src/routes/index.tsx`
3. Create domain types if needed in `src/domain/`
4. Add API hooks in `src/services/hooks/`

## 📄 License

This project is private and proprietary.

## 👥 Contributors

- Project maintained for TCC (Final Year Project)

---

**Note**: This application requires a running ROS bridge server to function properly. Ensure your ROS environment is configured before running the application.
