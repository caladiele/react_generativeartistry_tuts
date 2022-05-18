import logo from './logo.svg';
import './App.css';

import TiledLines from './Components/TiledLines';
import JoyDivision from './Components/JoyDivision';
import CubicDisarray from './Components/CubicDisarray';
import TriangularMesh from './Components/TriangularMesh';
import UnDeuxTrois from './Components/UnDeuxTrois';
import CirclePacking from './Components/CirclePacking';
import HypnoticSquares  from './Components/HypnoticSquares';

function App() {
  return (
    <div className="App">
     <TiledLines />
     <JoyDivision />
     <CubicDisarray />
     <TriangularMesh />
     <UnDeuxTrois />
     <CirclePacking />
     <HypnoticSquares />
    </div>
  );
}

export default App;
