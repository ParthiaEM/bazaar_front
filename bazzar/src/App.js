import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <br/>
        <Footer />
      </BrowserRouter>
    </div>
  );
}