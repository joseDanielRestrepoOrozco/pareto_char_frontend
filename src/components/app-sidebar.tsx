import { useAppSelector } from '@/hooks/store';
import type { Project } from '@/types/Project';
import { useAuth } from '@/hooks/useAuth';
import { useProjectActions } from '@/hooks/useProjectActions';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { BarChart3, Plus, LogOut } from 'lucide-react';
import ProjectSidebarItem from '@/components/ProjectSidebarItem';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const projects = useAppSelector(state => state.projects);
  const { id } = useParams<{ id: string }>();
  const { logout } = useAuth();
  const { deleteProject } = useProjectActions();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteProject = (project: Project) => {
    const shouldRedirect = id === project.id;
    deleteProject(project.id);
    if (shouldRedirect) {
      navigate('/dashboard');
    }
  };

  return (
    <Sidebar className="border-r-2 border-gold-base">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-base">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-blue-dark">
              Pareto Analytics
            </h2>
            <p className="text-sm text-gold-base">Análisis de Problemas</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-dark">
            Acciones
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="h-12 px-4 hover:bg-gold-light transition-colors"
                  data-active={!id}
                >
                  <Link
                    to="/dashboard"
                    className={`flex items-center gap-3 ${
                      !id
                        ? 'bg-gold-light text-blue-dark'
                        : 'text-blue-base hover:text-blue-dark'
                    }`}
                  >
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Nuevo Diagrama</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-dark">
            Proyectos ({projects.length})
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects.map((proj: Project) => (
                <SidebarMenuItem key={proj.id}>
                  <ProjectSidebarItem
                    project={proj}
                    isActive={id === proj.id}
                    onDelete={handleDeleteProject}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              className="h-12 px-4 hover:bg-red-50 transition-colors w-full text-red-600"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Cerrar Sesión</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
