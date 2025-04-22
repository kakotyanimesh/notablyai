"use client"
import { useTheme } from "next-themes";


export default function Home() {
  const {setTheme} = useTheme()
  return (
    <div>
      animesh 
      <button onClick={() => setTheme("dark")}>switch theme</button>
      <button onClick={() => setTheme("light")}>switch theme</button>
      <h1>ANime' asdasd</h1>
    </div>
  );
}
