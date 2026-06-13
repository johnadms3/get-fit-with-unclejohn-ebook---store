export type Discount = {
    code: string
    type: "percent" | "fixed"
    value: number
    description: string
}

const discounts: Discount[] = [
    {
        code: "UNCLE20",
        type: "percent",
        value: 20,
        description: "20% off your order",
    },
    {
        code: "FIT10",
        type: "fixed",
        value: 10,
        description: "$10 off your order",
    },
    {
        code: "LAUNCH35",
        type: "percent",
        value: 35,
        description: "35% off - launch special",
    },
]

export function validateDiscount(code:string): Discount | null {
    const found = discounts.find(
        (d) => d.code.toUpperCase() === code.toUpperCase()
    )
    return found || null
}