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
  Utensils
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
    description: "Perfecto para parejas o grupos pequeños",
    icon: "❤️",
    recommended: [2, 4],
    features: ["Menú degustación", "Servicio personalizado", "Ambientación romántica"]
  },
  {
    id: "family",
    name: "Celebración Familiar",
    description: "Ideal para reuniones familiares especiales",
    icon: "👨‍👩‍👧‍👦",
    recommended: [6, 12],
    features: ["Menú familiar compartido", "Opciones para niños", "Servicio completo"]
  },
  {
    id: "corporate",
    name: "Evento Corporativo",
    description: "Experiencia profesional para empresas",
    icon: "🏢",
    recommended: [8, 15],
    features: ["Menú ejecutivo", "Presentación elegante", "Servicio discreto"]
  },
  {
    id: "celebration",
    name: "Ocasión Especial",
    description: "Para cumpleaños, aniversarios y celebraciones",
    icon: "🎉",
    recommended: [4, 10],
    features: ["Decoración temática", "Pastel incluido", "Fotografía del evento"]
  }
]

const timeSlots = [
  { value: "12:00", label: "12:00 PM - Almuerzo" },
  { value: "13:30", label: "1:30 PM - Almuerzo tardío" },
  { value: "18:00", label: "6:00 PM - Cena temprana" },
  { value: "19:30", label: "7:30 PM - Cena" },
  { value: "21:00", label: "9:00 PM - Cena tardía" }
]

