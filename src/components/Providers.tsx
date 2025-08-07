import type { ReactNode } from 'react';

import { TooltipProvider } from '@radix-ui/react-tooltip';
import { store } from '@/store/index';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Router>
      <Provider store={store}>
          <TooltipProvider>{children}</TooltipProvider>
      </Provider>
    </Router>
  );
};

export default Providers;
