import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading';

const AddDoctor = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const { data: services, isLoading } = useQuery('services', () => fetch("https://aqueous-fjord-98916.herokuapp.com/service").then(res => res.json()))

    const imgStorageKey = "ecf851763e96e8ecc8aa85989a918bf9";
    /**
   * 3 ways to store images
   * 1. Third party storage //Free open public storage is ok for Practice project 
   * 2. Your own storage in your own server (file system)
   * 3. Database: Mongodb 
   * 
   * YUP: to validate file: Search: Yup file validation for react hook form
  */
    const onSubmit = async data => {
        const image = data.image[0];
        //new object
        const formData = new FormData();
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        img: img
                    }
                    //sent to database  
                    fetch("https://aqueous-fjord-98916.herokuapp.com/doctor", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `Bearer ${localStorage.getItem("accessToken")}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(inserted => {
                            if (inserted.insertedId) {
                                toast.success("Doctor added successfully");
                                reset();
                            }
                            else {
                                toast.error("Failed to doctor")
                            }
                            console.log('doctor', inserted);

                        })
                }

            })

    }
    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div >
            <h2 className="text-2xl text-center text-primary">Add A New Doctor</h2>
            <form className='w-full max-w-xs mx-auto' onSubmit={handleSubmit(onSubmit)}>
                {/* email with validation */}
                <div className="form-control w-full max-w-xs ">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input
                        {...register("name", {
                            required: {
                                value: true,
                                message: "Name is Required"
                            },

                        })}
                        type="name" placeholder="You Name"
                        className="input input-bordered input-secondary w-full max-w-xs" />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        {/* {errors.name?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>} */}
                    </label>
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        {...register("email", {
                            required: {
                                value: true,
                                message: "Email is Required"
                            },
                            pattern: {
                                value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                message: "provide a valid email"
                            }

                        })}
                        type="email" placeholder="You email"
                        className="input input-bordered input-secondary w-full max-w-xs" />
                    <label className="label">
                        {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                    </label>
                </div>
                {/* password with validation */}
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Speciality</span>
                    </label>
                    <select {...register("speciality")} className="select input-bordered input-secondary w-full max-w-xs">

                        {
                            services.map(service => <option
                                key={service._id}
                                value={service.name}
                            >{service.name}</option>)
                        }

                    </select>
                </div>
                <div className="form-control w-full max-w-xs ">
                    <label className="label">
                        <span className="label-text">Photo</span>
                    </label>
                    <input
                        {...register("image", {
                            required: {
                                value: true,
                                message: "Image is Required"
                            },

                        })}
                        type="file" placeholder="You Name"
                        className="input  w-full max-w-xs" />
                    <label className="label">
                        {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        {/* {errors.name?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>} */}
                    </label>
                </div>
                <input className='btn w-full  max-w-xs text-white' type="submit" value="ADD" />
            </form>
        </div>
    );
};

export default AddDoctor;