export default function EnhancedBookingModal({ isOpen, onClose }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [date, setDate] = useState<Date>()
  const [formData, setFormData] = useState({
    // Step 1: Service Selection
    serviceType: "",
    guests: MIN_GUESTS,
    
    // Step 2: Date & Time
    selectedDate: null as Date | null,
    selectedTime: "",
    
    // Step 3: Personal Details
    name: "",
    email: "",
    phone: "",
    address: "",
    specialRequests: "",
    dietaryRestrictions: "",
    
    // Step 4: Payment
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  })

  const totalPrice = formData.guests * PRICE_PER_PERSON
  const deposit = Math.round(totalPrice * 0.5)
  const remaining = totalPrice - deposit

  const steps = [
    { number: 1, title: "Servicio", description: "Tipo y huéspedes" },
    { number: 2, title: "Fecha", description: "Cuándo y hora" },
    { number: 3, title: "Detalles", description: "Información personal" },
    { number: 4, title: "Pago", description: "Confirmar reserva" }
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
    <div className="flex justify-center mb-4 sm:mb-8">
      <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className="flex flex-col items-center min-w-0">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold
                ${currentStep >= step.number 
                  ? 'bg-amber-600 text-white' 
                  : 'bg-gray-200 text-gray-500'}`}>
                {currentStep > step.number ? <Check className="h-3 w-3 sm:h-5 sm:w-5" /> : step.number}
              </div>
              <div className="text-center mt-1 sm:mt-2">
                <div className="text-xs font-medium text-gray-900">{step.title}</div>
                <div className="text-xs text-gray-500 hidden sm:block">{step.description}</div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 ${currentStep > step.number ? 'bg-amber-600' : 'bg-gray-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-gray-900 mb-2">Selecciona tu Experiencia</h3>
        <p className="text-gray-600">Elige el tipo de servicio que mejor se adapte a tu ocasión</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serviceTypes.map((service) => (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              formData.serviceType === service.id 
                ? 'ring-2 ring-amber-600 border-amber-600' 
                : 'border-gray-200'
            }`}
            onClick={() => handleInputChange("serviceType", service.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="text-2xl">{service.icon}</div>
                {formData.serviceType === service.id && (
                  <Check className="h-5 w-5 text-amber-600" />
                )}
              </div>
              <CardTitle className="text-lg">{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  Recomendado: {service.recommended[0]}-{service.recommended[1]} personas
                </div>
                <div className="flex flex-wrap gap-1">
                  {service.features.map((feature, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-amber-600" />
          Número de Huéspedes
        </h4>
        <div className="flex items-center justify-center space-x-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleGuestChange(false)}
            disabled={formData.guests <= MIN_GUESTS}
            className="w-10 h-10 rounded-full p-0"
          >
            -
          </Button>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{formData.guests}</div>
            <div className="text-sm text-gray-500">personas</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleGuestChange(true)}
            disabled={formData.guests >= MAX_GUESTS}
            className="w-10 h-10 rounded-full p-0"
          >
            +
          </Button>
        </div>
        <div className="mt-4 text-center">
          <div className="text-lg font-semibold text-gray-900">
            ${totalPrice.toLocaleString()} MXN total
          </div>
          <div className="text-sm text-gray-600">
            ${PRICE_PER_PERSON.toLocaleString()} MXN por persona
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-gray-900 mb-2">Fecha y Hora</h3>
        <p className="text-gray-600">¿Cuándo te gustaría tener tu experiencia culinaria?</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <Label className="text-base font-medium">Selecciona la Fecha</Label>
          <div className="mt-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-left font-normal h-12"
                >
                  <CalendarIcon className="mr-3 h-5 w-5 text-amber-600" />
                  {formData.selectedDate 
                    ? format(formData.selectedDate, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: es })
                    : "Elegir fecha"
                  }
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
          </div>
        </div>

        <div>
          <Label className="text-base font-medium">Hora del Servicio</Label>
          <div className="mt-2 space-y-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot.value}
                variant={formData.selectedTime === slot.value ? "default" : "outline"}
                className={`w-full justify-start h-12 ${
                  formData.selectedTime === slot.value 
                    ? 'bg-amber-600 hover:bg-amber-700' 
                    : ''
                }`}
                onClick={() => handleInputChange("selectedTime", slot.value)}
              >
                <Clock className="mr-3 h-4 w-4" />
                {slot.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {formData.selectedDate && formData.selectedTime && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-amber-600 mr-2" />
            <span className="font-medium text-amber-800">
              Fecha seleccionada: {format(formData.selectedDate, "EEEE, dd 'de' MMMM", { locale: es })} 
              a las {timeSlots.find(s => s.value === formData.selectedTime)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-gray-900 mb-2">Información Personal</h3>
        <p className="text-gray-600">Necesitamos algunos detalles para personalizar tu experiencia</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nombre Completo *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="mt-1"
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <Label htmlFor="email">Correo Electrónico *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="mt-1"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Teléfono *</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="mt-1"
            placeholder="+52 55 1234 5678"
          />
        </div>
        <div>
          <Label htmlFor="address">Dirección del Evento *</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="mt-1"
            placeholder="Dirección completa donde será el servicio"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="dietary">Restricciones Dietéticas</Label>
        <Textarea
          id="dietary"
          value={formData.dietaryRestrictions}
          onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
          className="mt-1"
          placeholder="Alergias, intolerancias, preferencias vegetarianas/veganas, etc."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="special">Solicitudes Especiales</Label>
        <Textarea
          id="special"
          value={formData.specialRequests}
          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
          className="mt-1"
          placeholder="Ocasión especial, preferencias de menú, decoración, etc."
          rows={3}
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-serif text-gray-900 mb-2">Confirmar Reserva</h3>
        <p className="text-gray-600">Revisar detalles y proceder con el pago del depósito</p>
      </div>

      {/* Order Summary */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChefHat className="mr-2 h-5 w-5 text-amber-600" />
            Resumen de tu Reserva
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Servicio:</span>
            <span className="font-medium">
              {serviceTypes.find(s => s.id === formData.serviceType)?.name}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Huéspedes:</span>
            <span className="font-medium">{formData.guests} personas</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Fecha:</span>
            <span className="font-medium">
              {formData.selectedDate && format(formData.selectedDate, "dd/MM/yyyy", { locale: es })}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span>Hora:</span>
            <span className="font-medium">
              {timeSlots.find(s => s.value === formData.selectedTime)?.label}
            </span>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between items-center text-lg">
            <span>Total:</span>
            <span className="font-bold">${totalPrice.toLocaleString()} MXN</span>
          </div>
          <div className="flex justify-between items-center text-amber-600">
            <span>Depósito (50%):</span>
            <span className="font-semibold">${deposit.toLocaleString()} MXN</span>
          </div>
          <div className="flex justify-between items-center text-gray-600">
            <span>Restante:</span>
            <span>${remaining.toLocaleString()} MXN (se paga el día del evento)</span>
          </div>
        </CardContent>
      </Card>

      {/* Payment Form */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5 text-amber-600" />
            Información de Pago
          </CardTitle>
          <CardDescription>
            Pago seguro del depósito de ${deposit.toLocaleString()} MXN
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Número de Tarjeta</Label>
            <Input
              id="cardNumber"
              value={formData.cardNumber}
              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2">
              <Label htmlFor="expiryDate">Fecha de Vencimiento</Label>
              <Input
                id="expiryDate"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                placeholder="MM/AA"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                value={formData.cvv}
                onChange={(e) => handleInputChange("cvv", e.target.value)}
                placeholder="123"
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="cardholderName">Nombre del Titular</Label>
            <Input
              id="cardholderName"
              value={formData.cardholderName}
              onChange={(e) => handleInputChange("cardholderName", e.target.value)}
              placeholder="Nombre como aparece en la tarjeta"
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start">
          <Shield className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
          <div className="text-sm text-green-800">
            <div className="font-medium mb-1">Pago 100% Seguro</div>
            <div>Tu información está protegida con encriptación SSL. El resto del pago se realiza directamente con el chef el día del evento.</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl h-[90vh] p-0 flex flex-col">
        <DialogHeader className="sr-only">
          <DialogTitle>Reservar Experiencia Culinaria - Paso {currentStep} de 4</DialogTitle>
        </DialogHeader>
        
        {/* Header fijo */}
        <div className="p-4 sm:p-6 pb-4 border-b border-gray-100 flex-shrink-0">
          {renderStepIndicator()}
        </div>
        
        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 pt-4">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>
        </div>

        {/* Footer fijo */}
        <div className="p-4 sm:p-6 pt-4 border-t border-gray-200 flex-shrink-0">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <Button
              variant="outline"
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : onClose()}
              className="flex items-center justify-center w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {currentStep > 1 ? "Anterior" : "Cancelar"}
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceedToNextStep()}
                className="bg-amber-600 hover:bg-amber-700 flex items-center justify-center w-full sm:w-auto"
              >
                Continuar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceedToNextStep()}
                className="bg-green-600 hover:bg-green-700 flex items-center justify-center w-full sm:w-auto"
              >
                <Check className="mr-2 h-4 w-4" />
                Confirmar Reserva
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}