"use client";

import React, { useState, useEffect } from "react";
import { useModelStore } from "@/store/modelStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
function SettingsPage() {
  const { models, currentModel, setCurrentModel } = useModelStore();
  const [isDownloading, setIsDownloading] = useState(false);
  const [installedModels, setInstalledModels] = useState<string[]>([]);

  const handleModelChange = (modelId: string) => {
    const selectedModel = models.find((model) => model.id === modelId);
    if (selectedModel) {
      setCurrentModel(selectedModel);
    }
  };

  const downloadModel = async (modelId: string) => {
    setIsDownloading(true);
    try {
      // Replace this with actual API call to Ollama to pull the model
    } catch (error) {
      toast({
        title: "Download failed",
        description:
          "There was an error downloading the model. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Model Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleModelChange} value={currentModel.id}>
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model.id} value={model.id}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Available Models</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {models.map((model) => (
              <li key={model.id} className="flex justify-between items-center">
                <span>{model.name}</span>
                {installedModels.includes(model.id) ? (
                  <span className="text-green-500">Installed</span>
                ) : (
                  <Button
                    onClick={() => downloadModel(model.id)}
                    disabled={isDownloading}
                  >
                    {isDownloading ? "Downloading..." : "Download"}
                  </Button>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsPage;
