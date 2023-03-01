import logo from './logo.svg';
import './App.css';

import Kanban from './components/Kanban';

const data = [
  {name:'To Do', tasks:['task 1', 'task 2', 'task 3']},
  {name:'Work In Progress', tasks:['task 4', 'task 5']},
  {name:'Completed', tasks:['task 6']}
]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <main>
          <h1>Kanban Board</h1>
          <Kanban data={data}/>
        </main>
      </header>
    </div>
  );
}

export default App;
