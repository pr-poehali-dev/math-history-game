
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ChanceCardProps {
  message: string;
  onClose: () => void;
}

export const ChanceCard = ({ message, onClose }: ChanceCardProps) => {
  const isSkipCard = message.includes("пропускаете");
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className={`${isSkipCard ? 'bg-red-100' : 'bg-yellow-100'} rounded-t-xl`}>
          <CardTitle>{isSkipCard ? "Пропуск хода" : "Шанс"}</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex justify-center mb-6">
            <div className={`w-16 h-16 rounded-full ${isSkipCard ? 'bg-red-100' : 'bg-yellow-100'} flex items-center justify-center text-3xl`}>
              {isSkipCard ? "⏭️" : "⚡"}
            </div>
          </div>
          <p className="text-lg font-medium text-center">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onClose} className={isSkipCard ? "bg-red-500 hover:bg-red-600" : "bg-yellow-500 hover:bg-yellow-600"}>
            {isSkipCard ? "Принять" : "Продолжить"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
