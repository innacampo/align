export interface ScriptOption {
  type: string;
  tone: string;
  content: string;
}

export interface AlignResponse {
  reframe: string;
  science: string;
  scripts: ScriptOption[];
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';