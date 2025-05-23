"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Clock,
  Computer,
  FolderKanbanIcon,
  HomeIcon,
  TrendingUp,
  Users,
  XIcon,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

const LeftNavbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchProfileCompletion = async () => {
      try {
        const response = await fetch("/api/onboarding/status");
        const data = await response.json();
        if (data.completionPercentage !== undefined) {
          setCompletionPercentage(data.completionPercentage);
        }
      } catch (error) {
        console.error("Error fetching profile completion:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileCompletion();
  }, []);

  const profileItems = [
    { name: "Basic Info", threshold: 14 },
    { name: "Profile Image", threshold: 28 },
    { name: "Cover Image", threshold: 42 },
    { name: "Bio", threshold: 56 },
    { name: "Nerd At", threshold: 70 },
    { name: "Country", threshold: 84 },
    { name: "Personal Link", threshold: 100 },
  ];

  const navItems = [
    { name: "home", icon: HomeIcon, path: "/" },
    { name: "explore", icon: TrendingUp, path: "/explore" },
    { name: "project", icon: FolderKanbanIcon, path: "/project" },
    { name: "community", icon: Users, path: "/community" },
    { name: "events", icon: Clock, path: "/event" },
    { name: "nerd-ai", icon: Computer, path: "/ai" },
  ];

  const getActiveItem = () => {
    const currentPath = pathname || "/";
    const activeItem = navItems.find(
      (item) =>
        currentPath === item.path ||
        (item.path !== "/" && currentPath.startsWith(item.path)),
    );
    return activeItem?.name || "home";
  };

  return (
    <div className="sticky left-0 top-20 hidden w-fit  gap-1 px-5 py-5 md:flex md:flex-col lg:w-[17vw]">
      {/* Navigation Items */}
      {navItems.map((item) => (
        <motion.div
          key={item.name}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full"
        >
          <Button
            onClick={() => {
              router.push(item.path);
            }}
            variant="outline"
            className={`group relative w-fit justify-start gap-2 rounded-xl border-none bg-transparent px-3 py-4 shadow-none transition-all duration-300 hover:bg-primary/5 dark:border-gray-500/5 md:w-full ${
              getActiveItem() === item.name
                ? "bg-primary/10 font-medium text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <item.icon
              className={`hidden transition-transform duration-300 group-hover:scale-110 md:block ${
                getActiveItem() === item.name
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
              size={20}
            />
            <span className="hidden font-geist lg:block">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </span>
            {getActiveItem() === item.name && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute left-0 h-full w-1 rounded-full bg-gradient-to-b from-primary to-primary/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </Button>
        </motion.div>
      ))}

      {/* Profile Setup Card */}

      <div className="relative">
        {completionPercentage < 100 && (
          <motion.div
            className="relative mt-14 w-full cursor-pointer overflow-hidden rounded-xl border border-transparent bg-card/50 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-md"
            onClick={() => setIsExpanded(!isExpanded)}
            whileHover={{ scale: 1.01 }}
          >
            {/* Optimized glow effects using simpler gradients */}
            {/* <div className="absolute -right-4 top-0 size-32 -rotate-45 rounded-full bg-blue-300/10" />
          <div className="absolute -bottom-5 left-12 size-32 rotate-45 rounded-full bg-blue-300/20" /> */}

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <span className="flex-1 text-sm font-medium">
                  Profile Setup
                </span>
                <motion.div
                  className={`${!isExpanded && "hidden"}`}
                  transition={{ duration: 0.2 }}
                >
                  <XIcon size={16} />
                </motion.div>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <Progress
                  value={completionPercentage}
                  className="h-2 flex-1 bg-primary/10 [&>*]:bg-purple-500"
                />
                <span className="text-xs font-medium text-muted-foreground">
                  {loading ? "..." : `${completionPercentage}%`}
                </span>
              </div>

              {/* "Complete Profile" Button */}
              <Button
                variant="link"
                size="sm"
                className="mt-2 w-full justify-center py-0 text-xs text-primary transition-colors hover:text-primary/80"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push("/settings");
                }}
              >
                Complete Profile
              </Button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: "1rem" }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="mb-1 border-t border-gray-500/10 dark:border-white/10"></div>
                    <span className="text-sm font-medium text-muted-foreground">
                      Complete your profile
                    </span>
                    <div className="mt-2 space-y-1">
                      {profileItems.map((item) => (
                        <motion.div
                          key={item.name}
                          className="flex items-center gap-2 text-xs"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.1 + profileItems.indexOf(item) * 0.05,
                          }}
                        >
                          <motion.div
                            className={`size-3 rounded-full border transition-colors duration-300 ${
                              completionPercentage >= item.threshold
                                ? "border-purple-400 bg-purple-500"
                                : "border-gray-300 dark:border-gray-600"
                            }`}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              delay: 0.1 + profileItems.indexOf(item) * 0.05,
                            }}
                          />
                          <span className="text-muted-foreground">
                            {item.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <motion.div
              className={`mx-auto w-full ${isExpanded && "hidden"}`}
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="mx-auto" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LeftNavbar;
