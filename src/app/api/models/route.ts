import { NextResponse } from "next/server";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export async function GET() {
  try {
    const { stdout } = await execPromise("ollama list");
    const lines = stdout.trim().split("\n").slice(1); // Remove header line
    const installedModels = lines.map((line) => {
      const [fullName, id, size, ...modifiedParts] = line.trim().split(/\s+/);
      const name = fullName.split(":")[0]; // Remove ':latest' suffix
      const sizeNumber = parseFloat(size);
      const sizeUnit = size.replace(/\d+(\.\d+)?/, "").trim();
      const formattedSize = `${sizeNumber} ${sizeUnit}`;
      return { id, name, size: formattedSize };
    });

    const allModels = [
      { id: "llama2", name: "Llama 2" },
      { id: "llama3", name: "Llama 3" },
      { id: "codellama", name: "Code Llama" },
      { id: "mistral", name: "Mistral" },
      { id: "neural-chat", name: "Neural Chat" },
      { id: "starling-lm", name: "Starling" },
      { id: "phi", name: "Phi-2" },
      { id: "orca-mini", name: "Orca Mini" },
      { id: "vicuna", name: "Vicuna" },
    ];

    const modelStatus = allModels.map((model) => {
      const installedModel = installedModels.find((im) => im.name === model.id);
      return {
        id: model.id,
        name: model.name,
        installed: !!installedModel,
        size: installedModel?.size || null,
        actualId: installedModel?.id || null,
      };
    });

    return NextResponse.json({ models: modelStatus });
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    );
  }
}
