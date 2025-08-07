import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/ui/dashboard-card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useProblemActions } from '@/hooks/useProblemActions';

const problemSchema = z.object({
  name: z.string().min(1, 'El problema es requerido'),
  frequency: z.number().min(1, 'La frecuencia debe ser mayor a 0'),
});

const DataForm = () => {
  const { id } = useParams<{ id: string }>();
  const { addProblem } = useProblemActions();
  const form = useForm<z.infer<typeof problemSchema>>({
    resolver: zodResolver(problemSchema),
    defaultValues: {
      name: '',
      frequency: 0,
    },
    mode: 'onTouched',
  });

  if (!id) {
    console.error('DataForm: missing project ID');
    return null;
  }
  const onSubmit = form.handleSubmit(async data => {
    addProblem(id, data);
    form.reset();
  });

  return (
    <DashboardCard
      title="Agregar Datos"
      description="Ingresa las categorías y sus frecuencias para el análisis"
      variant="bordered"
    >
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problema</FormLabel>
                <FormControl>
                  <Input placeholder="Ej: Defecto de calidad" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="frequency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Frecuencia</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ej: 25"
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full text-white cursor-pointer bg-blue-light hover:bg-blue-base"
            onClick={onSubmit}
          >
            <Plus className="h-4 w-4 mr-2" />
            Agregar Elemento
          </Button>
        </form>
      </Form>
    </DashboardCard>
  );
};

export default DataForm;
