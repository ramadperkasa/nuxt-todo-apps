<template>
  <div>
    <div class="mb-2">
      <v-breadcrumbs
        :items="breadcrumb"
        color="primary"
        active-color="blue-grey-darken-1"
        class="font-weight-medium px-0 pt-0"
      >
        <template v-slot:prepend>
          <v-icon icon="mdi-home" color="primary" size="small"></v-icon>
        </template>
      </v-breadcrumbs>
    </div>

    <v-card class="mb-5" flat rounded="lg">
      <div class="d-flex align-center justify-space-between pa-2">
        <h1 class="text-subtitle-1 font-weight-bold">Daftar Piutang Unit</h1>
        <div class="d-flex align-center" style="gap: 8px">
          <v-btn
            @click="isShowFilter = !isShowFilter"
            variant="tonal"
            :color="!isShowFilter ? 'info' : 'error'"
            size="small"
            flat
          >
            <template v-slot:prepend>
              <v-icon>{{
                !isShowFilter ? "mdi-filter" : "mdi-filter-remove"
              }}</v-icon>
            </template>
            {{ !isShowFilter ? "Show Filter" : "Hide Filter" }}
          </v-btn>

          <v-btn
            color="warning"
            rounded="lg"
            size="small"
            variant="tonal"
            @click="exportData"
          >
            <template v-slot:prepend>
              <v-icon>mdi-file-export</v-icon>
            </template>
            Export
          </v-btn>

          <v-btn
            :disabled="selected.length === 0"
            color="primary"
            rounded="lg"
            size="small"
            variant="tonal"
            @click="showConfirmationModal = true"
          >
            <template v-slot:prepend>
              <v-icon>mdi-file-import</v-icon>
            </template>
            Bayar
          </v-btn>

          <v-btn
            icon
            size="small"
            flat
            :disabled="loading"
            @click="
              loadItems({ page: 1, itemsPerPage: itemsPerPage, sortBy: sortBy })
            "
            :loading="loading"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card>

    <v-card v-if="isShowFilter" flat rounded="lg" class="mb-5 pa-2">
      <h2 class="text-body-2 font-weight-bold mb-4">Filter</h2>

      <div class="mx-5 mb-2">
        <v-row dense>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filter.noKewajiban"
              label="No. Kewajiban"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filter.noPolisi"
              label="No. Polisi"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filter.pemilik"
              label="Pemilik"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filter.peserta"
              label="Peserta"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="filter.nomorVA"
              label="Nomor VA"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="filter.status"
              :items="listDataStatus"
              item-title="status"
              item-value="id"
              label="Status"
            ></v-select>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="6">
            <div class="text-body-2">
              Harga: {{ formatMoney(filter.harga[0]) }} -
              {{ formatMoney(filter.harga[1]) }}
            </div>
            <v-range-slider
              v-model="filter.harga"
              :min="0"
              :max="200000000"
              thumb-label
              color="primary"
            ></v-range-slider>
          </v-col>
          <v-col cols="12" md="6">
            <div class="text-body-2">
              Biaya Admin: {{ formatMoney(filter.biayaAdmin[0]) }} -
              {{ formatMoney(filter.biayaAdmin[1]) }}
            </div>
            <v-range-slider
              v-model="filter.biayaAdmin"
              :min="0"
              :max="200000000"
              thumb-label
              color="primary"
            ></v-range-slider>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="6">
            <div class="text-body-2">
              PPN: {{ formatMoney(filter.ppn[0]) }} -
              {{ formatMoney(filter.ppn[1]) }}
            </div>
            <v-range-slider
              v-model="filter.ppn"
              :min="0"
              :max="200000000"
              thumb-label
              color="primary"
            ></v-range-slider>
          </v-col>
          <v-col cols="12" md="6">
            <div class="text-body-2">
              Total: {{ formatMoney(filter.total[0]) }} -
              {{ formatMoney(filter.total[1]) }}
            </div>
            <v-range-slider
              v-model="filter.total"
              :min="0"
              :max="200000000"
              thumb-label
              color="primary"
            ></v-range-slider>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col cols="12" md="4">
            <div class="text-body-2">Tanggal Lelang</div>
            <VueDatePicker
              v-model="filter.tanggalLelang"
              range
              :teleport="true"
              label="Tanggal Lelang"
            />
          </v-col>
          <v-col cols="12" md="4">
            <div class="text-body-2">Tanggal Jatuh Tempo</div>
            <VueDatePicker
              v-model="filter.tanggalJatuhTempo"
              range
              :teleport="true"
              label="Tanggal Jatuh Tempo"
            />
          </v-col>

          <v-col cols="12" md="4">
            <div class="text-body-2">Tanggal Lunas</div>
            <VueDatePicker
              v-model="filter.tanggalLunas"
              range
              :teleport="true"
              label="Tanggal Lunas"
            />
          </v-col>
        </v-row>

        <div class="d-flex w-100 justify-end mt-3">
          <v-btn @click="applyFilters" color="primary">Apply Filters</v-btn>
        </div>
      </div>
    </v-card>

    <v-card class="pa-5" flat rounded="lg" elavation="0">
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items="serverItems"
        :items-length="totalItems"
        :loading="loading"
        :search="search"
        item-value="id"
        show-select
        return-object
        item-selectable="selectable"
        v-model="selected"
        :sort-by="sortBy"
        multi-sort
        @update:options="loadItems"
        class="rounded elavaion-0"
      >
        <template v-slot:item.hargaTerbentuk="{ item }">
          {{ formatMoney(item.hargaTerbentuk) }}
        </template>

        <template v-slot:item.biayaAdminExPPN="{ item }">
          {{ formatMoney(item.biayaAdminExPPN) }}
        </template>

        <template v-slot:item.ppn="{ item }">
          {{ formatMoney(item.ppn) }}
        </template>

        <template v-slot:item.total="{ item }">
          {{ formatMoney(item.total) }}
        </template>

        <template v-slot:item.tanggalLelang="{ item }">
          {{ formatDate(item.tanggalLelang) }}
        </template>

        <template v-slot:item.tanggalJatuhTempo="{ item }">
          {{ formatDate(item.tanggalJatuhTempo) }}
        </template>

        <template v-slot:item.tanggalLunas="{ item }">
          {{ formatDate(item.tanggalLunas) }}
        </template>

        <template v-slot:item.status="{ item }">
          <v-chip
            :color="findStatus(item.status).color"
            text-color="white"
            small
            class="font-weight-medium"
          >
            {{ findStatus(item.status).status }}
          </v-chip>
        </template>
      </v-data-table-server>
    </v-card>

    <v-dialog
      :disabled="loading"
      :loading="loading"
      v-model="showConfirmationModal"
      flat
      rounded="lg"
      max-width="500"
    >
      <v-card flat rounded="lg">
        <v-card-title class="text-subtitle-1 font-weight-bold"
          >Konfirmasi</v-card-title
        >
        <v-card-text> Apakah kamu yakin akan membayar ini? </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="warning"
            variant="tonal"
            @click="showConfirmationModal = false"
          >
            Batal
          </v-btn>
          <v-btn color="primary" variant="tonal" @click="handleButtonBayar">
            Ya, Bayar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      :timeout="2000"
      color="success"
      location="top right"
      flat
      rounded="lg"
      v-model="showAlertSuccess"
    >
      <h1 class="text-subtitle-2 font-weight-bold">Berhasil</h1>
      <h2 class="text-body-1">Data berhasil diubah</h2>
    </v-snackbar>
  </div>
