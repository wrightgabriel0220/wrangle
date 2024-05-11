import Database from '@tauri-apps/plugin-sql';
import "./App.css";

const db = await Database.load('sqlite:wrangle.db');

function App() {
  return (
    <div className="container">
      Wrangle App
    </div>
  );
}

export default App;
