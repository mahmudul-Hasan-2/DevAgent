import BlueprintGenerator from "@/components/BlueprintGenerator";

export default function GeneratePage() {
  return (
    <main className="min-h-screen py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Project Blueprint Generator</h1>
          <p className="text-muted-foreground mt-2">
            Describe your idea and get a complete structured project plan powered by AI.
          </p>
        </div>

        <BlueprintGenerator />
      </div>
    </main>
  );
}
