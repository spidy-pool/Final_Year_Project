import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import "./index.css"

import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useRef, useState } from 'react'

const center = { lat: 48.8584, lng: 2.2945 }

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    ,
    libraries: ['places'],
  })

  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [oriB , setOriB] = useState('');
  const [desB , setDesB] = useState('');
  const [oriC , setOriC] = useState('');
  const [desC, setDesC] = useState('');
  const [oriD , setOriD] = useState('');
  const [desD , setDesD] = useState('');
  const [oriE , setOriE] = useState('');
  const [desE , setDesE] = useState('');

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef()
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef()

  if (!isLoaded) {
    return <SkeletonText />
  }

  async function calculateRoute() {
    if (originRef.current.value === '' || destiantionRef.current.value === '') {
      return
    }
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
  }

  function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
    originRef.current.value = ''
    destiantionRef.current.value = ''
  }

  const CallPathA= ()=>{
    originRef.current.value = "KIET GROUP OF INSTITUTIONS, Muradnagar, Uttar Pradesh, India";
    destiantionRef.current.value = "Agra Fort, Agra Fort, Rakabganj, Agra, Uttar Pradesh, India";
    calculateRoute();
  }
  const CallPathB=()=>{
   if(!oriB){
    const orig =  prompt("Enter Origin");
    setOriB(orig);
    const dest = prompt("Enter Destination");
    setDesB(dest);
    alert("Locatons Saved Succesfully")
   }
    originRef.current.value = oriB;
    destiantionRef.current.value = desB;
    calculateRoute();
  }
  const CallPathC=()=>{
    if(!oriC){
      const orig =  prompt("Enter Origin");
      setOriC(orig);
      const dest = prompt("Enter Destination");
      setDesC(dest);
      alert("Locatons Saved Succesfully")
     }
      originRef.current.value = oriC;
      destiantionRef.current.value = desC;
      calculateRoute();
  }
  const CallPathD=()=>{
    if(!oriD){
      const orig =  prompt("Enter Origin");
      setOriD(orig);
      const dest = prompt("Enter Destination");
      setDesD(dest);
      alert("Locatons Saved Succesfully")
     }
      originRef.current.value = oriD;
      destiantionRef.current.value = desD;
      calculateRoute();
  }
  const CallPathE=()=>{
    if(!oriE){
      const orig =  prompt("Enter Origin");
      setOriE(orig);
      const dest = prompt("Enter Destination");
      setDesE(dest);
      alert("Locatons Saved Succesfully")
     }
      originRef.current.value = oriE;
      destiantionRef.current.value = desE;
      calculateRoute();
  }

  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='100vh'
      w='100vw'
    >
      <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Box
      display={'flex'}
      flexDirection={'column'}
        position="absolute"
        left={0}
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.m'
        zIndex='1'
      >
        <HStack   flexDirection={'column'}>
          <Box margin={2}>
            <Autocomplete>
              <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
          </Box>
          <Box  margin={2}>
            <Autocomplete>
              <Input type='text' placeholder='Destination'ref={destiantionRef}  />
            </Autocomplete>
          </Box>

          <ButtonGroup margin={2}>
            <Button  margin={2} colorScheme='green' type='submit' onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton
             margin={2}
              aria-label='center back'
              icon={<FaTimes />}
              onClick={clearRoute}
            />
          </ButtonGroup>
        </HStack>
        <HStack  left={0}  justifyContent='space-between' flexDirection={'column'} textAlign={'left'}  alignItems={"left"}   >
          <Text>Distance: {distance} </Text>
          <Text className='dis' 
        WebkitMarginStart={0} 
         marginInlineStart={0}>Duration: {duration} </Text>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              map.panTo(center)
              map.setZoom(15)
            }}
          />
        </HStack>

        <div className='present'>
          <div className='sp' onClick={()=>{CallPathA()}}>1</div>
          <div className='sp' onClick={()=>{CallPathB()}}>2</div>
          <div className='sp' onClick={()=>{CallPathC()}}>3</div>
          <div className='sp' onClick={()=>{CallPathD()}}>4</div>
          <div className='sp' onClick={()=>{CallPathE()}}>5</div>
        </div>
      </Box>
    </Flex>
  )
}

export default App
