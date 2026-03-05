import { AlignResponse } from "../types";

const MAX_SITUATION_LENGTH = 2000;

export const generateAlignContent = async (situation: string): Promise<AlignResponse> => {
  const trimmed = situation.trim();

  if (trimmed.length > MAX_SITUATION_LENGTH) {
    throw new Error(`Input must be under ${MAX_SITUATION_LENGTH} characters.`);
  }

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ situation: trimmed }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(body.error || `Request failed (${response.status})`);
  }

  return response.json() as Promise<AlignResponse>;
};