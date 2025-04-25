<template>
  <div class="dataTables_wrapper dt-bootstrap4 no-footer">
    <!-- Global Search Bar -->
    <div class="mb-3 mt-3">
    <div class="input-group w-25">
      <!-- Input group for search with icon inside -->
      <input
        v-model="searchTerm"
        type="text"
        class="form-control text-end"
        placeholder="Search all columns..."
        @input="filterData"
      />
      <span class="input-group-text">
        <i class="bi bi-search"></i> <!-- Bootstrap icon for search -->
      </span>
    </div>
  </div>

    <TableContent
      @on-items-select="onItemSelect"
      @on-sort="onSort"
      :header="header"
      :data="dataToDisplay"
      :checkboxEnabled="checkboxEnabled"
      :checkboxLabel="checkboxLabel"
      :empty-table-text="emptyTableText"
      :sort-label="sortLabel"
      :sort-order="sortOrder"
      :loading="loading"
    >
      <template v-for="(_, name) in $slots" v-slot:[name]="{ row: item }">
        <slot :name="name" :row="item" />
      </template>
    </TableContent>

    <TableFooter
      @page-change="pageChange"
      :current-page="currentPage"
      v-model:itemsPerPage="itemsInTable"
      :count="totalItems"
      :items-per-page-dropdown-enabled="itemsPerPageDropdownEnabled"
    />
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import TableContent from "@/components/kt-datatable/table-partials/table-content/TableContent.vue";
import TableFooter from "@/components/kt-datatable/table-partials/TableFooter.vue";
import type { Sort } from "@/components/kt-datatable/table-partials/models";

export default defineComponent({
  name: "kt-datatable",
  props: {
    header: { type: Array, required: true },
    data: { type: Array, required: true },
    itemsPerPage: { type: Number, default: 10 },
    itemsPerPageDropdownEnabled: { type: Boolean, required: false, default: true },
    checkboxEnabled: { type: Boolean, required: false, default: false },
    checkboxLabel: { type: String, required: false, default: "id" },
    total: { type: Number, required: false },
    loading: { type: Boolean, required: false, default: false },
    sortLabel: { type: String, required: false, default: null },
    sortOrder: { type: String as () => "asc" | "desc", required: false, default: "asc" },
    emptyTableText: { type: String, required: false, default: "No data found" },
    currentPage: { type: Number, required: false, default: 1 },
  },
  emits: [
    "page-change",
    "on-sort",
    "on-items-select",
    "on-items-per-page-change",
  ],
  components: {
    TableContent,
    TableFooter,
  },
  setup(props, { emit }) {
    const currentPage = ref(props.currentPage);
    const itemsInTable = ref<number>(props.itemsPerPage);
    const searchTerm = ref("");  // This will hold the search term

    // Watch for changes in the items per page
    watch(
      () => itemsInTable.value,
      (val) => {
        currentPage.value = 1;
        emit("on-items-per-page-change", val);
      }
    );

    // Page change method
    const pageChange = (page: number) => {
      currentPage.value = page;
      emit("page-change", page);
    };

    // Dynamic Filtering Logic
    const filteredData = computed(() => {
      if (searchTerm.value === "") {
        return props.data;  // If no search term, return all data
      }

      return props.data.filter((item) => {
        // Loop through every key-value pair in the object
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.value.toLowerCase())
        );
      });
    });

    // Data to display, including filtering and pagination
    const dataToDisplay = computed(() => {
      const data = filteredData.value;

      if (data.length <= itemsInTable.value) {
        return data;
      } else {
        let sliceFrom = (currentPage.value - 1) * itemsInTable.value;
        return data.slice(sliceFrom, sliceFrom + itemsInTable.value);
      }
    });

    // Total items, considering search filter
    const totalItems = computed(() => {
      const data = filteredData.value;
      return data.length;
    });

    const onSort = (sort: Sort) => {
      emit("on-sort", sort);
    };

    const onItemSelect = (selectedItems: any) => {
      emit("on-items-select", selectedItems);
    };

    return {
      pageChange,
      dataToDisplay,
      onSort,
      onItemSelect,
      itemsInTable,
      totalItems,
      searchTerm,  // Expose searchTerm to the template
    };
  },
});
</script>
