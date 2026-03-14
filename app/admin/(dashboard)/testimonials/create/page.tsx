import TestimonialForm from '@/components/admin/forms/TestimonialForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateTestimonial = () => {
    const id = "";
  return (
    <CreateLayout title={'Testimonial Create'} >
        <TestimonialForm  id={id} />
    </CreateLayout>
  )
}

export default CreateTestimonial
