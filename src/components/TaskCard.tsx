import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface TaskCardProps {
  task: string;
  onComplete: (successful: boolean) => void;
}

export const TaskCard = ({ task, onComplete }: TaskCardProps) => {
  const [timeLeft, setTimeLeft] = useState(30);
  
  // Эффект для отсчета времени
  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete(false);
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, onComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="relative bg-accent/20 rounded-t-xl">
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold">
            {timeLeft}
          </div>
          <CardTitle>Задание</CardTitle>
          <CardDescription>Выполните задание и получите 3 очка</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-lg font-medium mb-6">{task}</p>
          
          <div className="bg-muted p-4 rounded-lg text-center text-muted-foreground">
            Другие игроки должны оценить, насколько хорошо вы выполнили задание
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => onComplete(false)}>
            Не выполнено
          </Button>
          <Button onClick={() => onComplete(true)}>
            Выполнено успешно
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
