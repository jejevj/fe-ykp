<template>
  <!-- Card -->
  <div class="card mb-10">
    <div class="card-body py-8">
      <button type="button" class="btn btn-primary btn-sm w-25" data-bs-toggle="modal" data-bs-target="#kt_modal_add">
        <i class="ki-duotone ki-add-item fs-1">
          <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span>
        </i>
        Tambah Data
      </button>

      <!-- Datatable Component with Aksi Column -->
      <Datatable 
        :header="tableHeader" 
        :data="tableData"
      >
        <template v-slot:no="{ row: data }">
          {{ data.index }}
        </template>
        <template v-slot:namaToko="{ row: data }">
          {{ data.nama_toko }}
        </template>
        <template v-slot:namaPemilik="{ row: data }">
          {{ data.nama_pemilik }}
        </template>
        <template v-slot:alamat="{ row: data }">
          {{ data.alamat }}
        </template>
        <template v-slot:hp="{ row: data }">
          {{ data.hp }}
        </template>
        <template v-slot:aksi="{ row: data }">
          <!-- Edit and Delete buttons -->
          <button class="btn btn-sm btn-warning me-3" @click="editData(data)">Edit</button>
          <button class="btn btn-sm btn-danger" @click="deleteData(data.id)">Hapus</button>
        </template>
      </Datatable>
    </div>
  </div>

  <!-- Modal for Adding Data -->
<div class="modal fade" tabindex="-1" id="kt_modal_add">
<div class="modal-dialog modal-lg"> <!-- Large Modal -->
  <div class="modal-content">
    <div class="modal-header">
      <h3 class="modal-title">Tambah Pelanggan</h3>
      <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
        <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
      </div>
    </div>
    <div class="modal-body">
      <VForm
        class="form w-100"
        id="kt_add_barang_form"
        :validation-schema="valid"
        @submit="onAddSatuan"
      >
        <div class="row">
          <!-- Left Column -->
          <div class="col-md-6">
            <!-- Nama Barang Input -->
            <div class="fv-row mb-10">
              <label class="form-label fs-6 fw-bold text-gray-900">Nama Toko</label>
              <Field
                tabindex="1"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="nama_toko"
                v-model="formData.nama_toko"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nama_toko" />
                </div>
              </div>
            </div>

            <!-- Kode Barang Input -->
            <div class="fv-row mb-10">
              <label class="form-label fs-6 fw-bold text-gray-900">Nama Pemilik</label>
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="nama_pemilik"
                v-model="formData.nama_pemilik"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nama_pemilik" />
                </div>
              </div>
            </div>

          </div>
<div class="col-md-6">
  
            <!-- Harga Beli Input -->
            <div class="fv-row mb-10">
              <label class="form-label fs-6 fw-bold text-gray-900">Alamat</label>
              <Field
                tabindex="3"
                class="form-control form-control-lg form-control-solid"
                type="tezt"
                name="alamat"
                v-model="formData.alamat"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="alamat" />
                </div>
              </div>
            </div>

            
            <!-- Harga Beli Input -->
            <div class="fv-row mb-10">
              <label class="form-label fs-6 fw-bold text-gray-900">HP</label>
              <Field
                tabindex="3"
                class="form-control form-control-lg form-control-solid"
                type="tezt"
                name="hp"
                v-model="formData.hp"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="hp" />
                </div>
              </div>
            </div>
</div>
         
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-lg btn-primary w-100">
            <span class="indicator-label">Tambah Barang</span>
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
        :validation-schema="validationSchema"
        @submit="onEditBarang"
      >
        <div class="row">
          <!-- Left Column -->
          <div class="col-md-6">
            <!-- Nama Barang Input -->
            <div class="fv-row mb-10">
              <label class="form-label fs-6 fw-bold text-gray-900">Nama Toko</label>
              <Field
                tabindex="1"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="nama_toko"
                v-model="formData.nama_toko"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nama_toko" />
                </div>
              </div>
            </div>

            <!-- Kode Barang Input -->
            <div class="fv-row mb-10">
              <label class="form-label fs-6 fw-bold text-gray-900">Nama Pemilik</label>
              <Field
                tabindex="2"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="nama_pemilik"
                v-model="formData.nama_pemilik"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="nama_pemilik" />
                </div>
              </div>
            </div>

            <!-- Harga Beli Input -->
            
          </div>

          <!-- Right Column -->
          <div class="col-md-6">
            <!-- Harga Jual Input -->
            <div class="fv-row mb-10">
              <label class="form-label fs-6 fw-bold text-gray-900">Alamat</label>
              <Field
                tabindex="4"
                class="form-control form-control-lg form-control-solid"
                type="text"
                name="alamat"
                v-model="formData.alamat"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="alamat" />
                </div>
              </div>
            </div>
            <div class="fv-row mb-10">
              <label class="form-label fs-6 fw-bold text-gray-900">HP</label>
              <Field
                tabindex="3"
                class="form-control form-control-lg form-control-solid"
                type="string"
                name="hp"
                v-model="formData.hp"
                autocomplete="off"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="hp" />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="text-center">
          <button type="submit" class="btn btn-lg btn-primary w-100">
            <span class="indicator-label">Update Pelanggan</span>
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
    { columnName: "Nama Toko", columnLabel: "namaToko" },
    { columnName: "Nama Pemilik", columnLabel: "namaPemilik" },
    { columnName: "Alamat", columnLabel: "alamat" },
    { columnName: "Hp", columnLabel: "hp" },
    { columnName: "Aksi", columnLabel: "aksi" },
  ]);

  const formData = ref({
    id: null,
    nama_toko: "",
    nama_pemilik: "",
    alamat: "",
    hp: "",
  });

  const isEdit = ref(false); // Track if we are editing or adding
  const loading = ref(false);

  // Validation Schema (Yup)
  const valid = Yup.object().shape({
      // Nama Barang should be required
      nama_toko: Yup.string().required("Nama Toko harus diisi"),

      // Kode Barang should be required
      nama_pemilik: Yup.string().required("Nama Pemilik harus diisi"),

      // Harga Beli should be a positive number and required
      alamat: Yup.string().required("Alamat harus diisi"),

      // Harga Jual should be a positive number and required
      hp: Yup.string().required("Nomor HP harus diisi"),

      });


  // Fetch data
  const fetchData = async () => {
    try {
      ApiService.setHeader();
      const response = await ApiService.get('customer');
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

  // Handle Add Data
  const onAddSatuan = async (values: any) => {
    try {
      const requestData = {
      nama_toko:  values.nama_toko,
      nama_pemilik:  values.nama_pemilik,
      alamat:  values.alamat,
      hp:  values.hp,

      };

      const response = await ApiService.post('customer', requestData);

      if (response.status === 200) {
        Swal.fire('Success', 'Data added successfully!', 'success').then(() => {
          location.reload()
      });
      } else {
        Swal.fire('Failed', 'Failed to add data.', 'error');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      Swal.fire('Error', 'An error occurred. Please try again.', 'error');
    }
  };

  // Handle Edit Data
  const editData = (data: any) => {
    isEdit.value = true;
    formData.value.id = data.id;
    formData.value.nama_toko = data.nama_toko;
    formData.value.nama_pemilik = data.nama_pemilik;
    formData.value.alamat = data.alamat;
    formData.value.hp = data.hp;

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
      nama_toko: values.nama_toko,
      nama_pemilik: values.nama_pemilik,
      alamat: values.alamat,
      hp: values.hp,


      };

      const response = await ApiService.put2(`customer`, requestData);

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
    onAddSatuan,
    onEditBarang,
    editData,
    deleteData,
    loading,
  };
},
});
</script>
