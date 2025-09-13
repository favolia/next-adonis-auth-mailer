"use client"

import { useMemo } from "react"
import { Progress } from "@/components/ui/progress"

interface PasswordStrengthIndicatorProps {
    password: string
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
    const strength = useMemo(() => {
        if (!password) return { score: 0, label: "", color: "" }

        let score = 0
        const checks = {
            length: password.length >= 8,
            lowercase: /[a-z]/.test(password),
            // uppercase: /[A-Z]/.test(password),
            numbers: /\d/.test(password),
            // symbols: /[^A-Za-z0-9]/.test(password),
        }

        // Calculate score
        if (checks.length) score += 40
        if (checks.lowercase) score += 30
        // if (checks.uppercase) score += 20
        if (checks.numbers) score += 30
        // if (checks.symbols) score += 20

        // Determine label and color
        if (score < 40) {
            return { score, label: "Weak", color: "bg-destructive" }
        } else if (score < 80) {
            return { score, label: "Medium", color: "bg-yellow-500" }
        } else {
            return { score, label: "Strong", color: "bg-green-500" }
        }
    }, [password])

    if (!password) return null

    return (
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Password strength</span>
                <span
                    className={`text-xs font-medium ${strength.label === "Weak"
                        ? "text-destructive"
                        : strength.label === "Medium"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                >
                    {strength.label}
                </span>
            </div>
            <Progress value={strength.score} className="h-2" />
            <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex flex-wrap gap-2">
                    <span className={password.length >= 8 ? "text-green-600" : "text-muted-foreground"}>• 8+ characters</span>
                    <span className={/[a-z]/.test(password) ? "text-green-600" : "text-muted-foreground"}>• lowercase</span>
                    {/* <span className={/[A-Z]/.test(password) ? "text-green-600" : "text-muted-foreground"}>• uppercase</span> */}
                    <span className={/\d/.test(password) ? "text-green-600" : "text-muted-foreground"}>• number</span>
                    {/* <span className={/[^A-Za-z0-9]/.test(password) ? "text-green-600" : "text-muted-foreground"}>• symbol</span> */}
                </div>
            </div>
        </div>
    )
}
