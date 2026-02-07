import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AccountsProvider } from './context/AccountsContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ManageAccounts from './pages/ManageAccounts';
import CodeforcesProfile from './pages/CodeforcesProfile';
import CodeforcesCombined from './pages/CodeforcesCombined';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected routes */}
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <AccountsProvider>
                                        <Layout />
                                    </AccountsProvider>
                                </ProtectedRoute>
                            }
                        >
                            <Route index element={<Dashboard />} />
                            <Route path="accounts" element={<ManageAccounts />} />
                            <Route path="settings" element={<Settings />} />

                            {/* Codeforces routes */}
                            <Route path="codeforces/combined" element={<CodeforcesCombined />} />
                            <Route path="codeforces/:handle" element={<CodeforcesProfile />} />

                            {/* Generic platform route (placeholder) */}
                            <Route path=":platform/:handle" element={<Dashboard />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
