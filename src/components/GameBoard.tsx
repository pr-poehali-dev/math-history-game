
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GameCell } from "@/components/GameCell";
import { Player } from "@/components/Player";
import { QuestionCard } from "@/components/QuestionCard";
import { TaskCard } from "@/components/TaskCard";
import { ChanceCard } from "@/components/ChanceCard";

// Типы ячеек на игровом поле
export type CellType = "question" | "task" | "chance" | "skip" | "normal";

// Клетка игрового поля
export interface Cell {
  id: number;
  type: CellType;
  label: string;
}

// Игрок
export interface PlayerData {
  id: number;
  name: string;
  color: string;
  position: number;
  score: number;
  skipNextTurn: boolean;
}

// Создаем игровое поле
const createGameBoard = (size = 25): Cell[] => {
  return Array.from({ length: size }, (_, i) => {
    // Распределяем типы ячеек
    let type: CellType = "normal";
    
    if (i === 0) {
      type = "normal"; // Стартовая ячейка
    } else if (i === size - 1) {
      type = "normal"; // Финишная ячейка
    } else {
      // Равномерно распределяем типы ячеек
      const random = Math.random();
      if (random < 0.35) {
        type = "question";
      } else if (random < 0.65) {
        type = "task";
      } else if (random < 0.85) {
        type = "chance";
      } else {
        type = "skip";
      }
    }

    // Готовим подписи для ячеек
    let label = "";
    switch (type) {
      case "question":
        label = "?";
        break;
      case "task":
        label = "!";
        break;
      case "chance":
        label = "⚡";
        break;
      case "skip":
        label = "⏭️";
        break;
      default:
        label = i === 0 ? "Старт" : i === size - 1 ? "Финиш" : "";
    }

    return {
      id: i,
      type,
      label
    };
  });
};

// Вопросы о математиках и их открытиях
const mathQuestions = [
  {
    question: "Кто доказал теорему о неполноте формальных арифметических систем?",
    options: ["Курт Гёдель", "Давид Гильберт", "Алан Тьюринг", "Бертран Рассел"],
    correctAnswer: "Курт Гёдель"
  },
  {
    question: "Кто из математиков первым описал неевклидову геометрию?",
    options: ["Николай Лобачевский", "Эвклид", "Альберт Эйнштейн", "Рене Декарт"],
    correctAnswer: "Николай Лобачевский"
  },
  {
    question: "Кто автор 'Начал' — одного из самых влиятельных трудов в истории математики?",
    options: ["Евклид", "Архимед", "Пифагор", "Фалес"],
    correctAnswer: "Евклид"
  },
  {
    question: "Кто из ученых разработал основы дифференциального и интегрального исчисления?",
    options: ["Исаак Ньютон и Готфрид Лейбниц", "Рене Декарт и Блез Паскаль", "Леонард Эйлер и Карл Гаусс", "Пьер де Ферма и Якоб Бернулли"],
    correctAnswer: "Исаак Ньютон и Готфрид Лейбниц"
  },
  {
    question: "Кто сформулировал знаменитую теорему Пифагора?",
    options: ["Пифагор", "Фалес", "Гиппократ", "Аристотель"],
    correctAnswer: "Пифагор"
  }
];

// Задания
const mathTasks = [
  "Нарисуйте или объясните, что такое число Пи и где оно применяется в математике.",
  "Изобразите схематически доказательство теоремы Пифагора.",
  "Объясните принцип математической индукции и приведите пример.",
  "Опишите три важнейших достижения математики 20-го века.",
  "Расскажите о вкладе женщин-математиков в развитие науки."
];

// Карты шанса
const chanceCards = [
  { content: "Вы нашли старый учебник математики! +2 очка", score: 2 },
  { content: "Вы забыли формулу. -1 очко", score: -1 },
  { content: "Ваше открытие произвело фурор в научном сообществе! +3 очка", score: 3 },
  { content: "Вы случайно опрокинули чернила на свои расчеты. -2 очка", score: -2 },
  { content: "Вы получили грант на продолжение исследований! +2 очка", score: 2 }
];

