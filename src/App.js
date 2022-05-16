import logo from './logo.svg';
import './App.css';

import TiledLines from './Components/TiledLines';
import JoyDivision from './Components/JoyDivision';
import CubicDisarray from './Components/CubicDisarray';
import TriangularMesh from './TriangularMesh';

function App() {
  return (
    <div className="App">
     <TiledLines />
     <JoyDivision />
     <CubicDisarray />
     <TriangularMesh />
    </div>
  );
}

export default App;
