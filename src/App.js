import "./App.css";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Skills from "./components/skills";

function App() {
  return (
    <div className="App">
      <Tabs>
        <TabList>
          <Tab>Skills</Tab>
          <Tab>Salaries</Tab>
          <Tab>About</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Skills />
          </TabPanel>
          <TabPanel>
            <p>Salaries</p>
          </TabPanel>
          <TabPanel>
            <p>th?ree!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default App;
