"use client"

import { useState } from "react"
import { Smartphone, Eye, EyeOff, ArrowLeft, Mail, Lock, User, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthScreenProps {
  onLogin: (user: { name: string; email: string }) => void
}

type AuthView = "welcome" | "login" | "signup" | "forgot-password" | "reset-sent"

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [view, setView] = useState<AuthView>("welcome")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Form states
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("")
  const [forgotEmail, setForgotEmail] = useState("")

  // Error states
  const [loginError, setLoginError] = useState("")
  const [signupError, setSignupError] = useState("")

  const handleGoogleSignIn = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin({ name: "Google User", email: "user@gmail.com" })
    }, 1500)
  }

  const handleLogin = () => {
    setLoginError("")
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError("Please fill in all fields")
      return
    }
    if (!loginEmail.includes("@")) {
      setLoginError("Please enter a valid email address")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin({ name: loginEmail.split("@")[0], email: loginEmail })
    }, 1200)
  }

  const handleSignup = () => {
    setSignupError("")
    if (!signupName.trim() || !signupEmail.trim() || !signupPassword.trim() || !signupConfirmPassword.trim()) {
      setSignupError("Please fill in all fields")
      return
    }
    if (!signupEmail.includes("@")) {
      setSignupError("Please enter a valid email address")
      return
    }
    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters")
      return
    }
    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match")
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      onLogin({ name: signupName, email: signupEmail })
    }, 1200)
  }

  const handleForgotPassword = () => {
    if (!forgotEmail.trim() || !forgotEmail.includes("@")) {
      return
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setView("reset-sent")
    }, 1000)
  }

  // Google icon SVG
  const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )

  // ==================== WELCOME SCREEN ====================
  if (view === "welcome") {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
        <div className="flex-1 flex flex-col items-center justify-center px-8 gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center gap-4 mb-4">
            <div className="h-20 w-20 rounded-3xl bg-primary/15 border border-primary/20 flex items-center justify-center">
              <Smartphone className="h-10 w-10 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-1">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome to AppTrack</h1>
              <p className="text-sm text-muted-foreground text-center text-pretty">Your personal app tracking companion</p>
            </div>
          </div>

          {/* Sign in options */}
          <div className="w-full flex flex-col gap-3 mt-4">
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              disabled={isLoading}
              className="w-full h-12 rounded-2xl text-sm font-medium gap-3 border-border hover:bg-secondary/80"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
              ) : (
                <GoogleIcon />
              )}
              Continue with Google
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <Button
              onClick={() => setView("login")}
              className="w-full h-12 rounded-2xl text-sm font-semibold gap-2"
            >
              <Mail className="h-4 w-4" />
              Sign in with Email
            </Button>

            <Button
              onClick={() => setView("signup")}
              variant="ghost"
              className="w-full h-12 rounded-2xl text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Create a new account
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="px-8 pb-10 shrink-0">
          <p className="text-[10px] text-muted-foreground/60 text-center leading-relaxed">
            By continuing, you agree to AppTrack&apos;s Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    )
  }

  // ==================== LOGIN SCREEN ====================
  if (view === "login") {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-12 pb-4 shrink-0">
          <button
            type="button"
            onClick={() => { setView("welcome"); setLoginError("") }}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary/80 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Welcome back</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          {/* Google button */}
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            disabled={isLoading}
            className="w-full h-12 rounded-2xl text-sm font-medium gap-3 border-border hover:bg-secondary/80 mb-5"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </Button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-email" className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 bg-card border border-border rounded-xl pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="login-password" className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  onKeyDown={(e) => { if (e.key === "Enter") handleLogin() }}
                  className="w-full h-12 bg-card border border-border rounded-xl pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-xs text-destructive font-medium">{loginError}</p>
            )}

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setView("forgot-password")}
                className="text-xs text-primary font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full h-12 rounded-2xl text-sm font-semibold mt-2"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            {"Don't have an account? "}
            <button
              type="button"
              onClick={() => { setView("signup"); setLoginError("") }}
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    )
  }

  // ==================== SIGNUP SCREEN ====================
  if (view === "signup") {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
        {/* Header */}
        <div className="flex items-center gap-3 px-5 pt-12 pb-4 shrink-0">
          <button
            type="button"
            onClick={() => { setView("welcome"); setSignupError("") }}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary/80 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          {/* Title */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Create account</h2>
            <p className="text-sm text-muted-foreground mt-1">Start tracking your apps today</p>
          </div>

          {/* Google button */}
          <Button
            onClick={handleGoogleSignIn}
            variant="outline"
            disabled={isLoading}
            className="w-full h-12 rounded-2xl text-sm font-medium gap-3 border-border hover:bg-secondary/80 mb-5"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-muted-foreground/30 border-t-foreground rounded-full animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Sign up with Google
          </Button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-name" className="text-xs font-medium text-muted-foreground">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="signup-name"
                  type="text"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full h-12 bg-card border border-border rounded-xl pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-email" className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="signup-email"
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-12 bg-card border border-border rounded-xl pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-password" className="text-xs font-medium text-muted-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full h-12 bg-card border border-border rounded-xl pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {/* Password strength indicator */}
              {signupPassword.length > 0 && (
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex gap-1 flex-1">
                    <div className={`h-1 flex-1 rounded-full ${signupPassword.length >= 2 ? "bg-destructive" : "bg-muted"}`} />
                    <div className={`h-1 flex-1 rounded-full ${signupPassword.length >= 4 ? "bg-chart-3" : "bg-muted"}`} />
                    <div className={`h-1 flex-1 rounded-full ${signupPassword.length >= 6 ? "bg-primary" : "bg-muted"}`} />
                    <div className={`h-1 flex-1 rounded-full ${signupPassword.length >= 8 && /[A-Z]/.test(signupPassword) && /\d/.test(signupPassword) ? "bg-primary" : "bg-muted"}`} />
                  </div>
                  <span className="text-[10px] text-muted-foreground">
                    {signupPassword.length < 4 ? "Weak" : signupPassword.length < 6 ? "Fair" : signupPassword.length < 8 ? "Good" : "Strong"}
                  </span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="signup-confirm" className="text-xs font-medium text-muted-foreground">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="signup-confirm"
                  type={showConfirmPassword ? "text" : "password"}
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  onKeyDown={(e) => { if (e.key === "Enter") handleSignup() }}
                  className="w-full h-12 bg-card border border-border rounded-xl pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {signupConfirmPassword.length > 0 && signupPassword === signupConfirmPassword && (
                <div className="flex items-center gap-1.5 mt-1">
                  <Check className="h-3 w-3 text-primary" />
                  <span className="text-[10px] text-primary">Passwords match</span>
                </div>
              )}
            </div>

            {signupError && (
              <p className="text-xs text-destructive font-medium">{signupError}</p>
            )}

            <Button
              onClick={handleSignup}
              disabled={isLoading}
              className="w-full h-12 rounded-2xl text-sm font-semibold mt-2"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => { setView("login"); setSignupError("") }}
              className="text-primary font-medium hover:underline"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    )
  }

  // ==================== FORGOT PASSWORD ====================
  if (view === "forgot-password") {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col max-w-md mx-auto" style={{ height: "100dvh" }}>
        <div className="flex items-center gap-3 px-5 pt-12 pb-4 shrink-0">
          <button
            type="button"
            onClick={() => setView("login")}
            className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-secondary/80 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
        </div>

        <div className="flex-1 px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">Forgot password?</h2>
            <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
              {"Enter your email address and we'll send you a link to reset your password."}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="forgot-email" className="text-xs font-medium text-muted-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="forgot-email"
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  onKeyDown={(e) => { if (e.key === "Enter") handleForgotPassword() }}
                  className="w-full h-12 bg-card border border-border rounded-xl pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
              </div>
            </div>

            <Button
              onClick={handleForgotPassword}
              disabled={isLoading || !forgotEmail.includes("@")}
              className="w-full h-12 rounded-2xl text-sm font-semibold"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // ==================== RESET SENT ====================
  if (view === "reset-sent") {
    return (
      <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center max-w-md mx-auto px-8" style={{ height: "100dvh" }}>
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="h-16 w-16 rounded-full bg-primary/15 flex items-center justify-center">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">Check your email</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-[280px]">
            We sent a password reset link to <span className="font-medium text-foreground">{forgotEmail}</span>
          </p>
          <Button
            onClick={() => setView("login")}
            className="h-12 rounded-2xl text-sm font-semibold px-8 mt-4"
          >
            Back to Sign In
          </Button>
        </div>
      </div>
    )
  }

  return null
}
