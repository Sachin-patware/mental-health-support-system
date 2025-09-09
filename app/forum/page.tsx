"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MessageCircle, Users, Plus, Heart, Reply, Shield, Clock } from "lucide-react"

export default function ForumPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Topics", count: 156 },
    { id: "anxiety", name: "Anxiety Support", count: 42 },
    { id: "depression", name: "Depression", count: 38 },
    { id: "academic", name: "Academic Stress", count: 35 },
    { id: "relationships", name: "Relationships", count: 28 },
    { id: "sleep", name: "Sleep Issues", count: 13 },
  ]

  const discussions = [
    {
      id: 1,
      title: "Dealing with exam anxiety - tips that actually work",
      author: "StudentHelper23",
      category: "anxiety",
      replies: 24,
      likes: 18,
      timeAgo: "2 hours ago",
      isModerated: true,
      preview:
        "I've been struggling with severe exam anxiety and wanted to share some techniques that have really helped me...",
    },
    {
      id: 2,
      title: "First year feeling overwhelmed - is this normal?",
      author: "Freshman2024",
      category: "academic",
      replies: 31,
      likes: 45,
      timeAgo: "4 hours ago",
      isModerated: true,
      preview:
        "Starting college has been harder than I expected. The workload feels impossible and I'm questioning if I belong here...",
    },
    {
      id: 3,
      title: "Sleep schedule completely messed up",
      author: "NightOwl",
      category: "sleep",
      replies: 12,
      likes: 8,
      timeAgo: "6 hours ago",
      isModerated: false,
      preview:
        "Can't fall asleep before 3 AM and then can't wake up for morning classes. Any advice on fixing this cycle?",
    },
    {
      id: 4,
      title: "Celebrating small wins - got out of bed today!",
      author: "ProgressMaker",
      category: "depression",
      replies: 67,
      likes: 89,
      timeAgo: "1 day ago",
      isModerated: true,
      preview:
        "I know it sounds small, but after a week of barely leaving my room, I managed to get up, shower, and go to class today...",
    },
  ]

  const supportGroups = [
    {
      id: 1,
      name: "Anxiety Support Circle",
      members: 234,
      description: "Safe space for sharing anxiety management strategies",
      nextMeeting: "Tomorrow 7 PM",
    },
    {
      id: 2,
      name: "Academic Success Group",
      members: 189,
      description: "Study tips and academic stress management",
      nextMeeting: "Friday 6 PM",
    },
    {
      id: 3,
      name: "Mindfulness & Meditation",
      members: 156,
      description: "Daily mindfulness practice and meditation",
      nextMeeting: "Daily 8 AM",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-bold">Peer Support Forum</h1>
                <p className="text-sm text-muted-foreground">Connect with fellow students</p>
              </div>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Community Guidelines */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs space-y-2">
                <p>• Be respectful and supportive</p>
                <p>• No medical advice - seek professionals</p>
                <p>• Maintain anonymity and privacy</p>
                <p>• Report concerning content</p>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                      selectedCategory === category.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="discussions" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger value="groups" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Support Groups
                </TabsTrigger>
              </TabsList>

              <TabsContent value="discussions" className="mt-6 space-y-4">
                {discussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-xs">
                              {categories.find((c) => c.id === discussion.category)?.name}
                            </Badge>
                            {discussion.isModerated && (
                              <Badge variant="secondary" className="text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Moderated
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-base mb-1">{discussion.title}</CardTitle>
                          <CardDescription className="text-sm line-clamp-2">{discussion.preview}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Avatar className="w-5 h-5">
                              <AvatarFallback className="text-xs">{discussion.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{discussion.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{discussion.timeAgo}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Reply className="w-3 h-3" />
                            <span>{discussion.replies}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{discussion.likes}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="groups" className="mt-6 space-y-4">
                {supportGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{group.name}</CardTitle>
                          <CardDescription className="mt-1">{group.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {group.members}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">Next meeting: {group.nextMeeting}</div>
                        <Button size="sm">Join Group</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
