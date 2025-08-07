import { Link } from 'react-router-dom';
import { FolderOpen } from 'lucide-react';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { DeleteProjectDialog } from '@/components/DeleteProjectDialog';
import type { Project } from '@/types/Project';

interface ProjectSidebarItemProps {
  project: Project;
  isActive: boolean;
  onDelete: (project: Project) => void;
}

const ProjectSidebarItem = ({
  project,
  isActive,
  onDelete,
}: ProjectSidebarItemProps) => {
  return (
    <div className="flex items-center w-full">
      <SidebarMenuButton
        asChild
        isActive={isActive}
        className="h-12 px-4 hover:bg-gold-light transition-colors flex-1"
        data-active={isActive}
      >
        <Link
          to={`/dashboard/${project.id}`}
          className={`flex items-center gap-3 ${
            isActive
              ? 'bg-gold-light text-blue-dark'
              : 'text-blue-base hover:text-blue-dark'
          }`}
        >
          <FolderOpen className="w-5 h-5" />
          <span className="font-medium truncate">{project.name}</span>
        </Link>
      </SidebarMenuButton>

      <DeleteProjectDialog project={project} onDelete={onDelete} />
    </div>
  );
};

export default ProjectSidebarItem;