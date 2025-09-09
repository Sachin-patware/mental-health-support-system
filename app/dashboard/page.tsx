"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Activity,
  Brain,
  Calendar,
  Heart,
  Moon,
  Target,
  TrendingUp,
  Users,
  BookOpen,
  AlertTriangle,
  Home,
  Settings,
  Bell,
  Smile,
  Meh,
  Frown,
  Plus,
  X,
  Play,
  MessageCircle,
} from "lucide-react"

interface AdminNotification {
  id: string
  studentId: string
  studentName: string
  message: string
  videoId?: string
  sentAt: string
  read: boolean
}

interface MeditationVideo {
  id: string
  title: string
  url: string
  duration: string
  category: string
  description: string
  addedAt: string
}

export default function DashboardPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<"week" | "month" | "year">("week")
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [adminVideos, setAdminVideos] = useState<MeditationVideo[]>([])

  useEffect(() => {
    const loadNotifications = () => {
      const storedNotifications = JSON.parse(localStorage.getItem("studentNotifications") || "[]")
      setNotifications(storedNotifications)
      setUnreadCount(storedNotifications.filter((n: AdminNotification) => !n.read).length)
    }

    const loadAdminVideos = () => {
      const storedVideos = JSON.parse(localStorage.getItem("adminVideos") || "[]")
      setAdminVideos(storedVideos.slice(0, 6)) // Show latest 6 videos
    }

    loadNotifications()
    loadAdminVideos()

    // Check for new notifications and videos every 5 seconds
    const interval = setInterval(() => {
      loadNotifications()
      loadAdminVideos()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const markAsRead = (notificationId: string) => {
    const updatedNotifications = notifications.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    setNotifications(updatedNotifications)

    // Update localStorage
    localStorage.setItem("studentNotifications", JSON.stringify(updatedNotifications))
    setUnreadCount(updatedNotifications.filter((n) => !n.read).length)
  }

  const removeNotification = (notificationId: string) => {
    const updatedNotifications = notifications.filter((n) => n.id !== notificationId)
    setNotifications(updatedNotifications)

    // Update localStorage
    localStorage.setItem("studentNotifications", JSON.stringify(updatedNotifications))
    setUnreadCount(updatedNotifications.filter((n) => !n.read).length)
  }

  const getVideoById = (videoId: string) => {
    return adminVideos.find((v) => v.id === videoId)
  }

  // Mock data for demonstration
  const wellnessData = {
    moodScore: 7.2,
    sleepAverage: 6.5,
    stressLevel: 4,
    weeklyProgress: 78,
    streakDays: 12,
    completedGoals: 8,
    totalGoals: 12,
  }

  const recentMoods = [
    { date: "Today", mood: "good", score: 8 },
    { date: "Yesterday", mood: "neutral", score: 6 },
    { date: "2 days ago", mood: "good", score: 7 },
    { date: "3 days ago", mood: "bad", score: 4 },
    { date: "4 days ago", mood: "neutral", score: 6 },
  ]

  const upcomingAppointments = [
    { date: "Tomorrow", time: "2:00 PM", provider: "Dr. Sarah Johnson", type: "Therapy Session" },
    { date: "Friday", time: "10:00 AM", provider: "Campus Counseling", type: "Check-in" },
  ]

  const personalizedRecommendations = [
    { title: "Breathing Exercise", description: "Based on your stress levels", duration: "5 min", type: "exercise" },
    { title: "Sleep Hygiene Tips", description: "Improve your sleep quality", duration: "10 min", type: "article" },
    { title: "Mindfulness Meditation", description: "For anxiety management", duration: "15 min", type: "meditation" },
  ]

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case "good":
        return <Smile className="w-4 h-4 text-green-500" />
      case "neutral":
        return <Meh className="w-4 h-4 text-yellow-500" />
      case "bad":
        return <Frown className="w-4 h-4 text-red-500" />
      default:
        return <Meh className="w-4 h-4" />
    }
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
              <h1 className="text-xl font-bold text-foreground">Wellness Dashboard</h1>
            </div>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {unreadCount}
                      </span>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Notifications</DialogTitle>
                    <DialogDescription>Messages and recommendations from your support team</DialogDescription>
                  </DialogHeader>
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {notifications.length === 0 ? (
                      <p className="text-center text-muted-foreground py-8">No notifications yet</p>
                    ) : (
                      notifications
                        .slice()
                        .reverse()
                        .map((notification) => {
                          const recommendedVideo = notification.videoId ? getVideoById(notification.videoId) : null

                          return (
                            <div
                              key={notification.id}
                              className={`p-4 rounded-lg border ${
                                notification.read ? "bg-muted/30" : "bg-primary/5 border-primary/20"
                              }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    <MessageCircle className="w-4 h-4 text-primary" />
                                    <Badge variant="secondary">Support Team</Badge>
                                    {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                                  </div>
                                  <p className="text-sm mb-2">{notification.message}</p>

                                  {recommendedVideo && (
                                    <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                                      <div className="flex items-center gap-2 mb-2">
                                        <Play className="w-4 h-4 text-emerald-600" />
                                        <span className="text-sm font-medium text-emerald-800">Recommended Video</span>
                                      </div>
                                      <div className="space-y-2">
                                        <p className="text-sm font-medium">{recommendedVideo.title}</p>
                                        <p className="text-xs text-muted-foreground">{recommendedVideo.description}</p>
                                        <div className="flex items-center gap-2">
                                          <Badge variant="secondary" className="text-xs">
                                            {recommendedVideo.category}
                                          </Badge>
                                          <Badge variant="outline" className="text-xs">
                                            {recommendedVideo.duration}
                                          </Badge>
                                        </div>
                                        <Button size="sm" variant="outline" asChild className="w-full bg-transparent">
                                          <a href={recommendedVideo.url} target="_blank" rel="noopener noreferrer">
                                            <Play className="w-3 h-3 mr-2" />
                                            Watch Now
                                          </a>
                                        </Button>
                                      </div>
                                    </div>
                                  )}

                                  <p className="text-xs text-muted-foreground mt-2">
                                    {new Date(notification.sentAt).toLocaleString()}
                                  </p>
                                </div>
                                <div className="flex flex-col gap-1">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => markAsRead(notification.id)}
                                      className="h-6 w-6 p-0"
                                    >
                                      <span className="sr-only">Mark as read</span>✓
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeNotification(notification.id)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )
                        })
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {unreadCount > 0 && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium text-primary">
                  You have {unreadCount} new message{unreadCount > 1 ? "s" : ""}
                </p>
                <p className="text-sm text-primary/80">
                  Your support team has sent you personalized recommendations and resources.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Good morning! 👋</h2>
          <p className="text-muted-foreground">Here's your mental wellness overview for today.</p>
        </div>

        {adminVideos.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5" />
                Latest Meditation Videos
              </CardTitle>
              <CardDescription>New videos added by your support team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adminVideos.slice(0, 6).map((video) => (
                  <div key={video.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{video.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{video.description}</p>
                        </div>
                        <Badge variant="outline" className="text-xs ml-2">
                          {video.duration}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {video.category}
                        </Badge>
                        <Button size="sm" variant="outline" asChild>
                          <a href={video.url} target="_blank" rel="noopener noreferrer">
                            <Play className="w-3 h-3 mr-1" />
                            Watch
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Mood Score</p>
                  <p className="text-2xl font-bold text-foreground">{wellnessData.moodScore}/10</p>
                </div>
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sleep Average</p>
                  <p className="text-2xl font-bold text-foreground">{wellnessData.sleepAverage}h</p>
                </div>
                <Moon className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Streak Days</p>
                  <p className="text-2xl font-bold text-foreground">{wellnessData.streakDays}</p>
                </div>
                <Target className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Progress</p>
                  <p className="text-2xl font-bold text-foreground">{wellnessData.weeklyProgress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mood Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Mood Tracking
                </CardTitle>
                <CardDescription>Your mood patterns over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentMoods.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getMoodIcon(entry.mood)}
                        <span className="font-medium">{entry.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Score:</span>
                        <Badge variant="secondary">{entry.score}/10</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" onClick={() => (window.location.href = "/tracking")}>
                  <Plus className="w-4 h-4 mr-2" />
                  Log Today's Mood
                </Button>
              </CardContent>
            </Card>

            {/* Goals Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Wellness Goals
                </CardTitle>
                <CardDescription>Your progress towards mental health goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Daily Mindfulness</span>
                      <span className="text-sm text-muted-foreground">12/15 days</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Sleep Schedule</span>
                      <span className="text-sm text-muted-foreground">8/10 days</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Exercise Routine</span>
                      <span className="text-sm text-muted-foreground">5/7 days</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingAppointments.map((appointment, index) => (
                    <div key={index} className="p-3 bg-muted/50 rounded-lg">
                      <div className="font-medium text-sm">{appointment.type}</div>
                      <div className="text-sm text-muted-foreground">{appointment.provider}</div>
                      <div className="text-sm text-primary font-medium">
                        {appointment.date} at {appointment.time}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-4 bg-transparent"
                  onClick={() => (window.location.href = "/book")}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule New
                </Button>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Personalized Recommendations
                </CardTitle>
                <CardDescription>AI-curated based on your patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {personalizedRecommendations.map((rec, index) => (
                    <div
                      key={index}
                      className="p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted/70 transition-colors"
                    >
                      <div className="font-medium text-sm">{rec.title}</div>
                      <div className="text-xs text-muted-foreground">{rec.description}</div>
                      <div className="flex items-center justify-between mt-2">
                        <Badge variant="outline" className="text-xs">
                          {rec.duration}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          Try Now
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/chat")}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Start AI Chat
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/resources")}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Browse Resources
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  onClick={() => (window.location.href = "/forum")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={() => alert("Crisis support activated")}
                >
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Crisis Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
