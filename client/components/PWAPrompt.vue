<template>
  <!-- <Transition enter-active-class="animate__animated animate__fadeInUp animate__faster" leave-active-class="animate__animated animate__fadeOutDown animate__faster"> -->
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
  <!-- </Transition> -->
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const deferredPrompt = ref(null);
const isAppInstalled = ref(false);
const dialog = ref(true);

const handleBeforeInstallPrompt = (e) => {
  e.preventDefault();
  deferredPrompt.value = e; 
};

const handleAppInstalled = () => {
  isAppInstalled.value = true;
  deferredPrompt.value = null;
};

const installPWA = async () => {
  if (deferredPrompt.value) {
    deferredPrompt.value.prompt();
    const { outcome } = await deferredPrompt.value.userChoice;
    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
    } else {
      console.log('PWA installation dismissed');
    }
    deferredPrompt.value = null;
  }
};

const closePrompt = () => {
  deferredPrompt.value = null; // Simply hide the prompt
};

onMounted(() => {
  if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone || document.referrer.startsWith('android-app://')) {
    isAppInstalled.value = true;
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
