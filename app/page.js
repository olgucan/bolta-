"use client"
import Image from 'next/image'
import { useJsApiLoader , GoogleMap, Marker , Autocomplete ,DirectionsRenderer} from '@react-google-maps/api'
import { useRef, useState } from 'react'
export default function Home() {
   
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey:'AIzaSyDUjsbCoQXQQMLeS1V2t37RhkIg5JRftTM',
    libraries:['places']
  })
 
  
  const center = {lat:39.8554,lng:35.2945}
  const [map,setMap]=useState(/** @type google.maps.Map */  (null))

  const [directionResponse,setDirectionResponse]=useState(null)
  const [distance,setDistance]=useState(null)
  const [duration,setDuration]=useState(null)

  const originRef = useRef()

  const destinationRef = useRef()

  async function calculateRoute(a,b) {
    const directionService = new google.maps.DirectionsService()
    const results = await directionService.route({
      origin:a,
      destination:b,
      travelMode:google.maps.TravelMode.DRIVING
    })
    setDirectionResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
    
  }
  const clean = () => {
        setDirectionResponse(null)
    setDistance('')
    setDuration('')
   }
  if (!isLoaded) {
    return <h1>Loading ...</h1>
  }
  return (
    <main className="flex flex-col-reverse  md:flex-row md:h-[100vh] items-center md:items-start md:justify-between ">
     <div className='w-1/2 flex flex-col'>
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-2 items-center text-sm text-center mt-16	mx-8'>
        <div onClick={()=>calculateRoute('İstanbul','Münih')} className='cursor-pointer'>
        <Image src={'/iveco.jpg'} width={400} height={400} alt='iveco' />  
        <p>34AAA001 (İstanbul - Münih)</p>
        </div>
           
      <div onClick={()=>calculateRoute('İstanbul','Trieste')} className='cursor-pointer'>
      <Image src={'/man.jpg'} width={400} height={400} alt='man' />
      <p>34AAA002(İstanbul - Trieste)</p>       
      </div>
     
          <div onClick={()=>calculateRoute('İzmir','Bükreş')} className='cursor-pointer'>
          <Image src={'/scania.jpg'} width={400} height={400} alt='scania' />       
          <p>34AAA004(Izmir - Bükreş)</p>
            </div> 
     
      <div onClick={()=>calculateRoute('Mersin','İstanbul')} className='cursor-pointer'>
      <Image src={'/volvo.jpg'} width={400} height={400} alt='volvo' />      
      <p>34AAA005(Mersin - Istanbul)</p>
      </div>
      <div onClick={()=>calculateRoute('Ankara','Paris')} className='cursor-pointer'>
      <Image src={'/mercedes.jpg'} width={400} height={400} alt='mercedes' />  
      <p>34AAA003(Ankara - Paris)</p>
      </div>
    
       
      </div>
    
   <div className='flex justify-around mt-5'>
   <button className='p-3 bg-red-600 text-white rounded-md' onClick={()=>map.panTo(center)}>
    Merkeze Al
     </button>
     <button className='p-3 bg-green-600 text-white rounded-md' onClick={clean}>
     Temizle
     </button>
   </div>
     </div>

     <div className='h-[50vh] w-full md:w-1/2'>
            <GoogleMap center={center}
            onLoad={(map)=>setMap(map)} 
            zoom={15} 
            mapContainerStyle={{width:'100%',height:'100%'}}>
           <Marker position={center} />
           {directionResponse && <DirectionsRenderer directions={directionResponse}/>}
            </GoogleMap>
           {duration &&  <h1 className='text-[red] text-bold text-2xl'>
               Tahmini süre {duration} ve tahmini mesafe {distance}
            </h1>}
     </div>
   
    </main>
  )
}
