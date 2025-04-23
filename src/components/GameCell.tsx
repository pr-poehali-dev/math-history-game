import { Cell, PlayerData } from "@/components/GameBoard";

interface GameCellProps {
  cell: Cell;
  players: PlayerData[];
}

export const GameCell = ({ cell, players }: GameCellProps) => {
  // Определяем цвет ячейки в зависимости от типа
  const getCellColor = () => {
    switch (cell.type) {
      case "question":
        return "bg-primary/20";
      case "task":
        return "bg-accent/30";
      case "chance":
        return "bg-yellow-100";
      case "skip":
        return "bg-red-100";
      default:
        return cell.id === 0 
          ? "bg-green-100" 
          : "bg-muted";
    }
  };

  return (
    <div 
      className={`${getCellColor()} aspect-square rounded-lg border flex flex-col items-center justify-center p-1 relative`}
    >
      {/* Номер ячейки */}
      <span className="text-xs absolute top-1 left-1">{cell.id}</span>
      
      {/* Метка ячейки */}
      <span className="text-xl">{cell.label}</span>
      
      {/* Игроки на ячейке */}
      {players.length > 0 && (
        <div className="absolute bottom-1 right-1 flex -space-x-1">
          {players.map((player) => (
            <div 
              key={player.id}
              className={`w-4 h-4 rounded-full ${player.color} border border-white z-10`}
              title={player.name}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};
