import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </div>
  );
}