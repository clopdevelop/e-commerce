import prisma from '../app/lib/prisma';
import { initialData } from './seedData';
// import { countries } from './seed-countries';



async function main() {

  // 1. Borrar registros previos
  // await Promise.all( [

    // await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();


    // await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.deliveryType.deleteMany();
    await prisma.paymentMethod.deleteMany();
  // ]);

  const { categories, products, users, deliveryTypes, paymentMethods, orders, orderItems } = initialData;


  await prisma.user.createMany({
    data: users
  });

  // await prisma.country.createMany({
  //   data: countries
  // });



  //  Categorias
  // {
  //   name: 'Shirt'
  // }
  await prisma.category.createMany({
    data: categories
  });

  // Recuperar los ID de las categorias
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, number>); //<string=label, string=categoryID>

  console.log(categoriesMap['shirts']);
  

  // Productos
  products.forEach(async (product) => {
    const { type , ...rest } = product;

    // const dbProduct = await prisma.product.create({
    //   data: {
    //     ...rest,
    //     id_category: categoriesMap[type]
    //   }
    // })

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        id_category: categoriesMap[type]
      }
    })


    // Images
    // const imagesData = images.map( image => ({
    //   url: image,
    //   id_product: dbProduct.id
    // }));

    // await prisma.productImage.createMany({
    //   data: imagesData
    // });

  });


  //  DeliveryTypes
  // {
  //   name: 'Standard'
  // }
  await prisma.deliveryType.createMany({
    data: deliveryTypes
  });

  // Recuperar los ID de las tipos de envío
  const deliveryTypesDB = await prisma.deliveryType.findMany();
  const deliveryTypesMap = deliveryTypesDB.reduce((map, deliveryType) => {
    map[deliveryType.name.toLowerCase()] = deliveryType.id;
    return map;
  }, {} as Record<string, number>); //<string=label, string=deliveryTypesID>


  //  PaymentMethods
  // {
  // name: 'PayPal',
  // }
  await prisma.paymentMethod.createMany({
    data: paymentMethods
  });

  // Recuperar los ID de los tipos de pago
  const paymentMethodsDB = await prisma.paymentMethod.findMany();
  const paymentMethodsMap = paymentMethodsDB.reduce((map, paymentMethod) => {
    map[paymentMethod.name.toLowerCase()] = paymentMethod.id;
    return map;
  }, {} as Record<string, number>); //<string=label, string=deliveryTypesID>


  // Orders
  orders.forEach(async (order) => {
    const dbOrder = await prisma.order.create({
      data: {
        ...order,
        // id_category: categoriesMap[order.type]
      }
    })


    // OrderItems
    await prisma.orderItem.createMany({
      data: orderItems
    });

  });

  console.log('Seed ejecutado correctamente');
}



(() => {
  if (process.env.NODE_ENV === 'production') return;
  main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
})();