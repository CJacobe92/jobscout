import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js'
import {useForm} from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import usePassword from '@/hooks/mutations/usePassword'
import { auth, role, verified } from '@/services/storage'

const formSchema =  z.object({
  password: z.string().min(8, {
    message: 'Password must be more than 8 characters in length'
  }).max(16, {
    message: 'Password cannot exceed 16 characters'
  })
})

const Password = () => {

  const location = useLocation()
  const query = new URLSearchParams(location.search)
  const type: string = query.get('type') || ''
  const token: string = query.get('token') || ''

  const { mutate } = usePassword();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ''
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({password: values.password, token: token}, {
      onSuccess: (data) => {
        role.set(data?.role || '')
        auth.set(data?.accessToken || '')
        verified.set(data?.uid  || '')

        navigate(`/dashboard/${data?.role}/${data?.uid}`)
      }, 
      onError: () => {
        navigate('/signin')
      }
    })
  }

  return (
    <div className='flex items-center justify-center w-full min-h-screen'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='p-4 space-y-4 rounded-md w-96'>
          <div className='mt-4 space-y-2 text-center'>
            <h1 className='text-2xl font-bold text-primary'>JobScout</h1>
            <p className='text-xl font-semibold text-gray-500'>{type.charAt(0).toUpperCase() + type.slice(1)} Sign-In</p>
            <span className='text-xs font-semibold text-gray-700'>Don't have an account? <Link to={'/signup'} className='underline text-primary'>Sign up.</Link></span>
          </div>
          <FormField 
            control={form.control}
            name='password'
            render={({field}) => (
              <FormItem>
                <FormLabel className='text-gray-600'>Password</FormLabel>
                <FormControl>
                  <Input type='password' placeholder='user@jobscout.com | username92' {...field} className='rounded-sm'/>
                </FormControl>
                <FormDescription>
                  Enter your username or email
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='w-full text-right'>
            <Button type='submit' className='w-full text-sm rounded-sm primary'>NEXT</Button>
          </div>
          <p className='text-xs font-semibold text-center text-gray-700'>
            "By signing in, you agree to our privacy policy and terms of service."
          </p>
        </form>
      </Form>
    </div>
  )
}

export default Password