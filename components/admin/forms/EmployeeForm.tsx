"use client";
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { createEmployee, employeeById, employeeEdit } from '@/services/employee-api';
import { resetCurrentEmployee } from '@/redux/features/employee-slice';

interface EmployeeFormProps {
  id?: string;
}

const roleOptions = [
  { value: 'leads manager', label: 'Leads Manager' },
  { value: 'approval manager', label: 'Approval Manager' },
  { value: 'feedback manager', label: 'Feedback Manager' },
  { value: 'hr manager', label: 'HR Manager' },
  { value: 'site manager', label: 'Site Manager' }
];

const EmployeeForm = ({ id }: EmployeeFormProps) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { currentEmployee } = useSelector((state: any) => state.employee);

    const [passPhotoImg, setPassPhotoImg] = useState("");
    const [aadharFrontImg, setAadharFrontImg] = useState("");
    const [aadharBackImg, setAadharBackImg] = useState("");
    const [panImg, setPanImg] = useState("");
    const [rationCardImg, setRationCardImg] = useState("");
    const [higherEducationImg, setHigherEducationImg] = useState("");
    const [resumeImg, setResumeImg] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("");

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        employeeId: Yup.string().optional(),
        email: Yup.string().email("Valid email is required").required("Email is required"),
        password: id ? Yup.string().optional() : Yup.string().required("Password is required"),
        mobileNumber: Yup.string().optional(),
        alternateMobileNumber: Yup.string().optional(),
        passPhoto: Yup.mixed().optional(),
        aadharFront: Yup.mixed().optional(),
        aadharBack: Yup.mixed().optional(),
        pan: Yup.mixed().optional(),
        rationCardFront: Yup.mixed().optional(),
        higherEducation: Yup.mixed().optional(),
        resume: Yup.mixed().optional(),
        presentAddress: Yup.string().optional(),
        permanentAddress: Yup.string().optional(),
        fatherHusbandWifeName: Yup.string().optional(),
        fatherHusbandWifeMobileNumber: Yup.string().optional(),
        isActive: Yup.boolean().optional(),
    })

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        control
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        if(id) {
            (dispatch as any)(employeeById(id as any)).catch((error: any) => {
                console.error('Error fetching employee:', error);
                toast.error('Error loading employee data');
            });
        }
    }, [id, dispatch])

    // Populate form when currentEmployee changes
    useEffect(() => {
        if(currentEmployee && id) {
            const data = currentEmployee.data || currentEmployee;
            setValue('name', data.name || '');
            setValue('employeeId', data.employeeId || '');
            setValue('email', data.email || '');
            setValue('mobileNumber', data.mobileNumber || '');
            setValue('alternateMobileNumber', data.alternateMobileNumber || '');
            setValue('presentAddress', data.presentAddress || '');
            setValue('permanentAddress', data.permanentAddress || '');
            setValue('fatherHusbandWifeName', data.fatherHusbandWifeName || '');
            setValue('fatherHusbandWifeMobileNumber', data.fatherHusbandWifeMobileNumber || '');
            setValue('isActive', data.isActive || true);
            
            setPassPhotoImg(data.passPhotos);
            setAadharFrontImg(data.aadharFrontPath);
            setAadharBackImg(data.aadharBackPath);
            setPanImg(data.panPath || '');
            setRationCardImg(data.rationCardFrontPath || '');
            setHigherEducationImg(data.higherEducationPath || '');
            setResumeImg(data.resumePath || '');
            
            // Set selected role (first role if multiple exist)
            if(data.roles && Array.isArray(data.roles) && data.roles.length > 0) {
                setSelectedRole(data.roles[0]);
            }
        }
    }, [currentEmployee, setValue, id])

    const onSubmit =  async (data: any) => {
        try {
            const formData = new FormData();
            
            // Add all form fields
            Object.keys(data).forEach((key) => {
                if (data[key] !== null && data[key] !== undefined) {
                    if (data[key] instanceof FileList && data[key].length > 0) {
                        formData.append(key, data[key][0]);
                    } else if (!(data[key] instanceof FileList)) {
                        formData.append(key, data[key]);
                    }
                }
            });

            // Add selected roles
            if(selectedRole) {
                formData.append('roles', selectedRole);
            }

            const action = id ? employeeEdit({ id, formData } as any) : createEmployee(formData as any);
            const response = await (dispatch as any)(action as any).unwrap();
            if (response?.status) {
                toast.success(`Employee ${ id ? 'Updated' : 'Created' } successfully!`);
                (dispatch as any)(resetCurrentEmployee());
                router.push('/admin/employees');
            } else {
                toast.error('Failed to save employee: ' + (response?.message || 'Unknown error'));
            }
        }catch(error: any){
            console.error('Error submitting form:', error);
            toast.error('Error: ' + (error?.message || 'An error occurred while saving the employee'));
        }
    }

  return (
    <form
        className="row g-3"
        role="form"
        id="employeeForm"
        name="employeeForm"
        encType="multipart/form-data"
        onSubmit={handleSubmit(onSubmit)} 
    >
        {/* Name */}
        <div className="col-md-6">
            <label htmlFor="name" className="form-label">
                Name <span className="text-danger">*</span>
            </label>
            <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Full Name"
                {...register('name')}
            />
            {errors.name && <p className="text-danger">{errors.name.message}</p>}
        </div>

        {/* Employee ID */}
        <div className="col-md-6">
            <label htmlFor="employeeId" className="form-label">
                Employee ID
            </label>
            <input
                type="text"
                className="form-control"
                id="employeeId"
                placeholder="Employee ID"
                {...register('employeeId')}
            />
            {errors.employeeId && <p className="text-danger">{errors.employeeId.message}</p>}
        </div>

        {/* Email */}
        <div className="col-md-6">
            <label htmlFor="email" className="form-label">
                Email <span className="text-danger">*</span>
            </label>
            <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
                {...register('email')}
            />
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
        </div>

        {/* Password */}
        {!id && (
            <div className="col-md-6">
                <label htmlFor="password" className="form-label">
                    Password <span className="text-danger">*</span>
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    {...register('password')}
                />
                {errors.password && <p className="text-danger">{errors.password.message}</p>}
            </div>
        )}
        <h5 className="mt-4 alert alert-secondary text-center p-1">Personal Details</h5>
        {/* Mobile Number */}
        <div className="col-md-6">
            <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
            </label>
            <input
                type="tel"
                className="form-control"
                id="mobileNumber"
                placeholder="Mobile Number"
                {...register('mobileNumber')}
            />
            {errors.mobileNumber && <p className="text-danger">{errors.mobileNumber.message}</p>}
        </div>

        {/* Alternate Mobile Number */}
        <div className="col-md-6">
            <label htmlFor="alternateMobileNumber" className="form-label">
                Alternate Mobile Number
            </label>
            <input
                type="tel"
                className="form-control"
                id="alternateMobileNumber"
                placeholder="Alternate Mobile Number"
                {...register('alternateMobileNumber')}
            />
            {errors.alternateMobileNumber && <p className="text-danger">{errors.alternateMobileNumber.message}</p>}
        </div>

        {/* Roles */}
        <div className="col-md-6">
            <label htmlFor="roles" className="form-label">
                Roles
            </label>
            <select
                id="roles"
                className="form-control form-select"
                value={selectedRole}
                onChange={(e) => {
                    setSelectedRole(e.target.value);
                }}
            >
                <option value="">Select a role</option>
                {roleOptions.map((role) => (
                    <option key={role.value} value={role.value}>
                        {role.label}
                    </option>
                ))}
            </select>
        </div>

        {/* Pass Photo */}
        <div className="col-md-6">
            <label htmlFor="passPhoto" className="form-label">
                Passport Photo
            </label>
            <input
                type="file"
                className="form-control"
                id="passPhoto"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        setValue('passPhoto', files, { shouldValidate: true });
                    }
                }}
            />
            {passPhotoImg && (
                <img
                    src={passPhotoImg ? `/api/image-proxy?url=${encodeURIComponent(passPhotoImg)}` : "/assets/admin/img/logo.png"}
                    style={{ border: "1px solid #ddd7d7", width: "100px", height: '100px', marginTop: '6px'}}
                    alt="Pass Photo"
                />
            )}
        </div>

        {/* Aadhar Front */}
        <div className="col-md-6">
            <label htmlFor="aadharFront" className="form-label">
                Upload Aadhar Front
            </label>
            <input
                type="file"
                className="form-control"
                id="aadharFront"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        setValue('aadharFront', files, { shouldValidate: true });
                    }
                }}
            />
            {aadharFrontImg && (
                <img
                    src={aadharFrontImg ? `/api/image-proxy?url=${encodeURIComponent(aadharFrontImg)}` : "/assets/admin/img/logo.png"}
                    style={{ border: "1px solid #ddd7d7", width: "100px", height: '80px', marginTop: '6px'}}
                    alt="Aadhar Front"
                />
            )}
        </div>

        {/* Aadhar Back */}
        <div className="col-md-6">
            <label htmlFor="aadharBack" className="form-label">
                Upload Aadhar Back
            </label>
            <input
                type="file"
                className="form-control"
                id="aadharBack"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        setValue('aadharBack', files, { shouldValidate: true });
                    }
                }}
            />
            {aadharBackImg && (
                <img
                    src={aadharBackImg ? `/api/image-proxy?url=${encodeURIComponent(aadharBackImg)}` : "/assets/admin/img/logo.png"}
                    style={{ border: "1px solid #ddd7d7", width: "100px", height: '80px', marginTop: '6px'}}
                    alt="Aadhar Back"
                />
            )}
        </div>

        {/* PAN Upload */}
        <div className="col-md-6">
            <label htmlFor="panUpload" className="form-label">
                Upload PAN
            </label>
            <input
                type="file"
                className="form-control"
                id="panUpload"
                accept="image/*,.pdf"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        setValue('pan', files, { shouldValidate: true });
                        setPanImg(URL.createObjectURL(files[0]));
                    }
                }}
            />
            {panImg && (
                <img
                    src={panImg ? `/api/image-proxy?url=${encodeURIComponent(panImg)}` : "/assets/admin/img/logo.png"}
                    style={{ border: "1px solid #ddd7d7", width: "100px", height: '80px', marginTop: '6px'}}
                    alt="PAN"
                />
            )}
        </div>

        {/* Ration Card Front */}
        <div className="col-md-6">
            <label htmlFor="rationCardFront" className="form-label">
                Upload Ration Card Front
            </label>
            <input
                type="file"
                className="form-control"
                id="rationCardFront"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        setValue('rationCardFront', files, { shouldValidate: true });
                        setRationCardImg(URL.createObjectURL(files[0]));
                    }
                }}
            />
            {rationCardImg && (
                <img
                    src={rationCardImg ? `/api/image-proxy?url=${encodeURIComponent(rationCardImg)}` : "/assets/admin/img/logo.png"}
                    style={{ border: "1px solid #ddd7d7", width: "100px", height: '80px', marginTop: '6px'}}
                    alt="Ration Card Front"
                />
            )}
        </div>

        {/* Higher Education */}
        <div className="col-md-6">
            <label htmlFor="higherEducation" className="form-label">
                Upload Higher Education Certificate
            </label>
            <input
                type="file"
                className="form-control"
                id="higherEducation"
                accept="image/*,.pdf"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        setValue('higherEducation', files, { shouldValidate: true });
                        setHigherEducationImg(URL.createObjectURL(files[0]));
                    }
                }}
            />
            {higherEducationImg && (
                <img
                    src={higherEducationImg ? `/api/image-proxy?url=${encodeURIComponent(higherEducationImg)}` : "/assets/admin/img/logo.png"}
                    style={{ border: "1px solid #ddd7d7", width: "100px", height: '80px', marginTop: '6px'}}
                    alt="Higher Education Certificate"
                />
            )}
        </div>

        {/* Resume */}
        <div className="col-md-6">
            <label htmlFor="resume" className="form-label">
                Upload Resume
            </label>
            <input
                type="file"
                className="form-control"
                id="resume"
                accept=".pdf,.doc,.docx"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                        setValue('resume', files, { shouldValidate: true });
                        setResumeImg(URL.createObjectURL(files[0]));
                    }
                }}
            />
            {resumeImg && (
                <small className="text-muted d-block mt-2">File uploaded ✓</small>
            )}
        </div>

        {/* Present Address */}
        <div className="col-12">
            <label htmlFor="presentAddress" className="form-label">
                Present Address
            </label>
            <textarea
                className="form-control"
                id="presentAddress"
                rows={3}
                placeholder="Present Address"
                {...register('presentAddress')}
            />
            {errors.presentAddress && <p className="text-danger">{errors.presentAddress.message}</p>}
        </div>

        {/* Permanent Address */}
        <div className="col-12">
            <label htmlFor="permanentAddress" className="form-label">
                Permanent Address
            </label>
            <textarea
                className="form-control"
                id="permanentAddress"
                rows={3}
                placeholder="Permanent Address"
                {...register('permanentAddress')}
            />
            {errors.permanentAddress && <p className="text-danger">{errors.permanentAddress.message}</p>}
        </div>

        {/* Father/Husband/Wife Name */}
        <div className="col-md-6">
            <label htmlFor="fatherHusbandWifeName" className="form-label">
                Father/Husband/Wife Name
            </label>
            <input
                type="text"
                className="form-control"
                id="fatherHusbandWifeName"
                placeholder="Father/Husband/Wife Name"
                {...register('fatherHusbandWifeName')}
            />
            {errors.fatherHusbandWifeName && <p className="text-danger">{errors.fatherHusbandWifeName.message}</p>}
        </div>

        {/* Father/Husband/Wife Mobile Number */}
        <div className="col-md-6">
            <label htmlFor="fatherHusbandWifeMobileNumber" className="form-label">
                Father/Husband/Wife Mobile Number
            </label>
            <input
                type="tel"
                className="form-control"
                id="fatherHusbandWifeMobileNumber"
                placeholder="Father/Husband/Wife Mobile Number"
                {...register('fatherHusbandWifeMobileNumber')}
            />
            {errors.fatherHusbandWifeMobileNumber && <p className="text-danger">{errors.fatherHusbandWifeMobileNumber.message}</p>}
        </div>

        {/* Active Status */}
        <div className="col-12">
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="isActive"
                    defaultChecked={true}
                    {...register('isActive')}
                />
                <label className="form-check-label" htmlFor="isActive">
                    Active
                </label>
            </div>
        </div>

        {/* Submit Buttons */}
        <div className="text-center">
            <button type="submit" className="btn btn-primary right-mrg">
                {id ? 'Update': 'Create'}
            </button>
            <button type="reset" className="btn btn-secondary">
                Reset
            </button>
        </div>
    </form>
  )
}

export default EmployeeForm
