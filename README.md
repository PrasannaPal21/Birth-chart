# 🌟 Vedic Astrology Frontend

A modern React frontend for the Vedic Astrology API that provides an intuitive interface for birth chart calculations.

## ✨ Features

- **📋 Interactive Form**: Easy-to-use birth data input with validation
- **🌍 Popular Cities**: Quick-select dropdown for major Indian cities
- **🎯 Real-time Validation**: Instant feedback for form inputs
- **📅 Date Range Support**: Built-in validation for ephemeris date range (1899-2053)
- **🗺️ South Indian Birth Charts**: Traditional chart visualization in English and Tamil
- **🏠 Sripati Houses**: Beautiful display of all 12 house cusps
- **🪐 Planetary Positions**: Detailed view of all 9 grahas with degrees and signs
- **🔄 Tabbed Interface**: Switch between Summary, Charts, and Details views
- **📱 Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **🔧 Debug Mode**: Expandable technical details for advanced users
- **⚡ Fast Loading**: Optimized API calls with loading states
- **🎨 Modern UI**: Beautiful gradient backgrounds and smooth animations
- **🌐 Multi-language**: Chart labels in English and Tamil

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Access to the Vedic Astrology API

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

### Production Build

```bash
# Create optimized production build
npm run build

# Serve the build (optional)
npx serve -s build
```

## 🛠️ Configuration

The API URL is configured in `src/App.js`:

```javascript
const API_BASE_URL = 'https://astro-calculations.onrender.com';
```

To use a different API endpoint, simply change this value.

## 📱 User Interface

### Form Section
- **Name**: Full name input
- **Birth Place**: Location with quick-select for popular cities
- **Date & Time**: DateTime picker with range validation
- **Coordinates**: Latitude/longitude with auto-fill from city selection

### Chart Display

#### Summary Tab
- **Quick Summary**: Visual overview with zodiac symbols and key information
- **Basic Info**: Lagna, Moon sign, Ayanamsa at a glance

#### South Indian Charts
- **English Chart**: Traditional South Indian birth chart with English labels
- **Tamil Chart**: Traditional chart with Tamil zodiac names and planet symbols
- **Interactive Houses**: Click and hover effects for better user experience
- **Planet Placement**: Clear visualization of planetary positions in houses
- **Lagna Marker**: Special highlighting of the ascendant house

#### Details Tab  
- **Houses**: All 12 Sripati house cusps with degrees
- **Planets**: Detailed planetary positions with multiple formats
- **Debug Info**: Technical calculation details (collapsible)

### Error Handling
- **Date Range Errors**: Clear messaging for unsupported dates
- **Network Errors**: Helpful troubleshooting steps
- **Validation Errors**: Real-time field validation
- **API Errors**: Formatted error responses

## 🎨 Design Features

### Visual Elements
- **Zodiac Symbols**: Unicode symbols for signs and planets
- **Color Coding**: Houses and planets with distinct colors
- **Responsive Grid**: Adapts to screen size
- **Smooth Animations**: Hover effects and transitions

### Accessibility
- **Semantic HTML**: Proper form labels and structure
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Friendly**: ARIA labels and descriptions
- **High Contrast**: Good color contrast ratios

## 📊 Data Flow

```
User Input → Form Validation → API Call → Loading State → Chart Display
     ↓              ↓             ↓           ↓            ↓
  Form Data → Validation Check → HTTP POST → Spinner → Results View
```

### API Integration
- **Endpoint**: `POST /vedic-chart`
- **Request**: Birth data in JSON format
- **Response**: Complete chart data with houses and planets
- **Error Handling**: HTTP status codes and error messages

## 🔧 Technical Details

### Built With
- **React 18**: Modern React with hooks
- **Vanilla CSS**: No external UI libraries for maximum control
- **Fetch API**: Native browser HTTP client
- **ES6+**: Modern JavaScript features

### File Structure
```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── BirthDataForm.js     # Input form component
│   │   ├── ChartDisplay.js      # Chart results component with tabs
│   │   ├── SouthIndianChart.js  # South Indian birth chart component
│   │   ├── SouthIndianChart.css # Styles for chart visualization
│   │   ├── LoadingSpinner.js    # Loading state component
│   │   └── ErrorMessage.js      # Error handling component
│   ├── App.js              # Main application component
│   ├── App.css             # Global styles
│   └── index.js            # React DOM entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

### Key Components

#### BirthDataForm
- Form validation with real-time feedback
- Popular cities dropdown with coordinate auto-fill
- Date range validation (1899-2053)
- Responsive two-column layout for coordinates

#### ChartDisplay
- Tabbed interface with Summary, Charts, and Details
- Organized data presentation with sections
- Unicode symbols for zodiac signs and planets
- Collapsible debug information
- Color-coded visual elements

#### SouthIndianChart
- Traditional South Indian chart layout (12 houses in square formation)
- Multi-language support (English/Tamil)
- Accurate planet-to-house mapping based on degrees
- Visual planet symbols and zodiac signs
- Hover effects and interactive elements
- Responsive design for all screen sizes
- Central area with birth details

#### LoadingSpinner
- Animated CSS spinner
- Informative loading messages
- Centered layout

#### ErrorMessage
- Context-aware error handling
- Helpful troubleshooting information
- Retry functionality

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📱 Responsive Breakpoints

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🧪 Testing

### Manual Testing Checklist
- [ ] Form validation works for all fields
- [ ] Popular cities dropdown auto-fills coordinates
- [ ] Date picker enforces supported range
- [ ] API integration works with valid data
- [ ] Error handling works for invalid dates
- [ ] Network error handling works
- [ ] Chart displays all sections correctly
- [ ] Responsive design works on mobile
- [ ] Debug section expands/collapses
- [ ] New chart button resets state

### Test Data
```javascript
// Valid test data
{
  "name": "Test Person",
  "birthplace": "Mumbai, India",
  "birth_datetime": "1990-05-15T14:30:00",
  "latitude": 19.0760,
  "longitude": 72.8777
}

// Invalid date (should show error)
{
  "birth_datetime": "1800-01-01T12:00:00"
}
```

## 🚀 Deployment

### Netlify
1. Build the project: `npm run build`
2. Drag `build` folder to Netlify
3. Configure redirects for SPA routing

### Vercel
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `build`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://username.github.io/repo-name",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow React best practices
- Use semantic HTML
- Maintain accessibility standards
- Test on multiple screen sizes
- Keep components focused and reusable

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React team for the excellent framework
- Unicode Consortium for zodiac symbols
- Traditional Vedic astrology principles
- Modern web accessibility standards

---

**Built with ❤️ for the astrology community**
