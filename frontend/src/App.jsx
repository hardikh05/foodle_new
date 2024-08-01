        import React from 'react';
        import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
        import { Header } from './components/A';
        import { CartProvider } from './components/contextReducer';
        import {  Toaster } from 'react-hot-toast';
        import './App.css'
        import { Addrest } from './components/add';
        import { Foot } from './components/foot';
import { Food } from './components/restoPage';
import { Restaurant } from './components/Restaurent/restiPage';

        function App() {
            return (
                <CartProvider>
                    <Router>
                        <div >
                            <Toaster 
                                position="top-right"
                                reverseOrder={false}
                                toastOptions={{
                                    duration: 2000, 
                                }}
                            />
                            <Routes>
                                <Route path="/" element={<Header />} />
                                <Route path="/add" element={<Addrest />} />
                                <Route path="/foodle" element={<Food />} />
                                <Route path="/resto" element={<Restaurant />} />


                            </Routes>
                        </div>
                    </Router>
                    <Foot/>
                </CartProvider>
            );
        }

        export default App;