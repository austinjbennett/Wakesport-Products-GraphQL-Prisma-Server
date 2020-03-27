import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

async function createProduct() {
	try {
		await prismaClient.product.create({
			data: {
				name: 'Ronix One Timebomb',
				category: 'Wakeboards',
				description: 'The best wakeboard you can buy',
				price: '599.99',
			},	
		});
	} catch (error) {
		console.error('Error my dude:', error);
	}
}

async function main() {
	try {
		await createProduct();
	} catch (error) {
		console.error(error);
	}
}

main()
	.catch(e => console.error(error))
	.finally(async () => {
		await prismaClient.disconnect()
});
