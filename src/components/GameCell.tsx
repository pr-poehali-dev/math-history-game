
import { Cell, PlayerData } from "./GameBoard";

interface GameCellProps {
  cell: Cell;
  players: PlayerData[];
}

export const GameCell = ({ cell, players }: GameCellProps) => {
  // Определяем стиль ячейки в зависимости от типа
  let cellStyle = "w-full aspect-square rounded flex flex-col items-center justify-center relative border shadow";
  
  switch (cell.type) {
    case "question":
      cellStyle += " bg-purple-100 border-purple-300";
      break;
    case "task":
      cellStyle += " bg-amber-100 border-amber-300";
      break;
    case "chance":
      cellStyle += " bg-yellow-100 border-yellow-300";
      break;
    case "skip":
      cellStyle += " bg-red-100 border-red-300";
      break;
    default:
      if (cell.id === 0) {
        cellStyle += " bg-green-100 border-green-300";
      } else if (cell.id === 24) { // Если это последняя ячейка (финиш)
        cellStyle += " bg-indigo-100 border-indigo-300";
      } else {
        cellStyle += " bg-gray-50 border-gray-200";
      }
  }

  return (
    <div className={cellStyle}>
      {/* Номер клетки */}
      <div className="absolute top-1 left-1 text-xs text-gray-500">{cell.id + 1}</div>
      
      {/* Содержимое клетки */}
      <div className="text-2xl font-bold">{cell.label}</div>
      {(cell.id === 0 || cell.id === 24) && (
        <div className="text-xs text-center mt-1">
          {cell.id === 0 ? "Старт" : "Финиш"}
        </div>
      )}
      
      {/* Фишки игроков */}
      {players.length > 0 && (
        <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
          {players.map((player) => (
            <div
              key={player.id}
              className={`w-3 h-3 rounded-full ${player.color}`}
              title={player.name}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};
