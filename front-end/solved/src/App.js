import { ChakraProvider, theme } from '@chakra-ui/react';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AddCustomer, Customers, Filters } from './components';

const qc = new QueryClient();

function App() {
  // TODO: Use `useReducer`
  const [currentFilter, setCurrentFilter] = useState({});

  function handleChange(e) {
    setCurrentFilter(() => ({
      type: e.target.name,
      value: e.target.value.toLowerCase(),
    }));
  }

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={qc}>
        <Filters handler={handleChange} />
        {currentFilter.type ? (
          <Customers currentFilter={currentFilter} />
        ) : null}
        <AddCustomer />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
