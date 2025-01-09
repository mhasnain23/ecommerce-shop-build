import { TagIcon } from "@sanity/icons"
import { defineField, defineType } from "sanity"



export const salesType = defineType({
    name: 'sale',
    title: 'Sale',
    type: 'document',
    icon: TagIcon as any,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: "Sale Title",
        }),
        defineField({
            name: 'description',
            type: 'text',
            title: "Sale Description"
        }),
        defineField({
            name: 'discountAmount',
            type: 'number',
            title: "Discount Amount",
            description: "Amount off in percentage and fixed value",
        }),
        defineField({
            name: 'couponCode',
            title: 'Coupon Code',
            type: 'string'
        }),
        defineField({
            name: 'validFrom',
            title: 'Valid From',
            type: 'datetime',
        }),
        defineField({
            name: 'validUntil',
            title: 'Valid Untils',
            type: 'datetime'
        }),
        defineField({
            name: 'isActive',
            title: 'Is Active',
            type: "boolean",
            description: 'Toggle to Active/Deactivate the sale',
        }),
    ],
    preview: {
        select: {
            title: "title",
            discountAmount: 'discountAmount',
            couponCode: 'couponCode',
            isActive: "isActive",
        },
        prepare(select) {
            const { title, discountAmount, couponCode, isActive } = select;
            const status = isActive ? "Active" : "Inactive";
            return {
                title,
                subtitle: `${discountAmount}% off - Code: ${couponCode} - ${status}`,
            }
        }
    }
})