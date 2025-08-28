import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import SecondFactorAuthentication from '@/pages/SecondFactorAuthentication';
import ForgotPassword from '@/pages/ForgotPassword';
import ChangeResetPassword from '@/pages/ChangeResetPassword';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/sonner';

const App = () => {
  const { verifyToken } = useAuth();

  useEffect(() => {
    verifyToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/changeResetPassword/:token"
          element={<ChangeResetPassword />}
        />
        <Route
          path="/AuthenticationCode/:purpose"
          element={<SecondFactorAuthentication />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/:id" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <Toaster position="bottom-right" richColors />
    </>
  );
};

export default App;
