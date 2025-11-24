import React from "react";

interface ResponsiveLayoutProps {
    children: React.ReactNode;
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <div className="relative flex min-h-screen flex-col">
                <main className="flex-1">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
