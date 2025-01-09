import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon: TrolleyIcon as any,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 96,
            },
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'image',
            title: 'Product Image',
            type: 'image',
            options: {
                // The hotspot property is set to true so that the image can be cropped in the studio
                hotspot: true,
            },
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'blockContent',
        }),
        defineField({
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: Rule => Rule.required().min(0),
        }),
        defineField({
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{ type: "reference", to: { type: "category" } }],
        }),
        defineField({
            name: 'stock',
            title: 'Stock',
            type: 'number',
            validation: Rule => Rule.required().min(0),
        }),
    ],
    preview: {
        select: {
            title: 'name',
            media: 'image',
            subtitle: 'price',
        },
        prepare(select) {
            return {
                title: select.title,
                subtitle: `$${select.subtitle}`,
                media: select.media,
            };
        }
    }
})