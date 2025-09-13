"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { Eye, EyeOff, Chrome } from "lucide-react"
import { PasswordStrengthIndicator } from "@/components/password-strength-indicator"

interface FormData {
    fullname?: string
    email: string
    password: string
    confirmPassword?: string
}

interface FormErrors {
    fullname?: string
    email?: string
    password?: string
    confirmPassword?: string
}

export function AuthForm() {
    const [activeTab, setActiveTab] = useState("login")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Form data
    const [loginData, setLoginData] = useState<FormData>({
        email: "",
        password: "",
    })

    const [registerData, setRegisterData] = useState<FormData>({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    // Form errors
    const [loginErrors, setLoginErrors] = useState<FormErrors>({})
    const [registerErrors, setRegisterErrors] = useState<FormErrors>({})

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const validatePassword = (password: string): boolean => {
        return password.length >= 8
    }

    const validateLoginForm = (): boolean => {
        const errors: FormErrors = {}

        if (!loginData.email) {
            errors.email = "Email is required"
        } else if (!validateEmail(loginData.email)) {
            errors.email = "Please enter a valid email"
        }

        if (!loginData.password) {
            errors.password = "Password is required"
        }

        setLoginErrors(errors)
        return Object.keys(errors).length === 0
    }

    const validateRegisterForm = (): boolean => {
        const errors: FormErrors = {}

        if (!registerData.fullname) {
            errors.fullname = "Full name is required"
        } else if (registerData.fullname.length < 2) {
            errors.fullname = "Full name must be at least 2 characters"
        }

        if (!registerData.email) {
            errors.email = "Email is required"
        } else if (!validateEmail(registerData.email)) {
            errors.email = "Please enter a valid email"
        }

        if (!registerData.password) {
            errors.password = "Password is required"
        } else if (!validatePassword(registerData.password)) {
            errors.password = "Password must be at least 8 characters"
        }

        if (!registerData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password"
        } else if (registerData.password !== registerData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match"
        }

        setRegisterErrors(errors)
        return Object.keys(errors).length === 0
    }

    // Handle form submissions
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateLoginForm()) return

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            toast.success("Login successful!", {
                description: <pre className="text-xs">{JSON.stringify(loginData, null, 2)}</pre>,
            })
        }, 1000)
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateRegisterForm()) return

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            const { confirmPassword, ...dataToShow } = registerData
            toast.success("Registration successful!", {
                description: <pre className="text-xs">{JSON.stringify(dataToShow, null, 2)}</pre>,
            })
        }, 1000)
    }

    const handleGoogleLogin = () => {
        toast.info("Google login clicked!", {
            description: (
                <pre className="text-xs">{JSON.stringify({ provider: "google", action: "oauth_login" }, null, 2)}</pre>
            ),
        })
    }

    return (
        <Card className="w-full shadow-xl border-0 bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
                <CardDescription>Sign in to your account or create a new one</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full mb-6">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login" className="space-y-4">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="login-email">Email</Label>
                                <Input
                                    id="login-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={loginData.email}
                                    onChange={(e) => {
                                        setLoginData({ ...loginData, email: e.target.value })
                                        if (loginErrors.email) {
                                            setLoginErrors({ ...loginErrors, email: undefined })
                                        }
                                    }}
                                    className={loginErrors.email ? "border-destructive" : ""}
                                />
                                {loginErrors.email && <p className="text-sm text-destructive">{loginErrors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="login-password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={loginData.password}
                                        onChange={(e) => {
                                            setLoginData({ ...loginData, password: e.target.value })
                                            if (loginErrors.password) {
                                                setLoginErrors({ ...loginErrors, password: undefined })
                                            }
                                        }}
                                        className={loginErrors.password ? "border-destructive pr-10" : "pr-10"}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                                {loginErrors.password && <p className="text-sm text-destructive">{loginErrors.password}</p>}
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="register" className="space-y-4">
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="register-fullname">Full Name</Label>
                                <Input
                                    id="register-fullname"
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={registerData.fullname}
                                    onChange={(e) => {
                                        setRegisterData({ ...registerData, fullname: e.target.value })
                                        if (registerErrors.fullname) {
                                            setRegisterErrors({ ...registerErrors, fullname: undefined })
                                        }
                                    }}
                                    className={registerErrors.fullname ? "border-destructive" : ""}
                                />
                                {registerErrors.fullname && <p className="text-sm text-destructive">{registerErrors.fullname}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-email">Email</Label>
                                <Input
                                    id="register-email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={registerData.email}
                                    onChange={(e) => {
                                        setRegisterData({ ...registerData, email: e.target.value })
                                        if (registerErrors.email) {
                                            setRegisterErrors({ ...registerErrors, email: undefined })
                                        }
                                    }}
                                    className={registerErrors.email ? "border-destructive" : ""}
                                />
                                {registerErrors.email && <p className="text-sm text-destructive">{registerErrors.email}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="register-password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a password"
                                        value={registerData.password}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, password: e.target.value })
                                            if (registerErrors.password) {
                                                setRegisterErrors({ ...registerErrors, password: undefined })
                                            }
                                        }}
                                        className={registerErrors.password ? "border-destructive pr-10" : "pr-10"}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                                {registerErrors.password && <p className="text-sm text-destructive">{registerErrors.password}</p>}
                                {registerData.password && <PasswordStrengthIndicator password={registerData.password} />}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="register-confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm your password"
                                        value={registerData.confirmPassword}
                                        onChange={(e) => {
                                            setRegisterData({ ...registerData, confirmPassword: e.target.value })
                                            if (registerErrors.confirmPassword) {
                                                setRegisterErrors({ ...registerErrors, confirmPassword: undefined })
                                            }
                                        }}
                                        className={registerErrors.confirmPassword ? "border-destructive pr-10" : "pr-10"}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
                                {registerErrors.confirmPassword && (
                                    <p className="text-sm text-destructive">{registerErrors.confirmPassword}</p>
                                )}
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creating account..." : "Create Account"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                        </div>
                    </div>

                    <Button variant="outline" type="button" className="w-full mt-4 bg-transparent" onClick={handleGoogleLogin}>
                        <Chrome className="mr-2 h-4 w-4" />
                        Continue with Google
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
