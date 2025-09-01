import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Cadastro from '../pages/cadastro'
import Consulta from '../pages/consulta'
import Home from '../pages/home'

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/consulta" element={<Consulta />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes