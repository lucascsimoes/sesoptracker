'use client'

import { ReactElement, useEffect, useState } from "react";
import { categoryService } from "@/services/categories";

import CategoryCard from "@/components/CategoryCard";

export default function Categorias(): ReactElement {

    const { data, isLoading } = categoryService.get()
     
    if (isLoading) return <p> Carregando... </p>
    if (!data) return <p> Sem categorias para mostrar </p>

    return (
        <div className="py-10 px-10 md:pt-20 lg:p-20">
            <h1 className="text-2xl font-semibold"> Lista de Categorias </h1>
            <p className="mb-5 opacity-60 max-w-[600px] mt-2"> Clique no card referente à categoria que deseja pesquisar </p>
            <div className="grid grid-cols-1 xl:grid-cols-2 xl:grid-rows-2 gap-8 mt-16">
                { data.map(category => (
                    <CategoryCard key={category.category} path={category.value} name={category.category}/>
                )) }
            </div>
        </div>
    )
}