# 3D Mathematical Function Grapher 


### Table of Contents
1. verview
2. Installation
3. Features
4. Usage Guide
5. Technical Details
6. Examples
7. Troubleshooting
8. Contributing

## Overview
The 3D Mathematical Function Grapher is an interactive web application that visualizes mathematical functions in three-dimensional space. Built with Three.js, it allows users to input custom functions and manipulate various parameters in real-time.

## Installation
#### Prerequisites

- Web browser with WebGL support
- Internet connection (for CDN resources)

 
``` [html] <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/dat-gui/0.7.7/dat.gui.min.js"></script>
```


### Setup Instructions

1. Clone the repository or download the HTML file
2. Open the HTML file in a web browser
3. No build process required - it works out of the box

## Features
### Core Features

- Real-time 3D visualization of mathematical functions.
- Interactive parameter adjustments.
- Custom function input.
- Wireframe toggle.
- Auto-rotation.
- Responsive design.
  
### GUI Controls
| Control | Description | Range |
|---------|-------------|--------|
| xMin | Minimum X value | -20 to 0 |
| xMax | Maximum X value | 0 to 20 |
| yMin | Minimum Y value | -20 to 0 |
| yMax | Maximum Y value | 0 to 20 |
| resolution | Mesh detail | 10 to 100 |
| height | Z-axis scaling | 0.1 to 5 |
| wireframe | Toggle wireframe mode | boolean |
| rotation | Toggle auto-rotation | boolean |

## Usage Guide

### Basic Usage
1. Open the application in a web browser
2. Enter a mathematical function in the input field
3. Click "Update Graph" to visualize
4. Use GUI controls to adjust parameters

### Writing Functions
Functions must:
- Use variables `x` and `y`
- Return a numeric value
- Use JavaScript Math object methods

Example valid functions:
```javascript
Math.sin(x) * Math.cos(y)
Math.sqrt(x*x + y*y)
Math.exp(-(x*x + y*y))
x*x - y*y
```

### Advanced Usage
- Combine multiple mathematical operations
- Use conditional operators
- Implement complex mathematical formulas

## Technical Details

### Architecture
```
├── HTML Structure
│   ├── Canvas Container
│   └── Controls Panel
├── Three.js Components
│   ├── Scene
│   ├── Camera
│   ├── Renderer
│   └── Lighting
└── Core Functions
    ├── init()
    ├── updateGraph()
    ├── animate()
    └── Event Handlers
```

### Key Components

#### Scene Setup
```javascript
scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);
```

#### Camera Configuration
```javascript
camera = new THREE.PerspectiveCamera(
    75,                                     // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1,                                    // Near plane
    1000                                    // Far plane
);
```

#### Mesh Generation
The graph mesh is generated using:
1. Buffer Geometry for efficient rendering
2. Vertex calculation based on function input
3. Dynamic triangle indices
4. Automated normal computation

## Examples

### Basic Functions

1. Sine Wave
```javascript
Math.sin(x) * Math.cos(y)
```
Creates a wave pattern in 3D space.

2. Cone
```javascript
Math.sqrt(x*x + y*y)
```
Generates a conical surface.

3. Gaussian Bell
```javascript
Math.exp(-(x*x + y*y))
```
Creates a bell curve surface.

### Complex Functions

1. Ripple Effect
```javascript
Math.sin(Math.sqrt(x*x + y*y)) / (Math.sqrt(x*x + y*y) + 1)
```

2. Saddle Surface
```javascript
x*x - y*y
```

## Troubleshooting

### Common Issues

1. Blank Screen
- Check WebGL support in browser
- Verify all dependencies are loaded
- Check console for errors

2. Performance Issues
- Reduce resolution parameter
- Disable auto-rotation
- Simplify complex functions

3. Invalid Function Errors
- Verify syntax
- Check for undefined variables
- Ensure function returns numeric values

## Contributing

### Development Setup
1. Fork the repository
2. Make changes locally
3. Test thoroughly
4. Submit pull request

### Code Style
- Use consistent indentation
- Comment complex operations
- Follow JavaScript best practices

### Feature Requests
- Open an issue describing the feature
- Provide use cases
- Include example functions if applicable
