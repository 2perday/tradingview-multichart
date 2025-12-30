# tradingview-multichart

A customizable multi-chart dashboard for TradingView charts built with React, TypeScript, and Vite. Display multiple trading charts simultaneously with drag-and-drop grid layout, allowing you to monitor multiple markets at once.</br></br>
<img width="2559" height="1282" alt="image" src="https://github.com/user-attachments/assets/b53b3d7c-3952-4891-9f66-639497850e61" />

## Features

- **Multi-Chart Dashboard**: Display multiple TradingView charts simultaneously in a customizable grid layout
- **Drag & Drop**: Rearrange charts by dragging and dropping them to your preferred positions
- **Resizable Charts**: Adjust individual chart sizes to focus on what matters most
- **Chart Settings**: Configure each chart independently with custom symbols and time intervals
- **Persistent Layouts**: Automatically saves your layout to localStorage and URL for easy sharing
- **Theme Support**: Light/dark mode with system preference detection
- **Responsive Design**: Built with Tailwind CSS for a modern, responsive UI
- **Docker Support**: Easy deployment with Docker and Docker Compose

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tradingview-multichart.git
cd tradingview-multichart
```

2. Navigate to the frontend directory:
```bash
cd frontend
```

3. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Docker Deployment

### Using Docker Compose (Recommended)

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Build and start the container:
```bash
docker-compose up -d
```

3. Access the application at `http://localhost:8080`

### Using Docker

1. Build the Docker image:
```bash
cd frontend
docker build -t tradingview-multichart .
```

2. Run the container:
```bash
docker run -d -p 8080:80 --name tradingview-frontend tradingview-multichart
```

3. Access the application at `http://localhost:8080`

## Usage

### Adding Charts

Click the "Add Chart" button in the navigation bar to add a new chart to your dashboard.

### Configuring Charts

1. Click the settings icon (⚙️) on any chart
2. Enter the symbol (e.g., `BINANCE:BTCUSDT.P`)
3. Select the desired time interval
4. Click "Apply" to save changes

### Removing Charts

Click the X icon in the top-right corner of any chart to remove it from the dashboard.

### Rearranging Charts

Simply drag and drop charts to rearrange them in the grid layout. Your layout will be automatically saved.

### Sharing Layouts

Your chart layout is encoded in the URL, making it easy to share your dashboard configuration with others. Simply copy the URL and share it.

## Acknowledgments

- [TradingView](https://www.tradingview.com/) for providing the charting widget
- [shadcn](https://ui.shadcn.com/) for UI Design
- [react-grid-layout](https://github.com/react-grid-layout/react-grid-layout) for Responsive component layout
