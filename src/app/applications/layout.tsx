import { ReactNode } from 'react';
import AuthProvider from '@/contexts/AuthProvider'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
