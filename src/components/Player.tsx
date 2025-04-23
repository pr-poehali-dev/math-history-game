
import { PlayerData } from "./GameBoard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PlayerProps {
  player: PlayerData;
  isActive: boolean;
  onRemove?: () => void;
}

export const Player = ({ player, isActive, onRemove }: PlayerProps) => {
  return (
    <div className={`p-3 rounded-lg border ${isActive ? 'bg-purple-50 border-purple-300' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full ${player.color} flex items-center justify-center text-white font-bold text-sm`}>
            {player.id}
          </div>
          <div>
            <div className="font-medium">{player.name}</div>
            <div className="text-sm text-gray-500">
              Позиция: {player.position + 1}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {player.skipNextTurn && (
            <Badge variant="outline" className="border-red-200 text-red-500">
              Пропуск хода
            </Badge>
          )}
          <Badge className="bg-purple-700">{player.score} очков</Badge>
          {onRemove && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500"
              onClick={onRemove}
            >
              <X size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
