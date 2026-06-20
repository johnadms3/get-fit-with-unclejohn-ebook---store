"use client"

import { useEffect, useState } from "react"
import PageLayout from "../components/PageLayout"
import AdminGuard from "../components/AdminGuard"

type Sale = {
    id: string
    email: string
    amount: number
    date: string
    items: string[]
}

type Stats = {
    totalRevenue: number
    totalOrders: number
    uniqueCustomers: number
}

export default function AdminPage() {

    const [sales, setSales] = useState<Sale[]>([])
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchSales() {
            try {
                const response = await fetch("/api/admin/sales")
                const data = await response.json()
                if(response.ok) {
                    setSales(data.sales)
                    setStats(data.stats)
                }
            } catch (error) {
                console.error("Failed to laod sales:", error)
            }
            setLoading(false)
        }
        fetchSales()
    }, [])
    
    return (
        <PageLayout>
            <AdminGuard>
                <div className="px-4 sm:px-6 py-8 max-w-5x1 page-enter">

                    <h1 className="text-2x1 font-medium mb-2" style={{ color: "var(--accent)" }}>
                        Admin Dashboard
                    </h1>
                    <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
                        Your sales overview and customer activity.
                    </p>

                    {loading ? (
                        <p className="text-sm py-10 text-center" style={{ color: "var(--text-muted)" }}>
                            Loading your data...
                        </p>
                    ) : (
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 m-8">

                                <div
                                    className="rounded-x1 p-5 text-center"
                                    style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
                                >
                                    <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Total Revenue</p>
                                    <p className="text-2x1 font-medium" style={{ color: "var(--gold)" }}>
                                        ${stats?.totalRevenue.toFixed(2) || "0.00"}
                                    </p>
                                </div>

                                <div
                                    className="rounded-x1 p-5 text-center"
                                    style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
                                >
                                    <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Total Orders</p>
                                    <p className="text-2x1 font-medium" style={{ color: "var(--accent)" }}>
                                        {stats?.totalOrders || 0}
                                    </p>
                                </div>

                                <div 
                                    className="rounded-x1 p-5 text-center"
                                    style={{ background: "var(--bg-card)", border: "0.5px solid var(--border)" }}
                                    >
                                        <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>Unique Customers</p>
                                        <p className="text-2x1 font-medium" style={{ color: "var(--green)" }}>
                                            {stats?.uniqueCustomers || 0}
                                        </p>
                                    </div>

                            </div>

                            {/* Sales Table */}
                            <div
                                className="rounded-x1 overflow-hidden"
                                style={{ background: "var(--bg-card", border:"0.5px solid var(--border)" }}
                            >
                                <div className="px-5 py-4" style={{ borderBottom: "0.5px solid var(--border)" }}>
                                    <h2 className="text-sm font-medium" style={{ color: "var(--text-main)" }}>
                                        Recent Sales
                                    </h2>
                                </div>

                                {sales.length === 0 ? (
                                    <div className="px-5 py-10 text-center">
                                        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                                            No sales yet - they&apos;ll show up here once customers start buying!
                                        </p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr style={{ borderBottom: "0.5px solid var(--border)" }}>
                                                    <th className="text-left text-xs font-medium px-5 py-3" style={{ color:"var(--text-muted)" }}>Date</th>
                                                    <th className="text-left text-xs font-medium px-5 py-3" style={{ color:"var(--text-muted)" }}>Customer</th>
                                                    <th className="text-left text-xs font-medium px-5 py-3" style={{ color:"var(--text-muted)" }}>Items</th>
                                                    <th className="text-right text-xs font-medium px-5 py-3" style={{ color:"var(--text-muted)" }}>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sales.map((sale) => (
                                                    <tr
                                                        key={sale.id}
                                                        style={{ borderBottom: "0.5px solid var(--border)" }}
                                                    >
                                                        <td className="text-sm px-5 py-3" style={{ color: "var(--text-main)" }}>{sale.date}</td>
                                                        <td className="text-sm px-5 py-3" style={{ color: "var(--text-main)" }}>{sale.email}</td>
                                                        <td className="text-sm px-5 py-3" style={{ color: "var(--text-muted)" }}>
                                                            {sale.items.join(", ")}
                                                            </td>
                                                            <td className="text-sm px-5 py-3 text-right font-medium" style={{ color: "var(--gold)" }}>
                                                                ${sale.amount.toFixed(2)}
                                                            </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                </div>
            </AdminGuard>
        </PageLayout>
    )
}