import React, { useState } from 'react';
import { Box, Flex, Image, IconButton, Circle } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

function App({ data }) {
  const slides = data;

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <Box
      maxW="280%"
      h="700px"
      w="full"
      m="auto"
      py="16"
      px="4"
      pos="relative"
      className="group"
    >
      <Image
        src={slides[currentIndex].url}
        alt="Slide"
        w="full"
        h="full"
        rounded="2xl"
        objectFit="cover"
        bg="center"
        transition="transform 0.5s"
      />
      {/* Left Arrow */}
      <IconButton
        display={['none', 'block']}
        pos="absolute"
        top="50%"
        left="5"
        transform="translateY(-50%)"
        colorScheme="teal"
        borderRadius="full"
        // p="2"
        bg="rgba(0, 0, 0, 0.2)"
        color="white"
        fontSize="2xl"
        onClick={prevSlide}
        icon={<ChevronLeftIcon boxSize={6} />}
      />
      {/* Right Arrow */}
      <IconButton
        display={['none', 'block']}
        pos="absolute"
        top="50%"
        right="5"
        transform="translateY(-50%)"
        colorScheme="teal"
        borderRadius="full"
        // p="2"
        bg="rgba(0, 0, 0, 0.2)"
        color="white"
        fontSize="2xl"
        onClick={nextSlide}
        icon={<ChevronRightIcon boxSize={6} />}
      />
      <Flex
        top="4"
        justify="center"
        py="2"
      >
        {slides.map((slide, slideIndex) => (
          <Circle
            key={slideIndex}
            size={4}
            bg={slideIndex === currentIndex ? 'teal.500' : 'gray.300'}
            _hover={{ bg: 'teal.500' }}
            cursor="pointer"
            onClick={() => goToSlide(slideIndex)}
          />
        ))}
      </Flex>
    </Box>
  );
}

export default App;
