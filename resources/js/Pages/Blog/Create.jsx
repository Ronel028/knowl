import { useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import { Link } from "@inertiajs/react";
import MainLayout from "../layout/main"
import Input from "../Components/Forms/Input";
import RteEditor from "../Components/Markdown/Rte";

const CreateBlog = () => {

    const [rteValue, setRteValue] = useState(null)
    const [image, setImage] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <>
            <MainLayout>
                <div className=" mb-8 py-4 border-b">
                    <h1 className=" text-xl font-bold">Get Started on Your New Blog Today📒</h1>  
                </div>
                <div className="pb-8">
                    <form>
                        <div className=" grid grid-cols-[70%_27%] gap-[3%]">
                            <div>
                                <Input type="text" label="Title" placeholder="Create your unique title of your blog here..." className="mb-5" />
                                <Input type="text" label="Description(Optional)" placeholder="Add description of your blog here..." className="mb-5" />
                            </div>
                            <div className="w-full h-[200px] p-2 mb-4 flex bg-gray-100 border-dashed border-2 border-gray-400 rounded-md items-center mx-auto text-center cursor-pointer">
                                <input id="upload" type="file" className="hidden" accept="image/*" onChange={onImageChange} />
                                <label htmlFor="upload" className="cursor-pointer w-full h-[200px] py-2 flex items-center justify-center">
                                {
                                    image === null ? <div>
                                            <div className=" flex items-center justify-center">
                                                <MdOutlineFileUpload className=" text-4xl" />
                                            </div>
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
                                            <p className="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b className="text-gray-600">2mb</b></p>
                                            <p className="font-normal text-sm text-gray-400 md:px-6">and should be in <b className="text-gray-600">JPG, PNG, or WEBP</b> format.</p>
                                            <span id="filename" className="text-gray-500 bg-gray-200 z-50"></span>
                                        </div> : <img className=" w-full h-full object-cover rounded-md" src={image} alt="" />
                                }
                                </label>
                            </div>
                        </div>
                        <div className=" mb-2">
                            <RteEditor setRteValue={setRteValue} rteValue={rteValue} />
                        </div>
                        <div className=" flex items-center justify-end gap-2">
                            <Link href="/" className=" font-bold border border-secondary  py-2 text-sm rounded px-3 text-primary tracking-wide">Back</Link>
                            <button type="submit" className=" font-bold bg-secondary  py-2 text-sm rounded px-3 text-light tracking-wide">Save to Draft</button>
                            <button type="submit" className=" font-bold bg-indigo-700 py-2 text-sm rounded px-3 text-light tracking-wide">Publish</button>
                        </div>
                    </form>
                </div>  
            </MainLayout> 
        </>
    )  
}

export default CreateBlog