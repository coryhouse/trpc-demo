import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";
import Button from "./Button";
import Input from "./Input";

const client = new QueryClient();

function AppContent() {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");

  const messages = trpc.useQuery(["getMessages"]);
  const addMessage = trpc.useMutation("addMessage");

  function onAdd() {
    addMessage.mutate(
      {
        user,
        message,
      },
      {
        onSuccess: () => {
          client.invalidateQueries(["getMessages"]);
        },
      }
    );
  }
  return (
    <div className="max-w-6xl mx-auto mt-10 text-3xl">
      <div className="mt-10">
        <Input
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="User"
        />
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />
      </div>
      <Button onClick={onAdd}>Add message</Button>
      <div>{JSON.stringify(messages.data)}</div>
    </div>
  );
}

function App() {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      // In real app, set the base URL via an env var.
      // All trpc calls start with this base URL.
      url: "http://localhost:8080/trpc",
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={client}>
      <QueryClientProvider client={client}>
        <AppContent />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
