import { HStack, Button } from '@chakra-ui/react';
const Pagination = ({
  mt,
  currentPage,
  changePage,
  totalPages,
  endingLink,
  iterator,
}) => {
  let startingPoint = iterator;
  let pageBtn = [];
  for (startingPoint; startingPoint <= endingLink; startingPoint++) {
    pageBtn.push(startingPoint);
  }

  return (
    <HStack mt={mt ? mt : null}>
      {pageBtn.map((page, index) => {
        return (
          <Button
            key={index}
            isActive={currentPage === page}
            _active={{ backgroundColor: 'teal' }}
            borderRadius="50%"
            onClick={() => changePage(page)}
          >
            {page}
          </Button>
        );
      })}
    </HStack>
  );
};
export default Pagination;
