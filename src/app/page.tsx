"use client"

import { Metadata } from "next";

import FeedbackException from "@/components/FeedbackException";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/ui/combobox";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import Loading from "@/components/Loading";
import SearchEquipment from "@/components/SearchEquipment";

import { IEquipment } from "@/interfaces/IEquipment";

// export const metadata: Metadata = {
//   title: "Início - SESOPtracker",
//   description: "Localize o que faz",
// };

const types = [
  {
    value: "patrimonio",
    label: "Patrimônio",
  },
  {
    value: "numero de item",
    label: "Número de Item",
  },
  {
    value: "lotacao",
    label: "Lotação",
  }
]

export default function Home() {

  const [loadingData, setLoadingData] = useState<boolean>(false)
  const [selectType, setSelectType] = useState<string>("patrimonio")
  const [equipmentIdentifier, setEquipmentIdentifier] = useState("")

  const [searchResults, setSearchResults] = useState<IEquipment[]>([]);

  const [error, setError] = useState<string | null>(null)
  const handleSearch = async (e: FormEvent) => {
    e.preventDefault()
    setLoadingData(true)

    if (selectType == "" || equipmentIdentifier == "") {
      setError("Informe tipo e o equipamento")
      setLoadingData(false)
      return
    } 

    const response = await fetch(`/data/equipamentos.json`);
    const data: IEquipment[] = await response.json();

    const filteredResults = data.filter(item => {
      const info = item[selectType == "patrimonio" ? "patrimonio" : selectType == "lotacao" ? "lotacao" : "item"]
      return info !== null && info.toString().toLowerCase().includes(equipmentIdentifier.toLowerCase())
    });

    if (!filteredResults.length) { 
      setError("Equipamento não encontrado") 
    }

    setSearchResults(filteredResults);
    setLoadingData(false)
  }

  useEffect(() => {
    setError(null)
  }, [selectType, equipmentIdentifier])

  if (searchResults.length) return <SearchEquipment list={searchResults}/>

  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-12 lg:px-0">
      <h1 className="text-2xl font-semibold text-center"> Localize um equipamento </h1>
      <p className="mb-5 opacity-60 text-center max-w-[600px] mx-auto mt-2"> Selecione um tipo entre patrimônio, número de item e nome, e informe a identificação na caixa de texto </p>

      { error !== null &&
        <FeedbackException> { error } </FeedbackException>
      }

      <form className="grid grid-rows-3 grid-cols-1 sm:grid-rows-2 sm:grid-cols-[200px_auto] xl:grid-cols-[200px_auto_100px] xl:grid-rows-1 gap-2 max-w-full lg:max-w-[60%] w-full mx-auto mt-5" onSubmit={handleSearch}>
        <Combobox 
          className="h-14 max-w-full sm:max-w-[200px]"
          items={types} 
          value={selectType}
          onSelect={(value) => setSelectType(value)}
        />
        <Input 
          className="h-14 text-lg placeholder:text-[16px]" 
          placeholder="Localize um equipamento"
          value={equipmentIdentifier}
          onChange={(e) => setEquipmentIdentifier(e.target.value)}
        />
        
        <Button type="submit" className="sm:col-span-2 xl:w-fit xl:col-auto bg-primary h-14 text-black font-normal"> { loadingData ? <Loading/> : "Localizar equipamento" } </Button>
      </form>
    </div>
  );
}
