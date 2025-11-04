// src/service/chatservice.ts
export async function sendChatMessage(payload: string) {
  try {
    const res = await fetch("https://eb7f4b922618.ngrok-free.app/continue", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
    });

    if (!res.ok) throw new Error("Failed to send message");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Chat API error:", error);
    return { response: "Error: Unable to get response" };
  }
}
