"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Search, Play, BookOpen, Headphones, Video, Heart, Brain, Moon } from "lucide-react"

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const videoResources = [
    {
      id: 1,
      title: "5-Minute Breathing Exercise for Anxiety",
      description: "Quick breathing technique to calm anxiety and stress",
      duration: "5 min",
      category: "Anxiety",
      thumbnail: "/peaceful-breathing-meditation.jpg",
      url: "https://www.youtube.com/watch?v=YRPh_GaiL8s",
    },
    {
      id: 2,
      title: "Sleep Meditation for Students",
      description: "Guided meditation to improve sleep quality",
      duration: "15 min",
      category: "Sleep",
      thumbnail: "/nighttime-sleep-meditation.jpg",
      url: "https://www.youtube.com/watch?v=aEqlQvczMJQ",
    },
    {
      id: 3,
      title: "Study Stress Relief Techniques",
      description: "Practical methods to manage academic pressure",
      duration: "8 min",
      category: "Stress",
      thumbnail: "/student-stress-relief.jpg",
      url: "https://www.youtube.com/watch?v=92i5m3tV5XY",
    },
  ]

  const audioResources = [
    {
      id: 1,
      title: "Progressive Muscle Relaxation",
      description: "Full-body relaxation technique",
      duration: "20 min",
      category: "Relaxation",
    },
    {
      id: 2,
      title: "Mindfulness for Beginners",
      description: "Introduction to mindfulness practice",
      duration: "12 min",
      category: "Mindfulness",
    },
  ]

  const articles = [
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
      description: "Evidence-based strategies for better sleep",
      readTime: "6 min read",
      category: "Sleep",
    },
    {
      id: 3,
      title: "Coping with Academic Pressure",
      description: "Practical tips for managing study stress",
      readTime: "10 min read",
      category: "Stress",
    },
  ]

  const categories = ["All", "Anxiety", "Depression", "Stress", "Sleep", "Mindfulness", "Relaxation", "Relationships"]

  // --- Filtering Logic ---
  const filterResources = (resources: any[]) => {
    return resources.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
      return matchesSearch && matchesCategory
    })
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
            <div>
              <h1 className="text-xl font-bold">Mental Health Resources</h1>
              <p className="text-sm text-muted-foreground">Evidence-based tools and content</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="mb-8">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" /> Videos
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Headphones className="w-4 h-4" /> Audio
            </TabsTrigger>
            <TabsTrigger value="articles" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Articles
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Brain className="w-4 h-4" /> Tools
            </TabsTrigger>
          </TabsList>

          {/* Videos */}
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterResources(videoResources).map((video) => (
                <Card key={video.id} className="group hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors rounded-t-lg flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-90 group-hover:opacity-100"
                        onClick={() => window.open(video.url, "_blank")}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Watch
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{video.category}</Badge>
                      <span className="text-xs text-muted-foreground">{video.duration}</span>
                    </div>
                    <CardTitle className="text-base">{video.title}</CardTitle>
                    <CardDescription className="text-sm">{video.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Audio */}
          <TabsContent value="audio" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterResources(audioResources).map((audio) => (
                <Card key={audio.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{audio.category}</Badge>
                      <span className="text-xs text-muted-foreground">{audio.duration}</span>
                    </div>
                    <CardTitle className="text-base">{audio.title}</CardTitle>
                    <CardDescription>{audio.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      <Headphones className="w-4 h-4 mr-2" />
                      Listen Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Articles */}
          <TabsContent value="articles" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filterResources(articles).map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-base">{article.title}</CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tools */}
          <TabsContent value="tools" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Heart className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Mood Tracker</CardTitle>
                  <CardDescription>Track your daily mood and identify patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" onClick={() => (window.location.href = "/tracking")}>
                    Open Tool
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Brain className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Anxiety Assessment</CardTitle>
                  <CardDescription>Quick self-assessment for anxiety levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Start Assessment</Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <Moon className="w-8 h-8 text-primary mb-2" />
                  <CardTitle>Sleep Quality Checker</CardTitle>
                  <CardDescription>Evaluate and improve your sleep habits</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Check Sleep</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
