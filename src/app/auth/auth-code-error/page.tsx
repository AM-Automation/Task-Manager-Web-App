import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function AuthCodeErrorPage() {
    return (
        <div className="flex h-screen w-full items-center justify-center px-4">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Authentication Error</CardTitle>
                    <CardDescription>
                        There was a problem confirming your email.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        This could happen if:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>The link has expired</li>
                        <li>The link was already used</li>
                        <li>Your email was already confirmed</li>
                    </ul>
                    <div className="pt-4">
                        <Button asChild className="w-full">
                            <Link href="/auth/login">Go to Login</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
