declare global {
  interface BreadCrumbItem {
    title: string;
    disabled: boolean;
    href?: string;
    active?: boolean;
  }

  interface Filter {
    noKewajiban: string;
    noPolisi: string;
    pemilik: string;
    peserta: string;
    nomorVA: string;
    harga: [number, number];
    biayaAdmin: [number, number];
    ppn: [number, number];
    total: [number, number];
    tanggalLelang: Date | null;
    tanggalJatuhTempo: Date | null;
    tanggalLunas: Date | null;
    status: number | null;
  }

  interface TableHeader {
    title: string;
    key: string;
    align: string;
  }

  interface SortBy {
    key: string;
    order: "asc" | "desc";
  }

  interface ServerItem {
    id: string | number;
    noKewajiban: string;
    noPolisi: string;
    pemilik: string;
    peserta: string;
    nomorVA: string;
    hargaTerbentuk: number;
    biayaAdminExPPN: number;
    ppn: number;
    total: number;
    tanggalLelang: string;
    tanggalJatuhTempo: string;
    tanggalLunas: string;
    status: number;
  }

  const breadcrumb: Ref<BreadcrumbItem[]>;
  const listData: Ref<ServerItem[]>;
  const filter: Ref<Filter>;
  const headers: Ref<TableHeader[]>;
  const selected: Ref<ServerItem[]>;
  const search: Ref<string>;
  const serverItems: Ref<ServerItem[]>;
  const loading: Ref<boolean>;
  const totalItems: Ref<number>;
  const sortBy: Ref<SortBy[]>;
  const itemsPerPage: Ref<number>;
  const isShowFilter: Ref<boolean>;
  const showConfirmationModal: Ref<boolean>;
  const showAlertSuccess: Ref<boolean>;

  function loadItems(options: {
    page: number;
    itemsPerPage: number;
    sortBy: SortBy[];
  }): Promise<void>;
  function exportData(): void;
  function handleButtonBayar(): Promise<void>;
  function applyFilters(): void;
  function findStatus(
    status: string
  ): { id: number; status: string; color: string } | undefined;
  function formatMoney(value: number): string;
  function formatDate(value: string): string;
}
