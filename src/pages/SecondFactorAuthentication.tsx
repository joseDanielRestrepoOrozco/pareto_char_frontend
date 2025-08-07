import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useAppSelector } from '@/hooks/store';
import { useAuth } from '@/hooks/useAuth';
import { Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type AuthenticationPurpose = 'activate-account' | 'verify-login';

const SecondFactorAuthentication = () => {
  const [code, setCode] = useState('');
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();
  const { purpose } = useParams<{ purpose?: AuthenticationPurpose }>();
  const { verifyCode } = useAuth();

  useEffect(() => {
    // Verificar si el usuario no está autenticado
    if (
      !user ||
      !purpose ||
      (purpose !== 'activate-account' && purpose !== 'verify-login')
    ) {
      navigate('/');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [purpose, user]);

  const isAccountActivation = purpose === 'activate-account';

  const handleVerify = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    await verifyCode(code, isAccountActivation);
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-gold-light">
      <Card className="w-full max-w-md mx-auto m-4">
        <CardHeader className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-dark flex items-center justify-center">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-blue-dark text-2xl font-bold">
            Verificación en dos pasos
          </CardTitle>
          <CardDescription className="text-gray-600 text-sm text-center">
            Hemos enviado un código de verificación de 6 dígitos a tu aplicación
            de autenticación o a{' '}
            <span className="font-medium text-blue-base">{user?.email}</span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col items-center space-y-4">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={value => {
                  setCode(value);
                }}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              <p className="text-sm text-gray-600 text-center">
                Ingresa el código de 6 dígitos de tu aplicación de autenticación
              </p>
            </div>

            <Button
              disabled={code.length !== 6}
              className="w-full cursor-pointer bg-gold-base hover:bg-gold-dark text-white font-bold py-6 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-gold-base focus:ring-offset-2"
              onClick={handleVerify}
            >
              Verificar código
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default SecondFactorAuthentication;
