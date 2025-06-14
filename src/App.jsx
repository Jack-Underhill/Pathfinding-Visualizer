import { useState } from 'react'
import CanvasGrid from "./components/CanvasGrid"

function App() {
  return (
    <div className="p-10 min-h-screen bg-background flex flex-col justify-center items-center gap-10">
      <div className="text-sky-400 text-3xl font-bold">
        Pathfinding Visualizer | Maze Generator
      </div>
      <div className="text-sky-200 text-xl font-bold">
        Vite · React · TailwindCSS · Netlify
      </div>
      <CanvasGrid />
    </div>
  )
}

export default App
