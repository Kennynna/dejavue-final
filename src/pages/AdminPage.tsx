import { useState } from "react"
import { motion } from "framer-motion"
import { ClipboardList, BarChart3, PackagePlus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type TabType = "orders" | "statistics" | "add-product"

interface Tab {
  id: TabType
  label: string
  icon: typeof ClipboardList
}

const tabs: Tab[] = [
  { id: "orders", label: "Все заказы", icon: ClipboardList },
  { id: "statistics", label: "Статистика", icon: BarChart3 },
  { id: "add-product", label: "Добавить товар", icon: PackagePlus },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("orders")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-border bg-secondary/30 py-6 sm:py-8"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground sm:text-sm sm:tracking-[0.3em]">
            Управление магазином
          </span>
          <h1 className="mt-2 text-2xl font-light tracking-tight text-foreground sm:mt-3 sm:text-3xl md:text-4xl">
            Админ <span className="font-semibold text-primary">панель</span>
          </h1>
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full shrink-0 lg:w-64"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Навигация
                </CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <nav className="flex flex-row gap-1 lg:flex-col">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <Button
                        key={tab.id}
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 px-3 py-2.5 text-left transition-all",
                          isActive && "bg-secondary font-medium"
                        )}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", isActive && "text-primary")} />
                        <span className="hidden sm:inline lg:inline">{tab.label}</span>
                      </Button>
                    )
                  })}
                </nav>
              </CardContent>
            </Card>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1"
          >
            {activeTab === "orders" && <OrdersTab />}
            {activeTab === "statistics" && <StatisticsTab />}
            {activeTab === "add-product" && <AddProductTab />}
          </motion.main>
        </div>
      </div>
    </div>
  )
}

function OrdersTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-primary" />
          Все заказы
        </CardTitle>
        <CardDescription>
          Просмотр и управление заказами клиентов
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Здесь будет список заказов
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function StatisticsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          Статистика
        </CardTitle>
        <CardDescription>
          Аналитика продаж и посещаемости
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Здесь будет статистика
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function AddProductTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PackagePlus className="h-5 w-5 text-primary" />
          Добавить товар
        </CardTitle>
        <CardDescription>
          Создание нового товара в каталоге
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-border bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Здесь будет форма добавления товара
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

