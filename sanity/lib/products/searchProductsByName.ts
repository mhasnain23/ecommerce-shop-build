import { defineQuery } from "next-sanity"

export const searchProductsByName = (searchParams: string) => {
    const PRODUCT_SEARCH_QUERY = defineQuery(`
    *[
        _type == "product" && name match $searchParams
    ] | order(name asc)
    `)
}
