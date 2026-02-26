'use client'

import Link from 'next/link'
import Image from 'next/image'
import React, { useState } from 'react'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
} from "@/components/ui/form"
import CustomInput from './CustomInput'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

// ----------------------
// Schema
// ----------------------

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  address: z.string().min(5, "Enter a valid address."),
  state: z.string().min(2, "Enter a valid state."),
  postalCode: z.string().min(4, "Enter a valid postal code."),
  dateOfBirth: z.string().min(1, "Select your date of birth."),
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      state: "",
      postalCode: "",
      dateOfBirth: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async(data: z.infer<typeof formSchema>) =>{
    setIsLoading(true)
    try {
      

      if (type === "sign-up") {
        // const newUser = await signUp(data);
        // setUser(newUser);
      } 

      if(type==='sign-in'){
        // const response = await signIn({
        //   email:data.email,
        //   password: data.password,
        // })

        // if(response) router.push('/')
      }

     

    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className='auth-form'>
      
      {/* Header */}
      <header className='flex flex-col gap-5 md:gap-8'>
        <Link href="/" className='flex cursor-pointer items-center gap-1'>
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Whizvault Logo"
          />
          <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>
            Whizvault
          </h1>
        </Link>

        <div>
          <h1 className="text-24 font-semibold text-gray-900">
            {type === 'sign-in' ? 'Sign In' : 'Sign Up'}
          </h1>
          <p className="text-14 text-gray-600">
            Please enter your details
          </p>
        </div>
      </header>

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* Sign Up Extra Fields */}
          {type === "sign-up" && (
            <>
              <div className="flex gap-4">
                <CustomInput
                  form={form}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                />

                <CustomInput
                  form={form}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                />
              </div>

              <CustomInput
                form={form}
                name="address"
                label="Address"
                placeholder="Enter your address"
              />

              <div className="flex gap-4">
                <CustomInput
                  form={form}
                  name="state"
                  label="State"
                  placeholder="Enter state"
                />

                <CustomInput
                  form={form}
                  name="postalCode"
                  label="Postal Code"
                  placeholder="Enter postal code"
                />
              </div>

              <CustomInput
                form={form}
                name="dateOfBirth"
                label="Date of Birth"
                placeholder="Select your date of birth"
                type="date"
              />
            </>
          )}

          {/* Email (Both) */}
          <CustomInput
            form={form}
            name="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
          />

          {/* Password (Both) */}
          <CustomInput
            form={form}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="form-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Loading...
              </>
            ) : type === "sign-in" ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </Form>

      {/* Footer */}
      <footer className="text-14 text-gray-600 mt-6">
        <p>
          {type === "sign-in"
            ? "Don't have an account? "
            : "Already have an account? "}
          <Link
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            className="text-blue-600 hover:underline font-medium"
          >
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </footer>

    </section>
  )
}

export default AuthForm