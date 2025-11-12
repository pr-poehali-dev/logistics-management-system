import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMascot, setShowMascot] = useState(false);
  const [phone, setPhone] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [selectedTransport, setSelectedTransport] = useState<string | null>(null);

  const transportTypes = [
    { id: 'courier', name: 'Курьер', icon: 'User', subtitle: 'Документы, посылки до 5 тонн' },
    { id: 'truck', name: 'Магистральный', icon: 'Truck', subtitle: 'Автомобильные перевозки' },
    { id: 'plane', name: 'Авиа', icon: 'Plane', subtitle: 'Авиаперевозки' },
    { id: 'train', name: 'ЖД', icon: 'Train', subtitle: 'Железнодорожные перевозки' },
    { id: 'ship', name: 'Морские', icon: 'Ship', subtitle: 'Морские перевозки' }
  ];

  const tenders = [
    { region: 'Россия', zones: ['Все регионы'], status: 'active' },
    { region: 'Азия', zones: ['Все страны и регионы'], status: 'active' },
    { region: 'Ближний Восток', zones: ['Все страны и регионы'], status: 'active' },
    { region: 'Красные зоны', zones: ['Требуется подтверждение'], status: 'special' }
  ];

  const handleLogin = () => {
    if (phone.length < 10 || smsCode.length < 4) {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 500);
      return;
    }
    
    setShowMascot(true);
    setTimeout(() => {
      setIsAuthenticated(true);
      setShowMascot(false);
    }, 2000);
  };

  const handleTrackCargo = () => {
    if (trackingId.length > 0) {
      toast.success('Груз найден! Отображаем на карте...');
    } else {
      toast.error('Введите ID груза');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-cyber flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyMTIsIDE3NSwgNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
        
        <Card className={`w-full max-w-md bg-card/95 backdrop-blur-xl border-gold/30 shadow-2xl animate-fade-in ${loginError ? 'error-shake border-red-500' : ''}`}>
          <CardContent className="pt-8 pb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/10 border-2 border-gold mb-4 animate-glow-pulse">
                <Icon name="Package" size={40} className="text-gold" />
              </div>
              <h1 className="text-3xl font-bold text-gold text-glow mb-2">H&C Logistics</h1>
              <p className="text-muted-foreground text-sm">Единая система управления логистикой</p>
              <p className="text-xs text-gold/60 mt-1">by H&C Media / H&C Group</p>
            </div>

            <Tabs defaultValue="phone" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-secondary">
                <TabsTrigger value="phone" className="data-[state=active]:bg-gold data-[state=active]:text-navy">Телефон</TabsTrigger>
                <TabsTrigger value="employee" className="data-[state=active]:bg-gold data-[state=active]:text-navy">Сотрудник</TabsTrigger>
              </TabsList>

              <TabsContent value="phone" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Номер телефона</label>
                  <Input
                    type="tel"
                    placeholder="+7 (999) 123-45-67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-secondary border-gold/30 focus:border-gold text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Код из СМС</label>
                  <Input
                    type="text"
                    placeholder="••••"
                    value={smsCode}
                    onChange={(e) => setSmsCode(e.target.value)}
                    className="bg-secondary border-gold/30 focus:border-gold text-foreground"
                  />
                </div>
                <Button onClick={handleLogin} className="w-full bg-gold hover:bg-gold-light text-navy font-semibold border-glow transition-all">
                  Войти
                </Button>
              </TabsContent>

              <TabsContent value="employee" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">ID сотрудника</label>
                  <Input
                    type="text"
                    placeholder="Введите ID"
                    className="bg-secondary border-gold/30 focus:border-gold text-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Пароль</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-secondary border-gold/30 focus:border-gold text-foreground"
                  />
                </div>
                <Button onClick={handleLogin} className="w-full bg-gold hover:bg-gold-light text-navy font-semibold border-glow transition-all">
                  Войти
                </Button>
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t border-gold/20">
              <Button variant="outline" className="w-full border-gold/50 text-gold hover:bg-gold/10">
                <Icon name="UserPlus" size={18} className="mr-2" />
                Курьеринг - Регистрация курьера
              </Button>
            </div>
          </CardContent>
        </Card>

        {showMascot && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
            <Card className="max-w-md bg-card/95 border-gold border-2 animate-glow-pulse">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4 animate-cyber-flicker">👩‍💼</div>
                <h2 className="text-2xl font-bold text-gold text-glow mb-2">Добро пожаловать!</h2>
                <p className="text-foreground">Рада приветствовать вас в системе H&C Logistics</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cyber">
      <header className="border-b border-gold/30 bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center border border-gold/50">
              <Icon name="Package" size={24} className="text-gold" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gold">H&C Logistics</h1>
              <p className="text-xs text-muted-foreground">Панель управления</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-gold/50 text-gold hover:bg-gold/10">
            <Icon name="LogOut" size={16} className="mr-2" />
            Выход
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-gold/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gold">Трекинг груза</h2>
                  <Icon name="MapPin" size={24} className="text-gold animate-cyber-flicker" />
                </div>
                
                <div className="flex space-x-2 mb-6">
                  <Input
                    type="text"
                    placeholder="Введите ID груза"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className="bg-secondary border-gold/30 focus:border-gold text-foreground"
                  />
                  <Button onClick={handleTrackCargo} className="bg-gold hover:bg-gold-light text-navy px-8">
                    <Icon name="Search" size={18} />
                  </Button>
                </div>

                <div className="bg-secondary/50 rounded-lg h-64 flex items-center justify-center border border-gold/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQyIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjxwYXRoIGQ9Ik0gNDAgMCBMIDAgMCAwIDQwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjEyLCAxNzUsIDU1LCAwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZDIpIi8+PC9zdmc+')] opacity-50"></div>
                  <div className="relative z-10 text-center">
                    <Icon name="Map" size={48} className="text-gold/50 mx-auto mb-2" />
                    <p className="text-muted-foreground">Интерактивная карта с маршрутизацией</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-gold/30">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gold mb-4">Создать заявку</h2>
                <p className="text-sm text-muted-foreground mb-4">Выберите тип транспорта для доставки</p>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {transportTypes.map((transport) => (
                    <button
                      key={transport.id}
                      onClick={() => setSelectedTransport(transport.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedTransport === transport.id
                          ? 'bg-gold/20 border-gold shadow-lg border-glow'
                          : 'bg-secondary/50 border-gold/30 hover:border-gold/50'
                      }`}
                    >
                      <Icon name={transport.icon as any} size={32} className="text-gold mb-2" />
                      <h3 className="font-semibold text-foreground">{transport.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{transport.subtitle}</p>
                    </button>
                  ))}
                </div>
                
                {selectedTransport && (
                  <Button className="w-full mt-4 bg-gold hover:bg-gold-light text-navy font-semibold">
                    <Icon name="Plus" size={18} className="mr-2" />
                    Создать заявку
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm border-gold/30">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gold">Тендеры</h3>
                  <Icon name="FileText" size={20} className="text-gold" />
                </div>
                <p className="text-xs text-muted-foreground mb-4">223-ФЗ, 44-ФЗ, ст. 15 Конституции РФ</p>
                
                <div className="space-y-3">
                  {tenders.map((tender, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border ${
                        tender.status === 'special'
                          ? 'bg-destructive/10 border-destructive/50'
                          : 'bg-secondary/50 border-gold/30'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{tender.region}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          tender.status === 'special' ? 'bg-destructive/20 text-destructive' : 'bg-gold/20 text-gold'
                        }`}>
                          {tender.status === 'active' ? 'Активен' : 'Спец.'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{tender.zones.join(', ')}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-gold/30">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center border border-gold/50 animate-glow-pulse">
                    <span className="text-2xl">👩‍💼</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Ваш помощник</h3>
                    <p className="text-xs text-muted-foreground">Маскот H&C Logistics</p>
                  </div>
                </div>
                <div className="bg-secondary/50 rounded-lg p-4 border border-gold/20">
                  <p className="text-sm text-foreground">Добро пожаловать в систему! Я помогу вам с управлением логистикой.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
