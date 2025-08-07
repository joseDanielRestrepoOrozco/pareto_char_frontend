import { Button } from '@/components/ui/button';
import DashboardCard from '@/components/ui/dashboard-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
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
      description="Lista de categorías y frecuencias ingresadas"
      variant='bordered'
    >
      {problems.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className="text-right">Frecuencia</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {problems.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell className="text-right">{p.frequency}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => deleteProblem(id, p.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8 text-gray-600">
          No hay datos para mostrar
        </div>
      )}
    </DashboardCard>
  );
};

export default DataTable;
