"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  MessageCircle,
  Calendar,
  TrendingUp,
  TrendingDown,
  Heart,
  Moon,
  Zap,
  AlertTriangle,
  Play,
  BookOpen,
  Send,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const studentData = {
  id: "2",
  name: "Michael Chen",
  email: "m.chen@university.edu",
  joinDate: "September 15, 2024",
  lastActive: "1 day ago",
  currentMoodScore: 4.2,
  riskLevel: "medium",
  status: "concerning",
  totalSessions: 12,
  sessionsThisWeek: 1,
  averageMoodLast30Days: 5.1,
  moodTrend: "declining",
  interventionsNeeded: true,
}

const moodHistory = [
  { date: "Dec 1", mood: 6.2, energy: 5.8, stress: 4.1, sleep: 7.2 },
  { date: "Dec 2", mood: 5.9, energy: 5.5, stress: 4.8, sleep: 6.8 },
  { date: "Dec 3", mood: 4.8, energy: 4.2, stress: 6.2, sleep: 5.9 },
  { date: "Dec 4", mood: 4.2, energy: 3.8, stress: 7.1, sleep: 5.2 },
  { date: "Dec 5", mood: 4.0, energy: 3.5, stress: 7.5, sleep: 4.8 },
]

const recommendedVideos = [
  {
    title: "5-Minute Breathing Exercise for Anxiety",
    duration: "5:23",
    category: "Anxiety Relief",
    reason: "Based on recent mood patterns",
    url: "https://www.youtube.com/watch?v=YRPh_GaiL8s",
    thumbnail: "https://img.youtube.com/vi/YRPh_GaiL8s/mqdefault.jpg",
  },
  {
    title: "Sleep Meditation for Students",
    duration: "20:15",
    category: "Sleep",
    reason: "Low sleep scores detected",
    url: "https://www.youtube.com/watch?v=aEqlQvczMJQ",
    thumbnail: "https://img.youtube.com/vi/aEqlQvczMJQ/mqdefault.jpg",
  },
  {
    title: "10-Minute Morning Meditation",
    duration: "10:00",
    category: "Mindfulness",
    reason: "Daily wellness routine",
    url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    thumbnail: "https://img.youtube.com/vi/ZToicYcHIOU/mqdefault.jpg",
  },
  {
    title: "Stress Relief Meditation for Exams",
    duration: "15:30",
    category: "Stress Management",
    reason: "High stress levels detected",
    url: "https://www.youtube.com/watch?v=O-6f5wQXSu8",
    thumbnail: "https://img.youtube.com/vi/O-6f5wQXSu8/mqdefault.jpg",
  },
  {
    title: "Body Scan Meditation for Relaxation",
    duration: "12:45",
    category: "Relaxation",
    reason: "Tension and stress relief",
    url: "https://www.youtube.com/watch?v=15q-N-_kkrU",
    thumbnail: "https://img.youtube.com/vi/15q-N-_kkrU/mqdefault.jpg",
  },
  {
    title: "Mindfulness for Depression",
    duration: "18:20",
    category: "Depression Support",
    reason: "Low mood scores",
    url: "https://www.youtube.com/watch?v=nOJTbWC-ULc",
    thumbnail: "https://img.youtube.com/vi/nOJTbWC-ULc/mqdefault.jpg",
  },
]

