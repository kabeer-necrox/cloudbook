import React from "react";
import { ImBooks } from "react-icons/im";
import { MdAccountCircle } from "react-icons/md";
import { Nav } from "./Nav";
import { TooltipProvider } from "@radix-ui/react-tooltip";

const DashboardWrapper = ({ children, tab }) => {
  return (
    <div className="h-screen flex">
      <TooltipProvider delayDuration={0}>
        <Nav
          isCollapsed={false}
          links={[
            {
              title: "Books",
              icon: ImBooks,
              href: "/books",
              variant: tab === "books" ? "default" : "ghost",
            },
            {
              title: "Manage Account",
              icon: MdAccountCircle,
              href: "/manage-account",
              variant: tab === "manageAccount" ? "default" : "ghost",
            },
          ]}
        />
      </TooltipProvider>
      <div className="w-full flex justify-center">{children}</div>
    </div>
  );
};

export { DashboardWrapper };
