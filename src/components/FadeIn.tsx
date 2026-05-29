import React, { useEffect, useRef, useState } from "react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export function FadeIn({ children, delay = 0, className = "", direction = "up" }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px", threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const transforms: Record<string, string> = {
    up: "opacity-0 translate-y-8",
    left: "opacity-0 -translate-x-8",
    right: "opacity-0 translate-x-8",
    none: "opacity-0"
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${isVisible ? "opacity-100 translate-y-0 translate-x-0" : transforms[direction]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
