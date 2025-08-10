import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/ui/dashboard-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { useAppSelector } from '@/hooks/store';
import { Trash2 } from 'lucide-react';
import { useProblemActions } from '@/hooks/useProblemActions';
import { useParams } from 'react-router-dom';

const DataTable = () => {
  const problems = useAppSelector(state => state.problems);
  const { deleteProblem } = useProblemActions();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    console.error('DataTable: missing project ID');
    return null;
  }

  return (
    <DashboardCard
      title="Datos Actuales"
      description={`Lista de categorías y frecuencias ingresadas (${problems.length}/10)`}
      variant="bordered"
      className="h-[400px]"
      contentScrollable
    >
      {problems.length > 0 ? (
        <div className="flex-1">
          <Table className="min-w-full">
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead className="text-right">Frecuencia</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {problems.map(p => (
                <TableRow key={p.id} className="last:border-b-0">
                  <TableCell className="font-medium break-words max-w-[140px]">
                    {p.name}
                  </TableCell>
                  <TableCell className="text-right">{p.frequency}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => deleteProblem(id, p.id)}
                      aria-label={`Eliminar ${p.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-1">
          <div className="text-center py-8 text-gray-600">
            No hay datos para mostrar
          </div>
        </div>
      )}
    </DashboardCard>
  );
};

export default DataTable;
