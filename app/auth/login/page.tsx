"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Successfully logged in!");
      router.push("/dashboard");
    } catch (error) {
      if (error === "auth/popup-closed-by-user") {
        console.log("User closed the popup. No action needed.");
      } else {
        console.error("Login error:", error);
        toast.error(error instanceof Error ? error.message : "Failed to log in. Please try again.");
      }
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center relative">
      {/* Background Design */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md border-0 shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <CardHeader className="text-center space-y-4">
            <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Continue building something amazing with your Google account
            </CardDescription>
          </CardHeader>
          
          <CardContent className="flex justify-center">
            <Button 
              onClick={handleLogin} 
              size="lg" 
              className="w-full gap-3 transition-all hover:shadow-md"
              variant="outline"
            >
              <FcGoogle className="h-6 w-6" />
              <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent font-semibold">
                Sign in with Google
              </span>
            </Button>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground text-center">
              Don't have an account? We'll create one automatically through Google
            </p>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Additional background element */}
      <div className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-bottom-80">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9089fc] to-[#ff80b5] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}