import * as React from "react";

import { cn } from "@/lib/utils";

const Avatar = ({ className, ...props }) => (
  <div className={cn("inline-flex h-10 w-10 rounded-full overflow-hidden", className)} {...props} />
);

const AvatarImage = ({ className, ...props }) => (
  <img className={cn("h-full w-full object-cover", className)} {...props} />
);

const AvatarFallback = ({ className, ...props }) => (
  <div className={cn("flex h-full w-full items-center justify-center bg-gray-200 text-gray-600", className)} {...props} />
);

export { Avatar, AvatarImage, AvatarFallback };
