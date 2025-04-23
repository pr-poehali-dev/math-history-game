import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-6 bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">История математических открытий</h1>
          <p className="text-xl opacity-90">Настольная игра о великих математиках и их открытиях</p>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Путешествие в мир математики!</h2>
            <p className="text-xl mb-6">
              Отправьтесь в увлекательное путешествие по истории математических открытий,
              отвечайте на вопросы, выполняйте задания и узнавайте о великих математиках и их вкладе в науку.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link to="/game">Начать игру</Link>
              </Button>
            </div>
          </div>
          <div className="bg-card rounded-xl p-6 shadow-lg border">
            <img 
              src="/placeholder.svg" 
              alt="Игровое поле" 
              className="rounded-lg w-full h-auto" 
            />
          </div>
        </div>
        
        <Tabs defaultValue="rules" className="mt-16 max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="rules">Правила игры</TabsTrigger>
            <TabsTrigger value="components">Компоненты</TabsTrigger>
            <TabsTrigger value="tips">Советы</TabsTrigger>
          </TabsList>
          <TabsContent value="rules" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Правила игры</CardTitle>
                <CardDescription>Как играть в "Историю математических открытий"</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Цель игры:</h3>
                    <p>Собрать как можно больше очков, отвечая на вопросы и выполняя задания, связанные с историей математических открытий и известными математиками.</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">Количество игроков:</h3>
                    <p>2-6 человек</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">Ход игры:</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>Игрок бросает кубик и перемещает свою фишку на соответствующее количество клеток.</li>
                      <li>В зависимости от клетки, на которую он попал, игрок выполняет одно из действий:
                        <ul className="list-disc pl-5 mt-2">
                          <li><span className="font-medium">Клетка с вопросом:</span> Игрок отвечает на вопрос. Правильный ответ: 2 очка.</li>
                          <li><span className="font-medium">Клетка с заданием:</span> Игрок выполняет задание. Успешное выполнение: 3 очка.</li>
                          <li><span className="font-medium">Клетка "Шанс":</span> Игрок может получить или потерять очки.</li>
                          <li><span className="font-medium">Клетка "Пропуск хода":</span> Игрок пропускает следующий ход.</li>
                        </ul>
                      </li>
                      <li>Игра продолжается до достижения финиша или использования всех карточек.</li>
                    </ol>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">Завершение игры:</h3>
                    <p>Побеждает игрок, набравший больше всего очков.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="components" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Компоненты игры</CardTitle>
                <CardDescription>Что входит в комплект настольной игры</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">🎮</span>
                    <span>Игровое поле с маршрутом (в виде спирали или зигзага)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">🃏</span>
                    <span>Карточки с вопросами и заданиями (разделенные на категории)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">♟️</span>
                    <span>Фишки для игроков</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">🎲</span>
                    <span>Кубик</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">📝</span>
                    <span>Блокнот для подсчета очков</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">⏱️</span>
                    <span>Таймер (по желанию)</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tips" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Советы</CardTitle>
                <CardDescription>Как сделать игру интереснее</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Дополнительные правила:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Установите таймер на 30 секунд для ответов на вопросы или выполнения заданий, чтобы сделать игру более динамичной.</li>
                      <li>Разделите вопросы по уровням сложности (легкие, средние, сложные), что позволит игрокам выбирать уровень в зависимости от своих знаний.</li>
                      <li>Добавьте специальные карточки с интересными фактами о математиках, которые дают дополнительный бонус.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold">Образовательный аспект:</h3>
                    <p>Эта игра не только развлекает, но и помогает участникам узнать больше о математических открытиях и их значении в истории науки!</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" asChild>
                  <Link to="/game">Начать игру сейчас</Link>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-muted py-6">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">© 2023 История математических открытий</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
