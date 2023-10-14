import bstandard from '@/assets/bstandard.webp'
import bpremium from '@/assets/bpremium.webp'
import enterprise from '@/assets/enterprise.webp'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { plan } from '@/services/storage'
import { useNavigate } from 'react-router-dom'

type PlanItems = {
  title: string,
  image: string,
  price: string,
  description: string,
  value: string,
  button: string,
}[]

const Plan = () => {

  const planItems: PlanItems = [
    { 
      title: 'Business Standard',
      image: bstandard,
      price: '$3 user/month',
      description: 'For agencies with 50 employees and below.',
      value: 'bstndard',
      button: 'Get Started'
    },
    { 
      title: 'Business Premium',
      image: bpremium,
      price: '$5 user/month',
      description: 'For agencies with 100 employees and below.',
      value: 'bpremium',
      button: 'Get Started'
    },
    { 
      title: 'Enterprise',
      image: enterprise,
      price: 'Get a quote',
      description: 'For agencies with more than 100 employees.',
      value: 'enterprise',
      button: 'Get Started'
    },
  ]

  const navigate = useNavigate();
  
  const handleGetStarted = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value
    plan.set(value)
    navigate('/step1')
  }
  
  return (
    <div className='flex flex-row gap-6'>
      {planItems.map((data, index) =>(
        <Card key={index} className='rounded-md w-80'>
          <CardHeader>
            <div className='h-[16rem]'>
              <img src={data.image} alt="business premium" loading="lazy" width="600" height="600" style={{width:"100%", height:"auto"}}/>
            </div>
          </CardHeader>
          <CardContent className='flex flex-col gap-4'>
            <h1 className='text-xl font-semibold text-primary'>{data.title}</h1>
            <p className='text-lg font-bold text-gray-600'>{data.price}</p>
            <p className='text-xs font-semibold text-gray-700'>{data.description}</p>
            <Button onClick={handleGetStarted} value={data.value} className='rounded-sm'>{data.button}</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Plan