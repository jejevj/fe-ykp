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
          <template v-slot:namaSatuan="{ row: data }">
            {{ data.nama_satuan }}
          </template>
          <template v-slot:valueSatuan="{ row: data }">
            {{ data.value }}
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Tambah Data</h3>
            <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
              <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
            </div>
          </div>
          <div class="modal-body">
            <VForm
              class="form w-100"
              id="kt_login_signin_form"
              :validation=login
              @submit="onAddSatuan"
      :validation-schema="login"
            >
              <!-- Nama Satuan Input -->
              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bold text-gray-900">Nama Satuan</label>
                <Field
                  tabindex="1"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  name="nama"
                  v-model="formData.nama" 
                  autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="nama" />
                  </div>
                </div>
              </div>
  
              <!-- Banyaknya Satuan Input -->
              <div class="fv-row mb-10">
                <div class="d-flex flex-stack mb-2">
                  <label class="form-label fw-bold text-gray-900 fs-6 mb-0">Banyaknya Satuan</label>
                </div>
                <Field
                  tabindex="2"
                  class="form-control form-control-lg form-control-solid"
                  type="number"
                  name="value"
                  v-model="formData.value" 
                  min="0"
                  placeholder="1"
                  autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="value" />
                  </div>
                </div>
              </div>
  
              <div class="text-center">
                <button type="submit" class="btn btn-lg btn-primary w-100">
                  <span class="indicator-label">Tambah Data</span>
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
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">Edit Data</h3>
            <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
              <i class="ki-duotone ki-cross fs-1"><span class="path1"></span><span class="path2"></span></i>
            </div>
          </div>
          <div class="modal-body">
            <VForm
              class="form w-100"
              id="kt_login_signin_form"
              @submit="onEditSatuan"
              
      :validation-schema="login"
            >
              <!-- Nama Satuan Input -->
              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bold text-gray-900">Nama Satuan</label>
                <Field
                  tabindex="1"
                  class="form-control form-control-lg form-control-solid"
                  type="text"
                  name="nama"
                  v-model="formData.nama" 
                  autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="nama" />
                  </div>
                </div>
              </div>
  
              <!-- Banyaknya Satuan Input -->
              <div class="fv-row mb-10">
                <div class="d-flex flex-stack mb-2">
                  <label class="form-label fw-bold text-gray-900 fs-6 mb-0">Banyaknya Satuan</label>
                </div>
                <Field
                  tabindex="2"
                  class="form-control form-control-lg form-control-solid"
                  type="number"
                  name="value"
                  v-model="formData.value" 
                  min=0
                  placeholder="1"
                  autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="value" />
                  </div>
                </div>
              </div>
  
              <div class="text-center">
                <button type="submit" class="btn btn-lg btn-primary w-100">
                  <span class="indicator-label">Update Data</span>
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
  name: "Satuan",
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
      { columnName: "Nama Satuan", columnLabel: "namaSatuan" },
      { columnName: "Satuan", columnLabel: "valueSatuan" },
      { columnName: "Aksi", columnLabel: "aksi" },
    ]);

    const formData = ref({
      id: null,
      nama: "",
      value: 0,
    });

    const isEdit = ref(false); // Track if we are editing or adding
    const loading = ref(false);

    // Validation Schema (Yup)
    const login = Yup.object().shape({
      nama: Yup.string().required("Nama Satuan harus diisi"),
      value: Yup.number().min(1, "Nilai harus lebih besar dari 0").required("Nilai satuan"),
    });

    // Fetch data
    const fetchData = async () => {
      try {
        ApiService.setHeader();
        const response = await ApiService.get('satuan');
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
          nama_satuan: values.nama,
          value: values.value,
        };

        const response = await ApiService.post('satuan', requestData);

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
      formData.value.nama = data.nama_satuan;
      formData.value.value = data.value;

      // Open the edit modal
      const modalElement = document.querySelector('#kt_modal_edit');
      const modal = new Modal(modalElement as HTMLElement);
      modal.show();
    };

    // Handle Edit Form Submit
    const onEditSatuan = async (values: any) => {
      try {
        const requestData = {
          id: formData.value.id,
          nama_satuan: values.nama,
          value: values.value,
        };

        const response = await ApiService.put2(`satuan`, requestData);

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

        const response = await ApiService.del('satuan', { data: requestData }); // DELETE request with request body in JSON format

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

    onMounted(() => {
      fetchData();
      tabIndex.value = localStorage.getItem("layoutBuilderTabIndex_" + import.meta.env.VITE_APP_DEMO) || "main";
    });

    return {
      tabIndex,
      tableHeader,
      tableData,
      formData,
      isEdit,
      login,
      onAddSatuan,
      onEditSatuan,
      editData,
      deleteData,
      loading,
    };
  },
});
</script>
