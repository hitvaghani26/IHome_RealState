import Link from "next/link"
import Image from "next/image"
import { Flex, Box, Text, Button } from "@chakra-ui/react"
import { baseUrl,fetchApi } from "../utils/fecthApi"
import Property from "../components/Property"

const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, LinkName, imageUrl }) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10" >
    <Image src={imageUrl} width={500} height={300} alt="banner"></Image>
    <Box p="5">
      <Text color='gray.500' fontWeight='bold' fontSize='medium'>{purpose}</Text>
      <Text fontWeight='bold' fontSize='3xl'>{title1} <br /> {title2}</Text>
      <Text color='gray.700' paddingTop='3' paddingBottom='3' fontSize='lg'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl'>
        <Link href={LinkName}>{buttonText}</Link>
      </Button>

    </Box>
  </Flex>
)

export default function Home({propertiesForSales,propertiesForRent}) {
  console.log(propertiesForRent);
  return (
    <Box>


      <Banner
        purpose="RENT A HOME"
        title1="Rental Homes For"
        title2="Everyone"
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText="Explore Renting"
        LinkName='/search?purpose=for-rent'
        imageUrl="https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >

      </Banner>

      <Flex flexWrap='wrap' >
     {propertiesForRent.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>
      <Banner
        purpose="BUY A HOME"
        title1="Find, Buy and Own Your"
        title2="Dream Home"
        desc1='Explore Apartments, Villas, Homes'
        desc2='and more'
        buttonText="Explore Renting"
        LinkName='/search?purpose=for-sale'
        imageUrl="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1470&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      >

      </Banner>
      <Flex flexWrap='wrap' >

      {propertiesForSales.map((property) => <Property property={property} key={property.id}/>)}
      </Flex>

    </Box>
  )
}


export async function getStaticProps(){
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-Sale&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-Rent&hitsPerPage=6`)

  return {
    props:{
      propertiesForSales: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    }
  }
}