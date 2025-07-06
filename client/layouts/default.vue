<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Header for md and above -->
    <q-header elevated class="gt-xs bg-primary">
      <q-toolbar>
        <!-- Logo -->
        <router-link to="/">
          <q-toolbar-title> SiteName </q-toolbar-title>
        </router-link>
        <q-space />

        <!-- Desktop Navigation Links (md and above) -->
        <q-tabs v-for="(link, index) in navLinks" :key="index" shrink stretch dense inline-label active-bg-color="white" active-color="primary">
          <q-route-tab :to="link.to" :name="link.label" :label="link.label" exact />
        </q-tabs>

        <!-- Hamburger Menu for Mobile (visible on small screens) -->
        <q-btn flat icon="menu" class="q-mx-xs text-white lt-sm" @click="drawerOpen = !drawerOpen" />
      </q-toolbar>
    </q-header>

    <!-- Drawer for Mobile Navigation -->
    <q-drawer v-model="drawerOpen" side="right" overlay :width="200">
      <q-list>
        <q-item v-for="(link, index) in navLinks" :key="index" clickable :to="link.to">
          <q-item-section>
            {{ link.label }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content -->

    <q-page-container>
      <q-pull-to-refresh color="orange-2" bg-color="black" icon="autorenew" @refresh="refresh">
        <slot />
      </q-pull-to-refresh>
    </q-page-container>

    <q-footer elevated>
      <q-toolbar class="lt-sm flex-center bg-[#253D98]">
        <q-tabs v-for="(link, index) in navLinks" :key="index" shrink stretch dense active-bg-color="white" active-color="primary" switch-indicator>
          <q-route-tab :to="link.to" exact>
            <Icon :name="link.icon" size="32px" />
            {{ link.label }}
          </q-route-tab>
        </q-tabs>
      </q-toolbar>
      <!-- <div class="q-pa-md">
        <Icon color="secondary" @click="$q.fullscreen.toggle()" :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'qlementine-icons:fullscreen-16'" />
      </div> -->
    </q-footer>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';

const drawerOpen = ref(false); // Controls the visibility of the mobile drawer

onBeforeMount(() => {
  // Ensure the drawer is closed on initial load
  useQuasar().addressbarColor.set('#253D98');
  // useQuasar().fullscreen.toggle();
});

const refresh = () => {
  console.log('Refresh triggered');
};
// Define the navigation links
const navLinks = [
  { label: 'Home', icon: 'material-symbols:home-rounded', to: '/' },
  // { label: "Contact", icon: "bxs:contact", to: "/contact" },
  { label: 'User', icon: 'solar:user-bold-duotone', to: '/user' },
  // { label: 'Shopify', icon: 'material-symbols:diversity-2', to: '/shopify' },
  // { label: "Admin", icon:"admin_panel_settings" , to: "/admin" },
  // { label: "Signup", to: "/signup" },
  // { label: "Login", to: "/login" },
];
</script>

<style scoped></style>
