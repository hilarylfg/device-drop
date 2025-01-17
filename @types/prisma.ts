import { Product, ProductVariant } from '@prisma/client';

export type ProductWithRelations = Product & { variants: ProductVariant[]};