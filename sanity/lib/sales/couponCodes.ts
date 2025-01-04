export const COUPON_CODES = {
    BFRIDAY: 'BFRIDAY',
    XMAS2021: "XMAS2021",
    NY2025: 'NY2025',
} as const

export type CouponCode = keyof typeof COUPON_CODES