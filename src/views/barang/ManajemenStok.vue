<template>
  <!-- Card -->
  <div class="card mb-10">
    <div class="card-body py-8">

      <!-- Datatable Component with Aksi Column -->
      <Datatable 
        :header="tableHeader" 
        :data="tableData"
      >
        <template v-slot:no="{ row: data }">
          {{ data.index }}
        </template>
        <template v-slot:namaBarang="{ row: data }">
          {{ data.nama_barang }}
        </template>
        <template v-slot:kodeBarang="{ row: data }">
          {{ data.kode_barang }}
        </template>
        <template v-slot:hargaJual="{ row: data }">
          {{ data.harga_jual }}
        </template>
        <template v-slot:namaSatuan="{ row: data }">
          {{ data.satuan.nama_satuan }}
        </template>
        <template v-slot:jumlahKrat="{ row: data }">
          {{ data.jumlah_krat }}
        </template>
        <template v-slot:jumlahSatuan="{ row: data }">
          {{ data.jumlah_satuan }}
        </template>
        <template v-slot:Stok="{ row: data }">
          {{ data.stok }}
        </template>
        <template v-slot:aksi="{ row: data }">
          <!-- Edit and Delete buttons -->
          <button class="btn btn-sm btn-warning me-3" @click="editData(data)">Update Stok</button>
        </template>
      </Datatable>
    </div>
  </div>

  <!-- Modal for Editing Data -->
<div class="modal fade" tabindex="-1" id="kt_modal_edit">
<div class="modal-dialog modal-lg"> <!-- Large Modal -->
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">Edit Barang</h3>
      <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
        <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
      </div>
    </div>
    <div class="modal-body">
      <VForm
        class="form w-100"
        id="kt_edit_barang_form"
        :validation-schema="valid"
        @submit="onEditBarang"
      >
        <div class="row">
          <!-- Left Column -->
          <div class="col-md-6">
            <div class="fv-row mb-10" >
              <label class="form-label fs-6 fw-bold text-gray-900">Jumlah Krat</label>
              <Field
                tabindex="6"
                class="form-control form-control-lg form-control-solid"
                type="number"
                name="jumlah_krat"
                min=0
                v-model="formData.jumlah_krat"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="jumlah_krat" />
                </div>
              </div>
            </div>
            <!-- Nama Barang Input -->
            <div class="fv-row mb-10" hidden>
              <label class="form-label fs-6 fw-bold text-gray-900">Nama Barang</label>
              <Field
                tabindex="1"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="nama_barang"
                v-model="formData.nama_barang"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nama_barang" />
                </div>
              </div>
            </div>

            <!-- Kode Barang Input -->
            <div class="fv-row mb-10" hidden>
              <label class="form-label fs-6 fw-bold text-gray-900">Kode Barang</label>
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="kode_barang"
                v-model="formData.kode_barang"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="kode_barang" />
                </div>
              </div>
            </div>

            <!-- Harga Beli Input -->
            
          </div>

          <!-- Right Column -->
          <div class="col-md-6" >
            <!-- Harga Jual Input -->
            <div class="fv-row mb-10" hidden>
              <label class="form-label fs-6 fw-bold text-gray-900">Harga Jual</label>
              <Field
                tabindex="4"
                class="form-control form-control-lg form-control-solid"
                type="number"
                name="harga_jual"
                v-model="formData.harga_jual"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="harga_jual" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10" hidden>
              <label class="form-label fs-6 fw-bold text-gray-900">Harga Beli</label>
              <Field
                tabindex="3"
                class="form-control form-control-lg form-control-solid"
                type="number"
                name="harga_beli"
                v-model="formData.harga_beli"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="harga_beli" />
                </div>
              </div>
            </div>

            <!-- Satuan Dropdown -->
            <div class="fv-row mb-10" hidden>
              <label class="form-label fs-6 fw-bold text-gray-900">Satuan</label>
              <Field
                tabindex="5"
                class="form-control form-control-lg form-control-solid"
                name="id_satuan"
                v-model="formData.id_satuan"
                as="select"
              >
                <option v-for="satuan in satuans" :key="satuan.id" :value="satuan.id">
                  {{ satuan.nama_satuan }}
                </option>
              </Field>
            </div>

            <!-- Jumlah Krat Input -->
           

            <!-- Jumlah Satuan Input -->
            <div class="fv-row mb-10" >
              <label class="form-label fs-6 fw-bold text-gray-900">Jumlah Satuan</label>
              <Field
                tabindex="7"
                class="form-control form-control-lg form-control-solid"
                type="number"
                name="jumlah_satuan"
                v-model="formData.jumlah_satuan"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="jumlah_satuan" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-lg btn-primary w-100">
            <span class="indicator-label">Tambah Stok</span>
            <span class="indicator-progress">
              Please wait...
              <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          </button>
        </div>
      </VForm>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-light btn-sm" data-bs-dismiss="modal">Tutup</button>
    </div>
  </div>
</div>
</div>
  
 
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Datatable from "@/components/kt-datatable/KTDataTable.vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import ApiService from '@/core/services/ApiService';
import * as Yup from "yup";
import Swal from 'sweetalert2';
import { Modal } from "bootstrap";

