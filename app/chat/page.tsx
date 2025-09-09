"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send, Heart, ArrowLeft, Phone, AlertTriangle, Lightbulb, Users, Calendar } from "lucide-react"

export default function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "ai",
      content: "Hello! I'm here to provide support and guidance. How are you feeling today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const quickSuggestions = [
    "I'm feeling anxious about exams",
    "I'm having trouble sleeping",
    "I feel overwhelmed with coursework",
    "I'm feeling lonely on campus",
  ]

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: "ai",
        content: getAIResponse(inputMessage),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const getAIResponse = (message: string) => {
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes("anxious") || lowerMessage.includes("anxiety")) {
      return "I understand you're feeling anxious. That's completely normal, especially during exam periods. Try the 4-7-8 breathing technique: breathe in for 4 counts, hold for 7, exhale for 8. Would you like me to guide you through some other coping strategies?"
    }

    if (lowerMessage.includes("sleep") || lowerMessage.includes("tired")) {
      return "Sleep issues are very common among students. Try establishing a bedtime routine, avoiding screens 1 hour before bed, and keeping your room cool and dark. If this persists, I'd recommend speaking with a counselor. Would you like me to help you book an appointment?"
    }

    if (lowerMessage.includes("overwhelmed") || lowerMessage.includes("stressed")) {
      return "Feeling overwhelmed is a sign that you're taking on a lot. Let's break this down together. What's the most pressing thing on your mind right now? Sometimes organizing our thoughts can help reduce the feeling of being overwhelmed."
    }

    if (lowerMessage.includes("lonely") || lowerMessage.includes("alone")) {
      return "Loneliness on campus is more common than you might think. Many students feel this way, especially when adjusting to college life. Have you considered joining any clubs or study groups? I can also connect you with our peer support forum where you can meet other students."
    }

    return "Thank you for sharing that with me. Your feelings are valid and it's brave of you to reach out. Can you tell me more about what's been on your mind lately? I'm here to listen and support you."
  }

  const handleQuickSuggestion = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">AI Support Chat</h1>
                <p className="text-sm text-muted-foreground">Available 24/7 • Confidential</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    Chat Support
                  </CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Online
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-3 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : ""}`}>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback
                            className={message.type === "ai" ? "bg-primary text-primary-foreground" : "bg-muted"}
                          >
                            {message.type === "ai" ? "AI" : "You"}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`rounded-lg p-3 ${
                            message.type === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 max-w-[80%]">
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="bg-primary text-primary-foreground">AI</AvatarFallback>
                        </Avatar>
                        <div className="rounded-lg p-3 bg-muted">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Suggestions */}
                {messages.length === 1 && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Quick suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickSuggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs bg-transparent"
                          onClick={() => handleQuickSuggestion(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Crisis Support */}
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-4 h-4" />
                  Crisis Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-3">
                  If you're in immediate danger or having thoughts of self-harm
                </p>
                <Button variant="destructive" size="sm" className="w-full">
                  <Phone className="w-3 h-3 mr-2" />
                  Call 988
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/book")}
                >
                  <Calendar className="w-3 h-3 mr-2" />
                  Book Counselor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/resources")}
                >
                  <Heart className="w-3 h-3 mr-2" />
                  View Resources
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/forum")}
                >
                  <Users className="w-3 h-3 mr-2" />
                  Join Forum
                </Button>
              </CardContent>
            </Card>

            {/* Privacy Notice */}
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-muted-foreground text-center">
                  This chat is confidential and secure. Your privacy is our priority.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
