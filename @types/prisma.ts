import {Prisma} from '@prisma/client'

export type ProductWithRelations = Prisma.ProductGetPayload<{
    include: {
        variants: true
    }
}>