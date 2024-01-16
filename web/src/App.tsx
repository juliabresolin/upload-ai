import { Button } from "./components/ui/button";
import { Github, Wand2 } from 'lucide-react'
import { Separator } from "./components/ui/separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Slider } from "./components/ui/slider";
import { VideoInputForm } from "./components/video-input-form";
import { PromptSelect } from "./components/prompt-select";
import { useState } from "react";
import { useCompletion } from 'ai/react'
import { ThemeProvider } from "./contexts/theme-provider";
import { ThemeToggle } from "./components/theme-toggle";


export function App() {
  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  const { input, setInput, handleInputChange, handleSubmit, completion, isLoading } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature
    }
  })

  function goToGithub() {
    window.open('https://github.com/juliabresolin', '_blank')
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.ai</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Desenvolvido com ❤️</span>

            <Separator orientation="vertical" className="h-6" />
            <Button variant={"outline"} onClick={goToGithub}>
              <Github className="w-4 h-4 mr-2" />
              Github
            </Button>
            <ThemeToggle />
          </div>
        </div>

        <main className="flex-1 p-6 flex flex-col gap-6 md:flex-row ">
          <div className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea placeholder="Inclua o prompt para a IA..." className="resize-none p-4 leading-relaxed" value={input} onChange={handleInputChange} />
              <Textarea placeholder="Resultado gerado pela IA..." readOnly className="resize-none p-4 leading-relaxed" value={completion} />
            </div>

            <p className="text-sm text-muted-foreground">
              Lembre-se você pode utilizar a variável <code className="text-primary">{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição
              do conteúdo do vídeo selecionado.</p>
          </div>

          <aside className="w-full space-y-6 md:w-80">
            <VideoInputForm onVideoUploaded={setVideoId} />

            <Separator />

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Prompt</Label>
                <PromptSelect onPromptSelect={setInput} />
              </div>

              <div className="space-y-2">
                <Label>Modelo</Label>
                <Select defaultValue="gpt3.5" disabled>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>
                <small className="block text-xs text-muted-foreground italic">Você poderá customizar essa opção em breve.</small>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Temperatura</Label>
                <div className="flex gap-4">
                  <Slider min={0} max={1} step={0.1} value={[temperature]} onValueChange={value => setTemperature(value[0])} />
                  <span className="text-sm italic text-muted-foreground">{temperature}</span>
                </div>
                <small className="block text-xs text-muted-foreground italic leading-relaxed">Valores mais altos tendem a deixar o resultado mais criativo porém com possíveis erros.</small>
              </div>

              <Separator />

              <Button type="submit" className="w-full" disabled={isLoading}>
                Executar
                <Wand2 className="w-4 h-4 ml-2" />
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </ThemeProvider>
  )
}

