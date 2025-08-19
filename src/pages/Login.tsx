import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, LockIcon, Mail } from 'lucide-react';
import { useEffect } from 'react';
import { loginSchema } from '@/types/Auth';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onTouched'
  });

  const onSubmit = form.handleSubmit(async values => {
    await login(values);
  });

  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-gold-light">
      <Card className="w-full max-w-sm mx-auto m-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-dark flex items-center justify-center">
            <LockIcon className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-blue-dark text-2xl font-bold">
            Iniciar sesión
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Ingresa tus credenciales para acceder a tu cuenta.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          className="pl-10 transition-all focus-visible:ring-2 duration-200 focus-visible:ring-blue-dark focus-visible:border-none"
                          type="email"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          className="pl-10 pr-10 transition-all focus-visible:ring-2 duration-200 focus-visible:ring-blue-dark focus-visible:border-none"
                          type="password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={!form.formState.isValid}
                className="w-full cursor-pointer bg-gold-base hover:bg-gold-dark text-white font-bold py-6 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold-base focus:ring-offset-2 mt-4"
              >
                Iniciar Sesión
              </Button>
            </form>
          </Form>
          <div className="mt-4">
            <Link
              to="/register"
              className="w-full bg-white text-blue-base font-bold py-3 px-4 rounded-lg border-2 border-blue-base hover:bg-blue-base hover:text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2 block text-center no-underline"
            >
              ¿Nuevo usuario? Regístrate aquí
            </Link>
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-base hover:text-blue-dark transition-colors duration-200"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default LoginPage;
