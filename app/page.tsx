import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Shield, Zap, Sun, Moon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";


export default function Home() {
  
  function setTheme(arg0: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col">
      {/* Hero Section */}

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-20 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent animate-fade-in">
              MED-VQA +
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              AI-Driven Insights, Transforming Medical Imaging.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="group">
                <Link href="/auth/login">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto max-w-7xl px-4 lg:px-4 py-12 sm:py-56">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Everything you need</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Unleashing the Power of AI in Medical Imaging
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {[
              {
                name: 'Lightning Fast',
                description: 'Built with Next.js and optimized for performance from the ground up.',
                icon: Zap,
              },
              {
                name: 'Secure by Default',
                description: 'Enterprise-grade security with Supabase authentication and row-level security.',
                icon: Shield,
              },
              {
                name: 'AI-Powered',
                description: 'Integrate with cutting-edge AI models to enhance your application.',
                icon: Sparkles,
              },
            ].map((feature) => (
              <div key={feature.name} className="flex flex-col items-start">
                <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold">{feature.name}</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}