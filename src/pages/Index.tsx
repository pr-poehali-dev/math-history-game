
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { BookOpenText, Users, Award, DicesIcon, Brain, Clock } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <header className="pt-16 pb-12 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-900 mb-4">История математических открытий</h1>
        <p className="text-xl text-purple-700 max-w-2xl mx-auto">
          Увлекательная настольная игра для любителей математики и науки
        </p>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="flex flex-col items-center justify-center mb-12">
          <Button size="lg" className="text-lg bg-purple-700 hover:bg-purple-800" asChild>
            <Link to="/game">Начать игру</Link>
          </Button>
        </div>

        <Card className="mb-12 border-purple-200 shadow-lg">
          <CardHeader className="bg-purple-100 rounded-t-lg">
            <CardTitle className="text-2xl text-purple-900">О игре</CardTitle>
            <CardDescription>Увлекательное путешествие в мир математических открытий</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-lg mb-4">
              "История математических открытий" - это настольная игра, которая позволяет игрокам погрузиться в увлекательный 
              мир математики, узнать о великих математиках и их открытиях, а также проверить свои знания в этой области.
            </p>
            <p className="text-lg">
              Игроки перемещаются по игровому полю, отвечают на вопросы, выполняют задания и собирают очки. Победителем становится 
              тот, кто наберет больше всего очков к концу игры или первым достигнет финиша.
            </p>
          </CardContent>
        </Card>

        <Tabs defaultValue="rules" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rules">Правила</TabsTrigger>
            <TabsTrigger value="components">Компоненты</TabsTrigger>
            <TabsTrigger value="tips">Советы</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rules" className="p-6 bg-white rounded-lg shadow border mt-2">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Правила игры</h2>
            
            <div className="space-y-6">
              <div className="flex gap-3">
                <Award className="h-6 w-6 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Цель игры</h3>
                  <p>Собрать как можно больше очков, отвечая на вопросы и выполняя задания, связанные с историей математических открытий.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Users className="h-6 w-6 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Количество игроков</h3>
                  <p>От 2 до 6 человек.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <DicesIcon className="h-6 w-6 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Ход игры</h3>
                  <ol className="list-decimal list-inside space-y-2 ml-4">
                    <li>Игрок бросает кубик и перемещает фишку на соответствующее количество клеток.</li>
                    <li>В зависимости от клетки, игрок выполняет действие:</li>
                    <ul className="list-disc list-inside ml-8 space-y-1">
                      <li><strong>Клетка с вопросом (?):</strong> Ответьте на вопрос. Правильный ответ = 2 очка.</li>
                      <li><strong>Клетка с заданием (!):</strong> Выполните задание. Успешное выполнение = 3 очка.</li>
                      <li><strong>Клетка "Шанс" (⚡):</strong> Вытяните карточку шанса (может дать или забрать очки).</li>
                      <li><strong>Клетка "Пропуск хода" (⏭️):</strong> Пропустите следующий ход.</li>
                    </ul>
                    <li>Ход переходит к следующему игроку.</li>
                  </ol>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Clock className="h-6 w-6 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Завершение игры</h3>
                  <p>Игра заканчивается, когда один из игроков достигает финиша. Побеждает игрок с наибольшим количеством очков.</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="components" className="p-6 bg-white rounded-lg shadow border mt-2">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Компоненты игры</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Игровое поле</h3>
                <p>25 клеток с различными типами: вопросы, задания, шансы и пропуск хода.</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Игроки</h3>
                <p>От 2 до 6 игроков, каждый со своей фишкой и счетчиком очков.</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Карточки вопросов</h3>
                <p>Содержат вопросы о математиках и их открытиях с вариантами ответов.</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Карточки заданий</h3>
                <p>Творческие или логические задания, связанные с математикой.</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Карточки шанса</h3>
                <p>Случайные события, влияющие на количество очков игрока.</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-purple-900 mb-2">Таймер</h3>
                <p>30 секунд на ответ или выполнение задания.</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tips" className="p-6 bg-white rounded-lg shadow border mt-2">
            <h2 className="text-2xl font-bold text-purple-900 mb-4">Советы для игроков</h2>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <Brain className="h-6 w-6 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Стратегия</h3>
                  <p>Выбирайте рисковые стратегии для заданий, чтобы получить максимум очков. Задания дают больше очков, чем вопросы!</p>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex gap-3">
                <BookOpenText className="h-6 w-6 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Подготовка</h3>
                  <p>Освежите в памяти основные факты из истории математики:</p>
                  <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                    <li>Великие математики (Евклид, Пифагор, Ньютон, Гаусс, и др.)</li>
                    <li>Важные теоремы и формулы</li>
                    <li>Ключевые даты математических открытий</li>
                    <li>Вклад математиков в развитие науки</li>
                  </ul>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex gap-3">
                <Users className="h-6 w-6 text-purple-700 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-1">Командная игра</h3>
                  <p>Можно играть командами, особенно если участники имеют разный уровень знаний в математике. Это сделает игру более сбалансированной.</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold text-purple-900 mb-6">Готовы проверить свои знания?</h2>
          <Button size="lg" className="text-lg bg-purple-700 hover:bg-purple-800" asChild>
            <Link to="/game">Начать игру</Link>
          </Button>
        </div>
      </main>
      
      <footer className="bg-purple-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2023 История математических открытий</p>
          <p className="text-purple-200 mt-2">Образовательная настольная игра</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
