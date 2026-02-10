"use client"

import {
  Smartphone, Clock, Star, HardDrive, ChevronRight, Moon, Bell,
  Shield, HelpCircle, Sun, Eye, MapPin, Trash2, Download,
  MessageCircle, FileText, Mail, ArrowLeft, Send, Headphones,
  Lock, Database, AlertTriangle, CheckCircle2, ChevronDown, ChevronUp,
  LogOut
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useState, useEffect, useRef } from "react"
import type { TrackedApp } from "@/lib/app-data"

interface ProfileViewProps {
  apps: TrackedApp[]
  notificationsEnabled: boolean
  onToggleNotifications: () => void
  user?: { name: string; email: string } | null
  onLogout?: () => void
}

type Screen = "profile" | "privacy" | "help" | "faq" | "terms" | "privacy-policy" | "chat" | "export-data" | "delete-data"

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "bot" | "human" | "system"
  time: string
}

function ScreenHeader({ title, onBack }: { title: string; onBack: () => void }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-card sticky top-0 z-10">
      <button
        type="button"
        onClick={onBack}
        className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary/80 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft className="h-5 w-5 text-foreground" />
      </button>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
    </div>
  )
}

function FAQScreen({ onBack }: { onBack: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "How does AppTrack monitor my app usage?",
      answer: "AppTrack uses system-level APIs to track which apps you open and how long you use them. All data is stored locally on your device and is never sent to external servers."
    },
    {
      question: "Can I set daily usage limits for specific apps?",
      answer: "Yes! Go to any app's detail page and tap 'Set Usage Limit'. You can configure daily time limits and receive notifications when you're approaching your limit."
    },
    {
      question: "How do I export my tracking data?",
      answer: "Navigate to Profile > Privacy > Export My Data. You can download your complete tracking history as a CSV or JSON file."
    },
    {
      question: "Is my data synced across devices?",
      answer: "Currently, AppTrack stores data locally on each device. Cross-device sync is planned for a future update."
    },
    {
      question: "How do I delete my account and data?",
      answer: "Go to Profile > Privacy > Delete All Data. This will permanently remove all your tracking history and settings. This action cannot be undone."
    },
    {
      question: "Why is my screen time different from what my phone shows?",
      answer: "AppTrack and your phone's built-in screen time may use slightly different tracking methods. Small differences are normal. AppTrack focuses specifically on the apps you've chosen to track."
    },
  ]

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
      <ScreenHeader title="FAQ" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 pt-4">
          <p className="text-xs text-muted-foreground mb-4">Frequently Asked Questions</p>
          <div className="flex flex-col gap-2">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-card border border-border rounded-xl overflow-hidden">
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-4 py-3.5 text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-sm font-medium text-foreground pr-3">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-3.5 pt-0">
                    <Separator className="bg-border mb-3" />
                    <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function TermsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
      <ScreenHeader title="Terms of Service" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 pt-4 flex flex-col gap-5">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Last updated: January 15, 2025</p>
          </div>
          {[
            { title: "1. Acceptance of Terms", body: "By downloading, installing, or using AppTrack, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application." },
            { title: "2. Use of Service", body: "AppTrack is designed to help you monitor and manage your mobile app usage. You agree to use AppTrack only for its intended purpose and in compliance with all applicable laws and regulations." },
            { title: "3. User Data", body: "All tracking data is stored locally on your device. AppTrack does not collect, transmit, or store your personal data on external servers. You are responsible for backing up your own data." },
            { title: "4. Privacy", body: "Your privacy is important to us. Please review our Privacy Policy for details on how we handle information. Anonymous usage analytics may be collected to improve the app experience, and you can opt out at any time." },
            { title: "5. Intellectual Property", body: "AppTrack and its original content, features, and functionality are owned by AppTrack and are protected by international copyright, trademark, and other intellectual property laws." },
            { title: "6. Limitation of Liability", body: "AppTrack shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service. Screen time data is provided as estimates and may vary from system-level reporting." },
            { title: "7. Changes to Terms", body: "We reserve the right to modify these terms at any time. Continued use of AppTrack after changes constitutes acceptance of the new terms. We will notify users of significant changes through in-app notifications." },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">{section.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PrivacyPolicyScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
      <ScreenHeader title="Privacy Policy" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 pt-4 flex flex-col gap-5">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Effective: January 15, 2025</p>
          </div>
          {[
            { title: "Data We Collect", body: "AppTrack collects app usage data including open/close times, session duration, and app categories. All data is processed and stored locally on your device. No personal data is transmitted to our servers." },
            { title: "How We Use Data", body: "Your usage data is used exclusively to provide insights, generate statistics, and help you manage your screen time. We do not sell, share, or monetize your personal data in any way." },
            { title: "Local Storage", body: "All tracking data is stored in your device's local storage. When you uninstall AppTrack, all associated data is permanently deleted from your device." },
            { title: "Anonymous Analytics", body: "If you opt in, we may collect anonymous, aggregated analytics to improve AppTrack. This data cannot be used to identify you and includes only general usage patterns." },
            { title: "Third-Party Services", body: "AppTrack does not integrate with third-party advertising or analytics services. We do not share your data with any external parties." },
            { title: "Your Rights", body: "You can export all your data at any time from Privacy settings. You can delete all data permanently. You can opt out of anonymous analytics at any time." },
            { title: "Contact Us", body: "If you have questions about this privacy policy, please reach out to us at privacy@apptrack.app or through the in-app Chat with Support feature." },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">{section.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ExportDataScreen({ onBack }: { onBack: () => void }) {
  const [exporting, setExporting] = useState(false)
  const [exported, setExported] = useState(false)

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => {
      setExporting(false)
      setExported(true)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
      <ScreenHeader title="Export My Data" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 pt-6 flex flex-col items-center gap-5">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Download className="h-8 w-8 text-primary" />
          </div>
          <div className="text-center">
            <h3 className="text-base font-semibold text-foreground mb-1">Export Your Data</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Download a complete copy of your tracking data including app usage history, screen time stats, and preferences.
            </p>
          </div>

          <div className="w-full bg-card border border-border rounded-xl p-4 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Database className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Usage History</p>
                <p className="text-[10px] text-muted-foreground">App sessions, durations, timestamps</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center gap-3">
              <Database className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Statistics</p>
                <p className="text-[10px] text-muted-foreground">Daily, weekly, monthly reports</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
            <Separator className="bg-border" />
            <div className="flex items-center gap-3">
              <Database className="h-4 w-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-foreground">Preferences</p>
                <p className="text-[10px] text-muted-foreground">Settings, categories, wishlists</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-primary" />
            </div>
          </div>

          {exported ? (
            <div className="w-full bg-primary/10 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Export Complete</p>
                <p className="text-xs text-muted-foreground">Your data has been saved to your device.</p>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleExport}
              disabled={exporting}
              className="w-full bg-primary text-primary-foreground rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {exporting ? "Exporting..." : "Export as JSON"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function DeleteDataScreen({ onBack }: { onBack: () => void }) {
  const [confirmed, setConfirmed] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [deleted, setDeleted] = useState(false)

  const handleDelete = () => {
    if (!confirmed) return
    setDeleting(true)
    setTimeout(() => {
      setDeleting(false)
      setDeleted(true)
    }, 2000)
  }

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
      <ScreenHeader title="Delete All Data" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 pt-6 flex flex-col items-center gap-5">
          <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <div className="text-center">
            <h3 className="text-base font-semibold text-foreground mb-1">Delete All Data</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              This will permanently delete all your tracking data, usage history, and app settings. This action cannot be undone.
            </p>
          </div>

          <div className="w-full bg-destructive/5 border border-destructive/20 rounded-xl p-4 flex flex-col gap-2">
            <p className="text-xs font-medium text-destructive">The following will be deleted:</p>
            <ul className="flex flex-col gap-1.5 ml-2">
              <li className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-destructive shrink-0" />
                All app usage history
              </li>
              <li className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-destructive shrink-0" />
                Screen time statistics and reports
              </li>
              <li className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-destructive shrink-0" />
                Wishlist and tracked apps
              </li>
              <li className="text-xs text-muted-foreground flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-destructive shrink-0" />
                All preferences and settings
              </li>
            </ul>
          </div>

          {deleted ? (
            <div className="w-full bg-primary/10 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Data Deleted</p>
                <p className="text-xs text-muted-foreground">All your data has been permanently removed.</p>
              </div>
            </div>
          ) : (
            <>
              <label className="w-full flex items-center gap-3 cursor-pointer">
                <div
                  className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors ${
                    confirmed ? "bg-destructive border-destructive" : "border-muted-foreground"
                  }`}
                  onClick={() => setConfirmed(!confirmed)}
                  role="checkbox"
                  aria-checked={confirmed}
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setConfirmed(!confirmed) }}
                >
                  {confirmed && <CheckCircle2 className="h-3 w-3 text-destructive-foreground" />}
                </div>
                <span className="text-xs text-muted-foreground">
                  I understand this action is permanent and cannot be undone
                </span>
              </label>

              <button
                type="button"
                onClick={handleDelete}
                disabled={!confirmed || deleting}
                className="w-full bg-destructive text-destructive-foreground rounded-xl py-3 text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                {deleting ? "Deleting..." : "Delete All Data"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function ChatScreen({ onBack }: { onBack: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatPhase, setChatPhase] = useState<"topic-select" | "bot-helping" | "connecting-human" | "human-connected">("topic-select")
  const [botAttempts, setBotAttempts] = useState(0)
  const [selectedTopic, setSelectedTopic] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // initial bot greeting
  useEffect(() => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setMessages([
      {
        id: "welcome-1",
        text: "Hi there! I'm AppTrack's support assistant. I'll do my best to help you.",
        sender: "bot",
        time: now,
      },
      {
        id: "welcome-2",
        text: "Please select a topic below, or type your question directly.",
        sender: "bot",
        time: now,
      },
    ])
  }, [])

  const topics = [
    { label: "App Tracking Issues", icon: "tracking" },
    { label: "Screen Time Reports", icon: "screen" },
    { label: "Data Export / Delete", icon: "data" },
    { label: "Account & Settings", icon: "account" },
    { label: "Bug Report", icon: "bug" },
    { label: "Something Else", icon: "other" },
  ]

  const botKnowledgeBase: Record<string, string[]> = {
    tracking: [
      "AppTrack uses system-level APIs to monitor which apps you open and for how long. Here are some things to check:\n\n1. Make sure AppTrack has Usage Access permission enabled in your device settings.\n2. Go to Settings > Apps > AppTrack > Permissions.\n3. Restart the app after granting permissions.",
      "If tracking still isn't working, try these steps:\n\n1. Clear the app cache (Settings > Apps > AppTrack > Clear Cache)\n2. Make sure battery optimization is disabled for AppTrack\n3. Restart your device\n\nDid this resolve your issue?",
    ],
    screen: [
      "Screen time reports are generated based on your tracked app usage. Here's what you should know:\n\n1. Reports update every hour automatically\n2. You can view daily, weekly, and monthly breakdowns\n3. Small differences from your phone's built-in screen time are normal\n\nIs there a specific report issue you're seeing?",
      "If your reports seem inaccurate:\n\n1. Check that all apps you want tracked are added to your tracking list\n2. Ensure background tracking is enabled in Privacy settings\n3. Data may take up to 24 hours to fully sync\n\nDoes this help with your concern?",
    ],
    data: [
      "For data export and deletion, here's what you need to know:\n\n- Export: Go to Profile > Privacy > Export My Data. You can download everything as JSON.\n- Delete: Go to Profile > Privacy > Delete All Data. This is permanent and cannot be undone.\n\nWhich one are you trying to do?",
      "A few more details:\n\n- Exported files are saved to your device's Downloads folder\n- Export includes all usage history, stats, and preferences\n- Deletion removes everything permanently with no recovery option\n\nWould you like me to walk you through either process step by step?",
    ],
    account: [
      "Here are common account and settings actions:\n\n1. Change theme: Profile > Dark Mode toggle\n2. Notifications: Profile > Notifications toggle\n3. Privacy controls: Profile > Privacy\n4. All data is stored locally on your device\n\nWhat specific setting are you looking for?",
      "Some additional settings info:\n\n- Your profile data is stored on-device only\n- Uninstalling the app will remove all data\n- There's no cloud sync currently (coming in a future update)\n\nIs there anything specific about settings I can help with?",
    ],
    bug: [
      "I'm sorry you're experiencing a bug. To help me understand better, could you describe:\n\n1. What were you doing when the issue occurred?\n2. Did you see any error messages?\n3. Does the issue happen every time?\n\nPlease share the details and I'll try to help.",
      "Thanks for the details. Here are some general troubleshooting steps:\n\n1. Force close and reopen AppTrack\n2. Clear the app cache\n3. Make sure you're on the latest version\n4. Restart your device\n\nIf the issue persists after these steps, I'd recommend connecting you with our support team for a deeper investigation.",
    ],
    other: [
      "I'd be happy to help with your question! Could you give me a bit more detail about what you need assistance with? The more specific you are, the better I can help.",
      "Thanks for explaining. Let me see if I can point you in the right direction. If my suggestions don't quite match what you need, I can always connect you with a human support agent who can assist further.",
    ],
    default: [
      "Thanks for your message. Let me try to help with that.\n\nHere are some quick tips:\n- For tracking issues, check app permissions\n- For reports, make sure all apps are being tracked\n- For data, visit Profile > Privacy\n\nCould you tell me more about what you need?",
      "I appreciate your patience. Based on what you've described, here are a few more things to try:\n\n1. Restart the app\n2. Check for app updates\n3. Review your permissions in device settings\n\nIf none of this helps, I can connect you with a human support agent.",
    ],
  }

  const getTopicKey = (topic: string): string => {
    if (topic.toLowerCase().includes("tracking")) return "tracking"
    if (topic.toLowerCase().includes("screen")) return "screen"
    if (topic.toLowerCase().includes("data") || topic.toLowerCase().includes("export") || topic.toLowerCase().includes("delete")) return "data"
    if (topic.toLowerCase().includes("account") || topic.toLowerCase().includes("setting")) return "account"
    if (topic.toLowerCase().includes("bug") || topic.toLowerCase().includes("error") || topic.toLowerCase().includes("crash")) return "bug"
    if (topic.toLowerCase().includes("something") || topic.toLowerCase().includes("other")) return "other"
    return "default"
  }

  const addBotMessage = (text: string, delay: number = 1200) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          text,
          sender: "bot",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }, delay)
  }

  const addSystemMessage = (text: string, delay: number = 500) => {
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `system-${Date.now()}`,
          text,
          sender: "system",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ])
    }, delay)
  }

  const handleTopicSelect = (topic: string) => {
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    setSelectedTopic(topic)
    setChatPhase("bot-helping")
    setBotAttempts(0)

    setMessages((prev) => [
      ...prev,
      { id: `user-topic-${Date.now()}`, text: topic, sender: "user", time: now },
    ])

    const key = getTopicKey(topic)
    const responses = botKnowledgeBase[key] || botKnowledgeBase.default
    addBotMessage(responses[0], 1500)
  }

  const handleConnectHuman = () => {
    setChatPhase("connecting-human")
    addSystemMessage("Connecting you to a support agent...")

    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setChatPhase("human-connected")
      const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      setMessages((prev) => [
        ...prev,
        {
          id: `system-connected-${Date.now()}`,
          text: "You are now connected with a support agent.",
          sender: "system",
          time: now,
        },
        {
          id: `human-greet-${Date.now()}`,
          text: `Hi there! I'm Priya from the AppTrack support team. I can see you were asking about "${selectedTopic}". Let me take a closer look and help you out. Could you share any additional details?`,
          sender: "human",
          time: now,
        },
      ])
    }, 3000)
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      text: input.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages((prev) => [...prev, userMsg])
    const userText = input.trim()
    setInput("")

    if (chatPhase === "topic-select") {
      setSelectedTopic(userText)
      setChatPhase("bot-helping")
      setBotAttempts(0)
      const key = getTopicKey(userText)
      const responses = botKnowledgeBase[key] || botKnowledgeBase.default
      addBotMessage(responses[0], 1500)
      return
    }

    if (chatPhase === "human-connected") {
      // simulate human agent reply
      const humanReplies = [
        "Thank you for sharing that. Let me check our system logs for your account. One moment please...",
        "I've looked into this. It seems like this can be resolved by updating to the latest version of AppTrack. Could you try that and let me know?",
        "Great question! I've noted this down and will escalate it to our development team. You should see a fix in the next update. Is there anything else I can help with?",
        "I completely understand your concern. Rest assured, your data is fully secure and stored locally on your device. We take privacy very seriously.",
        "Is there anything else I can help you with today? I'm happy to assist with any other questions.",
      ]
      const randomReply = humanReplies[Math.floor(Math.random() * humanReplies.length)]
      addBotMessage(randomReply, 2000)
      // override sender to human
      setTimeout(() => {
        setMessages((prev) => {
          const last = prev[prev.length - 1]
          if (last && last.sender === "bot") {
            return [...prev.slice(0, -1), { ...last, sender: "human" as const }]
          }
          return prev
        })
      }, 2100)
      return
    }

    // bot-helping phase
    const newAttempts = botAttempts + 1
    setBotAttempts(newAttempts)

    const key = getTopicKey(selectedTopic || userText)
    const responses = botKnowledgeBase[key] || botKnowledgeBase.default

    if (newAttempts < responses.length) {
      addBotMessage(responses[newAttempts], 1500)
    } else {
      // bot exhausted, offer human
      addBotMessage(
        "It looks like I wasn't able to fully resolve your issue. Would you like me to connect you with a human support agent? They can provide more in-depth assistance.",
        1500
      )
    }
  }

  const senderLabel = (sender: string) => {
    if (sender === "bot") return "Bot"
    if (sender === "human") return "Priya"
    if (sender === "system") return ""
    return ""
  }

  const showConnectButton = chatPhase === "bot-helping" && botAttempts >= 1

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border bg-card shrink-0">
        <button
          type="button"
          onClick={onBack}
          className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary/80 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
          {chatPhase === "human-connected" ? (
            <Headphones className="h-4 w-4 text-primary" />
          ) : (
            <MessageCircle className="h-4 w-4 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-semibold text-foreground">
            {chatPhase === "human-connected" ? "Priya - Support Agent" : "AppTrack Assistant"}
          </h2>
          <div className="flex items-center gap-1.5">
            <span className={`h-2 w-2 rounded-full ${chatPhase === "connecting-human" ? "bg-amber-500 animate-pulse" : "bg-green-500"}`} />
            <span className="text-[10px] text-muted-foreground">
              {chatPhase === "connecting-human" ? "Connecting..." : "Online"}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
        {messages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <div key={msg.id} className="flex justify-center my-2">
                <span className="text-[10px] text-muted-foreground bg-secondary/60 rounded-full px-3 py-1">
                  {msg.text}
                </span>
              </div>
            )
          }

          const isUser = msg.sender === "user"
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
            >
              {!isUser && (
                <div className="flex items-center gap-1.5 mb-1 px-1">
                  <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[8px] font-bold ${
                    msg.sender === "human"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}>
                    {msg.sender === "human" ? "P" : "A"}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {senderLabel(msg.sender)}
                  </span>
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                  isUser
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : msg.sender === "human"
                    ? "bg-primary/10 border border-primary/20 text-foreground rounded-bl-md"
                    : "bg-card border border-border text-foreground rounded-bl-md"
                }`}
              >
                <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
              </div>
              <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
            </div>
          )
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex flex-col items-start">
            <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Topic selection chips */}
        {chatPhase === "topic-select" && (
          <div className="flex flex-col items-start gap-2 mt-1">
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => handleTopicSelect(topic.label)}
                  className="bg-card border border-border text-foreground text-xs font-medium rounded-full px-3.5 py-2 hover:bg-secondary/80 hover:border-primary/30 transition-colors"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Connect to human button */}
        {showConnectButton && chatPhase === "bot-helping" && (
          <div className="flex justify-center mt-2">
            <button
              type="button"
              onClick={handleConnectHuman}
              className="flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 hover:bg-primary/15 transition-colors"
            >
              <Headphones className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">Connect with human agent</span>
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-card shrink-0">
        {chatPhase === "connecting-human" ? (
          <div className="flex items-center justify-center gap-2 py-2">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Finding an available agent...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) handleSend() }}
              placeholder={chatPhase === "human-connected" ? "Message Priya..." : "Type your question..."}
              className="flex-1 bg-secondary/50 text-foreground text-sm rounded-full px-4 py-2.5 outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="button"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="h-10 w-10 rounded-full bg-primary flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function PrivacyScreen({ onBack, onNavigate }: { onBack: () => void; onNavigate: (screen: Screen) => void }) {
  const privacyItems = [
    { icon: Eye, label: "App Usage Tracking", description: "Track how often and how long you use apps", defaultEnabled: true },
    { icon: MapPin, label: "Location Access", description: "Allow apps to access your location data", defaultEnabled: false },
    { icon: Download, label: "Data Collection", description: "Collect anonymous usage data to improve the app", defaultEnabled: true },
  ]

  const [toggles, setToggles] = useState(privacyItems.map((item) => item.defaultEnabled))

  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
      <ScreenHeader title="Privacy" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 pt-4">
          <p className="text-xs text-muted-foreground mb-3">Manage how your data is used within AppTrack.</p>

          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
            {privacyItems.map((item, index) => (
              <div key={item.label}>
                <div className="flex items-start gap-3 px-4 py-3.5">
                  <item.icon className="h-[18px] w-[18px] text-muted-foreground mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{item.description}</p>
                  </div>
                  <Switch
                    checked={toggles[index]}
                    onCheckedChange={(checked) => {
                      setToggles((prev) => {
                        const next = [...prev]
                        next[index] = checked
                        return next
                      })
                    }}
                    aria-label={`Toggle ${item.label}`}
                  />
                </div>
                {index < privacyItems.length - 1 && <Separator className="bg-border ml-14" />}
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
              onClick={() => onNavigate("export-data")}
            >
              <Download className="h-[18px] w-[18px] text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Export My Data</p>
                <p className="text-[10px] text-muted-foreground">Download all your tracking data</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>

            <Separator className="bg-border ml-14" />

            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
              onClick={() => onNavigate("delete-data")}
            >
              <Trash2 className="h-[18px] w-[18px] text-destructive" />
              <div className="flex-1">
                <p className="text-sm font-medium text-destructive">Delete All Data</p>
                <p className="text-[10px] text-muted-foreground">Permanently remove all tracking history</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
              onClick={() => onNavigate("privacy-policy")}
            >
              <Lock className="h-[18px] w-[18px] text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Privacy Policy</p>
                <p className="text-[10px] text-muted-foreground">Read our full privacy policy</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <p className="text-[10px] text-muted-foreground mt-5 text-center">
            Your data is stored locally and never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  )
}

function HelpScreen({ onBack, onNavigate }: { onBack: () => void; onNavigate: (screen: Screen) => void }) {
  return (
    <div className="fixed inset-0 z-[60] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
      <ScreenHeader title="Help & Support" onBack={onBack} />
      <div className="flex-1 overflow-y-auto pb-28">
        <div className="px-5 pt-4">
          <p className="text-xs text-muted-foreground mb-3">Get help with AppTrack or reach out to our team.</p>

          {/* Chat with Support CTA */}
          <button
            type="button"
            className="w-full bg-primary/10 border border-primary/20 rounded-2xl p-4 flex items-center gap-4 mb-4 hover:bg-primary/15 transition-colors text-left"
            onClick={() => onNavigate("chat")}
          >
            <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Headphones className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-foreground">Chat with Support</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Get instant help from our team</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <span className="text-[10px] text-muted-foreground">Online</span>
            </div>
          </button>

          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
              onClick={() => onNavigate("faq")}
            >
              <MessageCircle className="h-[18px] w-[18px] text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">FAQ</p>
                <p className="text-[10px] text-muted-foreground">Frequently asked questions</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>

            <Separator className="bg-border ml-14" />

            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
              onClick={() => onNavigate("terms")}
            >
              <FileText className="h-[18px] w-[18px] text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Terms of Service</p>
                <p className="text-[10px] text-muted-foreground">Read our terms and conditions</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>

            <Separator className="bg-border ml-14" />

            <button
              type="button"
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-secondary/50 transition-colors text-left"
              onClick={() => onNavigate("privacy-policy")}
            >
              <Shield className="h-[18px] w-[18px] text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Privacy Policy</p>
                <p className="text-[10px] text-muted-foreground">How we handle your data</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          <div className="bg-card border border-border rounded-2xl overflow-hidden mb-4">
            <div className="flex items-center gap-3 px-4 py-3.5">
              <Mail className="h-[18px] w-[18px] text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Email Us</p>
                <p className="text-[10px] text-primary">support@apptrack.app</p>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground">AppTrack v1.0.0</p>
            <p className="text-[10px] text-muted-foreground mt-1">Built with care for app enthusiasts</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ProfileView({ apps, notificationsEnabled, onToggleNotifications, user, onLogout }: ProfileViewProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<Screen>("profile")

  const installed = apps.filter((a) => a.status === "installed")
  const totalMinutes = installed.reduce((sum, a) => sum + a.usageMinutes, 0)
  const totalSize = installed.reduce((sum, a) => sum + Number.parseInt(a.size), 0)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? theme === "dark" : true

  const stats = [
    { label: "Total Apps", value: apps.length, icon: Smartphone },
    { label: "Screen Time", value: `${Math.round(totalMinutes / 60)}h`, icon: Clock },
    { label: "Avg Rating", value: installed.length > 0 ? (installed.reduce((s, a) => s + a.rating, 0) / installed.length).toFixed(1) : "0", icon: Star },
    { label: "Storage Used", value: `${(totalSize / 1024).toFixed(1)} GB`, icon: HardDrive },
  ]

  const navigateTo = (screen: Screen) => setCurrentScreen(screen)
  const goBack = () => {
    if (currentScreen === "faq" || currentScreen === "terms" || currentScreen === "chat") {
      setCurrentScreen("help")
    } else if (currentScreen === "privacy-policy") {
      setCurrentScreen("help")
    } else if (currentScreen === "export-data" || currentScreen === "delete-data") {
      setCurrentScreen("privacy")
    } else {
      setCurrentScreen("profile")
    }
  }

  if (currentScreen === "privacy") {
    return <PrivacyScreen onBack={goBack} onNavigate={navigateTo} />
  }

  if (currentScreen === "help") {
    return <HelpScreen onBack={goBack} onNavigate={navigateTo} />
  }

  if (currentScreen === "faq") {
    return <FAQScreen onBack={goBack} />
  }

  if (currentScreen === "terms") {
    return <TermsScreen onBack={goBack} />
  }

  if (currentScreen === "privacy-policy") {
    return <PrivacyPolicyScreen onBack={goBack} />
  }

  if (currentScreen === "export-data") {
    return <ExportDataScreen onBack={goBack} />
  }

  if (currentScreen === "delete-data") {
    return <DeleteDataScreen onBack={goBack} />
  }

  if (currentScreen === "chat") {
    return <ChatScreen onBack={goBack} />
  }

  return (
    <div className="px-5 pb-28">
      <h2 className="text-lg font-bold text-foreground mb-5">Profile</h2>

      <div className="bg-card border border-border rounded-2xl p-5 flex items-center gap-4 mb-5">
        <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shrink-0">
          <span className="text-xl font-bold text-primary-foreground">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-foreground truncate">{user?.name || "User"}</h3>
          <p className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <stat.icon className="h-5 w-5 text-primary shrink-0" />
            <div>
              <p className="text-base font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <p className="text-xs text-muted-foreground px-5 pt-4 pb-2">Settings</p>

        <div className="flex items-center gap-3 px-5 py-3.5">
          {isDark ? (
            <Moon className="h-[18px] w-[18px] text-muted-foreground" />
          ) : (
            <Sun className="h-[18px] w-[18px] text-muted-foreground" />
          )}
          <span className="text-sm text-foreground flex-1">Dark Mode</span>
          <Switch
            checked={isDark}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
            aria-label="Toggle dark mode"
          />
        </div>

        <Separator className="bg-border ml-14" />

        <div className="flex items-center gap-3 px-5 py-3.5">
          <Bell className="h-[18px] w-[18px] text-muted-foreground" />
          <span className="text-sm text-foreground flex-1">Notifications</span>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={onToggleNotifications}
            aria-label="Toggle notifications"
          />
        </div>

        <Separator className="bg-border ml-14" />

        <button
          className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/50 transition-colors text-left"
          type="button"
          onClick={() => navigateTo("privacy")}
        >
          <Shield className="h-[18px] w-[18px] text-muted-foreground" />
          <span className="text-sm text-foreground flex-1">Privacy</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>

        <Separator className="bg-border ml-14" />

        <button
          className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/50 transition-colors text-left"
          type="button"
          onClick={() => navigateTo("help")}
        >
          <HelpCircle className="h-[18px] w-[18px] text-muted-foreground" />
          <span className="text-sm text-foreground flex-1">Help & Support</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Logout button */}
      {onLogout && (
        <button
          className="w-full bg-card border border-destructive/20 rounded-2xl flex items-center justify-center gap-2.5 px-5 py-3.5 mt-5 hover:bg-destructive/10 transition-colors"
          type="button"
          onClick={onLogout}
        >
          <LogOut className="h-[18px] w-[18px] text-destructive" />
          <span className="text-sm font-medium text-destructive">Log Out</span>
        </button>
      )}

      <p className="text-center text-[10px] text-muted-foreground/50 mt-6 mb-2">AppTrack v1.0.0</p>
    </div>
  )
}
