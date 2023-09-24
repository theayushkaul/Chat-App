import { Skeleton, Stack } from '@chakra-ui/react'
import React from 'react'

const ChatLoading = () => {
  return (
    <Stack>
      <Skeleton height='50px' borderRadius="md" />
      <Skeleton height='50px' borderRadius="md" />
      <Skeleton height='50px' borderRadius="md" />
      <Skeleton height='50px' borderRadius="md" />
      <Skeleton height='50px' borderRadius="md" />
      <Skeleton height='50px' borderRadius="md" />
    </Stack>
  )
}

export default ChatLoading
