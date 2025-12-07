'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (login(username, password)) {
            router.push('/dashboard');
        } else {
            setError('Usuario o contraseña incorrectos');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-8">
                <h1 className="mb-6 text-center text-3xl font-bold">Iniciar Sesión</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        type="text"
                        placeholder="Usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="text-sm text-red-600">{error}</p>}
                    <Button type="submit" className="w-full">
                        Entrar
                    </Button>
                </form>
            </Card>
        </div>
    );
}
