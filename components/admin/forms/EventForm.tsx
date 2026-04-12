"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createEvent, eventById, eventEdit } from '@/services/event-api';
import { resetCurrentEvent } from '@/redux/features/event-slice';
import { serviceList } from '@/services/service-api';
import { skillList } from '@/services/skill-api';
import MultiSelectWithPills, { OptionType } from '@/components/MultiSelectWithPills';

interface EventFormProps {
  id?: string;
}

const EventForm = ({ id }: EventFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentEvent } = useSelector((state: any) => state.event);
    const { Services, loading: servicesLoading } = useSelector((state: any) => state.service);
    const { Skills, loading: skillsLoading } = useSelector((state: any) => state.skill);

    const [eventImg, setEventImg] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedServices, setSelectedServices] = useState<OptionType[]>([]);

    const validationSchema = Yup.object().shape({
        eventName: Yup.string().required("Event name is required"),
        service_ids: Yup.array()
            .of(Yup.string().required())
            .min(1, "Service category is required"),
        image: Yup.mixed()
        .test(
        'required',
        'Image is required',
        (value) => {
            if (id) return true; // Skip validation on edit
            if (!value) return false;
            if (!(value instanceof FileList)) return false;
            return value.length > 0;
        }),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Fetch categories on component mount
    useEffect(() => {
        (dispatch as any)(serviceList()).catch((error: any) => {
            console.error('Error fetching services:', error);
            toast.error('Error loading services');
        });

        (dispatch as any)(skillList()).catch((error: any) => {
            console.error('Error fetching skills:', error);
            toast.error('Error loading skills');
        });
    }, [dispatch]);

    useEffect(() => {
        if(id) {
            (dispatch as any)(eventById(id as any)).catch((error: any) => {
                console.error('Error fetching event:', error);
                toast.error('Error loading event data');
            });
        }
    }, [id, dispatch])

    useEffect(() => {
        if(currentEvent && id) {
            const data = currentEvent.data || currentEvent;
            let serviceIds = Array.isArray(data.service_ids)
                ? data.service_ids
                : data.service_id
                ? [data.service_id]
                : [];

            if (serviceIds.length === 0 && Services && Services.length > 0) {
                const serviceNames = Array.isArray(data.serviceCategories)
                    ? data.serviceCategories
                    : data.serviceCategory
                    ? [data.serviceCategory]
                    : [];

                serviceIds = Services.filter((service: any) => serviceNames.includes(service.serviceName))
                    .map((service: any) => service._id);
            }

            setValue('eventName', data.eventName || '');
            setValue('service_ids', serviceIds);
            setEventImg(data.image);
            setSelectedSkills(data.skills || []);
            if (Services && Services.length > 0) {
                const mappedServices = Services.filter((service: any) => serviceIds.includes(service._id))
                    .map((service: any) => ({ value: service._id, label: service.serviceName }));
                setSelectedServices(mappedServices);
            } else {
                setSelectedServices([]);
            }
        }
    }, [currentEvent, setValue, id, Services])

    const onSubmit =  async (data: any) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === 'service_ids') return;
                if (data[key]) {
                    if (data[key] instanceof FileList && data[key].length > 0) {
                        formData.append(key, data[key][0]);
                    } else if (!(data[key] instanceof FileList)) {
                        formData.append(key, data[key]);
                    }
                }
            });

            if (selectedServices.length > 0) {
                selectedServices.forEach((service) => {
                    formData.append('service_ids', String(service.value));
                });
            }
            
            // Add selected skills
            if (selectedSkills.length > 0) {
                selectedSkills.forEach((skill) => {
                    formData.append('skills', skill);
                });
            }
            
            const action = id ? eventEdit({ id, formData } as any) : createEvent(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`Event ${ id ? 'Updated' : 'Created' } successfully!`);
                (dispatch as any)(resetCurrentEvent());
                router.push('/admin/events');
            } else {
                toast.error('Failed to save event: ' + (response?.message || 'Unknown error'));
            }
        }catch(error: any){
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the event'));
        }
    }

  return (
    <form
        className="row g-3"
        role="form"
        id="updateContent"
        name="updateContent"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)} 
    >
        <div className="col-12">
        <label htmlFor="eventName" className="form-label">
            Event Name
        </label>
        <input
            type="text"
            className="form-control"
            id="eventName"
            {...register('eventName')}
        />
        {errors.eventName && <p className="text-danger">{errors.eventName.message}</p>}
        </div>

        <div className="col-12">
            <MultiSelectWithPills
                id="service_ids"
                label="Select Services"
                options={Services?.map((service: any) => ({
                    value: service._id,
                    label: service.serviceName
                })) || []}
                placeholder={servicesLoading ? 'Loading services...' : 'Select services'}
                value={selectedServices}
                onChange={(value) => {
                    const selected = (value as OptionType[]) || [];
                    setSelectedServices(selected);
                    setValue('service_ids', selected.map((option) => String(option.value)), { shouldValidate: true });
                }}
            />
            <input type="hidden" {...register('service_ids')} />
            {errors.service_ids && <p className="text-danger">{errors.service_ids.message as string}</p>}
        </div>

        <div className="col-12">
        <label htmlFor="image" className="form-label">
            Event Image
        </label>
        <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                setValue('image', files, { shouldValidate: true });
                }
            }}
        />
        {errors.image && <p className="text-danger">{errors.image.message}</p>}
        
        {eventImg && (
             <img
                src={eventImg ? `/api/image-proxy?url=${encodeURIComponent(eventImg)}` : "/assets/admin/img/logo.png"}
                style={{ border: "1px solid #ddd7d7", width: "120px", height: '80px', marginTop: '6px'}}
            />
        )}
        </div>

        <div className="col-12">
        <label className="form-label d-block">Skills</label>
        {skillsLoading ? (
            <p>Loading skills...</p>
        ) : Skills && Skills.length > 0 ? (
            <div>
                {Skills.map((skill: any) => (
                    <div key={skill._id} className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id={`skill_${skill._id}`}
                            checked={selectedSkills.includes(skill.skillName)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setSelectedSkills([...selectedSkills, skill.skillName]);
                                } else {
                                    setSelectedSkills(selectedSkills.filter(s => s !== skill.skillName));
                                }
                            }}
                        />
                        <label className="form-check-label" htmlFor={`skill_${skill._id}`}>
                            {skill.skillName}
                        </label>
                    </div>
                ))}
            </div>
        ) : (
            <p>No skills available</p>
        )}
        </div>
        
        <div className="col-12">
        <button className="btn btn-primary" type="submit">
            {id ? 'Update' : 'Create'} Event
        </button>
        </div>
    </form>
  )
}

export default EventForm
