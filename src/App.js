import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import Menu from './components/Menu';
import ConsultaCaed from './pages/ConsultaCaed';
import ConsultaHabilidade from './pages/ConsultaHabilidade';
import ConsultaUpload from './pages/ConsultaUpload';
import Home from './pages/Home';
import { Container } from "react-bootstrap";
import ResultadoCaed from "./pages/ResultadoCaed";
import { ToastContainer, toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';
import Ajuda from "./pages/Ajuda";

function App() {
  return (
    <div>
      <Router >
        <Menu />
          <Container>
          <Route path="/consultacaed" component={ConsultaCaed} />
          <Route path="/consultaupload" component={ConsultaUpload} />
          <Route path="/consultahabilidade" component={ConsultaHabilidade} />
          <Route path="/resultadocaed" component={ResultadoCaed} />
          <Route path="/ajuda" component={Ajuda} />
          
          <Route path="/" exact component={Home} />
        </Container>
      </Router >    
      <ToastContainer />
    </div>
  );
}

export default App;
