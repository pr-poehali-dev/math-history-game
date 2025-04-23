import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ChanceCardProps {
  message: string;
  onClose: () => void;
}

export const ChanceCard = ({ message, onClose }: ChanceCardProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-yellow-100 rounded-t-xl">
          <CardTitle className="flex items-center gap-2">
            <span className="text-yellow-500">⚡</span>
            Карта шанса
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-lg font-medium text-center">{message}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onClose}>
            Продолжить
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
