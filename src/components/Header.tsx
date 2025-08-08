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
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import type { Project } from '@/types/Project';
import { Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from '@/components/PDF';

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

      {project && (
        <div className="ml-auto">
          <PDFDownloadLink
            document={<MyDocument project={project} />}
            fileName={`${project.name}_pareto_analysis.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button disabled variant="outline" size="default">
                  <Loader2 className="animate-spin" />
                  Generando PDF...
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="default"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
                >
                  <Download />
                  Exportar PDF
                </Button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </header>
  );
};
export default Header;
