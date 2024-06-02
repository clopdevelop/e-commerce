import { Card, CardHeader, CardTitle, Skeleton, CardContent, Separator } from "../shadcn";

export function TotalSkeleton() {
    return (
      <Card>
      <CardHeader>
        <CardTitle><Skeleton className="h-4 w-1/4" /></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <Separator />
          <div className="flex items-center justify-between font-medium">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </CardContent>
    </Card>
    );
  }
  