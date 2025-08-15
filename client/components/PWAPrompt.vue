<template>
  <QDialog v-model="dialog" v-if="deferredPrompt && !isAppInstalled">
    <QCard class="z-50 w-11/12 max-w-sm bg-white shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <QCardSection class="row no-wrap bg-primary text-white rounded-t-lg p-4 flex items-center gap-3">
        <QIcon name="cloud_download" size="md" />
        <div class="text-lg font-semibold">Install the App for Best Experience!</div>
      </QCardSection>

      <QCardSection class="text-gray-800 p-4">
        <p class="text-sm">Add this app to your home screen for quick access and an enhanced experience.</p>
      </QCardSection>

      <QCardActions align="right" class="p-4 gap-2">
        <QBtn label="Later" color="grey-7" class="rounded-md" @click="closePrompt" />
        <QBtn unelevated label="Install Now" color="primary" icon="system_update_alt" class="rounded-md text-white shadow-md hover:shadow-lg transition-shadow" @click="installPWA" />
      </QCardActions>
    </QCard>
  </QDialog>

  <QDialog v-model="showOpenAppDialog" v-if="isAppInstalled && showOpenAppDialog && !hasOpenedApp">
    <QCard class="z-50 w-11/12 max-w-sm bg-white shadow-2xl rounded-lg transform hover:scale-105 transition-transform duration-300 flex flex-col">
      <QCardSection class="row no-wrap bg-green-6 text-white rounded-t-lg p-4 flex items-center gap-3">
        <QIcon name="check_circle_outline" size="md" />
        <div class="text-lg font-semibold">App Installed Successfully!</div>
      </QCardSection>

      <QCardSection class="text-gray-800 p-4">
        <p class="text-sm">The app has been successfully added to your home screen. Would you like to open it now?</p>
      </QCardSection>

      <QCardActions align="right" class="p-4 gap-2">
        <QBtn
          label="Not Now"
          color="grey-7"
          class="rounded-md"
          @click="
            showOpenAppDialog = false;
            hasOpenedApp = true;
          "
        />
        <QBtn unelevated label="Open App" color="green-6" icon="launch" class="rounded-md text-white shadow-md hover:shadow-lg transition-shadow" @click="openApp" />
      </QCardActions>
    </QCard>
  </QDialog>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const deferredPrompt = ref(null);
const isAppInstalled = ref(false);
const dialog = ref(true); // Controls the "Install Now" dialog
const showOpenAppDialog = ref(false); // Controls the "Open App" dialog
const hasOpenedApp = ref(false); // To prevent the "Open App" dialog from showing multiple times after the first open.

const handleBeforeInstallPrompt = (e) => {
  e.preventDefault();
  deferredPrompt.value = e;
  // Ensure the install prompt dialog is visible if not installed
  if (!isAppInstalled.value) {
    dialog.value = true;
  }
};

const handleAppInstalled = () => {
  isAppInstalled.value = true;
  deferredPrompt.value = null;
  dialog.value = false; // Close the install prompt
  showOpenAppDialog.value = true; // Show the new "Open App" dialog
};

const installPWA = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    const { outcome } = await deferredPrompt.value.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
      // The 'appinstalled' event listener will handle showing the next dialog
    } else {
      console.log('PWA installation dismissed');
      deferredPrompt.value = null;
      dialog.value = false; // Hide the prompt if dismissed
    }
  }
};

const openApp = () => {
  hasOpenedApp.value = true;
  showOpenAppDialog.value = false;
  // Open the app using the current window link.
  // When opened as a PWA, this will open it in standalone mode.
  window.location.href = window.location.href;
};

const closePrompt = () => {
  deferredPrompt.value = null; // Simply hide the prompt
  dialog.value = false;
};

onMounted(() => {
  // Check if the app is already installed on mount
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.startsWith('android-app://')) {
    isAppInstalled.value = true;
    dialog.value = false; // If already installed, hide the install prompt
  }

  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.addEventListener('appinstalled', handleAppInstalled);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  window.removeEventListener('appinstalled', handleAppInstalled);
});
</script>

<style></style>
