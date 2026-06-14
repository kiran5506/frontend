"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createService, serviceById, serviceEdit } from '@/services/service-api';
import { resetCurrentService } from '@/redux/features/service-slice';
import { categoryList } from '@/services/category-api';
import { skillList } from '@/services/skill-api';
import MultiSelectWithPills, { OptionType } from '@/components/MultiSelectWithPills';
import { eventList } from '@/services/event-api';

interface ServiceFormProps {
  id?: string; // optional because create & edit
}

const ServiceForm = ({ id }: ServiceFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentService } = useSelector((state: any) => state.service);
    const { Categories, loading: categoriesLoading } = useSelector((state: any) => state.category);
    const { Skills, loading: skillsLoading } = useSelector((state: any) => state.skill);
    const { Events, loading: eventsLoading } = useSelector((state: any) => state.event);

    const [serviceImg, setServiceImg] = useState("");
    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
    const [selectedEvents, setSelectedEvents] = useState<OptionType[]>([]);

    const validationSchema = Yup.object().shape({
        serviceName: Yup.string().required("Service Name is required"),
        serviceType: Yup.string().required("Service Type is required"),
        portfolioType: Yup.string().required("Portfolio is required"),
        image: Yup.mixed().optional(),
        skills: Yup.string().optional(),
        event_ids: Yup.array().of(Yup.string()).optional(),
        description: Yup.string().optional(),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if(id) {
            (dispatch as any)(serviceById(id as any)).catch((error: any) => {
                console.error('Error fetching service:', error);
                toast.error('Error loading service data');
            });
        }
    }, [id, dispatch])

    useEffect(() => {
        (dispatch as any)(eventList());
    }, [dispatch]); 

    // Fetch categories on component mount
    useEffect(() => {
        (dispatch as any)(categoryList()).catch((error: any) => {
            console.error('Error fetching categories:', error);
            toast.error('Error loading categories');
        });

        (dispatch as any)(skillList()).catch((error: any) => {
            console.error('Error fetching skills:', error);
            toast.error('Error loading skills');
        });
    }, [dispatch])

    // Populate form when currentService or Events change (so we can map event ids to options)
    useEffect(() => {
        if (currentService && id) {
            const data = currentService.data || currentService;
            console.log('Current Service Data:', data);
            setValue('serviceName', data.serviceName || '');
            setValue('serviceType', data.serviceType || '');
            setValue('portfolioType', data.portfolioType || '');
            setValue('description', data.description || '');
            setServiceImg(data.image);

            // Parse skills from comma-separated string to array
            if (data.skills) {
                const skillsArray = typeof data.skills === 'string'
                    ? data.skills.split(',').map((skill: string) => skill.trim())
                    : Array.isArray(data.skills)
                        ? data.skills
                        : [];
                setSelectedSkills(skillsArray);
            } else {
                setSelectedSkills([]);
            }

            // Determine event IDs from possible shapes in service data
            let eventIds: string[] = Array.isArray(data.event_ids)
                ? data.event_ids
                : data.event_id
                    ? [data.event_id]
                    : [];

            console.log('Initial Event IDs from service data:', eventIds);
            console.log('Available Events:', Events);

            // If no explicit ids, try to infer from event names/categories
            if (eventIds.length === 0 && Events && Events.length > 0) {
                console.log('No event_ids found in service data, attempting to match by event names...');
                const eventNames = Array.isArray(data.eventCategories)
                    ? data.eventCategories
                    : data.eventCategory
                        ? [data.eventCategory]
                        : [];

                console.log('Event Names from service data:', eventNames);

                eventIds = Events.filter((ev: any) => eventNames.includes(ev.eventName)).map((ev: any) => ev._id);
            }

            // Set form value for event_ids (array of ids)
            setValue('event_ids', eventIds || []);

            // Map eventIds to MultiSelect options and set selectedEvents so the UI shows them
            if (Events && Events.length > 0 && Array.isArray(eventIds) && eventIds.length > 0) {
                const selected = Events.filter((ev: any) => eventIds.includes(ev._id)).map((ev: any) => ({ value: ev._id, label: ev.eventName } as OptionType));
                setSelectedEvents(selected);
            } else {
                // if no events selected, clear
                setSelectedEvents([]);
            }
        }
    }, [currentService, setValue, id, Events]);

    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key]) {
                    if (data[key] instanceof FileList && data[key].length > 0) {
                        formData.append(key, data[key][0]);
                    } else if (!(data[key] instanceof FileList)) {
                        formData.append(key, data[key]);
                    }
                }
            });
            
            // Add selected skills as comma-separated string
            if (selectedSkills.length > 0) {
                formData.append('skills', selectedSkills.join(', '));
            }

            console.log(id);
            const action = id ? serviceEdit({ id, formData } as any) : createService(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`Service ${id ? 'Updated' : 'Created'} successfully!`);
                (dispatch as any)(resetCurrentService());
                router.push('/admin/services');
            } else {
                toast.error('Failed to save service: ' + (response?.message || 'Unknown error'));
            }
        } catch(error: any) {
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the service'));
        }
    }

    return (
        <form
            className="row g-3"
            role="form"
            id="serviceForm"
            name="serviceForm"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)} 
        >
            {/* Service Name */}
            <div className="col-12">
                <label htmlFor="serviceName" className="form-label">
                    Service Name
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="serviceName"
                    placeholder="Enter service name"
                    {...register('serviceName')}
                />
                {errors.serviceName && <p className="text-danger">{errors.serviceName.message}</p>}
            </div>

            {/* Service Type */}
            <div className="col-12">
                <label htmlFor="serviceType" className="form-label">
                    Service Type
                </label>
                <select
                    className="form-select"
                    id="serviceType"
                    {...register('serviceType')}
                >
                    <option value="">Choose Type</option>
                    <option value="Primary">Primary Services</option>
                    <option value="Secondary">Secondary Services</option>
                </select>
                {errors.serviceType && <p className="text-danger">{errors.serviceType.message}</p>}
            </div>
            <div className="col-12">
            <MultiSelectWithPills
                id="event_ids"
                label="Select Events"
                options={Events?.map((event: any) => ({
                    value: event._id,
                    label: event.eventName
                })) || []}
                placeholder={eventsLoading ? 'Loading events...' : 'Select events'}
                value={selectedEvents}
                onChange={(value) => {
                    const selected = (value as OptionType[]) || [];
                    setSelectedEvents(selected);
                    setValue('event_ids', selected.map((option) => String(option.value)), { shouldValidate: true });
                }}
            />
            <input type="hidden" {...register('event_ids')} />
            {errors.event_ids && <p className="text-danger">{errors.event_ids.message as string}</p>}
        </div>

            {/* Portfolio */}
            <div className="col-12">
                <label htmlFor="portfolioType" className="form-label">
                    Portfolio
                </label>
                <select
                    className="form-select"
                    id="portfolioType"
                    {...register('portfolioType')}
                >
                    <option value="">Choose Portfolio Type</option>
                    <option value="Multiple">Multiple</option>
                    <option value="Single">Single</option>
                </select>
                {errors.portfolioType && <p className="text-danger">{errors.portfolioType.message}</p>}
            </div>

            {/* Image */}
            <div className="col-12">
                <label htmlFor="image" className="form-label">
                    Service Image
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="image"
                    accept="image/*"
                    placeholder="Choose image"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const files = e.target.files;
                        if (files && files.length > 0) {
                            setValue('image', files, { shouldValidate: true });
                        }
                    }}
                />
                {errors.image && <p className="text-danger">{errors.image.message}</p>}

                {serviceImg && (
                    <img
                        src={serviceImg ? `/api/image-proxy?url=${encodeURIComponent(serviceImg)}` : "/assets/admin/img/logo.png"}
                        style={{ border: "1px solid #ddd7d7", width: "120px", height: '80px', marginTop: '6px'}}
                        alt="Service preview"
                    />
                )}
            </div>

            {/* Skills */}
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

            {/* Description */}
            <div className="col-12">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    className="form-control"
                    id="description"
                    placeholder="Enter service description"
                    rows={4}
                    {...register('description')}
                />
                {errors.description && <p className="text-danger">{errors.description.message}</p>}
            </div>

            {/* Buttons */}
            <div className="text-center">
                <button type="submit" className="btn btn-primary right-mrg">
                    {id ? 'Update' : 'Create'}
                </button>
                <button type="reset" className="btn btn-secondary">
                    Reset
                </button>
            </div>
        </form>
    )
}

export default ServiceForm
