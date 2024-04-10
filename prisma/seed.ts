import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed User
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      password: 'supersecurepassword',
      postcode: '12345',
      created_at: new Date(),
    },
  });

  // Seed Category
  const category = await prisma.category.create({
    data: {
      name: 'Electronics',
      state: 'Active',
    },
  });

  // Seed Product
  const product = await prisma.product.create({
    data: {
      name: 'Laptop',
      description: 'A high performance laptop.',
      price: 1200.00,
      stock: 10,
      created_at: new Date(),
      id_category: category.id_category,
    },
  });

  // Seed Order
  const order = await prisma.order.create({
    data: {
      total: 1200.00,
      status: 'Pending',
      user: {
        connect: { id: user.id },
      },
      deliveryType: {
        create: {
          delivery_type: 'Standard',
        },
      },
      created_at: new Date(),
    },
  });

  // Seed OrderItem
  const orderItem = await prisma.orderItem.create({
    data: {
      quantity: 1,
      unit_price: 1200.00,
      Order: {
        connect: { id: order.id },
      },
      product: {
        connect: { id: product.id },
      },
    },
  });

  console.log({ user, category, product, order, orderItem });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
