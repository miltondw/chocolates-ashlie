/**
 * Página de Contacto
 */

'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useToast } from '@/components/ui/Toast';
import { COMPANY_INFO } from '@/lib/constants';
import { contactFormSchema } from '@/lib/validations';

export default function ContactPage() {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            const result = contactFormSchema.safeParse(formData);
            if (!result.success) {
                const fieldErrors: Record<string, string> = {};
                result.error.errors.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as string] = err.message;
                    }
                });
                setErrors(fieldErrors);
                setLoading(false);
                return;
            }

            // Simulación de envío
            await new Promise((resolve) => setTimeout(resolve, 1500));

            toast.success('Mensaje enviado correctamente');
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch {
            toast.error('Error al enviar el mensaje');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name]) {
            setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 lg:py-20">
            <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                <div className="mb-16 text-center">
                    <h1 className="mb-6 text-4xl lg:text-5xl font-bold text-gray-900">Contáctanos</h1>
                    <p className="text-xl text-gray-600">
                        Estamos aquí para responder tus preguntas y atender tus pedidos
                    </p>
                </div>

                <div className="grid gap-10 lg:grid-cols-3">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <Phone className="mb-6 h-10 w-10 text-amber-600" />
                            <h3 className="mb-3 text-lg font-bold text-gray-900">Teléfono</h3>
                            <a
                                href={`tel:${COMPANY_INFO.phone}`}
                                className="text-base text-gray-600 hover:text-amber-600 transition-colors font-medium"
                            >
                                {COMPANY_INFO.phone}
                            </a>
                        </div>

                        <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <Mail className="mb-6 h-10 w-10 text-amber-600" />
                            <h3 className="mb-3 text-lg font-bold text-gray-900">Email</h3>
                            <a
                                href={`mailto:${COMPANY_INFO.email}`}
                                className="text-base text-gray-600 hover:text-amber-600 transition-colors font-medium"
                            >
                                {COMPANY_INFO.email}
                            </a>
                        </div>

                        <div className="rounded-xl border-2 border-gray-200 bg-white p-8 shadow-lg hover:shadow-xl transition-shadow">
                            <MapPin className="mb-6 h-10 w-10 text-amber-600" />
                            <h3 className="mb-3 text-lg font-bold text-gray-900">Ubicación</h3>
                            <p className="text-base text-gray-600">{COMPANY_INFO.address}</p>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-8 shadow-md">
                            <h3 className="mb-4 text-lg font-bold text-gray-900">
                                Horario de Atención
                            </h3>
                            <p className="text-base text-gray-700 mb-2">
                                📅 Lunes a Viernes: 8:00 AM - 6:00 PM
                            </p>
                            <p className="text-base text-gray-700 mb-2">
                                📅 Sábados: 9:00 AM - 2:00 PM
                            </p>
                            <p className="text-base text-gray-700">❌ Domingos: Cerrado</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <form
                            onSubmit={handleSubmit}
                            className="rounded-xl border-2 border-gray-200 bg-white p-10 shadow-lg"
                        >
                            <h2 className="mb-8 text-2xl font-bold text-gray-900">Enviar Mensaje</h2>

                            <div className="mb-8 grid gap-6 md:grid-cols-2">
                                <Input
                                    label="Nombre completo"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                    required
                                />
                                <Input
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                    required
                                />
                            </div>

                            <div className="mb-8 grid gap-6 md:grid-cols-2">
                                <Input
                                    label="Teléfono"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={errors.phone}
                                    helperText="Opcional"
                                />
                                <Input
                                    label="Asunto"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    error={errors.subject}
                                    required
                                />
                            </div>

                            <div className="mb-8">
                                <Textarea
                                    label="Mensaje"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    error={errors.message}
                                    rows={6}
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                fullWidth
                                isLoading={loading}
                            >
                                <Send className="h-5 w-5" />
                                Enviar Mensaje
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
