/**
 * Página About (Nosotros)
 */

import { Users, Award, Heart, CheckCircle } from 'lucide-react';
import { COMPANY_INFO, APP_TEXTS } from '@/lib/constants';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-amber-600 to-amber-700 py-24 lg:py-32 text-white">
                <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
                    <h1 className="mb-8 text-5xl lg:text-6xl font-bold">Nuestra Historia</h1>
                    <p className="text-xl lg:text-2xl text-amber-50">
                        Pasión por el chocolate, dedicación a la excelencia
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 lg:py-24">
                <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-12">
                    <h2 className="mb-8 text-3xl lg:text-4xl font-bold text-gray-900">
                        Nuestra Misión
                    </h2>
                    <p className="mb-6 text-lg lg:text-xl text-gray-700 leading-relaxed">
                        {APP_TEXTS.ABOUT_MISSION}
                    </p>
                    <p className="text-lg lg:text-xl text-gray-700 leading-relaxed">
                        Fundada con la visión de crear chocolates que deleiten los sentidos,
                        {COMPANY_INFO.name} se ha convertido en sinónimo de calidad e
                        innovación en la elaboración artesanal de chocolate.
                    </p>
                </div>
            </section>

            {/* Process Section */}
            <section className="bg-gradient-to-b from-gray-50 to-white py-20 lg:py-24">
                <div className="mx-auto max-w-6xl px-6 sm:px-8 lg:px-12">
                    <h2 className="mb-16 text-center text-3xl lg:text-4xl font-bold text-gray-900">
                        Nuestro Proceso Artesanal
                    </h2>
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                            <div className="mb-6 flex justify-center">
                                <span className="text-7xl">🌱</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">1. Selección</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Elegimos cuidadosamente los mejores granos de cacao y ingredientes
                                premium
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                            <div className="mb-6 flex justify-center">
                                <span className="text-7xl">🔥</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">2. Tostado</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Tostamos los granos a la perfección para desarrollar sabores complejos
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                            <div className="mb-6 flex justify-center">
                                <span className="text-7xl">✨</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">3. Elaboración</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Creamos cada chocolate a mano con técnicas tradicionales
                            </p>
                        </div>

                        <div className="text-center p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow">
                            <div className="mb-6 flex justify-center">
                                <span className="text-7xl">🎁</span>
                            </div>
                            <h3 className="mb-3 text-xl font-bold">4. Empaque</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Presentamos cada pieza con el cuidado que merece
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 lg:py-24">
                <div className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-12">
                    <h2 className="mb-16 text-center text-3xl lg:text-4xl font-bold text-gray-900">
                        Nuestros Valores
                    </h2>
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-xl border-2 border-gray-200 p-8 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                            <Heart className="mb-6 h-12 w-12 text-amber-600" />
                            <h3 className="mb-3 text-xl font-bold">Pasión</h3>
                            <p className="text-base text-gray-600 leading-relaxed">
                                Amor por lo que hacemos, reflejado en cada chocolate
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-6">
                            <Award className="mb-4 h-10 w-10 text-amber-600" />
                            <h3 className="mb-2 text-lg font-semibold">Calidad</h3>
                            <p className="text-sm text-gray-600">
                                Compromiso inquebrantable con la excelencia
                            </p>
                        </div>

                        <div className="rounded-xl border border-gray-200 p-6">
                            <Users className="mb-4 h-10 w-10 text-amber-600" />
                            <h3 className="mb-2 text-lg font-semibold">Comunidad</h3>
                            <p className="text-sm text-gray-600">
                                Apoyo a productores locales y comercio justo
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-amber-50 py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
                        Nuestro Equipo
                    </h2>
                    <div className="rounded-xl bg-white p-8 shadow-sm">
                        <h3 className="mb-2 text-xl font-semibold">{COMPANY_INFO.responsible}</h3>
                        <p className="mb-4 text-amber-600">Fundador y Maestro Chocolatero</p>
                        <p className="text-gray-700">
                            Con más de 10 años de experiencia en la elaboración artesanal de
                            chocolates, lidera nuestro equipo con pasión y dedicación para
                            crear productos excepcionales que deleitan a nuestros clientes.
                        </p>
                    </div>
                </div>
            </section>

            {/* Certifications */}
            <section className="py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                        Certificaciones y Compromisos
                    </h2>
                    <div className="space-y-4">
                        {[
                            'Ingredientes 100% naturales y orgánicos',
                            'Proceso de elaboración sostenible',
                            'Apoyo al comercio justo',
                            'Sin conservantes ni aditivos artificiales',
                            'Compromiso con la calidad superior',
                        ].map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                                <p className="text-lg text-gray-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
