import {Prisma} from '@prisma/client'

export type ProductWithRelations = Prisma.ProductGetPayload<{
    include: {
        variants: true
    }
}>

export type ProductWithAllRelations = Prisma.ProductGetPayload<{
    include: {
        category: true,
        variants: true,
    },
}>