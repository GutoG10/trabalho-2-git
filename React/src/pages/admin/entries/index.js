import React, { useState } from "react";
import HeadAdm from "@/components/HeadAdm";
import Head from "next/head";
import EntriesList from "@/components/EntriesList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Entries() {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  // Calcula a data de 6 meses à frente a partir de hoje
  const sixMonthsAhead = new Date();
  sixMonthsAhead.setMonth(sixMonthsAhead.getMonth() + 6);
  const [startDate, setStartDate] = useState(sixMonthsAgo);
  const [endDate, setEndDate] = useState(sixMonthsAhead);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Lista de Lançamentos</title>
      </Head>
      <HeadAdm />
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-semibold mb-4">Lista de Lançamentos</h1>
        <div className="flex gap-4 mb-4">
          <div>
            <label htmlFor="startDate" className="block font-medium mb-1">Data de Início:</label>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd-MM-yyyy" // Formato de data desejado
              className="px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block font-medium mb-1">Data de Fim:</label>
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd-MM-yyyy" // Formato de data desejado
              className="px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
        <EntriesList startDate={startDate.toISOString().split("T")[0]} endDate={endDate.toISOString().split("T")[0]} />
      </div>
    </div>
  );
}
