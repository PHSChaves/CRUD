import NextImage from 'next/image';

import { Box } from "@chakra-ui/react"

export const Header = () => {
  return (
    <Box 
      d="flex"
      alignItems="center"
      justifyContent="center"
      as="header" 
      bg="#000" 
      h="auto"
    >
      <NextImage src="/logo-next.png" width="550" height="125" objectFit='contain' />
    </Box>
  )
}