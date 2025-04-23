import { PlayerData } from "@/components/GameBoard";

interface PlayerProps {
  player: PlayerData;
  isActive: boolean;
}

export const Player = ({ player, isActive }: PlayerProps) => {
  return (
    <div className={`p-3 rounded-lg flex items-center justify-between ${
      isActive ? 'bg-primary/10 border border-primary/30' : 'bg-muted'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-full ${player.color} flex items-center justify-center text-white font-bold`}>
          {player.id}
        </div>
        <div>
          <div className="font-medium">{player.name}</div>
          <div className="text-sm text-muted-foreground">
            Позиция: {player.position}
            {player.skipNextTurn && " (пропускает ход)"}
          </div>
        </div>
      </div>
      <div className="text-2xl font-bold">{player.score}</div>
    </div>
  );
};
