export function formatCurrency(amount: number, currencyCode: string = "USD"): string {
    try {
        return new Intl.NumberFormat("us-US", {
            style: "currency",
            currency: currencyCode.toUpperCase(),
        }).format(amount)
    } catch (error) {
        console.error("Invalid Currency Code", error);
        return `${currencyCode.toUpperCase()} ${amount.toFixed(2)}`
    }
}