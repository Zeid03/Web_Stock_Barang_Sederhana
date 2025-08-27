import prisma from "../src/client.js";

// CREATE
export const createBarang = async (req, res) => {
  const { nama, harga, stok } = req.body;
  try {
    const barang = await prisma.barang.create({
      data: { nama, harga: Number(harga), stok: Number(stok) }
    });
    res.json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ 
export const getAllBarang = async (req, res) => {
  try {
    const barang = await prisma.barang.findMany();
    res.json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBarangByID = async (req, res) => {
  const { id } = req.params;
  try {
    const barang = await prisma.barang.findUnique({
      where: { id: Number(id) },
    });

    if (!barang) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    res.json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
export const updateBarang = async (req, res) => {
  const { id } = req.params;
  const { nama, harga, stok } = req.body;
  try {
    const barang = await prisma.barang.update({
      where: { id: Number(id) },
      data: { nama, harga: Number(harga), stok: Number(stok) }
    });
    res.json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
export const deleteBarang = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.barang.delete({ where: { id: Number(id) } });
    res.json({ message: "Barang deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