export default defineComponent({
name: "listBarang",
components: {
  Datatable,
  Field,
  VForm,
  ErrorMessage,
},
setup() {
  const tabIndex = ref<string>("main");
  const tableData = ref([]);
  const tableHeader = ref([
    { columnName: "No", columnLabel: "no" },
    { columnName: "Nama Barang", columnLabel: "namaBarang" },
    { columnName: "Kode Barang", columnLabel: "kodeBarang" },
    { columnName: "Harga Beli", columnLabel: "hargaJual" },
    { columnName: "Nama Satuan", columnLabel: "namaSatuan" },
    { columnName: "Tot. Krat", columnLabel: "jumlahKrat" },
    { columnName: "Tot. Stn", columnLabel: "jumlahSatuan" },
    { columnName: "Stok", columnLabel: "Stok" },
    { columnName: "Aksi", columnLabel: "aksi" },
  ]);

  const formData = ref({
    id: null,
    nama_barang: "",
    kode_barang: "",
    harga_jual: 0,
    harga_beli: 0,
    id_satuan: "",
    jumlah_krat: 0,
    jumlah_satuan: 0,
    value: 0,
  });

  const isEdit = ref(false); // Track if we are editing or adding
  const loading = ref(false);

  // Validation Schema (Yup)
  const valid = Yup.object().shape({
      // Nama Barang should be required
      nama_barang: Yup.string().required("Nama Barang harus diisi"),

      // Kode Barang should be required
      kode_barang: Yup.string().required("Kode Barang harus diisi"),

      // Harga Beli should be a positive number and required
      harga_beli: Yup.number().min(0, "Harga Beli harus lebih besar dari 0").required("Harga Beli harus diisi"),

      // Harga Jual should be a positive number and required
      harga_jual: Yup.number().min(0, "Harga Jual harus lebih besar dari 0").required("Harga Jual harus diisi"),

      // Satuan is required and should be a valid ID
      id_satuan: Yup.string().required("Satuan harus dipilih"),

      // Jumlah Krat should be a positive integer
      jumlah_krat: Yup.number().min(0, "Jumlah Krat harus lebih besar dari 0").required("Jumlah Krat harus diisi"),

      // Jumlah Satuan should be a positive integer
      jumlah_satuan: Yup.number().min(0, "Jumlah Satuan harus lebih besar dari 0").required("Jumlah Satuan harus diisi"),
      });


  // Fetch data
  const fetchData = async () => {
    try {
      ApiService.setHeader();
      const response = await ApiService.get('barang');
      if (response.status === 200) {
        tableData.value = response.data.data.map((item, index) => {
          item.index = index + 1;
          return item;
        });
        loading.value = true;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Failed to fetch data.', 'error');
    }
  };

  
  // Handle Edit Data
  const editData = (data: any) => {
    isEdit.value = true;
    formData.value.id = data.id;
    formData.value.nama_barang = data.nama_barang;
    formData.value.kode_barang = data.kode_barang;
    formData.value.harga_jual = data.harga_jual;
    formData.value.harga_beli = data.harga_beli;
    formData.value.id_satuan = data.id_satuan;
    formData.value.jumlah_krat = data.jumlah_krat;
    formData.value.jumlah_satuan = data.jumlah_satuan;

    // Open the edit modal
    const modalElement = document.querySelector('#kt_modal_edit');
    const modal = new Modal(modalElement as HTMLElement);
    modal.show();
  };

  // Handle Edit Form Submit
  const onEditBarang = async (values: any) => {
    try {
      const requestData = {
      id: formData.value.id,
      jumlah_krat: values.jumlah_krat,
      jumlah_satuan: values.jumlah_satuan,


      };

      const response = await ApiService.put2(`barang/stok`, requestData);

      if (response.status === 200) {
          Swal.fire('Success', 'Data updated successfully!', 'success').then(() => {
          location.reload()
      });

      } else {
        Swal.fire('Failed', 'Failed to update data.', 'error');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire('Error', 'An error occurred. Please try again.', 'error');
    }
  };

  // Handle Delete Data
  const deleteData = async (id: any) => {
    try {
      const requestData = {
        id: id, // Send the id in the request body
      };

      const response = await ApiService.del('barang', { data: requestData }); // DELETE request with request body in JSON format

      if (response.status === 200) {
        Swal.fire('Success', 'Data deleted successfully!', 'success').then(() => {
          location.reload()
      });
        fetchData(); // Refresh the table data after deleting
      } else {
        Swal.fire('Failed', 'Failed to delete data.', 'error');
      }
    } catch (error) {
      console.error('Error deleting data:', error);
      Swal.fire('Error', 'An error occurred while deleting data.', 'error');
    }
  };

const satuans = ref([]);  // To store fetched satuan data
   // Fetch satuan data from API
   const fetchSatuans = async () => {
    try {
      const response = await ApiService.get("satuan");  // Replace with the actual endpoint
      if (response.status === 200) {
        satuans.value = response.data.data; // Assuming the API returns an array of satuan objects
      }
    } catch (error) {
      console.error("Failed to fetch satuans:", error);
      // Handle error, show a notification or message
    }
  };

  onMounted(() => {
    fetchData();
    fetchSatuans();
    tabIndex.value = localStorage.getItem("layoutBuilderTabIndex_" + import.meta.env.VITE_APP_DEMO) || "main";
  });

  return {
    tabIndex,
    tableHeader,
    tableData,
    formData,
    isEdit,
    valid,
    satuans,
    onEditBarang,
    editData,
    deleteData,
    loading,
  };
},
});
</script>
