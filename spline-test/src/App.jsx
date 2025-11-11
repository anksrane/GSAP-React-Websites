import Test from './sections/Test';
import PlusBackgroundSection from './sections/PlusBackgroundSection/PlusBackgroundSection';
import './App.css';

function App() {

  return (
    <>
      <Test />
      <div className="outerconatiner">
        <PlusBackgroundSection />
      </div>
      <Test />
    </>
  )
}

export default App
