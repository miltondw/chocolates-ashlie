/**
 * Landing Page - Página principal
 */

'use client';

import Link from 'next/link';
import { ArrowRight, Award, Heart, Sparkles } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ProductGrid } from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/Button';
import { COMPANY_INFO, APP_TEXTS, ROUTES } from '@/lib/constants';

export default function HomePage() {
  const { loading, featuredProducts } = useProducts();
  const featured = featuredProducts();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-amber-50 to-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900">
                <Sparkles className="h-4 w-4" />
                Chocolates Premium Artesanales
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl">
                {APP_TEXTS.HERO_TITLE}
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed">
                {APP_TEXTS.HERO_SUBTITLE}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={ROUTES.PRODUCTS}>
                  <Button size="lg" className="gap-2 bg-amber-900 text-white hover:bg-amber-800">
                    Ver Catálogo
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href={ROUTES.CONTACT}>
                  <Button size="lg" variant="outline" className="border-amber-900 text-amber-900 hover:bg-amber-50">
                    Contactar
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shadow-xl">
                <span className="text-9xl">🍫</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid place-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-stone-200">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Heart className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-stone-900">
                Elaboración Artesanal
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Cada chocolate es elaborado a mano con dedicación y pasión por
                la excelencia
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-stone-200">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Award className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-stone-900">
                Ingredientes Premium
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Seleccionamos cuidadosamente los mejores ingredientes para
                garantizar calidad superior
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-xl bg-white border border-stone-200">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
                <Sparkles className="h-8 w-8 text-amber-900" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-stone-900">
                Sabores Únicos
              </h3>
              <p className="text-stone-600 leading-relaxed">
                Creaciones innovadoras que transforman cada bocado en una
                experiencia memorable
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl lg:text-5xl font-bold text-gray-900">
              Productos Destacados
            </h2>
            <p className="text-lg lg:text-xl text-gray-600">
              Descubre nuestras creaciones más populares
            </p>
          </div>

          {loading ? (
            <div className="py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <ProductGrid products={featured.slice(0, 4)} />
              <div className="mt-16 text-center">
                <Link href={ROUTES.PRODUCTS}>
                  <Button size="lg" className="gap-2 shadow-lg">
                    Ver Todos los Productos
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Company Info Section */}
      <section className="bg-gradient-to-r from-amber-600 to-amber-700 py-20 lg:py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl lg:text-4xl font-bold">
                {COMPANY_INFO.name}
              </h2>
              <p className="mb-10 text-lg lg:text-xl text-amber-50 leading-relaxed">
                {APP_TEXTS.ABOUT_MISSION}
              </p>
              <Link href={ROUTES.ABOUT}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 shadow-xl">
                  Conocer Más
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              <div className="rounded-xl bg-white/10 p-8 backdrop-blur shadow-lg">
                <h3 className="mb-3 text-lg font-bold">Responsable</h3>
                <p className="text-amber-50 text-lg">{COMPANY_INFO.responsible}</p>
              </div>
              <div className="rounded-xl bg-white/10 p-8 backdrop-blur shadow-lg">
                <h3 className="mb-3 text-lg font-bold">Contacto</h3>
                <p className="text-amber-50 text-lg mb-2">
                  <a href={`tel:${COMPANY_INFO.phone}`} className="hover:underline transition-all">
                    📞 {COMPANY_INFO.phone}
                  </a>
                </p>
                <p className="text-amber-50 text-lg">
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline transition-all">
                    ✉️ {COMPANY_INFO.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8 lg:px-12">
          <h2 className="mb-6 text-4xl lg:text-5xl font-bold text-gray-900">
            ¿Listo para probar nuestros chocolates?
          </h2>
          <p className="mb-10 text-xl text-gray-600 leading-relaxed">
            Realiza tu pedido ahora y recibe chocolates artesanales directamente
            en tu puerta
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link href={ROUTES.PRODUCTS}>
              <Button size="lg" className="gap-2">
                Ver Catálogo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={ROUTES.CONTACT}>
              <Button size="lg" variant="outline">
                Pedidos Especiales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

