"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Home, Heart, Moon, Activity, Brain, Smile, Meh, Frown, Save, TrendingUp, Calendar } from "lucide-react"

export default function TrackingPage() {
  const [moodScore, setMoodScore] = useState([7])
  const [energyLevel, setEnergyLevel] = useState([6])
  const [stressLevel, setStressLevel] = useState([4])
  const [sleepHours, setSleepHours] = useState([7])
  const [notes, setNotes] = useState("")
  const [selectedMood, setSelectedMood] = useState<"happy" | "neutral" | "sad" | null>(null)

  const handleSaveEntry = () => {
    const entry = {
      date: new Date().toISOString(),
      mood: selectedMood,
      moodScore: moodScore[0],
      energyLevel: energyLevel[0],
      stressLevel: stressLevel[0],
      sleepHours: sleepHours[0],
      notes,
    }
    console.log("[v0] Saving wellness entry:", entry)
    alert("Wellness entry saved successfully!")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")}>
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
              <h1 className="text-xl font-bold text-foreground">Wellness Tracking</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/dashboard")}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Daily Wellness Check-in</h2>
          <p className="text-muted-foreground">
            Track your mental and physical wellness to identify patterns and improve your well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Tracking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  How are you feeling today?
                </CardTitle>
                <CardDescription>Select your overall mood and rate it on a scale</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Mood Icons */}
                  <div className="flex justify-center gap-6">
                    <Button
                      variant={selectedMood === "happy" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedMood("happy")}
                      className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                      <Smile className="w-8 h-8" />
                      <span>Happy</span>
                    </Button>
                    <Button
                      variant={selectedMood === "neutral" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedMood("neutral")}
                      className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                      <Meh className="w-8 h-8" />
                      <span>Neutral</span>
                    </Button>
                    <Button
                      variant={selectedMood === "sad" ? "default" : "outline"}
                      size="lg"
                      onClick={() => setSelectedMood("sad")}
                      className="flex flex-col items-center gap-2 h-auto py-4"
                    >
                      <Frown className="w-8 h-8" />
                      <span>Struggling</span>
                    </Button>
                  </div>

                  {/* Mood Score Slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Mood Score</label>
                      <Badge variant="secondary">{moodScore[0]}/10</Badge>
                    </div>
                    <Slider
                      value={moodScore}
                      onValueChange={setMoodScore}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Very Low</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Energy & Stress Levels */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Energy & Stress Levels
                </CardTitle>
                <CardDescription>Rate your current energy and stress levels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Energy Level */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Energy Level</label>
                    <Badge variant="secondary">{energyLevel[0]}/10</Badge>
                  </div>
                  <Slider
                    value={energyLevel}
                    onValueChange={setEnergyLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Exhausted</span>
                    <span>Energized</span>
                  </div>
                </div>

                {/* Stress Level */}
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Stress Level</label>
                    <Badge variant="secondary">{stressLevel[0]}/10</Badge>
                  </div>
                  <Slider
                    value={stressLevel}
                    onValueChange={setStressLevel}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Very Calm</span>
                    <span>Very Stressed</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sleep Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Moon className="w-5 h-5" />
                  Sleep Quality
                </CardTitle>
                <CardDescription>How many hours did you sleep last night?</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Hours of Sleep</label>
                    <Badge variant="secondary">{sleepHours[0]} hours</Badge>
                  </div>
                  <Slider
                    value={sleepHours}
                    onValueChange={setSleepHours}
                    max={12}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>1 hour</span>
                    <span>12 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Additional Notes
                </CardTitle>
                <CardDescription>Any thoughts, events, or observations about your day?</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What happened today? How are you feeling? Any triggers or positive moments to note..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </CardContent>
            </Card>

            {/* Save Button */}
            <Button size="lg" className="w-full" onClick={handleSaveEntry}>
              <Save className="w-4 h-4 mr-2" />
              Save Today's Entry
            </Button>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Mood</span>
                  <Badge variant="secondary">{moodScore[0]}/10</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Energy</span>
                  <Badge variant="secondary">{energyLevel[0]}/10</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Stress</span>
                  <Badge variant="secondary">{stressLevel[0]}/10</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Sleep</span>
                  <Badge variant="secondary">{sleepHours[0]}h</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Wellness Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium text-sm">💡 Consistency is key</div>
                  <div className="text-xs text-muted-foreground">Track daily for better insights</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium text-sm">🎯 Notice patterns</div>
                  <div className="text-xs text-muted-foreground">Look for mood and sleep connections</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="font-medium text-sm">🌱 Small changes</div>
                  <div className="text-xs text-muted-foreground">Gradual improvements work best</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Need Support?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/chat")}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Talk to AI Coach
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/resources")}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Wellness Resources
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/book")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Counselor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
