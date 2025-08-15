import { SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import type { Project } from '@/types/Project';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useAnalysisActions } from '@/hooks/useAnalysisActions';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ReportePdf from '@/components/ReportePdf';
import { useAppSelector } from '@/hooks/store';

const Header = ({ project }: { project: Project | null }) => {
  const { loadAnalysis } = useAnalysisActions();
  const [reloading, setReloading] = useState(false);
  const analysis = useAppSelector(state => state.analysis);
  const isMobile = useIsMobile();

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b-2 px-4 border-gold-base">
      <SidebarTrigger className="-ml-1" />
      {!isMobile && (
        <>
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
        </>
      )}
      {project && (
        <div className="ml-auto flex items-center gap-2">
          {/* Botón para recargar el análisis, visible y con colores principales */}
          <Button
            onClick={async () => {
              if (!project?.id) return;
              try {
                setReloading(true);
                await loadAnalysis(project.id);
                toast.success('Datos de análisis actualizados');
              } catch (e) {
                toast.error('No se pudo recargar el análisis');
                console.error(e);
              } finally {
                setReloading(false);
              }
            }}
            disabled={reloading}
            className="bg-blue-light hover:bg-blue-dark text-white"
            aria-label="Recargar análisis"
            title="Recargar análisis"
          >
            <RefreshCw className="h-4 w-4" />
            {reloading ? 'Recargando…' : 'Recargar análisis'}
          </Button>
          <PDFDownloadLink
            key={Date.now()}
            document={<ReportePdf project={project} analysis={analysis} />}
            fileName={`reporte-${project.name}`}
            className="
              text-gray-400 border-1 border-gray-300 hover:bg-gold-base hover:border-white
              hover:text-white p-[7px] transition ease-in rounded-[10px]"
          >
            <Download />
          </PDFDownloadLink>
        </div>
      )}
    </header>
  );
};
export default Header;
