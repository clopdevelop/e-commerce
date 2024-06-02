import { Card, CardContent, CardHeader } from "../shadcn";

export async function BestProducts() {
    const bestProducts = await fetchBestProducts()
  return (
    {bestProducts.map(()=>(
        <Card>
          <CardHeader className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Productos más vendidos</h2>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  alt="Product Thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <p className="text-gray-500 dark:text-gray-400">$129.99</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  alt="Product Thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">Adidas Yeezy Boost 350 V2</h3>
                  <p className="text-gray-500 dark:text-gray-400">$219.99</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  alt="Product Thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">Vans Old Skool</h3>
                  <p className="text-gray-500 dark:text-gray-400">$59.99</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/placeholder.svg"
                  alt="Product Thumbnail"
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div>
                  <h3 className="font-bold text-lg">Puma RS-X Toys</h3>
                  <p className="text-gray-500 dark:text-gray-400">$89.99</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    ))}
  );
}