'use client';

import { useRef, type FC, useState, type ChangeEvent } from "react"
import type { Painting } from "../../types";
import Image from "next/image";
import { create, update } from "../actions";

interface PaintingFormProps {
    painting: Partial<Painting>;
    action: 'create' | 'update';
    close?: () => void;
}

export const PaintingForm: FC<PaintingFormProps> = ({painting, action, close}) => {
    const imageInput = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState<string>(painting.image_url ?? '');

    const handleChangeImage = () => {
        if (imageInput?.current != null) imageInput.current.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target?.files == null || e.target?.files.length === 0) return;
    
        const file = e.target.files[0];

        const reader = new FileReader();
    
        reader.onloadend = function() {
            setImage(reader.result as string);
        }
    
        reader.readAsDataURL(file);
    };

    return (
        <form action={action === 'create' ? create : update} className="space-y-4">
            <div className="col-span-full">
                <label className="block text-sm font-medium leading-6 text-gray-900">Imagen del cuadro</label>
                <div className="mt-2 flex items-center gap-x-3">
                    {image !== ''
                        ? <Image alt={painting.title ?? 'painting-image'} width={64} height={64} className="w-16 h-16 object-contain rounded-md" src={image} />
                        : <div className="h-16 w-16 rounded-sm bg-gray-100" />
                    }
                    <input name="imageFile" accept="image/*" ref={imageInput} onChange={handleFileChange} type="file" id="image" className="hidden" />
                    <button type="button" onClick={handleChangeImage} className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cambiar</button>
                </div>
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="La Gioconda" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descripción</label>
                <textarea rows={3} name="description" id="description" placeholder="Describe el cuadro" className="resize-none overflow-y-scroll bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Colección</label>
                <input type="text" name="collection" id="collection" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Arte pop" />
            </div>
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Precio</label>
                <input type="text" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="500" required />
            </div>
            <button type="submit" id="submit-button" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Guardar cambios</button>
        </form>
    )
}
