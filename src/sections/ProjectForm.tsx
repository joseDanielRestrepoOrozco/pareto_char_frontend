import { Button } from '@/components/ui/button';
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
import { useProjectActions } from '@/hooks/useProjectActions';
import DashboardCard from '@/components/ui/dashboard-card';

const projectSchema = z.object({
  name: z.string().min(1, 'El nombre del proyecto es requerido'),
});

const ProjectForm = () => {
  const { addProject } = useProjectActions();

  const form = useForm<z.infer<typeof projectSchema>>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: '',
    },
    mode: 'onTouched',
  });

  const onSubmit = form.handleSubmit(async data => {
    try {
      await addProject(data);
      form.reset();
    } catch (error) {
      console.error('Error al crear proyecto:', error);
    }
  });

  return (
      <DashboardCard
        title="Crear Nuevo Proyecto"
        description="Ingresa el nombre del proyecto para comenzar"
        variant="bordered"
        className='max-w-md mx-auto w-full'
      >
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Proyecto</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej: Análisis de Defectos de Calidad"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full text-white cursor-pointer bg-blue-light hover:bg-blue-dark transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Crear Nuevo Proyecto
            </Button>
          </form>
        </Form>
      </DashboardCard>
  );
};

export default ProjectForm;
