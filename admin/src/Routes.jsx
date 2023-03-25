import { Routes, Route } from "react-router-dom";
import Chat from "./Pages/Chat";
import Transactions from "./Pages/Transactions";
import Users from "./Pages/Users";

export default function Rotes() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/chats" element={<Chat />} />


    </Routes>
  );
}