</template>

<script lang="ts" setup>
import { listDataStatus } from "@/constants/data";

const listDataStore = useMyDataStore();

onMounted(() => {
  loadItems({
    page: 1,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
  });
});

const breadcrumb = ref([
  {
    title: "Home",
    disabled: false,
    href: "/",
  },
  {
    title: "Daftar Piutang Unit",
    disabled: false,
    active: true,
  },
]);

const listData = ref(listDataStore.listData);

const showConfirmationModal = ref(false);

const showAlertSuccess = ref(false);

const filter = ref({
  noKewajiban: "",
  noPolisi: "",
  pemilik: "",
  peserta: "",
  nomorVA: "",
  harga: [0, 200000000],
  biayaAdmin: [0, 200000000],
  ppn: [0, 200000000],
  total: [0, 200000000],
  tanggalLelang: null,
  tanggalJatuhTempo: null,
  tanggalLunas: null,
  status: null,
});

const isShowFilter = ref(false);

const headers = reactive([
  {
    title: "No. Kewajiban",
    key: "noKewajiban",
    align: "start",
  },
  { title: "No. Polisi", key: "noPolisi", align: "start" },
  { title: "Pemilik", key: "pemilik", align: "start" },
  { title: "Peserta", key: "peserta", align: "start" },
  { title: "Nomor VA", key: "nomorVA", align: "start" },
  { title: "Harga", key: "hargaTerbentuk", align: "start" },
  { title: "Biaya Admin", key: "biayaAdminExPPN", align: "start" },
  { title: "PPN", key: "ppn", align: "start" },
  { title: "Total", key: "total", align: "start" },
  { title: "Tanggal Lelang", key: "tanggalLelang", align: "start" },
  { title: "Tanggal Jatuh Tempo", key: "tanggalJatuhTempo", align: "start" },
  { title: "Tanggal Lunas", key: "tanggalLunas", align: "start" },
  { title: "Status", key: "status", align: "start" },
]);

