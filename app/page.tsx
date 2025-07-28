"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, ChefHat, MessageCircle, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import BookingModal from "./components/booking-modal"
import ChatBot from "./components/chatbot"

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)

  const services = [
    {
      title: "Cena Íntima",
      description: "Experiencia culinaria personalizada para 2-4 personas",
      price: "Desde $150 USD",
      duration: "3-4 horas",
      features: ["Menú personalizado", "Compra de ingredientes", "Preparación in-situ", "Servicio completo"],
    },
    {
      title: "Evento Familiar",
      description: "Celebraciones especiales para grupos medianos",
      price: "Desde $300 USD",
      duration: "4-6 horas",
      features: ["Menú para grupos", "Decoración de mesa", "Servicio profesional", "Limpieza incluida"],
    },
    {
      title: "Evento Corporativo",
      description: "Catering ejecutivo para reuniones de negocios",
      price: "Desde $500 USD",
      duration: "Flexible",
      features: ["Menús ejecutivos", "Presentación premium", "Servicio discreto", "Opciones dietéticas"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <header className="bg-black/95 backdrop-blur-sm sticky top-0 z-40 border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Image
              src="/logo.jpeg"
              alt="EM Cuisine Logo"
              width={60}
              height={60}
              className="rounded-lg"
            />
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#servicios" className="text-neutral-300 hover:text-white transition-colors">
              Servicios
            </a>
            <a href="#sobre-mi" className="text-neutral-300 hover:text-white transition-colors">
              Sobre Mí
            </a>
            <a href="#contacto" className="text-neutral-300 hover:text-white transition-colors">
              Contacto
            </a>
            <Button onClick={() => setIsBookingOpen(true)} className="bg-amber-600 hover:bg-amber-700">
              Reservar Ahora
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/60"></div>
        <div className="relative container mx-auto max-w-4xl">
          <div className="mb-8">
            <Image
              src="/logo.jpeg"
              alt="EM Cuisine"
              width={200}
              height={200}
              className="mx-auto rounded-2xl shadow-2xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-serif mb-6 text-neutral-100">
            Experiencias Culinarias
            <span className="block text-amber-400">Excepcionales</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-2xl mx-auto">
            Chef personal especializado en crear momentos únicos a través de la gastronomía de alta calidad
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-lg px-8 py-4"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Reservar Experiencia
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsChatOpen(true)}
              className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white text-lg px-8 py-4"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Consultar Ahora
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Cada experiencia es única y personalizada según tus preferencias y ocasión especial
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <ChefHat className="h-8 w-8 text-amber-600" />
                    <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                      {service.duration}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl font-serif text-neutral-800">{service.title}</CardTitle>
                  <CardDescription className="text-neutral-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-amber-600 mb-2">{service.price}</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-neutral-700">
                        <Star className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={() => setIsBookingOpen(true)} className="w-full bg-neutral-800 hover:bg-neutral-900">
                    Reservar Este Servicio
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 px-4 bg-neutral-900 text-white">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif mb-6">Chef Especializado</h2>
              <p className="text-lg text-neutral-300 mb-6">
                Con más de 10 años de experiencia en alta cocina, me especializo en crear experiencias gastronómicas
                únicas que combinan técnicas tradicionales con innovación culinaria.
              </p>
              <p className="text-lg text-neutral-300 mb-8">
                Cada plato es una obra de arte diseñada para sorprender tus sentidos y crear recuerdos inolvidables en
                la comodidad de tu hogar.
              </p>
              <div className="flex flex-wrap gap-4">
                <Badge className="bg-amber-600 text-white px-4 py-2">Cocina Internacional</Badge>
                <Badge className="bg-amber-600 text-white px-4 py-2">Alta Cocina</Badge>
                <Badge className="bg-amber-600 text-white px-4 py-2">Cocina Molecular</Badge>
                <Badge className="bg-amber-600 text-white px-4 py-2">Repostería</Badge>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-8 text-center">
                <ChefHat className="h-16 w-16 mx-auto mb-4 text-white" />
                <h3 className="text-2xl font-serif mb-2">Experiencia Premium</h3>
                <p className="text-amber-100">
                  Ingredientes de la más alta calidad, presentación impecable y servicio personalizado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-neutral-800 mb-8">Contacto</h2>
          <p className="text-xl text-neutral-600 mb-12">
            ¿Listo para vivir una experiencia culinaria única? Contáctanos para planificar tu evento
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <Phone className="h-8 w-8 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">Teléfono</h3>
              <p className="text-neutral-600">+1 (555) 123-4567</p>
            </div>
            <div className="text-center">
              <Mail className="h-8 w-8 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">Email</h3>
              <p className="text-neutral-600">chef@emcuisine.com</p>
            </div>
            <div className="text-center">
              <MapPin className="h-8 w-8 text-amber-600 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-800 mb-2">Ubicación</h3>
              <p className="text-neutral-600">Ciudad de México</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => setIsBookingOpen(true)} className="bg-amber-600 hover:bg-amber-700">
              Hacer Reservación
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsChatOpen(true)}
              className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white"
            >
              Chat en Vivo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Image
            src="/logo.jpeg"
            alt="EM Cuisine"
            width={80}
            height={80}
            className="mx-auto rounded-lg mb-6"
          />
          <p className="text-neutral-400 mb-4">© 2024 EM Cuisine. Todos los derechos reservados.</p>
          <p className="text-neutral-500 text-sm">Experiencias culinarias de lujo • Chef personal • Ciudad de México</p>
        </div>
      </footer>

      {/* Modals */}
      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
