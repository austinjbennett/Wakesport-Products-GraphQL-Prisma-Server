import { PrismaClient } from '@prisma/client';
import fs from 'fs'

const prismaClient = new PrismaClient();

const wakeProductsFile = fs.readFileSync('prisma/data/wake-products.json')


function loadProducts() {
	const wakeProductsJSON = JSON.parse(wakeProductsFile)
	const allProducts = wakeProductsJSON.data

	return allProducts.map(product => {
		return {
			data: {
				name: product.title,
				category: product.productCategory,
				description: product.description,
				price: parseInt(product.price.$numberInt),
				imageUrl: product.imageUrl,
			},
		}
	})
}

async function main() {
	try {
	  const allProducts = loadProducts()
	  for (let product of allProducts) {
		await prismaClient.product.create(product)
		.catch(err => console.log(`Error trying to create wake products: ${err} product: ${product}`))
	  }
	} catch (err) {
	  console.log(err)
	}
  }
  
// async function createProduct() {
// 	try {
// 		await prismaClient.product.create({
// 			data: {
// 				name: 'Ronix One Timebomb',
// 				category: 'Wakeboards',
// 				description: 'The best wakeboard you can buy',
// 				price: '599.99',
// 			},	
// 		});
// 	} catch (error) {
// 		console.error('Error my dude:', error);
// 	}
// }

// async function main() {
// 	try {
// 		await createProduct();
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

main()
	.catch(e => console.error(error))
	.finally(async () => {
		await prismaClient.disconnect()
});




