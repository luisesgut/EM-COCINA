"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EnhancedBookingModal from "./components/booking-modal"
import { 
  Calendar, 
  Star, 
  ChefHat, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  UtensilsCrossed,
  Clock,
  Users,
  Award,
  Heart,
  CheckCircle,
  ArrowRight,
  Quote,
  Menu,
  X
} from "lucide-react"

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
    {
      title: "Cena Íntima",
      description: "Una experiencia gastronómica personalizada que transforma tu hogar en un restaurante de lujo.",
      price: "Desde $150 USD",
      originalPrice: "$200 USD",
      duration: "3-4 horas",
      people: "2-4 personas",
      popular: false,
      features: [
        "Menú personalizado según tus gustos",
        "Compra de ingredientes premium frescos",
        "Preparación en vivo en tu cocina",
        "Servicio completo mesa por mesa",
        "Maridaje de vinos incluido"
      ],
      icon: <Heart className="h-6 w-6" />,
      gradient: "from-rose-500 to-pink-600"
    },
    {
      title: "Evento Familiar",
      description: "Celebra momentos especiales con una experiencia culinaria que une a toda la familia.",
      price: "Desde $300 USD",
      originalPrice: "$400 USD",
      duration: "4-6 horas",
      people: "6-12 personas",
      popular: true,
      features: [
        "Menú adaptado para todas las edades",
        "Opciones vegetarianas y veganas",
        "Personal de apoyo incluido",
        "Decoración temática básica",
        "Limpieza completa post-evento",
        "Fotografía de platos incluida"
      ],
      icon: <Users className="h-6 w-6" />,
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      title: "Evento Corporativo",
      description: "Impresiona a tus clientes y colaboradores con catering ejecutivo de nivel mundial.",
      price: "Desde $500 USD",
      originalPrice: "$700 USD",
      duration: "Flexible",
      people: "15+ personas",
      popular: false,
      features: [
        "Menús ejecutivos de alta gama",
        "Presentación premium de platillos",
        "Servicio discreto y profesional",
        "Opciones dietéticas especializadas",
        "Coordinación con eventos",
        "Reportes post-servicio"
      ],
      icon: <Award className="h-6 w-6" />,
      gradient: "from-violet-500 to-purple-600"
    },
  ]

  const testimonials = [
    {
      name: "María González",
      role: "Evento de Aniversario",
      content: "Una experiencia absolutamente mágica. El chef superó todas nuestras expectativas.",
      rating: 5,
      image: "🥰"
    },
    {
      name: "Carlos Mendoza",
      role: "Cena Corporativa",
      content: "Profesionalismo excepcional. Nuestros clientes quedaron impresionados.",
      rating: 5,
      image: "👨‍💼"
    },
    {
      name: "Ana Ruiz",
      role: "Celebración Familiar",
      content: "Cada plato fue una obra de arte. Definitivamente volveremos a contratar.",
      rating: 5,
      image: "👩‍🍳"
    }
  ]

  // Mock ChatBot component for demo (keeping only this one as mock)
  // const ChatBot = ({ isOpen, onClose }) => {
  //   if (!isOpen) return null
    
  //   return (
  //     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  //       <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
  //         <div className="flex justify-between items-center mb-6">
  //           <h3 className="text-2xl font-bold text-gray-800">Chat en Vivo</h3>
  //           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
  //             <X className="h-6 w-6" />
  //           </button>
  //         </div>
  //         <div className="bg-gray-50 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
  //           <div className="space-y-3">
  //             <div className="bg-amber-100 rounded-lg p-3 max-w-xs">
  //               <p className="text-sm">¡Hola! Soy el asistente de EM Cuisine. ¿En qué puedo ayudarte hoy?</p>
  //             </div>
  //           </div>
  //         </div>
  //         <div className="flex gap-2">
  //           <input 
  //             type="text" 
  //             placeholder="Escribe tu mensaje..."
  //             className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
  //           />
  //           <Button className="bg-amber-600 hover:bg-amber-700 text-white px-4">
  //             <ArrowRight className="h-5 w-5" />
  //           </Button>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  const ChatBot = ({ isOpen, onClose }) => {
    if (!isOpen) return null
    
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Chat en Vivo</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-4 h-64 overflow-y-auto">
            <div className="space-y-3">
              <div className="bg-amber-100 rounded-lg p-3 max-w-xs">
                <p className="text-sm">¡Hola! Soy el asistente de EM Cuisine. ¿En qué puedo ayudarte hoy?</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Escribe tu mensaje..."
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
            <Button className="bg-amber-600 hover:bg-amber-700 text-white px-4">
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* Enhanced Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <ChefHat className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">EM Cuisine</span>
              <p className="text-xs text-gray-500 font-medium">Chef Personal Premium</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#servicios" className="text-gray-700 hover:text-amber-600 transition-colors font-medium relative group">
              Servicios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#sobre-mi" className="text-gray-700 hover:text-amber-600 transition-colors font-medium relative group">
              Chef
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#testimonios" className="text-gray-700 hover:text-amber-600 transition-colors font-medium relative group">
              Testimonios
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </a>
            <a href="#contacto" className="text-gray-700 hover:text-amber-600 transition-colors font-medium relative group">
              Contacto
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-600 transition-all group-hover:w-full"></span>
            </a>
            <Button 
              onClick={() => setIsBookingOpen(true)} 
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-full px-6"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Reservar
            </Button>
          </nav>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-amber-600 focus:outline-none"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#servicios" className="block text-gray-700 hover:text-amber-600 transition-colors font-medium">Servicios</a>
              <a href="#sobre-mi" className="block text-gray-700 hover:text-amber-600 transition-colors font-medium">Chef</a>
              <a href="#testimonios" className="block text-gray-700 hover:text-amber-600 transition-colors font-medium">Testimonios</a>
              <a href="#contacto" className="block text-gray-700 hover:text-amber-600 transition-colors font-medium">Contacto</a>
              <Button 
                onClick={() => {setIsBookingOpen(true); setIsMobileMenuOpen(false)}} 
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white"
              >
                Reservar Ahora
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Enhanced Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-amber-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-amber-400/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        <div className="relative container mx-auto max-w-6xl text-center z-10 pt-20">
          <div className="mb-8 animate-fade-in-down">
            <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-amber-500/30">
              <Sparkles className="h-4 w-4 mr-2 text-amber-400" />
              <span className="text-amber-300 text-sm font-medium">Experiencias Culinarias de Lujo</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            <span className="block text-white mb-2">Tu Chef Personal</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 bg-clip-text text-transparent">
              de Clase Mundial
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Transforma cualquier ocasión en una experiencia gastronómica excepcional. 
            Desde cenas íntimas hasta eventos corporativos, llevamos la alta cocina directamente a tu mesa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up delay-400">
            <Button
              size="lg"
              onClick={() => setIsBookingOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <Calendar className="mr-3 h-5 w-5" />
              Reservar Mi Experiencia
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setIsChatOpen(true)}
              className="border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-4 rounded-full backdrop-blur-sm transform hover:scale-105 transition-all duration-300 flex items-center"
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Consulta Gratuita
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto animate-fade-in-up delay-600">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">500+</div>
              <div className="text-sm text-gray-400">Eventos Realizados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">10+</div>
              <div className="text-sm text-gray-400">Años de Experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">98%</div>
              <div className="text-sm text-gray-400">Satisfacción</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400 mb-1">24h</div>
              <div className="text-sm text-gray-400">Respuesta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="servicios" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-amber-100 rounded-full px-6 py-2 mb-6">
              <UtensilsCrossed className="h-4 w-4 mr-2 text-amber-600" />
              <span className="text-amber-800 text-sm font-medium">Nuestros Servicios</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Experiencias Culinarias
              <span className="block text-amber-600">Personalizadas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Cada servicio está diseñado meticulosamente para superar tus expectativas y crear recuerdos gastronómicos inolvidables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 rounded-2xl bg-white group hover:-translate-y-2 ${service.popular ? 'ring-2 ring-amber-400 ring-opacity-50' : ''}`}>
                {service.popular && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                      🔥 MÁS POPULAR
                    </Badge>
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                
                <CardHeader className="p-8 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${service.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {service.icon}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{service.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{service.people}</span>
                      </div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl font-bold text-gray-800 mb-3">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">{service.description}</CardDescription>
                </CardHeader>

                <CardContent className="p-8 pt-0">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-800">{service.price}</span>
                      <span className="text-lg text-gray-400 line-through">{service.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                      <span className="text-sm text-gray-600 ml-2">(4.9/5)</span>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    onClick={() => setIsBookingOpen(true)} 
                    className={`w-full bg-gradient-to-r ${service.gradient} hover:shadow-lg text-white py-3 text-base rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 group`}
                  >
                    Reservar Ahora
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="sobre-mi" className="py-24 px-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center bg-amber-500/20 backdrop-blur-sm rounded-full px-6 py-2 mb-6 border border-amber-500/30">
                <Award className="h-4 w-4 mr-2 text-amber-400" />
                <span className="text-amber-300 text-sm font-medium">Chef Profesional Certificado</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Pasión Culinaria
                <span className="block text-amber-400">con Excelencia</span>
              </h2>

              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Con más de <strong className="text-amber-400">10 años de experiencia</strong> en cocinas de prestigio internacional, 
                he perfeccionado el arte de crear experiencias gastronómicas que trascienden lo ordinario.
              </p>

              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Mi filosofía combina técnicas culinarias clásicas con innovación contemporánea, 
                utilizando exclusivamente <strong className="text-amber-400">ingredientes de temporada y origen local</strong> 
                para garantizar frescura y sostenibilidad en cada plato.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-amber-400 mb-1">500+</div>
                  <div className="text-sm text-gray-300">Eventos Exitosos</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="text-2xl font-bold text-amber-400 mb-1">98%</div>
                  <div className="text-sm text-gray-300">Clientes Satisfechos</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 text-sm rounded-full shadow-lg">
                  Cocina de Autor
                </Badge>
                <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 text-sm rounded-full shadow-lg">
                  Ingredientes Premium
                </Badge>
                <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-4 py-2 text-sm rounded-full shadow-lg">
                  Servicio Personalizado
                </Badge>
              </div>

              <Button 
                size="lg"
                onClick={() => setIsBookingOpen(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Calendar className="mr-3 h-5 w-5" />
                Conoce Mi Trabajo
              </Button>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-12 text-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 max-w-sm">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mb-6 inline-block">
                    <ChefHat className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Chef Emmanuel</h3>
                  <p className="text-amber-100 leading-relaxed mb-6">
                    "Cada plato es una oportunidad de crear momentos inolvidables y tocar el alma a través del sabor."
                  </p>
                  <div className="flex justify-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-white fill-current" />
                    ))}
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg animate-bounce">
                  <Sparkles className="h-6 w-6 text-amber-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg animate-pulse">
                  <Award className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Culinario Section */}
      <section id="portfolio" className="py-24 px-4 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-amber-100 rounded-full px-6 py-2 mb-6">
              <ChefHat className="h-4 w-4 mr-2 text-amber-600" />
              <span className="text-amber-800 text-sm font-medium">Portfolio Culinario</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Creaciones que
              <span className="block text-amber-600">Despiertan los Sentidos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Cada platillo es una obra de arte cuidadosamente diseñada para crear una experiencia multisensorial única.
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              <Button 
                variant="outline" 
                className="border-amber-200 text-amber-700 hover:bg-amber-600 hover:text-white hover:border-amber-600 rounded-full px-6 py-2 transition-all duration-300"
              >
                Todos
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-amber-600 hover:text-white hover:border-amber-600 rounded-full px-6 py-2 transition-all duration-300"
              >
                Entradas
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-amber-600 hover:text-white hover:border-amber-600 rounded-full px-6 py-2 transition-all duration-300"
              >
                Platos Principales
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-amber-600 hover:text-white hover:border-amber-600 rounded-full px-6 py-2 transition-all duration-300"
              >
                Postres
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-200 text-gray-600 hover:bg-amber-600 hover:text-white hover:border-amber-600 rounded-full px-6 py-2 transition-all duration-300"
              >
                Eventos
              </Button>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Row 1 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-amber-100 to-orange-100 h-64">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-full text-center p-6">
                <div className="text-amber-600">
                  <ChefHat className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">Salmón con Costra de Hierbas</p>
                  <p className="text-sm text-gray-500 mt-2">Acompañado de risotto de azafrán</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-bold text-gray-800 text-sm">Salmón Gourmet</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">Plato Signature</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-rose-100 to-pink-100 h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-full text-center p-6">
                <div className="text-rose-600">
                  <Heart className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">Tarta de Chocolate Premium</p>
                  <p className="text-sm text-gray-500 mt-2">Con coulis de frutos rojos</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-bold text-gray-800 text-sm">Postre Decadente</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">Más Solicitado</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-emerald-100 to-teal-100 h-64">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-full text-center p-6">
                <div className="text-emerald-600">
                  <Sparkles className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">Ensalada de Temporada</p>
                  <p className="text-sm text-gray-500 mt-2">Con vinagreta de trufa</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-bold text-gray-800 text-sm">Entrada Fresca</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">Vegano</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-violet-100 to-purple-100 h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-full text-center p-6">
                <div className="text-violet-600">
                  <Award className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">Cordero Wellington</p>
                  <p className="text-sm text-gray-500 mt-2">Técnica francesa clásica</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-bold text-gray-800 text-sm">Plato Premium</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">Chef's Choice</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-orange-100 to-amber-100 h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-full text-center p-6">
                <div className="text-orange-600">
                  <UtensilsCrossed className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">Paella Valenciana</p>
                  <p className="text-sm text-gray-500 mt-2">Receta tradicional española</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-bold text-gray-800 text-sm">Especialidad</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">Para Grupos</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-blue-100 to-cyan-100 h-64">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-full text-center p-6">
                <div className="text-blue-600">
                  <Users className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">Ceviche de Mariscos</p>
                  <p className="text-sm text-gray-500 mt-2">Fusión peruana contemporánea</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-bold text-gray-800 text-sm">Entrada Fresca</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">Sin Gluten</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-indigo-100 to-purple-100 h-80">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-full text-center p-6">
                <div className="text-indigo-600">
                  <Quote className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">Risotto de Hongos</p>
                  <p className="text-sm text-gray-500 mt-2">Con trufa negra y parmesano</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-bold text-gray-800 text-sm">Plato Vegetariano</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">Comfort Food</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-pink-100 to-rose-100 h-64">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="flex items-center justify-center h-full text-center p-6">
                <div className="text-pink-600">
                  <Calendar className="h-16 w-16 mx-auto mb-4" />
                  <p className="text-lg font-semibold text-gray-700">Macarons Artesanales</p>
                  <p className="text-sm text-gray-500 mt-2">Variedad de sabores únicos</p>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h4 className="font-bold text-gray-800 text-sm">Petit Fours</h4>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-amber-500 fill-current" />
                    ))}
                    <span className="text-xs text-gray-600 ml-1">Técnica Francesa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-8 border border-amber-200 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">¿Inspirado por Nuestras Creaciones?</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Cada platillo puede ser personalizado según tus gustos y preferencias dietéticas. 
                Trabajamos contigo para crear el menú perfecto para tu ocasión especial.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <ChefHat className="mr-2 h-5 w-5" />
                  Crear Mi Menú Personalizado
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setIsChatOpen(true)}
                  className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Consultar Disponibilidad
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section id="testimonios" className="py-24 px-4 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-amber-100 rounded-full px-6 py-2 mb-6">
              <Quote className="h-4 w-4 mr-2 text-amber-600" />
              <span className="text-amber-800 text-sm font-medium">Lo Que Dicen Nuestros Clientes</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Experiencias que
              <span className="block text-amber-600">Transforman Vidas</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cada testimonio representa una historia única de sabores, emociones y momentos inolvidables.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group hover:-translate-y-2">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.image}</div>
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{testimonial.name}</h4>
                      <p className="text-amber-600 text-sm font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-amber-500 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </blockquote>
                  
                  <div className="mt-6 h-1 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full"></div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => setIsBookingOpen(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Heart className="mr-2 h-5 w-5" />
              Crea Tu Propia Historia
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contacto" className="py-24 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-2 mb-6">
              <MessageCircle className="h-4 w-4 mr-2 text-gray-600" />
              <span className="text-gray-800 text-sm font-medium">Comienza Tu Experiencia</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Hagamos Realidad
              <span className="block text-amber-600">Tu Evento Soñado</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Estamos aquí para convertir tu visión culinaria en una experiencia extraordinaria. 
              Contactanos y comencemos a planificar juntos.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-full p-3 shadow-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-xl mb-2">Llamada Directa</h3>
                  <p className="text-gray-600 mb-2">Habla directamente con nuestro equipo</p>
                  <a href="tel:+15551234567" className="text-lg font-semibold text-amber-600 hover:text-amber-700 transition-colors">
                    +1 (555) 123-4567
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Lun - Dom: 9:00 AM - 10:00 PM</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full p-3 shadow-lg">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-xl mb-2">Email Exclusivo</h3>
                  <p className="text-gray-600 mb-2">Envíanos los detalles de tu evento</p>
                  <a href="mailto:chef@emcuisine.com" className="text-lg font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                    chef@emcuisine.com
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Respuesta en menos de 4 horas</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-full p-3 shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-xl mb-2">Área de Servicio</h3>
                  <p className="text-gray-600 mb-2">Servicio a domicilio en toda la zona</p>
                  <p className="text-lg font-semibold text-violet-600">Ciudad de México y Área Metropolitana</p>
                  <p className="text-sm text-gray-500 mt-1">Consulta disponibilidad para otras zonas</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-6 w-6 text-amber-600 mr-3" />
                  <h3 className="font-bold text-gray-800 text-lg">Garantía de Satisfacción</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Estamos tan seguros de la calidad de nuestro servicio que ofrecemos una 
                  <strong className="text-amber-600"> garantía del 100% de satisfacción</strong>. 
                  Si no superamos tus expectativas, te devolvemos tu dinero.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 shadow-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Solicita Tu Cotización Gratuita</h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Nombre completo"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                  <input 
                    type="email" 
                    placeholder="Correo electrónico"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="tel" 
                    placeholder="Teléfono"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                  <select className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300">
                    <option>Tipo de evento</option>
                    <option>Cena Íntima</option>
                    <option>Evento Familiar</option>
                    <option>Evento Corporativo</option>
                    <option>Otro (especificar)</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input 
                    type="date" 
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                  <input 
                    type="number" 
                    placeholder="Número de invitados"
                    min="1"
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <textarea 
                  placeholder="Cuéntanos sobre tu evento soñado... ¿Hay alguna preferencia culinaria especial o tema que te gustaría incluir?"
                  rows="4"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                ></textarea>

                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white py-4 text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Calendar className="mr-2 h-5 w-5" />
                  Solicitar Cotización Gratuita
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  <CheckCircle className="inline h-4 w-4 text-green-500 mr-1" />
                  Respuesta garantizada en menos de 24 horas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-gray-300 py-16 px-4 border-t border-gray-700">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">EM Cuisine</span>
                  <p className="text-sm text-gray-400">Chef Personal Premium</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Transformamos ocasiones especiales en experiencias gastronómicas excepcionales. 
                Cada plato cuenta una historia, cada sabor crea un recuerdo.
              </p>
              <div className="flex space-x-4 mt-6">
                <a href="#" className="bg-gray-800 hover:bg-amber-600 p-3 rounded-full transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-amber-600 p-3 rounded-full transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="bg-gray-800 hover:bg-amber-600 p-3 rounded-full transition-colors duration-300">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.402-.09.381-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Servicios</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-amber-400 transition-colors">Cenas Íntimas</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Eventos Familiares</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Catering Corporativo</a></li>
                <li><a href="#" className="hover:text-amber-400 transition-colors">Clases de Cocina</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-amber-400" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-amber-400" />
                  <span className="text-sm">chef@emcuisine.com</span>
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-amber-400" />
                  <span className="text-sm">Ciudad de México</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 mb-2">&copy; {new Date().getFullYear()} EM Cuisine. Todos los derechos reservados.</p>
            <p className="text-gray-500 text-sm">
              Diseñado con <Heart className="inline h-4 w-4 text-red-500 mx-1" /> para crear experiencias inolvidables
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <EnhancedBookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          onClick={() => setIsChatOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-full w-16 h-16 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
        </Button>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-up.delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-fade-in-up.delay-400 {
          animation-delay: 0.4s;
        }
        
        .animate-fade-in-up.delay-600 {
          animation-delay: 0.6s;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-bounce {
          animation: bounce 1s infinite;
        }

        .hover\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }

        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f59e0b, #ea580c);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #d97706, #dc2626);
        }
      `}</style>
    </div>
  )
}