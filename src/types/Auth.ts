import { z } from 'zod/v4';

const passwordSchema = z
  .string({
    error: issue =>
      issue.input === undefined
        ? 'La contraseña es requerida'
        : 'La contraseña debe ser texto'
  })
  .trim()
  .min(8, { error: 'La contraseña debe tener al menos 8 caracteres' })
  .max(20, { error: 'La contraseña debe tener como máximo 20 caracteres' })
  .refine(val => /[0-9]/.test(val), {
    error: 'La contraseña debe incluir un número'
  })
  .refine(val => /[^A-Za-z0-9]/.test(val), {
    error: 'La contraseña debe incluir un carácter especial'
  });

const emailSchema = z.email({
  error: issue =>
    issue.input === undefined
      ? 'El correo electrónico es requerido'
      : 'Formato de correo electrónico no válido'
});

export const forgotPasswordSchema = z.object({
  email: emailSchema
});

export interface ResetPasswordData {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface VerifyCodeResponse {
  message: string;
  token: string;
}

export interface ForgotPasswordResponse {
  message: string;
}

export interface ResetPasswordResponse {
  message: string;
}

export const registerSchema = z.object(
  {
    username: z
      .string({
        error: issue =>
          issue.input === undefined || issue.input === ''
            ? 'El nombre de usuario es requerido'
            : 'El nombre de usuario debe ser texto'
      })
      .trim()
      .min(1, { error: 'El nombre de usuario es requerido' }),
    email: emailSchema,
    password: passwordSchema
  },
  {
    error: 'Datos inválidos para el registro'
  }
);

export const loginSchema = z.object(
  {
    email: emailSchema,
    password: passwordSchema
  },
  {
    error: 'Datos inválidos para el login'
  }
);

export const changeResetPasswordSchema = z
  .object(
    {
      newPassword: passwordSchema,
      confirmNewPassword: passwordSchema
    },
    {
      error: 'Datos inválidos para el cambio de contraseña'
    }
  )
  .refine(data => data.newPassword === data.confirmNewPassword, {
    error: 'Las contraseñas no coinciden'
  });

export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
