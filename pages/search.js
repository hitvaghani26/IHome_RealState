import { useState } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import { Box, Text, Flex, Icon, } from '@chakra-ui/react'
import { BsFilter } from "react-icons/bs";
import SearchFilter from '../components/SearchFilter'
import Property from "@/components/Property";
import noresult from "../assets/image/noresult.svg"
import { fetchApi, baseUrl } from '../utils/fecthApi'


const Search = ({ properties }) => {
    const [searchFilters, setSearchFilters] = useState();
    const router = useRouter();
    return (
        <Box>
            <Flex cursor='pointer' bg='gray.100' borderBottom='1px' borderColor="gray.200" p='2' fontWeight='bold' fontSize='large' justifyContent='center' alignItems='center'
                onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
            >
                <Text>Search Poperty by filters</Text>
                <Icon paddingLeft='2' w='7' as={BsFilter}></Icon>
            </Flex>
            {searchFilters && <SearchFilter />}
            <Text fontSize='2xl' padding='4' fontWeight='bold'>
                properties {router.query.purpose}
            </Text>
            <Flex flexWrap='wrap'>
                {properties.map((property) => <Property property={property} key={property.id}></Property>)}
            </Flex>
            {properties.length === 0 &&
                <Flex justifyContent='center' alignItems="center" flexDirection='column' marginTop='5' marginBottom='5'>
                    <Image alt="no Result" src={noresult} />
                    <Text fontSize='2xl' marginTop='3'>No result fonund</Text>
                </Flex>
            }

        </Box>
    )
}

export async function getServerSideProps({ query }) {
    const purpose = query.purpose || 'for-rent';
    const rentFrequency = query.rentFrequency || 'yearly';
    const minPrice = query.minPrice || '0';
    const maxPrice = query.maxPrice || '1000000';
    const roomsMin = query.roomsMin || '0';
    const bathsMin = query.bathsMin || '0';
    const sort = query.sort || 'price-desc';
    const areaMax = query.areaMax || '35000';
    const locationExternalIDs = query.locationExternalIDs || '5002';
    const categoryExternalID = query.categoryExternalID || '4';
  
    const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
  
    return {
      props: {
        properties: data?.hits,
      },
    };
  }
  

export default Search;