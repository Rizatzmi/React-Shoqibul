import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS } from "chart.js/auto";
import { fetchDataFromExcel } from "../Utils/FetchDataUtils";
import { FaCaretDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Statistic from "./Statistic";

ChartJS.register(CategoryScale);

const Chart = ({ file, sheet }) => {
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const jsonData = await fetchDataFromExcel(file, sheet);
      setData(jsonData);

      // Ambil daftar negara dari kolom Country
      if (jsonData && jsonData.length > 1) {
        const uniqueCountries = Array.from(
          new Set(jsonData.slice(1).map((row) => row[0]))
        );
        setCountries(uniqueCountries);
        setSelectedCountry(uniqueCountries[0]); // Set nilai default untuk dropdown
      }
    };

    fetchData();
  }, [file, sheet]);

  useEffect(() => {
    // Filter data berdasarkan negara yang dipilih
    if (data) {
      const filteredData = data
        .slice(1)
        .filter((row) => row[0] === selectedCountry);
      setFilteredData(filteredData);
    }
  }, [selectedCountry, data]);

  useEffect(() => {
    // Cek apakah tampilan adalah mobile atau tidak
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Membuat dataset untuk chart
  const chartData = {
    labels: filteredData
      .slice(startIndex, isMobileView ? startIndex + 3 : startIndex + 5)
      .map((row) => row[2]), // Menampilkan 3 atau 5 tahun saja tergantung tampilan mobile atau tidak
    datasets: [
      {
        label: "Death Number",
        data: filteredData
          .slice(startIndex, isMobileView ? startIndex + 3 : startIndex + 5)
          .map((row) => row[3]), // Menampilkan 3 atau 5 tahun saja tergantung tampilan mobile atau tidak
        backgroundColor: "rgba(0,0,0,1)",
        borderWidth: 3, // Atur ketebalan garis dataset
        borderColor: "rgba(0,0,0,1)",
      },
    ],
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(
        startIndex - (isMobileView ? 3 : 5) // Mengurangi 3 atau 5 tahun tergantung tampilan mobile atau tidak
      );
    }
  };

  // Fungsi untuk menampilkan 3 atau 5 tahun berikutnya tergantung tampilan mobile atau tidak
  const handleNext = () => {
    if (
      startIndex + (isMobileView ? 3 : 5) <
      filteredData.length // Menambah 3 atau 5 tahun tergantung tampilan mobile atau tidak
    ) {
      setStartIndex(
        startIndex + (isMobileView ? 3 : 5) // Menambah 3 atau 5 tahun tergantung tampilan mobile atau tidak
      );
    }
  };

  return (
    <div>
      <div className="flex items-center mb-4">
        <div className="relative w-80 ml-auto">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <FaCaretDown />
          </div>
        </div>
      </div>
      <div className="flex items-center">
        {startIndex > 0 && ( // Menampilkan tombol prev hanya jika bukan tampilan mobile
          <button
            className="mr-2 p-2 inline-flex items-center size-6 md:size-8 rounded-full bg-black text-white hover:bg-gray-700"
            onClick={handlePrev}
          >
            <FaChevronLeft className="text-xs md:text-base" />
          </button>
        )}
        <div className="w-full h-96">
          <Line
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  grid: {
                    color: "rgba(0,0,0,0.5)", // Mengubah warna gridline menjadi putih dengan opasitas 0.1
                  },
                },
                x: {
                  grid: {
                    color: "rgba(0,0,0,0.5)", // Mengubah warna gridline menjadi putih dengan opasitas 0.1
                  },
                },
              },
            }}
          />
        </div>
        {startIndex + (isMobileView ? 3 : 5) < filteredData.length && ( // Menampilkan tombol next hanya jika bukan tampilan mobile
          <button
            className="ml-2 p-2 inline-flex items-center size-6 md:size-8 rounded-full bg-black text-white hover:bg-gray-700"
            onClick={handleNext}
          >
            <FaChevronRight className="text-xs md:text-base" />
          </button>
        )}
      </div>
      <Statistic
        data={filteredData}
        index={startIndex}
        isMobile={isMobileView}
      />
    </div>
  );
};

export default Chart;
