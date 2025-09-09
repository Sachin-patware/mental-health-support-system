"use client"

import type React from "react"

import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart3,
  Users,
  MessageCircle,
  Calendar,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  Activity,
  Shield,
  Download,
  RefreshCw,
  Play,
  Plus,
  Send,
  Trash2,
  LogOut,
  Lock,
  Filter,
  User,
  Eye,
  MessageSquare,
  UserPlus, Headphones, Brain, Moon
} from "lucide-react"

interface MeditationVideo {
  id: string
  title: string
  url: string
  duration: string
  category: string
  description: string
  addedAt: string
}

interface AdminNotification {
  id: string
  studentId: string
  studentName: string
  message: string
  videoId?: string
  sentAt: string
  read: boolean
}

interface Student {
  id: string
  name: string
  email: string
  lastActive: string
  moodScore: number
  riskLevel: "low" | "medium" | "high"
  sessionsThisWeek: number
  status: string
  needsAttention: boolean
  wellnessScore: number
  currentMood: string
  recentActivities: string[]
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@university.edu",
    lastActive: "2 hours ago",
    moodScore: 6.5,
    riskLevel: "low",
    sessionsThisWeek: 3,
    status: "active",
    needsAttention: false,
    wellnessScore: 78,
    currentMood: "happy",
    recentActivities: ["Completed mindfulness exercise", "Attended group therapy session"],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@university.edu",
    lastActive: "1 day ago",
    moodScore: 4.2,
    riskLevel: "medium",
    sessionsThisWeek: 1,
    status: "concerning",
    needsAttention: true,
    wellnessScore: 55,
    currentMood: "stressed",
    recentActivities: ["Missed appointment with counselor", "Visited resource library"],
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    email: "emma.r@university.edu",
    lastActive: "30 minutes ago",
    moodScore: 7.8,
    riskLevel: "low",
    sessionsThisWeek: 5,
    status: "thriving",
    needsAttention: false,
    wellnessScore: 89,
    currentMood: "calm",
    recentActivities: ["Practiced meditation", "Engaged in peer support forum"],
  },
  {
    id: "4",
    name: "David Kim",
    email: "d.kim@university.edu",
    lastActive: "3 days ago",
    moodScore: 3.1,
    riskLevel: "high",
    sessionsThisWeek: 0,
    status: "at-risk",
    needsAttention: true,
    wellnessScore: 32,
    currentMood: "anxious",
    recentActivities: ["No recent activity", "Contacted crisis hotline"],
  },
]

  
const defaultVideos: MeditationVideo[] = [
  {
    id: "1",
    title: "10 Minute Meditation for Anxiety",
    url: "https://www.youtube.com/watch?v=inpok4MKVLM",
    duration: "10:00",
    category: "Anxiety",
    description: "A calming meditation to help reduce anxiety and stress",
    addedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "5 Minute Meditation for Beginners",
    url: "https://www.youtube.com/watch?v=6p_yaNFSYao",
    duration: "5:00",
    category: "Beginner",
    description: "Perfect introduction to meditation for new practitioners",
    addedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Guided Relaxation for Sleep",
    url: "https://www.youtube.com/watch?v=86m4RC_ADEY",
    duration: "15:00",
    category: "Sleep",
    description: "Deep relaxation meditation to help you fall asleep peacefully",
    addedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Mindfulness Meditation",
    url: "https://www.youtube.com/watch?v=ZToicYcHIOU",
    duration: "12:00",
    category: "Mindfulness",
    description: "Practice mindfulness and present moment awareness",
    addedAt: new Date().toISOString(),
  },
]

