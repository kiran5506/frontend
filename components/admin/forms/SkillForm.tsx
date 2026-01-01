"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createSkill, skillById, skillEdit } from '@/services/skill-api';
import { resetCurrentSkill } from '@/redux/features/skill-slice';

interface SkillFormProps {
  id?: string;
}

const SkillForm = ({ id }: SkillFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentSkill } = useSelector((state: any) => state.skill);

    const validationSchema = Yup.object().shape({
        skillName: Yup.string().required("Skill name is required"),
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
            (dispatch as any)(skillById(id as any)).catch((error: any) => {
                console.error('Error fetching skill:', error);
                toast.error('Error loading skill data');
            });
        }
    }, [id, dispatch])

    useEffect(() => {
        if(currentSkill && id) {
            const data = currentSkill.data || currentSkill;
            setValue('skillName', data.skillName || '');
        }
    }, [currentSkill, setValue, id])

    const onSubmit =  async (data: any) => {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (data[key]) {
                    formData.append(key, data[key]);
                }
            });
            const action = id ? skillEdit({ id, formData } as any) : createSkill(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`Skill ${ id ? 'Updated' : 'Created' } successfully!`);
                (dispatch as any)(resetCurrentSkill());
                router.push('/admin/skills');
            } else {
                toast.error('Failed to save skill: ' + (response?.message || 'Unknown error'));
            }
        }catch(error: any){
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the skill'));
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
        <label htmlFor="skillName" className="form-label">
            Skill Name
        </label>
        <input
            type="text"
            className="form-control"
            id="skillName"
            {...register('skillName')}
        />
        {errors.skillName && <p className="text-danger">{errors.skillName.message}</p>}
        </div>
        
        <div className="col-12">
        <button className="btn btn-primary" type="submit">
            {id ? 'Update' : 'Create'} Skill
        </button>
        </div>
    </form>
  )
}

export default SkillForm
