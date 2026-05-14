import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Page/Login'
import Register from './Page/Register'
import Pannel from './Layout/Pannel'
import Dashboard from './Page/Dashboard'
import { Toaster } from 'react-hot-toast'
import NotFound from './Page/NotFound'
import Owners from './Component/Owners'
import Parcels from './Component/Parcels'
import Transfer from './Component/Transfer'
import Receipt from './Component/Receipt'
import Report from './Component/Report'

const App = () => {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Pannel />}>
            <Route index element={<Dashboard />} />
            <Route path="owner" element={<Owners />} />
            <Route path="land" element={<Parcels />} />
            <Route path="transfer" element={<Transfer />} />
            <Route path="payment" element={<Receipt />} />
            <Route path="report" element={<Report />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App