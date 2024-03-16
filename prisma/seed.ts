import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

  async function main() {
    // Insertar datos en la tabla Country
    const andorra = await prisma.country.create({
      data: { iso_code: "AD", country: "Andorra" },
    });
    const espana = await prisma.country.create({
      data: { iso_code: "ES", country: "España" },
    });
    const argentina = await prisma.country.create({
      data: { iso_code: "AR", country: "Argentina" },
    });
    

    // Insertar datos en la tabla Province
    const misiones = await prisma.province.create({
      data: {
        iso_code: "AR-N",
        province: "Misiones",
        id_country: andorra.id_country,
      },
    });
    const barcelona = await prisma.province.create({
      data: {
        iso_code: "ES-B",
        province: "Barcelona",
        id_country: espana.id_country,
      },
    });
    const buenosAires = await prisma.province.create({
      data: {
        iso_code: "AR-B",
        province: "Buenos Aires",
        id_country: argentina.id_country,
      },
    });
    

    // Insertar datos en la tabla City
    const ciudadMayo = await prisma.city.create({
      data: { city: "1° de Mayo", id_province: misiones.id_province },
    });
    const ciudadBarcelona = await prisma.city.create({
      data: { city: "Barcelona", id_province: barcelona.id_province },
    });
    
    const ciudadBuenosAires = await prisma.city.create({
      data: { city: "Buenos Aires", id_province: buenosAires.id_province },
    });
    

    // Insertar datos en la tabla Address
    const address = await prisma.address.create({
      data: { address: "67 Miller Terrace", id_city: ciudadMayo.id_city },
    });
    const addressBarcelona = await prisma.address.create({
      data: { address: "Calle Falsa 123", id_city: ciudadBarcelona.id_city },
    });
    
    const addressBuenosAires = await prisma.address.create({
      data: { address: "Avenida Siempreviva 742", id_city: ciudadBuenosAires.id_city },
    });
    

    // Insertar datos en la tabla User
    const user = await prisma.user.create({
      data: {
        first_name: "John Doe",
        id_address: address.id_address,
        postcode: "A1234",
        phone: "123-456-7890",
        email: "john.doe@example.com",
        password: "securepassword", // Nota: en producción, asegúrate de hashear las contraseñas
      },
    });
    const userJaneDoe = await prisma.user.create({
      data: {
        first_name: "Jane Doe",
        id_address: addressBarcelona.id_address,
        postcode: "E08001",
        phone: "987-654-3210",
        email: "jane.doe@example.com",
        password: "anothersecurepassword",
      },
    });
    

    const category = await prisma.category.create({
      data: { category: "Bicicletas", description: "Bicicletas de todo tipo" },
    });

    const brand = await prisma.brand.create({
      data: { brand: "ALE" },
    });

    // Insertando proveedores
    const provider = await prisma.provider.create({
      data: {
        cuit: "30-21702578-6",
        name: "Phillips 66",
        id_address: address.id_address,
        postcode: "W-4474-DOO",
        email: "provider@example.com",
      },
    });

    const product = await prisma.product.create({
      data: {
        name: "Caramagnola Plástica Podium 0.5L",
        description: "Versión Eco. Color A Granel",
        id_brand: brand.id_brand,
        id_country: andorra.id_country,
        id_provider: provider.id_provider, // Asume que ya has creado un proveedor
        id_category: category.id_category,
        price: 450.0,
      },
    });

    // Insertando stock
    await prisma.stock.create({
      data: {
        id_product: product.id_product,
        stock: 50,
      },
    });

    // Insertando tipos de entrega
    const deliveryType = await prisma.deliveryType.create({
      data: {
        delivery_type: "Retira por sucursal",
      },
    });

    // Insertando métodos de pago
    const paymentMethod = await prisma.paymentMethod.create({
      data: {
        payment_method: "Tarjeta de débito",
      },
    });
  }

  main()
    .catch((e) => {
      console.error(e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
