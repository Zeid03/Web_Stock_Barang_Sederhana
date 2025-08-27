import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../services/fetcher";
import axios from "axios";
import { formatRupiah } from "../utils/formatRupiah";

const API_URL = "http://localhost:5000/api";

const TableBarang = () => {
  const { data, error, isLoading } = useSWR(`${API_URL}/barang`, fetcher);

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState({ id: "", nama: "", harga: "", stok: "" });

  if (isLoading) return <p className="text-gray-500 animate-pulse">⏳ Loading data...</p>;
  if (error) return <p className="text-red-500">⚠️ Gagal memuat data</p>;

  const openAddModal = () => {
    setFormData({ id: "", nama: "", harga: "", stok: "" });
    setIsEdit(false);
    setIsOpen(true);
  };

  const openEditModal = (barang) => {
    setFormData(barang);
    setIsEdit(true);
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        await axios.put(`${API_URL}/barang/${formData.id}`, formData);
      } else {
        await axios.post(`${API_URL}/barang`, formData);
      }
      mutate(`${API_URL}/barang`);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan data");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus barang ini?")) {
      try {
        await axios.delete(`${API_URL}/barang/${id}`);
        mutate(`${API_URL}/barang`);
      } catch (err) {
        console.error(err);
        alert("Gagal menghapus data");
      }
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="max-w-4xl m-auto bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📦 Daftar Barang</h2>
        {/* Tombol di kanan */}
        <div className="flex justify-end mb-4">
            <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200"
            >
            + Tambah Barang
            </button>
        </div>

            {/* Table */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
            <table className="min-w-full border border-gray-200 rounded-lg bg-white">
            <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                <tr>
                <th className="px-4 py-3 text-center">No</th>
                <th className="px-4 py-3 text-center">Nama Barang</th>
                <th className="px-4 py-3 text-center">Harga</th>
                <th className="px-4 py-3 text-center">Stok</th>
                <th className="px-4 py-3 text-center">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {data.map((barang, index) => (
                <tr
                    key={barang.id}
                    className={`hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                    <td className="border px-4 py-3 text-center font-medium">{index + 1}</td>
                    <td className="border px-4 py-3">{barang.nama}</td>
                    <td className="border px-4 py-3 text-green-700 font-semibold">
                    {formatRupiah(barang.harga)}
                    </td>
                    <td className="border px-4 py-3 text-center">{barang.stok}</td>
                    <td className="border px-4 py-3 text-center space-x-2">
                    <button
                        onClick={() => openEditModal(barang)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow-sm transition"
                    >
                        ✏️ Edit
                    </button>
                    <button
                        onClick={() => handleDelete(barang.id)}
                        className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded-md shadow-sm transition"
                    >
                        🗑️ Hapus
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>

      

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md animate-fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              {isEdit ? "✏️ Edit Barang" : "➕ Tambah Barang"}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Barang"
                value={formData.nama}
                onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Harga"
                value={formData.harga}
                onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <input
                type="number"
                placeholder="Stok"
                value={formData.stok}
                onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                className="w-full border px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md transition"
                >
                  ❌ Batal
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition"
                >
                  💾 Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableBarang;