//  const [isAuthenticated, setIsAuthenticated] = useState(false);



  

 

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" })
  const [error, setError] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock admin credentials
    if (credentials.username === "admin" && credentials.password === "admin123") {
      localStorage.setItem("adminLoggedIn", "true")
      onLogin()
    } else {
      setError("Invalid credentials. Use admin/admin123")
    }
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Access the mental health admin dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                placeholder="Enter admin username"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                placeholder="Enter admin password"
                required
              />
            </div>
            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}
            <div className="text-xs text-muted-foreground bg-blue-50 p-2 rounded">
              Demo credentials: admin / admin123
            </div>
            <Button type="submit" className="w-full">
              Login to Dashboard
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [videos, setVideos] = useState<MeditationVideo[]>([])
  const [notifications, setNotifications] = useState<AdminNotification[]>([])
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false)
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false)
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
    duration: "",
    category: "",
    description: "",
  })
  const [newMessage, setNewMessage] = useState({
    studentId: "",
    message: "",
    videoId: "",
  })
    // Resource management
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    duration: "",
    category: "",
    url: "",
  });
  const [resources, setResources] = useState({
    videos: defaultVideos,
    audio: [
    {
      id: 1,
      title: "Progressive Muscle Relaxation",
      description: "Full-body relaxation technique to release tension",
      duration: "20 min",
      category: "Relaxation",
    },
    {
      id: 2,
      title: "Guided Morning Meditation",
      description: "Start your day with calm and focus",
      duration: "10 min",
      category: "Mindfulness",
    },
    {
      id: 3,
      title: "Deep Sleep Music",
      description: "Soothing sounds to help fall asleep faster",
      duration: "30 min",
      category: "Sleep",
    },
  ],

  articles: [
    {
      id: 1,
      title: "Understanding College Anxiety",
      description: "Comprehensive guide to managing anxiety in college",
      readTime: "8 min read",
      category: "Anxiety",
    },
    {
      id: 2,
      title: "Building Healthy Sleep Habits",
      description: "Evidence-based strategies for better sleep quality",
      readTime: "6 min read",
      category: "Sleep",
    },
    {
      id: 3,
      title: "Coping with Academic Pressure",
      description: "Practical tips for managing study stress effectively",
      readTime: "10 min read",
      category: "Stress",
    },
    {
      id: 4,
      title: "Mindfulness for Students",
      description: "How mindfulness practices can improve focus and well-being",
      readTime: "7 min read",
      category: "Mindfulness",
    },
  ],
  });

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn")
    if (adminLoggedIn === "true") {
      setIsAuthenticated(true)
    }

    const savedVideos = localStorage.getItem("adminVideos")
    const savedNotifications = localStorage.getItem("adminNotifications")

    if (savedVideos) {
      setVideos(JSON.parse(savedVideos))
    } else {
      setVideos(defaultVideos)
      localStorage.setItem("adminVideos", JSON.stringify(defaultVideos))
    }

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

 const handleDeleteResource = (type: keyof typeof resources, id: number | string) => {
    setResources(prev => ({
      ...prev,
      [type]: prev[type].filter(r => r.id !== id),
    }));
  };


  const handleAddResource = (type: keyof typeof resources) => {
    setResources((prev) => ({
      ...prev,
      [type]: [
        ...prev[type],
        { ...newResource, id: Date.now(), addedAt: new Date().toISOString() },
      ],
    }))
    setNewResource({ title: "", description: "", duration: "", category: "", url: "" })
    setIsAddDialogOpen(false)
  }



  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn")
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  const handleAddVideo = () => {
    if (!newVideo.title || !newVideo.url) return

    const video: MeditationVideo = {
      id: Date.now().toString(),
      ...newVideo,
      addedAt: new Date().toISOString(),
    }

    const updatedVideos = [...videos, video]
    setVideos(updatedVideos)
    localStorage.setItem("adminVideos", JSON.stringify(updatedVideos))

    setNewVideo({ title: "", url: "", duration: "", category: "", description: "" })
    setIsAddVideoOpen(false)
  }

  const handleDeleteVideo = (videoId: string) => {
    const updatedVideos = videos.filter((v) => v.id !== videoId)
    setVideos(updatedVideos)
    localStorage.setItem("adminVideos", JSON.stringify(updatedVideos))
  }

  const handleSendMessage = () => {
    if (!newMessage.studentId || !newMessage.message) return

    const student = mockStudents.find((s) => s.id === newMessage.studentId)
    if (!student) return

    const notification: AdminNotification = {
      id: Date.now().toString(),
      studentId: newMessage.studentId,
      studentName: student.name,
      message: newMessage.message,
      videoId: newMessage.videoId || undefined,
      sentAt: new Date().toISOString(),
      read: false,
    }

    const updatedNotifications = [...notifications, notification]
    setNotifications(updatedNotifications)
    localStorage.setItem("adminNotifications", JSON.stringify(updatedNotifications))

    const studentNotifications = JSON.parse(localStorage.getItem("studentNotifications") || "[]")
    studentNotifications.push(notification)
    localStorage.setItem("studentNotifications", JSON.stringify(studentNotifications))

    setNewMessage({ studentId: "", message: "", videoId: "" })
    setIsSendMessageOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Mental Health Analytics & Student Tracking</p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12.5%
                </span>
                from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students Needing Attention</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-orange-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2
                </span>
                from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meditation Videos</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{videos.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Available resources
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-blue-600 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  Total notifications
                </span>
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="meditation">Resources</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="peer-support">Peer Support</TabsTrigger>
            <TabsTrigger value="crisis">Crisis</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Student Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor individual student wellness and progress</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {mockStudents.map((student) => (
                <Card key={student.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-base">{student.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                        </div>
                      </div>
                      <Badge
                        variant={
                          student.riskLevel === "high"
                            ? "destructive"
                            : student.riskLevel === "medium"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {student.riskLevel} risk
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Current Mood</p>
                        <p className="font-medium capitalize">{student.currentMood}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Last Active</p>
                        <p className="font-medium">{student.lastActive}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Wellness Score</span>
                        <span className="font-medium">{student.wellnessScore}/100</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            student.wellnessScore >= 70
                              ? "bg-green-500"
                              : student.wellnessScore >= 40
                                ? "bg-yellow-500"
                                : "bg-red-500"
                          }`}
                          style={{ width: `${student.wellnessScore}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium">Recent Activity</p>
                      <div className="space-y-1">
                        {student.recentActivities.slice(0, 2).map((activity, index) => (
                          <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                            {activity}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex pt-2">
                     
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(`/admin/students/${student.id}`, "_blank")}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="peer-support" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Peer Support Management</h3>
                <p className="text-sm text-muted-foreground">Monitor forum activity and manage peer interactions</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Moderation Queue
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Volunteers
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Forum Activity
                  </CardTitle>
                  <CardDescription>Recent discussions and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-xl font-bold text-primary">47</div>
                      <p className="text-xs text-muted-foreground">Active Discussions</p>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-xl font-bold text-green-600">156</div>
                      <p className="text-xs text-muted-foreground">Daily Messages</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">Exam Stress Support Group</p>
                          <p className="text-xs text-muted-foreground">23 participants • 12 new messages</p>
                          <Badge variant="secondary" className="mt-1">
                            High Activity
                          </Badge>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">Anxiety Management Tips</p>
                          <p className="text-xs text-muted-foreground">18 participants • 8 new messages</p>
                          <Badge variant="outline" className="mt-1">
                            Moderate Activity
                          </Badge>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg border-yellow-200 bg-yellow-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-sm">Sleep Issues Discussion</p>
                          <p className="text-xs text-muted-foreground">15 participants • Flagged content</p>
                          <Badge variant="destructive" className="mt-1">
                            Needs Review
                          </Badge>
                        </div>
                        <Button size="sm" variant="ghost">
                          <AlertTriangle className="w-3 h-3 text-yellow-600" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Peer Volunteers
                  </CardTitle>
                  <CardDescription>Student volunteers providing peer support</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">12</div>
                      <p className="text-xs text-muted-foreground">Active Volunteers</p>
                    </div>
                    <div className="text-center p-3 bg-muted/20 rounded-lg">
                      <div className="text-xl font-bold text-green-600">4.8</div>
                      <p className="text-xs text-muted-foreground">Avg. Rating</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Sarah Chen</p>
                            <p className="text-xs text-muted-foreground">Psychology Major • 47 interactions</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">Online</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Marcus Johnson</p>
                            <p className="text-xs text-muted-foreground">Social Work • 32 interactions</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">Away</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Emma Rodriguez</p>
                            <p className="text-xs text-muted-foreground">Counseling • 28 interactions</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-muted-foreground">Online</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-transparent" variant="outline">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add New Volunteer
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Moderation Dashboard
                </CardTitle>
                <CardDescription>Content moderation and safety monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Pending Reviews</h4>
                      <Badge variant="destructive">3</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Posts flagged for review</p>
                    <Button size="sm" className="w-full mt-3 bg-transparent" variant="outline">
                      Review Queue
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Auto-Moderated</h4>
                      <Badge variant="secondary">12</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Content automatically filtered</p>
                    <Button size="sm" className="w-full mt-3 bg-transparent" variant="outline">
                      View Filtered
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">Safety Alerts</h4>
                      <Badge variant="outline">0</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Crisis-related content detected</p>
                    <Button size="sm" className="w-full mt-3 bg-transparent" variant="outline">
                      Alert History
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
<TabsContent value="meditation" className="space-y-6">
          <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Resources Manager</h1>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Add Resource</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>Fill details of video, audio, or article.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Title"
                  value={newResource.title}
                  onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                />
                <Textarea
                  placeholder="Description"
                  value={newResource.description}
                  onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                />
                <Input
                  placeholder="Duration (e.g. 10 min)"
                  value={newResource.duration}
                  onChange={(e) => setNewResource({ ...newResource, duration: e.target.value })}
                />
                <Input
                  placeholder="Category"
                  value={newResource.category}
                  onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                />
                <Input
                  placeholder="URL (YouTube, link etc.)"
                  value={newResource.url}
                  onChange={(e) => setNewResource({ ...newResource, url: e.target.value })}
                />
              </div>
              <DialogFooter>
                <Button onClick={() => handleAddResource("videos")}>Save Video</Button>
                <Button onClick={() => handleAddResource("audio")}>Save Audio</Button>
                <Button onClick={() => handleAddResource("articles")}>Save Article</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="videos">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="audio">Audio</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>

          {/* Videos Section */}
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.videos.map((video) => (
                <Card key={video.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between">
                      <Badge>{video.category}</Badge>
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                    </div>
                    <CardTitle>{video.title}</CardTitle>
                    <CardDescription>{video.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-between">
                    <Button size="sm" variant="outline" onClick={() => window.open(video.url, "_blank")}>
                      <Play className="w-3 h-3 mr-1" /> Watch
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDeleteResource("videos", video.id)} className="text-red-600">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Audio Section */}
          <TabsContent value="audio" className="mt-6">
            {resources.audio.map((audio) => (
              <Card key={audio.id}>
                <CardHeader>
                  <CardTitle>{audio.title}</CardTitle>
                  <CardDescription>{audio.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <Button size="sm"><Headphones className="w-3 h-3 mr-1" /> Listen</Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteResource("audio", audio.id)} className="text-red-600">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Articles Section */}
          <TabsContent value="articles" className="mt-6">
            {resources.articles.map((article) => (
              <Card key={article.id}>
                <CardHeader>
                  <CardTitle>{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                  <Button size="sm"><BookOpen className="w-3 h-3 mr-1" /> Read</Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteResource("articles", article.id)} className="text-red-600">
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
</TabsContent>

          <TabsContent value="messages" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Student Messages</h3>
                <p className="text-sm text-muted-foreground">Send notifications and recommendations to students</p>
              </div>
              <Dialog open={isSendMessageOpen} onOpenChange={setIsSendMessageOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Send Message to Student</DialogTitle>
                    <DialogDescription>
                      Send a personalized message or video recommendation to a student.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="student" className="text-right">
                        Student
                      </Label>
                      <Select
                        value={newMessage.studentId}
                        onValueChange={(value) => setNewMessage({ ...newMessage, studentId: value })}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select student" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockStudents.map((student) => (
                            <SelectItem key={student.id} value={student.id}>
                              {student.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="message" className="text-right">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        value={newMessage.message}
                        onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                        className="col-span-3"
                        placeholder="Your message to the student..."
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="video" className="text-right">
                        Video (Optional)
                      </Label>
                      <Select
                        value={newMessage.videoId || "none"}
                        onValueChange={(value) =>
                          setNewMessage({ ...newMessage, videoId: value === "none" ? "" : value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Recommend a video" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">No video</SelectItem>
                          {videos.map((video) => (
                            <SelectItem key={video.id} value={video.id}>
                              {video.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleSendMessage}>Send Message</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                  <CardDescription>Messages sent to students</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">No messages sent yet</p>
                    ) : (
                      notifications
                        .slice()
                        .reverse()
                        .map((notification) => (
                          <div key={notification.id} className="p-3 border rounded-lg">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-medium text-sm">{notification.studentName}</p>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                {notification.videoId && (
                                  <Badge variant="secondary" className="mt-2">
                                    Video recommended
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(notification.sentAt).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common messages and recommendations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        setNewMessage({
                          studentId: "",
                          message:
                            "I noticed you might be feeling stressed. Here's a helpful meditation video that might help you relax.",
                          videoId: videos.find((v) => v.category === "Stress")?.id || "",
                        })
                        setIsSendMessageOpen(true)
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Stress Relief Recommendation
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        setNewMessage({
                          studentId: "",
                          message: "Having trouble sleeping? This guided relaxation might help you get better rest.",
                          videoId: videos.find((v) => v.category === "Sleep")?.id || "",
                        })
                        setIsSendMessageOpen(true)
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Sleep Support
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start bg-transparent"
                      onClick={() => {
                        setNewMessage({
                          studentId: "",
                          message: "You're doing great! Keep up the good work with your wellness journey.",
                          videoId: "",
                        })
                        setIsSendMessageOpen(true)
                      }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Encouragement Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Usage Trends */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Platform Usage Trends
                  </CardTitle>
                  <CardDescription>Daily active users over the past 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Chart visualization would appear here</p>
                      <p className="text-xs text-muted-foreground mt-1">Showing steady growth in user engagement</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Service Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Usage Distribution</CardTitle>
                  <CardDescription>How students are using different features</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-primary" />
                        <span className="text-sm">AI Chat Support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-3/4 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">75%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Resource Library</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-3/5 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Appointment Booking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-2/5 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Peer Support Forum</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-1/3 h-2 bg-purple-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activity</CardTitle>
                <CardDescription>Latest platform events and milestones</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New counselor onboarded</p>
                      <p className="text-xs text-muted-foreground">
                        Dr. Sarah Johnson joined the platform - 2 hours ago
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Resource library updated</p>
                      <p className="text-xs text-muted-foreground">Added 5 new mindfulness videos - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">System maintenance completed</p>
                      <p className="text-xs text-muted-foreground">Platform performance optimized - 1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Engagement Tab */}
          <TabsContent value="engagement" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement Metrics</CardTitle>
                  <CardDescription>How actively students are using the platform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary">8.5</div>
                      <p className="text-xs text-muted-foreground">Avg. Session Duration (min)</p>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">92%</div>
                      <p className="text-xs text-muted-foreground">User Satisfaction</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">3.2</div>
                      <p className="text-xs text-muted-foreground">Avg. Weekly Sessions</p>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">78%</div>
                      <p className="text-xs text-muted-foreground">Return Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Peak Usage Times</CardTitle>
                  <CardDescription>When students are most active on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Evening (6-10 PM)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-full h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">100%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Late Night (10 PM-2 AM)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-4/5 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">80%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Afternoon (12-6 PM)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-3/5 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Morning (6 AM-12 PM)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-muted rounded-full">
                          <div className="w-2/5 h-2 bg-primary rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">40%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Most Popular Resources</CardTitle>
                  <CardDescription>Content that resonates most with students</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Anxiety Management Techniques</p>
                        <p className="text-xs text-muted-foreground">Video • 12 min</p>
                      </div>
                      <Badge variant="secondary">1,234 views</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Sleep Hygiene Guide</p>
                        <p className="text-xs text-muted-foreground">Article • 8 min read</p>
                      </div>
                      <Badge variant="secondary">987 views</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                      <div>
                        <p className="text-sm font-medium">Mindfulness Meditation</p>
                        <p className="text-xs text-muted-foreground">Audio • 15 min</p>
                      </div>
                      <Badge variant="secondary">856 views</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Resource Categories</CardTitle>
                  <CardDescription>Distribution of content consumption</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Anxiety & Stress</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-4/5 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Depression Support</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-3/5 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sleep & Wellness</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-muted rounded-full">
                          <div className="w-1/2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Crisis Tab */}
          <TabsContent value="crisis" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-destructive/20">
                <CardHeader>
                  <CardTitle className="text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Crisis Intervention Stats
                  </CardTitle>
                  <CardDescription>Emergency support and intervention metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                      <div className="text-2xl font-bold text-destructive">23</div>
                      <p className="text-xs text-muted-foreground">Crisis Interventions</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-600">100%</div>
                      <p className="text-xs text-muted-foreground">Response Rate</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-primary">2.3</div>
                      <p className="text-xs text-muted-foreground">Avg. Response Time (min)</p>
                    </div>
                    <div className="text-center p-4 bg-muted/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">18</div>
                      <p className="text-xs text-muted-foreground">Successful Referrals</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Safety Measures
                  </CardTitle>
                  <CardDescription>Platform safety and monitoring status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">24/7 Crisis Monitoring</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">AI Risk Detection</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium">Emergency Protocols</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Ready
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
