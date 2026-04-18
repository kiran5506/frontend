"use client";
import React, { useEffect, useMemo, useState } from 'react';
import AdPageLayout from '../../../../components/common/Layouts/AdPageLayout';
import Table from '../../../../components/common/Table/Table';
import { fetchAdminLeads } from '@/services/lead-assignment-api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const tableHeader: string[] = ['S.No', 'Date', 'Customer', 'Mobile', 'City', 'Vendors', 'Actions'];

const LeadsCollaborations = () => {
	const [headerData, setHeaderData] = useState<string[]>(tableHeader);
	const [bodyData, setBodyData] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [filterDate, setFilterDate] = useState('');
	const router = useRouter();

	const fetchLeads = async () => {
		setLoading(true);
		try {
			const res = await fetchAdminLeads({ search: searchTerm, date: filterDate });
			if (res?.status) {
				setBodyData(res.data || []);
			} else {
				setBodyData([]);
				toast.error(res?.message || 'Unable to load leads.');
			}
		} catch (err: any) {
			toast.error(err?.message || 'Unable to load leads.');
			setBodyData([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		setHeaderData(tableHeader);
		fetchLeads();
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			fetchLeads();
		}, 300);

		return () => clearTimeout(timer);
	}, [searchTerm, filterDate]);

	const handleView = (id: string) => {
		router.push(`/admin/leads-collaborations/view/${id}`);
	};

		const mappedBodyData = useMemo(() => {
			return bodyData.map((lead: any, index: number) => {
				const dateValue = lead.enquiry_date ? new Date(lead.enquiry_date) : null;
				return {
					_id: lead.inquiry_id,
					Date: dateValue ? dateValue.toLocaleDateString('en-GB') : '--',
					Customer: lead.customer_name || 'N/A',
					Mobile: lead.customer_mobile || 'N/A',
					City: lead.city_name || 'N/A',
					Vendors: lead.vendors || 0
				};
			});
		}, [bodyData]);

	return (
		<AdPageLayout iscreate={false} title="Leads Collaborations">
			{/* <div className="row align-items-center d-flex mb-4">
				<div className="col-md-6">
					<h5 className="card-title text-start text-theme mb-3">Leads Collaborations</h5>
				</div>
				<div className="col-md-3">
					<input
						type="text"
						className="form-control"
						placeholder="Search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="col-md-3">
					<input
						type="date"
						className="form-control"
						placeholder="date"
						value={filterDate}
						onChange={(e) => setFilterDate(e.target.value)}
					/>
				</div>
			</div> */}

			{loading ? (
				<p>Loading...</p>
			) : (
				<Table
					headerData={headerData}
					bodyData={mappedBodyData}
					onView={handleView}
					isview
					isedit={false}
					isdelete={false}
					loading={loading}
				/>
			)}
		</AdPageLayout>
	);
};

export default LeadsCollaborations;
