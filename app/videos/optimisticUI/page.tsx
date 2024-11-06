import { Chat } from "./chat";

export default function Home() {
  const initialMessages = [
    {text: "Initial Message", sending: false }
  ];

  return (
    <main className="flex justify-center items-center h-screen">
      {/* <h1 className="text-2xl font-bold text-center mb-8">Optimistic UI Example</h1> */}
      <Chat initialMessages={initialMessages} />
    </main>
  );
}