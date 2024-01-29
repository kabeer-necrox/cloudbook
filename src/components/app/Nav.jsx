import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Nav = ({ links, isCollapsed }) => {
  const logoutUser = () => {
    localStorage.removeItem("token");
  };

  return (
    <div
      data-collapsed={isCollapsed}
      className="h-full group flex flex-col justify-between gap-4 py-2 data-[collapsed=true]:py-2 w-[250px] border-r"
    >
      <p className="text-center">Cloud Book Writer</p>
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map(
          (link, index) => (
            // isCollapsed ? (
            //   <Tooltip key={index} delayDuration={0}>
            //     <TooltipTrigger asChild>
            //       <Link
            //         to="#"
            //         className={cn(
            //           buttonVariants({ variant: link.variant, size: "icon" }),
            //           "h-9 w-9",
            //           link.variant === "default" &&
            //             "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            //         )}
            //       >
            //         <link.icon className="h-4 w-4" />
            //         <span className="sr-only">{link.title}</span>
            //       </Link>
            //     </TooltipTrigger>
            //     <TooltipContent side="right" className="flex items-center gap-4">
            //       {link.title}
            //       {link.label && (
            //         <span className="ml-auto text-muted-foreground">
            //           {link.label}
            //         </span>
            //       )}
            //     </TooltipContent>
            //   </Tooltip>
            // ) : (
            <Link
              key={index}
              to={link.href}
              className={cn(
                buttonVariants({ variant: link.variant, size: "sm" }),
                link.variant === "default" &&
                  "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
            </Link>
          )
          // )
        )}
      </nav>
      <Link to="/login">
        <Button variant="ghost" onClick={logoutUser}>
          Logout
        </Button>
      </Link>
    </div>
  );
};

export { Nav };
