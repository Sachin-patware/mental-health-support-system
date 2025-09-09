"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, ArrowLeft, CheckCircle } from "lucide-react"

export default function BookPage() {
  const [step, setStep] = useState(1)
  const [selectedCounselor, setSelectedCounselor] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const counselors = [
    { id: "1", name: "Dr. Ananya Mehta", specialty: "Anxiety & Depression", rating: 4.9 },
{ id: "2", name: "Dr. Arjun Iyer", specialty: "Academic Stress", rating: 4.8 },
{ id: "3", name: "Dr. Riya Kapoor", specialty: "Relationship Issues", rating: 4.9 },
{ id: "4", name: "Dr. Rajesh Sharma", specialty: "Crisis Support", rating: 5.0 }
,
  ]

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Booking appointment submitted")
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Appointment Booked!</h2>
            <p className="text-green-600 mb-4">Your confidential session has been scheduled.</p>
            <Button onClick={() => (window.location.href = "/dashboard")} className="w-full">
              View Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold">Book Counselor Appointment</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex items-center ${i < 3 ? "flex-1" : ""}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step >= i ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i}
                </div>
                {i < 3 && <div className={`flex-1 h-0.5 mx-4 ${step > i ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Select Counselor</span>
            <span>Choose Date & Time</span>
            <span>Confirm Details</span>
          </div>
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Counselor</CardTitle>
              <CardDescription>All sessions are confidential and HIPAA compliant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {counselors.map((counselor) => (
                <div
                  key={counselor.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedCounselor === counselor.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedCounselor(counselor.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{counselor.name}</h3>
                      <p className="text-sm text-muted-foreground">{counselor.specialty}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">★ {counselor.rating}</div>
                      <div className="text-xs text-muted-foreground">Available Today</div>
                    </div>
                  </div>
                </div>
              ))}
              <Button onClick={() => setStep(2)} disabled={!selectedCounselor} className="w-full">
                Continue
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>Choose your preferred appointment slot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <div className="grid grid-cols-2 gap-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      onClick={() => setSelectedTime(time)}
                      className="justify-start"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} disabled={!selectedDate || !selectedTime} className="flex-1">
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Confirm Appointment</CardTitle>
              <CardDescription>Please provide additional details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Visit</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary concern" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anxiety">Anxiety</SelectItem>
                      <SelectItem value="depression">Depression</SelectItem>
                      <SelectItem value="stress">Academic Stress</SelectItem>
                      <SelectItem value="relationships">Relationship Issues</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any specific concerns or topics you'd like to discuss..."
                    rows={3}
                  />
                </div>

                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Appointment Summary</h4>
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>Counselor:</strong> {counselors.find((c) => c.id === selectedCounselor)?.name}
                    </p>
                    <p>
                      <strong>Date:</strong> {selectedDate}
                    </p>
                    <p>
                      <strong>Time:</strong> {selectedTime}
                    </p>
                    <p>
                      <strong>Duration:</strong> 50 minutes
                    </p>
                    <p>
                      <strong>Type:</strong> Confidential Session
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1">
                    Book Appointment
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
