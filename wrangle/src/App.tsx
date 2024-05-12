import Database from '@tauri-apps/plugin-sql';
import "./App.css";
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';

const db = await Database.load('sqlite:wrangle.db');

function App() {
  const [selectedViewId, setSelectedViewId] = useState();

  return (
    <div className="container">
      <Sidebar />
      <div id="ui-pane">
        <Toolbar />
      </div>
    </div>
  );
}

export default App;
