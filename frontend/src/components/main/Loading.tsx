import { Spinner, Text } from "@chakra-ui/react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";

function Loading() {
    const isFetching = useIsFetching();
    const isMutating = useIsMutating();

    const display = (isFetching || isMutating) ? 'inherit' : 'none';
  return (
    <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
        role={'status'}
        position={'relative'}
        display={display}
    >
    <Text display={'none'}>Loading...</Text>
    </Spinner>
  );
}

export default Loading