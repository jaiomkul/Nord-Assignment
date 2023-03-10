import { useEffect, useState } from "react";
import { Home } from "../Route/Home";

function SplashScreen() {
  // Set up state to track whether the app has finished loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to show the Splash screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Change the delay time as needed

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div id="bg-ig">
        <h1 className="text-center pt-10 font-bol text-2xl">
          Welcome to my App
        </h1>
      </div>
    );
  }

  return <Home></Home>;
}

export default SplashScreen;
