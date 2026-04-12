"use client";
import React, { useEffect, useMemo, useState } from 'react'
import { Resolver, useForm, useWatch } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from "yup";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { cityList } from '@/services/city-api';
import { serviceList } from '@/services/service-api';
import { fetchAllVendors } from '@/services/vendor-api';
import { createSuggestion, suggestionById, suggestionEdit } from '@/services/suggestion-api';
import { resetCurrentSuggestion } from '@/redux/features/suggestion-slice';

interface SuggestionFormProps {
  id?: string;
}

type City = {
  _id: string;
  cityName: string;
};

type Service = {
  _id: string;
  serviceName: string;
};

type Vendor = {
  _id: string;
  name: string;
  email?: string;
  mobile_number?: string;
};

type Suggestion = {
  _id: string;
  city_id: City;
  service_id: Service;
  manual_vendors: Vendor[];
  auto_vendors: Vendor[];
};

type SuggestionFormValues = {
  city_id: string;
  service_id: string;
  manual_vendors?: string[];
  auto_vendors?: string[];
};

type RootState = {
  city: { Cities: City[] };
  service: { Services: Service[] };
  vendor: { vendorsData: Vendor[] };
  suggestions: { currentSuggestion: Suggestion | { data?: Suggestion } | null };
};

type AppDispatch = (action: unknown) => Promise<unknown>;

