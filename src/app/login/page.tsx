import AuthForm from '@/components/AuthForm'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const LoginPage = () => {
    return (
        <div className='mt-20 flex-1 flex flex-col items-center'>
            <Card className='w-full max-w-md'>
                <CardHeader className='mb-4'>
                    <CardTitle className='text-center text-3xl'>login</CardTitle>
                </CardHeader>

                <AuthForm type='login'></AuthForm>
            </Card>
        </div>
    )
}

export default LoginPage

