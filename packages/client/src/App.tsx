import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import { QueryClient, QueryClientProvider } from "react-query";
import { trpc } from "./trpc";

const client = new QueryClient();

function AppContent() {
  const hello = trpc.useQuery(["hello"]);
  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div>{JSON.stringify(hello.data)}</div>
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
