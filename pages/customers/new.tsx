import Link from "next/link";
import InputMask from "react-input-mask";

import { AppLayout } from "../../src/layouts/App";
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Select,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { AddCustomerDTO } from "../../src/usecases/dtos/addCustomerDTO.interface";
import { makeAddCustomerUseCase } from "../../src/composers/addCustomer.composer";
import { useRouter } from "next/router";

export default function NewCustomer() {
  const router = useRouter()
  const toast = useToast()

  const { handleSubmit, register, formState } = useForm<AddCustomerDTO>()

  const handleSubmitForm = async (data: AddCustomerDTO) => {
    try {
      const addCustomerUseCase = makeAddCustomerUseCase()
      await addCustomerUseCase.execute(data)

      toast({
        title: "Sucesso",
        description: "Cliente cadastrado com sucesso",
        status: "success",
      })
      router.push("/")
    } catch (error) {
      toast({
        title: "Erro",
        description: error.message,
        status: "error",
      })
    }
  }

  return (
    <AppLayout>
      <Flex flexDir="column" alignItems="flex-start" mb="8">
        <Heading fontSize="md" lineHeight="160%">
          Add client
        </Heading>
        <Text fontSize="md">
          Set the information to set a new client
        </Text>
      </Flex>

      <Box as="form" onSubmit={handleSubmit(handleSubmitForm)} h="16" w="80">
        <VStack alignItems="flex-start" spacing="5" mb="8">
          <FormControl>
            <Input placeholder="Name" {...register('name')} />
          </FormControl>
          <FormControl>
            <Input placeholder="E-mail" {...register('email')} />
          </FormControl>
          <FormControl>
            <Input placeholder="CPF" as={InputMask} mask="999.999.999-99" maskChar={null} {...register('document')} />
          </FormControl>
          <FormControl>
            <Input type="tel" placeholder="Phone Number" as={InputMask} mask="(99)99999-9999" maskChar={null} {...register('phone')} />
          </FormControl>
          <FormControl>
            <Select id="status" placeholder="Status" {...register('status')}>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="WAITING_FOR_ACTIVATION">Waiting for Ativation</option>
              <option value="DISABLED">Disabled</option>
            </Select>
          </FormControl>
        </VStack>

        <HStack spacing="5" pb={8}>
          <Button type="submit" colorScheme="orange" leftIcon={<FiPlus />} isLoading={formState.isSubmitting}>
            Add
          </Button>
          <Link href="/" passHref>
            <Button variant="link">Back</Button>
          </Link>
        </HStack>
      </Box>
    </AppLayout>
  );
}
