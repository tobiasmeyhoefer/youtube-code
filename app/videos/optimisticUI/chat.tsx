'use client'

import { deliverMessage } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useOptimistic, useRef, useState } from "react";

type Message = {
  text: string;
  sending: boolean;
}

export function Chat({ initialMessages = [] }: { initialMessages?: Message[] }) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const formRef = useRef<HTMLFormElement>(null);

  const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], Message>(
    messages,
    (state, newMessage) => [...state, newMessage]
  );

  async function formAction(formData: FormData) {
    const messageText = formData.get("message") as string;

    const newMessage: Message = {
      text: messageText,
      sending: true
    };

    addOptimisticMessage(newMessage);
    formRef.current?.reset();

    try {
      const sentMessage = await deliverMessage(messageText);
      setMessages(prevMessages => [
        ...prevMessages,
        { ...newMessage, sending: false, text: sentMessage }
      ]);
    } catch (error) {
      console.log("Failed to send message:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        // { ...newMessage, sending: false, text: newMessage.text + " (Fehler beim Senden)" }
      ]);
    }
  }

  return (
    <div className="max-w-md shadow-lg border flex h-80 w-[400px] flex-col justify-between p-4 bg-white rounded">
      <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
        {optimisticMessages.map((message, idx) => (
          <div key={idx} className="p-2 bg-emerald-900 rounded text-white">
            {message.text}
            {message.sending && <small className="ml-2 text-gray-200">(sending...)</small>}
          </div>
        ))}
      </div>
      <form action={formAction} ref={formRef} className="flex gap-2">
        <Input 
          type="text" 
          name="message" 
          autoComplete="off"
          placeholder="Enter Message..." 
          className="flex-grow p-2 border rounded"
        />
        <Button type="submit">
          Send
        </Button>
      </form>
    </div>
  );
}