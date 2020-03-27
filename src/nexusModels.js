import { objectType } from 'nexus'

const Product = objectType({
	name: 'Product',
	definition(t) {
		t.model.id()
		t.model.createdAt()
		t.model.updatedAt()
		t.model.name()
		t.model.category()
		t.model.description()
		t.model.price()
	}
})

export const Models = [
	Product
]