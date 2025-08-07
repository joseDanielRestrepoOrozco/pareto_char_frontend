import { useAppDispatch, useAppSelector } from '@/hooks/store';
import {
  loginRequest,
  registerRequest,
  verifyTokenRequest,
  verifyLoginRequest,
  verifySignupRequest,
} from '@/services/auth';
import {
  setPendingUser,
  setUser,
  verifySuccess,
  clearUser,
} from '@/store/auth/slice';
import {
  type RegisterData,
  type LoginData,
  type VerifyCodeResponse,
} from '@/types/Auth';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const user = useAppSelector(state => state.auth.user);

  const signup = async (userData: RegisterData) => {
    toast.promise(registerRequest(userData), {
      loading: 'Registrando usuario...',
      success: user => {
        dispatch(setPendingUser(user));
        navigate('/authenticationCode/activate-account');
        return 'Registro exitoso';
      },
      error: error => {
        if (error instanceof AxiosError && error.response) {
          return `Error: ${error.response.data.error}`;
        }
        return 'Error inesperado al registrar usuario';
      },
    });
  };

  const login = async (userData: LoginData) => {
    toast.promise(loginRequest(userData), {
      loading: 'Iniciando sesión...',
      success: user => {
        // ✅ Solo guardamos datos temporales necesarios para verificación
        dispatch(setPendingUser(user));
        navigate('/authenticationCode/verify-login');
        return 'Inicio de sesión exitoso';
      },
      error: error => {
        if (error instanceof AxiosError && error.response) {
          return `Error: ${error.response.data.message}`;
        }
        return 'Error inesperado al iniciar sesión';
      },
    });
  };

  const verifyCode = async (code: string, verifyActivation: boolean) => {
    if (!user) {
      throw new Error('Usuario no definido');
    }

    const verifyRequest = verifyActivation
      ? () => verifySignupRequest(user.email, code)
      : () => verifyLoginRequest(user.email, code);

    toast.promise(verifyRequest(), {
      loading: 'Verificando código...',
      success: (data: VerifyCodeResponse) => {
        window.localStorage.setItem('token', data.token);
        dispatch(verifySuccess());
        navigate('/dashboard');
        return 'Código verificado exitosamente';
      },
      error: error => {
        if (error instanceof AxiosError && error.response) {
          return `Error: ${error.response.data.message}`;
        }
        return 'Error inesperado al verificar código';
      },
    });
  };

  const logout = () => {
    window.localStorage.removeItem('token');
    dispatch(clearUser());
  };

  const verifyToken = async () => {
    const token = window.localStorage.getItem('token');
    if (!token) return;
    try {
      const { user: fetchedUser, token: newToken } = await verifyTokenRequest(
        token
      );
      window.localStorage.setItem('token', newToken);
      dispatch(setUser(fetchedUser));
    } catch (error) {
      window.localStorage.removeItem('token');
      dispatch(clearUser());
      navigate('/');
      if (error instanceof AxiosError && error.response) {
        toast.error('Error al verificar el usuario');
      } else {
        toast.error('Error inesperado');
      }
    }
  };

  return {
    signup,
    login,
    verifyCode,
    logout,
    isAuthenticated,
    user,
    verifyToken,
  };
};
