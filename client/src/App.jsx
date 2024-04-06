import AppRoutes from "./pages/router/AppRoutes";
import "./App.css";
import "./assets/stylesheets/form.css";
import "./assets/stylesheets/mainpage.css";
import "./assets/stylesheets/dropdown.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
      </QueryClientProvider>
    </div>
  );
}

export default App;
