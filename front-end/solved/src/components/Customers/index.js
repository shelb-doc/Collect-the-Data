import {
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  Spinner,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { deleteCustomer, index, update as updateCustomer } from 'api';
import PropTypes from 'prop-types';
import { useMutation, useQuery, useQueryClient } from 'react-query';

function Customers({ currentFilter }) {
  const { status, data, error } = useQuery(
    // Query will update whenever value changes
    ['customers', currentFilter.value],
    () => index(currentFilter)
  );

  const qc = useQueryClient();

  const deleteMutation = useMutation(id => deleteCustomer(id), {
    onSuccess: () => {
      qc.invalidateQueries('customers', currentFilter.value);
    },
  });

  const updateMutation = useMutation(
    updatedCustomer => updateCustomer(updatedCustomer),
    {
      onSuccess: () => {
        qc.invalidateQueries('customers', currentFilter.value);
      },
    }
  );

  function handleClick(event) {
    deleteMutation.mutate(event.target.closest('td').dataset.id);
  }

  function handleSubmit(dataToUpdate) {
    const customerToUpdate = data.find(
      ({ customerId }) => customerId === Number(dataToUpdate.customerId)
    );

    const updatedCustomer = { ...customerToUpdate, ...dataToUpdate };

    // Only `mutate` if there are actual updates
    if (JSON.stringify(customerToUpdate) !== JSON.stringify(updatedCustomer)) {
      updateMutation.mutate(updatedCustomer);
    }
  }

  switch (status) {
    case 'loading':
      return <Spinner />;
    case 'error':
      return <Text fontSize="md">{error.message}</Text>;
    default:
      return (
        <Table variant="simple" maxWidth={960} mx="auto">
          <TableCaption placement="bottom">
            Edit Any Field to Update It!
          </TableCaption>
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Street</Th>
              <Th>City</Th>
              <Th>State</Th>
              <Th>Zip</Th>
              <Th>Level</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(
              ({
                customerId,
                firstName,
                lastName,
                street,
                city,
                state,
                zipcode,
                level,
              }) => (
                <Tr key={customerId}>
                  <Td>
                    <Editable
                      defaultValue={firstName}
                      onSubmit={nextValue => {
                        handleSubmit({ customerId, firstName: nextValue });
                      }}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable
                      defaultValue={lastName}
                      onSubmit={nextValue => {
                        handleSubmit({ customerId, lastName: nextValue });
                      }}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable
                      defaultValue={street}
                      onSubmit={nextValue => {
                        handleSubmit({ customerId, street: nextValue });
                      }}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable
                      defaultValue={city}
                      onSubmit={nextValue => {
                        handleSubmit({ customerId, city: nextValue });
                      }}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable
                      defaultValue={state}
                      onSubmit={nextValue => {
                        handleSubmit({ customerId, state: nextValue });
                      }}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable
                      defaultValue={zipcode}
                      onSubmit={nextValue => {
                        handleSubmit({ customerId, zipcode: nextValue });
                      }}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Td>
                  <Td>
                    <Editable
                      defaultValue={level}
                      onSubmit={nextValue => {
                        handleSubmit({ customerId, level: nextValue });
                      }}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Td>

                  <Td data-id={customerId}>
                    <Button colorScheme="red" size="sm" onClick={handleClick}>
                      Delete 🔥 Customer
                    </Button>
                  </Td>
                </Tr>
              )
            )}
          </Tbody>
        </Table>
      );
  }
}

Customers.propTypes = {
  currentFilter: PropTypes.exact({
    type: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};

export default Customers;
