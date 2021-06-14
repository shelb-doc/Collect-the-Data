import {
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VisuallyHidden,
  VStack,
} from '@chakra-ui/react';
import { add } from 'api';
import { useMutation, useQueryClient } from 'react-query';

function AddCustomer() {
  const qc = useQueryClient();

  const mutation = useMutation(newCustomer => add(newCustomer), {
    onSuccess: () => {
      qc.invalidateQueries('customers');
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    mutation.mutate(Object.fromEntries(new FormData(event.target)));
    event.target.reset();
  }

  return (
    <Container mt={2}>
      <form onSubmit={handleSubmit}>
        <VStack spacing="24px">
          <HStack spacing="24px">
            <FormControl id="first-name" isRequired>
              <VisuallyHidden>
                <FormLabel>First name</FormLabel>
              </VisuallyHidden>
              <Input placeholder="First name" name="firstName" />
            </FormControl>

            <FormControl id="last-name" isRequired>
              <VisuallyHidden>
                <FormLabel>Last name</FormLabel>
              </VisuallyHidden>
              <Input placeholder="Last name" name="lastName" />
            </FormControl>
          </HStack>

          <FormControl id="street" isRequired>
            <VisuallyHidden>
              <FormLabel>Street</FormLabel>
            </VisuallyHidden>
            <Input placeholder="Street" name="street" />
          </FormControl>

          <HStack spacing="24px">
            <FormControl id="city" isRequired>
              <VisuallyHidden>
                <FormLabel>City</FormLabel>
              </VisuallyHidden>
              <Input placeholder="City 🌇" name="city" />
            </FormControl>

            <FormControl id="state" isRequired>
              <VisuallyHidden>
                <FormLabel>State</FormLabel>
              </VisuallyHidden>
              <Input placeholder="State" name="state" />
            </FormControl>

            <FormControl id="zip" isRequired>
              <VisuallyHidden>
                <FormLabel>Zip</FormLabel>
              </VisuallyHidden>
              <Input placeholder="Zip" name="zipcode" />
            </FormControl>

            <FormControl id="level" isRequired>
              <VisuallyHidden>
                <FormLabel>Level</FormLabel>
              </VisuallyHidden>
              <Input placeholder="Level" name="level" />
            </FormControl>
          </HStack>
          <Button colorScheme="green" size="lg" type="submit">
            Add Customer
          </Button>
        </VStack>
      </form>
    </Container>
  );
}

export default AddCustomer;
