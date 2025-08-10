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
import { Button } from '@/components/ui/button';
import { Download, Loader2, RefreshCw } from 'lucide-react';
import type { Project } from '@/types/Project';
import { Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import usePdfAnalysis from '@/hooks/usePdfAnalysis';

const Header = ({ project }: { project: Project | null }) => {
  // custom hook to manage PDF analysis and snapshot
  const {
    hasData,
    analysisSnapshot,
    pdfDocument,
    createSnapshot,
    canDownload
  } = usePdfAnalysis(project);

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
        <div className="ml-auto flex items-center gap-2">
          {!analysisSnapshot ? (
            <Button
              variant="default"
              size="default"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg"
              onClick={createSnapshot}
              disabled={!hasData}
            >
              <Download />
              Preparar PDF
            </Button>
          ) : (
            <>
              <PDFDownloadLink
                document={pdfDocument as any}
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
                      disabled={!pdfDocument || !canDownload}
                    >
                      <Download />
                      Descargar PDF
                    </Button>
                  )
                }
              </PDFDownloadLink>
              <Button
                variant="outline"
                size="icon"
                title="Actualizar snapshot PDF"
                onClick={createSnapshot}
                className="border-gold-base"
                disabled={!hasData}
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
export default Header;
