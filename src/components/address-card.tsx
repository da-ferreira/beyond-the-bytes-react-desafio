'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AddressProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  fullAddress: string;
  country: string;
  city: string;
  batch: string;
  type: string;
  onDelete: () => void;
  onEdit: () => void;
}

export function AddressCard({ className, onDelete, onEdit, ...props }: AddressProps) {
  return (
    <Card className={cn(className)}>
      <div className="flex items-center justify-between space-x-4">
        <CardHeader>
          <CardTitle>
            {props.type === 'earth' ? '🌎' : '🪐'} {props.label}
          </CardTitle>
          {props.type === 'earth' ? (
            <CardDescription>
              {props.country}, {props.city} - {props.fullAddress}
            </CardDescription>
          ) : (
            <CardDescription>Lote: {props.batch}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="grid gap-6 mt-5">
          <div>
            <Button variant="outline" className="mr-3" onClick={onEdit}>
              Editar
            </Button>
            <Button variant="outline" onClick={onDelete}>
              Excluir
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
