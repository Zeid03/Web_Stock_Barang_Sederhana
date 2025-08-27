import { BrowserRouter, Routes, Route } from "react-router-dom";
import DaftarBarang from "./components/TableBarang.jsx";
// import TambahBarang from "./components/TambahBarang.js";
// import EditBarang from "./components/EditBarang.js";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
          Aplikasi Stok Barang
        </h1>

        <Routes>
          {/* Halaman utama: daftar barang */}
          <Route path="/" element={<DaftarBarang />} />

          {/* Halaman tambah barang */}
          {/* <Route path="/tambah" element={<TambahBarang />} /> */}

          {/* Halaman edit barang */}
          {/* <Route path="/edit/:id" element={<EditBarang />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
