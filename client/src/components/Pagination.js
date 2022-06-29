import { HStack, Button, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';
const Pagination = ({
  mt,
  currentPage,
  changePage,
  totalPages,
  endingLink,
  iterator,
  collection,
}) => {
  let startingPoint = iterator;
  let pageBtn = [];
  for (startingPoint; startingPoint <= endingLink; startingPoint++) {
    pageBtn.push(startingPoint);
  }
  const prevPage = () => {
    let newPage = currentPage - 1;
    if (newPage < 1) newPage = 1;

    changePage(newPage);
  };

  const nextPage = () => {
    let newPage = currentPage + 1;
    if (newPage > totalPages) newPage = totalPages;

    changePage(newPage);
  };

  return (
    <HStack mt={mt ? mt : null}>
      {/* <IconButton
        cursor="pointer"
        as={ChevronLeftIcon}
        onClick={prevPage}
        isDisabled={currentPage === iterator ? true : false}
      /> */}
      {pageBtn.map((page, index) => {
        return (
          <Button
            key={index}
            isActive={currentPage === page}
            _active={{ backgroundColor: 'teal' }}
            borderRadius="50%"
            onClick={() => changePage(page, collection)}
          >
            {page}
          </Button>
        );
      })}
      {/* <IconButton
        cursor="pointer"
        as={ChevronRightIcon}
        onClick={nextPage}
        isDisabled={currentPage === totalPages ? true : false}
      /> */}
    </HStack>
  );
};
export default Pagination;
