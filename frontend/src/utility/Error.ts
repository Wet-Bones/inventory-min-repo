import { createStandaloneToast} from '@chakra-ui/react';


function onError(e: any): void {

  const { toast } = createStandaloneToast();

  let message = e.toString();

  if (!(e instanceof Error) && e.message) {
    message = e.message;
  }
  toast({
    title: message,
    status: 'error',
    variant: 'subtle',
    duration: 9000,
    isClosable: true,
  })
}

export default onError