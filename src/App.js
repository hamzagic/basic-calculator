import Wrapper from './components/wrapper/Wrapper';
import Keyboard from './components/keyboard/Keyboard';
import './App.css';

function App() {
  return (
    <div className="App">
    Calculator
    <Wrapper>
      <Keyboard />
    </Wrapper>
    </div>
  );
}

export default App;
