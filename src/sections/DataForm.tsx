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
import { useAppSelector } from '@/hooks/store';
import { toast } from 'sonner';

const problemSchema = z.object({
  name: z.string().min(1, 'El problema es requerido'),
  frequency: z.number().min(1, 'La frecuencia debe ser mayor a 0'),
});

const DataForm = () => {
  const { id } = useParams<{ id: string }>();
  const { addProblem } = useProblemActions();
  const problems = useAppSelector(state => state.problems);

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
    // Verificar si ya se alcanzó el límite de 10 problemas
    if (problems.length >= 10) {
      toast.error('No puedes agregar más de 10 problemas por proyecto');
      return;
    }

    await addProblem(id, data);
    form.reset();
  });

  const isAtMaxProblems = problems.length >= 10;

  return (
    <DashboardCard
      title="Agregar Datos"
      description={`Ingresa las categorías y sus frecuencias para el análisis (${problems.length}/10)`}
      variant="bordered"
      className="h-[400px]"
    >
      {isAtMaxProblems ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center py-8 space-y-4">
            <p className="text-gray-600">
              Has alcanzado el límite máximo de 10 problemas por proyecto.
            </p>
            <p className="text-sm text-gray-500">
              Para agregar más problemas, elimina algunos existentes.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center h-full">
          {problems.length >= 8 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Aviso:</strong> Te quedan {10 - problems.length}{' '}
                espacios para problemas.
              </p>
            </div>
          )}
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
        </div>
      )}
    </DashboardCard>
  );
};

export default DataForm;
