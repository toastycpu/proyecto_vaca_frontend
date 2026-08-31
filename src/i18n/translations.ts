export const translations = {
  en: {
    appTitle: 'VAQUERO',
    tagline: 'Sustainable Bolivian beef, traced from origin.',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    login: 'Login',
    register: 'Register',
    createAccount: 'Create an Account',
    alreadyHaveAccount: 'Already have an account? Login',
    forgotPassword: 'Forgot Password',
  },
  es: {
    appTitle: 'VAQUERO',
    tagline: 'Carne boliviana sostenible, trazada desde el origen.',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    login: 'Iniciar sesión',
    register: 'Registrarse',
    createAccount: 'Crear una cuenta',
    alreadyHaveAccount: '¿Ya tienes una cuenta? Inicia sesión',
    forgotPassword: 'Olvidé mi contraseña',
  },
} as const;

export type TranslationKey = keyof typeof translations.en;