const GameBoard = () => {
  // Игровое поле
  const [cells] = useState<Cell[]>(createGameBoard());
  
  // Игроки
  const [players, setPlayers] = useState<PlayerData[]>([
    { id: 1, name: "Игрок 1", color: "bg-blue-500", position: 0, score: 0, skipNextTurn: false },
    { id: 2, name: "Игрок 2", color: "bg-red-500", position: 0, score: 0, skipNextTurn: false }
  ]);
  
  // Текущий игрок
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  
  // Результат броска кубика
  const [diceResult, setDiceResult] = useState(0);
  
  // Статус игры
  const [gameStatus, setGameStatus] = useState<"idle" | "rolling" | "moved" | "action" | "complete">("idle");
  
  // Открытая карточка
  const [activeCard, setActiveCard] = useState<{
    type: CellType;
    content: string;
    options?: string[];
    correctAnswer?: string;
  } | null>(null);

  // Бросок кубика
  const rollDice = () => {
    if (gameStatus !== "idle") return;
    
    // Анимация броска
    setGameStatus("rolling");
    
    const rollInterval = setInterval(() => {
      setDiceResult(Math.floor(Math.random() * 6) + 1);
    }, 100);
    
    // Останавливаем анимацию через 1 секунду
    setTimeout(() => {
      clearInterval(rollInterval);
      setGameStatus("moved");
      
      // Перемещаем игрока
      const currentPlayer = players[currentPlayerIndex];
      
      if (currentPlayer.skipNextTurn) {
        // Если игрок пропускает ход
        const updatedPlayers = [...players];
        updatedPlayers[currentPlayerIndex].skipNextTurn = false;
        setPlayers(updatedPlayers);
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
        setGameStatus("idle");
        return;
      }
      
      // Вычисляем новую позицию
      const newPosition = Math.min(currentPlayer.position + diceResult, cells.length - 1);
      
      // Обновляем позицию игрока
      const updatedPlayers = [...players];
      updatedPlayers[currentPlayerIndex].position = newPosition;
      setPlayers(updatedPlayers);
      
      // Если игрок достиг финиша
      if (newPosition === cells.length - 1) {
        setGameStatus("complete");
        return;
      }
      
      // Проверяем тип ячейки и открываем соответствующую карточку
      const cellType = cells[newPosition].type;
      
      if (cellType === "question") {
        // Выбираем случайный вопрос
        const randomQuestion = mathQuestions[Math.floor(Math.random() * mathQuestions.length)];
        
        setActiveCard({
          type: "question",
          content: randomQuestion.question,
          options: randomQuestion.options,
          correctAnswer: randomQuestion.correctAnswer
        });
      } else if (cellType === "task") {
        // Выбираем случайное задание
        const randomTask = mathTasks[Math.floor(Math.random() * mathTasks.length)];
        
        setActiveCard({
          type: "task",
          content: randomTask
        });
      } else if (cellType === "chance") {
        // Случайная карта шанса
        const randomChance = chanceCards[Math.floor(Math.random() * chanceCards.length)];
        
        setActiveCard({
          type: "chance",
          content: randomChance.content
        });
        
        // Сразу начисляем очки для карт шанса
        const chanceUpdatedPlayers = [...players];
        chanceUpdatedPlayers[currentPlayerIndex].score += randomChance.score;
        setPlayers(chanceUpdatedPlayers);
      } else if (cellType === "skip") {
        setActiveCard({
          type: "skip",
          content: "Вы пропускаете следующий ход!"
        });
        
        // Отмечаем пропуск хода
        const skipUpdatedPlayers = [...players];
        skipUpdatedPlayers[currentPlayerIndex].skipNextTurn = true;
        setPlayers(skipUpdatedPlayers);
      } else {
        // Обычная клетка
        setGameStatus("idle");
        setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
      }
      
      if (cellType !== "normal") {
        setGameStatus("action");
      }
    }, 1000);
  };

  // Обработка ответа на вопрос
  const handleQuestionAnswer = (answer: string) => {
    if (!activeCard) return;
    
    const updatedPlayers = [...players];
    
    // Если ответ правильный
    if (answer === activeCard.correctAnswer) {
      updatedPlayers[currentPlayerIndex].score += 2;
    }
    
    setPlayers(updatedPlayers);
    setActiveCard(null);
    setGameStatus("idle");
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  // Обработка выполнения задания
  const handleTaskComplete = (successful: boolean) => {
    const updatedPlayers = [...players];
    
    if (successful) {
      updatedPlayers[currentPlayerIndex].score += 3;
    }
    
    setPlayers(updatedPlayers);
    setActiveCard(null);
    setGameStatus("idle");
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  // Закрытие карточки шанса
  const closeChanceCard = () => {
    setActiveCard(null);
    setGameStatus("idle");
    setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
  };

  // Добавление нового игрока
  const addPlayer = () => {
    if (players.length >= 6) return; // Максимум 6 игроков
    
    const colors = ["bg-blue-500", "bg-red-500", "bg-green-500", "bg-yellow-500", "bg-purple-500", "bg-orange-500"];
    const newPlayer: PlayerData = {
      id: players.length + 1,
      name: `Игрок ${players.length + 1}`,
      color: colors[players.length % colors.length],
      position: 0,
      score: 0,
      skipNextTurn: false
    };
    
    setPlayers([...players, newPlayer]);
  };

  // Удаление игрока
  const removePlayer = (id: number) => {
    if (players.length <= 2) return; // Минимум 2 игрока
    
    const updatedPlayers = players.filter(player => player.id !== id);
    setPlayers(updatedPlayers);
    setCurrentPlayerIndex(currentPlayerIndex % updatedPlayers.length);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-xl shadow-md border">
        <h3 className="text-2xl font-bold mb-4 text-purple-900">Игровое поле</h3>
        
        <div className="grid grid-cols-5 gap-2 mb-6">
          {cells.map((cell) => (
            <GameCell 
              key={cell.id} 
              cell={cell} 
              players={players.filter(p => p.position === cell.id)}
            />
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <h4 className="font-medium mb-1">Ход игрока:</h4>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full ${players[currentPlayerIndex]?.color || 'bg-gray-300'}`}></div>
              <span className="font-bold">{players[currentPlayerIndex]?.name || 'Неизвестный игрок'}</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="text-4xl font-mono mb-2">{diceResult || '?'}</span>
            <Button 
              onClick={rollDice} 
              disabled={gameStatus !== "idle"}
              variant="default"
              className="bg-purple-700 hover:bg-purple-800"
            >
              {gameStatus === "rolling" ? "Бросаем..." : "Бросить кубик"}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-purple-900">Игроки</h3>
            <div className="flex gap-2">
              <Button 
                onClick={addPlayer} 
                size="sm" 
                variant="outline" 
                disabled={players.length >= 6}
              >
                + Добавить
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            {players.map((player) => (
              <Player 
                key={player.id} 
                player={player} 
                isActive={players[currentPlayerIndex].id === player.id}
                onRemove={players.length > 2 ? () => removePlayer(player.id) : undefined}
              />
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border">
          <h3 className="text-2xl font-bold mb-4 text-purple-900">Легенда</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center text-lg font-bold">?</div>
              <span>Вопрос (2 очка)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-amber-100 flex items-center justify-center text-lg font-bold">!</div>
              <span>Задание (3 очка)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-yellow-100 flex items-center justify-center text-lg">⚡</div>
              <span>Шанс</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center text-lg">⏭️</div>
              <span>Пропуск хода</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Карточки */}
      {activeCard && activeCard.type === "question" && (
        <QuestionCard 
          question={activeCard.content} 
          options={activeCard.options || []} 
          onAnswer={handleQuestionAnswer} 
        />
      )}
      
      {activeCard && activeCard.type === "task" && (
        <TaskCard 
          task={activeCard.content} 
          onComplete={handleTaskComplete} 
        />
      )}
      
      {activeCard && activeCard.type === "chance" && (
        <ChanceCard 
          message={activeCard.content} 
          onClose={closeChanceCard} 
        />
      )}
      
      {activeCard && activeCard.type === "skip" && (
        <ChanceCard 
          message={activeCard.content} 
          onClose={closeChanceCard} 
        />
      )}
      
      {/* Финальное сообщение */}
      {gameStatus === "complete" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl max-w-md">
            <h2 className="text-3xl font-bold mb-4 text-purple-900">Игра завершена!</h2>
            <p className="text-xl mb-6">Поздравляем! Один из игроков достиг финиша.</p>
            
            <h3 className="text-xl font-semibold mb-2">Результаты:</h3>
            <div className="space-y-2 mb-6">
              {[...players].sort((a, b) => b.score - a.score).map((player, index) => (
                <div key={player.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {index === 0 && <span className="text-2xl">🏆</span>}
                    <div className={`w-4 h-4 rounded-full ${player.color}`}></div>
                    <span>{player.name}</span>
                  </div>
                  <span className="font-bold">{player.score} очков</span>
                </div>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex justify-end">
              <Button onClick={() => window.location.reload()} className="bg-purple-700 hover:bg-purple-800">
                Новая игра
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameBoard;
