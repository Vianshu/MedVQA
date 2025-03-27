"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component has mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent rendering before theme is resolved
  if (!mounted) return null;

  return (
    <div></div>
  );
}
