import { DollarSign, CreditCard, TrendingUp, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function PaymentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <DollarSign className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
            <h3 className="text-2xl font-bold">$124,750</h3>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+12.5% from last month</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Pending Payments</p>
            <h3 className="text-2xl font-bold">$18,300</h3>
            <p className="text-xs text-muted-foreground">
              <span className="text-amber-500">5 pending transactions</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
            <h3 className="text-2xl font-bold">68.2%</h3>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">+5.4% from last month</span>
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <div className="rounded-full bg-primary/10 p-3">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Next Payout</p>
            <h3 className="text-2xl font-bold">Nov 30</h3>
            <p className="text-xs text-muted-foreground">
              <span className="text-emerald-500">$42,500 scheduled</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

