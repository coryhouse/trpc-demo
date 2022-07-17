// This helps us create the react query hooks that are specific to our trpc api-server
import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "api-server";

export const trpc = createReactQueryHooks<AppRouter>();
