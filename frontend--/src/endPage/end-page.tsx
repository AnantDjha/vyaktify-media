import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Home, Search, Ghost, Waypoints } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background overflow-hidden relative selection:bg-primary/20">

            {/* --- Ambient Background Effects --- */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">

                {/* --- Glitch Effect 404 Text --- */}
                <div className="relative mb-8 group cursor-default">
                    <h1 className="text-[150px] md:text-[200px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Ghost className="w-32 h-32 text-primary/20 animate-bounce" />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-3 bg-primary/20 rounded-full blur-xl" />
                </div>

                {/* --- Main Message --- */}
                <div className="space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Reality check failed.
                    </h2>
                    <p className="text-muted-foreground text-lg md:text-xl max-w-lg mx-auto">
                        It seems you've ventured into the void. The page you are looking for has been moved, deleted, or never existed in this dimension.
                    </p>
                </div>

                {/* --- Interactive Search & Navigation Card --- */}
                <Card className="w-full max-w-md bg-card/50 backdrop-blur-sm border-muted/50 shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-100">
                    <CardContent className="p-6 space-y-6">

                        {/* Search Bar */}
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                type="text"
                                placeholder="Search for the right path..."
                                className="pl-10 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/50"
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <Button
                                variant="default"
                                size="lg"
                                className="w-full group shadow-lg hover:shadow-primary/25 transition-all duration-300"
                                onClick={() => window.history.back()}
                            >
                                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                Go Back
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="w-full hover:bg-secondary/80 hover:text-secondary-foreground transition-colors"
                                onClick={() => window.location.href = '/'}
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Homepage
                            </Button>
                        </div>

                        {/* Helpful Quick Links */}
                        <div className="pt-4 border-t border-border/50">
                            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
                                <a href="#" className="hover:text-primary transition-colors flex items-center gap-1.5">
                                    <Waypoints className="w-3 h-3" /> Sitemap
                                </a>
                                <a href="#" className="hover:text-primary transition-colors">Contact Support</a>
                                <a href="#" className="hover:text-primary transition-colors">Status</a>
                            </div>
                        </div>

                    </CardContent>
                </Card>

                {/* Footer Note */}
                <p className="mt-12 text-xs text-muted-foreground/50 font-mono">
                    ERROR_CODE: ID_10_T / LAYER_8_ISSUE
                </p>

            </div>
        </div>
    );
};

export default NotFound;