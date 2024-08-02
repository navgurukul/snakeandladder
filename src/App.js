import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./Components/Header";
import Footer from './Components/Footer';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
