import Greeting from './Greeting';
import './App.css';

const tips = [
  "Stay positive and happy. Work hard and don't give up hope.",
  "Success is not final, failure is not fatal.",
  "Believe you can and you're halfway there."
];

function App() {
  return (
    <main className="page">
      <section className="card">
        <Greeting name="Ratchanon" />
        <div className="tips-block">
          <h2>Motivational Tips</h2>
          <ul className="tips-list">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default App;
