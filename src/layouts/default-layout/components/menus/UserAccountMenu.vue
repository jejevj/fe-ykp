<template>
	<!--begin::Menu-->
	<div
		class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semibold py-4 fs-6 w-275px"
		data-kt-menu="true"
	>
		<!--begin::Menu item-->
		<div class="menu-item px-3">
			<div class="menu-content d-flex align-items-center px-3">
				<!--begin::Avatar-->
				<div class="symbol symbol-50px me-5">
					<img alt="Logo" :src="getAssetPath('media/avatars/300-3.jpg')" />
				</div>
				<!--end::Avatar-->

				<!--begin::Username-->
				<div class="d-flex flex-column">
					<div class="fw-bold d-flex align-items-center fs-5">
						{{ userData.name }}
						<span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2"

							>{{ userData.role }}</span
						>
					</div>
					<a href="#" class="fw-semibold text-muted text-hover-primary fs-7"
						>{{ userData.email }}</a
					>
				</div>
				<!--end::Username-->
			</div>
		</div>
		<!--end::Menu item-->

		<!--begin::Menu separator-->
		<div class="separator my-2"></div>
		<!--end::Menu separator-->

		<!--begin::Menu item-->
		<div class="menu-item px-5">
			<router-link to="/pages/profile/overview" class="menu-link px-5">
				My Profile
			</router-link>
		</div>
		<!--end::Menu item-->


		<!--begin::Menu separator-->
		<div class="separator my-2"></div>
		<!--end::Menu separator-->

		<!--begin::Menu item-->
		<div class="menu-item px-5">
			<a @click="signOut()" class="menu-link px-5"> Sign Out </a>
		</div>
		<!--end::Menu item-->
	</div>
	<!--end::Menu-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

export default defineComponent({
	name: "kt-user-menu",
	components: {},
	setup() {
		const router = useRouter();
		const i18n = useI18n();

			// Access the store
			const store = useAuthStore();

			// Use storeToRefs to destructure the user and make it reactive
			const { user, isAuthenticated } = storeToRefs(store);
			// Reactive user data from localStorage
				const userData = ref<{ name: string; email: string,role: string }>({ name: "", email: "" ,role: ""});

				// Load user data from localStorage
				onMounted(() => {
					const storedUserData = localStorage.getItem("user_data");
					if (storedUserData) {
						userData.value = JSON.parse(storedUserData); // Parse and store it in the reactive variable
					}
				});
	i18n.locale.value = localStorage.getItem("lang")
		? (localStorage.getItem("lang") as string)
		: "en";

	const countries = {
		en: {
			flag: getAssetPath("media/flags/united-states.svg"),
			name: "English",
		},
		es: {
			flag: getAssetPath("media/flags/spain.svg"),
			name: "Spanish",
		},
		de: {
			flag: getAssetPath("media/flags/germany.svg"),
			name: "German",
		},
		ja: {
			flag: getAssetPath("media/flags/japan.svg"),
			name: "Japanese",
		},
		fr: {
			flag: getAssetPath("media/flags/france.svg"),
			name: "French",
		},
	};

	const signOut = () => {
		store.logout();
		router.push({ name: "sign-in" });
	};

	const setLang = (lang: string) => {
		localStorage.setItem("lang", lang);
		i18n.locale.value = lang;
	};

	const currentLanguage = computed(() => {
		return i18n.locale.value;
	});

	const currentLangugeLocale = computed(() => {
		return countries[i18n.locale.value as keyof typeof countries];
	});

	return {
		signOut,
		setLang,
		store,
		user,
		userData,
		currentLanguage,
		currentLangugeLocale,
		countries,
		getAssetPath,
	};
	},
});
</script>
