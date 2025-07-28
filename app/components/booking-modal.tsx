"use client"

import React, { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Calendar as CalendarIcon, 
  Users, 
  Clock, 
  ChefHat, 
  Star, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  CreditCard,
  Shield,
  MapPin,
  Utensils,
  Heart,
  Award,
  Sparkles,
  X
} from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

const PRICE_PER_PERSON = 1300
const MIN_GUESTS = 2
const MAX_GUESTS = 20

const serviceTypes = [
  {
    id: "intimate",
    name: "Experiencia Íntima",
    description: "Perfecto para parejas o grupos pequeños que buscan una experiencia romántica y personalizada",
    icon: <Heart className="h-6 w-6" />,
    emoji: "💕",
    recommended: [2, 4],
    gradient: "from-rose-500 to-pink-600",
    features: ["Menú degustación personalizado", "Servicio exclusivo", "Ambientación romántica", "Maridaje premium"]
  },
  {
    id: "family",
    name: "Celebración Familiar",
    description: "Ideal para reuniones familiares especiales y momentos que perduran en el tiempo",
    icon: <Users className="h-6 w-6" />,
    emoji: "👨‍👩‍👧‍👦",
    recommended: [6, 12],
    gradient: "from-emerald-500 to-teal-600",
    features: ["Menú familiar compartido", "Opciones para todas las edades", "Servicio completo", "Fotografía incluida"]
  },
  {
    id: "corporate",
    name: "Evento Corporativo",
    description: "Experiencia profesional de alto nivel para impresionar a clientes y colaboradores",
    icon: <Award className="h-6 w-6" />,
    emoji: "🏢",
    recommended: [8, 15],
    gradient: "from-violet-500 to-purple-600",
    features: ["Menú ejecutivo gourmet", "Presentación impecable", "Servicio discreto", "Coordinación profesional"]
  },
  {
    id: "celebration",
    name: "Ocasión Especial",
    description: "Para cumpleaños, aniversarios y celebraciones que merecen ser inolvidables",
    icon: <Sparkles className="h-6 w-6" />,
    emoji: "🎉",
    recommended: [4, 10],
    gradient: "from-amber-500 to-orange-600",
    features: ["Decoración temática", "Pastel artesanal", "Fotografía del evento", "Sorpresas especiales"]
  }
]

const timeSlots = [
  { value: "12:00", label: "12:00 PM", description: "Almuerzo elegante" },
  { value: "13:30", label: "1:30 PM", description: "Almuerzo tardío" },
  { value: "18:00", label: "6:00 PM", description: "Cena temprana" },
  { value: "19:30", label: "7:30 PM", description: "Cena clásica" },
  { value: "21:00", label: "9:00 PM", description: "Cena tardía" }
]