const selected = ref([]);

const findStatus = (status: number) => {
  return listDataStatus.find((item) => item.id === status);
};

const search = ref("");
const serverItems = ref([]);
const loading = ref(true);
const totalItems = ref(0);
const sortBy = ref([]);
const itemsPerPage = ref(5);

const loadItems = async ({ page, itemsPerPage, sortBy }) => {
  loading.value = true;

  try {
    const { items, total } = await fetch({ page, itemsPerPage, sortBy });
    serverItems.value = items;
    totalItems.value = total;
  } catch (error) {
    console.error("Failed to load items:", error);
  } finally {
    loading.value = false;
  }
};

const fetch = async ({ page, itemsPerPage, sortBy }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      let items = listData.value.slice();

      if (filter.value.noKewajiban) {
        items = items.filter((item) =>
          item.noKewajiban.includes(filter.value.noKewajiban)
        );
      }
      if (filter.value.noPolisi) {
        items = items.filter((item) =>
          item.noPolisi.includes(filter.value.noPolisi)
        );
      }
      if (filter.value.pemilik) {
        items = items.filter((item) =>
          item.pemilik.includes(filter.value.pemilik)
        );
      }
      if (filter.value.peserta) {
        items = items.filter((item) =>
          item.peserta.includes(filter.value.peserta)
        );
      }
      if (filter.value.nomorVA) {
        items = items.filter((item) =>
          item.nomorVA.includes(filter.value.nomorVA)
        );
      }
      if (filter.value.status !== null) {
        items = items.filter((item) => item.status === filter.value.status);
      }
      items = items.filter(
        (item) =>
          item.hargaTerbentuk >= filter.value.harga[0] &&
          item.hargaTerbentuk <= filter.value.harga[1]
      );
      items = items.filter(
        (item) =>
          item.biayaAdminExPPN >= filter.value.biayaAdmin[0] &&
          item.biayaAdminExPPN <= filter.value.biayaAdmin[1]
      );
      items = items.filter(
        (item) =>
          item.ppn >= filter.value.ppn[0] && item.ppn <= filter.value.ppn[1]
      );
      items = items.filter(
        (item) =>
          item.total >= filter.value.total[0] &&
          item.total <= filter.value.total[1]
      );
      if (filter.value.tanggalLelang) {
        items = items.filter(
          (item) =>
            new Date(item.tanggalLelang) >=
              new Date(filter.value.tanggalLelang[0]) &&
            new Date(item.tanggalLelang) <=
              new Date(filter.value.tanggalLelang[1])
        );
      }
      if (filter.value.tanggalJatuhTempo) {
        items = items.filter(
          (item) =>
            new Date(item.tanggalJatuhTempo) >=
              new Date(filter.value.tanggalJatuhTempo[0]) &&
            new Date(item.tanggalJatuhTempo) <=
              new Date(filter.value.tanggalJatuhTempo[1])
        );
      }
      if (filter.value.tanggalLunas) {
        items = items.filter(
          (item) =>
            new Date(item.tanggalLunas) >=
              new Date(filter.value.tanggalLunas[0]) &&
            new Date(item.tanggalLunas) <=
              new Date(filter.value.tanggalLunas[1])
        );
      }

      if (sortBy.length) {
        items.sort((a, b) => {
          for (const { key, order } of sortBy) {
            const aValue = a[key];
            const bValue = b[key];

            if (aValue > bValue) return order === "desc" ? -1 : 1;
            if (aValue < bValue) return order === "desc" ? 1 : -1;
          }
          return 0;
        });
      }

      const paginated = items.slice(start, end).map((item) => {
        return {
          ...item,
          selectable: item.status !== 2,
        };
      });
      resolve({ items: paginated, total: items.length });
    }, 500);
  });
};

const formatMoney = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

const formatDate = (value: string) => {
  try {
    return new Intl.DateTimeFormat("id-ID").format(new Date(value));
  } catch (error) {
    return "-";
  }
};

const exportData = () => {
  const csvContent =
    "data:text/csv;charset=utf-8," +
    headers.map((header) => header.title).join(",") +
    "\n" +
    serverItems.value
      .map((item) => headers.map((header) => item[header.key]).join(","))
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "daftar_piutang_unit.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleButtonBayar = async () => {
  try {
    selected.value.forEach((item) => {
      const index = listData.value.findIndex((data) => data.id === item.id);
      listData.value[index].status = 2;
    });

    selected.value = [];

    await loadItems({
      page: 1,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
    });

    showConfirmationModal.value = false;

    showAlertSuccess.value = true;
  } catch (error) {
    console.error("Failed to pay items:", error);
  }
};

const applyFilters = () => {
  loadItems({
    page: 1,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
  });
};
</script>

<style></style>
