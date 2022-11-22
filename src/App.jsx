import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";
import Comments from "./components/comments/Comments";
import CompetitionDetailPage from "./pages/CompetitionDetailPage";
import CompetitionLayout from "./pages/CompetitionLayout";
import Competitions from "./pages/Competitions";
import CompetitionsLayout from "./pages/CompetitionsLayout";
import Favorites from "./pages/Favorites";
import NewCompetition from "./pages/NewCompetition";
import RootLayout from "./pages/RootLayout";
import WelcomePage from "./pages/Welcome";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<WelcomePage />} />
      <Route path="/competitions/*" element={<CompetitionsLayout />}>
        <Route index element={<Competitions />} />
        <Route path=":id" element={<CompetitionLayout />}>
          <Route index element={<CompetitionDetailPage />} />
          <Route
            path="comments"
            element={
              <>
                <CompetitionDetailPage />
                <Comments />
              </>
            }
          />
        </Route>
      </Route>
      <Route path="/new-competition" element={<NewCompetition />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
