export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  reasoningContent?: string; // 添加可选的思维链内容字段
  timestamp?: number; // Optional, could be used for message timing
}

export interface ChatResponse {
  role: "assistant";
  content: string;
}

export interface ChatContext {
  messages: ChatMessage[];
  maxLength?: number;
}
