import SliderForm from '@/components/admin/forms/SliderForm'
import CreateLayout from '@/components/common/Layouts/CreateLayout'
import React from 'react'

const CreateSlide = () => {
    const id = "";
  return (
    <CreateLayout title={'Slider Create'} >
        <SliderForm  id={id} />
    </CreateLayout>
  )
}

export default CreateSlide
