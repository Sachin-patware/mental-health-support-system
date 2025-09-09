"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, MessageCircle, ArrowLeft, AlertTriangle, Clock, Shield, Heart, Users, MapPin } from "lucide-react"

export default function CrisisSupportPage() {
  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      number: "988",
      description: "24/7 free and confidential support",
      type: "call",
    },
    {
      name: "Crisis Text Line",
      number: "741741",
      description: "Text HOME to 741741",
      type: "text",
    },
    {
      name: "National Sexual Assault Hotline",
      number: "1-800-656-4673",
      description: "24/7 confidential support",
      type: "call",
    },
    {
      name: "National Domestic Violence Hotline",
      number: "1-800-799-7233",
      description: "24/7 confidential support",
      type: "call",
    },
  ]

  const campusResources = [
    {
      name: "Campus Counseling Center",
      contact: "Campus Emergency: 911",
      hours: "24/7 Emergency Support",
      location: "Student Services Building",
    },
    {
      name: "Campus Safety",
      contact: "Emergency: 911",
      hours: "24/7 Available",
      location: "Security Office",
    },
    {
      name: "Student Health Services",
      contact: "Health Center",
      hours: "Mon-Fri 8AM-5PM",
      location: "Health Services Building",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-destructive/5 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-destructive rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-destructive">Crisis Support</h1>
                <p className="text-sm text-destructive/80">Immediate help is available</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Emergency Alert */}
        <Card className="border-destructive bg-destructive/5 mb-8">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertTriangle className="w-12 h-12 text-destructive mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-destructive mb-2">If you're in immediate danger</h2>
              <p className="text-destructive/80 mb-6">Don't wait. Call emergency services right now.</p>
              <Button
                size="lg"
                variant="destructive"
                className="text-lg px-8"
                onClick={() => handleEmergencyCall("911")}
              >
                <Phone className="w-5 h-5 mr-2" />
                Call 911 Now
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* National Crisis Resources */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Phone className="w-5 h-5 text-primary" />
                National Crisis Resources
              </h3>
              <p className="text-muted-foreground mb-6">Free, confidential support available 24/7</p>
            </div>

            <div className="space-y-4">
              {crisisResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{resource.name}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full"
                      variant={resource.type === "call" ? "default" : "outline"}
                      onClick={() => handleEmergencyCall(resource.number)}
                    >
                      {resource.type === "call" ? (
                        <Phone className="w-4 h-4 mr-2" />
                      ) : (
                        <MessageCircle className="w-4 h-4 mr-2" />
                      )}
                      {resource.type === "call" ? "Call" : "Text"} {resource.number}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Campus Resources */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Campus Resources
              </h3>
              <p className="text-muted-foreground mb-6">On-campus support and emergency services</p>
            </div>

            <div className="space-y-4">
              {campusResources.map((resource, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">{resource.name}</CardTitle>
                    <CardDescription>{resource.contact}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {resource.hours}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {resource.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Support */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Heart className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">AI Support Chat</h4>
              <p className="text-sm text-muted-foreground mb-4">24/7 AI-powered emotional support</p>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/chat")}>
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Peer Support</h4>
              <p className="text-sm text-muted-foreground mb-4">Connect with other students</p>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/forum")}>
                Join Forum
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="w-8 h-8 text-primary mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Professional Help</h4>
              <p className="text-sm text-muted-foreground mb-4">Book with licensed counselors</p>
              <Button variant="outline" size="sm" onClick={() => (window.location.href = "/book")}>
                Book Session
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Safety Planning */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Safety Planning
            </CardTitle>
            <CardDescription>Create a personal safety plan for crisis situations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div>
                <h5 className="font-semibold mb-2">Warning Signs to Watch For:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Thoughts of self-harm or suicide</li>
                  <li>Feeling hopeless or trapped</li>
                  <li>Extreme mood changes</li>
                  <li>Withdrawing from friends and activities</li>
                  <li>Increased use of alcohol or drugs</li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-2">Coping Strategies:</h5>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Reach out to trusted friends or family</li>
                  <li>Use breathing exercises or meditation</li>
                  <li>Engage in physical activity</li>
                  <li>Remove access to harmful items</li>
                  <li>Call a crisis hotline immediately</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
