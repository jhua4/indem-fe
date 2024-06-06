import Skills from "@/components/skills";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function App() {
  return (
    <main className="flex flex-col items-center h-screen p-12">
      {/* <div className="flex flex-col items-center gap-y-4">
        <div className="inline-flex items-center gap-x-4">
          <img src={ReactSVG} alt="React Logo" className="w-32" />
          <span className="text-6xl">+</span>
          <img src={'/vite.svg'} alt="Vite Logo" className="w-32" />
        </div>
        <a href="https://ui.shadcn.com" rel="noopener noreferrer nofollow" target="_blank">
          <Badge variant="outline">shadcn/ui</Badge>
        </a>
        <CountBtn />
      </div> */}
      <Tabs defaultValue="skills" className="w-full h-full">
        <TabsList>
          <TabsTrigger value="skills">skills</TabsTrigger>
          <TabsTrigger value="about">how it works</TabsTrigger>
        </TabsList>
        <TabsContent value="skills" className="w-full h-full p-12">
          <Skills />
        </TabsContent>
        <TabsContent value="about">who knows</TabsContent>
      </Tabs>
    </main>
  );
}

export default App;
