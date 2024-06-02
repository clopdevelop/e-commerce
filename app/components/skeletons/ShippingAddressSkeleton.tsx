import { Skeleton } from '../shadcn';
import { Card, CardContent, CardHeader, CardTitle } from '../shadcn';

export function ShippingAddressSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle><Skeleton className="h-4 w-1/4" /></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  );
}

