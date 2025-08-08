import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/Header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Project } from '@/types/Project';

interface DashboardLayoutProps {
  project: Project | null;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  project,
  children,
}) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-transparent">
        <div className="flex flex-1 flex-col gap-4 p-6 mx-auto w-full max-w-4xl">
          <Header project={project} />
          <h1 className="text-3xl font-bold text-blue-dark">
            Diagrama de Pareto
          </h1>
          <p className="text-lg text-gold-dark">
            Identificación de los problemas más críticos
          </p>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
