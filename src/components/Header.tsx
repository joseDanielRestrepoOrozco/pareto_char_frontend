import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import type { Project } from '@/types/Project';
import { Link } from 'react-router-dom';

const Header = ({ project }: { project: Project | null }) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b-2 px-4 border-gold-base">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 max-h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Inicio</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-blue-dark">
              Dashboard
            </BreadcrumbPage>
          </BreadcrumbItem>
          {project && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-blue-dark">
                  {project.name}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
};
export default Header;
