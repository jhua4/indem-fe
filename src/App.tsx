import About from "@/components/About";
import CrawlerHistory from "@/components/CrawlerHistory";
import Skills from "@/components/Skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "./components/ui/label";

function App() {
  return (
    <main className="flex flex-col items-center h-screen p-8 pb-0">
      <Label className="self-start pl-1 pb-4 text-xl">indem</Label>
      <Tabs defaultValue="skills" className="w-full h-full">
        <TabsList>
          <TabsTrigger value="skills">skills</TabsTrigger>
          <TabsTrigger value="about">about</TabsTrigger>
          <TabsTrigger value="crawler-history">crawler history</TabsTrigger>
        </TabsList>
        <TabsContent value="skills" className="w-full h-full mt-8">
          <Skills />
        </TabsContent>
        <TabsContent value="about" className="w-full h-full mt-8">
          <About />
        </TabsContent>
        <TabsContent value="crawler-history" className="w-full h-full mt-8">
          <CrawlerHistory />
        </TabsContent>
      </Tabs>
    </main>
  );
}

export default App;
