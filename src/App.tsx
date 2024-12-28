import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Header from './components/Header';
import Footer from './components/Footer';
import QuoteList from './components/QuoteList';
import RandomQuote from './components/RandomQuote';
import QuoteById from './components/QuoteById';
import TagList from './components/TagList';
import TagQuotes from './components/TagQuotes';
import AuthorList from './components/AuthorList';
import AuthorQuotes from './components/AuthorQuotes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 30, // 30 minutes
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const AppLayout = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <RandomQuote />,
      },
      {
        path: 'quotes',
        element: <QuoteList />,
      },
      {
        path: 'quotes/:quoteId',
        element: <QuoteById />,
      },
      {
        path: 'tags',
        element: <TagList />,
      },
      {
        path: 'tags/:tagId',
        element: <TagQuotes />,
      },
      {
        path: 'authors',
        element: <AuthorList />,
      },
      {
        path: 'authors/:authorId',
        element: <AuthorQuotes />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
