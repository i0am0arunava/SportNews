import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ThemeContext } from "./context/theme";
import { ProjectsProvider } from "./context/projects/context";
import { MembersProvider } from "./context/members/context";
import { ArticlesProvider } from "./context/article/context";
import {SportsProvider} from "./context/sport/context"
import {MatchesProvider} from "./context/Match/context"
import {PreferProvider} from "./context/prefer/context"
const App = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`h-screen w-full mx-auto py-2 ${
        theme === "light" ? "dark" : ""
      }`}
    >
      <PreferProvider>
      <MatchesProvider>
      <SportsProvider>
      <ProjectsProvider>
        <MembersProvider>
          <ArticlesProvider>
          <>
          <RouterProvider router={router} />
          </>
          </ArticlesProvider>
        </MembersProvider>
      </ProjectsProvider>
      </SportsProvider>
      </MatchesProvider>
      </PreferProvider>
    </div>
  );
};

export default App;
