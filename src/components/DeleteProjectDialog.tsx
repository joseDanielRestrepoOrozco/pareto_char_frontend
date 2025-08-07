import React from 'react';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { Project } from '@/types/Project';

interface DeleteProjectDialogProps {
  project: Project;
  onDelete: (project: Project) => void;
}

export const DeleteProjectDialog: React.FC<DeleteProjectDialogProps> = ({
  project,
  onDelete,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="h-12 w-12 flex items-center justify-center hover:bg-red-50 transition-colors rounded-md ml-1 cursor-pointer"
          title={`Eliminar proyecto ${project.name}`}
        >
          <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
        </button>
      </DialogTrigger>
      <DialogContent className="text-start">
        <DialogHeader>
          <DialogTitle className="text-start">
            ¿Eliminar proyecto "{project.name}"?
          </DialogTitle>
          <DialogDescription className="text-start">
            Esta acción no se puede deshacer. Se eliminarán todos los datos
            asociados al proyecto.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end flex-row gap-2">
          <DialogClose asChild>
            <Button variant="outline" className="cursor-pointer">
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => onDelete(project)}
            >
              Eliminar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
