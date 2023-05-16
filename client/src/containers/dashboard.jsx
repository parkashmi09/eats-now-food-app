import React from "react";
import { DBLeft, DBRight } from "../components";
export default function Dashboard() {
  return (
    <div className="w-screen h-screen flex items-center bg-primary">
      <DBLeft />
      <DBRight />
    </div>
  );
}