export default function EnhancedBookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    serviceType: "",
    guests: MIN_GUESTS,
    selectedDate: null as Date | null,
    selectedTime: "",
    name: "",
    email: "",
    phone: "",
    address: "",
    specialRequests: "",
    dietaryRestrictions: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  })

  const totalPrice = formData.guests * PRICE_PER_PERSON
  const deposit = Math.round(totalPrice * 0.5)
  const remaining = totalPrice - deposit

  const steps = [
    { number: 1, title: "Experiencia", description: "Tipo de servicio", icon: ChefHat },
    { number: 2, title: "Fecha & Hora", description: "Cuándo celebrar", icon: CalendarIcon },
    { number: 3, title: "Detalles", description: "Información personal", icon: Users },
    { number: 4, title: "Confirmación", description: "Pago seguro", icon: CreditCard }
  ]

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleGuestChange = (increment: boolean) => {
    const newCount = increment ? formData.guests + 1 : formData.guests - 1
    if (newCount >= MIN_GUESTS && newCount <= MAX_GUESTS) {
      handleInputChange("guests", newCount)
    }
  }

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1: return formData.serviceType && formData.guests >= MIN_GUESTS
      case 2: return formData.selectedDate && formData.selectedTime
      case 3: return formData.name && formData.email && formData.phone && formData.address
      case 4: return formData.cardNumber && formData.expiryDate && formData.cvv && formData.cardholderName
      default: return false
    }
  }

  const handleSubmit = () => {
    console.log("Booking submitted:", formData)
    alert("¡Reservación confirmada! Recibirás un email con todos los detalles.")
    onClose()
    setCurrentStep(1)
    setFormData({
      serviceType: "",
      guests: MIN_GUESTS,
      selectedDate: null,
      selectedTime: "",
      name: "",
      email: "",
      phone: "",
      address: "",
      specialRequests: "",
      dietaryRestrictions: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardholderName: ""
    })
  }

  const renderStepIndicator = () => (
    <div className="relative mb-4 sm:mb-8">
      <div className="flex justify-center">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto pb-2 sm:pb-4 px-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center min-w-0 group">
                <div className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-300 ${
                  currentStep >= step.number 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-110' 
                    : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                }`}>
                  {currentStep > step.number ? (
                    <Check className="h-4 w-4 sm:h-6 sm:w-6" />
                  ) : (
                    <step.icon className="h-4 w-4 sm:h-6 sm:w-6" />
                  )}
                  {currentStep === step.number && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 animate-pulse opacity-50"></div>
                  )}
                </div>
                <div className="text-center mt-2 sm:mt-3">
                  <div className={`text-xs sm:text-sm font-semibold ${
                    currentStep >= step.number ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-400 hidden md:block">{step.description}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 sm:w-16 h-0.5 mt-5 sm:mt-7 transition-all duration-300 ${
                  currentStep > step.number 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600' 
                    : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-4 sm:space-y-8">
      <div className="text-center px-4">
        <div className="inline-flex items-center bg-amber-100 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
          <Sparkles className="h-4 w-4 mr-2 text-amber-600" />
          <span className="text-amber-800 text-sm font-medium">Paso 1 de 4</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Selecciona tu Experiencia</h3>
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Cada experiencia está cuidadosamente diseñada para crear momentos inolvidables
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {serviceTypes.map((service) => (
          <Card 
            key={service.id}
            className={`relative cursor-pointer transition-all duration-500 hover:shadow-xl hover:-translate-y-1 overflow-hidden group ${
              formData.serviceType === service.id 
                ? 'ring-2 ring-amber-400 shadow-xl scale-105' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => handleInputChange("serviceType", service.id)}
          >
            <div className={`h-1 sm:h-2 bg-gradient-to-r ${service.gradient}`}></div>
            
            <CardHeader className="pb-3 sm:pb-4 relative p-4 sm:p-6">
              {formData.serviceType === service.id && (
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <div className="bg-green-500 rounded-full p-1">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className={`p-2 sm:p-3 rounded-xl bg-gradient-to-r ${service.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <div className="text-2xl sm:text-3xl">{service.emoji}</div>
              </div>
              
              <CardTitle className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{service.name}</CardTitle>
              <CardDescription className="text-gray-600 leading-relaxed text-sm sm:text-base">
                {service.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Users className="h-4 w-4 mr-2 text-amber-600" />
                  Recomendado: {service.recommended[0]}-{service.recommended[1]} personas
                </div>
              </div>
              
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start text-sm text-gray-700">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3 flex-shrink-0 mt-1.5"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-gray-50 to-white border-0 shadow-xl mx-4 sm:mx-0">
        <CardContent className="p-4 sm:p-8">
          <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6 flex items-center">
            <Users className="h-5 w-5 sm:h-6 sm:w-6 mr-3 text-amber-600" />
            Número de Huéspedes
          </h4>
          
          <div className="flex items-center justify-center space-x-6 sm:space-x-8">
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleGuestChange(false)}
              disabled={formData.guests <= MIN_GUESTS}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-0 border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 disabled:opacity-50"
            >
              -
            </Button>
            
            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                {formData.guests}
              </div>
              <div className="text-gray-500 font-medium text-sm sm:text-base">personas</div>
            </div>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleGuestChange(true)}
              disabled={formData.guests >= MAX_GUESTS}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full p-0 border-2 border-amber-200 hover:border-amber-400 hover:bg-amber-50 disabled:opacity-50"
            >
              +
            </Button>
          </div>
          
          <div className="mt-6 sm:mt-8 text-center">
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg border border-gray-100">
              <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                ${totalPrice.toLocaleString()} MXN
              </div>
              <div className="text-gray-600 text-sm sm:text-base">
                ${PRICE_PER_PERSON.toLocaleString()} MXN por persona
              </div>
              <div className="flex items-center justify-center mt-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-500 fill-current" />
                ))}
                <span className="text-sm text-gray-600 ml-2">Experiencia Premium</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-4 sm:space-y-8">
      <div className="text-center px-4">
        <div className="inline-flex items-center bg-amber-100 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
          <CalendarIcon className="h-4 w-4 mr-2 text-amber-600" />
          <span className="text-amber-800 text-sm font-medium">Paso 2 de 4</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Fecha y Hora Perfecta</h3>
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Elige el momento ideal para tu experiencia culinaria excepcional
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <CalendarIcon className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              Selecciona la Fecha
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left font-normal h-12 sm:h-14 text-sm sm:text-lg border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50"
                >
                  <CalendarIcon className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
                  <span className="truncate">
                    {formData.selectedDate 
                      ? format(formData.selectedDate, "dd/MM/yyyy", { locale: es })
                      : "Elegir fecha especial"
                    }
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.selectedDate || undefined}
                  onSelect={(date) => handleInputChange("selectedDate", date || null)}
                  disabled={(date) => date < new Date() || date < new Date(Date.now() + 24 * 60 * 60 * 1000)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center text-lg sm:text-xl">
              <Clock className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
              Hora del Servicio
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3 p-4 sm:p-6 pt-0">
            {timeSlots.map((slot) => (
              <Button
                key={slot.value}
                variant={formData.selectedTime === slot.value ? "default" : "outline"}
                className={`w-full justify-between h-12 sm:h-14 text-left transition-all duration-300 ${
                  formData.selectedTime === slot.value 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg' 
                    : 'border-2 border-gray-200 hover:border-amber-400 hover:bg-amber-50'
                }`}
                onClick={() => handleInputChange("selectedTime", slot.value)}
              >
                <div className="flex items-center">
                  <Clock className="mr-3 h-4 w-4 sm:h-5 sm:w-5" />
                  <div>
                    <div className="font-semibold text-sm sm:text-base">{slot.label}</div>
                    <div className={`text-xs sm:text-sm ${
                      formData.selectedTime === slot.value ? 'text-amber-100' : 'text-gray-500'
                    }`}>
                      {slot.description}
                    </div>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      {formData.selectedDate && formData.selectedTime && (
        <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg mx-4 sm:mx-0">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full p-2 mr-4 flex-shrink-0">
                <Check className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <div className="font-bold text-green-800 text-base sm:text-lg">¡Fecha Confirmada!</div>
                <div className="text-green-700 text-sm sm:text-base">
                  {format(formData.selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: es })} 
                  {" a las "} 
                  {timeSlots.find(s => s.value === formData.selectedTime)?.label}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-4 sm:space-y-8">
      <div className="text-center px-4">
        <div className="inline-flex items-center bg-amber-100 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
          <Users className="h-4 w-4 mr-2 text-amber-600" />
          <span className="text-amber-800 text-sm font-medium">Paso 3 de 4</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Información Personal</h3>
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Necesitamos algunos detalles para personalizar tu experiencia única
        </p>
      </div>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <Users className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            Datos de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="name" className="text-sm sm:text-base font-medium text-gray-700">Nombre Completo *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
                placeholder="Tu nombre completo"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm sm:text-base font-medium text-gray-700">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="phone" className="text-sm sm:text-base font-medium text-gray-700">Teléfono *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
                placeholder="+52 55 1234 5678"
              />
            </div>
            <div>
              <Label htmlFor="address" className="text-sm sm:text-base font-medium text-gray-700">Dirección del Evento *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
                placeholder="Dirección completa donde será el servicio"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <Utensils className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            Preferencias Culinarias
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
          <div>
            <Label htmlFor="dietary" className="text-sm sm:text-base font-medium text-gray-700">Restricciones Dietéticas</Label>
            <Textarea
              id="dietary"
              value={formData.dietaryRestrictions}
              onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
              className="mt-2 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
              placeholder="Alergias, intolerancias, preferencias vegetarianas/veganas, etc."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="special" className="text-sm sm:text-base font-medium text-gray-700">Solicitudes Especiales</Label>
            <Textarea
              id="special"
              value={formData.specialRequests}
              onChange={(e) => handleInputChange("specialRequests", e.target.value)}
              className="mt-2 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
              placeholder="Ocasión especial, preferencias de menú, decoración, música, etc."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-4 sm:space-y-8">
      <div className="text-center px-4">
        <div className="inline-flex items-center bg-amber-100 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
          <CreditCard className="h-4 w-4 mr-2 text-amber-600" />
          <span className="text-amber-800 text-sm font-medium">Paso 4 de 4</span>
        </div>
        <h3 className="text-xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">Confirmar Reserva</h3>
        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto">
          Último paso para asegurar tu experiencia culinaria excepcional
        </p>
      </div>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <ChefHat className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            Resumen de tu Reserva
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm sm:text-base">Servicio:</span>
                <span className="font-semibold text-gray-900 text-sm sm:text-base text-right">
                  {serviceTypes.find(s => s.id === formData.serviceType)?.name}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm sm:text-base">Huéspedes:</span>
                <span className="font-semibold text-gray-900 text-sm sm:text-base">{formData.guests} personas</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-600 text-sm sm:text-base">Fecha:</span>
                <span className="font-semibold text-gray-900 text-sm sm:text-base text-right">
                  {formData.selectedDate && format(formData.selectedDate, "dd/MM/yyyy", { locale: es })}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 text-sm sm:text-base">Hora:</span>
                <span className="font-semibold text-gray-900 text-sm sm:text-base">
                  {timeSlots.find(s => s.value === formData.selectedTime)?.label}
                </span>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 sm:p-6 border border-amber-200">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  ${totalPrice.toLocaleString()}
                </div>
                <div className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">MXN Total</div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-700 font-medium">Depósito (50%):</span>
                    <span className="font-bold text-amber-700">${deposit.toLocaleString()} MXN</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Restante:</span>
                    <span className="text-gray-900">${remaining.toLocaleString()} MXN</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2">
                    *El resto se paga el día del evento
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="flex items-center text-lg sm:text-xl">
            <CreditCard className="mr-3 h-5 w-5 sm:h-6 sm:w-6 text-amber-600" />
            Información de Pago
          </CardTitle>
          <CardDescription className="text-base sm:text-lg text-gray-600 mt-2">
            Pago seguro del depósito de ${deposit.toLocaleString()} MXN
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
          <div>
            <Label htmlFor="cardNumber" className="text-sm sm:text-base font-medium text-gray-700">Número de Tarjeta</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="expiryDate" className="text-sm sm:text-base font-medium text-gray-700">Fecha de Vencimiento</Label>
              <Input
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                placeholder="MM/AA"
                className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
              />
            </div>
            <div>
              <Label htmlFor="cvv" className="text-sm sm:text-base font-medium text-gray-700">CVV</Label>
              <Input
                id="cvv"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                placeholder="123"
                className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="cardholderName" className="text-sm sm:text-base font-medium text-gray-700">Nombre del Titular</Label>
            <Input
              id="cardholderName"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              placeholder="Nombre como aparece en la tarjeta"
              className="mt-2 h-10 sm:h-12 border-2 border-gray-200 focus:border-amber-400 focus:ring-amber-200"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg mx-4 sm:mx-0">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start">
            <div className="bg-green-500 rounded-full p-2 mr-3 sm:mr-4 flex-shrink-0">
              <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <div>
              <div className="font-bold text-green-800 text-base sm:text-lg mb-2">Pago 100% Seguro</div>
              <div className="text-green-700 leading-relaxed text-sm sm:text-base">
                Tu información está protegida con encriptación SSL de nivel bancario. 
                El resto del pago se realiza directamente con el chef el día del evento. 
                <strong> Garantía de satisfacción del 100%.</strong>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[98vw] sm:w-[95vw] max-w-6xl h-[95vh] sm:h-[90vh] p-0 flex flex-col bg-white">
        <DialogHeader className="sr-only">
          <DialogTitle>Reservar Experiencia Culinaria - Paso {currentStep} de 4</DialogTitle>
        </DialogHeader>
        
        {/* Header con gradiente optimizado para móvil */}
        <div className="relative p-4 sm:p-6 pb-6 sm:pb-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex-shrink-0">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-16 h-16 sm:w-20 sm:h-20 bg-amber-500 rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 sm:w-16 sm:h-16 bg-orange-500 rounded-full blur-xl"></div>
          </div>
          
          {/* Botón cerrar */}
          <button 
            onClick={onClose}
            className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 text-gray-400 hover:text-white transition-colors duration-200 p-1"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          
          {/* Contenido del header */}
          <div className="relative z-10">
            <div className="flex items-center mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg mr-3 sm:mr-4">
                <ChefHat className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold">EM Cuisine</h2>
                <p className="text-amber-300 text-xs sm:text-sm">Experiencia Culinaria Premium</p>
              </div>
            </div>
            {renderStepIndicator()}
          </div>
        </div>
        
        {/* Contenido con scroll optimizado */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>
        </div>

        {/* Footer fijo optimizado para móvil */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Botones principales */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-between items-center">
              <Button
                variant="outline"
                size="lg"
                onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()}
                className="flex items-center justify-center w-full sm:w-auto border-2 border-gray-300 hover:border-gray-400 h-11 sm:h-12 text-sm sm:text-base"
              >
                <ArrowLeft className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                {currentStep > 1 ? "Paso Anterior" : "Cancelar"}
              </Button>

              {currentStep < 4 ? (
                <Button
                  size="lg"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!canProceedToNextStep()}
                  className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
                >
                  Continuar
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!canProceedToNextStep()}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
                >
                  <Check className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  Confirmar Reserva
                </Button>
              )}
            </div>
            
            {/* Indicador de progreso */}
            <div>
              <div className="bg-gray-200 rounded-full h-1.5 sm:h-2">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-600 h-1.5 sm:h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1 sm:mt-2">
                <span>Inicio</span>
                <span>{currentStep} de 4</span>
                <span>Confirmación</span>
              </div>
            </div>
          </div>
        </div>

        {/* Estilos adicionales optimizados */}
        <style jsx global>{`
          /* Animaciones personalizadas para el modal */
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.95);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes slideInFromRight {
            from {
              opacity: 0;
              transform: translateX(20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-fade-in-scale {
            animation: fadeInScale 0.3s ease-out forwards;
          }
          
          .animate-slide-in-right {
            animation: slideInFromRight 0.4s ease-out forwards;
          }
          
          /* Scrollbar personalizada para el modal */
          .modal-content::-webkit-scrollbar {
            width: 4px;
          }
          
          .modal-content::-webkit-scrollbar-track {
            background: #f1f5f9;
          }
          
          .modal-content::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #f59e0b, #ea580c);
            border-radius: 2px;
          }
          
          .modal-content::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #d97706, #dc2626);
          }
          
          /* Optimizaciones específicas para móvil */
          @media (max-width: 640px) {
            /* Mejorar el toque en botones */
            .touch-button {
              min-height: 44px;
            }
            
            /* Espaciado optimizado para móvil */
            .mobile-spacing {
              padding: 12px;
            }
            
            /* Texto responsive */
            .responsive-text {
              font-size: 14px;
              line-height: 1.4;
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  )
}