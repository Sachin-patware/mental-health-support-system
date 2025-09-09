"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  BookOpen,
  Users,
  Shield,
  Heart,
  Brain,
  Phone,
  Clock,
  Menu,
  X,
  Activity,
  Moon,
  Target,
  TrendingUp,
  AlertTriangle,
  Smile,
  Meh,
  Frown,
} from "lucide-react"
import { SignInModal } from "@/components/sign-in-modal"

export default function HomePage() {
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentMood, setCurrentMood] = useState<"good" | "neutral" | "bad" | null>(null)

  const handleMoodSelect = (mood: "good" | "neutral" | "bad") => {
    setCurrentMood(mood)
    console.log("[v0] Mood selected:", mood)
    // In real app, this would save to database and trigger personalized recommendations
  }

  const handleStartChat = () => {
    console.log("[v0] Starting AI chat support")
    window.location.href = "/chat"
  }

  const handleBookCounselor = () => {
    console.log("[v0] Opening booking system")
    window.location.href = "/book"
  }

  const handleViewResources = () => {
    console.log("[v0] Opening resource library")
    window.location.href = "/resources"
  }

  const handleJoinForum = () => {
    console.log("[v0] Opening peer support forum")
    window.location.href = "/forum"
  }

  const handleCrisisSupport = () => {
    console.log("[v0] Opening crisis support")
    const crisisOptions = `
🚨 IMMEDIATE CRISIS SUPPORT:
• Call 988 (Suicide & Crisis Lifeline)
• Text "HELLO" to 741741 (Crisis Text Line)
• Call 911 for emergencies

🏥 CAMPUS RESOURCES:
• Campus Counseling Center: Available 24/7
• Campus Safety: Emergency assistance
• Student Health Services: Medical support

Would you like to be connected to a crisis counselor now?`

    if (confirm(crisisOptions)) {
      // In real app, this would connect to crisis support system
      window.location.href = "/crisis-support"
    }
  }

  const wellnessData = {
    moodScore: 7.2,
    sleepHours: 6.5,
    stressLevel: 4,
    weeklyProgress: 78,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary rounded-xl flex items-center justify-center">
                <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-foreground">MindCare</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">AI-Powered Mental Wellness</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <nav className="flex items-center gap-6">
                <Button variant="ghost" size="sm" onClick={handleStartChat} className="hover:text-primary">
                  AI Support
                </Button>
                <Button variant="ghost" size="sm" onClick={handleBookCounselor} className="hover:text-primary">
                  Book Counselor
                </Button>
                <Button variant="ghost" size="sm" onClick={handleViewResources} className="hover:text-primary">
                  Resources
                </Button>
                <Button variant="ghost" size="sm" onClick={handleJoinForum} className="hover:text-primary">
                  Community
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => (window.location.href = "/dashboard")}
                  className="hover:text-primary"
                >
                  Dashboard
                </Button>
              </nav>
              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={() => setIsSignInOpen(true)}>
                  Sign In
                </Button>
                <Button size="sm" onClick={() => setIsSignInOpen(true)}>
                  Get Started
                </Button>
              </div>
            </div>

            {/* Medium screen navigation */}
            <div className="hidden md:flex lg:hidden items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setIsSignInOpen(true)}>
                Sign In
              </Button>
              <Button size="sm" onClick={() => setIsSignInOpen(true)}>
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="sm" onClick={handleStartChat} className="justify-start">
                  AI Support
                </Button>
                <Button variant="ghost" size="sm" onClick={handleBookCounselor} className="justify-start">
                  Book Counselor
                </Button>
                <Button variant="ghost" size="sm" onClick={handleViewResources} className="justify-start">
                  Resources
                </Button>
                <Button variant="ghost" size="sm" onClick={handleJoinForum} className="justify-start">
                  Community
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => (window.location.href = "/dashboard")}
                  className="justify-start"
                >
                  Dashboard
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsSignInOpen(true)} className="justify-start">
                  Sign In
                </Button>
                <Button size="sm" onClick={() => setIsSignInOpen(true)} className="justify-start">
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      <section className="py-6 px-4 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-foreground">How are you feeling today?</h3>
              <p className="text-sm text-muted-foreground">Quick mood check to personalize your experience</p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant={currentMood === "good" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMoodSelect("good")}
                className="flex items-center gap-2"
              >
                <Smile className="w-4 h-4" />
                Good
              </Button>
              <Button
                variant={currentMood === "neutral" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMoodSelect("neutral")}
                className="flex items-center gap-2"
              >
                <Meh className="w-4 h-4" />
                Okay
              </Button>
              <Button
                variant={currentMood === "bad" ? "default" : "outline"}
                size="sm"
                onClick={() => handleMoodSelect("bad")}
                className="flex items-center gap-2"
              >
                <Frown className="w-4 h-4" />
                Struggling
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-24 px-4">
        <div className="container mx-auto text-center max-w-5xl">
          <Badge variant="secondary" className="mb-4 sm:mb-6 text-xs sm:text-sm">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            AI-Powered • 100% Confidential • Evidence-Based
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-balance mb-6 sm:mb-8 text-foreground leading-tight">
            Your Personalized Mental Wellness Journey
          </h1>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-muted-foreground text-balance mb-8 sm:mb-12 leading-relaxed px-4 max-w-4xl mx-auto">
            Advanced AI-powered platform with comprehensive mood tracking, personalized interventions, and professional
            support designed specifically for college students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center max-w-md sm:max-w-none mx-auto">
            <Button
              size="lg"
              className="text-base sm:text-lg lg:text-xl px-8 sm:px-10 h-12 sm:h-14 lg:h-16"
              onClick={handleStartChat}
            >
              <Brain className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" />
              Start AI Assessment
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base sm:text-lg lg:text-xl px-8 sm:px-10 h-12 sm:h-14 lg:h-16 bg-transparent"
              onClick={() => (window.location.href = "/dashboard")}
            >
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" />
              View Dashboard
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{wellnessData.moodScore}/10</div>
                <p className="text-sm text-muted-foreground">Mood Score</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <Moon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{wellnessData.sleepHours}h</div>
                <p className="text-sm text-muted-foreground">Sleep Average</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{wellnessData.stressLevel}/10</div>
                <p className="text-sm text-muted-foreground">Stress Level</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">{wellnessData.weeklyProgress}%</div>
                <p className="text-sm text-muted-foreground">Weekly Progress</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
              Comprehensive Mental Health Ecosystem
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto text-balance px-4">
              Advanced AI-powered tools, professional integration, and personalized interventions for complete mental
              wellness support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            <Card
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
              onClick={handleStartChat}
            >
              <CardHeader className="pb-4 sm:pb-6 lg:pb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                  <Brain className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">AI Wellness Coach</CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  Advanced AI with mood analysis, personalized coping strategies, CBT techniques, and crisis detection
                  with professional referrals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    24/7 AI Support
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                    <Target className="w-4 h-4 sm:w-5 sm:h-5" />
                    Personalized Interventions
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
              onClick={() => (window.location.href = "/tracking")}
            >
              <CardHeader className="pb-4 sm:pb-6 lg:pb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                  <Activity className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">Comprehensive Tracking</CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  Track mood, sleep, medication, stress levels, and environmental factors with AI-powered insights and
                  trend analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                    Mood & Emotion Tracking
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                    <Moon className="w-4 h-4 sm:w-5 sm:h-5" />
                    Sleep & Wellness Metrics
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Professional Integration */}
            <Card
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
              onClick={handleBookCounselor}
            >
              <CardHeader className="pb-4 sm:pb-6 lg:pb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                  <Calendar className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">Professional Integration</CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  Seamless connection with licensed therapists, psychiatrists, and campus counselors with shared
                  progress data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                    HIPAA Compliant
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                    Licensed Professionals
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Hub */}
            <Card
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
              onClick={handleViewResources}
            >
              <CardHeader className="pb-4 sm:pb-6 lg:pb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                  <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">Personalized Resources</CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  AI-curated content library with videos, exercises, and guides tailored to your specific needs and
                  cultural background.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5" />
                  AI-Personalized Content
                </div>
              </CardContent>
            </Card>

            {/* Peer Support */}
            <Card
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 cursor-pointer"
              onClick={handleJoinForum}
            >
              <CardHeader className="pb-4 sm:pb-6 lg:pb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-primary/20 transition-colors">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl">Smart Peer Matching</CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  AI-powered peer matching based on shared experiences, with moderated support groups and trained
                  volunteers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs sm:text-sm lg:text-base text-muted-foreground">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  Smart Matching Algorithm
                </div>
              </CardContent>
            </Card>

            <Card
              className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-destructive/20 bg-destructive/5 cursor-pointer"
              onClick={handleCrisisSupport}
            >
              <CardHeader className="pb-4 sm:pb-6 lg:pb-8">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-destructive/10 rounded-lg flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-destructive/20 transition-colors">
                  <AlertTriangle className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-destructive" />
                </div>
                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-destructive">
                  Advanced Crisis Support
                </CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg">
                  AI crisis detection, immediate professional connection, safety planning, and emergency contact
                  integration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" size="sm" className="w-full lg:text-base" onClick={handleCrisisSupport}>
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Emergency Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl lg:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 text-foreground">
                Your Mental Wellness Journey Starts Now
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 sm:mb-12 text-balance px-4">
                Join thousands of students who've transformed their mental health with our AI-powered platform.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-md sm:max-w-lg lg:max-w-xl mx-auto">
                <Button size="lg" className="w-full h-12 sm:h-14 lg:h-16 lg:text-xl" onClick={handleStartChat}>
                  <Brain className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" />
                  Start AI Assessment
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full h-12 sm:h-14 lg:h-16 lg:text-xl bg-transparent"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" />
                  View Dashboard
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-8 sm:py-12 lg:py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground text-lg lg:text-xl">MindCare</span>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground">
                AI-powered mental wellness platform supporting college students with comprehensive, personalized care.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base lg:text-lg">AI Support</h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-muted-foreground">
                <li>
                  <button onClick={handleStartChat} className="hover:text-primary transition-colors text-left">
                    AI Wellness Coach
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => (window.location.href = "/tracking")}
                    className="hover:text-primary transition-colors text-left"
                  >
                    Mood Tracking
                  </button>
                </li>
                <li>
                  <button onClick={handleCrisisSupport} className="hover:text-primary transition-colors text-left">
                    Crisis Detection
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base lg:text-lg">
                Professional Care
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-muted-foreground">
                <li>
                  <button onClick={handleBookCounselor} className="hover:text-primary transition-colors text-left">
                    Licensed Therapists
                  </button>
                </li>
                <li>
                  <button onClick={handleViewResources} className="hover:text-primary transition-colors text-left">
                    Treatment Plans
                  </button>
                </li>
                <li>
                  <button onClick={handleJoinForum} className="hover:text-primary transition-colors text-left">
                    Support Groups
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 sm:mb-4 text-foreground text-sm sm:text-base lg:text-lg">
                Privacy & Security
              </h4>
              <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm lg:text-base text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    HIPAA Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Data Encryption
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Privacy Controls
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-sm lg:text-base text-muted-foreground">
            <p>© 2024 MindCare. AI-powered mental wellness platform built with care for student success.</p>
          </div>
        </div>
      </footer>

      <SignInModal open={isSignInOpen} onOpenChange={setIsSignInOpen} />
    </div>
  )
}
