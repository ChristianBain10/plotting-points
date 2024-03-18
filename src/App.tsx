import { useState } from 'react';
import './App.css';

type TPoint = {
  x: number;
  y: number;
}

function App() {

  const [points, setPoints] = useState<TPoint[]>([]);
  const [removedPoints, setRemovedPoints] = useState<TPoint[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    setPoints([...points, { x: e.clientX, y: e.clientY }]);
  }

  const handleClearPoints = () => {
    setPoints([]);
    setRemovedPoints([]);
  }

  const handleUndo = () => {
    let tempPoints = [...points];
    const removed = tempPoints.pop();
    if (removed) {
      setRemovedPoints([...removedPoints, removed])
    }
    setPoints(tempPoints);
  }

  const handleRedo = () => {
    let tempRemovedPoints = [...removedPoints];
    const redonePoint = tempRemovedPoints.pop();
    if (redonePoint) {
      setPoints([...points, redonePoint]);
    }
    setRemovedPoints(tempRemovedPoints);
  }

  return (
    <>
      <button style={{ zIndex: '100', margin: '10px' }} onClick={handleClearPoints}>Clear</button>
      <button disabled={points.length < 1} style={{ zIndex: '100', margin: '10px' }} onClick={handleUndo}>Undo</button>
      <button disabled={removedPoints.length < 1} style={{ zIndex: '100', margin: '10px' }} onClick={handleRedo}>Redo</button>
      <div className="app" onClick={(e) => handleClick(e)}>
        {points.map((point: TPoint) => {
          return (
            <div key={point.x} style={{ position: 'absolute', top: `${point.y - 10}px`, left: `${point.x - 10}px`, width: '15px', height: '15px', borderRadius: '10px', backgroundColor: 'red', zIndex: '1' }} />
          )
        })}
      </div>
    </>
  )
}

export default App
