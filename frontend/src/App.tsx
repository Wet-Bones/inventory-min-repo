import { ChakraProvider, theme } from '@chakra-ui/react';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Loading from './components/main/Loading';
import WithSubnavigation from './components/main/Navbar';
import onError from './utility/Error';
import Routes from './utility/Routes';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: onError
  }),
  defaultOptions: {
    queries: {
      staleTime: 600000,
      cacheTime: 900000,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    },
  }
})

export const App = () => (
  <QueryClientProvider client={queryClient}>
  <ChakraProvider theme={theme}>
      <WithSubnavigation />
          <Loading />
          <Routes />
  </ChakraProvider>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
