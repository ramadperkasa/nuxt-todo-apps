interface ListDataStatus {
  id: number;
  status: string;
  color: string;
}

export const listDataStatus: ListDataStatus[] = [
  {
    id: 1,
    status: "Konfirmasi Pembayaran",
    color: "red",
  },
  {
    id: 2,
    status: "Lunas",
    color: "green",
  },
  {
    id: 3,
    status: "Proses Pembayaran",
    color: "orange",
  },
];
