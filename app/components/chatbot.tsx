"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"

interface ChatBotProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatBot({ isOpen, onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy el asistente virtual de EM Cuisine. ¿En qué puedo ayudarte hoy? Puedo responder preguntas sobre nuestros servicios, precios, disponibilidad y más.",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const botResponses = {
    servicios:
      "Ofrecemos tres tipos principales de servicios:\n\n🍽️ **Cena Íntima** - Para 2-4 personas, desde $150 USD\n👨‍👩‍👧‍👦 **Evento Familiar** - Para grupos medianos, desde $300 USD\n🏢 **Evento Corporativo** - Para reuniones de negocios, desde $500 USD\n\n¿Te interesa algún servicio en particular?",
    precios:
      "Nuestros precios varían según el servicio:\n\n• Cena Íntima: Desde $150 USD\n• Evento Familiar: Desde $300 USD\n• Evento Corporativo: Desde $500 USD\n\nLos precios incluyen ingredientes premium, preparación, servicio y limpieza. ¿Quieres más detalles sobre algún servicio?",
    reservar:
      'Para hacer una reservación puedes:\n\n1. Usar el botón "Reservar Ahora" en la página principal\n2. Llamarnos al +1 (555) 123-4567\n3. Escribirnos a chef@emcuisine.com\n\n¿Prefieres que te ayude con algún método específico?',
    menu: "Nuestros menús son completamente personalizados según tus preferencias. Trabajamos con:\n\n🥩 Carnes premium\n🐟 Pescados y mariscos frescos\n🥬 Ingredientes orgánicos\n🍷 Maridajes de vinos\n\nTambién adaptamos menús para dietas especiales (vegana, sin gluten, etc.). ¿Tienes alguna preferencia específica?",
    disponibilidad:
      "Trabajamos de martes a domingo. Los horarios más populares son:\n\n🌅 Almuerzo: 12:00 PM - 3:00 PM\n🌙 Cena: 6:00 PM - 10:00 PM\n\nRecomendamos reservar con al menos 1 semana de anticipación. ¿Tienes alguna fecha en mente?",
    contacto:
      "Puedes contactarnos por:\n\n📞 Teléfono: +1 (555) 123-4567\n📧 Email: chef@emcuisine.com\n📍 Ubicación: Ciudad de México\n\n¿Prefieres que te contactemos por algún medio específico?",
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("servicio") || message.includes("que ofrecen")) {
      return botResponses.servicios
    } else if (message.includes("precio") || message.includes("costo") || message.includes("cuanto")) {
      return botResponses.precios
    } else if (message.includes("reservar") || message.includes("reservacion") || message.includes("cita")) {
      return botResponses.reservar
    } else if (message.includes("menu") || message.includes("comida") || message.includes("plato")) {
      return botResponses.menu
    } else if (message.includes("disponible") || message.includes("horario") || message.includes("cuando")) {
      return botResponses.disponibilidad
    } else if (message.includes("contacto") || message.includes("telefono") || message.includes("email")) {
      return botResponses.contacto
    } else if (message.includes("hola") || message.includes("buenos") || message.includes("buenas")) {
      return "¡Hola! Es un placer atenderte. ¿En qué puedo ayudarte hoy? Puedo contarte sobre nuestros servicios, precios, disponibilidad o cualquier otra consulta que tengas."
    } else if (message.includes("gracias")) {
      return "¡De nada! Es un placer ayudarte. Si tienes más preguntas, no dudes en escribirme. ¡Esperamos poder crear una experiencia culinaria increíble para ti!"
    } else {
      return "Entiendo tu consulta. Te puedo ayudar con información sobre:\n\n• Nuestros servicios y precios\n• Disponibilidad y reservaciones\n• Menús personalizados\n• Información de contacto\n\n¿Sobre qué te gustaría saber más?"
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages, isTyping])

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b bg-amber-600 text-white">
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Asistente EM Cuisine
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.sender === "bot" && (
                  <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                    message.sender === "user" ? "bg-neutral-800 text-white" : "bg-neutral-100 text-neutral-800"
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <div className="bg-neutral-100 text-neutral-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-amber-600 hover:bg-amber-700"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
