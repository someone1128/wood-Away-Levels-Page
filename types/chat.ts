export interface ChatMessage {
  role: "system" | "user" | "assistant" | "error";
  content: string;
  timestamp?: number; // Optional, could be used for message timing
  error?: string;
}

export interface ChatResponse {
  role: "assistant" | "error";
  content: string;
  error?: string;
}

export interface ChatContext {
  messages: ChatMessage[];
  maxLength?: number;
}
