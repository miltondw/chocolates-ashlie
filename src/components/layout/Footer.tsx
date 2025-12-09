/**
 * Componente Footer
 */

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_INFO, ROUTES } from '@/lib/constants';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-stone-200 bg-stone-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Company Info */}
                    <div className="md:col-span-2">
                        <h3 className="mb-6 text-xl font-bold text-gray-900">
                            {COMPANY_INFO.name}
                        </h3>
                        <p className="mb-6 text-base text-gray-600 leading-relaxed">
                            Chocolates artesanales elaborados con ingredientes selectos y
                            pasión por la excelencia. Cada pieza es una experiencia única.
                        </p>
                        <div className="space-y-3 text-base text-gray-600">
                            <div className="flex items-center gap-3 hover:text-amber-600 transition-colors">
                                <Phone className="h-5 w-5 text-amber-600" />
                                <a
                                    href={`tel:${COMPANY_INFO.phone}`}
                                    className="font-medium"
                                >
                                    {COMPANY_INFO.phone}
                                </a>
                            </div>
                            <div className="flex items-center gap-3 hover:text-amber-600 transition-colors">
                                <Mail className="h-5 w-5 text-amber-600" />
                                <a
                                    href={`mailto:${COMPANY_INFO.email}`}
                                    className="font-medium"
                                >
                                    {COMPANY_INFO.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <MapPin className="h-5 w-5 text-amber-600" />
                                <span>{COMPANY_INFO.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-6 text-base font-bold text-gray-900">
                            Enlaces Rápidos
                        </h4>
                        <ul className="space-y-3 text-base text-gray-600">
                            <li>
                                <Link href={ROUTES.PRODUCTS} className="hover:text-amber-600 transition-colors font-medium">
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link href={ROUTES.ABOUT} className="hover:text-amber-600 transition-colors font-medium">
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href={ROUTES.CONTACT} className="hover:text-amber-600 transition-colors font-medium">
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link href={ROUTES.CART} className="hover:text-amber-600 transition-colors font-medium">
                                    Carrito
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="mb-6 text-base font-bold text-gray-900">
                            Información
                        </h4>
                        <ul className="space-y-3 text-base text-gray-600">
                            <li>
                                <span className="hover:text-amber-600 transition-colors cursor-pointer font-medium">
                                    Política de Privacidad
                                </span>
                            </li>
                            <li>
                                <span className="hover:text-amber-600 transition-colors cursor-pointer font-medium">
                                    Términos y Condiciones
                                </span>
                            </li>
                            <li>
                                <span className="hover:text-amber-600 transition-colors cursor-pointer font-medium">
                                    Preguntas Frecuentes
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t-2 border-gray-200 pt-8 text-center text-base text-gray-600">
                    <p className="font-medium">
                        © {currentYear} {COMPANY_INFO.name}. Todos los derechos reservados.
                    </p>
                    <p className="mt-2 text-sm">
                        Desarrollado por{' '}
                        <a
                            href="https://github.com/miltondw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-amber-600 hover:text-amber-700 transition-colors hover:underline"
                        >
                            Milton Estrada
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
