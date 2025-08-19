import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { changeResetPasswordSchema } from '@/types/Auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPasswordRequest } from '@/services/auth';
import { toast } from 'sonner';
import { ArrowLeft, Eye, EyeOff, KeyRound, AlertTriangle } from 'lucide-react';
import { AxiosError } from 'axios';

const ChangeResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const form = useForm({
    resolver: zodResolver(changeResetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmNewPassword: ''
    },
    mode: 'onTouched'
  });

  useEffect(() => {
    if (!token) {
      setTokenValid(false);
      toast.error('Token de recuperación no válido');
    }
  }, [token]);

  const onSubmit = form.handleSubmit(async values => {
    if (!token) {
      toast.error('Token no válido');
      return;
    }

    try {
      await resetPasswordRequest({
        token,
        newPassword: values.newPassword,
        confirmNewPassword: values.confirmNewPassword
      });

      toast.success('Contraseña restablecida exitosamente');
      navigate('/login');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message || 'Error al restablecer la contraseña';
        toast.error(errorMessage);
      } else {
        toast.error('Error desconocido');
      }
    }
  });

  if (!tokenValid) {
    return (
      <main className="flex items-center justify-center min-h-screen p-6 bg-gold-light">
        <Card className="w-full max-w-sm mx-auto m-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-600 flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-blue-dark text-2xl font-bold">
              Token Inválido
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              El enlace de recuperación no es válido o ha expirado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Por favor solicita un nuevo enlace de recuperación.
              </p>
              <div className="space-y-2">
                <Link to="/forgot-password">
                  <Button className="w-full cursor-pointer bg-gold-base hover:bg-gold-dark text-white font-bold py-6 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold-base focus:ring-offset-2">
                    Solicitar nuevo enlace
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="w-full bg-white text-blue-base font-bold py-3 px-4 rounded-lg border-2 border-blue-base hover:bg-blue-base hover:text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al login
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-gold-light">
      <Card className="w-full max-w-sm mx-auto m-4">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-dark flex items-center justify-center">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-blue-dark text-2xl font-bold">
            Restablecer Contraseña
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Ingresa tu nueva contraseña
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nueva contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="pl-4 pr-10 transition-all focus-visible:ring-2 duration-200 focus-visible:ring-blue-dark focus-visible:border-none"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Nueva contraseña"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirmar nueva contraseña</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          className="pl-4 pr-10 transition-all focus-visible:ring-2 duration-200 focus-visible:ring-blue-dark focus-visible:border-none"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirmar nueva contraseña"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <Button
                  type="submit"
                  className="w-full cursor-pointer bg-gold-base hover:bg-gold-dark text-white font-bold py-6 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold-base focus:ring-offset-2 mt-4"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? 'Restableciendo...'
                    : 'Restablecer Contraseña'}
                </Button>

                <div className="space-y-2">
                  <Link to="/forgot-password">
                    <Button className="w-full bg-white text-blue-base font-bold py-3 px-4 rounded-lg border-2 border-blue-base hover:bg-blue-base hover:text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2">
                      Solicitar nuevo enlace
                    </Button>
                  </Link>

                  <Link to="/login">
                    <Button className="w-full bg-white text-blue-base font-bold py-3 px-4 rounded-lg border-2 border-blue-base hover:bg-blue-base hover:text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Volver al login
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ChangeResetPassword;