const SuggestionForm = ({ id }: SuggestionFormProps) => {
  const dispatch = useDispatch() as AppDispatch;
  const router = useRouter();

  const { Cities } = useSelector((state: RootState) => state.city);
  const { Services } = useSelector((state: RootState) => state.service);
  const { vendorsData } = useSelector((state: RootState) => state.vendor);
  const { currentSuggestion } = useSelector((state: RootState) => state.suggestions);

  const [searchTerm, setSearchTerm] = useState('');

  const validationSchema = Yup.object().shape({
    city_id: Yup.string().required("City is required"),
    service_id: Yup.string().required("Service is required"),
    manual_vendors: Yup.array().of(Yup.string()).optional(),
    auto_vendors: Yup.array().of(Yup.string()).optional()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<SuggestionFormValues>({
    resolver: yupResolver(validationSchema) as unknown as Resolver<SuggestionFormValues>,
    defaultValues: {
      city_id: '',
      service_id: '',
      manual_vendors: [],
      auto_vendors: []
    }
  });

  const manualSelection = (useWatch({ control, name: 'manual_vendors' }) || []) as string[];
  const autoSelection = (useWatch({ control, name: 'auto_vendors' }) || []) as string[];

  useEffect(() => {
    dispatch(cityList() as unknown);
    dispatch(serviceList() as unknown);
    dispatch(fetchAllVendors() as unknown);
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      const runSuggestionById = suggestionById as unknown as (value: string) => unknown;
      dispatch(runSuggestionById(id)).catch(() => {
        toast.error('Error loading suggestion data');
      });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentSuggestion && id) {
      const data = (currentSuggestion && 'data' in currentSuggestion
        ? currentSuggestion.data
        : currentSuggestion) as Suggestion | null;
      if (!data) return;
      setValue('city_id', data.city_id?._id || '');
      setValue('service_id', data.service_id?._id || '');
      setValue('manual_vendors', (data.manual_vendors || []).map((vendor: Vendor) => vendor._id));
      setValue('auto_vendors', (data.auto_vendors || []).map((vendor: Vendor) => vendor._id));
    }
  }, [currentSuggestion, id, setValue]);

  const filteredVendors = useMemo(() => {
    if (!vendorsData) return [] as Vendor[];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return vendorsData;
    return vendorsData.filter((vendor) =>
      vendor?.name?.toLowerCase().includes(term) ||
      vendor?.email?.toLowerCase().includes(term) ||
      vendor?.mobile_number?.includes(term)
    );
  }, [vendorsData, searchTerm]);

  const onSubmit = async (data: SuggestionFormValues) => {
    try {
      const payload = {
        city_id: data.city_id,
        service_id: data.service_id,
        manual_vendors: data.manual_vendors,
        auto_vendors: data.auto_vendors
      };

      const runSuggestionEdit = suggestionEdit as unknown as (value: { id: string; payload: typeof payload }) => unknown;
      const runCreateSuggestion = createSuggestion as unknown as (value: typeof payload) => unknown;

      const action = id
        ? runSuggestionEdit({ id, payload })
        : runCreateSuggestion(payload);

      const result = await dispatch(action);
      const response = (result as { payload?: { status?: boolean; message?: string } }).payload;
      if (response?.status) {
        toast.success(`Suggestion ${id ? 'Updated' : 'Created'} successfully!`);
  dispatch(resetCurrentSuggestion() as unknown);
        router.push('/admin/suggestions');
      } else {
        toast.error('Failed to save suggestion: ' + (response?.message || 'Unknown error'));
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred while saving the suggestion';
      toast.error('Error: ' + message);
    }
  };

  return (
    <form
      className="row g-3"
      role="form"
      id="suggestionForm"
      name="suggestionForm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-6">
        <label htmlFor="city_id" className="form-label">Choose City</label>
        <select className="form-select" id="city_id" {...register('city_id')}>
          <option value="">Choose City</option>
          {(Cities || []).map((city) => (
            <option key={city._id} value={city._id}>
              {city.cityName}
            </option>
          ))}
        </select>
        {errors.city_id && <p className="text-danger">{errors.city_id.message}</p>}
      </div>

      <div className="col-6">
        <label htmlFor="service_id" className="form-label">Choose Service</label>
        <select className="form-select" id="service_id" {...register('service_id')}>
          <option value="">Choose Service</option>
          {(Services || []).map((service) => (
            <option key={service._id} value={service._id}>
              {service.serviceName}
            </option>
          ))}
        </select>
        {errors.service_id && <p className="text-danger">{errors.service_id.message}</p>}
      </div>

      <div className="col-6">
        <label className="form-label"><strong>Suggest Vendors</strong></label>
        <div className="input-group mb-1">
          <input
            type="text"
            className="form-control"
            placeholder="Search Here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-success" type="button">
            Search
          </button>
        </div>
      </div>

      <div className="col-md-12">
        {(filteredVendors || []).length === 0 && (
          <p className="text-muted">No vendors found.</p>
        )}
  {(filteredVendors || []).map((vendor: Vendor) => (
          <div key={vendor._id} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id={`vendor_${vendor._id}`}
              checked={manualSelection.includes(vendor._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setValue('manual_vendors', [...manualSelection, vendor._id]);
                } else {
                  setValue('manual_vendors', manualSelection.filter((id) => id !== vendor._id));
                }
              }}
            />
            <label className="form-check-label" htmlFor={`vendor_${vendor._id}`}>
              {vendor.name}
            </label>
          </div>
        ))}
      </div>

      <div className="col-6">
        <label className="form-label"><strong>Automatic Suggestions from Verified</strong></label>
      </div>

      <div className="col-md-12">
  {(vendorsData || []).map((vendor) => (
          <div key={`auto_${vendor._id}`} className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              id={`auto_${vendor._id}`}
              checked={autoSelection.includes(vendor._id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setValue('auto_vendors', [...autoSelection, vendor._id]);
                } else {
                  setValue('auto_vendors', autoSelection.filter((id) => id !== vendor._id));
                }
              }}
            />
            <label className="form-check-label" htmlFor={`auto_${vendor._id}`}>
              {vendor.name}
            </label>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">
          {id ? 'Update' : 'Submit'}
        </button>
        <button type="reset" className="btn btn-secondary" onClick={() => {
          setValue('manual_vendors', []);
          setValue('auto_vendors', []);
          setSearchTerm('');
        }}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default SuggestionForm;
