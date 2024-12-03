"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (!inputValue) {
      console.error("Input is empty");
      return;
    }

    // Your logic here, you can replace this with your desired functionality
    console.log("Submitted value:", inputValue);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow p-4 fixed w-full z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
      </header>
      <main className="flex-grow pt-20 p-8">
        <h2 className="text-xl font-semibold">Your Form</h2>
        <div className="mt-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter some value"
            className="border p-2 mr-2 w-full max-w-md"
          />
          <Button onClick={handleSubmit} className="w-auto">
            Submit
          </Button>
        </div>
      </main>
    </div>
  );
}
