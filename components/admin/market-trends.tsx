"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Line,
  LineChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations } from "next-intl"
import { useState } from "react"

export function MarketTrends() {
  const t = useTranslations('dashboard')
  const [timeframe, setTimeframe] = useState("1year")
  const [region, setRegion] = useState("all")

  // Mock data for the charts
  const priceData = {
    "1year": [
      { name: "Jan", apartment: 350000, house: 550000, condo: 280000, villa: 750000, townhouse: 420000 },
      { name: "Feb", apartment: 355000, house: 555000, condo: 285000, villa: 760000, townhouse: 425000 },
      { name: "Mar", apartment: 360000, house: 560000, condo: 290000, villa: 770000, townhouse: 430000 },
      { name: "Apr", apartment: 365000, house: 565000, condo: 295000, villa: 780000, townhouse: 435000 },
      { name: "May", apartment: 370000, house: 570000, condo: 300000, villa: 790000, townhouse: 440000 },
      { name: "Jun", apartment: 375000, house: 575000, condo: 305000, villa: 800000, townhouse: 445000 },
      { name: "Jul", apartment: 380000, house: 580000, condo: 310000, villa: 810000, townhouse: 450000 },
      { name: "Aug", apartment: 385000, house: 585000, condo: 315000, villa: 820000, townhouse: 455000 },
      { name: "Sep", apartment: 390000, house: 590000, condo: 320000, villa: 830000, townhouse: 460000 },
      { name: "Oct", apartment: 395000, house: 595000, condo: 325000, villa: 840000, townhouse: 465000 },
      { name: "Nov", apartment: 400000, house: 600000, condo: 330000, villa: 850000, townhouse: 470000 },
      { name: "Dec", apartment: 405000, house: 605000, condo: 335000, villa: 860000, townhouse: 475000 },
    ],
    "6months": [
      { name: "Jul", apartment: 380000, house: 580000, condo: 310000, villa: 810000, townhouse: 450000 },
      { name: "Aug", apartment: 385000, house: 585000, condo: 315000, villa: 820000, townhouse: 455000 },
      { name: "Sep", apartment: 390000, house: 590000, condo: 320000, villa: 830000, townhouse: 460000 },
      { name: "Oct", apartment: 395000, house: 595000, condo: 325000, villa: 840000, townhouse: 465000 },
      { name: "Nov", apartment: 400000, house: 600000, condo: 330000, villa: 850000, townhouse: 470000 },
      { name: "Dec", apartment: 405000, house: 605000, condo: 335000, villa: 860000, townhouse: 475000 },
    ],
    "3months": [
      { name: "Oct", apartment: 395000, house: 595000, condo: 325000, villa: 840000, townhouse: 465000 },
      { name: "Nov", apartment: 400000, house: 600000, condo: 330000, villa: 850000, townhouse: 470000 },
      { name: "Dec", apartment: 405000, house: 605000, condo: 335000, villa: 860000, townhouse: 475000 },
    ],
  }

  const demandData = [
    { name: "Downtown", demand: 85, supply: 65 },
    { name: "Suburbs", demand: 70, supply: 80 },
    { name: "Waterfront", demand: 90, supply: 50 },
    { name: "Historic", demand: 75, supply: 60 },
    { name: "Business District", demand: 80, supply: 70 },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="md:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{t('priceTrends')}</CardTitle>
            <CardDescription>{t('averagePricesOverTime')}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1year">{t('last12Months')}</SelectItem>
                <SelectItem value="6months">{t('last6Months')}</SelectItem>
                <SelectItem value="3months">{t('last3Months')}</SelectItem>
              </SelectContent>
            </Select>
            <Select value={region} onValueChange={setRegion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allRegions')}</SelectItem>
                <SelectItem value="downtown">{t('downtown')}</SelectItem>
                <SelectItem value="suburbs">{t('suburbs')}</SelectItem>
                <SelectItem value="waterfront">{t('waterfront')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={priceData[timeframe as keyof typeof priceData]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="apartment" name="Apartments" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="house" name="Houses" stroke="#82ca9d" />
              <Line type="monotone" dataKey="condo" name="Condos" stroke="#ffc658" />
              <Line type="monotone" dataKey="villa" name="Villas" stroke="#ff8042" />
              <Line type="monotone" dataKey="townhouse" name="Townhouses" stroke="#0088fe" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('supplyVsDemand')}</CardTitle>
          <CardDescription>{t('marketDemandSupply')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={demandData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="demand" name="Demand" fill="#8884d8" />
              <Bar dataKey="supply" name="Supply" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('marketInsights')}</CardTitle>
          <CardDescription>{t('currentTrends')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">{t('priceGrowth')}</h3>
              <p className="text-sm text-muted-foreground">
                Property prices have increased by an average of 8.5% over the past year, with the highest growth in the
                waterfront area at 12.3%.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">{t('inventoryLevels')}</h3>
              <p className="text-sm text-muted-foreground">
                Current inventory is down 15% compared to the same period last year, creating a seller's market in most
                regions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">{t('daysOnMarket')}</h3>
              <p className="text-sm text-muted-foreground">
                Properties are selling 20% faster than last year, with an average of 28 days on market before going
                under contract.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">{t('interestRates')}</h3>
              <p className="text-sm text-muted-foreground">
                Mortgage interest rates have stabilized at around 6.5%, which is affecting affordability for first-time
                buyers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium">{t('forecast')}</h3>
              <p className="text-sm text-muted-foreground">
                Experts predict continued but slower price growth of 4-6% over the next 12 months, with potential
                cooling in the luxury segment.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

