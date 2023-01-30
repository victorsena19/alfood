import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import AdministracaoRestaurantes from './paginas/Administracao/Restaurante/AdministracaoRestaurantes';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import FormularioRestaurante from './paginas/Administracao/Restaurante/FormularioRestaurante';
import AdministracaoPratos from './paginas/Administracao/Pratos/AdministracaoPratos';
import FormularioPratos from './paginas/Administracao/Pratos/FormularioPrato';
import PaginaBaseAdmin from './paginas/Administracao/PaginaBaseAdmin';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin/' element={<PaginaBaseAdmin/>}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes/>} />
        <Route path="restaurantes/novo" element={<FormularioRestaurante/>} />
        <Route path="restaurantes/:id" element={<FormularioRestaurante/>} />
        <Route path="pratos" element={<AdministracaoPratos/>} />
        <Route path="pratos/novo" element={<FormularioPratos/>} />
        <Route path="pratos/:id" element={<FormularioPratos/>} />
      </Route>
    </Routes>
  );
}

export default App;
