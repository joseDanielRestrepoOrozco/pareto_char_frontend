import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { forgotPasswordRequest } from '@/services/auth';
import { toast } from 'sonner';
import { ArrowLeft, Mail, KeyRound } from 'lucide-react';
import { AxiosError } from 'axios';

const forgotPasswordSchema = z.object({
  email: z.email('Correo electrónico no válido'),
});

const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = form.handleSubmit(async values => {
    try {
      await forgotPasswordRequest({ email: values.email });
      setIsEmailSent(true);
      toast.success('Se ha enviado un enlace de recuperación a tu email');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.message ||
          'Error al enviar el enlace de recuperación';
        toast.error(errorMessage);
      } else {
        toast.error('Error desconocido');
      }
    }
  });

  if (isEmailSent) {
    return (
      <main className="flex items-center justify-center min-h-screen p-6 bg-gold-light">
        <Card className="w-full max-w-sm mx-auto m-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-dark flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-blue-dark text-2xl font-bold">
              Email Enviado
            </CardTitle>
            <CardDescription className="text-gray-600 text-sm">
              Se ha enviado un enlace de recuperación a{' '}
              <strong>{form.getValues('email')}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                Revisa tu bandeja de entrada y haz clic en el enlace para
                restablecer tu contraseña.
              </p>
              <div className="space-y-2">
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
            ¿Olvidaste tu contraseña?
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm">
            Ingresa tu email y te enviaremos un enlace para restablecer tu
            contraseña
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
                          placeholder="Ingresa tu email"
                          {...field}
                        />
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
                    ? 'Enviando...'
                    : 'Enviar enlace de recuperación'}
                </Button>

                <Link to="/login">
                  <Button
                    type="button"
                    className="w-full bg-white text-blue-base font-bold py-3 px-4 rounded-lg border-2 border-blue-base hover:bg-blue-base hover:text-white transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al login
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ForgotPassword;