export default function StudentProfile({ params }: { params: { id: string } }) {
  const [messageText, setMessageText] = useState("")
  const [messageType, setMessageType] = useState("support")
  const [isMessageSent, setIsMessageSent] = useState(false)
  const [selectedVideos, setSelectedVideos] = useState<string[]>([])

  const handleSendMessage = () => {
    console.log("[v0] Sending message to student:", {
      studentId: params.id,
      message: messageText,
      type: messageType,
      videos: selectedVideos,
    })

    const notification = {
      id: Date.now(),
      studentId: params.id,
      message: messageText,
      type: messageType,
      videos: selectedVideos,
      timestamp: new Date().toISOString(),
      read: false,
    }

    const existingNotifications = JSON.parse(localStorage.getItem("studentNotifications") || "[]")
    existingNotifications.push(notification)
    localStorage.setItem("studentNotifications", JSON.stringify(existingNotifications))

    setIsMessageSent(true)
    setMessageText("")
    setSelectedVideos([])

    setTimeout(() => setIsMessageSent(false), 3000)
  }

  const toggleVideoSelection = (videoUrl: string) => {
    setSelectedVideos((prev) =>
      prev.includes(videoUrl) ? prev.filter((url) => url !== videoUrl) : [...prev, videoUrl],
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback>
                  {studentData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-bold">{studentData.name}</h1>
                <p className="text-sm text-muted-foreground">{studentData.email}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Alert Banner for concerning students */}
        {studentData.interventionsNeeded && (
          <div className="mb-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-800">Student Needs Attention</p>
                <p className="text-sm text-orange-700">
                  Declining mood trend and reduced engagement. Consider reaching out or scheduling intervention.
                </p>
              </div>
              <div className="ml-auto flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Send Message to {studentData.name}</DialogTitle>
                      <DialogDescription>
                        Send a supportive message and recommended resources to the student.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="message-type">Message Type</Label>
                        <Select value={messageType} onValueChange={setMessageType}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="support">Support & Encouragement</SelectItem>
                            <SelectItem value="check-in">Wellness Check-in</SelectItem>
                            <SelectItem value="resources">Resource Recommendation</SelectItem>
                            <SelectItem value="urgent">Urgent Follow-up</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Type your supportive message here..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Check-in
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Success message for sent messages */}
        {isMessageSent && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Message Sent Successfully</p>
                <p className="text-sm text-green-700">
                  Your message has been delivered to {studentData.name}'s notifications.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Mood</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${
                  studentData.currentMoodScore >= 7
                    ? "text-green-600"
                    : studentData.currentMoodScore >= 5
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {studentData.currentMoodScore}/10
              </div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={`flex items-center ${
                    studentData.moodTrend === "declining" ? "text-red-600" : "text-green-600"
                  }`}
                >
                  {studentData.moodTrend === "declining" ? (
                    <TrendingDown className="w-3 h-3 mr-1" />
                  ) : (
                    <TrendingUp className="w-3 h-3 mr-1" />
                  )}
                  {studentData.moodTrend}
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sessions This Week</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.sessionsThisWeek}</div>
              <p className="text-xs text-muted-foreground">Total: {studentData.totalSessions} sessions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
              <AlertTriangle
                className={`h-4 w-4 ${
                  studentData.riskLevel === "high"
                    ? "text-red-500"
                    : studentData.riskLevel === "medium"
                      ? "text-orange-500"
                      : "text-green-500"
                }`}
              />
            </CardHeader>
            <CardContent>
              <Badge
                variant={
                  studentData.riskLevel === "high"
                    ? "destructive"
                    : studentData.riskLevel === "medium"
                      ? "secondary"
                      : "default"
                }
                className="text-sm"
              >
                {studentData.riskLevel.toUpperCase()}
              </Badge>
              <p className="text-xs text-muted-foreground mt-1">Last updated: {studentData.lastActive}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>30-Day Average</CardTitle>
              <CardDescription>Member since {studentData.joinDate}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.averageMoodLast30Days}/10</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mood-tracking">Mood Tracking</TabsTrigger>
            <TabsTrigger value="interventions">Interventions</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Student's platform engagement over the past week</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Completed mood check-in</p>
                        <p className="text-xs text-muted-foreground">Mood: 4.2/10, Energy: 3.8/10 - 1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Watched meditation video</p>
                        <p className="text-xs text-muted-foreground">"Anxiety Relief for Students" - 2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Used AI chat support</p>
                        <p className="text-xs text-muted-foreground">
                          15-minute session about exam stress - 3 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Wellness Summary</CardTitle>
                  <CardDescription>Current wellness metrics and trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span className="text-sm">Mood</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-2/5 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">4.2/10</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Energy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-2/5 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">3.8/10</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Stress</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-4/5 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">7.5/10</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Sleep</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-1/2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">4.8/10</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="mood-tracking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mood History (Last 5 Days)</CardTitle>
                <CardDescription>Detailed tracking of wellness metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodHistory.map((day, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium">{day.date}</h4>
                        <Badge variant={day.mood >= 6 ? "default" : day.mood >= 4 ? "secondary" : "destructive"}>
                          Overall: {day.mood}/10
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Mood</p>
                          <p className="font-medium">{day.mood}/10</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Energy</p>
                          <p className="font-medium">{day.energy}/10</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Stress</p>
                          <p className="font-medium">{day.stress}/10</p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-muted-foreground">Sleep</p>
                          <p className="font-medium">{day.sleep}/10</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interventions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Interventions</CardTitle>
                <CardDescription>AI-suggested actions based on student's current state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-orange-800">Priority: Schedule Check-in</h4>
                        <p className="text-sm text-orange-700 mt-1">
                          Student shows declining mood trend and reduced engagement. Recommend scheduling a counselor
                          check-in within 48 hours.
                        </p>
                        <Button size="sm" className="mt-3">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule Now
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <BookOpen className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-800">Recommend Resources</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Share targeted meditation videos and sleep hygiene resources based on current wellness scores.
                        </p>
                        <Button size="sm" variant="outline" className="mt-3 bg-transparent">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Resources
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Meditation Videos</CardTitle>
                <CardDescription>Real YouTube videos recommended based on current wellness state</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedVideos.map((video, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-24 h-16 bg-muted rounded overflow-hidden">
                          <img
                            src={video.thumbnail || "/placeholder.svg"}
                            alt={video.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <Play className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {video.duration} • {video.category}
                          </p>
                          <p className="text-xs text-blue-600 mt-1">{video.reason}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <a href={video.url} target="_blank" rel="noopener noreferrer">
                            <Play className="w-4 h-4 mr-2" />
                            Watch
                          </a>
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Send to Student
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                              <DialogTitle>Send Video Recommendation</DialogTitle>
                              <DialogDescription>
                                Send this meditation video to {studentData.name} with a personalized message.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="p-3 bg-muted rounded-lg">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={video.thumbnail || "/placeholder.svg"}
                                    alt={video.title}
                                    className="w-16 h-12 object-cover rounded"
                                  />
                                  <div>
                                    <p className="font-medium text-sm">{video.title}</p>
                                    <p className="text-xs text-muted-foreground">{video.duration}</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <Label htmlFor="video-message">Personal Message</Label>
                                <Textarea
                                  id="video-message"
                                  placeholder="Hi! I thought this meditation video might help you feel better..."
                                  value={messageText}
                                  onChange={(e) => setMessageText(e.target.value)}
                                  className="min-h-[80px]"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                onClick={() => {
                                  setSelectedVideos([video.url])
                                  handleSendMessage()
                                }}
                                disabled={!messageText.trim()}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Send Video
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
