
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GameBoard from "@/components/GameBoard";

const GamePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-50 to-white">
      <header className="p-4 bg-purple-800 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">История математических открытий</h1>
          <Button variant="secondary" size="sm" asChild>
            <Link to="/">На главную</Link>
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4 text-purple-900">Игровое поле</h2>
          <p className="text-lg text-purple-700 mb-6">
            Бросайте кубик, двигайтесь по полю и отвечайте на вопросы о великих математиках и их открытиях.
          </p>
        </div>
        
        <GameBoard />
      </main>
      
      <footer className="bg-purple-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>© 2023 История математических открытий</p>
        </div>
      </footer>
    </div>
  );
};

export default GamePage;
