import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default function SignUpPage({
    searchParams,
}: {
    searchParams: { message?: string; error?: string }
}) {
    async function signUp(formData: FormData) {
        "use server"

        const email = formData.get("email") as string
        const password = formData.get("password") as string
        const origin = (await (await import('next/headers')).headers()).get('origin')

        const supabase = await createClient()

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        })

        if (error) {
            return redirect("/auth/signup?error=" + error.message)
        }

        return redirect("/auth/signup?message=Check email to continue sign in process")
    }

    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={signUp} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" name="password" required />
                        </div>
                        <Button type="submit" className="w-full">
                            Create an account
                        </Button>

                        {searchParams?.message && (
                            <div className="text-sm text-green-600 text-center">
                                {searchParams.message}
                            </div>
                        )}
                        {searchParams?.error && (
                            <div className="text-sm text-red-600 text-center">
                                {searchParams.error}
                            </div>
                        )}
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
