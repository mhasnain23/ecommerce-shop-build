import { TrolleyIcon } from "@sanity/icons";
import { defineField } from "sanity";

export default {
    name: 'productType',
    title: 'Product type',
    type: 'document',
    icon: TrolleyIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Product Name',
            type: 'string',
            validation: Rule => Rule.required(),
        })
    ],
}