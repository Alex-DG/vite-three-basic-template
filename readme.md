# ⚡️ Vite Three Basic Template 🚀

A modular, scalable starter template for creating **Three.js** experiences using **Vite.js**. It follows a class-based architecture to keep the code organized and maintainable.

## Setup

Run the following commands:

```bash
# Install dependencies (only the first time)
yarn

# Run the local server
yarn dev

# Build for production in the dist/ directory
yarn build
```

## 🏗 Project Structure

The project is organized into a modular structure where each responsibility is separated into its own class.

```
src/
├── Experience/
│   ├── Utils/
│   │   ├── EventEmitter.js    # Base class for event handling
│   │   ├── Sizes.js           # Handles window resize events
│   │   └── Time.js            # Handles the requestAnimationFrame loop
│   ├── World/
│   │   ├── Cube.js            # Cube object logic
│   │   ├── Environment.js     # Lights and Environment Maps
│   │   ├── Floor.js           # Floor object logic
│   │   └── World.js           # Scene manager (orchestrator)
│   ├── Camera.js              # Three.js Camera & OrbitControls
│   ├── Experience.js          # Main Singleton & Coordinator
│   └── Renderer.js            # Three.js WebGLRenderer
├── app.js                     # Entry point
└── index.html
```

## 🧠 Architecture Overview

### Core Concept: The Singleton
The `Experience.js` class acts as a **Singleton**. This means it can be instantiated once, and subsequent instantiations or imports will refer to that same instance. This allows deep components (like a Cube inside World) to easily access global resources (like `experience.time` or `experience.camera`) without passing parameters down a long chain.

### 1. The Utilities (`src/Experience/Utils/`)
Helper classes that handle the "plumbing" of the web app.
*   **`EventEmitter.js`**: A base class that allows other classes to trigger and listen for events (like 'resize' or 'tick').
*   **`Sizes.js`**: Listens for window resize events. It calculates the new width, height, and pixel ratio, then triggers a `'resize'` event for the rest of the app to update.
*   **`Time.js`**: Handles the main animation loop (`requestAnimationFrame`). It calculates `delta` (time since last frame) and `elapsed` time, then triggers a `'tick'` event every frame.

### 2. The Experience (`src/Experience/Experience.js`)
The main orchestrator. It:
1.  Setup the Canvas.
2.  Initializes all other components (`Sizes`, `Time`, `Camera`, `Renderer`, `World`).
3.  Listens to `Sizes` to resize the camera and renderer.
4.  Listens to `Time` to update the world, camera, and renderer every frame.

### 3. The World (`src/Experience/World/`)
Everything that is **inside** the 3D scene.
*   **`World.js`**: The **orchestrator** of the scene. It instantiates all objects (`Cube`, `Floor`, `Environment`) but contains no object-specific logic itself.
*   **`Cube.js` / `Floor.js`**: Self-contained classes for specific objects. They handle their own geometry, material, mesh creation, and animation updates.
*   **`Environment.js`**: manages lighting (Ambient, Directional) and environment maps. Separating this allows for easy tweaking of the global visual mood.

### 4. The View
*   **`Camera.js`**: Sets up the `PerspectiveCamera` and `OrbitControls`.
*   **`Renderer.js`**: Sets up the `WebGLRenderer`, keeping it consistent with the `Sizes` (pixel ratio, resolution) and handling Shadow Maps and Tone Mapping.

## 🔄 Adding New Features

To add a new object (e.g., a Fox model):
1.  Create a `Fox.js` class in `src/Experience/World/`.
2.  Instantiate it in `World.js`.
3.  If it needs animation, give it an `update()` method and call it from `World.update()`.
