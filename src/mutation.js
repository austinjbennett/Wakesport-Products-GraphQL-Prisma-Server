import { idArg, mutationType, stringArg } from 'nexus'

export const Mutation = mutationType({
	name: 'Mutation',
	definition(t) {

		t.crud.deleteOneProduct();
		
		t.field('createProduct', {
			type: 'Product',
			args: {
				name: stringArg({ nullable: false }),
				category: stringArg(),
				description: stringArg(),
				price: stringArg({ nullable: false }),
				imageUrl: stringArg({ nullable: false }),
			},
			resolve: (parent, { name, category, description, price, imageUrl }, ctx) => {
				return ctx.prisma.product.create({
					data: {
						name,
						category,
						description,
						price,
						imageUrl,
					},
				});
			},
		});

		t.field('updateProduct', {
			type: 'Product',
			args: { id: idArg(),
				name: stringArg(),
				category: stringArg(),
				description: stringArg(),
				price: stringArg(),
				imageUrl: stringArg(),
			},
			resolve: (parent, { id, name, category, description, price, imageUrl }, ctx) => {
				return ctx.prisma.product.update({
					where: {
						id
					},
					data: {
						name,
						category,
						description,
						price,
						imageUrl,
					}
				})
			}
		})
	}
})