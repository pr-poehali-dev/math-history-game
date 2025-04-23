import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (answer: string) => void;
}

export const QuestionCard = ({ question, options, onAnswer }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [timeLeft, setTimeLeft] = useState(30);
  
  // Эффект для отсчета времени
  React.useEffect(() => {
    if (timeLeft <= 0) {
      onAnswer("");
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, onAnswer]);
  
  const handleSubmit = () => {
    onAnswer(selectedAnswer);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="relative bg-primary/10 rounded-t-xl">
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
            {timeLeft}
          </div>
          <CardTitle>Вопрос</CardTitle>
          <CardDescription>Ответьте правильно и получите 2 очка</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-lg font-medium mb-6">{question}</p>
          
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => onAnswer("")}>
            Пропустить
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedAnswer}>
            Ответить
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
