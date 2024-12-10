import "./App.css";
import "./components/ColorPicker";
import ColorPicker from "./components/ColorPicker";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="App">
      <Navbar />
      <ColorPicker />
    </div>
  );
}

export default App;
