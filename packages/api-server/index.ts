import express from "express";
import * as trpc from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
import cors from "cors";
import { z } from "zod";

type ChatMessage = {
  user: string;
  message: string;
};

const messages: ChatMessage[] = [
  { user: "user1", message: "Hello" },
  { user: "user2", message: "Hi" },
];

const defaultMaxNumMessagesToReturn = 10;

const appRouter = trpc
  .router()
  .query("hello", {
    resolve() {
      return "Hello world";
    },
  })
  .query("getUser", {
    resolve() {
      return {
        id: 1,
        name: "Cory",
      };
    },
  })
  .query("getMessages", {
    input: z.number().default(defaultMaxNumMessagesToReturn),
    resolve({ input }) {
      return messages.slice(-input);
    },
  })
  .mutation("addMessage", {
    input: z.object({
      user: z.string(),
      message: z.string(),
    }),
    resolve({ input }) {
      messages.push(input);
      return input;
    },
  });

// Export so we can access it on the client. This is the "t" in tRPC. :)
export type AppRouter = typeof appRouter;

const app = express();

// Enable cors since our frontend runs on a different port than the api-server
app.use(cors());
const port = 8080;

// The only route we need. All requests sent here are handled via the appRouter declared above.
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    // Context is useful for auth, but leaving empty for now
    createContext: () => null,
  })
);

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
