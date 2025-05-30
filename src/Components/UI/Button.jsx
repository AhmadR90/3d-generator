import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-white text-black hover:bg-white/90 font-medium shadow-sm",
        dark: "bg-black text-white hover:bg-black/90 border border-white/10",
        outline: "border border-white/20 bg-black/10 backdrop-blur-xl text-white hover:bg-white/10 hover:border-white/30",
        subtle: "bg-white/10 backdrop-blur-xl text-white hover:bg-white/20 border border-white/10",
        ghost: "text-white hover:bg-white/10 hover:text-white",
        link: "text-white underline-offset-4 hover:underline",
        primary: "bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 shadow-sm transition-all hover:shadow-lg hover:shadow-blue-500/20",
        secondary: "bg-zinc-900 text-white font-medium hover:bg-zinc-800 border border-zinc-800/50 transition-all",
        minimal: "bg-transparent text-white border border-white/20 hover:bg-white/5 hover:border-white/30 transition-all",
        premium: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 shadow-sm transition-all hover:shadow-lg hover:shadow-blue-600/20",
        apple: "bg-zinc-900 hover:bg-zinc-800 text-white font-medium rounded-full px-5 py-2.5 transition-all duration-300",
        glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 hover:border-white/30 transition-all shadow-sm",
      },
      size: {
        default: "h-10 px-4 py-2.5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, noAnimation = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    if (noAnimation) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      );
    }
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="inline-block"
      >
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      </motion.div>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };