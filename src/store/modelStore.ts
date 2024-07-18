import { create } from "zustand";

export type OllamaModel = {
  id: string;
  name: string;
};

type ModelStore = {
  models: OllamaModel[];
  currentModel: OllamaModel;
  setCurrentModel: (model: OllamaModel) => void;
};

const ollamaModels: OllamaModel[] = [
  { id: "llama2", name: "Llama 2" },
  { id: "codellama", name: "Code Llama" },
  { id: "mistral", name: "Mistral" },
  { id: "neural-chat", name: "Neural Chat" },
  { id: "starling-lm", name: "Starling" },
  { id: "phi", name: "Phi-2" },
  {
    id: "orca-mini",
    name: "Orca Mini",
  },
  {
    id: "vicuna",
    name: "Vicuna",
  },
];

export const useModelStore = create<ModelStore>((set) => ({
  models: ollamaModels,
  setCurrentModel: (model) => set({ currentModel: model }),
  currentModel: ollamaModels[0],
}));
