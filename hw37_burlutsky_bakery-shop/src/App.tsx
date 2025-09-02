import {Routes, Route} from 'react-router-dom';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import MainLayout from '@/layouts/MainLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

import Home from '@/pages/Home';
import Orders from '@/pages/Orders.tsx';
import BreadPage from '@/pages/Bread.tsx';
import Diary from '@/pages/Diary.tsx';
import ShoppingCard from '@/pages/ShoppingCard.tsx';
import Login from '@/pages/Login';
import Error404Page from "@/pages/service/Error404Page.tsx";

const theme = createTheme({palette: {mode: 'light'}});

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            {/*<CssBaseline/>*/}
            <Routes>
                <Route element={<MainLayout/>}>
                    {/* public */}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/bread" element={<BreadPage/>}/>
                    <Route path="/login" element={<Login/>}/>

                    {/* protected */}
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/card" element={<ShoppingCard/>}/>
                        <Route path="/diary" element={<Diary/>}/>
                    </Route>

                    {/* fallback */}
                    <Route path="*" element={<Error404Page/>}/>
                </Route>
            </Routes>
        </ThemeProvider>
    );
}
