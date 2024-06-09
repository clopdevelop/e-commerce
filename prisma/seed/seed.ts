/**
 * ! Executing this script will delete all data in your database and seed it with 10 province.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();
  
  // await seed.user((x) => x(10));
  // await seed.province((x) => x(10));
  // await seed.city((x) => x(10));
  // await seed.address((x) => x(10));
  // await seed.product((x) => x(10));
  // await seed.category((x) => x(10));
  // await seed.productVariant((x) => x(10));
  // await seed.productImage((x) => x(10));
  // await seed.order((x) => x(10));
  // await seed.orderItem((x) => x(10));

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();