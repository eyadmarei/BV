import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Home from "@/pages/home";
import Properties from "@/pages/properties";
import Projects from "@/pages/projects";
import Services from "@/pages/services";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import BuySell from "@/pages/buy-sell";
import PMTools from "@/pages/pm-tools";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/properties" component={Properties} />
      <Route path="/properties/:type" component={Properties} />
      <Route path="/projects" component={Projects} />
      <Route path="/services" component={Services} />
      <Route path="/about" component={About} />
      <Route path="/buy-sell" component={BuySell} />
      <Route path="/pm-tools" component={PMTools} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-white">
          <Navigation />
          <Router />
          <Footer />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
